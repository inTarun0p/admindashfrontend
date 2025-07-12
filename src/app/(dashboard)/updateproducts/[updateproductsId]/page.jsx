import React from 'react'
import UpdateProducts from './UpdateProducts'
import ProtectedRoutes from '@/app/ProtectedRoutes/ProtectedRoutes'

export async function generateStaticParams() {
  return [];
}

function UpdateProductsPage() {
  return (
    <ProtectedRoutes>
<UpdateProducts/>
    </ProtectedRoutes>
  )
}

export default UpdateProductsPage