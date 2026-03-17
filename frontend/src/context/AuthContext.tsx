"use client"

import { Children, createContext, useContext, useEffect, useState } from "react"
import {  AuthContextType } from "../types/authContextType"
import { User } from "../types/auth"

const AuthContext = createContext<AuthContextType| null>(null)

export const AuthProvider = ({children}:{children: React.ReactNode})=>{
     const [user,setUser] = useState<User|null>(null)
     useEffect(()=>{
        const storedUser = localStorage.getItem('user')
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
     },[])

        const login = (userData : User) => {
                localStorage.setItem("user",JSON.stringify(userData))
                setUser(userData)
        }
        const logout = () => {
                localStorage.removeItem('user')
                localStorage.removeItem('isLoggedIn')
                setUser(null)
                // Redirect to login page
                window.location.href = '/login'
        }
        return(
            <AuthContext.Provider 
                value={{
                    user,
                    isLoggedIn: !!user,
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