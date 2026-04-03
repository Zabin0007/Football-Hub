export default function Stats({ data }: any) {
  if (!data || !Array.isArray(data) || data.length < 2) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-2">Match statistics not available</p>
          <p className="text-gray-500 text-sm">Detailed statistics are only available for major leagues and competitions</p>
        </div>
      </div>
    )
  }

  const teamA = data[0]
  const teamB = data[1]

  // Check if both teams have statistics
  if (!teamA?.statistics || !teamB?.statistics || 
      !Array.isArray(teamA.statistics) || !Array.isArray(teamB.statistics) ||
      teamA.statistics.length === 0 || teamB.statistics.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-2">Match statistics not available</p>
          <p className="text-gray-500 text-sm">Detailed statistics are only available for major leagues and competitions</p>
        </div>
      </div>
    )
  }

  // Helper function to determine if a stat is a percentage
  const isPercentageStat = (type: string) => {
    return type.toLowerCase().includes('possession') || 
           type.toLowerCase().includes('%') ||
           type.toLowerCase().includes('passes %')
  }

  // Helper function to get numeric value for progress bar
  const getProgressValue = (value: any, type: string) => {
    if (value === null || value === undefined) return 0
    
    // If it's already a percentage (like "65%"), extract the number
    if (typeof value === 'string' && value.includes('%')) {
      return parseInt(value.replace('%', ''))
    }
    
    // If it's a percentage stat, return as is
    if (isPercentageStat(type)) {
      return Math.min(100, Math.max(0, parseInt(value) || 0))
    }
    
    return parseInt(value) || 0
  }

  // Helper function to calculate percentage for non-percentage stats
  const calculatePercentage = (valueA: any, valueB: any) => {
    const numA = parseInt(valueA) || 0
    const numB = parseInt(valueB) || 0
    const total = numA + numB
    
    if (total === 0) return { percentA: 50, percentB: 50 }
    
    return {
      percentA: Math.round((numA / total) * 100),
      percentB: Math.round((numB / total) * 100)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
      {teamA.statistics.map((stat: any, i: number) => {
        const teamBStat = teamB.statistics[i]
        if (!stat || !teamBStat) return null
        
        const isPercentage = isPercentageStat(stat.type)
        const valueA = stat.value
        const valueB = teamBStat.value
        
        // Skip null values
        if (valueA === null || valueB === null) return null
        
        let displayValueA = valueA
        let displayValueB = valueB
        let progressA = 0
        
        if (isPercentage) {
          // For percentage stats, use the value directly
          progressA = getProgressValue(valueA, stat.type)
          displayValueA = typeof valueA === 'string' && valueA.includes('%') ? valueA : `${valueA}%`
          displayValueB = typeof valueB === 'string' && valueB.includes('%') ? valueB : `${valueB}%`
        } else {
          // For count stats, calculate relative percentages
          const { percentA } = calculatePercentage(valueA, valueB)
          progressA = percentA
          displayValueA = valueA
          displayValueB = valueB
        }
        
        return (
          <div key={i}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white">{displayValueA}</span>
              <span className="text-gray-400 font-medium">{stat.type}</span>
              <span className="text-white">{displayValueB}</span>
            </div>

            <div className="flex h-2 bg-gray-800 rounded overflow-hidden">
              <div
                className="bg-green-500 transition-all duration-300"
                style={{ width: `${progressA}%` }}
              />
              <div
                className="bg-blue-500 transition-all duration-300"
                style={{ width: `${100 - progressA}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}