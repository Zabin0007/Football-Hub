const { Server } = require('socket.io')
//socket -> communicating from server to browser/client 
let io;

const initSocket = (server) => {
     io = new Server(server,{
        cors:{
            origin: process.env.FRONTEND_URL || '*'
        }
    })
    // io.on => listen for new connection , wait for new client
    io.on('connection',(socket)=>{     
        console.log("User Connected" ,socket.id);
        //Wait for THIS client to send joinMatch event
        socket.on('joinMatch',(matchId)=>{
            socket.join(matchId) //Creates or joins room (Add THIS client to a room)
            console.log(`User joined match ${matchId}`);
        })
        //Listen for events FROM ONE client
        socket.on('SendMessage',({matchId, message, user})=>{ //Wait for THIS client to send message
            io.to(matchId).emit('recieveMessage',{ //Send message to ALL in that room
                user,
                message,
                time: new Date()
            })
        })

        socket.on('disconnect',()=>{
            console.log("User Disconnected", socket.id);
            
        })
    })
}
const getIO = ()=>{
    if(!io){
        throw new Error("Socket.io is not initailised")
    }
    return io
}

module.exports = initSocket
module.exports.getIO = getIO 

