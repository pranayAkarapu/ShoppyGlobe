
/*import React from 'react'
import { assets } from "../assets/assets.js"
import {toast} from "react-toastify"

const Navbar = ({setToken}) => {

  const handleLogout = () => {
  toast.info(
    <div className="space-y-2">
      <p>Are you sure you want to logout?</p>
      <div className="flex gap-3">
        <button
          onClick={() => {
            setToken("");   
            toast.dismiss(); 
            toast.success("Logged out successfully!");
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss()}
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded text-sm"
        >
          No
        </button>
      </div>
    </div>,
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      position: "top-center",
    }
  );
  };

  return (
    <nav className="flex justify-between items-center 
                    px-4 sm:px-6 lg:px-8 py-3 sm:py-4 
                    bg-gray-900 shadow-md border-b border-gray-800">
 
      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
        <img 
          src={assets.logo} 
          alt="ShoppyGlobe Logo" 
          className="h-8 w-6 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain transition-all duration-200"
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white whitespace-nowrap">
            ShoppyGlobe
          </h1>
          <span className="hidden sm:inline text-gray-500">|</span>
          <p className="text-xs sm:text-sm lg:text-base text-gray-400 font-medium">
            Admin Panel
          </p>
        </div>
      </div>

      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 
                         sm:px-4 sm:py-2 lg:px-6 lg:py-2.5 
                         rounded text-sm sm:text-base font-medium 
                         transition-all duration-200 ease-in-out 
                         transform hover:scale-105 active:scale-95 
                         shadow-md focus:outline-none 
                         focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar*/


import React from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify';

const Navbar = ({setToken}) => {

  const handleLogout = () => {
  toast.info(
    <div className="space-y-2">
      <p>Are you sure you want to logout?</p>
      <div className="flex gap-3">
        <button
          onClick={() => {
            setToken("");   
            toast.dismiss(); 
            toast.success("Logged out successfully!");
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss()}
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded text-sm"
        >
          No
        </button>
      </div>
    </div>,
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      position: "top-center",
    }
  );
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img src={assets.logo} alt="" className='w-40'/>
      <button onClick={handleLogout} className='bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar


