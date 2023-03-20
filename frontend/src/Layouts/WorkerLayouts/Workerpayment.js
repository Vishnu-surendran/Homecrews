import React from 'react'
import WorkerDashboard from './WorkerDashboard'
import { useLoaderData } from 'react-router-dom'
function Workerpayment() {
   const data=useLoaderData()
  return (
   <WorkerDashboard>
     <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
    <main>
       <div class="pt-6 px-4">
          <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
             <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div class="mb-4 flex items-center justify-between">
                   <div>                       
                    <span class="text-base font-normal text-gray-500">Payment History</span>
                   </div>                
                </div>
        <div class=" bg-gray-50 overflow-hidden">
<div class="container m-auto px-6 space-y-8 text-gray-500 bg-white ">
   <div class=" grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">  
   </div>
</div>
</div>
{data.works.length>=1 ? <div className='space-y-4 border-green-600 '>
<h1 className='text-center text-2xl font-bold underline'>Your Current Payment Status</h1>
          <h1 className='text-center text-1xl font-medium'>Total Works Completed:{data.worksDone}</h1>
          <h1 className='text-center font-medium'>Total Earnings :{data.works.map((data)=>data.payment)}</h1>
</div> : <h1 className='text-center text-2xl font-bold'>Your Earnings will appear here when someone hires you</h1> }

          

                
             </div>
          </div>
        
       </div>
    </main>
 </div>
   </WorkerDashboard>
  )
}

export default Workerpayment