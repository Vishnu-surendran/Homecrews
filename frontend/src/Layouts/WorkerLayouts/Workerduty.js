import React, { useEffect ,useState} from 'react'
import WorkerDashboard from './WorkerDashboard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLoaderData } from 'react-router-dom'
import { workeractions } from '../../store/store'

import {io} from "socket.io-client"
import Chat from '../Userlayouts/Chatlayout/Chat'
import Modal from '../Modal'
import Workerchat from './workerchat'
import { Baseurl } from '../../Baseurl/Basurl'
function Workerduty() {
    const duties=useLoaderData()
    const dispatch=useDispatch()
const [bookings, setbookings] = useState(null)
const [connection, setconnection] = useState(null)
    const {worker,booking,isLoading}=useSelector((state)=>state.workerAuth)
 
useEffect(() => {
  
   const getbookings=async()=>{
      const response=await axios.get(`${Baseurl}/api/workers/bookings`,{headers:{"Authorization":`Bearer ${worker.token}`}})
setbookings(response.data)
   }

getbookings()
}, [])



const chatModal=(userid)=>{
   dispatch(workeractions.beginchat(userid))
   dispatch(workeractions.loading(true))
  /*  const socket=io.connect("http://localhost:4000/")
   socket.emit("join connection",userid) */
 /*   setconnection(socket) */
   }


const cancel=async(id)=>{
   try{
       const response=await axios.patch(`${Baseurl}/api/workers/booking/cancel`,{id:id},{ headers: { "Authorization": `Bearer ${worker.token}` } })
       setbookings(response.data)
   }catch(error){
console.log(error)
   }

}
  return (
    <WorkerDashboard>
     {/*   <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
               <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="mb-4 flex items-center justify-between">
                        <div>                       
                         <span class="text-base font-normal text-gray-500">Duties</span>
                        </div>
                      
                        
                     </div>

  {duties ? <>          <div class=" bg-gray-50 overflow-hidden">
    <div class="container m-auto px-6 space-y-8 text-gray-500 bg-white ">
       
        <div class=" grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
          
        
 <> <div class={`relative  group bg-white transition hover:z-[1] hover:shadow-2xl`}>
 <div class="relative p-8 space-y-8">
         <div className="flex justify-between">
  
     </div>
     <div class="space-y-4">
         <h5 class="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600 space">From:{duties.timefrom} </h5>
         <h5 class="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">To: {duties.timeto} </h5>
         <p class="text-sm text-gray-600"></p>
    <p class="text-sm mt-4 text-green-600 px-2 ">Not working ? <Link className="font-bold" >Click to change</Link></p> 
     </div>
 </div>
</div></>

          
            
        </div>
    </div>
</div></>:<h1>No duties Available</h1>}
               

                     
                  </div>
               </div>
             
            </div>
         </main>
      </div> */}
        <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
               <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="mb-4 flex items-center justify-between">
                        <div>                       
                         <span class="text-base font-normal text-gray-500">Works</span>
                        </div>
              
                        
                     </div>
 
            <div class=" bg-gray-50 overflow-hidden">
    <div class="container m-auto px-6 space-y-8 text-gray-500 bg-white ">
       
        <div class=" grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
          
         
 {bookings ?  <> <div class={`relative  group bg-zinc-300 transition hover:z-[1] hover:shadow-2xl`}>
 
 {bookings?.map((data)=>{
return<div class="relative p-8 space-y-8">
<div className="flex justify-between">
<div className="flex space-x-4">
{/*   { !service.isUnlisted && (<><Link> <PencilIcon className="w-5" onClick={()=>editService(service._id)}/></Link>
<Link><TrashIcon className="w-5" onClick={()=>unlistService(service._id)}/></Link>  </>)} */}
</div>
</div>
<div class="space-y-4">
<p class="text-lg text-gray-800 font-medium transition group-hover:text-yellow-600 text-clip overflow-hidden  ">Customername:{data.customername}</p>
<p class="text-sm text-gray-600">Address:{data.address}</p>
<p class="text-sm text-gray-600">From:{data.from}</p>
<p class="text-sm text-gray-600">To:{data.to}</p>
<p class="text-sm text-gray-600">Payment Type:{data.payment}</p>
{data.bookingstatus ? <p class="text-sm text-green-600">Booking Status :Booked</p> : <p class="text-sm text-red-600">Booking Status : Cancelled</p> }

<button type='button' className='px-4 py-0 bg-red-600 border-red-600 hover:bg-white hover:text-red-600' onClick={()=>chatModal(data._id)}>Chat</button>
{data.bookingstatus &&(<button onClick={()=>cancel(data._id)} className='bg-red-600 text-white border-red-600 px-2 py-1'>Cancel</button>) }
</div>
</div>

 })}
</div></>:<h1>No data available</h1>}


          
            
        </div>
    </div>
</div>
{isLoading && (
<Workerchat/>

                     )}

                     
                  </div>
               </div>
             
            </div>
         </main>
      </div>
    </WorkerDashboard>
  )
}

export default Workerduty