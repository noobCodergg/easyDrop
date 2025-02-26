
import React, { useState } from "react";
import { Home, LayoutDashboard, Settings, User, LogOut, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidenav = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return (
    <aside
      className={`fixed top-0 pt-20 left-0 h-screen bg-gradient-to-b from-purple-800 via-indigo-700 to-blue-700 shadow-lg z-40 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <div className="flex flex-col h-full py-6 relative">
        
        <div className="absolute top-4 left-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md transition-colors duration-200"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            <Menu size={24} />
          </button>
        </div>

       
        <nav className="flex flex-col flex-1 space-y-2 px-2 mt-16">
          <NavItem
            to="/"
            icon={<Home size={20} />}
            label="Home"
            active={location.pathname === "/"}
            isExpanded={isExpanded}
          />
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={location.pathname === "/dashboard"}
            isExpanded={isExpanded}
          />
          <NavItem
            to="/profile"
            icon={<User size={20} />}
            label="Profile"
            active={location.pathname === "/profile"}
            isExpanded={isExpanded}
          />
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
            active={location.pathname === "/settings"}
            isExpanded={isExpanded}
          />
        </nav>

        
        <div className="mt-auto px-2 pb-6">
          <button
            className={`flex items-center justify-center w-full space-x-2 px-4 py-2 bg-white text-white rounded-lg shadow-md hover:bg-red-200 transition-colors duration-200 ${
              !isExpanded && "px-2 space-x-0"
            }`}
          >
            <LogOut size={18} color="red"/>
            {isExpanded && <span className="text-md font-medium text-red-600">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label, active, isExpanded }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-2 w-full text-white rounded-lg shadow-sm transition-all duration-200 ${
        active
          ? "bg-purple-600 text-white"
          : "bg-white/10 hover:bg-white/20"
      } ${!isExpanded && "justify-center px-2 space-x-0"}`}
    >
      {icon}
      {isExpanded && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

export default Sidenav;