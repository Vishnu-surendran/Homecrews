import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminactions } from '../../store/store'

export function UseAdminlogin() {
    const navigate=useNavigate()
const dispatch=useDispatch()
    const adminLogin=async(email,password)=>{
        const response=await fetch('/api/admin/signin',{
            method:'POST',
           headers:{ 'Content-type':'application/json'},
            body:JSON.stringify({email,password})
        })
     if(response.ok){
        const admin=await response.json()
        localStorage.setItem('Admin',JSON.stringify(admin))
          console.log(admin);
      dispatch(adminactions.Admlogin(admin))
       navigate("/admin")
     }
     if(!response.ok){
        console.log("failed")
     }
    }
return {adminLogin}
}

