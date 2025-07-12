"use client"
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'

function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const countryRef = useRef()
    const mobileRef = useRef()

    const[message, setMessage] = useState('')
    const router = useRouter()

    const handleSignup = async (e) => {
        e.preventDefault()
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            country: countryRef.current.value,
            mobile: mobileRef.current.value
        }

        try {
            console.log('Sending data:', data);
            const response = await axios.post('https://adminbackend-czlc.onrender.com/signup/', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Response:', response.data);
            setMessage(response.data.message || 'User created successfully');
            toast.success("User created successfully");
            if(response.data.message === 'User created successfully'){
                router.push('/login');
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
        <div className="min-h-screen flex items-center justify-center min-w-screen align-middle px-4">
        <form
            onSubmit={handleSignup}
            method="POST"
            className="bg-[#1e1e1e] text-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            <div className="mb-4">
                <label className="block text-sm mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    ref={nameRef}
                    className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    ref={emailRef}
                    className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    required
                    ref={passwordRef}
                    className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm mb-1">Country</label>
                <input
                    type="country"
                    name="country"
                    required
                    ref={countryRef}
                    className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm mb-1">Mobile Number</label>
                <input
                    type="tel"
                    name="mobile"
                    required
                    ref={mobileRef}
                    className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
                Submit
            </button>
            <p className="text-sm text-red-500 text-center mt-4">{message}</p>
            <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300">
                        Login
                    </Link>
                </p>
            </div>
        </form>
        </div>
    )
}

export default  Signup