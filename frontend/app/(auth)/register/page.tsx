"use client"

import api from "@/src/api/axios"
import { useAuth } from "@/src/context/AuthContext"
import { GoogleLogin } from "@react-oauth/google"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function RegisterPage() {
    const { login } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name == '' || email == '' || password == '') {
            return alert("Please Enter All The required Fields")
        }
        try {
            const res = await api.post("/register", {
                name,
                email,
                password,
            })

            login(res.data.user, res.data.token)
            router.push("/")
        } catch (err) {
            alert("Registration failed")
        }
    }
    return (
        <div className="w-full max-w-sm sm:max-w-md bg-gray-900 p-4 sm:p-8 rounded-2xl shadow-lg mx-4 sm:mx-0">
            <form onSubmit={handleSubmit} >

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                    Create Account 🚀
                </h2>

                {/* Name */}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="Full Name"
                    required
                />

                {/* Email */}
                <div className="mt-3 sm:mt-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="Email"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mt-3 sm:mt-4 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                    >
                        {showPassword ? <FaEyeSlash size={16} className="sm:w-4.5 sm:h-4.5" /> : <FaEye size={16} className="sm:w-4.5 sm:h-4.5" />}
                    </button>
                </div>

                {/* Register Button */}
                <button type="submit" className="w-full mt-4 sm:mt-6 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-colors">
                    Register
                </button>

                {/* Divider */}
                <div className="flex items-center my-4 sm:my-6">
                    <div className="flex-1 h-px bg-gray-700"></div>
                    <span className="px-2 sm:px-3 text-gray-400 text-xs sm:text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-700"></div>
                </div>

                {/* Google Button */}
                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            try {
                                const res = await api.post("/auth/google", {
                                    token: credentialResponse.credential,
                                })

                                login(res.data.user, res.data.token)
                                router.push("/")
                            } catch (error) {
                                console.log("Google Login Failed")
                            }
                        }}
                        onError={() => console.log("Login Failed")}
                    />
                </div>

                {/* Login Link */}

            </form>
            <p className="text-gray-400 text-xs sm:text-sm text-center mt-4 sm:mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-green-400 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    )

}
