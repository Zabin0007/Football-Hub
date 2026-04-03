import Pitch from "./Pitch"
import Substitutes from "./Substitutes"

export default function MatchLineups({ data }:any) {
  // Temporary debug - remove after testing
  console.log('🔍 Lineups component - received data:', data)
  console.log('🔍 Lineups component - data type:', typeof data)
  console.log('🔍 Lineups component - is array:', Array.isArray(data))
  if (Array.isArray(data)) {
    console.log('🔍 Lineups component - array length:', data.length)
    if (data.length > 0) {
      console.log('🔍 Lineups component - first team:', data[0])
    }
  }

   if (!data || !Array.isArray(data) || data.length < 2) {
     console.log('❌ Lineups component - Invalid data structure')
     return (
       <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center justify-center">
         <div className="text-center">
           <p className="text-gray-400 text-lg mb-2">Lineups not available</p>
           <p className="text-gray-500 text-sm">Team lineups will be announced closer to kickoff</p>
         </div>
       </div>
     )
   }

  const teamA = data[0]
  const teamB = data[1]

  console.log('🔍 Lineups component - Team A:', teamA?.team?.name, 'Formation:', teamA?.formation)
  console.log('🔍 Lineups component - Team B:', teamB?.team?.name, 'Formation:', teamB?.formation)

  // Check if teams have required data
  if (!teamA?.team || !teamB?.team || !teamA?.startXI || !teamB?.startXI) {
    console.log('❌ Lineups component - Missing required team data')
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-2">Lineup data incomplete</p>
          <p className="text-gray-500 text-sm">Complete lineups will be available once announced</p>
        </div>
      </div>
    )
  }

  console.log('✅ Lineups component - Rendering lineups!')

  const transformPlayers = (players: any[]) => {
    if (!Array.isArray(players)) return []
    return players.map((p: any) => ({
      number: p.player?.number || 0,
      name: p.player?.name || "Unknown",
      pos: p.player?.pos || "Unknown"
    }))
  }
    return (

        <div className="space-y-10">

            <div className="grid md:grid-cols-2 gap-8">

                <div>
                    <div className="flex justify-between mb-3">
                        <h3 className="font-semibold">{teamA.team.name}</h3>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                            {teamA.formation || "Unknown"}
                        </span>
                    </div>

                    <Pitch players={transformPlayers(teamA.startXI)} formation={teamA.formation} />
                </div>

                <div>
                    <div className="flex justify-between mb-3">
                        <h3 className="font-semibold">{teamB.team.name}</h3>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                            {teamB.formation || "Unknown"}
                        </span>
                    </div>

                    <Pitch players={transformPlayers(teamB.startXI)} formation={teamB.formation} />
                </div>

            </div>

            <Substitutes title={teamA.team.name} players={transformPlayers(teamA.substitutes || [])} />
            <Substitutes title={teamB.team.name} players={transformPlayers(teamB.substitutes || [])} />

        </div>

    )

}