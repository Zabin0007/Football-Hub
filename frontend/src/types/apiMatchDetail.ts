import { ApiMatch } from "./apiMatch";

export type ApiMAtchDetail = ApiMatch & {
    events?: any[]
    statistics?: any[]
    lineups?: any[]
}