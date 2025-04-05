import React, { useEffect, useState } from "react";
import Upperbar from "../Components/Common/Upperbar";
import {
  Archive,
  Truck,
  Box,
  Wallet,
  ShoppingBag,
  Banknote,
  UserCheck,
  Menu,
  X,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Settings,
  Landmark,
  Home,
  User,
  Store,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "intro.js/introjs.css";
import introJs from "intro.js";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const data = [
    { title: "Total Earnings", amount: "27,264", icon: DollarSign },
    { title: "Total Orders", amount: "+2", icon: ShoppingBag },
    { title: "Current Balance", amount: "3,550", icon: Banknote },
    { title: "Received Amount", amount: "23,753", icon: Wallet },
  ];

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSidenavCollapsed, setIsSidenavCollapsed] = useState(true);
  const [isAccountSetupComplete, setIsAccountSetupComplete] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !localStorage.getItem("hasVisitedDashboard");
  });
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const startTour = () => {
    const intro = introJs();
    intro.setOptions({
      showStepNumbers: false,
      showButtons: false, // No navigation buttons for fully automatic tour
      showBullets: false,
      exitOnOverlayClick: false, // Prevent manual exit
      disableInteraction: true, // Prevent interaction during tour
      tooltipClass: "custom-intro-tooltip",
      steps: [
        {
          element: document.querySelector(".dashboard-header"),
          intro: "Welcome to easyDrop! This is your dashboard to manage your dropshipping business.",
          position: "bottom",
        },
        {
          element: document.querySelector(".total-income-card"),
          intro: "Here’s your Total Earnings, showing all the income from your sales.",
          position: "right",
        },
        {
          element: document.querySelector(".total-orders-card"),
          intro: "This card displays the Total Orders you’ve received so far.",
          position: "right",
        },
        {
          element: document.querySelector(".current-balance-card"),
          intro: "Your Current Balance is shown here, reflecting funds available now.",
          position: "left",
        },
        {
          element: document.querySelector(".received-amount-card"),
          intro: "This is the Received Amount, the total money you’ve collected.",
          position: "left",
        },
        {
          element: document.querySelector(".account-setup-card"),
          intro: "Start by setting up your account and business profile here.",
          position: "top",
        },
        {
          element: document.querySelector(".choose-product-card"),
          intro: "Next, choose products from our store to sell in your business.",
          position: "top",
        },
        {
          element: document.querySelector(".payment-methods-card"),
          intro: "Set up your payment methods to receive earnings smoothly.",
          position: "top",
        },
        {
          element: document.querySelector(".receive-payment-card"),
          intro: "Finally, receive payments into your account after deliveries.",
          position: "top",
        },
        {
          element: document.querySelector(".marketplace-post-section"),
          intro: "Post your products to the marketplace to attract more orders!",
          position: "top",
        },
      ].filter(step => step.element), // Ensure only valid elements are included
    });

    intro.start();

    const totalSteps = intro._introItems.length;
    let currentStep = 0;
    const autoAdvance = setInterval(() => {
      if (currentStep < totalSteps - 1) {
        intro.nextStep();
        currentStep++;
      } else {
        intro.exit();
        clearInterval(autoAdvance);
        localStorage.setItem("hasVisitedDashboard", "true");
        setIsFirstVisit(false);
      }
    }, 3000); // 3 seconds per step

    intro.onexit(() => {
      clearInterval(autoAdvance);
    });
  };

  useEffect(() => {
    if (isFirstVisit) {
      startTour();
    }
  }, [isFirstVisit]);

  const handleAccountSetupComplete = () => {
    setIsAccountSetupComplete(true);
    localStorage.setItem("accountSetupComplete", "true");
  };

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
          className="absolute top-0 left-0 w-28 h-28 max-sm:w-16 max-sm:h-16 text-green-300 opacity-60 z-0"
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
          className="absolute bottom-0 right-0 w-28 h-28 max-sm:w-16 max-sm:h-16 text-blue-300 opacity-60 z-0"
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
          className="absolute top-1/3 left-1/3 w-28 h-28 max-sm:w-16 max-sm:h-16 text-purple-300 opacity-60 z-0"
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
          className="absolute bottom-2 left-2 w-28 h-28 max-sm:w-16 max-sm:h-16 text-orange-300 opacity-60 z-0"
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white text-mouve p-4 z-50 w-full fixed top-0 left-0 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="data:image/jpeg;base64,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"
              alt="easyDrop Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="text-xl font-bold hidden md:block">easyDrop</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? <X size={24} className="text-mouve" /> : <Menu size={24} className="text-mouve" />}
            </button>
            <button
              onClick={startTour}
              className="bg-color1 hover:bg-color2 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors"
            >
              <UserCheck size={16} />
              {!isSidenavCollapsed && <span className="hidden md:block">Start Tour</span>}
            </button>
          </div>
        </div>
        {isNavOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded-b-lg shadow-md">
            <Link to="/dashboard" className="flex items-center py-2 px-4 text-mouve hover:bg-gray-200 rounded">
              <Home size={20} className="mr-2" /> Dashboard
            </Link>
            <Link to="/manage" className="flex items-center py-2 px-4 text-mouve hover:bg-gray-200 rounded">
              <User size={20} className="mr-2" /> Manage
            </Link>
            <Link to="/myaccount" className="flex items-center py-2 px-4 text-mouve hover:bg-gray-200 rounded">
              <Store size={20} className="mr-2" /> Profile
            </Link>
            <button
              onClick={startTour}
              className="w-full text-left flex items-center py-2 px-4 bg-color1 hover:bg-color2 text-white rounded-lg transition-colors"
            >
              <UserCheck size={20} className="mr-2" /> Start Tour
            </button>
          </div>
        )}
      </nav>

      {/* Sidebar Navigation */}
      <div
        className={`bg-mouve fixed top-16 pt-4 left-0 z-40 transition-all duration-300 ${
          isSidenavCollapsed ? "w-16" : "w-64"
        } md:block hidden h-[calc(100vh-4rem)] shadow-md`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold text-white ${isSidenavCollapsed ? "hidden" : "block"}`}>
              Menu
            </h2>
            <button
              onClick={() => setIsSidenavCollapsed(!isSidenavCollapsed)}
              className={`text-white hover:text-gray-300 ${isSidenavCollapsed ? "w-full flex justify-center" : "ml-auto"}`}
            >
              {isSidenavCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
          <ul className="space-y-2 flex-grow">
            <li className="bg-purple-400 rounded ">
              <Link
                to="/dashboard"
                onClick={() => setSelectedMenu("Dashboard")}
                className={`flex items-center py-2 px-4 text-white rounded transition-colors ${
                  selectedMenu === "Dashboard" ? "bg-purple-800" : "hover:bg-purple-400"
                } ${isSidenavCollapsed ? "justify-center" : ""}`}
              >
                <Home size={20} className="min-w-[20px]" />
                <span className={`ml-2 ${isSidenavCollapsed ? "hidden" : "block"}`}>Dashboard</span>
              </Link>
            </li>
            <li className="bg-purple-400 rounded ">
              <Link
                to="/manage"
                onClick={() => setSelectedMenu("Manage")}
                className={`flex items-center py-2 px-4 text-white rounded transition-colors ${
                  selectedMenu === "Profile" ? "bg-purple-800" : "hover:bg-purple-400"
                } ${isSidenavCollapsed ? "justify-center" : ""}`}
              >
                <User size={20} className="min-w-[20px]" />
                <span className={`ml-2 ${isSidenavCollapsed ? "hidden" : "block"}`}>Profile</span>
              </Link>
            </li>
            <li className="bg-purple-400 rounded ">
              <Link
                to="/myaccount"
                onClick={() => setSelectedMenu("Account")}
                className={`flex items-center py-2 px-4 text-white rounded transition-colors ${
                  selectedMenu === "Marketplace" ? "bg-purple-800" : "hover:bg-purple-400"
                } ${isSidenavCollapsed ? "justify-center" : ""}`}
              >
                <Store size={20} className="min-w-[20px]" />
                <span className={`ml-2 ${isSidenavCollapsed ? "hidden" : "block"}`}>Marketplace</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">
        <div className="pt-16">
          {/* Welcome Section */}
          <div className="bg-custom-gradient flex items-center justify-center p-4 sm:p-10 dashboard-header">
            <div className="text-center leading-relaxed text-white">
              <div className="flex gap-2 items-center justify-center">
                <Archive className="w-8 h-8 sm:w-10 sm:h-10" />
                <h1 className="text-lg sm:text-2xl font-bold">easyDrop</h1>
              </div>
              <h3 className="text-sm sm:text-lg lg:text-xl">Simplify Your DropShipping Journey</h3>
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mt-3 sm:mt-4">
                <button className="w-full sm:w-1/2 bg-purple-800 rounded p-2 sm:p-3 flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6" /> Get Started
                </button>
                <button className="w-full sm:w-1/2 bg-up rounded p-2 sm:p-3 flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Box className="w-5 h-5 sm:w-6 sm:h-6" /> Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="flex flex-col items-center p-3 max-sm:p-2">
            <h2 className="text-lg max-sm:text-base sm:text-xl md:text-2xl font-semibold text-gray-600 mb-3 max-sm:mb-2 sm:mb-4 sm:mb-6">
              Insights
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 max-sm:gap-1 sm:gap-3 sm:gap-6 w-full max-w-6xl">
              {data.map((item, index) => {
                const style = cardStyles[item.title] || cardStyles["Total Earnings"];
                const displayValue = item.title === "Total Orders" ? item.amount : `Tk.${item.amount}`;
                const shadowColor =
                  style.border === "border-green-300"
                    ? "rgba(34, 197, 94, 0.3)"
                    : style.border === "border-blue-300"
                    ? "rgba(59, 130, 246, 0.3)"
                    : style.border === "border-purple-300"
                    ? "rgba(147, 51, 234, 0.3)"
                    : "rgba(249, 115, 22, 0.3)";

                return (
                  <div
                    key={index}
                    className={`relative w-full ${
                      index === 0
                        ? "total-income-card"
                        : index === 1
                        ? "total-orders-card"
                        : index === 2
                        ? "current-balance-card"
                        : "received-amount-card"
                    }`}
                  >
                    <div
                      className={`absolute -top-3 max-sm:-top-1.5 right-2 max-sm:right-1 p-1 max-sm:p-0.5 sm:p-2 bg-white rounded-full shadow-md z-20 border ${style.iconBorder}`}
                    >
                      {React.cloneElement(style.icon, {
                        className: `${style.icon.props.className} max-sm:w-3 max-sm:h-3 sm:w-4 sm:h-4`,
                      })}
                    </div>
                    <div
                      className={`relative p-3 max-sm:p-2 pt-6 max-sm:pt-4 sm:p-4 sm:pt-8 bg-white rounded-xl max-sm:rounded-lg shadow-md hover:shadow-lg border ${style.border} transition-all duration-300 transform hover:-translate-y-1 overflow-hidden min-h-[100px] max-sm:min-h-[80px] sm:min-h-[120px] sm:min-h-[150px]`}
                      style={{ boxShadow: `inset 0 -8px 12px -5px ${shadowColor}` }}
                    >
                      {style.svg}
                      <div className="relative z-10 text-center">
                        <h2 className="text-xs max-sm:text-[10px] sm:text-sm md:text-base font-semibold text-gray-900 tracking-tight">
                          {item.title}
                        </h2>
                        <p className={`text-sm max-sm:text-[12px] sm:text-lg md:text-xl font-bold ${style.text} mt-1 max-sm:mt-0.5 sm:mt-1 sm:mt-2`}>
                          {displayValue}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Account Creation */}
          {
            !isAccountSetupComplete && 
          
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[6px] w-full mt-6 max-w-screen-lg p-1 sm:p-2 sm:mt-10">
              {[
                {
            
                  text: "Setup your business & logo.",
                  icon: <Settings className="w-6 h-6 sm:w-10 sm:h-10 text-mouve" />,
                  className: "account-setup-card",
                },
                {
                  
                  text: "Choose product from our store.",
                  icon: <ShoppingCart className="w-6 h-6 sm:w-10 sm:h-10 text-mouve" />,
                  
                  className: "choose-product-card",
                },
                {
                 
                  text: "Setup your business payment method.",
                  icon: <Landmark className="w-6 h-6 sm:w-10 sm:h-10 text-mouve" />,
                 
                  className: "payment-methods-card",
                },
                {
                 
                  text: "After delivery get your money on your account.",
                  icon: <Wallet className="w-6 h-6 sm:w-10 sm:h-10 text-mouve" />,
                 
                  className: "receive-payment-card",
                },
              ].map((item, index) => (
                <div key={index} className={`w-full p-1 sm:p-2 rounded-lg flex flex-col  bg-white ${item.className}`}>
                  <div className="flex items-center justify-center">
                  <div className=" flex justify-center items-center h-6 w-6 sm:h-8 sm:w-8 pt-4">{item.icon}</div>
                  </div>
                  <div className="p-2 sm:p-4 ">
                    <p className="text-xs sm:text-base text-center">{item.text}</p>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
}
          {/* Marketplace Section */}
          <div className="w-full mt-4 marketplace-post-section">
            <div className="bg-gradient-to-r from-color1 to-color2 flex items-center justify-center p-4 text-white font-bold text-center">
              <h1>মার্কেটপ্লেসে পোস্ট করুন এবং বেশি বেশি অর্ডার করুন।</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Intro.js */}
      <style jsx>{`
        .custom-intro-tooltip {
          background-color: #ffffff;
          color: #333;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          padding: 16px;
          font-size: 14px;
          max-width: 300px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;