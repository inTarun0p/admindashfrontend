"use client"
import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
function UpdateUser() {
    
    const {updateuserId} = useParams()
    console.log("Sending user ID:", updateuserId);

    useEffect(()=>{
        // Convert updateuserId to a number since IDs are typically numbers
        const userId = parseInt(updateuserId, 10);
        
        axios.get('http://127.0.0.1:8000/view_users/')
            .then((response) => {
                console.log('API Response:', response.data);
                
                // Check if response has data array
                if (response.data && Array.isArray(response.data.data)) {
                    // Find the user with matching ID
                    const user = response.data.data.find(user => user.id === userId);
                    
                    if (user) {
                        console.log('Found user:', user);
                        // Set form values if user is found
                        if (nameRef.current) nameRef.current.value = user.name || '';
                        if (emailRef.current) emailRef.current.value = user.email || '';
                        if (passwordRef.current) passwordRef.current.value = user.password || '';
                        if (countryRef.current) countryRef.current.value = user.country || '';
                        if (mobileRef.current) mobileRef.current.value = user.mobile || '';
                    } else {
                        console.error('User not found with ID:', userId);
                        toast.error('User not found');
                    }
                } else {
                    console.error('Unexpected response format:', response.data);
                    toast.error('Error loading user data');
                }
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
                toast.error('Failed to load user data');
            });    
    },[updateuserId])
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const countryRef = useRef()
    const mobileRef = useRef()

    
    const[message, setMessage] = useState('')
    const router = useRouter()
    const handleUpdate = async (e) => {
        e.preventDefault()
        const data = {
            id:updateuserId,
            name:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            country:countryRef.current.value,
            mobile:mobileRef.current.value
        }

    
        
           console.log(data)
      
            const response = await axios.post('https://adminbackend-czlc.onrender.com/update_user/', data,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((response)=>{
               
                console.log("Updated user:", response.data);
            setMessage(response.data.message || 'User updated successfully');
            toast.success("User updated successfully");
            if(response.data.message === 'User updated successfully'){
                router.push('/Overview');
            }
        })
        .catch((error)=>{
            console.log(error)
            toast.error("User not updated")
        }) 
    }    
    return (
        <div className="min-h-screen flex items-center justify-center min-w-screen align-middle px-4">
        <form
            onSubmit={handleUpdate}
            method="POST"
            className="bg-[#1e1e1e] text-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Update User</h2>

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
                Update
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

export default UpdateUser