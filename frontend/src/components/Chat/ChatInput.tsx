
import { useState } from "react";

export default function ChatInput({onSend}:any){
    const [text,setText] = useState('')

    const sendMessage = ()=>{
        if(!text.trim()) return
        onSend(text)
        setText('')
    }

    return(
        <div className="flex gap-2 mt-4">
            <input type="text" onChange={(e)=>setText(e.target.value)} 
            placeholder="Send a Message" 
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded" />
            <button onClick={sendMessage} 
            className="bg-green-500 px-4 py-2 rounded text-black font-semibold"
            >
            Send
            </button>
        </div>
    )
}