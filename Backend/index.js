require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const DB = require('./DB/config')
const router = require('./Router/router')
const http = require('http')
const initSocket = require('./socket')
app.use(cors())
app.use(express.json())
app.use(('/api'),router)

const server = http.createServer(app)
initSocket(server)

const PORT = process.env.PORT || 8000
server.listen(PORT,()=>{
    console.log('server is running on PORT', PORT);
})