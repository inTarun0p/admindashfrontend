import React from 'react'
import UpdateForm from './updateForm'
import ProtectedRoutes from '@/app/ProtectedRoutes/ProtectedRoutes'

export async function generateStaticParams() {
  return [];
}

function UpdateUser() {
  return (
<ProtectedRoutes>
<UpdateForm/>
</ProtectedRoutes>
  )
}

export default UpdateUser