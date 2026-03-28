const { redisClient } = require("../config/redis")
const footballServices = require('../Services/footballServices')
const MATCHDETAIL = require("../Model/match")
const getOrFetch = require("../utils/fetch")
const getTTL = require("../utils/getTTL")

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
        const isLiveTime = await isWithinMatchTime()

        const ttl = isLiveTime ? 600 : 1200 // 5 min or 20 min
        await redisClient.set(
            'today_matches', JSON.stringify(matches), 'EX', ttl
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
        const cached_data = await redisClient.get(`match:${id}`);
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
        await redisClient.set(
            `match:${id}`, JSON.stringify(matches), 'EX', getTTL('fixture', status)
        )
        res.status(200).json(matches)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.getMatchEvents = async (req, res) => {
    const { id } = req.params
    const key = `match:${id}:events`

    try {
        const match = await MATCHDETAIL.findOne({ fixtureId: id })

        const dbEvents =
            match && match.status === "FT"
                ? match.data.events
                : null
        const status = fixtureData.fixture.status.short
        const events = await getOrFetch({
            key,
            dbData: dbEvents,
            fetchFn: () => footballServices.getMatchEvents(id),
            ttl: getTTL("events", status)
        })

        let fixtureData = null
        const cachedFixture = await redisClient.get(`match:${id}`)

        if (cachedFixture) {
            fixtureData = JSON.parse(cachedFixture)
        } else {
            fixtureData = await footballServices.getFixture(id)
        }

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
        res.status(500).json(err)
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
        const cachedFixture = await redisClient.get(`match:${id}`)

        let status = "NS"

        if (cachedFixture) {
            const fixtureData = JSON.parse(cachedFixture)
            status = fixtureData.fixture.status.short
        }
        const stats = await getOrFetch({
            key,
            dbData: dbStats,
            fetchFn: () => footballServices.getMatchStats(id),
            ttl: getTTL('stats', status)
        })

        res.json(stats)

    } catch (err) {
        res.status(500).json(err)
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
        const cachedFixture = await redisClient.get(`match:${id}`)

        let status = "NS"

        if (cachedFixture) {
            const fixtureData = JSON.parse(cachedFixture)
            status = fixtureData.fixture.status.short
        }

        const lineups = await getOrFetch({
            key,
            dbData: dbLineups,
            fetchFn: () => footballServices.getMatchLineups(id),
            ttl: getTTL('lineups', status)
        })

        res.json(lineups)

    } catch (err) {
        res.status(500).json(err)
    }
}