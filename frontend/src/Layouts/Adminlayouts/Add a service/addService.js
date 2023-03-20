import React,{useState} from 'react'
import Admindashboard from '../Dashboard/Admindashboard'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { adminactions } from "../../../store/store";
import Modal from '../../Modal'
import { Newservice } from "../../../store/store";
function AddService(props) {
  const {data,update}=props
  const dispatch = useDispatch();
  const {services,isLoading,Category ,error,edit}= useSelector((state) => state.AdminAuth);
  const [name, setname] = useState("")
  const [category, setcategory] = useState("")
  const [description, setdescription] = useState("")
  const [experience, setexperience] = useState(null)
  const [file, setfile] = useState("")

  
  const modals=()=>{
    dispatch(adminactions.Loadingstate(!isLoading))
        }

        const Addform=async(e)=>{
          e.preventDefault()
          if(update){
            const data={
              name:name,
              category:category,
              description:description,
              experience:experience
            }
          
              update(data)
            }else{
              const formData=new FormData()
              formData.append('image',file)
              formData.append('name',name)
              formData.append('experience',experience)
              formData.append('category',category)
              formData.append('description',description)
            dispatch(Newservice(formData))              
            } 
      } 

      const cancel=()=>{
    
        if(update){
          dispatch(adminactions.Loading(false))
        }else{
          dispatch(adminactions.Loadingstate(false))
        }
        dispatch(adminactions.setError(null))
      
      }
  return (
    <>
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
        {error &&(<p className='text-red-700 text-right'>{error}</p>)}
        <div class="my-5 mr-5 ml-5 flex justify-center">
                <form   onSubmit={Addform} class="w-full">
                    <div class="">
                        <div class="">
                            <label for="names" class="text-md text-gray-600">Name</label>
                        </div>
                        <div class="">
                            <input type="text" id="names" autocomplete="off" onChange={(e)=>setname(e.target.value)} name="names" class="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md" defaultValue={data ? data.name :""}/>
                        </div>
                        <div class="">
                            <label for="number" class="text-md text-gray-600">Experience</label>
                        </div>
                        <div class="">
                            <input type="number" id="phone" onChange={(e)=>setexperience(e.target.value)} autocomplete="off" name="phon" class="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md" defaultValue={data ? data.experience :""}/>
                        </div>
                        <div class="">
                            <label for="id_number" class="text-md text-gray-600">Category</label>
                        </div>
                        <div class="">
                        <select
                  id="category"
                  onChange={(e)=>setcategory(e.target.value)}
                  class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-black-600 rounded-md focus:outline-none" 
                  defaultValue={data ? data.category :""}>
                   <option value="">Select</option>
                    {Category && (<>
                    {Category.map((category)=>{
                      return  <>
                      
                      <option value={category.name}>{category.name}</option>
                    
                      </>
                    })}
                   
                    </>
 
                    )}
               
                </select>
                        </div>

                        <div>
                        <label class="text-md text-gray-600" htmlfor="Description">
                Description
              </label>
              <textarea type="text" onChange={(e)=>setdescription(e.target.value)} class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4" defaultValue={data ? data.description :""} />
                        </div>
                        {!update && (<>            <label for="formFile" class="form-label inline-block mb-2 text-gray-700">Add Image</label>
    <input  onChange={(e)=>setfile(e.target.files[0])} class="block w-full px-5 py-3 mt-2 text-gray-700  placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-black-600 rounded-md focus:outline-none" type="file" id="formFile"/>
            </>)}
                        <div>
  
              </div>
                    </div>
                    <div class="flex justify-end pt-2 space-x-14">
                    
           <button
            type='button'  class="px-4 bg-gray-200 p-3 rounded text-black hover:bg-gray-300 font-semibold" onClick={cancel}>Cancel</button>
           <button
             type="submit" class="px-4 bg-blue-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Confirm</button>
        </div> 

                </form>
        </div>
        </Modal>
    </>
   
  )
}

export default AddService