import React, { useRef, useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Signupcontext } from "../../../hooks/Userhooks/userSignuphook";
import Modal from "../../Modal"
import {useSelector,useDispatch} from "react-redux"
import axios from "axios";
import { useractions } from "../../../store/store";
function Signupform() {
  const { signup, Error ,isLoading,setLoading} = Signupcontext();
  const [countdown, setcountdown] = useState(59)
  const timer=useRef()
  const navigate = useNavigate();
const dispatch=useDispatch()
const [one,setone]=useState("")
const [two,settwo]=useState("")
const [three,setthree]=useState("")
const [four,setfour]=useState("")
const [minutes, setMinutes] = useState(0);
const [seconds, setSeconds] = useState(59);
  const {register,handleSubmit,getValues,formState:{errors}}=useForm()
  const {user,notification}=useSelector((state)=>state.userAuth)
  const onSubmit = (data) => {
    const {username,email,password,phone}=data
    const submit=async()=>{
   await signup(username,email,password,phone)
    }
  submit() 
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
   const data=one.concat(two.concat(three.concat(four)))
const Otpverify=async()=>{
  const response= await axios.post("/api/user/otpverify",{otp:data,id:user.user})
  if(response.data){
    setLoading(false)
    navigate("/")
  }
}
await Otpverify()
  }

  const resendOtp=async()=>{  
 
const otp=async()=>{
  setMinutes(0);
  setSeconds(59);
const  response=await axios.post("/api/user/resendotp",{id:user.user})
if(response.data){
dispatch(useractions.notification("Otp has been send to your mobile"))
}
}
await otp()
  }
  
  return (
    <section className=" dark:bg-gray-900">
      <div className=" flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-7 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)} >
              <div>
                <label
                  htmlfor="Username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="username"
                  name="username"
              {...register("username",{required:"Username is required", minLength:{value:4,message:"Min length 4"}})}
                
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                
                />
          <p className="text-red-700">{errors.username?.message}</p>
              </div>
              <div>
                <label
                  htmlfor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="password"
             {...register("email",{required:"Email required" })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                />
              </div>
              <div>
                <label
                  htmlfor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="email"
                  id="password"
             {...register("phone",{required:"Phone required" })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                />
              </div>
              <p className="text-red-700">{errors.phone?.message}</p>
              <div>
                <label
                  htmlfor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="confirm-password"
                  {...register("password",{required:"Password Required",minLength:5})}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  
                />
              </div>
              <p className="text-red-700">{errors.password?.message}</p>
              <div>
                <label
                  htmlfor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirm-password"
                  {...register("confirm_password",{required:"Password Required",  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  }})}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  
                />
              </div>
              <p className="text-red-700">{errors.confirm_password?.message}</p>
              <div className="flex items-start"></div>
              <input className="w-full text-white bg-navcolor hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit"/>
             {/*  <button
                disabled={isLoading}
                type="submit"
                className="w-full text-white bg-navcolor hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button> */}
         
              
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={() => navigate("/login")}
                >
                  Login here
                </a>
                {Error && <div className="error"></div>}
              </p>
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
      </div>
    </section>
  );
}

export default Signupform;
