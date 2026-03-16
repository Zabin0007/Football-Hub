export default function Stats() {

const stats = [
{ label: "Possession", A: 58, B: 42 },
{ label: "Shots", A: 14, B: 8 },
{ label: "Shots on Target", A: 6, B: 3 },
{ label: "Corners", A: 7, B: 3 },
]

return (

<div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
{stats.map((stat, i) => (
<div key={i}>
<div className="flex justify-between text-sm mb-2">
<span>{stat.A}%</span>
<span className="text-gray-400">{stat.label}</span>
<span>{stat.B}%</span>
</div>
<div className="flex h-2 bg-gray-800 rounded">
<div
className="bg-green-500 rounded"
style={{ width: `${stat.A}%` }}
/>
</div>
</div>
))}
</div>
)
}