"use client"

import Navbar from "@/src/components/Navbar"
import { useAuth } from "@/src/context/AuthContext"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function ProtectedLayout({
    children,
}:{
    children: React.ReactNode
}){
    const { isLoggedIn } = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        if(!isLoggedIn){
            router.push('/login')
        }
        setIsLoading(false)
    },[isLoggedIn])

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        )
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