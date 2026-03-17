"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        const savedUser = localStorage.getItem("user")
        if (!savedUser) {
            alert("User not found. Please register.")
            return
        }
        const parsedUser = JSON.parse(savedUser)
        if(email==''||password==''){
            return alert("Please Enter All The required Fields")
        }
        if (email === parsedUser.email && password === parsedUser.password) {
            localStorage.setItem("isLoggedIn", "true")
            router.push("/")
        } else {
            alert("Invalid credentials")
        }
    }

    useEffect(()=>{
         const savedUser = localStorage.getItem("isLoggedIn")
         if(savedUser){
         router.push('/')
         }
    },[])
    return (
        <div className="w-full max-w-sm sm:max-w-md bg-gray-900 p-4 sm:p-8 rounded-2xl shadow-lg mx-4 sm:mx-0">
        <form onClick={handleLogin} >

            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Welcome Back ⚽
            </h2>

            {/* Email */}
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500" type="email" placeholder="Email" />

            {/* Password */}
            <div className="mt-4 relative">
                <input
                    className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
            </div>

            {/* Login Button */}
            <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition">
                Login
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="px-3 text-gray-400 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Google Button */}
            <button className="w-full bg-white text-black py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition">
                <img src="/images/google.png" className="w-5 h-5" />
                Continue with Google
            </button>

            {/* Register Link */}
             </form>
            <p className="text-gray-400 text-sm text-center mt-6">
                Don’t have an account?{" "}
                <Link href="/register" className="text-green-400 hover:underline">
                    Register
                </Link>
            </p>
           </div>
       

    )

}