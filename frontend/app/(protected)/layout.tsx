"use client"

import Navbar from "@/src/components/Navbar"
import { useAuth } from "@/src/context/AuthContext"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function ProtectedLayout({
    children,
}:{
    children: React.ReactNode
}){
    const { isLoggedIn, isLoading } = useAuth()
    const router = useRouter()
    
    useEffect(()=>{
        if(!isLoading && !isLoggedIn){
            router.push('/login')
        }
    },[isLoggedIn, isLoading])

    // Show minimal loading during hydration (very brief)
    if (isLoading) {
        return (
            <>
                <Navbar/>
                <main>
                    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                        <div className="animate-pulse text-gray-400">Loading...</div>
                    </div>
                </main>
            </>
        )
    }

    // If not logged in, don't render anything (redirect is happening)
    if (!isLoggedIn) {
        return null
    }

    return (
        <>
            <Navbar/>
            <main>
                {children}
            </main>
        </>
    )
}