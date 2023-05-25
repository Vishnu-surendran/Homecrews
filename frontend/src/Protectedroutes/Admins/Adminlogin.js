import React from 'react'
import { Navigate } from 'react-router-dom'

function Adminlogin({children}) {
  const admin=localStorage.getItem("admin")
  if(admin){
    return <Navigate to="/admin" replace/>
  }
return children
}

export default Adminlogin