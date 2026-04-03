const { publisher } = require('../config/pubsub')
const footballServices = require('../Services/footballServices')

let previousMatches = {}

const isWithinMatchTime = async () => {
  const now = new Date()

  const istTime = new Date(
    now.toLocaleString('en-US', { timeZone: "Asia/Kolkata" })
  )

  const hours = istTime.getHours()
  const minutes = istTime.getMinutes()

  const totalMinutes = hours * 60 + minutes

  const start = 19 * 60 + 30
  const end = 3 * 60 + 30

  return totalMinutes >= start || totalMinutes <= end
}

const detectEvents = (matches) => {
  const events = []

  matches.forEach(match => {
    const matchId = match.fixture.id
    const prev = previousMatches[matchId]

    // First time → store only
    if (!prev) {
      previousMatches[matchId] = match
      return
    }

    // ⚽ GOAL (score change)
    if (
      prev.goals.home !== match.goals.home ||
      prev.goals.away !== match.goals.away
    ) {
      events.push({
        type: "goal",
        matchId,
        scoreA: match.goals.home,
        scoreB: match.goals.away,
        minute: match.fixture.status.elapsed
      })
    }

    // ⏱ MINUTE update
    if (prev.fixture.status.elapsed !== match.fixture.status.elapsed) {
      events.push({
        type: "minute",
        matchId,
        minute: match.fixture.status.elapsed
      })
    }

    // 🔁 STATUS change (HT / FT)
    if (prev.fixture.status.short !== match.fixture.status.short) {
      events.push({
        type: "status",
        matchId,
        status: match.fixture.status.short
      })
    }

    // update cache
    previousMatches[matchId] = match
  })

  return events
}

const startPolling = () => {
  setInterval(async () => {
    try {

      if (!(await isWithinMatchTime())) {
        console.log("Outside match Time")
        return
      }

      const liveMatches = await footballServices.getLiveMatches()

      if (!liveMatches || liveMatches.length === 0) {
        console.log("No live Matches")
        return
      }

      console.log("Live Matches:", liveMatches.length)

      const events = detectEvents(liveMatches)

      if (events.length === 0) {
        console.log("No changes detected")
        return
      }

      console.log("Publishing events:", events)

      await publisher.publish(
        'MATCH_EVENTS',
        JSON.stringify(events)
      )

    } catch (error) {
      console.log("Polling Error:", error.message)
    }

  }, 300000) // 5 minutes
}

module.exports = { startPolling, isWithinMatchTime }