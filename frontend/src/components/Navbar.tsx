'use client';

import { useState } from 'react';
import { HiTrendingUp } from "react-icons/hi";
import { useAuth } from '../context/AuthContext';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth()
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 z-50 shadow-lg">
      <div className="md:mx-45 md:my-1 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
            <span className="text-black font-bold text-xl"><HiTrendingUp /></span>
          </div>
          <span className="text-white font-bold text-lg tracking-tighter">
            Now<span className="text-green-500">Score</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={logout} 
            className="flex items-center gap-1 text-bold tracking-tight text-white hover:text-gray-300 text-md transition-colors"
          >
            Logout
          </button>
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
           <button 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-left"
            onClick={() => {
              setIsMenuOpen(false)
              logout()
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}