"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 flex items-center justify-between px-8 text-gray-800 font-sans">
      <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 w-96 transition-colors focus-within:border-[#8a198c] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#8a198c]/20">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400 font-medium text-gray-800"
        />
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => alert("No new notifications")}
          className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#8a198c] border-2 border-white rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8a198c] to-pink-600 flex items-center justify-center text-sm font-bold text-white shadow-md group-hover:scale-105 transition-transform">
            AK
          </div>
          <div>
            <p className="text-sm font-bold">Admin User</p>
            <p className="text-xs text-gray-500 font-medium">admin@outsmart.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
