import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NewCategory } from '../../../store/store'
import Modal from '../../Modal'
import AdminLayout from '../Layout/AdminLayout'
import { adminactions } from '../../../store/store'
import {TrashIcon,PencilIcon} from "@heroicons/react/outline"
import axios from 'axios'
import { Link } from 'react-router-dom'

function AddCategory() {
const dispatch=useDispatch()
const [category, setcategory] = useState("")
const [editcategory, seteditcategory] = useState("")
const {Category,isLoading,error}=useSelector((state)=>state.AdminAuth)
const admin=localStorage.getItem("Admin")
const adminT = JSON.parse(admin)
const admintt=adminT.adminToken
useEffect(() => {
 const categories=async()=>{
  const category=async()=>{
  
     const response=await axios.get(`/api/admin/category`,{ headers: { "Authorization": `Bearer ${admintt}` } })
     return response.data     
     }

  const allCategory= await category()
  dispatch(adminactions.Category(allCategory))
 } 
  categories()
}, [dispatch])
  const HandleSubmit=(e)=>{
    e.preventDefault()
    dispatch(NewCategory(category))
  }
const cancel=()=>{
  dispatch(adminactions.Loadingstate(false))
}

  const unlist=async(id)=>{
try{
const response=await axios.patch("/api/admin/category",{id},{ headers: { "Authorization": `Bearer ${admintt}` } })
dispatch(adminactions.unlistcategory(id))
}catch(error){

}

  }
  const editCategory=(id)=>{

  
    const category=Category.find((category)=>category._id===id)
    dispatch(adminactions.Loadingstate(true))
seteditcategory(category)


  }

  const updateCategory=async(e)=>{
    e.preventDefault()
    try{
       const response=await axios.patch("/api/admin/category/edit",{id:editcategory._id,name:category},{ headers: { "Authorization": `Bearer ${admintt}` } })
       dispatch(adminactions.editcategory({id:editcategory._id,name:category}))
    dispatch(adminactions.Loadingstate(false))
    seteditcategory(null)
    }catch(error){
    console.log(error.response.data);
    }
    
    }
    
  return (
    <AdminLayout>
  <div class="sm:ml-12 lg:ml-72 mt-8 flex flex-col">
  <h2 class="mb-4 text-2xl font-bold">Categories</h2>
  <div class="flex ">
                           <button class="text-sm font-medium text-white-600 hover:bg-gray-100 rounded-lg p-2" onClick={()=>dispatch(adminactions.Loadingstate(true))} >Add Category</button>
                        </div>
{Category && (
  <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
   {Category.map((category)=>{
return  <div class={`flex items-start rounded-xl w-[30rem] ${category.isUnlisted  ? "bg-zinc-500": "bg-white"} p-4 shadow-lg`}>
<div class="flex h-12  items-center justify-evenly ">
  {category.isUnlisted ? <Link className='text-green-900 bg-green-400 rounded-full w-10' onClick={()=>unlist(category._id)}>Unlist</Link> : <Link className='' onClick={()=>unlist(category._id)}><TrashIcon className='w-4 rounded-full '/></Link> }
  {!category.isUnlisted && (<Link className='ml-6' onClick={()=>editCategory(category._id)}><PencilIcon className='w-4 rounded-full '/></Link>) }
</div>

<div class="ml-4">
  <h2 class="font-semibold">{category.name}</h2>
</div>
</div>
   })}
  </div>
)}
     {isLoading && (
        
        <Modal>
          <div className='w-full'>  <form onSubmit={editcategory ? updateCategory :HandleSubmit}>
            <div className='flex flex-col justify-center space-y-7'>
             
            <label className='font-bold text-1xl'>Category Name</label>
            <input className='h-8 border-solid border-2 border-indigo-700' defaultValue={editcategory?.name} type="text" onChange={(e)=>setcategory(e.target.value)}/>
           {error && (<p className='text-red-600'>{error}</p>)}
            <div className='flex justify-end space-x-9'>
            <button type='button' className='px-4 py-2 bg-red-700' onClick={cancel} >Cancel</button>
            <button  className='px-4 py-2 bg-green-700'>{editcategory ? "Update"  :"Add Category"}</button>
              </div>
            </div>
          
          </form></div>
        
        </Modal>
      )}
</div>
    </AdminLayout>
   /*  <>
    <Modal>
    <div class="flex justify-between items-center pb-3">
           <p class="text-2xl font-bold text-gray-500">Add Service</p>
           <div class="modal-close cursor-pointer z-50" onclick="modalClose('main-modal')">
              <svg class="fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                 viewBox="0 0 18 18">
                 <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                 </path>
              </svg>
           </div>
        </div>
        <div class="my-5 mr-5 ml-5 flex justify-center">
<form onSubmit={HandleSubmit}>
    <div>
    <div class="">
                            <label for="names" class="text-md text-gray-600">Category Name</label>
                        </div>
                        <div class="">
                            <input type="text" id="names" autocomplete="off"  name="names" onChange={(e)=>setcategory(e.target.value)} class="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md" placeholder="Example. John Doe"/>
                        </div>
                        <div class="flex justify-center pt-2 space-x-14">
           <button
             type="submit" class="px-4 bg-blue-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Confirm</button>
        </div> 
    </div>
</form>

        </div>
    </Modal>
    </> */
  
  )
}

export default AddCategory