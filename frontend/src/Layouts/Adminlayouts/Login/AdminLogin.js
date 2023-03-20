import React, { useState } from "react";
import { UseAdminlogin } from "../../../hooks/Adminhooks/UseAdminlogin";
import {useForm} from "react-hook-form"
function AdminLogin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { adminLogin } = UseAdminlogin();
  const {register,handleSubmit,formState:{errors}}=useForm()
  const onSubmit = (data) => {
  const{email,password}=data

  const submit=async()=>{
    await adminLogin(email,password)
  }
  submit()
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex  flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white mt-16 rounded-lg shadow dark:border md:mt-12 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 mt-8 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Admin Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("email",{required:'Email is required'})}
                />
              </div>
              <p className="text-red-700">{errors.email?.message}</p>
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
                  id="password"
                
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password",{required:'Password is required'})}
                />
              </div>
              <p className="text-red-700">{errors.password?.message}</p>
              <input
                type="submit"
                className="w-full text-white bg-navcolor hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
