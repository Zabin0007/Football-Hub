export type ApiMatch = {
        fixture: {
            id: number,
            date: string,
            status: {
                short: string,
                elapsed: number
            }
        },
        teams:{
            home:{
                name: string,
                logo?: string
            },
            away:{
                name: string,
                logo?: string
            };
        },
        goals:{
            home: number,
            away: number
        },
        league:{
            id: number,
            name: string,
            country: string
        }
}