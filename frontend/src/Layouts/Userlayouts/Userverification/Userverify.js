import React from 'react'
import axios from 'axios'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom'

function Userverify() {
  const {register,handleSubmit,formState:{errors}}=useForm()
const navigate=useNavigate()
  const onSubmit=async(data)=>{
const passwordRequest=async()=>{
  const passwordFetch=await axios.post("/api/user/forgotpassword",{
    email:data.email
  })

  return passwordFetch.data
}
const password=await passwordRequest()
  }
  return (
    <div>
      <div className='fixed inset-0 bg-emerald-500 bg-opacity-75 transition-opacity flex justify-evenly'>
        <div className=' absolute top-48 bg-emerald-600 flex flex-col w-96 h-52 items-center space-y-9 px-16 rounded-md '>
<form onSubmit={handleSubmit(onSubmit)}>

<h1 className='pt-4 text-white font-bold pb-3'>Enter Your email </h1>
        <input className='px-6 ' type="email" placeholder='email' {...register("email",{required:"Email cannot be empty"})}/>
          <p className='text-red-600'>{errors.email?.message}</p>
          <input type="submit" className='py-2 px-3 mt-5 bg-emerald-700 border-emerald-700 rounded-md hover:text-white  hover:border-white'/>
  </form>         
        </div>

      </div>
    </div>
  )
}

export default Userverify