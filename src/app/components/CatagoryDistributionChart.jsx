"use client"
import React, { useEffect, useState } from 'react'
import { motion, percent } from 'framer-motion'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, Legend } from 'recharts'


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

function CatagoryDistributionChart() {
    const [CatagoryData, setCatagoryData] = useState([])
    useEffect(() => {
        fetch("/data/data.json")
        .then(res => res.json())
        .then(data => setCatagoryData(data.categories))
    }, [])
  return (
    <motion.div 
    initial={{ opacity: 0,y:20 }}
    animate={{ opacity: 1,y:0 }}
    transition={{ duration: 0.5,delay:0.4 }}
    className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg  p-4 rounded-xl border border-[#1f1f1f] mx-2 md:mx-0 lg:mx-0 '>
       <h2 className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left'>Catagory Distribution</h2>
       <div className='h-64 md:h-80'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={CatagoryData} dataKey="value" labelLine={{stroke: "#9ca3af"}} label={({name,percent})=>
                        `${name} ${(percent * 100).toFixed(0)}%`} cx="50%" cy="50%" >

                        {
                            CatagoryData.map((entry,index)=>{
                                return(
                                    <Cell key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]}
                                    />
                                )
                            })
                        }   
                    </Pie>
                    <Tooltip contentStyle={{backgroundColor:"#1e1e1e",borderColor:"#4b5563",fontSize:"12px",
                        padding:"8px",
                    }}
                    itemStyle={{color:"#fff"}}
                    /> 
                    <Legend
                        iconType='circle'
                        verticalAlign='bottom'
                        height={36}
                        layout='horizontal'
                        
                    />

                    </PieChart>  
            </ResponsiveContainer>
       </div>
       
    </motion.div>
    
  )
}

export default CatagoryDistributionChart