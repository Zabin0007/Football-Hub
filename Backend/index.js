require('dotenv').config()
const express = require('express')
const cors = require('cors')
const DB = require('./config/config')
const router = require('./Router/router')
const http = require('http')
const initSocket = require('./config/socket')
const { connectRedis, redisClient, testRedis } = require('./config/redis')
const { connectPubSub } = require('./config/pubsub')

const app = express()
const startServer = async () => {
    await connectRedis()  
    await testRedis()   
    await connectPubSub()
    app.use(cors())
    app.use(express.json())
    app.use(('/api'),router)

    const server = http.createServer(app) //to use sockect http server must.
    initSocket(server)

    const PORT = process.env.PORT || 8000
    server.listen(PORT,()=>{
        console.log('server is running on PORT', PORT);
    })
}
startServer()