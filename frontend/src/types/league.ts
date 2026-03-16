import { Match } from "./match"

export type League = {
    id:number,
    name:string,
    country:string,
    matches:Match[]
}