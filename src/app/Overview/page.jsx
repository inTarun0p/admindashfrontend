"use client"
import React from 'react'
import Statecard from '../components/Statecard'
import { DollarSign, ShoppingCart, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import SalesOverview from '../components/SalesOverview'
import CatagoryDistributionChart from '../components/CatagoryDistributionChart'
import OrderDistributionChart from '../components/OrderDistributionChart'
import ProductPerformanceChart from '../components/ProductPerformanceChart'
function Overview() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <main className='max-w-7xl mx-auto py-4 lg:px-8'>
            <motion.div 
            initial={{ opacity: 0,y:20 }}
            animate={{ opacity: 1,y:0 }}
            transition={{ duration: 0.5 }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>
                <Statecard title="Total Sales" value="1,234" icon={DollarSign} />
                <Statecard title="Total Orders" value="567" icon={ShoppingCart} />
                <Statecard title="Total Clients" value="890" icon={Users} />
                <Statecard title="Total Products" value="1,234" icon={ShoppingCart} />
            </motion.div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-8'>
                <SalesOverview />
                <CatagoryDistributionChart />
                <OrderDistributionChart />
                <ProductPerformanceChart  />
            </div>
        </main>

    </div>
  )
}

export default Overview