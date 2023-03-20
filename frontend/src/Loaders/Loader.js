import Adminstatehook from "../hooks/Adminhooks/Adminstatehook";
import {useSelector} from "react-redux"
import axios from "axios"
import { useDispatch } from "react-redux";
import { workeractions } from "../store/store";


export function Loader() {
  const admin = Adminstatehook()
  const dispatch=useDispatch()
  const {worker,profile}=useSelector((state)=>state.workerAuth)
 /*  const userToken=useSelector((state)=>state.userAuth.user) */
/*   const {token}= usertoken ||{}
  console.log(token,"kkjk"); */
  const userList = async () => {
   
    if (admin) {
      const response = await axios.get("/api/admin/users", { headers: { "Authorization": `Bearer ${admin}` } })
     console.log(response.data)
      return response.data
    } if (!admin) {
    
      return null
    }

  }

  

  const workerList = async () => {
    if (admin) {
      const response = await axios.get("/api/admin/workers", { headers: { "Authorization": `Bearer ${admin}` } })
      return response.data
    } if (!admin) {
      return null
    }
  }

  const serviceList = async () => {
    if (admin) {
      const response = await axios.get("/api/admin/services", { headers: { "Authorization": `Bearer ${admin}` } })
      return response.data
    } if (!admin) {
      return null
    }
  }
  const homeserviceList = async () => {
const user=localStorage.getItem("user")
const {tokens}=JSON.parse(user)

    if (tokens) {
      try{
        const response = await axios.get("/api/user/services",{ headers: { "Authorization": `Bearer ${tokens}` } })
        console.log(response.data);
        return response.data
      }catch(err){
        return {error:err.response.data.err}
      }
    
    } if (!tokens) {
      return null
    }
  }

  const WorkersList = async ({params}) => {
    const user=localStorage.getItem("user")
    const {tokens}=JSON.parse(user)
    const id=params.id
        if (tokens) {
          try{
            const response = await axios.get("/api/user/workers/"+id,{ headers: { "Authorization": `Bearer ${tokens}` } })
          console.log(response.data);
            return response.data
          }catch(err){
            console.log(err);
            return {error:err.response.data}
          }
        
        } if (!tokens) {
          return null
        }
      }

  const workerRegistration=async(data)=>{
    console.log(data);
  const{name,email,age,job,password,gender}=data
  const register=async()=>{
      const response=await axios.post("/api/workers/register",{name,email,password,age,job,gender})
      return response.data
  }
  
try{
 const worker =await register()
 console.log(worker);
 return worker
}catch(err){
  console.log("worker registration failed");
}
   
   
     
  }
  const workerProfile=async(data)=>{
    const workerfetch=async()=>{
      if(!worker){
        return null
      }else{
        const workerdetails=await axios.get(`/api/workers/worker`,{headers:{"Authorization":`Bearer ${worker.token}`}})
        return workerdetails.data
      }
     
    }
try{
const worker=await workerfetch()
/* dispatch(workeractions.Workerstatus(worker)) */
return worker

}catch(err){
  console.log(err);
}
   
   
    
  }

  const workerDuties=async(data)=>{
    const workerfetch=async()=>{
      if(!worker){
        return null
      }else{
        const workerdetails=await axios.get(`/api/workers/duties`,{headers:{"Authorization":`Bearer ${worker.token}`}})
        return workerdetails.data
      }
    
    
    }
try{
const worker=await workerfetch()

return worker

}catch(err){
  console.log(err);
}   
  }

  const userProfile=async()=>{
    const user=localStorage.getItem("user")
    const {tokens}=JSON.parse(user)
    try{
    
      const response = await axios.get("/api/user/profile/",{ headers: { "Authorization": `Bearer ${tokens}` } })
  
      return response.data
    }catch(error){
      console.log(error);
      return {error:error.response.data}
    }
  }


  return { userList,workerProfile,userProfile, workerList, serviceList,homeserviceList,workerRegistration,WorkersList,workerDuties }

}



export default Loader



