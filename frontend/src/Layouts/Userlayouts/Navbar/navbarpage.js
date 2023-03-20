import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Userlogout } from '../../../hooks/Userhooks/Userlogouthook'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
function Navbarpage() {
  const user = useSelector((state) => state.userAuth.user)
  const [nav, setnav] = useState(false)
  const navclick = () => setnav(!nav)
  const navigate = useNavigate()
  const { logout } = Userlogout()
  const handlelogout = (e) => {
    e.preventDefault()
    logout()
  }
  return (
    <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center'>
          <h1 className=' font-bold mr-4 sm:text-3xl'>HomeCrews</h1>
          <ul className='hidden md:flex'>
            <li >
              Home
            </li>
            <li>
              About
            </li>
            <Link to="/services"><li className='border-b-2 border-zinc-300 w-full'>
         Services
        </li></Link>
          
          </ul>
        </div>
        {user && (
          <div className='flex justify-between'>
          <div className='hidden md:flex '>
            <Link to="/profile" className='border-none bg-transparent text-black mr-4'>Profile</Link>
          </div>
          <div className='hidden md:flex pr-4'>
            <button className='border-none bg-transparent text-black mr-4' onClick={handlelogout}>Logout</button>
          </div>
          </div>
          
        )}
        {!user && (
          <div className='hidden md:flex pr-4'>
            <button className='border-none bg-transparent text-black mr-4' onClick={() => navigate('/login')}>Login</button>
            <button className='px-8 py-3' onClick={() => navigate('/signup')}>Signup</button>
          </div>
        )}

        <div className='md:hidden ' onClick={navclick}>

          {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
        </div>
      </div>
      <ul className={!nav ? 'hidden' : 'absolute bg-white w-full px-8'}>
        <li className='border-b-2 border-zinc-300 w-full'>
          Home
        </li>
        <li className='border-b-2 border-zinc-300 w-full'>
          About
        </li>
        <Link to="/services"><li className='border-b-2 border-zinc-300 w-full'>
         Services
        </li></Link>
        
       
        {user && (
          <div className='flex flex-col'>
            <button className='bg-transparent text-indigo-600 px-8 py-3 mb-4' onClick={handlelogout}>Logout</button>
          </div>
        )}
        {!user && (
          <div className='flex flex-col pb-10 '>
            <button className='bg-transparent text-indigo-600 px-8 py-3 mb-4' onClick={() => navigate('/login')}>Login</button>
            <button className='px-8 py-3' onClick={() => navigate('/signup')}>Signup</button>
          </div>
        )}
      </ul>
    </div>
  )
}

export default Navbarpage