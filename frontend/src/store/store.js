import { createSlice, configureStore } from "@reduxjs/toolkit"
import axios from "axios"
import { Baseurl } from "../Baseurl/Basurl"

const userAuth = {
    user: null,
    services:null,
    Workers:null,
    notification:null,
    isLoading:false,
    workers:null ,
    profile:null,
    bookings:null,
    bookingid:null
}

const worker={
    worker:null,
    profile:null,
    duty:null,
    notification:null,
    isLoading:false,
    booking:null,
    bookingid:null,
    connection:null
}
const adminAuth = {
    admin: null,
    Users: null,
    workers: null,
    services: null,
    isLoading:false,
    Category:null,
    error:null,
    edit:null
}
const adminMangement = createSlice({
    name: "admin",
    initialState: adminAuth,
    reducers: {
        Admlogin(state, action) {
            state.admin = action.payload
        },
        Admlogout(state) {
            state.admin = null
        },
        Userlist(state, action) {
            state.Users = action.payload
        },
        workerlist(state, action) {
            state.workers = action.payload
        },
        Blockuser(state,action){
   const user= state.Users.find(users=>users._id===action.payload)
    if(user){
        user.isBlocked=!user.isBlocked
    }if(!user){
        console.log("no user found");
    }
        },
        blockWorkers(state,action){
            const worker= state.workers.find(users=>users._id===action.payload)
            if(worker){
                worker.isBlocked=!worker.isBlocked
            }if(!worker){
                console.log("no user found");
            }
        },
        WorkerApproval(state,action){
            const worker= state.workers.find(users=>users._id===action.payload)
            if(worker){
                worker.isApproved=true
            }if(!worker){
                console.log("no user found");
            }
        },
        servicelist(state, action) {
            state.services = action.payload
        },
        Addservice(state,action){
            state.services.push(action.payload)
        },
        Loadingstate(state,action){
            state.isLoading=action.payload
           }, Loading(state,action){
            state.edit=action.payload
           },
           Category(state,action){
          state.Category=action.payload
           },
           AddCategory(state,action){
            state.Category.push(action.payload)
           },Unlistservice(state,action){
const service=state.services.find((services)=>services._id===action.payload)
service.isUnlisted=!service.isUnlisted
           },editservices(state,action){
            const {name,experience,description,category}=action.payload.data
let service=state.services.find((services)=>services._id===action.payload.id)
    service.name=name
    service.experience=experience
    service.description=description
    service.category=category
           },setError(state,action){
            state.error=action.payload
           },unlistcategory(state,action){
const categorystatus=state.Category.find(category=>category._id===action.payload)
categorystatus.isUnlisted=!categorystatus.isUnlisted
           },editcategory(state,action){
            const categorystatus=state.Category.find(category=>category._id===action.payload.id)
            categorystatus.name=action.payload.name
                       },setStatus(state,action){
const worker=state.workers.find((worker)=>worker._id===action.payload.id)
worker.status=action.payload.status
worker.warning=action.payload.warning
worker.isApproved=action.payload.approval
           }
    }
})



const userManagement = createSlice({
    name: 'users',
    initialState: userAuth,
    reducers: {
        login(state, action) {
            state.user = action.payload
        },
        logout(state) {
            state.user = null
        },
        services(state,action){
            state.services=action.payload
        },
        notification(state,action){
state.notification=action.payload
        },loading(state,action){
          state.isLoading=action.payload
        },workerslist(state,action){
         state.Workers=action.payload
        },profile(state,action){
            state.profile=action.payload
        },bookings(state,action){
            state.bookings=action.payload
        },cnacelbooking(state,action){
            const booking=state.bookings.find((book)=>book._id===action.payload)
            booking.bookingstatus=false
        },
        chatstart(state,action){
state.bookingid=action.payload
        }
     
    }
})

const workerManagement=createSlice({
    name:'workers',
initialState:worker,
reducers:{
    login(state,action){
    state.worker=action.payload
    },Workerstatus(state,action){
state.profile=action.payload
    },dutystatus(state,action){
state.duty=action.payload
    } ,notification(state,action){
        state.notification=action.payload
                },loading(state,action){
                  state.isLoading=action.payload
                },reapply(state,action){
                    const worker=state.worker.find((worker)=>worker._id===action.payload.id)
                    worker.applicationstatus=true
                    
                },bookings(state,action){
state.booking=action.payload
                },beginchat(state,action){
state.bookingid=action.payload
                },connection(state,action){
state.connection=action.payload
                }
}
})


export const useractions = userManagement.actions
export const adminactions = adminMangement.actions
export const workeractions=workerManagement.actions

const store = configureStore({
    reducer: { userAuth: userManagement.reducer, AdminAuth: adminMangement.reducer,workerAuth:workerManagement.reducer }
})


export const blockuser=(id)=>{
  const admin=localStorage.getItem("Admin")
  const adminT = JSON.parse(admin)
  const admintt=adminT.adminToken
return async(dispatch)=>{
const fetchdata=async()=>{
    const response=await axios.get(`${Baseurl}/api/admin/users/block/${id}`,{ headers: { "Authorization": `Bearer ${admintt}` } })
    return response.data.status
}
    const status=fetchdata()
 dispatch(adminactions.Blockuser(id))
}

}

export const blockWorker=(id)=>{
    const admin=localStorage.getItem("Admin")
    const adminT = JSON.parse(admin)
    const admintt=adminT.adminToken
    return async(dispatch)=>{
    const fetchdata=async()=>{
        const response=await axios.get(`${Baseurl}/api/admin/worker/block/${id}`,{ headers: { "Authorization": `Bearer ${admintt}` } })
        return response.data.status
    }
      const status=  await fetchdata()
     dispatch(adminactions.blockWorkers(id))
    }
    
    }   
    export const ApproveWorker=(id)=>{
        const admin=localStorage.getItem("Admin")
        const adminT = JSON.parse(admin)
        const admintt=adminT.adminToken
        return async(dispatch)=>{
        const fetchdata=async()=>{
            const response=await axios.patch(`${Baseurl}/api/admin/worker/approve`,{id},{ headers: { "Authorization": `Bearer ${admintt}` } })
            dispatch(adminactions.setStatus({id:id,status:false,warning:null,approval:true}))
            return response.data.status
        }
          const status=  await fetchdata()
         dispatch(adminactions.WorkerApproval(id))
        }
        
        }   
    


    export const Newservice=(data)=>{
       return async (dispatch)=>{
        const submission=async()=>{
            try{
                dispatch(adminactions.setError(null))
                const response=await axios.post(`${Baseurl}/api/admin/services`,data)
                dispatch(adminactions.Addservice(response.data))
                dispatch(adminactions.Loadingstate(false))
            }catch(error){
dispatch(adminactions.setError(error.response.data))
            }
            
           }
           await submission()
       }
    }
    
    export const NewCategory=(data)=>{
        return async (dispatch)=>{
            const admin=localStorage.getItem("Admin")
            const adminT = JSON.parse(admin)
            const admintt=adminT.adminToken
         const category=async()=>{
            try{
                const response=await axios.post(`${Baseurl}/api/admin/addcategory`,{data:data},{ headers: { "Authorization": `Bearer ${admintt}` } })
                dispatch(adminactions.AddCategory(response.data))
                dispatch(adminactions.Loadingstate(false))
                return response.data.status  
            }catch(error){
                dispatch(adminactions.setError(error.response.data))
            }
           
            
            }
            await category()
        }
     }

export default store