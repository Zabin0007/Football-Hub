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

    // Show loading spinner while AuthContext is checking authentication
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