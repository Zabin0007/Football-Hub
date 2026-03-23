const { redisClient } = require("../config/redis")
const Match = require("../Model/match")
const footballServices = require('../Services/footballServices')

exports.getLiveMatches = async (req, res) => {
    try {
        const matches = await footballServices.getLiveMatches()
        res.status(200).json(matches)
    }
    catch (error) {
        res.status(500).json(error)
    }
}


exports.getTodayMatches = async (req, res) => {
    try {
        const cached_data = await redisClient.get('today_matches');
        if (cached_data) {
            console.log("From Redis");
            return res.json(JSON.parse(cached_data))
        }
        const matches = await footballServices.getTodayMatches();
        await redisClient.set(
            'today_matches', JSON.stringify(matches), { expiration: 1200 }
        );
        console.log('From API');
        res.status(200).json(matches)

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getMatchById = async (req, res) => {
    try {
        const { id } = req.params
        const matches = await footballServices.getMatchById(id);
        if (!matches) {
            return res.status(404).json({ message: "Match not found" });
        }
        res.json(matches)
    } catch (error) {
        res.status(500).json(error)
    }
}

