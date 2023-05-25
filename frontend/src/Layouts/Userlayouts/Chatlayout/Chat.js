import React, { useEffect, useState } from 'react'
import Modal from '../../Modal'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import {io} from "socket.io-client"
import { useractions } from '../../../store/store'
import axios from 'axios'
import { Baseurl } from '../../../Baseurl/Basurl'
function Chat({socket}) {
    const {connection,bookingid}=useSelector((state)=>state.userAuth)

const [message, sendmessage] = useState("")
const [recievemessages, setrecievemessages] = useState([])


const dispatch=useDispatch()

const sendMessage=async(e)=>{
e.preventDefault()
       const data={
      Message:message,
      room:bookingid,
      author:"user"
   }
   const user=localStorage.getItem("user")
    const {tokens}=JSON.parse(user)
    try{
      const response = await axios.post(`${Baseurl}/api/user/message`,{data},{ headers: { "Authorization": `Bearer ${tokens}` } })
      await socket?.emit("send message",data)
      setrecievemessages((list)=>[...list,data])
    }catch(error){
      console.log(error);
      return {error:error.response.data}
    }
    
 
}
useEffect(() => {
   console.log("use1")
   getAllmessages()
  socket?.on("recieve message",(data)=>{
   console.log("use2")
    if(data.author==="worker"){
      console.log(data)
        setrecievemessages((list)=>[...list,data])  
    }
  }) 
}, [socket])

const getAllmessages=async()=>{
   const user=localStorage.getItem("user")
   const {tokens}=JSON.parse(user)
   try{  
     const response = await axios.get(`${Baseurl}/api/user/allmessages/${bookingid}`,{ headers: { "Authorization": `Bearer ${tokens}` } })
     setrecievemessages(response.data)

   }catch(error){
     console.log(error);
     return {error:error.response.data}
   
   }
}




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
         
      </div>
     
   </div>
   <div id="messages" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
     
     {recievemessages?.map((messages)=>{
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
   <button type='button' onClick={sendMessage} className='inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'> Send</button>
   <button type='button' onClick={()=>dispatch(useractions.loading(false))} className='inline-flex ml-4 items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'> Cancel</button>

      </div>
   </div>
</div>

   </Modal>
  )
}

export default Chat