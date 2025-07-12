import React from 'react'
import UpdateProducts from './UpdateProducts'
import ProtectedRoutes from '@/app/ProtectedRoutes/ProtectedRoutes'

function UpdateProductsPage() {
  return (
    <ProtectedRoutes>
<UpdateProducts/>
    </ProtectedRoutes>
  )
}

export default UpdateProductsPage