const mongoose = require('mongoose')
mongoose.connect(process.env.connectionString)
    .then(()=>{
        console.log('MongoDb is Connected');
        
    })
    .catch(err =>
        console.log("DB connection issue" ,err)
    )