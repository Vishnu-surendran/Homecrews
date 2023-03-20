import React from 'react'
import { useLoaderData } from 'react-router-dom'
import WorkerDashboard from './WorkerDashboard'

function Workermessages() {

    const profile=useLoaderData()
  return (
  <WorkerDashboard status={profile.isApproved}>

<section>
                <section class="text-gray-600 body-font">
                <div class=" lg:ml-72 container px-5 py-24">
           
            {profile.Message ?  <div class="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
              
              <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                  <h1 class="text-black text-2xl title-font font-bold mb-2"></h1>
                  <p class="leading-relaxed text-base"> Message :{profile.Message}</p>
                  <div class="py-4">                   
                    
 <div class=" inline-block mr-2" >

</div>
                  
                   
                      

                  </div>             
              </div>
              </div>
              :<h1 className='text-center'>No messages</h1>} 
            
              
        
           
                
            </div>
                    </section>
                    </section>

  </WorkerDashboard>
  )
}

export default Workermessages