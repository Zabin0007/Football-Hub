const { publisher } = require('../config/pubsub')
const footballServices = require('../Services/footballServices')

const startPolling = ()=>{
    setInterval(async()=>{
        try {
            const matches = await footballServices.getLiveMatches()
            if(!matches){
                console.log("No live matches");
                return
            }
            await publisher.publish('LIVE_MATCHES',JSON.stringify(matches))
            console.log("Published Live Matches:", matches.length);
            
        }
        catch(error){
            console.log('Polling Error',error.message);
        }
    },180000)
}

module.exports = startPolling