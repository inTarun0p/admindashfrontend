import React from 'react'
import AddProduct from './AddProduct'
import ProtectedRoutes from '@/app/ProtectedRoutes/ProtectedRoutes'

function page() {
  return (
    <ProtectedRoutes>
    <AddProduct/>
    </ProtectedRoutes>
  )
}

export default page