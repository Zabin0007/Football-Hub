import { ApiMatch } from "../types/apiMatch";
import { League } from "../types/league";

export const transformMatches = (data:ApiMatch[]): League[] => {
    const leagueMap: Record<number, League> = {};

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

    leagueMap[leagueId].matches.push({
      id: item.fixture.id,
      teamA: item.teams.home.name,
      teamB: item.teams.away.name,
      status:
        item.fixture.status.short === "LIVE"
          ? "live"
          : item.fixture.status.short === "FT"
          ? "finished"
          : "upcoming",
      scoreA: item.goals.home ?? 0,
      scoreB: item.goals.away ?? 0,
      minute: item.fixture.status.elapsed,
      time: item.fixture.date,
    });
  });

  return Object.values(leagueMap);
        // converts object into an array
};