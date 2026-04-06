const { redisClient } = require("../config/redis")
const footballServices = require('../Services/footballServices')
const MATCHDETAIL = require("../Model/match")
const getOrFetch = require("../utils/fetch")
const getTTL = require("../utils/getTTL")
const { isWithinMatchTime } = require("../Services/liveMatchPoller")

exports.getLiveMatches = async (req, res) => {
    try {
        const matches = await footballServices.getLiveMatches()
        res.status(200).json(matches)
    }
    catch (error) {
        console.error("Error in getLiveMatches:", error);
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}


exports.getTodayMatches = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const cacheKey = `today_matches:${today}`; 
        
        const cached_data = await redisClient.get(cacheKey);
        if (cached_data) {
            console.log("From Redis for date:", today);
            return res.json(JSON.parse(cached_data))
        }
        
        const matches = await footballServices.getTodayMatches();
        const isLiveTime = await isWithinMatchTime()

        const ttl = isLiveTime ? 600 : 1200 // 5 min or 20 min
        await redisClient.set(
            cacheKey, JSON.stringify(matches), 'EX', ttl
        );
        console.log('From API for date:', today);
        res.status(200).json(matches)

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getMatchById = async (req, res) => {
    try {
        const { id } = req.params
        let cached_data = null;
        
        try {
            cached_data = await redisClient.get(`match:${id}`);
        } catch (redisError) {
            console.log("Redis not available for getMatchById");
        }
        
        if (cached_data) {
            console.log("From Redis");
            return res.json(JSON.parse(cached_data))
        }
        
        const matches = await footballServices.getMatchById(id);
        if (!matches) {
            console.log('API Limit or no Data, sending empty response');
            return res.status(200).json(null);
        }
        
        const status = matches.fixture.status.short
        
        try {
            await redisClient.set(
                `match:${id}`, JSON.stringify(matches), 'EX', getTTL('fixture', status)
            )
        } catch (redisError) {
            console.log("Could not cache to Redis:", redisError.message);
        }
        
        res.status(200).json(matches)
    } catch (error) {
        console.error("Error in getMatchById:", error);
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}


exports.getMatchEvents = async (req, res) => {
    const { id } = req.params
    const key = `match:${id}:events`

    try {
        let fixtureData = null
        let cachedFixture = null;
        
        try {
            cachedFixture = await redisClient.get(`match:${id}`)
        } catch (redisError) {
            console.log("Redis not available for getMatchEvents");
        }

        if (cachedFixture) {
            fixtureData = JSON.parse(cachedFixture)
        } else {
            fixtureData = await footballServices.getMatchById(id)
        }

        const status = fixtureData.fixture.status.short 

        const match = await MATCHDETAIL.findOne({ fixtureId: id })

        const dbEvents =
            match && match.status === "FT"
                ? match.data.events
                : null

        const events = await getOrFetch({
            key,
            dbData: dbEvents,
            fetchFn: () => footballServices.getMatchEvents(id),
            ttl: getTTL("events", status)
        })

        if (status === "FT" && !match) {
            const [stats, lineups] = await Promise.all([
                footballServices.getMatchStats(id),
                footballServices.getMatchLineups(id)
            ])

            await MATCHDETAIL.create({
                fixtureId: id,
                data: {
                    fixture: fixtureData,
                    events,
                    stats,
                    lineups
                },
                status: "FT"
            })
        }

        res.json(events)

    } catch (err) {
        console.error("Error in getMatchEvents:", err);
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

exports.getMatchStats = async (req, res) => {
    const { id } = req.params
    const key = `match:${id}:stats`

    try {
        const match = await MATCHDETAIL.findOne({ fixtureId: id })

        const dbStats =
            match && match.status === "FT"
                ? match.data.stats
                : null
        
        let fixtureData = null
        let cachedFixture = null;
        
        try {
            cachedFixture = await redisClient.get(`match:${id}`)
        } catch (redisError) {
            console.log("Redis not available for getMatchStats");
        }

        if (cachedFixture) {
            fixtureData = JSON.parse(cachedFixture)
        } else {
            // Fetch fixture data from API if not cached
            fixtureData = await footballServices.getMatchById(id)
        }

        const status = fixtureData ? fixtureData.fixture.status.short : "NS"
        
        const stats = await getOrFetch({
            key,
            dbData: dbStats,
            fetchFn: () => footballServices.getMatchStats(id),
            ttl: getTTL('stats', status)
        })

        res.json(stats)

    } catch (err) {
        console.error("Error in getMatchStats:", err);
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

exports.getMatchLineups = async (req, res) => {
    const { id } = req.params
    const key = `match:${id}:lineups`

    try {
        const match = await MATCHDETAIL.findOne({ fixtureId: id })

        const dbLineups =
            match && match.status === "FT"
                ? match.data.lineups
                : null
        
        let fixtureData = null
        let cachedFixture = null;
        
        try {
            cachedFixture = await redisClient.get(`match:${id}`)
        } catch (redisError) {
            console.log("Redis not available for getMatchLineups");
        }

        if (cachedFixture) {
            fixtureData = JSON.parse(cachedFixture)
        } else {
            // Fetch fixture data from API if not cached
            fixtureData = await footballServices.getMatchById(id)
        }

        const status = fixtureData ? fixtureData.fixture.status.short : "NS"

        const lineups = await getOrFetch({
            key,
            dbData: dbLineups,
            fetchFn: () => footballServices.getMatchLineups(id),
            ttl: getTTL('lineups', status)
        })

        res.json(lineups)

    } catch (err) {
        console.error("Error in getMatchLineups:", err);
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}