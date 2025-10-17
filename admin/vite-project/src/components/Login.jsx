import React from 'react'
import { useState } from 'react'
import { API_URL } from '../utilities/ApiPath';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';


const Login = ({setToken}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = async()=>{
      const response = await API_URL.post("/api/user/admin", {email, password});
      return response.data
    }

    const mutation = useMutation({
      mutationFn: userLogin,
      onSuccess:(data)=>{
        if(data.success){
          setEmail("");
          setPassword("");
          setToken(data.token);
          toast.success("Welcome to ShoppyGlobe Admin Panel!", {
            position: "top-center",
          });
        }else{
          toast.error(data.message || "Invalid credentials");
        }
      },
      onError: (error)=>{
        console.log(error);
        toast.error(error.message);
      }
    });

    const onSubmitHandler = async(e)=>{
      e.preventDefault();
      mutation.mutate({email, password});
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-950 p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6">
          Admin Panel
        </h1>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="Email"
              placeholder="Enter Email Address"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white 
                         placeholder-gray-400 border border-gray-700 
                         focus:ring-2 focus:ring-gray-500 focus:border-gray-500 
                         transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              placeholder="Enter your Password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white 
                         placeholder-gray-400 border border-gray-700 
                         focus:ring-2 focus:ring-gray-500 focus:border-gray-500 
                         transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            onClick={onSubmitHandler}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold 
                       transition-all duration-200 ease-in-out 
                       hover:bg-gray-800 active:scale-95 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login




