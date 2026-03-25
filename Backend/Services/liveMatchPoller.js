const { publisher } = require('../config/pubsub')
const footballServices = require('../Services/footballServices')

let currentInterval = null
let noLiveMatchCount = 0

const startPolling = () => {
    const pollMatches = async () => {
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
    }
    
    // Start with 15 minute polling
    pollMatches()
    currentInterval = setInterval(pollMatches, 900000) // 15 minutes
}

module.exports = startPolling