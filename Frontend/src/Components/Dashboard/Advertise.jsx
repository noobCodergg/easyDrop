import React from "react";

const Advertise = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-700 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-10"></div>

      <svg
        className="absolute top-2 sm:top-4 left-2 sm:left-4 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 text-purple-300/40 animate-float"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
      </svg>
      <svg
        className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 text-blue-300/40 animate-float-slow"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      <div className="absolute -top-4 sm:-top-6 right-6 sm:right-10 w-14 sm:w-20 h-14 sm:h-20 bg-purple-400/30 blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-4 sm:-bottom-6 left-6 sm:left-10 w-16 sm:w-24 h-16 sm:h-24 bg-blue-400/30 blur-2xl animate-pulse-slow"></div>

      <div className="relative z-20 flex items-center justify-center h-full text-center px-4 sm:px-6 md:px-8">
        <p className="text-base sm:text-lg md:text-2xl font-bold text-white drop-shadow-lg animate-fade-in-up tracking-wide">
          মার্কেট প্লেসে পোস্ট করুন এবং বেশি বেশি অর্ডার নিন!
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 sm:h-2 bg-purple-400/30 blur-md opacity-70 transition-opacity duration-300 hover:opacity-100"></div>
    </div>
  );
};

export default Advertise;
