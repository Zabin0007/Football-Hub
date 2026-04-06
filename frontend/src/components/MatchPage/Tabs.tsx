export default function Tabs({ activeTab, setActiveTab, matchStatus }: any) {

const tabs = ["stats", "events", "lineups", "chat"]
const isLive = matchStatus === "live"

return (

<div className="flex bg-gray-800 rounded-xl p-1">
{tabs.map((tab) => {
  const isDisabled = tab === "chat" && !isLive
  
  return (
    <button
      key={tab}
      onClick={() => !isDisabled && setActiveTab(tab)}
      disabled={isDisabled}
      className={`flex-1 py-2 rounded-lg font-semibold capitalize transition
        ${isDisabled 
          ? "text-gray-600 cursor-not-allowed opacity-50"
          : activeTab === tab
          ? "bg-green-500 text-black"
          : "text-gray-400 hover:text-gray-200"
        }`}
      title={isDisabled ? "Chat only available for live matches" : ""}
    >
      {tab}
    </button>
  )
})}
</div>
)
}