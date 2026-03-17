import Pitch from "./Pitch"
import Substitutes from "./Substitutes"

export default function MatchLineups() {

    const arsenal = {
        formation: "4-3-3",
        players: [
            { number: 22, name: "Raya", pos:'GK' },
            { number: 4, name: "White", pos:'DEF' },
            { number: 2, name: "Saliba", pos:'DEF'},
            { number: 6, name: "Gabriel", pos:'DEF'},
            { number: 35, name: "Zinchenko", pos:'DEF' },
            { number: 41, name: "Rice", pos:"MID" },
            { number: 8, name: "Ødegaard", pos:"MID" },
            { number: 29, name: "Havertz", pos:"MID" },
            { number: 7, name: "Saka", pos:"LWF" },
            { number: 9, name: "Jesus", pos:"CF" },
            { number: 11, name: "Martinelli", pos:"RWF" },
        ]
    }

    const chelsea = {
        formation: "4-2-3-1",
        players: [
            { number: 1, name: "Sanchez", pos:"GK" },
            { number: 24, name: "James", pos:"DEF" },
            { number: 6, name: "Thiago Silva", pos:"DEF" },
            { number: 26, name: "Colwill", pos:"DEF" },
            { number: 3, name: "Cucurella", pos:"DEF" },
            { number: 25, name: "Caicedo", pos:"MID" },
            { number: 8, name: "Enzo", pos:"MID" },
            { number: 11, name: "Madueke", pos:"MID" },
            { number: 20, name: "Palmer", pos:"LWF" },
            { number: 17, name: "Sterling", pos:"CF" },
            { number: 18, name: "Nkunku", pos:"RWF" },
        ]
    }

    const arsenalSubs = [
        {number:1, name: "Ramsdale", pos: "GK" },
        {number:18, name: "Tomiyasu", pos: "DEF" },
        {number:15, name: "Kiwior", pos: "DEF" },
        {number:20, name: "Jorginho", pos: "MID" },
        {number:78, name: "Vieira", pos: "MID" },
        {number:19, name: "Trossard", pos: "FWD" },
    ]

    const chelseaSubs = [
        {number:99, name: "Petrovic", pos: "GK" },
        {number:2, name: "Disasi", pos: "DEF" },
        {number:4, name: "Chalobah", pos: "DEF" },
        {number:6, name: "Gallagher", pos: "MID" },
        {number:16, name: "Chukwuemeka", pos: "MID" },
        {number:10, name: "Mudryk", pos: "FWD" },
    ]

    return (

        <div className="space-y-10">

            <div className="grid md:grid-cols-2 gap-8">

                <div>
                    <div className="flex justify-between mb-3">
                        <h3 className="font-semibold">Arsenal</h3>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                            {arsenal.formation}
                        </span>
                    </div>

                    <Pitch players={arsenal.players} formation={arsenal.formation} />
                </div>

                <div>
                    <div className="flex justify-between mb-3">
                        <h3 className="font-semibold">Chelsea</h3>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                            {chelsea.formation}
                        </span>
                    </div>

                    <Pitch players={chelsea.players} formation={chelsea.formation} />
                </div>

            </div>

            <Substitutes title="Arsenal" players={arsenalSubs} />
            <Substitutes title="Chelsea" players={chelseaSubs} />

        </div>

    )

}