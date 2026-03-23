const axios = require('axios')

const API = axios.create({
    baseURL:'https://v3.football.api-sports.io',
    headers:{
        'x-apiSports-Key':process.env.footballAPIKEY
    }
})

module.exports = API