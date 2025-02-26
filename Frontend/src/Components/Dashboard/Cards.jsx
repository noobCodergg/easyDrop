import React from "react";
import { DollarSign, ShoppingCart, Wallet, CreditCard } from "lucide-react";

const Cards = ({ data }) => {
  const { title, data: value } = data;

  const cardStyles = {
    "Total Earnings": {
      icon: <DollarSign className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-green-700" />,
      bg: "bg-green-100",
      border: "border-green-300",
      text: "text-green-900",
      glow: "bg-green-400/40",
      iconBorder: "border-green-500",
      svg: (
        <svg
          className="absolute top-0 left-0 w-14 h-14 max-sm:w-8 max-sm:h-8 text-green-300/50 opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
        </svg>
      ),
    },
    "Total Orders": {
      icon: <ShoppingCart className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-blue-700" />,
      bg: "bg-blue-100",
      border: "border-blue-300",
      text: "text-blue-900",
      glow: "bg-blue-400/40",
      iconBorder: "border-blue-500",
      svg: (
        <svg
          className="absolute bottom-0 right-0 w-16 h-16 max-sm:w-9 max-sm:h-9 text-blue-300/50 opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
        </svg>
      ),
    },
    "Current Balance": {
      icon: <Wallet className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-purple-700" />,
      bg: "bg-purple-100",
      border: "border-purple-300",
      text: "text-purple-900",
      glow: "bg-purple-400/40",
      iconBorder: "border-purple-500",
      svg: (
        <svg
          className="absolute top-1/3 left-1/3 w-14 h-14 max-sm:w-8 max-sm:h-8 text-purple-300/50 opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 12h18m-9-9v18" strokeWidth="2" />
        </svg>
      ),
    },
    "Received Amount": {
      icon: <CreditCard className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-orange-700" />,
      bg: "bg-orange-100",
      border: "border-orange-300",
      text: "text-orange-900",
      glow: "bg-orange-400/40",
      iconBorder: "border-orange-500",
      svg: (
        <svg
          className="absolute bottom-2 left-2 w-14 h-14 max-sm:w-8 max-sm:h-8 text-orange-300/50 opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="4,4 20,12 4,20" strokeWidth="2" />
        </svg>
      ),
    },
  };

  const style = cardStyles[title] || cardStyles["Total Earnings"];

  return (
    <div className="relative w-full max-sm:w-auto flex-1">
      {/* Floating Icon */}
      <div
        className={`absolute -top-3 right-3 p-2 max-sm:p-1 bg-white rounded-full shadow-md z-20 border ${style.iconBorder}`}
      >
        {style.icon}
      </div>

      {/* Card Container */}
      <div
        className={`relative p-4 max-sm:p-2 pt-8 max-sm:pt-5 bg-white rounded-lg shadow-md hover:shadow-lg border ${style.border} transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
      >
        {/* Background SVG */}
        {style.svg}

        {/* Card Content */}
        <div className="relative z-10 text-center">
          <h2 className="text-base max-sm:text-xs font-semibold text-gray-900 tracking-tight">
            {title}
          </h2>
          <p
            className={`text-xl max-sm:text-sm font-bold ${style.text} mt-1`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
