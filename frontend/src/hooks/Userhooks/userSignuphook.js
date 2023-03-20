import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { useractions } from "../../store/store";

export const Signupcontext=()=>{
    const [Error, setError] = useState(null) 
    const [isLoading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const signup=async(username,email,password,phone)=>{
        setError(null)
        const response = await fetch("/api/user/register",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username,email,password,phone})
            
        })
        const json=await response.json()
        if(!response.ok){
            setLoading(false)
            setError(json.error)  
        }
        if(response.ok){

            dispatch(useractions.login(json))
            localStorage.setItem("user",JSON.stringify(json))
            setLoading(true)
        }
    }
   return {isLoading,signup,Error,setLoading}
}

