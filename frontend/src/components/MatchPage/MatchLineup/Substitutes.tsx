export default function Substitutes({ title, players }: any) {

    return (
        <div className="mt-8">
            <h3 className="text-gray-400 mb-4">
                SUBSTITUTES — {title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {players.map((player: any) => (
                    <div key={player.number} className="bg-gray-800 rounded-lg p-3">

                        <div className="font-semibold text-white">
                            {player.number}{player.name} 
                        </div>
                        <div className="text-sm text-gray-400">
                            {player.pos}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}