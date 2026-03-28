export default function Stats({ data }: any) {
  if (!data) return null

  const teamA = data[0]
  const teamB = data[1]

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
      {teamA.statistics.map((stat: any, i: number) => (
        <div key={i}>
          <div className="flex justify-between text-sm mb-2">
            <span>{stat.value}%</span>
            <span className="text-gray-400">{stat.type}</span>
            <span>{teamB.statistics[i]?.value}%</span>
          </div>

          <div className="flex h-2 bg-gray-800 rounded">
            <div
              className="bg-green-500 rounded"
              style={{ width: `${stat.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}