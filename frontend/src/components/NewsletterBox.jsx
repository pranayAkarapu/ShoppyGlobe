import React, { useState } from 'react'
import { toast } from 'react-toastify';

const NewsletterBox = () => {
  const [email, setEmail] = useState('')
  const onSubmitHandler = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
    setEmail('');
  }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Join us and get access to exclusive deals, new arrivals, and offers.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-400 pl-3'>
        <input type="text" placeholder='Enter your email' required value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full sm:flex-1 outline-none' />
        <button type="submit" className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
