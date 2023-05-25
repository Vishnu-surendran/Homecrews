import React,{useEffect, useState} from 'react'
import Toggle from '../Adminlayouts/Toggle'
import {UserIcon} from "@heroicons/react/solid"
import {BellIcon} from "@heroicons/react/solid"
import {Link} from "react-router-dom"
import Modal from "../Modal"
import axios from 'axios'
import { workeractions } from '../../store/store'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate,useLoaderData } from 'react-router-dom'
import { Baseurl } from '../../Baseurl/Basurl'
function WorkerDashboard({children,status}) {
 const data=useLoaderData()

   const [modal, setmodal] = useState(false)
   const navigate=useNavigate()
   const dispatch=useDispatch()
   const [modals, setmodals] = useState(false)
   const [from, setfrom] = useState("")
   const [to, setto] = useState("")
   const {worker,duty}=useSelector((state)=>state.workerAuth)
    const modalController=()=>{
    setmodal(!modal)
    }
    const logout=()=>{
      localStorage.removeItem("worker")
      dispatch(workeractions.login(null))
navigate("/workerlogin")
    }

    const duties=(e)=>{
      e.preventDefault()
      const submit=async()=>{
         try{
            const response=await axios.post(`${Baseurl}/api/workers/addDuty`,{timefrom:from,timeto:to,id:worker.id},{headers:{"Authorization":`Bearer ${worker.token}`}})
            setmodal(false)  
       dispatch(workeractions.dutystatus(response.data))
         }catch(err){
   setmodal(true)
   console.log(err);
         }
      }
      submit()
    }
    return (
      <div>
      <nav class="bg-white border-b border-gray-200 fixed z-30 w-full">
         <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
               <div class="flex items-center justify-start">
                  <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                     <svg id="toggleSidebarMobileHamburger" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                     </svg>
                     <svg id="toggleSidebarMobileClose" class="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                     </svg>
                  </button>
                  <a href="#" class="text-xl font-bold flex items-center lg:ml-2.5">
                  <img src="https://demo.themesberg.com/windster/images/logo.svg" class="h-6 mr-2" alt="Windster Logo"/>
                  <span class="self-center whitespace-nowrap">HomeCrews</span>
                  </a>
{data?.isApproved && (

<form action="#" method="GET" class="hidden lg:block lg:pl-32">
<label for="topbar-search" class="sr-only">Search</label>
<div class="mt-1 relative lg:w-64">
   <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
      </svg>
   </div>
   <input type="text" name="email" id="topbar-search" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5" placeholder="Search"/>
</div>
</form>
)}
               
               </div>
               <div class="flex items-center">
                  <button id="toggleSidebarMobileSearch" type="button" class="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg">
                     <span class="sr-only">Search</span>
                     <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                     </svg>
                  </button>
                  <div class="hidden lg:flex items-center">
                     {data?.isApproved && (
                        <div class="px-3">
                      
                      <button className='py-3 px-2 rounded-full bg-green-600  border-green-600 ' onClick={()=>setmodals(true)}>Start duty</button>
                    </div>
                     )}
                     
                   
                  </div>
                  <a onClick={modalController} href="#" class="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                     <svg class="svg-inline--fa fa-gem -ml-1 mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gem" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"></path>
                     </svg>
                    Logout
                  </a>
               </div>
           
            </div>
         </div>
      </nav>
      <div class="flex overflow-hidden bg-white pt-16">
         <aside id="sidebar" class="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
            <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
               <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <div class="flex-1 px-3 bg-white divide-y space-y-1">
                     <ul class="space-y-2 pb-2">
                     
                     {data?.isApproved && (
                        <>
                           <li>

<form action="#" method="GET" class="lg:hidden">
   <label for="mobile-search" class="sr-only">Search</label>
   <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
         </svg>
      </div>
      <input type="text" name="email" id="mobile-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search"/>
   </div>
</form>

</li>
<li>
<Link to="/worker" class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
   <svg class="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
   </svg>
   <span class="ml-3">Dashboard</span>
</Link>
</li>
<li>
<Link to="/worker/works" class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
<svg class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
   </svg>
<span class="ml-3 flex-1 whitespace-nowrap">Works</span></Link>    

</li> 
<li>
<Link to="/worker/profile" class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
   <svg class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
   </svg>
<span class="ml-3 flex-1 whitespace-nowrap">Profile</span></Link>    

</li>

<li>
<Link to="/worker/payment" class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
   <svg class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
   </svg>
   <span class="ml-3 flex-1 whitespace-nowrap">Payment</span>
</Link>
</li>
<li>
<Link to="/worker/messages" class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
   <svg class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
   </svg>
<span class="ml-3 flex-1 whitespace-nowrap">Messages</span></Link>    

</li>
                        </>
                     )}
                     
                   
                     </ul>
                  </div>
               </div>
            </div>
         </aside>
         <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
        
                 
                  {children}
      </div>

      {modal && (
         <Modal>

  <div class="bg-white px-16 py-14 rounded-md text-center">
    <h1 class="text-xl mb-4 font-bold text-slate-500">Do you Want to Logout</h1>
    <button class="bg-red-500 px-4 py-2 rounded-md text-md text-white" onClick={modalController}>No</button>
    <button class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={logout}>Yes</button>
  </div>

         </Modal>
      )}

{modals && (
        <>
        
        <Modal>
   <div class="flex justify-between items-center pb-3">
           <p class="text-2xl font-bold text-gray-500">Book Your Slot</p>
           <div class="modal-close cursor-pointer z-50">
              <svg class="fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                 viewBox="0 0 18 18">
                 <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                 </path>
              </svg>
           </div>
        </div>
     
        <div class="my-5 mr-5 ml-5 flex justify-center">
            
                    <div class="">
                        <div class="">
                            <label for="names" class="text-md text-gray-600">Select Your Slot</label>
                        </div>
                    </div>
               
        </div>
        <div class="flex justify-center">
  <div class="timepicker relative form-floating mb-3 xl:w-96" data-mdb-with-icon="false" id="input-toggle-timepicker">
    <input type="date"
    onChange={(e)=>setfrom(e.target.value)}
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      placeholder="Select a date" data-mdb-toggle="input-toggle-timepicker" />
  </div>
  <h1 className='ml-3 mr-3 mt-2'>TO</h1>
  <div class="timepicker relative form-floating mb-3 xl:w-96" data-mdb-with-icon="false" id="input-toggle-timepicker">
    <input type="date"
        onChange={(e)=>setto(e.target.value)}
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      placeholder="Select a date" data-mdb-toggle="input-toggle-timepicker" />
  </div>
</div>
        <div class="flex justify-end pt-2 space-x-14">
           <button
              class="px-4 bg-gray-200 p-3 rounded text-black hover:bg-gray-300 font-semibold" onClick={()=>setmodals(false)} >Cancel</button>
           <button
             type='button' class="px-4 bg-blue-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400" onClick={duties} >Confirm</button>
        </div> 

        </Modal>
        </>
 
      )}



      <script async defer src="https://buttons.github.io/buttons.js"></script>
      <script src="https://demo.themesberg.com/windster/app.bundle.js"></script>
   </div>
    )
}

export default WorkerDashboard