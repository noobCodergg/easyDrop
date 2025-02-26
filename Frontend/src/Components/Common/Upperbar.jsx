import React from "react";
import { Bell, LogOut, Search, User, Package } from "lucide-react";

const Upperbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50 border-b border-indigo-200/30">
      <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-3 sm:space-x-5">
          <Package size={28} className="text-purple-600 drop-shadow-sm" />
          <span className="text-xl font-semibold text-purple-700 tracking-tight drop-shadow-sm">
            easyDrop
          </span>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <button className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:outline-none hidden sm:block">
            <Search size={20} className="text-indigo-600" />
          </button>

          <button className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:outline-none hidden sm:block">
            <Bell size={20} className="text-indigo-600" />
          </button>

          <button className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:outline-none hidden sm:block">
            <User size={20} className="text-indigo-600" />
          </button>

          <button className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:outline-none">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Upperbar;
