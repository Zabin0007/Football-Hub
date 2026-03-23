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
                name: string
            },
            away:{
                name: string
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