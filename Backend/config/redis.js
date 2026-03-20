const { createClient } = require("redis");
//redis is cache storage,store user for a limited time,no need to fetch from db.
const redisClient = createClient({
    url:'redis://127.0.0.1:6379' //tell node redis->local machine address->redis port
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