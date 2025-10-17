import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 shadow-lg border-r border-gray-800 
                      w-20 sm:w-48 lg:w-56 
                      h-[calc(100vh-64px)]  left-0 
                      flex flex-col justify-between">
      
      {/* Sidebar Links */}
      <div className="flex flex-col space-y-6 mt-6 sm:mt-10">
        
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 
            hover:bg-gray-800 hover:text-red-400 
            ${isActive ? "bg-gray-800 text-red-500 font-semibold" : "text-gray-300"}`
          }
        >
          <img src={assets.add_icon} alt="addIcon" className="h-6 w-6 sm:h-7 sm:w-7" />
          <p className="hidden sm:block text-sm sm:text-base">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 
            hover:bg-gray-800 hover:text-red-400 
            ${isActive ? "bg-gray-800 text-red-500 font-semibold" : "text-gray-300"}`
          }
        >
          <img src={assets.order_icon} alt="listIcon" className="h-6 w-6 sm:h-7 sm:w-7" />
          <p className="hidden sm:block text-sm sm:text-base">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 
            hover:bg-gray-800 hover:text-red-400 
            ${isActive ? "bg-gray-800 text-red-500 font-semibold" : "text-gray-300"}`
          }
        >
          <img src={assets.order_icon} alt="ordersIcon" className="h-6 w-6 sm:h-7 sm:w-7" />
          <p className="hidden sm:block text-sm sm:text-base">Orders</p>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
