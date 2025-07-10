"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Statecard from '../components/Statecard'
import { ChartBarStacked, DollarSign, ShoppingBag, SquareActivity } from 'lucide-react'
import ProductTable from '../components/ProductTable'

function ProductsPage() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
    <main className='max-w-7xl mx-auto py-4 lg:px-8'>
        <motion.div 
        initial={{ opacity: 0,y:20 }}
        animate={{ opacity: 1,y:0 }}
        transition={{ duration: 0.5 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>
            

            <Statecard title={  "Total Products"} value={"1,234"} icon={ShoppingBag} />
            <Statecard title={"Total Stock"} value={"12,341"} icon={SquareActivity} />
            <Statecard title={"Total Sold"} value={"1,234"} icon={DollarSign} />
            <Statecard title={"Total Catogaries"} value={"1,234"} icon={ChartBarStacked} />
        </motion.div>
        <ProductTable/>
       
    </main>

</div>
  )
}

export default ProductsPage