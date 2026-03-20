const { createClient } = require("redis")

const publisher = createClient()
const subscriber = createClient()

publisher.on("error",(err)=> console.log("Publisher error:", err))
subscriber.on("error",(err)=> console.log("Subscriber error:", err))

const connectPubSub = async()=>{
    await publisher.connect()
    await subscriber.connect()
    console.log('pubsub connected');
}

module.exports = {publisher, subscriber, connectPubSub}