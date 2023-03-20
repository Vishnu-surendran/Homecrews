import React from 'react'


import Services from '../../../Components/Services/Services'
import About from '../../../Components/About us/About'
import Workers from '../../../Components/Worker register/workers'
import Footer from '../../../Components/Footer/Footer'

import bg from '../../../assets/banner.jpg'
import Navbarpage from '../Navbar/navbarpage'
function Homepage() {
  return (
    <div className=''>
      <Navbarpage/>
      <div className=''>
        <div className=' brightness-50'>
          <img className='' src={bg} />
        </div>
        <div className=' absolute top  md:absolute pt-16 space-y-1 left-10 top-28 flex flex-col'>
          <h1 className='text-2xl text-white font-bold md:text-5xl'>Exquisite Home</h1>
          <h1 className='text-2xl text-white md:text-5xl font-bold'>Service</h1>
          <button className=' py-0 px-0 md:py-2 px-1 hover:text-white hover:border-white'>Hire Now</button>
        </div>
      </div>


      <Services />
      <About />
      <Workers />
      <Footer />

    </div>
  )
}

export default Homepage