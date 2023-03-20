import React, { useEffect,useState } from 'react'
import banner from '../../../assets/Service banner.jpg'
import plumbing from '../../../assets/plumbing.png'
import Footer from '../../../Components/Footer/Footer'
import {useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import { useractions } from '../../../store/store'
import Navbarpage from '../Navbar/navbarpage'
import Modal from '../../Modal'
function Workers() {
const dispatch=useDispatch()

const navigate=useNavigate()
const {services,isLoading,notification}= useSelector((state)=>state.userAuth)
const [modal, setmodal] = useState(true)
/* useEffect(() => {
    if(service.error){
        dispatch(useractions.loading(true))
        dispatch(useractions.notification(service.error))
    }if(!service.error){
        dispatch(useractions.services(service))
    }

}, []) */

    return (
        <>
        <Navbarpage/>
        <div className='bg-emerald-100 '>

            <div className='relative h-96  w-full'>
                <img className=' absolute mt-20 opacity-20 w-full h-full object-cover' src={banner} />
                <div className=' pt-60 md:pt-60 flex flex-col justify-between items-center'>
                    <h1 className='text-black text-3xl md:text-5xl font-bold'>Services</h1>
                    <p>hihjnoidsklkjsdfhnkjlfdnjksdfnkjd</p>
                </div>
            </div>
            <div>
                <div className='mt-32 flex  justify-evenly'>
                    <div><h1 className='text-4xl font-bold py-6'>Our Services</h1>
                        <h1 className='font-bold'>Choose from Our services</h1></div></div>
                <div className=' mt-6 grid sm:grid-cols-1 :grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 px-10'>
                   {services ?

                    services.map((service)=>{
                        return  <div className='bg-white w-72 px-5 py-9 rounded-2xl drop-shadow-lg space-y-3 h-full'>
                        <img src={plumbing} />
                        <h1 className='text-3xl font-bold'>{service.name}</h1>
                        <p className='break-words'>jjjjgjghhhjghhjgghgghjgghjghgjghjgjhghjghjgjhgjhjghhjghkdshbfdjkgdhsgbhdsgjdsafgjdsghjkjkdhkjhfjkhjksdfhkjhhdfsjkkjsflhjsdfhjfdhsjkl</p>
                        <button className='px-3 py-2 rounded-lg'onClick={()=>console.log("hii")}>Choose</button>
                        </div>
                    }):<div></div>        
                  
                   }

                </div>
               {isLoading && (
                <Modal>
                     <div class="bg-white px-16 py-14 rounded-md text-center">
    <h1 class="text-xl mb-4 font-bold text-slate-500">{notification}</h1>

    <button class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={()=>navigate("/login")}>Ok</button>
  </div>
                  {/*   <div>
                        {notification}
                        <button onClick={()=>navigate("/login")}>OK</button>
                    </div> */}
                </Modal>

               )} 

              
            </div>
            <Footer />
        </div>     
        </>
   
    )
}

export default Workers