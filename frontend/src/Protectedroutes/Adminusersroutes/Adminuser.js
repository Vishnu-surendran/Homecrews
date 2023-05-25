import React from 'react'
import { Navigate } from 'react-router-dom'

function Adminuser({children}) {
  const admin=localStorage.getItem("adminuser")
  if(!admin){
    return <Navigate to="/adminuserlogin" replace/>
  }
return children
}

export default Adminuser