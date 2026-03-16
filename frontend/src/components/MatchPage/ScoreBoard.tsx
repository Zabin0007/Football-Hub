export default function Scoreboard({ match }: any) {

return (
<div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
<div className="text-center text-gray-400 mb-4">
⚑ {match.league} • 🔴 {match.minute}'
</div>
<div className="flex items-center justify-between md:mx-15">
<div className="flex flex-col items-center text-3xl">
⚽
<span className="mt-2 text-lg font-semibold tracking-wide">{match.teamA}</span>
</div>
<div className="text-4xl font-bold">
{match.scoreA} - {match.scoreB}
</div>
<div className="flex flex-col items-center text-3xl">
⚽
<span className="mt-2 text-lg font-semibold tracking-wide">{match.teamB}</span>
</div>
</div>
</div>
)

}