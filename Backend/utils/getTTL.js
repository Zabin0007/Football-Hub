const getTTL = (type,status)=> {
  if (status === "FT") return 1800 // 30 min

  if (status === "LIVE" || status === "1H" || status === "2H") {
    if (type === "events") return 420   // 7 min
    if (type === "stats") return 600    // 10 min
    if (type === "lineups") return 1800 // 30 min
    if (type === "fixture") return 300  // 5 min
  }

  // upcoming
  if (type === "fixture") return 900
  if (type === "lineups") return 1800

  return 300
}

module.exports = getTTL