const { subscriber } = require("../config/pubsub");
const { getIO } = require("../config/socket");

const startSubscriber = async() => {
    await subscriber.subscribe('MATCH_EVENTS',(message)=>{
        const liveEvents = JSON.parse(message);
        const io = getIO()
        console.log("Recieved Matches", liveEvents.length);
        liveEvents.forEach((item) => {
            const matchId = item.matchId
            console.log("Sending update to Room:",matchId);
            io.to(matchId).emit('match_update',item)
        });
    })
}

module.exports = startSubscriber 