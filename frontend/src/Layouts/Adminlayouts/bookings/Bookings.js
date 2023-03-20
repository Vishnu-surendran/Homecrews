import React, { useEffect, useState } from 'react'
import AdminLayout from '../Layout/AdminLayout'
import axios from 'axios'
function Bookings() {
const [bookings, setbookings] = useState(null)
useEffect(() => {
    const Bookings = async () => {
        const user=localStorage.getItem("Admin")
        const {adminToken}=JSON.parse(user)
        if (adminToken) {
          const response = await axios.get("/api/admin/bookings", { headers: { "Authorization": `Bearer ${adminToken}` } })
        setbookings(response.data)
        
        } if (!adminToken) {
          console.log("jhhh");
          return null
        }
    
      }
 Bookings()
}, [])


  return (
  <AdminLayout>
 <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
               <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="mb-4 flex items-center justify-between">
                        <div>                       
                         <span class="text-base font-normal text-gray-500">Bookings</span>
                        </div>
                      
                        
                     </div>
 
            <div class=" bg-gray-50 overflow-hidden">
    <div class="container m-auto px-6 space-y-8 text-gray-500 bg-white ">
       
        <div class=" grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
          
         
 {bookings ?  <> <div class={`relative  group bg-zinc-300 transition hover:z-[1] hover:shadow-2xl`}>
 
 {bookings.map((data)=>{
return<div class="relative p-8 space-y-8">
<div className="flex justify-between">
<div className="flex space-x-4">
{/*   { !service.isUnlisted && (<><Link> <PencilIcon className="w-5" onClick={()=>editService(service._id)}/></Link>
<Link><TrashIcon className="w-5" onClick={()=>unlistService(service._id)}/></Link>  </>)} */}
</div>
</div>
<div class="space-y-4">
<p class="text-lg text-gray-800 font-medium transition group-hover:text-yellow-600 text-clip overflow-hidden  ">CustomerId:{data.customerid}</p>
<p class="text-sm text-gray-600">From:{data.from}</p>
<p class="text-sm text-gray-600">To:{data.to}</p>
<p class="text-sm text-gray-600">Payment Type:{data.payment}</p>
{data.bookingstatus ? <p class="text-sm text-green-600">Booking Status :Booked</p> : <p class="text-sm text-red-600">Booking Status : Cancelled</p> }
</div>
</div>

 })}
</div></>:<div className=''><h1 className='text-center'>No data available</h1></div>}


          
            
        </div>
    </div>
</div>
                

                     
                  </div>
               </div>
             
            </div>
         </main>
      </div>

  </AdminLayout>
  )
}

export default Bookings