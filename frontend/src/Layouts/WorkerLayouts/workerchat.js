import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import {io} from "socket.io-client"
import { Baseurl } from '../../Baseurl/Basurl'
import { workeractions } from '../../store/store'

function Workerchat(props) {
   const [bookingId,setbookingId] = useState(null)
   const [join,setjoin] = useState(false)
    const {connection,bookingid}=useSelector((state)=>state.workerAuth)
    const socket=io.connect(Baseurl)
const [message, sendmessage] = useState("")
const [recievemessages, setrecievemessages] = useState([])
const dispatch=useDispatch()


const setconnection=()=>{
 

      const auth="worker"
      socket.emit("join connection",bookingid,auth)


   socket.on("connected",()=>{
      setjoin(true)
   })
}


const sendMessage=async(e)=>{
e.preventDefault()
       const data={
      Message:message,
      room:bookingid,
      author:"worker"
   }
      await socket.emit("send message",data)
   setrecievemessages((list)=>[...list,data])
   
  
 
}
useEffect(() => {
  socket.on("recieve message",(data)=>{
    if(data.author==="user"){
        
        setrecievemessages((list)=>[...list,data])
    
    }

  }) 
}, [socket])

   
  return (
   <Modal>
<div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
   <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div class="relative flex items-center space-x-4">
         <div class="relative">
            <span class="absolute text-green-500 right-0 bottom-0">
               <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
               </svg>
            </span>
         <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
         </div>
         <div class="flex flex-col leading-tight">
            <div class="text-2xl mt-1 flex items-center">
               <span class="text-gray-700 mr-3">Anderson Vanhron</span>
            </div>
            <span class="text-lg text-gray-600">Junior Developer</span>
         </div>
      </div>
      <div class="flex items-center space-x-2">
         <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
         </button>
         <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
         </button>
         <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
         </button>
      </div>
   </div>
   <div id="messages" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
     
     {recievemessages.map((messages)=>{
      return <div class="chat-message">
      <div class="flex items-end">
         <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{messages.Message}</span></div>
         </div>
       
      </div>
   </div>
     })}
      
     

     
    
   
     
      
     
   </div>
   <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div class="relative flex">
       
         <input type="text" placeholder="Write your message!" onChange={(e)=>sendmessage(e.target.value)} class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"/>
    {join ?<button type='button' onClick={sendMessage} className='inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'> Send</button>:<button type='button' onClick={setconnection} className='inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'> connect</button> }     
    <button type='button' onClick={()=>dispatch(workeractions.loading(false))} className='inline-flex  ml-4 items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'> Cancel</button>
      </div>
   </div>
</div>

   </Modal>
  )
}

export default Workerchat