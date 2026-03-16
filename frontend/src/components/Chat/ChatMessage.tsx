export default function ChatMessage({ message }: any) {
    return (
        <div className="flex items-start gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                {message.user[0]}
            </div>
            <div>
                <div className="text-sm font-semibold text-white">
                    {message.user}
                </div>
                <div className="text-gray-300 text-sm">
                    {message.text}
                </div>
            </div>
        </div>
    )

}