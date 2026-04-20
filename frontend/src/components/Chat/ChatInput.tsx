
import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ChatInput({onSend, matchId}:any){
    const [text,setText] = useState('')
    const { isLoggedIn } = useAuth()
    const router = useRouter()

    const sendMessage = ()=>{
        if(!isLoggedIn){
            const currentMatchId = matchId || window.location.pathname.split('/').pop()
            toast.info("Login required to send messages. Click to go to login page.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClick: () => {
                    sessionStorage.setItem('redirectAfterLogin', `/match/${currentMatchId}?tab=chat`)
                    router.push('/login')
                }
            })
            return
        }
        
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
            className="bg-green-500 px-4 py-2 rounded text-black font-semibold hover:bg-green-600"
            >
            Send
            </button>
        </div>
    )
}