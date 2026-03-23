const { subscriber } = require("../config/pubsub");
const { getIO } = require("../config/socket");

const startSubscriber = async() => {
    await subscriber.subscribe('LIVE_MATCHES',(message)=>{
        const matches = JSON.parse(message);
        const io = getIO()
        console.log("Recieved Matches", matches.length);
        matches.forEach((item) => {
            const matchId = item.fixture.id
            console.log("Sending update to Room:",matchId);
            io.to(matchId).emit('match_update',item)
        });
    })
}

module.exports = startSubscriber