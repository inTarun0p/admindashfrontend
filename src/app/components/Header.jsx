"use client"
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import { Bell, LogOutIcon } from 'lucide-react'


function Header() {
    const [name, setName] = useState("")
    
    useEffect(() => {
        const storedName = localStorage.getItem("name")
        if (storedName) {
            setName(storedName)
        }
    }, [])
    const logout = (e) => {
        e.preventDefault()
        localStorage.clear()
        window.location.href = "/login"
    }
    return (
        <header className='bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f]  mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg'>
            <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between'>
                <h1 className='text-xl sm:text-lg lg:text-2xl font-semibold text-gray-100'>Dashboard</h1>
                <div className='flex items-center space-x-3 sm:space-x-4'>
                    <Image src="/images/india.png" alt="india" width={20} height={20} className='rounded-full shadow-md cursor-pointer' />

                    <div className='relative cursor-pointer'>
                        <Bell className='w-5 h-5 text-gray-300' />
                    </div>
                    <div className='flex items-center space-x-2 sm:space-x-3'>
                        <Image src="/images/avatar.png" alt="avatar" width={40} height={40} className='rounded-full shadow-md cursor-pointer' />
                    </div>
                    <span className='hidden sm:block text-gray-100 font-medium'>{name}</span>
                    <div className='flex items-center space-x-2 sm:space-x-3'>
                        <LogOutIcon className='w-5 h-5 text-gray-300' onClick={logout}/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
