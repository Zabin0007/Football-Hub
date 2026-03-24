import { ApiMatch } from "../types/apiMatch";
import { League } from "../types/league";

// Helper function to format time from ISO string to HH:MM
const formatMatchTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false // Use 24-hour format
  });
};

export const transformMatches = (data:ApiMatch[]): League[] => {
    const leagueMap: Record<number, League> = {};  //record is utility built-type in TS.

  data.forEach((item) => {
    const leagueId = item.league.id;

    if (!leagueMap[leagueId]) {
      leagueMap[leagueId] = {
        id: leagueId,
        name: item.league.name,
        country: item.league.country,
        matches: [],
      };
    }

    // Fix status mapping based on API response
    const getMatchStatus = (statusShort: string) => {
      switch (statusShort) {
        case "LIVE":
        case "1H":
        case "HT":
        case "2H":
        case "ET":
        case "P":
          return "live";
        case "FT":
        case "AET":
        case "PEN":
          return "finished";
        case "NS":
        case "TBD":
        case "SUSP":
        case "PST":
        case "CANC":
        default:
          return "upcoming";
      }
    };

    const status = getMatchStatus(item.fixture.status.short);

    leagueMap[leagueId].matches.push({
      id: item.fixture.id,
      teamA: item.teams.home.name,
      teamB: item.teams.away.name,
      status: status,
      scoreA: item.goals.home ?? 0,
      scoreB: item.goals.away ?? 0,
      minute: item.fixture.status.elapsed ?? 0,
      time: status === "upcoming" ? formatMatchTime(item.fixture.date) : item.fixture.date,
    });
  });

  return Object.values(leagueMap);
        // converts object into an array
};