import Pitch from "./Pitch"
import Substitutes from "./Substitutes"

export default function MatchLineups({ data }:any) {

   if (!data || data.length < 2) return <p>No lineup available</p>

  const teamA = data[0]
  const teamB = data[1]

  const transformPlayers = (players: any[]) => {
    return players.map((p: any) => ({
      number: p.player.number,
      name: p.player.name,
      pos: p.player.pos
    }))
  }
    return (

        <div className="space-y-10">

            <div className="grid md:grid-cols-2 gap-8">

                <div>
                    <div className="flex justify-between mb-3">
                        <h3 className="font-semibold">{teamA.team.name}</h3>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                            {teamA.formation}
                        </span>
                    </div>

                    <Pitch players={transformPlayers(teamA.startXI)} formation={teamA.formation} />
                </div>

                <div>
                    <div className="flex justify-between mb-3">
                        <h3 className="font-semibold">Chelsea</h3>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                            {teamB.formation}
                        </span>
                    </div>

                    <Pitch players={transformPlayers(teamB.startXI)} formation={teamB.formation} />
                </div>

            </div>

            <Substitutes title={teamA.team.name} players={transformPlayers(teamA.substitutes)} />
            <Substitutes title={teamB.team.name} players={transformPlayers(teamB.substitutes)} />

        </div>

    )

}