import { ApiMatch } from "../types/apiMatch";
import { League } from "../types/league";
import { getMatchStatus } from "./getmatchStatus";
import { formatMatchTime } from "./helpers";
import { transformMatch } from "./transformMatch";

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
    leagueMap[leagueId].matches.push({
     ...transformMatch(item),
      time: getMatchStatus(item.fixture.status.short) === "upcoming" ? 
      formatMatchTime(item.fixture.date) : item.fixture.date,
    });
  });

  return Object.values(leagueMap);
        // converts object values into an array
};