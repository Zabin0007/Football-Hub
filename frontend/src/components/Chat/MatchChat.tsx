"use client"

import { useEffect, useRef, useState } from "react"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"

export default function MatchChat() {

    const [messages, setMessages] = useState([
        { id: 1, user: "Zabii", text: "What a goal!" },
        { id: 2, user: "Hazm", text: "Disasterrrrrrrrrrrr" },
    ])
    const bottomRef = useRef<HTMLDivElement | null>(null)
    const sendMessage = (text: string) => {

        const newMessage = {
            id: Date.now(),
            user: "You",
            text
        }

        setMessages([...messages, newMessage])

    }

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])
    return (

        <div className="bg-gray-900 border border-gray-800 rounded-xl">

            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Live Chat
                    <span className="text-sm text-gray-400 ml-auto">5 messages</span>
                </h3>
            </div>

            <div  className="h-75 overflow-y-auto p-4 space-y-3 ">
                {messages.map(msg => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                <div ref={bottomRef}></div>
            </div>

            <div className="border-t border-gray-700 p-4">
                <ChatInput onSend={sendMessage} />
            </div>

        </div>

    )

}