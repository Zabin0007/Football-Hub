import { normalizeType, eventConfig } from "@/src/utils/eventConfig"

export default function MatchEvents({ data }: any) {
  if (!data || !Array.isArray(data)) return null

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6">Match Events</h3>

      <div className="space-y-4">

        {data.map((event: any, i: number) => {
          if (!event) return null

          const key = normalizeType(event)
          const config = eventConfig[key] || { icon: '⚽', label: 'Event' }

          return (
            <div
              key={i}
              className="flex items-center gap-2 text-sm border-b border-gray-800 pb-3 last:border-none"
            >

              {/* Minute */}
              <div className="w-[15%] text-green-400 font-medium">
                {event.time?.elapsed || 0}'
              </div>

              {/* Player */}
              <div className="w-[55%] text-center truncate">
                {event.player?.name || "Unknown"}
              </div>

              {/* Event */}
              <div className="w-[30%] flex justify-end items-center gap-2">
                <span>{config.icon}</span>

                <span className="hidden sm:inline truncate">
                  {config.label}
                </span>
              </div>

            </div>
          )
        })}

      </div>
    </div>
  )
}