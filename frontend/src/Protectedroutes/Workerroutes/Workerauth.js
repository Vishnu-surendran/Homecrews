import React from 'react'
import { Navigate } from 'react-router-dom'

function Workerauthorize({children}) {
  const worker=localStorage.getItem("worker")
  if(!worker){
    return <Navigate to="/workerlogin" replace/>
  }
return children
}

export default Workerauthorize