"use client"
import React from 'react'

function Login() {
  return (
   <div className='flex items-center justify-center h-screen'>
    <div className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f] p-6'>
        <h2 className='text-lg font-medium mb-4 text-gray-100 text-center'>Login</h2>
        <form>
            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-100 mb-2'>Email</label>
                <input type="email" placeholder='Enter your email' className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-100 mb-2'>Password</label>
                <input type="password" placeholder='Enter your password' className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
            </div>
            <div className='mb-4'>
                <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200'>Login</button>
            </div>
            <div className='text-center'>
                <p className='text-sm text-gray-400'>Don't have an account? <a href='#' className='text-blue-400 hover:text-blue-300'>Sign Up</a></p>
            </div>
        </form>
    </div>
   </div>
  )
}

export default Login