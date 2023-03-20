import React,{useState,useEffect} from "react";
import loginimg from "./../../assets/workerlogin.jpg";
import { useForm } from "react-hook-form";
import Loader from "../../Loaders/Loader";
import { useDispatch, useSelector } from "react-redux";
import { workeractions } from "../../store/store";
import { useLoaderData, useNavigate } from "react-router-dom";
import Modal from ".././Modal"
import axios from "axios";
function Workerregister() {
 /*  const { workerRegistration } = Loader(); */
 const services=useLoaderData()

 const [one,setone]=useState("")
const [two,settwo]=useState("")
const [three,setthree]=useState("")
const [four,setfour]=useState("")
const [minutes, setMinutes] = useState(0);
const [seconds, setSeconds] = useState(59);
const {worker,isLoading,notification}=useSelector((state)=>state.workerAuth)
  const {
    register,
    handleSubmit,getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  

  const onSubmit = async (data) => {
   /*  const worker = await workerRegistration(data); */
  /*   dispatch(workeractions.login(worker));
    navigate("/worker"); */
    console.log(data);
  
    const formData=new FormData()
   
    formData.append("name",data.name)
    formData.append("email",data.email)
    formData.append("age",data.age)
    formData.append("password",data.password)
    formData.append("phone",data.phone)
    formData.append("gender",data.gender)
    formData.append("job",data.job)
    formData.append("service",data.service)
    formData.append("address",data.address)
    formData.append("file",data.file[0])
    
    const submission=async ()=>{
      try{
        const response=await axios.post("/api/workers/register",formData)
        localStorage.setItem("worker",JSON.stringify(response.data))
        dispatch(workeractions.login(response.data))
        dispatch(workeractions.loading(true))
      }catch(error){
        console.log(error)
      }
     
          
  
    }
 const worker= await submission()

  };


  useEffect(() => {
  
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
  
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  
  }, [seconds])
  
  const OtpVerify=async(e)=>{
   e.preventDefault()
   const worker = localStorage.getItem('worker')
  
   const workerT=JSON.parse(worker)
   const data=one.concat(two.concat(three.concat(four)))
const Otpverify=async()=>{
  const response= await axios.post("/api/workers/otpverify",{otp:data,id:workerT.id})
  if(response.data){
    dispatch(workeractions.loading(false))
    navigate("/workerlogin")
  }
}
await Otpverify()
  }

  const resendOtp=async()=>{  
 
const otp=async()=>{
  setMinutes(0);
  setSeconds(59);
  const worker = localStorage.getItem('worker')
  const workerT=JSON.parse(worker)
  console.log(workerT,"KL");
const  response=await axios.post("/api/workers/resendotp",{id:workerT.id})
if(response.data){
dispatch(workeractions.notification("Otp has been send to your mobile"))
}
}
await otp()
  }
  

  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="grid grid-cols-2">
      <div class="flex items-center w-full max-w-3xl p-8 lg:px-12 ">
          <div class="w-full">
            <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get Hired now.
            </h1>

            <p class="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <form class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
              <div>
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Name
                </label>
                <input
                  type="text"
                  placeholder={errors.firstname?.message ? errors.firstname.message :"name"}
                  {...register("name",{required:"!This field is required"})}
                  class={errors.firstname?.message ? "block w-full px-5 py-3 mt-2 placeholder-red-600 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" }
                />
              </div>
           
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Phone number
                </label>
                <input
                  type="number"
                  placeholder={errors.phone?.message ? errors.phone.message :"phone"}
                  {...register("phone",{required:"!Phone number required"})}
                  class={errors.phone?.message ? "block w-full px-5 py-3 mt-2 text-gray-700  placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" }
                />
              </div>
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder={errors.email?.message ? errors.email.message :"Email"}
                  {...register("email",{required:"!Email required"})}
                  class={errors.email?.message ? "block w-full px-5 py-3 mt-2 text-gray-700 placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" }
                />
              </div>
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  placeholder={errors.password?.message ? errors.password.message :"Password"}
                  {...register("password",{required:"!Password is required"})}
                  class={errors.password?.message ? "block w-full px-5 py-3 mt-2 text-gray-700  placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" }
                />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder={errors.confirm_password?.message ? errors.confirm_password.message :"Confirm Password"}
                  {...register("confirm_password",{required:"Password Required",  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  }})}
                  class={errors.confirm_password?.message ? "block w-full px-5 py-3 mt-2 text-gray-700  placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" }
                />
              </div>
            
              <div>
<label  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                 htmlfor="grid-password">
                Address
              </label>
              <input type="text"  {...register("address",{required:"!This field is required"})}  class={errors.address?.message ? "block w-full px-5 py-3 mt-2 text-gray-700  placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" } />
</div>
            
 
              </div>
       <div>
       <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Job
                </label>
                <input
                  type="text"
                  placeholder={errors.job?.message ? errors.job.message :"Job"}
                  {...register("job",{required:"This field is required"})}
                  class={errors.job?.message ? "block w-full px-5 py-3 mt-2 text-gray-700  placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" }
                />
              </div>
       <div>
                <label
                  for="gender"
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  {...register("gender",{required:"!This field is required"})}
                  class={errors.age?.message ? "block w-full px-5 py-3 mt-2 text-gray-700  placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" }
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label
                  for="service"
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                >
                  Service
                </label>
                <select
                  id="service"
                  {...register("service",{required:"!This field is required"})}
                  class={errors.service?.message ? "block w-full px-5 py-3 mt-2 text-gray-700  placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" }
                >
                  {services ? services.map((service)=>{
                   return<><option value="">Select</option><option value={`${service.name}`}>{service.name}</option></> 
                  }):<option value="">Select</option>}
                  
              
                </select>
              </div>
              <div>
                <label
                  for="age"
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                >
                  Age
                </label>
                <select
                  id="age"
                  {...register("age",{required:"!Password is required"})}
                  class={errors.age?.message ? "block w-full px-5 py-3 mt-2 text-gray-700  placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" }
                >
                  <option value="">Select</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                </select>
              </div>

              <div>
              <label for="formFile" class="form-label inline-block mb-2 text-gray-700">Uplaod id proof</label>
    <input class={errors.age?.message ? "block w-full px-5 py-3 mt-2 text-gray-700  placeholder-red-600 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border-red-600 rounded-md focus:outline-none" :"block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border  rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md focus:outline-none" }  {...register("file",{required:"!Email required"})} type="file" id="formFile"/>
              
              </div>

       </div>


       

              <input type="submit" class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"/>

       

            
          
            </form>
          </div>
          {isLoading && (
            <Modal>
<div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div class="flex flex-col items-center justify-center text-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div class="flex flex-row text-sm font-medium text-gray-400">
          <p>{notification}</p>
        </div>
      </div>

      <div>
        <form onSubmit={OtpVerify}>
          <div class="flex flex-col space-y-16">
            <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div class="w-16 h-16 ">
               <input onChange={(e)=>setone(e.target.value)}  type="tel"  class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" />
              </div>
              <div class="w-16 h-16 ">
               <input onChange={(e)=>settwo(e.target.value)}  type="tel"  class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"/>
              </div>
              <div class="w-16 h-16 ">
               <input onChange={(e)=>setthree(e.target.value)}  type="tel"  class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"/>
              </div>
              <div class="w-16 h-16 ">
               <input onChange={(e)=>setfour(e.target.value)}  type="tel"  class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"/>
              </div>
            </div>

            <div class="flex flex-col space-y-5">
              <div>
                <input type="submit" class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"/>
              </div>
          {/*     {console.log(errors.first?.message,"one")}
              {console.log(errors.second?.message,"two")}
              {console.log(errors.third?.message,"three")}
              {console.log(errors.fourth?.message,"four")} */}
                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
      {seconds > 0 || minutes > 0 ? (
        <p>
           {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p>Didn't recieve code?</p>
      )}

      <button
        disabled={seconds > 0 || minutes > 0}
        style={{
         backgroundColor:"transparent", borderStyle:"none",color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "blue",
        }}
        onClick={resendOtp}
      >Resend</button></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
            </Modal>
          )}
        </div>

      <div className="">
        <img className=" object-cover w-full h-full lg:h-[40rem]" src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d29ya2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
      </div>
      </div>
    </section>
  );
}

export default Workerregister;
