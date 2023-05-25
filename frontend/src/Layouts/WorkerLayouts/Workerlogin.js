import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'

import axios from 'axios'
import { Baseurl } from '../../Baseurl/Basurl'
import { useDispatch } from 'react-redux'
import { workeractions } from '../../store/store'
function Workerlogin() {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const{register,handleSubmit,formState:{errors}}=useForm()
    const onSubmit =async(data) => {
        const submit=async()=>{
        const response=await axios.post(`${Baseurl}/api/workers/login`,data)
        dispatch(workeractions.login(response.data))
        navigate("/worker")
        return response.data
        }
      const worker = await submit()
      localStorage.setItem("worker",JSON.stringify(worker))
    }
  return (
    
    <section className="bg-gray-50 dark:bg-gray-900 ">
    <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-white mt-16 rounded-lg shadow dark:border md: sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 mt-8 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" {...register("email",{required:"Email is required"})} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                   <p className='text-red-800'> {errors.email?.message}</p>                            <div>
                        <label htmlfor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" {...register("password",{required:"Password is required"})} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div className="flex items-center justify-between">

                       <NavLink to="/worker/forgotpassword" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</NavLink>
                    </div>
                    <p className='text-red-800'> {errors.password?.message}</p>  
                    <input type="submit" className="w-full text-white bg-navcolor hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"/>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <Link to="/workerregister" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => navigate('/workerregister')}>Register</Link>
                        {Error}
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>
  )
}

export default Workerlogin