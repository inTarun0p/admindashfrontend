"use client"
import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Edit, Search, Trash } from 'lucide-react'
import Image from 'next/image'

function UserTable() {
    const[clients, setClients] = useState([])
    const[seacrhTerm, setSearchTerm] = useState("")
   

    
    useEffect(() => {
        fetch("/data/data.json")
        .then(res => res.json())
        .then(data => setClients(data.clients))
    }, [])

    const filterClients = clients.filter((client)=>{
        return client.name.toLowerCase().includes(seacrhTerm.toLowerCase()) || client.email.toLowerCase().includes(seacrhTerm.toLowerCase())
    })
  return (
    <motion.div 
    initial={{ opacity: 0,y:20 }}
    animate={{ opacity: 1,y:0 }}
    transition={{ duration: 0.5,delay:0.4 }}
    className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f]'> 

    <div className=' flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0'>
        <h2 className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center px-4 pt-2 md:text-left'>User Table</h2>

        <div className='relative w-full md:w-auto'>
            <input type="text" placeholder='Search'
            onChange={(e)=>setSearchTerm(e.target.value)}
            value={seacrhTerm}
           
           
            className='bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 mr-2 py-2 md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-duration-200 text-sm'/>

            <Search className='absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400' size={18}/>
        </div>
    </div>
    <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700 rounded-lg'>
            <thead>
                <tr>
                    {[
                        "Name",
                        "Email",
                        "Phone",
                        "Country",
                        "Action"
                    ].map((header,index)=>(
                        <th key={index} className='px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider hidden md:table-cell'>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
                    {
                        filterClients.map((client,index)=>(
                            <motion.tr key={client.id}
                            initial={{ opacity: 0,y:20 }}
                            animate={{ opacity: 1,y:0 }}
                            transition={{ duration: index*0.1,delay:0.3 }}
                            className='flex flex-col sm:table-row mb-4 sm:mb-0 sm:border-b-0 border-b border-gray-700 sm:border-none p-2 sm:p-0 '
                            >
                                {/* mobile view */}
                                <td className='sm:hidden px-3 py-2'>
                                    <div className='flex items-center'>
                                        <Image src={client.image} alt={client.name} width={50} height={50} className='h-9 w-9 rounded-full'/>
                                        <div className='ml-3'>
                                            <p className='font-medium text-gray-100'>{client.name}</p>
                                            <p className='text-sm text-gray-400'>{client.email}</p>
                                        </div>
                                    </div>
                                </td>
                                {/* desktop view */}
                                <td className='hidden md:table-cell px-3 py-4'>
                                    <div className='flex items-center'>
                                        <Image src={client.image} alt={client.name} width={50} height={50} className='h-9 w-9 rounded-full'/>
                                        <div className='ml-3'>
                                            <p className='font-medium text-gray-100'>{client.name}</p>
                                            
                                        </div>
                                    </div>
                                </td>
                                <td className='hidden md:table-cell px-3 py-4'>
                                    <p className='text-sm text-gray-400'>{client.email}</p>
                                </td>
                                <td className='hidden md:table-cell px-3 py-4'>
                                    <p className='text-sm text-gray-400'>{client.phoneNumber}</p>
                                </td>
                                <td className='hidden md:table-cell px-3 py-4'>
                                    <p className='text-sm text-gray-400'>{client.country}</p>
                                </td>
                                <td className='sm:text-center md:text-left md:table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                    <div className='flex items-center justify-start align-center'>
                                        <Edit className=' text-blue-400 hover:text-blue-300 mr-2' size={16}/>
                                        <Trash className=' text-red-400 hover:text-red-300' size={16}/>
                                    </div>
                                </td>
                            </motion.tr>
                        ))
                    }
            </tbody>    
        </table>
    </div>
    </motion.div>
  )
}

export default UserTable