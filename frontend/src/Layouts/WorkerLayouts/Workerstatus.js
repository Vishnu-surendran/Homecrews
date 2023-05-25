import React,{useState,useEffect} from 'react'
import WorkerDashboard from './WorkerDashboard'
import Modal from "../Modal"
import { useLoaderData } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Workergraph from './Workergraph'
import { workeractions } from '../../store/store'
import { Baseurl } from '../../Baseurl/Basurl'
function Workerstatus() {
   const profiles=useLoaderData()
   const dispatch=useDispatch()
    const [modal, setmodal] = useState(false)
    const [from, setfrom] = useState("")
    const [to, setto] = useState("")
    const [profile, setprofile] = useState("")
   
    const {worker,duty}=useSelector((state)=>state.workerAuth)

    const modalController=()=>{
    setmodal(true)
    }
   
    useEffect(() => {
     setprofile(profiles)
    }, [])
    
 const Reapply=async()=>{
try{
   const response=await axios.post(`${Baseurl}/api/workers/reapply`,{message:"I have fixed all my issues"},{headers:{"Authorization":`Bearer ${worker.token}`}})
setprofile(response.data)
}catch(error){

}
 }
  return (
    <>
    <WorkerDashboard  >
    <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
               <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    

                     <div class="flex flex-col mt-8 h-96">
                        <div class="overflow-x-auto rounded-lg ">
                           <div class="align-middle inline-block min-w-full">
                              <div class=" flex flex-col justify-evenly   items-center space-y-7 shadow overflow-hidden sm:rounded-lg border">
    {profiles && (
<>

{!profile.isApproved && !profile.warning && !profile.applicationstatus && (
 <>
 <h1 className='text-center text-2xl font-bold text-red-700'>You are not Approved</h1>
    <h1 className='text-center text-1xl font-bold'>Wait for the admin approval</h1>
</>
                          )} 
                                   {!profile.isApproved && profile.warning && !profile.applicationstatus && (
 <>
 <h1 className='text-center text-2xl font-bold text-red-700'>{profile.warning}</h1>
 <h4 className='text-center  font-bold text-red-700'>{profile.Message} and reapply</h4> 
    <button className='px-4 py-2 bg-green-600 border-none' onClick={Reapply}>Reapply</button>
  
</>
                          )} 
                          {profile.applicationstatus && (
                           <> <h1 className='text-center text-2xl font-bold '>You have reapplied wait for the Admin response</h1>

                           </>
                          )}

{profile.isApproved && profiles?.works?.length==0 && !duty&&(
                           <> <h1 className='text-center text-2xl font-bold '>Start your duty</h1>

                           </>
                          )}
   

  {profiles.works.length>=1 && profile.isApproved &&(<>
   <Workergraph className="h-96"/>
        
    </>)}
     {profiles.works.length==0 && profile.isApproved && duty && (<>
    
      <h1 className='text-2xl text-green-600 font-bold'>Your payment status will show here when someone hires you</h1>  
       </>)}

</>



    )}
    
    
                              </div>
                           </div> 
                        </div>
                     </div>
                     
                  </div>
               </div>
             
            </div>
         </main>
      </div>

     
    </WorkerDashboard>
   
    </>
  )
}

export default Workerstatus