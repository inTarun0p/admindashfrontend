"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Statecard from '../../components/Statecard'
import { UserCheck, UserIcon, UserPlus, UserX } from 'lucide-react'
import UserTable from '../../components/UserTable'
import axios from 'axios'
// import ProtectedRoutes from '@/app/ProtectedRoutes/ProtectedRoutes'  

function UsersPage() {
  const [count, setCount] = useState([])
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    // This code runs only on the client side
    setIsClient(true)
    setIsLoggedIn(localStorage.getItem("isLogin") === 'true')
    
    // Fetch users data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/view_users/")
        console.log('Users data:', response.data)
        setCount(Array.isArray(response.data.data) ? response.data.data : [])
      } catch (error) {
        console.error('Error fetching users:', error)
        setCount([])
      }
    }
    
    fetchData()
  }, [])

  return (

    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-4 lg:px-8'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
        >
          <Statecard title={"Total Clients"} value={count.length} icon={UserIcon} />
          <Statecard title={"New Clients"} value={count.length} icon={UserPlus} />
          <Statecard 
            title={"Active Clients"} 
            value={isClient && isLoggedIn ? count.length : 0} 
            icon={UserCheck} 
          />
          <Statecard title={"Returning Clients"} value={count.length} icon={UserX} />
        </motion.div>
        <UserTable />
      </main>
    </div>

    )
}

export default UsersPage