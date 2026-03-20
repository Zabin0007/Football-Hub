require('dotenv').config()
const express = require('express')
const cors = require('cors')
const DB = require('./config/config')
const router = require('./Router/router')
const http = require('http')
const initSocket = require('./config/socket')
const { connectRedis, redisClient, testRedis } = require('./config/redis')
const { connectPubSub, subscriber, publisher } = require('./config/pubsub')
const { getIO } = require('./config/socket')  
const app = express()
app.use(cors())
app.use(express.json())
app.use(('/api'), router)

const startServer = async () => {
    await connectRedis()
    await testRedis()
    await connectPubSub()

    await subscriber.subscribe('match-events',(message)=>{
        const event = JSON.parse(message)
        console.log("Recieved Event:", event);
        const io = getIO()
        io.emit('matchUpdate', event)
    })
    setTimeout(async()=>{
        await publisher.publish('match-events',JSON.stringify({
            type:'goal',
            player:'messi',
            minute:72
        }))
        console.log("Event published");
        
    },3000)

    const server = http.createServer(app) //to use sockect http server must.
    initSocket(server)

    const PORT = process.env.PORT || 8000
    server.listen(PORT, () => {
        console.log('server is running on PORT', PORT);
    })
}
startServer()