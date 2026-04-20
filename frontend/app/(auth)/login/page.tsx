"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useAuth } from "@/src/context/AuthContext"
import api from "@/src/api/axios"
import { GoogleLogin } from "@react-oauth/google"
import { toast } from "react-toastify"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [countdown, setCountdown] = useState<number | null>(null)
    const router = useRouter()
    const { login, isLoggedIn } = useAuth()

    // Countdown effect
    useEffect(() => {
        if (countdown === null || countdown <= 0) return

        const timer = setTimeout(() => {
            setCountdown(countdown - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [countdown])

    // Redirect when countdown reaches 0
    useEffect(() => {
        if (countdown === 0) {
            const redirectPath = sessionStorage.getItem('redirectAfterLogin')
            sessionStorage.removeItem('redirectAfterLogin')
            router.push(redirectPath || "/")
        }
    }, [countdown, router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (email == '' || password == '') {
            return toast.info("Please Enter All The required Fields", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
        try {
            setIsLoading(true)
            const res = await api.post("/login", {
                email,
                password,
            })

            login(res.data.user, res.data.token)
            setCountdown(3)
        } catch (err) {
            setIsLoading(false)
            alert("Invalid credentials")
        }
    }

    return (
        <div className="w-full max-w-sm sm:max-w-md bg-gray-900 p-4 sm:p-8 rounded-2xl shadow-lg mx-4 sm:mx-0">
            {countdown !== null ? (
                // Redirect countdown screen
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Welcome! 🎉</h2>
                        <p className="text-gray-300 mb-8">Redirecting you in...</p>

                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-4xl font-bold text-black">{countdown}</span>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm">Get ready for an amazing experience!</p>
                    </div>
                </div>
            ) : (
                // Login form
                <form onSubmit={handleLogin} >

                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Welcome Back ⚽
                    </h2>

                    {/* Email */}
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500" type="email" placeholder="Email" disabled={isLoading} />

                    {/* Password */}
                    <div className="mt-4 relative">
                        <input
                            className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                            disabled={isLoading}
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>

                    {/* Login Button */}
                    <button type="submit" disabled={isLoading} className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-700"></div>
                        <span className="px-3 text-gray-400 text-sm">OR</span>
                        <div className="flex-1 h-px bg-gray-700"></div>
                    </div>

                    {/* Google Button */}
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    setIsLoading(true)
                                    const res = await api.post("/login/google", {
                                        token: credentialResponse.credential,
                                    })
                                    login(res.data.user, res.data.token)
                                    setCountdown(3)
                                } catch (error) {
                                    setIsLoading(false)
                                    console.log("Google Login Failed")
                                }
                            }}
                            onError={() => console.log("Login Failed")}
                        />
                    </div>

                    {/* Register Link */}
                </form>
            )}

            {countdown === null && (
                <p className="text-gray-400 text-sm text-center mt-6">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-green-400 hover:underline">
                        Register
                    </Link>
                </p>
            )}
        </div>
    )

}
