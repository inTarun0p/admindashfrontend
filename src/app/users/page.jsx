"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Statecard from '../components/Statecard'
import { UserCheck, UserIcon, UserPlus, UserX } from 'lucide-react'
import UserTable from '../components/UserTable'

function UsersPage() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
    <main className='max-w-7xl mx-auto py-4 lg:px-8'>
        <motion.div 
        initial={{ opacity: 0,y:20 }}
        animate={{ opacity: 1,y:0 }}
        transition={{ duration: 0.5 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>
            

            <Statecard title={  "Total Clients"} value={"1,234"} icon={UserIcon } />
            <Statecard title={"New Clients"} value={"12,341"} icon={UserPlus} />
            <Statecard title={"Active Clients"} value={"1,234"} icon={UserCheck} />
            <Statecard title={"Returning Clients"} value={"1,234"} icon={UserX} />
        </motion.div>
        <UserTable/>
   
    </main>

</div>
  )
}

export default UsersPage