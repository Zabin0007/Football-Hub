"use client"

import { Children, createContext, useContext, useEffect, useState } from "react"
import {  AuthContextType } from "../types/authContextType"
import { User } from "../types/auth"

const AuthContext = createContext<AuthContextType| null>(null)

export const AuthProvider = ({children}:{children: React.ReactNode})=>{
     const [user, setUser] = useState<User|null>(null) // Always start with null for SSR
     const [isLoading, setIsLoading] = useState(true) // Add loading back for hydration 
    
     useEffect(()=>{
        // This runs only on client side after hydration
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        
        if(storedUser && token){
            try {
                setUser(JSON.parse(storedUser))
            } catch {
                localStorage.clear()
            }
        }
        setIsLoading(false)
     },[])

        const login = (userData : User, token : string) => {
                localStorage.setItem("token", token)
                localStorage.setItem("user",JSON.stringify(userData))
                setUser(userData)
        }
        const logout = () => {
                localStorage.removeItem('token')
                setUser(null)
                window.location.href = '/login'
        }
        return(
            <AuthContext.Provider 
                value={{
                    user,
                    isLoggedIn: !!user,
                    isLoading,
                    login,
                    logout

            }}>{children}
            </AuthContext.Provider>
        )
}   
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('UseAuth must be used inside AuthProvider')
    }
    return context
}