"use client"

import { Children, createContext, useContext, useEffect, useState } from "react"
import {  AuthContextType } from "../types/authContextType"
import { User } from "../types/auth"

const AuthContext = createContext<AuthContextType| null>(null)

export const AuthProvider = ({children}:{children: React.ReactNode})=>{
     const [user,setUser] = useState<User|null>(null)
     const [isLoading, setIsLoading] = useState(true) 
     
     useEffect(()=>{
        const storedUser = localStorage.getItem('user')
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        
        if(storedUser && isLoggedIn === 'true'){
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false) // Set loading to false after checking
     },[])

        const login = (userData : User) => {
                localStorage.setItem("user",JSON.stringify(userData))
                localStorage.setItem("isLoggedIn", "true")
                setUser(userData)
        }
        const logout = () => {
                localStorage.removeItem('isLoggedIn')
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