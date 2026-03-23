const API = require("../utils/apiClient");

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
    const res = await API.get(`/fixtures?id=${id}`)
    return res.data.response[0]
}