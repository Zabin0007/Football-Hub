const API = require("../utils/apiClient");

exports.getTodayMatches = async () => {
    const today = new Date().toISOString().split('T')[0];
    const res = await API.get(`/fixtures?date=${today}`)
    return res.data.response
}

exports.getLiveMatches = async () => {
    const res = await API.get('/fixtures?live=all')
    return res.data.response
}

exports.getMatchById = async (id) => {
    try {
        const res = await API.get(`/fixtures?id=${id}`)
        return res.data.response[0]
    } catch (error) {
        console.error('Error fetching match details:', error)
        throw error
    }
}

exports.getMatchStats = async (id) => {
    try {
        const res = await API.get(`/fixtures/statistics?fixture=${id}`)
        return res.data.response
    } catch (error) {
        console.error('Error fetching match Stats:', error)
        throw error
    }
}

exports.getMatchEvents = async (id) => {
    try {
        const res = await API.get(`/fixtures/events?fixture=${id}`)
        return res.data.response
    } catch (error) {
        console.error('Error fetching match Events:', error)
        throw error
    }
}

exports.getMatchLineups = async (id) => {
    try {
        const res = await API.get(`/fixtures/lineups?fixture=${id}`)
        return res.data.response
    } catch (error) {
        console.error('Error fetching match Lineups:', error)
        throw error
    }
}