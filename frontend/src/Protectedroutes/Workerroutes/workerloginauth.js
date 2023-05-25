import React from 'react'
import { Navigate } from 'react-router-dom'
function Workerloginauth({children}) {
    const worker=localStorage.getItem("worker")
    if(worker){
      return <Navigate to="/worker" replace/>
    }
  return children
}

export default Workerloginauth