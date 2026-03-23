const { createClient } = require("redis")
//pub sub is a feature in redis, one way to implement event driven architecture, communicate between server.
//syncs data between servers
const publisher = createClient() //sends an events to subscriber immediately
const subscriber = createClient()//listen all events

publisher.on("error",(err)=> console.log("Publisher error:", err))
subscriber.on("error",(err)=> console.log("Subscriber error:", err))

const connectPubSub = async()=>{
    await publisher.connect()
    await subscriber.connect()
    console.log('pubsub connected');
}

module.exports = {publisher, subscriber, connectPubSub}