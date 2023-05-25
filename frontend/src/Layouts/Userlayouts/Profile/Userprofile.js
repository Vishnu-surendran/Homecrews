import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { useractions } from '../../../store/store'
import axios from 'axios'
import Modal from '../../Modal'
import Navbar from "../Navbar/navbarpage"
import Chat from '../Chatlayout/Chat'
import {io} from "socket.io-client"
import { Baseurl } from '../../../Baseurl/Basurl'
function Userprofile() {

    const data=useLoaderData()
const dispatch=useDispatch()
const [name, setname] = useState("")
const [email, setemail] = useState("")
const [phone, setphone] = useState("")
const [address, setaddress] = useState("")
const [connection, setconnection] = useState(null)
const [bookingid, setbookingid] = useState(null)
const {profile,isLoading,bookings}=useSelector((state)=>state.userAuth)


const chatModal=(userid,workerid)=>{
dispatch(useractions.chatstart(userid))
dispatch(useractions.loading(true))
const socket=io.connect(Baseurl)
const auth="user"
socket.emit("join connection",userid,auth)
setconnection(socket)
}



    useEffect(() => {
  
    dispatch(useractions.profile(data))
    const bookings=async()=>{
        const user=localStorage.getItem("user")
        const {tokens}=JSON.parse(user)
    try{
        const response = await axios.get(`${Baseurl}/api/user/bookings`,{ headers: { "Authorization": `Bearer ${tokens}` } })
       
       dispatch(useractions.bookings(response.data))
      ;
    }catch(error){
    console.log(error);
    }
    }
    bookings()
    }, [])
    
const submit=async()=>{
    const user=localStorage.getItem("user")
    const {tokens}=JSON.parse(user)
try{
    const response = await axios.get(`${Baseurl}/api/user/profile/update`,{name:name,email:email,phone:phone,address:address},{ headers: { "Authorization": `Bearer ${tokens}` } })
    dispatch(useractions.profile(data))
    dispatch(useractions.loading(true))
}catch(error){

}
}

const cancel=async(id)=>{
    const user=localStorage.getItem("user")
    const {tokens}=JSON.parse(user)

    try{
        const response=await axios.patch(`${Baseurl}/api/user/cance`,{id:id},{ headers: { "Authorization": `Bearer ${tokens}` } })
        dispatch(useractions.cnacelbooking(id))
    }catch(error){
console.log(error)
    }

}

  return (
    <div>
        <Navbar/>
        <div class="bg-white">
 <div class="w-full text-white bg-main-color">
        <div 
            class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
      
            <nav class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
                <div class="relative" >
                    <button
                        class="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent hover:bg-blue-800 md:w-auto md:inline md:mt-0 md:ml-4 hover:bg-gray-200 focus:bg-blue-800 focus:outline-none focus:shadow-outline">
                        <span></span>
                     
                    </button>
                   {/*  <div 
                        class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
                        <div class="py-2 bg-white text-blue-800 text-sm rounded-sm border border-main-color shadow-sm">
                            <a class="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                href="#">Settings</a>
                            <a class="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                href="#">Help</a>
                            <div class="border-b"></div>
                            <a class="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                href="#">Logout</a>
                        </div>
                    </div> */}
                </div>
            </nav>
        </div>
    </div>
  

    <div class="container mx-auto my-5 p-5 mt-16">
        <div class="md:flex no-wrap md:-mx-2 ">
         
            <div class="w-full md:w-3/12 md:mx-2">
              
                <div class="bg-white p-3 border-t-4 border-green-400">
                    <div class="image overflow-hidden">
                        <img class="h-auto w-full mx-auto"
                            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                            alt=""/>
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{profile?.username}</h1>
                  
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                        Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                    <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li class="flex items-center py-3">
                            <span>Status</span>
                            <span class="ml-auto"><span
                                    class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                        </li>
                       
                    </ul>
                </div>
              
                <div class="my-4"></div>
             
             
             
            </div>
         
            <div class="w-full md:w-9/12 mx-2 h-64">
             
                <div class="bg-white p-3 shadow-sm rounded-sm">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span class="tracking-wide">About</span>
                    </div>
                    <form>
                    <div class="text-gray-700">
                        <div class="grid md:grid-cols-2 text-sm space-y-3">
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Name</div>
                                <input type="text" className='px-4 border border-solid border-blue-500' onChange={(e)=>setname(e.target.value)} defaultValue={profile?.username}/>
                                
                            </div>
                           
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Contact No.</div>
                                <input type="tel" onChange={(e)=>setphone(e.target.value)} className='px-4 py-2 border border-solid border-blue-500' defaultValue={profile?.Phone}/>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold"> Address</div>
                                <input type="text" onChange={(e)=>setaddress(e.target.value)} className='px-4 py-2 border border-solid border-blue-500' defaultValue={profile?.address}/>
                            </div>
                           
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Email.</div>
                                <div class=" py-2">
                                <input type="email" onChange={(e)=>setemail(e.target.value)} className='px-8 py-2 border border-solid border-blue-500' defaultValue={profile?.email}/>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    </form>
                   
                 
                </div>
               

                <div class="my-4"></div>

               
                <div class="bg-white p-3 shadow-sm rounded-sm">

                    <div class="grid grid-cols-1">
                        <div>
                            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </span>
                                <span class="tracking-wide">Recent Bookings </span>
                            </div>
                            {bookings&& (
                                
  <ul class="list-inside space-y-2">
                                 {bookings.map((bookings)=>{
                                      return <div className='flex justify-between'><li>

                                            <div class="text-teal-600">Worker Name:{bookings.workerdetails[0].name}</div>
                                            <div class="text-teal-600">Workdone :{bookings.workerdetails[0].service}</div>
                                            <div class="text-teal-600">Payment mode:{bookings.payment}</div>
                                      <div class="text-teal-600">Booking Status:{bookings.bookingstatus ? "Booked" : "Cancelled"}</div>
                                      <div class="text-gray-500 text-sm">Booking on: {bookings.date}</div>
                                      <div class="text-gray-500 text-sm">Total paid: {bookings.money}</div>
                                      <div class="text-gray-500 text-sm">Address :{bookings.address}</div>
                                  </li>
                                  <div><button className='px-4 py-0 bg-red-600 border-red-600 hover:bg-white hover:text-red-600' onClick={()=>chatModal(bookings._id)}>Chat</button> </div>
                                  <div>{bookings.bookingstatus ? <button className='px-4 py-0 bg-red-600 border-red-600 hover:bg-white hover:text-red-600' onClick={()=>cancel(bookings._id)}>Cancel</button>:<h1 className='text-red-600'>Cancelled</h1>} </div>
                                 
                                  </div>
                                 })}
                             
                               
                                
                            </ul>
                                
                              
                            )}
                            
                        </div>
                     {isLoading && (
<Chat socket={connection}/>

                     )}
                    </div>
                  
                </div>
                
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Userprofile