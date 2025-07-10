"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, CartesianGrid, ResponsiveContainer ,XAxis, YAxis,Tooltip, Legend, Bar} from 'recharts'

function ProductPerformanceChart() {
    const [productPerformanceData, setProductPerformanceData] = useState([])
    useEffect(() => {
        fetch("/data/data.json")
        .then(res => res.json())
        .then(data => setProductPerformanceData(data.productPerformance))
    }, [])
  return (
  <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5,delay:0.6}}
    className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg  p-4 rounded-xl border border-[#1f1f1f] mx-2 md:mx-0 lg:mx-0'
  >
<h2 className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left'>Product Performance</h2>
<div className='h-64 md:h-80'>
    <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={productPerformanceData}
            >
                <CartesianGrid strokeDasharray={"3 3"} stroke="#374151"/>
                <XAxis dataKey="name" stroke="#374151" tick={{fontSize:12}} interval="preserveStartEnd" />
                <YAxis contentStyle={{color:"#374151"}} tick={{fontSize:12}} width={40} 
                itemStyle={{color:"#e5e7eb"}} />
                <Tooltip contentStyle={{backgroundColor:"#1e1e1e",borderColor:"#4b5563",fontSize:"12px"}}
                itemStyle={{color:"#e5e7eb"}}
                />
                <Legend  wrapperStyle={{fontSize:12}}/>
                <Bar dataKey="Retention" fill="#9c2b70" radius={[4,4,0,0]} barSize={20}/>
                <Bar dataKey="Revenue" fill="#29b6f7" radius={[4,4,0,0]} barSize={20}/>
                <Bar dataKey="Profit" fill="#9c5" radius={[4,4,0,0]} barSize={20}/>
            </BarChart>
    </ResponsiveContainer>
</div>

  </motion.div>
  )
}

export default ProductPerformanceChart