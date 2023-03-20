
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminactions } from '../../store/store'

export function Useadminlogout() {
    const dispatch=useDispatch()
 const navigate= useNavigate()
const Adminlogout=()=>{
   
  
    localStorage.removeItem('Admin')
dispatch(adminactions.Admlogout())
navigate('/admin/auth')
}

  return {Adminlogout}
}

