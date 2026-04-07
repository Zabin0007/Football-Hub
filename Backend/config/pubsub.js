const { createClient } = require("redis")

const publisher = createClient({
    url: process.env.REDIS_URL
})
const subscriber = createClient({
    url: process.env.REDIS_URL
})

publisher.on("error",(err)=> console.log("Publisher error:", err))
subscriber.on("error",(err)=> console.log("Subscriber error:", err))

const connectPubSub = async()=>{
    await publisher.connect()
    await subscriber.connect()
    console.log('pubsub connected');
}

module.exports = {publisher, subscriber, connectPubSub}