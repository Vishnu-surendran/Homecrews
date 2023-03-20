import React from 'react'
import { useSelector } from 'react-redux'

function Adminstatehook () {
   const Admintoken =useSelector((state)=>state.AdminAuth.admin)
 const {adminToken}= Admintoken ||{}
return  adminToken
}

export default Adminstatehook