import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useractions } from "../../store/store"


export const Userlogout=()=>{
const dispatch=useDispatch()
const navigate=useNavigate()
const logout=()=>{
    localStorage.removeItem('user')
    dispatch(useractions.logout())
    navigate('/login')
}
return{logout}
}
