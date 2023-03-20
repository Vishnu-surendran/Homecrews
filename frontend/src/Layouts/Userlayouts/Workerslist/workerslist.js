import React, { useEffect,useState } from 'react'
import banner from '../../../assets/Service banner.jpg'
import plumbing from '../../../assets/plumbing.png'
import Footer from '../../../Components/Footer/Footer'
import {Navigate, useLoaderData,useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import { useractions } from '../../../store/store'
import Navbarpage from '../Navbar/navbarpage'
import Modal from '../../Modal'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Serviceworkers() {
const dispatch=useDispatch()
const workers=useLoaderData()

const navigate=useNavigate()
const [responses, setresponse] = useState(null)
const [mode, setmode] = useState("")
const [fromdate,setfromdate] = useState("")
const [todate, settodate] = useState("")
const [wid, setwid] = useState(null)
const [address, setaddress] = useState(null)
const [tokens,settoken]=useState(null)
const [paymentstatus,setpaymentstatus]=useState(null)
const [filter,setfilter]=useState("")

/* const [product]=useState({
  name:'first product',
  price:200,
  description:"This is sample"          
})
 */
const {Workers,isLoading,notification}= useSelector((state)=>state.userAuth)
useEffect(() => {
    const user=localStorage.getItem("user")
    const {token}=JSON.parse(user)
    settoken(token)

    const userProfile=async()=>{
     
        try{
         
          const response = await axios.get("/api/user/profile/",{ headers: { "Authorization": `Bearer ${tokens}` } })
  
          
        }catch(error){
          console.log(error);
          return {error:error.response.data}
        }
      }
    if(workers.error){
      dispatch(useractions.workerslist(null))
        dispatch(useractions.notification(workers.error))
    }if(!workers.error){
        dispatch(useractions.workerslist(workers))
    }

}, [])


const payment=(id)=>{
    dispatch(useractions.loading(true))
setwid(id)

}
const handleToken=async()=>{
 const user=localStorage.getItem("user")
        const {tokens}=JSON.parse(user)
        try{
        
            const {data:{order}} = await axios.post("/api/user/book/",{payment:mode,wid:wid,address:address,from:fromdate,to:todate},{ headers: { "Authorization": `Bearer ${tokens}` } })
            console.log();
            const {data:{key}} = await axios.get("/api/user/getkey",{ headers: { "Authorization": `Bearer ${tokens}` } })
         
            const options = {
                key, // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Acme Corp",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: async function (response){
                    try{
                        const paymentcerify = await axios.post("/api/user/paymentverification",{razorpay_payment_id:response.razorpay_payment_id,razorpay_order_id:response.razorpay_order_id,razorpay_signature:response.razorpay_signature},{ headers: { "Authorization": `Bearer ${tokens}` } })
                       
                        setresponse("success")
                     console.log(paymentcerify)
                    }catch(error){
setresponse("failed")
                    }
                  },
                
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            var rzp1 = new window.Razorpay(options);
                rzp1.open()   
          }catch(error){
            console.log(error)  
          } 
       console.log(window)
            }

            const offlinesubmit=async()=>{
                const user=localStorage.getItem("user")
                const {tokens}=JSON.parse(user)
                try{
         
                    const response = await axios.post("/api/user/book/",{address:address,wid:wid,payment:mode},{ headers: { "Authorization": `Bearer ${tokens}` } })
                
                 console.log(response.data);
                 
                  }catch(error){
                    console.log(error);
                    return {error:error.response.data}
                  }
            }
    return (
        <>
        <Navbarpage/>
        <div className='bg-emerald-100 '>

            <div className='relative h-96  w-full'>
                <img className=' absolute mt-20 opacity-20 w-full h-full object-cover' src={banner} />
                <div className=' pt-60 md:pt-60 flex flex-col justify-between items-center'>
                    <h1 className='text-black text-3xl md:text-5xl font-bold'>Workers</h1>
                </div>
            </div>
            <div>
                <div className='mt-32 flex  justify-evenly'>
                    <div></div>
                    <div><h1 className='text-4xl font-bold py-6'>Our Workers</h1>
                        <h1 className='font-bold'>Choose from Our Workers</h1></div>
                        <div>
                        <select
                  id="gender"
                onChange={(e)=>setfilter(e.target.value)}
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none"
                >
                  <option value="">Selct a city</option>
                  <option value="kochi">Kochi</option>
                  <option value="trivandrum">Trivandrum</option>
                 
                </select>
                        </div>
                        </div>
            <div className=' mt-6 grid sm:grid-cols-1 :grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 px-10'>
                { Workers ?

                    Workers.filter((data)=>{
                        return filter.toLowerCase() ==="" ? data : data.address.toLowerCase().includes(filter)
                    }).map((worker)=>{
                        return  <div className='bg-white w-72 px-5 py-9 rounded-2xl drop-shadow-lg space-y-3 h-full'>
                        <img src={plumbing} />
                        <h1 className='text-3xl font-bold'>Name: {worker.name}</h1>
                        <p className='break-words'>Age :{worker.age}</p>
                        <p className='break-words'>Job :{worker.job}</p>
                        <p className='break-words'>Gender :{worker.gender}</p>
                        <p className='break-words'>Total works completed :{worker.worksDone}</p>

                      
                        <button className='px-3 py-2 rounded-lg' onClick={()=>payment(worker._id)}>Choose</button>
                        </div>
                    }):<div className='bg-transparent w-72 px-5 py-9 rounded-2xl drop-shadow-lg space-y-3 h-full ml-[38rem]'>{notification}</div>        
                  
                   } 

                </div>
                {isLoading && (
                <Modal>

                    {responses ? <>  <div className="bg-white border space-y-8 border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p className="text-3xl font-bold tracking-wider text-green-800">Booking Successfull</p>
        <Link to="/profile" className="flex items-center space-x-2 bg-green-800  hover:bg-green-500 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <span>Go to Bookings</span></Link>
           
       
    </div></>:<><h1 className='font-bold mb-4'>Choose Payment Type</h1>
                    <fieldset class="mb-5">
        <legend class="sr-only">
            Payment
        </legend>


        <div class="flex items-center mb-4">
            <input id="country-option-2" type="radio" name="countries" value="online" onChange={(e)=>setmode(e.target.value)} class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-2" aria-describedby="country-option-2"/>
            <label for="country-option-2" class="text-sm font-medium text-gray-900 ml-2 block">
            Online
            </label>
        </div>
        <div class="flex items-center mb-6">
            <input id="country-option-3" type="radio" name="countries" value="offline" onChange={(e)=>setmode(e.target.value)} class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-2" aria-describedby="country-option-2"/>
            <label for="country-option-3" class="text-sm font-medium text-gray-900 ml-2 block">
            Offline
            </label>
         
        

        </div>
        <label className='font-bold mt-4'>Select Shift</label>
        <div class="flex items-center mt-4 mb-4">
        <label for="country-option-2" class="text-sm font-medium text-gray-900 ml-2 block mr-4">
            From:
            </label>
            <input id="country-option-2" type="date" name="countries" onChange={(e)=>setfromdate(e.target.value)} class=" border-gray-300 focus:ring-2 focus:ring-blue-300 mr-3" aria-labelledby="country-option-2" aria-describedby="country-option-2"/>
            <label for="country-option-2" class="text-sm font-medium text-gray-900 ml-2 block mr-4">
            To:
            </label>
            <input id="country-option-2" type="date" name="countries" onChange={(e)=>settodate(e.target.value)} class=" border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-2" aria-describedby="country-option-2"/>
        </div>
 <div class="flex items-center mb-4">
 <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your Address</label>
<textarea id="message" rows="4" onChange={(e)=>setaddress(e.target.value)} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your address"></textarea>
 </div>
       
       
        {mode==="offline" ?  <button className='ml-36 px-4 py-2' onClick={offlinesubmit}>Book now</button> :
         <button type='button' className='ml-36 px-4 bg-indigo-800 py-2'
      onClick={handleToken}
        >Pay n</button> }
    </fieldset></>}
                    
                </Modal>
               )} 
            </div>
            <Footer />
        </div>     
        </>
   
    )
}

export default Serviceworkers