const { createClient } = require("redis");
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' 
})

redisClient.on("error",(err)=>{
    console.log("Redis Error", err);
})

const connectRedis = async()=>{
    await redisClient.connect()
    console.log('Redis Connected')
}

const testRedis = async()=>{
   await redisClient.set("test","deyyyyyyyyyy")
    const data = await redisClient.get('test')
    console.log("Redis Test:" ,data);
}

module.exports = { redisClient,connectRedis,testRedis }
 //use in routes and handlers to send data to redis,connect redis with our app