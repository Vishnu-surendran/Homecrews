import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbarpage from '../../Layouts/Userlayouts/Navbar/navbarpage'
function Navbar() {
  return (
    <div>
        <Navbarpage/>
        <Outlet/>
    </div>
  )
}
export default Navbar