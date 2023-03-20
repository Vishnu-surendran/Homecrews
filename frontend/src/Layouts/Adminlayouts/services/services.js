import React,{useState,useEffect} from "react";
import { PencilIcon,TrashIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminactions } from "../../../store/store";
import AdminLayout from "../Layout/AdminLayout";
import AddService from "../Add a service/addService";
import AddCategory from "../Category/Category";
import axios from "axios";
function AdminServices() {
    const [modal, setmodal] = useState(false)
    const [editservice,seteditservice]=useState("")
  const servicedata = useLoaderData();
  const dispatch = useDispatch();

  const {services,isLoading,Category,edit }= useSelector((state) => state.AdminAuth);
useEffect(() => {
   dispatch(adminactions.servicelist(servicedata));
  const categories=async()=>{
   const category=async()=>{
      const admin=localStorage.getItem("Admin")
      const adminT = JSON.parse(admin)
      const admintt=adminT.adminToken
      const response=await axios.get(`/api/admin/category`,{ headers: { "Authorization": `Bearer ${admintt}` } })
      return response.data     
      }
   const allCategory= await category()
   dispatch(adminactions.Category(allCategory))
  } 
   categories()
}, [dispatch])

const unlistService=async(id)=>{
   try{
      const response=await axios.patch("/api/admin/services/unlist/"+id)
      dispatch(adminactions.Unlistservice(id))
   }catch(error){
console.log(error)
   }

}

const editService=(id)=>{
const service=services.find((service)=>service._id===id)
seteditservice(service)
dispatch(adminactions.Loading(true))
}

const updateService=async(data)=>{
try{
   const response=await axios.patch("/api/admin/services/" + editservice._id,data)
   dispatch(adminactions.editservices({id:editservice._id,data:data}))
dispatch(adminactions.Loading(false))
}catch(error){
console.log(error.response.data);
}

}

let adminState=false
  const modals=()=>{
  
   dispatch(adminactions.Loadingstate(!isLoading))
       }



  return (
    <>
      <AdminLayout>
      <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
               <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="mb-4 flex items-center justify-between">
                        <div>                       
                         <span class="text-base font-normal text-gray-500">Services</span>
                        </div>
                        <div class="flex-shrink-0">
                           <button class="text-sm font-medium text-white-600 hover:bg-gray-100 rounded-lg p-2" onClick={modals}>Add Service</button>
                        </div>
                        
                     </div>
        {services && (
            <div class=" bg-gray-50 overflow-hidden">
    <div class="container m-auto px-6 space-y-8 text-gray-500 bg-white ">
       
        <div class=" grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
          
          {services.map((service)=>{
 return <> <div class={`relative  group ${service.isUnlisted ?  "bg-zinc-300":"bg-white"} transition hover:z-[1] hover:shadow-2xl`}>
 <div class="relative p-8 space-y-8">
         <div className="flex justify-between">
    <img src={`http://localhost:4000/images//serviceImages//${service.image}`} class="w-10" width="512" height="512" alt="burger illustration"/>
   <div className="flex space-x-4">
  { !service.isUnlisted && (<><Link> <PencilIcon className="w-5" onClick={()=>editService(service._id)}/></Link>
 <Link><TrashIcon className="w-5" onClick={()=>unlistService(service._id)}/></Link>  </>)}
   </div>
     </div>
     <div class="space-y-4">
         <h5 class="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">{service.name}</h5>
         <p class="text-sm text-gray-600">{service.description}</p>
      {service.isUnlisted && (<p class="text-sm mt-4 text-red-600 ">Service is unlisted <Link className="font-bold" onClick={()=>unlistService(service._id)}>Click to modify</Link></p>)}   
     </div>
 </div>
</div></>

          })}
            
        </div>
    </div>
</div>
        )}          

                     
                  </div>
               </div>
             
            </div>
         </main>
      </div>

      {edit && (
          <AddService data={editservice} update={updateService}/>
      )}

      {isLoading && (
        <>  

 <AddService/>
        </>
 
      )}
    
      </AdminLayout>
    </>
  );
}

export default AdminServices;
