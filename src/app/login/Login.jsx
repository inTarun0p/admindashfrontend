"use client"
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const router = useRouter()
    const[message, setMessage] = useState('')
    const handleLogin = async(e) => {
        e.preventDefault()
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Response:', response.data);
            if(response.data.message === 'Login successful'){
                toast.success("Login successful",{position:"top-center"});
                router.push('/Overview');
                console.log('User data:', response.data.data);
                localStorage.setItem("isLogin", true)
                localStorage.setItem("name", response.data.data.name);
            }
        } catch (error) {
            console.error('Full error:', error);
            console.error('Error response:', error.response);
            const errorMsg = error.response?.data?.details || 
                           error.response?.data?.error || 
                           error.message || 
                           'Something went wrong';
            setMessage(errorMsg);
            toast.error(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
        }
    }
  return (
   <div className='flex items-center justify-center w-full  align-middle h-screen'>
    <div className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f] p-6'>
        <h2 className='text-lg font-medium mb-4 text-gray-100 text-center'>Login</h2>
        <form method='POST' onSubmit={handleLogin}>
            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-100 mb-2'>Email</label>
                <input type="email" ref={emailRef} placeholder='Enter your email' className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-100 mb-2'>Password</label>
                <input type="password" ref={passwordRef} placeholder='Enter your password' className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
            </div>
            <div className='mb-4'>
                <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200'>Login</button>
            </div>
            <div className='text-center'>
                <p className='text-sm text-gray-400'>Don't have an account? <Link href='/signup' className='text-blue-400 hover:text-blue-300'>Sign Up</Link></p>
            </div>
        </form>
       <p className='text-sm text-red-500 text-center mt-4'>{message}</p>
    </div>
   </div>
  )
}

export default Login