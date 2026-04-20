"use client"

import { useEffect, useRef, useState } from "react"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import { socket } from "@/src/utils/socket"

export default function MatchChat({matchId}:{matchId:any}) {

    const [messages, setMessages] = useState<any[]>([])
    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
        const handleReceiveMessage = (data: any) => { //listen for messages from backend
            const newMessage = {
                id: `${Date.now()}-${Math.random()}`, // More unique ID
                user: data.user,
                text: data.message
            }
            setMessages((prev)=>[...prev,newMessage])
        }
        socket.on('recieveMessage', handleReceiveMessage)//listen message
        return () => {
            socket.off('recieveMessage', handleReceiveMessage) // Clean up specific listener
        }
    },[matchId])

    const sendMessage = (text: string) => {
        if(!text.trim()) return
        socket.emit('SendMessage',{ //sendmessage to server
            matchId,
            message:text,
            user:'You'
        })
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
                    <span className="text-sm text-gray-400 ml-auto">{messages.length} {messages.length === 1 ? 'message' : 'messages'}</span>
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