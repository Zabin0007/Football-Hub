import { Key } from "react"

export default function Pitch({ players, formation }: any) {

    // Handle null/undefined formation
    if (!formation || !players || !Array.isArray(players) || players.length === 0) {
        return (
            <div className="relative w-full h-125 bg-center bg-cover rounded-xl p-6 flex items-center justify-center"
                 style={{ backgroundImage: "url('/images/football_pitch.webp')" }}>
                <div className="text-center">
                    <p className="text-white text-lg mb-2">Formation not available</p>
                    <p className="text-gray-400 text-sm">Lineups will be announced closer to kickoff</p>
                </div>
            </div>
        )
    }

    const rows = formation.split("-").map(Number)    //op:[4,3,3]

    const gk = players[0]
    const fieldPlayers = players.slice(1)

    let index = 0

    return (

        <div
            className="relative w-full h-125 bg-center bg-cover rounded-xl p-6 flex flex-col justify-between"
            style={{ backgroundImage: "url('/images/football_pitch.webp')" }}
        >
            {/* formation defining structure */}
            {rows.slice().reverse().map((count: number, i: Key | null | undefined) => {
                const rowPlayers = fieldPlayers.slice(index, index + count)
                index += count
                return (
                    <div key={i} className="flex justify-center gap-6">
                        {rowPlayers.map((player: any) => (
                            <div key={player.number} className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
                                    {player.number || '?'}
                                </div>
                                <span className="text-xs text-white mt-1">
                                    {player.name || 'Unknown'}
                                </span>
                            </div>
                        ))}
                    </div>
                )
            })}


            <div className="flex justify-center">

                <div className="flex flex-col items-center">

                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
                        {gk?.number || '1'}
                    </div>

                    <span className="text-xs text-white mt-1">
                        {gk?.name || 'Goalkeeper'}
                    </span>

                </div>

            </div>

        </div>

    )

}