import React from 'react'
import { Navigate } from 'react-router-dom'

function Admin({children}) {
  const admin=localStorage.getItem("Admin")
  if(!admin){
    return <Navigate to="/admin/auth" replace/>
  }
return children
}

export default Admin