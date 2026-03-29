"use client"

import Navbar from "@/src/components/Navbar"
import HomePageSkeleton from "@/src/components/Skeltons/HomePageSkeleton"
import MatchPageSkelton from "@/src/components/Skeltons/MatchPageSkelton"
import { useAuth } from "@/src/context/AuthContext"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function ProtectedLayout({
    children,
}:{
    children: React.ReactNode
}){
    const { isLoggedIn, isLoading } = useAuth()
    const router = useRouter()
    const pathName = usePathname()
    useEffect(()=>{
        if(!isLoading && !isLoggedIn){
            router.push('/login')
        }
    },[isLoggedIn, isLoading])

    const getSkelton = () => {
        if(pathName==='/' || pathName===''){
            return <HomePageSkeleton/>
        }
        if(pathName==='/match' || pathName.startsWith('/match')){
            return <MatchPageSkelton/>
        }
        return <HomePageSkeleton/>
    }

    // Show minimal loading during hydration (very brief)
    if (isLoading) {
        return (
            <>
                <Navbar/>
                <main>
                   {getSkelton()}
                </main>
            </>
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