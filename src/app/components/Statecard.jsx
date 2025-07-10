import React from 'react'
import { motion } from 'framer-motion'

function Statecard({title, icon: Icon, value}) {
  return (
    <motion.div 
    whileHover={{y:-5, boxShadow:"0 25px 50px -12px rgba(0,0,0,0.5)" }}
    className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f]'>
        <div className='px-4 py-5'>
            <span className='flex items-center text-sm font-medium'>
                <Icon size={20} className="mr-2"/>
                <span className='text-gray-100 font-medium'>{title}</span>
            </span>
            <p className=' mt-1 text-3xl font-bold text-gray-100'>{value}</p>
        </div>
    </motion.div>
  )
}

export default Statecard