"use client"

import { Children, createContext, useContext, useEffect, useState } from "react"
import {  AuthContextType } from "../types/authContextType"
import { User } from "../types/auth"
import api from "../api/axios"

const AuthContext = createContext<AuthContextType| null>(null)

export const AuthProvider = ({children}:{children: React.ReactNode})=>{
     const [user, setUser] = useState<User|null>(null) // Always start with null for SSR
     const [isLoading, setIsLoading] = useState(true) // Add loading back for hydration 
    
     useEffect(()=>{
        // This runs only on client side after hydration
         const fetchUser = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      const res = await api.get("/auth/me")
      setUser(res.data)
    } catch (err) {
      localStorage.clear()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  fetchUser()
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