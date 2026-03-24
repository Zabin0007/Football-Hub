const { publisher } = require('../config/pubsub')
const footballServices = require('../Services/footballServices')

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
    
    // Call immediately when server starts
    pollMatches()
    
    // Then poll every 30 seconds (for testing)
    setInterval(pollMatches, 30000)
}

module.exports = startPolling