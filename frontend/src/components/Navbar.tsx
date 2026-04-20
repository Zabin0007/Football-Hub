'use client';
import { LuLogOut } from "react-icons/lu";
import { useState } from 'react';
import { HiTrendingUp } from "react-icons/hi";
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout, isLoggedIn } = useAuth()

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleConfirmLogout = () => {
    setShowLogoutModal(false)
    setIsMenuOpen(false)
    
    // Call logout function from useAuth
    logout()
    
    // Show success toast
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const handleCancelLogout = () => {
    setShowLogoutModal(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 z-50 shadow-lg">
        <div className="md:mx-45 md:my-1 flex justify-between items-center">
          
          {/* Logo Section */}
          <Link href={'/'}>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-xl"><HiTrendingUp /></span>
            </div>
            <span className="text-white font-bold text-lg tracking-tighter">
              Now<span className="text-green-500">Score</span>
            </span>
          </div>
        </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            {isLoggedIn && (
              <button 
                onClick={handleLogoutClick} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-gray-800 hover:text-red-500 transition-all duration-300 font-semibold text-md"
              >
                <LuLogOut className="text-lg"/>
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-48 mt-4' : 'max-h-0'}`}>
          <div className="flex flex-col gap-4 py-4 border-t border-gray-700">    
            {isLoggedIn && (
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-red-600 hover:text-red-100 transition-all duration-300 font-semibold text-md w-full justify-center"
                onClick={handleLogoutClick}
              >
                <LuLogOut className="text-lg"/>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm mx-4 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Logout</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to logout?</p>
            
            <div className="flex gap-4">
              <button
                onClick={handleCancelLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}