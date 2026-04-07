import { ApiMatch } from "../types/apiMatch";
import { Match } from "../types/match";
import { getMatchStatus } from "./getmatchStatus";

export const transformMatch = (item: ApiMatch): Match => {
    if(!item || !item.fixture || !item.fixture.status){
        throw new Error("Invalid data");
        
    }
    const status = getMatchStatus(item.fixture.status.short)
    return {
        id: item.fixture.id,
        teamA: item.teams.home.name,
        teamB: item.teams.away.name,
        logoA: item.teams.home.logo,
        logoB: item.teams.away.logo,
        status,
        scoreA: item.goals.home ?? 0,
        scoreB: item.goals.away ?? 0,
        minute: item.fixture.status.elapsed ?? 0,
        league: item.league.name,
    }
}