import React from 'react'
import { Navigate } from 'react-router-dom'

function Adminuserlogin({children}) {
  const adminuser=localStorage.getItem("adminuser")
  if(adminuser){
    return <Navigate to="/adminuser" replace/>
  }
return children
}

export default Adminuserlogin