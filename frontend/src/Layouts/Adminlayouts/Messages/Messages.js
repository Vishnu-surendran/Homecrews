import React, { useEffect,useState } from 'react'
import AdminLayout from '../Layout/AdminLayout'
import { useLoaderData } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { adminactions, ApproveWorker } from "../../../store/store";
import Modal from '../../Modal';
import axios from 'axios';
import { Baseurl } from '../../../Baseurl/Basurl';
function Messages() {
    const dispatch = useDispatch();
    const workerdata = useLoaderData();

const [workerid, setworkerid] = useState(null)
const [reason, setreason] = useState("")
const [message, setmessage] = useState("")
    useEffect(() => {
        dispatch(adminactions.workerlist(workerdata));
     
    }, [])
    const {workers,isLoading} = useSelector((state) => state.AdminAuth);

    const Approval=(id)=>{
        dispatch(ApproveWorker(id))
        workers.length=0
    }

    const modal=(id)=>{
        setworkerid(id)
        dispatch(adminactions.Loadingstate(true))
    }
  const HandleSubmit=async(e)=>{
    e.preventDefault()
    const admin=localStorage.getItem("Admin")
    const adminT = JSON.parse(admin)
    const admintt=adminT.adminToken
    try{
        const response=await axios.patch(`${Baseurl}/api/admin/worker/`+workerid,{status:true,warning:reason,message},{ headers: { "Authorization": `Bearer ${admintt}` } })
        dispatch(adminactions.setStatus({id:workerid,status:true,warning:reason,approval:false}))
        dispatch(adminactions.Loadingstate(false))
    }catch(error){

    }
  
  }
  return (
    <AdminLayout>
        {workers && (
           
                      <section>
                <section class="text-gray-600 body-font">
                <div class=" lg:ml-72 container px-5 py-24">
               {workers.map((worker)=>{
               return   <div class="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
               <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
                   <img
                     src="https://images.unsplash.com/photo-1614213951697-a45781262acf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29ya2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
               </div>
               <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                   <h1 class="text-black text-2xl title-font font-bold mb-2">{worker.name}</h1>
                   <p class="leading-relaxed text-base">{worker.aboutme}</p>
                   <div class="py-4">                   
                       {worker.isemailVerified ? 
  <div class=" inline-block mr-2" >
  <div class="flex  pr-2 h-full items-center">
  <svg class="text-green-500 w-6 h-6 mr-1"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                                   <path stroke="none" d="M0 0h24v24H0z"/>  
                                   <circle cx="12" cy="12" r="9" />  
                                   <path d="M9 12l2 2l4 -4" />
                               </svg>
      <p class="title-font font-medium">Email verified</p>
  </div>
</div>
                       :  <div class=" inline-block mr-2" >
                       <div class="flex  pr-2 h-full items-center">
                           <svg class="text-red-500 w-6 h-6 mr-1"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  
                               <circle cx="12" cy="12" r="10" />  
                               <line x1="15" y1="9" x2="9" y2="15" /> 
                               <line x1="9" y1="9" x2="15" y2="15" />
                           </svg>
                           <p class="title-font font-medium">Email not verified</p>
                       </div>
                   </div>}
                    
                       
                   {worker.ismobileVerified ? 
  <div class=" inline-block mr-2" >
  <div class="flex  pr-2 h-full items-center">
  <svg class="text-green-500 w-6 h-6 mr-1"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                                   <path stroke="none" d="M0 0h24v24H0z"/>  
                                   <circle cx="12" cy="12" r="9" />  
                                   <path d="M9 12l2 2l4 -4" />
                               </svg>
      <p class="title-font font-medium">Phone verified</p>
  </div>
</div>
                       :  <div class=" inline-block mr-2" >
                       <div class="flex  pr-2 h-full items-center">
                           <svg class="text-red-500 w-6 h-6 mr-1"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  
                               <circle cx="12" cy="12" r="10" />  
                               <line x1="15" y1="9" x2="9" y2="15" /> 
                               <line x1="9" y1="9" x2="15" y2="15" />
                           </svg>
                           <p class="title-font font-medium">Phone not verified</p>
                       </div>
                   </div>}
                   </div>
                   <div class="md:flex font-bold text-gray-800">
                       <div class="w-full md:w-1/2 flex space-x-3">
                           <div class="w-1/2">
                               <h2 class="text-gray-500">Email</h2>
                               <p >{worker.email}</p>
                           </div>
                           <div class="w-1/2">
                               <h2 class="text-gray-500">Phone</h2>
                               <p>{worker.phone}</p>
                           </div>
                           <div class="w-1/2">
                               <h2 class="text-gray-500">Gender</h2>
                               <p>{worker.gender}</p>
                           </div>
                       </div>
                       <div class="w-full md:w-1/2 flex space-x-3">
                       <div class="w-1/2">
                               <h2 class="text-gray-500">Age</h2>
                               <p>{worker.age}</p>
                           </div>
                        
                           <div class="w-1/2">
                               <h2 class="text-gray-500">Job applied for</h2>
                               <p>{worker.job}</p>
                           </div>
                           {worker.admmessage && ( <div class="w-1/2">
                               <h2 class="text-gray-500">Reappplication response</h2>
                               <p>{worker.admmessage }</p>
                           </div>) }
                          
                       </div>
                      
                   </div>
                   {worker.status && (<><p className='text-red-700'>Declined by admin</p></>)}
                   {worker.isApproved && (<><p className='text-green-700'>Approved</p></>)}
                       {worker.warning && (<><p className='text-red-700'>Reason for declining : {worker.warning}</p></>)}
                  {!worker.isApproved && (<button onClick={()=>Approval(worker._id)} class="mt-3 mr-6 text-white-500 px-4 py-2 inline-flex items-center bg-green-800 border-none ">Approve     </button>   )} 
                  
                   <button onClick={()=>modal(worker._id)} class="mt-3 text-white-500 px-4 py-2 inline-flex items-center bg-red-700 border-none">Decline
                  
                  </button>
               </div>
               </div>
               
              
               })}
                {isLoading && (
        
        <Modal>
          <div className='w-full'>  <form onSubmit={HandleSubmit}>
            <div className='flex flex-col justify-center space-y-7'>
            <label className='font-bold text-1xl'>Type of reason</label>
            <input className='h-8 border-solid border-2 border-indigo-700' type="text" onChange={(e)=>setreason(e.target.value)}/>
            <label className='font-bold text-1xl'>Message Worker</label>
            <input className='h-8 border-solid border-2 border-indigo-700' type="text" onChange={(e)=>setmessage(e.target.value)}/>
           <div className='flex justify-between items-end'>
           <button className='px-4 py-2 bg-red-700 text-white border-none' onClick={()=>dispatch(adminactions.Loadingstate(false))}>Cancel</button>
            <button type='submit' className='px-4 py-2 bg-green-800 text-white border-none'>Confirm</button>
            </div> 
            </div>
          
          </form></div>
        
        </Modal>
      )}
                
            </div>
                    </section>
                    </section>
            
                
          
          
        )}
                    
              
    </AdminLayout>
  )
}

export default Messages