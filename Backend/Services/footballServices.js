const API = require("../utils/apiClient");
const { redisClient } = require("../config/redis");

exports.getTodayMatches = async()=>{
    const today = new Date().toISOString().split('T')[0];
    const res = await API.get(`/fixtures?date=${today}`)
    return res.data.response
}

exports.getLiveMatches = async()=>{
    const res = await API.get('/fixtures?live=all')
    return res.data.response
}

exports.getMatchById = async(id)=>{
    try {
        const res = await API.get(`/fixtures?id=${id}`)
        return res.data.response[0]
    } catch (error) {
        console.error('Error fetching match details:', error)
        throw error
    }
}