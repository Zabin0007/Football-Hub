export default function MatchEvents() {

const events = [
  { id:1, minute:12, type:"goal", player:"Saka", assist:"Ødegaard", team:"home"},
  { id:2, minute:34, type:"yellow", player:"Palmer", team:"away"},
  { id:3, minute:41, type:"goal", player:"Palmer", team:"away"},
  { id:4, minute:55, type:"goal", player:"Havertz", assist:"Saka", team:"home"},
  { id:5, minute:62, type:"sub", player:"Nkunku → Mudryk", team:"away"}
]

return (

<div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

<h3 className="text-lg font-semibold mb-6">Match Events</h3>

<div className="space-y-6">

{events.map(event => (

<div key={event.id} className="grid grid-cols-1 md:grid-cols-3 items-center">

{/* Home Side */}

<div className="hidden md:block text-right pr-6">

{event.team === "home" && (

<div>
<div className="font-medium">{event.player}</div>

{event.assist && (
<div className="text-sm text-gray-400">
Assist: {event.assist}
</div>
)}

</div>

)}

</div>

{/* Minute */}

<div className="flex justify-center items-center gap-2">

<span className="text-green-400">{event.minute}'</span>

<span>
{event.type === "goal" && "⚽"}
{event.type === "yellow" && "🟨"}
{event.type === "red" && "🟥"}
{event.type === "sub" && "🔄"}
</span>

</div>

{/* Away Side */}

<div className="hidden md:block pl-6">

{event.team === "away" && (

<div>
<div className="font-medium">{event.player}</div>
</div>

)}

</div>

{/* Mobile layout */}

<div className="md:hidden text-center mt-2">

<div className="font-medium">{event.player}</div>

{event.assist && (
<div className="text-sm text-gray-400">
Assist: {event.assist}
</div>
)}

</div>

</div>

))}

</div>

</div>

)

}