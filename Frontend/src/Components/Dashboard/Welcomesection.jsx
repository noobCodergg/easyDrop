import React from "react";
import { Truck, Package } from "lucide-react";

const Welcomesection = () => {
  return (
    <div className="relative w-full min-h-[150px] sm:min-h-[200px] md:min-h-[400px] bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-700 overflow-hidden px-2 sm:px-4 md:px-10 py-4 sm:py-6 md:py-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10"></div>

      <div className="relative z-20 flex flex-col items-center text-center space-y-1 sm:space-y-2 md:space-y-4">
        {/* Logo & Title */}
        <div className="flex items-center space-x-1 sm:space-x-2 animate-fade-in-down">
          <svg
            className="w-5 sm:w-8 md:w-12 h-5 sm:h-8 md:h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <span className="text-base sm:text-xl md:text-3xl font-extrabold text-white drop-shadow-lg tracking-wide">
            easyDrop
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-lg md:text-2xl text-white font-medium drop-shadow-md animate-fade-in-up">
          Simplify Your Dropshipping Journey
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 animate-fade-in-up delay-200">
          <button className="px-3 sm:px-6 py-1 sm:py-3 bg-purple-600 text-white text-xs sm:text-sm rounded-full shadow-md sm:shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center space-x-1 sm:space-x-2">
            <Truck size={14} sm:size={20} />
            <span>Get Started</span>
          </button>
          <button className="px-3 sm:px-6 py-1 sm:py-3 bg-blue-600 text-white text-xs sm:text-sm rounded-full shadow-md sm:shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-1 sm:space-x-2">
            <Package size={14} sm:size={20} />
            <span>Learn More</span>
          </button>
        </div>
      </div>

      {/* Floating Icons */}
      <svg
        className="absolute top-2 sm:top-8 left-2 sm:left-8 w-10 sm:w-20 md:w-32 h-10 sm:h-20 md:h-32 text-purple-300/80 animate-float"
        fill="currentColor"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>

      <svg
        className="absolute bottom-2 sm:bottom-8 right-2 sm:right-8 w-12 sm:w-24 md:w-40 h-12 sm:h-24 md:h-40 text-blue-300/80 animate-float-slow"
        fill="currentColor"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    </div>
  );
};

export default Welcomesection;
