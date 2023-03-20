import React,{useEffect, useState} from 'react'
import WorkerDashboard from './WorkerDashboard'
import { useSelector,useDispatch } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import Modal from '../Modal'
import { workeractions } from '../../store/store'
function Workerprofile() {
  
const profiles=useLoaderData()
const [name, setname] = useState("")
const [phone, setphone] = useState("")
const [address, setaddress] = useState("")
const [age, setage] = useState("")
const [about, setabout] = useState("")
const [email, setemail] = useState("")
const [job, setjob] = useState("")
const [isLoading, setisLoading] = useState(false)
const {worker}=useSelector((state)=>state.workerAuth)
const [profile, setprofile] = useState(null)
const [file, setfile] = useState("")
const dispatch=useDispatch()

useEffect(() => {
setprofile(profiles)
console.log(profile);
}, [dispatch])

const submit=async(e)=>{
  e.preventDefault()
  const formData=new FormData()
  formData.append('file',file)
  formData.append('name',name)
  formData.append('phone',phone)
  formData.append('address',address)
  formData.append('about',about)
  formData.append('email',email)
  formData.append('job',job)
  try{
    const response=await axios.post(`/api/workers/editprofile`,formData,{headers:{"Authorization":`Bearer ${worker.token}`}})
setprofile(response.data)
    setisLoading(true)
  }catch(error){
console.log(error)
  }
 
}
  return (
    <WorkerDashboard status={profiles.isApproved}>
        <>
        
        <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
               <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
             {/*      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                     <div class="flex items-center justify-between mb-4">
                        <div class="flex-shrink-0">
                           <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">$45,385</span>
                           <h3 class="text-base font-normal text-gray-500">Sales this week</h3>
                        </div>
                        <div class="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                           12.5%
                           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                           </svg>
                        </div>
                     </div>
                     <div id="main-chart"></div>
                  </div> */}
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">

 <div>
        <section class=" py-1 bg-blueGray-50">
<div class="w-full lg:w-full px-4 mt-6">
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">
          My account
        </h6>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
             <div class="shrink-0 mt-5">
    <img class="h-20 w-20 object-cover rounded-full" src={`http://localhost:4000/images//worker//${profile ? profile.image:""}`} />
  </div> 
  <label class="block pt-2">
    <span class="sr-only t-2">Choose profile photo</span>
    <input type="file"  onChange={(e)=>setfile(e.target.files[0])} class="w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-pink-300 file:text-zinc-900
      hover:file:bg-rose-300
    "/>
  </label>
            </div>
          </div>

        <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                 Name
              </label>
              <input type="text"  onChange={(e)=>setname(e.target.value)} class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  defaultValue={profile ? profile.name:""}/>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                Email address
              </label>
              <input type="email" onChange={(e)=>setemail(e.target.value)} class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue={profile ? profile.email :""}/>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                Phone
              </label>
              <input type="tel" onChange={(e)=>setphone(e.target.value)} class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue={profile ? profile.phone:''}/>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
            <label
                  for="age"
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                >
                  Age
                </label>
                <select
                  id="gender"
                  onChange={(e)=>setage(e.target.value)}
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               defaultValue={profile ? profile.age:""}
               >
                  <option value="">Select</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="28">28</option>
                </select>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                Job
              </label>
              <input type="text" onChange={(e)=>setjob(e.target.value)} class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue={profile ? profile.job:""}/>
            </div>
          </div>

        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300"/>

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Contact Information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                Address
              </label>
              <input type="text" onChange={(e)=>setaddress(e.target.value)} class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue={profile ? profile.address:""}/>
            </div>
          </div>

    
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300"/>

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          About Me
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
          
              <textarea type="text" onChange={(e)=>setabout(e.target.value)} class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4"> </textarea>
            </div>
          </div>
        </div>
        <button className='w-full px-4 py-5 lg:w-56 ' onClick={submit}>Submit</button>
      </form>
    </div>
  </div>

</div>
</section>
    </div>              
                  </div>
               </div>
             
            </div>
         </main>
         {isLoading && (
                <Modal>
                     <div class="bg-white px-16 py-14 rounded-md text-center">
    <h1 class="text-xl mb-4 font-bold text-slate-500">Profile has been updated successfully</h1>

    <button class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={()=>setisLoading(false)}>Ok</button>
  </div>
                  {/*   <div>
                        {notification}
                        <button onClick={()=>navigate("/login")}>OK</button>
                    </div> */}
                </Modal>

               )} 
      </div>
        
        
        
    </>
    </WorkerDashboard>
   
  )
}

export default Workerprofile