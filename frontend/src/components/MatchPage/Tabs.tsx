export default function Tabs({ activeTab, setActiveTab }: any) {

const tabs = ["stats", "events", "lineups", "chat"]

return (

<div className="flex bg-gray-800 rounded-xl p-1">
{tabs.map((tab) => (
            <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`flex-1 py-2 rounded-lg font-semibold capitalize transition
              ${activeTab === tab
              ? "bg-green-500 text-black"
              : "text-gray-400 hover:text-gray-200"
              }`}
            >
        {tab}
            </button>
))}
</div>
)
}