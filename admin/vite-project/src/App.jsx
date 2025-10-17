import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes, Route, Navigate} from 'react-router-dom'
import Add from './Pages/Add.jsx'
import List from './Pages/List.jsx'
import Orders from './Pages/Orders.jsx'
import Login from './components/Login.jsx'
import { useState, useEffect } from 'react'
import { ToastContainer} from 'react-toastify';

export const currency = "$";

const App = () => {
  const [token,setToken] = useState(localStorage.getItem("token")? localStorage.getItem("token"):"");

  useEffect(()=>{
    localStorage.setItem("token", token)
  },[token]);

  return (
    <React.Fragment>
      <ToastContainer/>
      <div className="bg-gray-50 min-h-screen">
        {token === "" ? <Login setToken={setToken}/> :
        <>
        <Navbar setToken={setToken}/>
        <div className="flex w-full">
          <Sidebar />
          <div className='w-[70%] ml-[max(5vw, 25px)] mt-5 p-6 text-gray-600 text-base overflow-y-auto max-h-[calc(100vh-80px)]'>
            <Routes>
              <Route path="/" element={<Navigate to="/add" replace />} />
              <Route path="/add" element={<Add token={token}/>}/>
              <Route path="/list" element={<List token={token}/>}/>
              <Route path="/orders" element={<Orders token={token}/>}/>
            </Routes>
          </div>
        </div>
        </>
        }
      </div>
    </React.Fragment>
  )
}

export default App

