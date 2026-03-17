require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
        res.send('hiiiiiiiiiiiiiii')
})

const PORT = 8000
app.listen(PORT,()=>{
    console.log('server is running on PORT', PORT);
})