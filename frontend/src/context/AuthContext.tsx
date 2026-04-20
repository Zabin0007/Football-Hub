"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { AuthContextType } from "../types/authContextType"
import { User } from "../types/auth"
import api from "../api/axios"
import { getFCMToken } from "../services/fcm"

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const res = await api.get("/protected")
        setUser(res.data.user)
      } catch (err) {
        console.error("Failed to fetch user:", err)
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser))
          } catch {
            localStorage.clear()
            setUser(null)
          }
        } else {
          localStorage.clear()
          setUser(null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async(userData: User, token: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    //fcm
    const fcmToken = await getFCMToken()
    if(fcmToken){
      try{
        await api.post('/save-fcm-token',{
          token: fcmToken
        })
      }
      catch(err){
        console.log("Failed to save FCM Token");
      }
    }
  }
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }
  return (
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
  if (!context) {
    throw new Error('UseAuth must be used inside AuthProvider')
  }
  return context
}