import React from 'react'
import { assets } from "../assets/assets.js"
import { NavLink } from "react-router-dom"
import { Link, useLocation } from "react-router-dom"
import { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const location = useLocation();

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setShowProfileMenu(false);
  }

  const handleClickOutside = (e) => {
    if (!e.target.closest('.profile-menu')) {
      setShowProfileMenu(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo2} className='w-40' alt="logo" />
      </Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className="flex flex-col items-center gap-1 uppercase">
          <p className='uppercase'>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/collection' className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/about' className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/contact' className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        { location.pathname === '/collection' && (<img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="searchIcon" />)}
        <div className='relative profile-menu'>
          <img onClick={() => token ? setShowProfileMenu(!showProfileMenu) : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="profileIcon" />
          {/* Dropdown Menu */}
          {token && showProfileMenu &&
            <div className='absolute right-0 pt-4 profile-menu'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
                {/*<p className='cursor-pointer hover:text-black'>My Profile</p>*/}
                <p onClick={() => { navigate('/orders'); setShowProfileMenu(false) }} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>}
        </div>
        <Link to="/cart" className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="cartIcon" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="menuIcon" />
      </div>
      {/*side bar menu for small screens*/}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="dropdownIcon" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => { setVisible(false) }} to="/" className='py-2 pl-6 border'>Home</NavLink>
          <NavLink onClick={() => { setVisible(false) }} to="/collection" className='py-2 pl-6 border'>COLLECTION</NavLink>
          <NavLink onClick={() => { setVisible(false) }} to="/about" className='py-2 pl-6 border'>ABOUT</NavLink>
          <NavLink onClick={() => { setVisible(false) }} to="/contact" className='py-2 pl-6 border'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar


