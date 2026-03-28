export default function LineupSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">

      {/* Two Teams */}
      <div className="grid md:grid-cols-2 gap-8">

        {[1, 2].map((_, i) => (
          <div key={i}>

            {/* Header */}
            <div className="flex justify-between mb-3">
              <div className="h-4 w-24 bg-gray-700 rounded"></div>
              <div className="h-4 w-16 bg-gray-700 rounded"></div>
            </div>

            {/* Pitch */}
            <div className="relative w-full h-125 bg-gray-800 rounded-xl p-6 flex flex-col justify-between">

              {/* Rows (fake formation) */}
              {[3, 3, 4].map((count, row) => (
                <div key={row} className="flex justify-center gap-6">
                  {Array.from({length:count}).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                      <div className="h-2 w-12 bg-gray-700 rounded mt-1"></div>
                    </div>
                  ))}
                </div>
              ))}

              {/* GK */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div className="h-2 w-12 bg-gray-700 rounded mt-1"></div>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Substitutes */}
      {[1, 2].map((_, i) => (
        <div key={i}>
          <div className="h-4 w-40 bg-gray-700 rounded mb-4"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((p) => (
              <div key={p} className="bg-gray-800 rounded-lg p-3">
                <div className="h-4 w-20 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-10 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  )
}