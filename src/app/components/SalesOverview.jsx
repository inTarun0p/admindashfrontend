"use client"
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'

function SalesOverview() {

    const[salesData, setsalesData] = useState([])
    useEffect(() => {
        fetch("/data/data.json")
        .then(res => res.json())
        .then(data => setsalesData(data.sales))
    }, [])

  return (
    <motion.div 
    initial={{ opacity: 0,y:20 }}
    animate={{ opacity: 1,y:0 }}
    transition={{ duration: 0.5,delay:0.2 }}
    className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg  p-4 rounded-xl border border-[#1f1f1f] mx-2 md:mx-0 lg:mx-0'>
        <h2 className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left'>Sales Overview</h2>
        <div className='h-64 md:h-80'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3"  stroke='#4b5563'/>
                    <XAxis dataKey="name" stroke="#4b5563" tick={{fontSize:12}} interval="preserveStartEnd" />
                    <YAxis stroke="#9ca3af" tick={{fontSize:12}} width={40}  />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#4b5563', fontSize:"12px" }} />
                   <Line type="monotone" dataKey="sales" stroke="#9c2b70" strokeWidth={2} dot={{fill:"#9c2b70"}} activeDot={{r:6, strokeWidth:2}} />
                    </LineChart>    
            </ResponsiveContainer>

        </div>
    </motion.div>
  )
}

export default SalesOverview