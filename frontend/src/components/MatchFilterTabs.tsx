'use client'

type Props = {
    filter: string,
    setFilter: (value: string) => void;
}

export default function MatchFilterTabs({ filter, setFilter }: Props) {
    const tabs = [
        { key: "all", label: "All" },
        { key: "live", label: "Live" },
        { key: "finished", label: "Finished" },
        { key: "upcoming", label: "Upcoming" }
    ];

    return (
        <div className="bg-gray-800 rounded-lg p-1 mb-6 w-full">
            <div className="grid grid-cols-4 gap-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`py-2.5 rounded-md text-sm md:text-lg font-medium transition-all duration-200 whitespace-nowrap
                        ${
                            filter === tab.key
                                ? "bg-green-500 text-black shadow-sm"
                                : "text-gray-400 hover:text-gray-200 "
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}