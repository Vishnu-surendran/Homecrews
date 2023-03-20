import React from "react";

import AdminLayout from "../Layout/AdminLayout";
import Datas, { datas } from "./datas";
function Admindashboard() {
 
  return (
    <>  
    <AdminLayout>
    <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
      <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
               <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
               
                  <div class="bg-white  shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="mb-4 flex items-center justify-between">
                        <div>
                           <h3 class="text-xl font-bold text-gray-900 mb-2">Bookings</h3>
                          
                        </div>
                        <div class="flex-shrink-0">
                           <a href="#" class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">View all</a>
                        </div>
                     </div>
                     <div class="flex flex-col mt-8">
                        <div class="overflow-x-auto rounded-lg">
                           <div class="align-middle inline-block min-w-full">
                              <div class="shadow overflow-hidden h-96 sm:rounded-lg">
                              <Datas/>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
           
            </div>
         </main>
     
       
      </div>
    </AdminLayout>
     


     {/*  <div className="bg-black text-white h-screen">
        <div className="flex justify-between border-b-8">
          <nav>
            <h1 className=" pl-9 py-5  font-semibold text-2xl md:text-3xl ">
              Admin
            </h1>
          </nav>
          <ul className=" hidden md:flex space-x-8 px-9">
            <BellIcon className="w-5" />
            <button
              className="bg-transparent border-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          </ul>
        </div>
        <div className="flex py-8 px-7 flex-col bg-black text-white h-[540px] w-48 h-96 relative border-r-4 md:border-r-8 ">
          <ul>
            <li>Dashboard</li>
            <li>
              <NavLink to="/admin/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/admin/workerlist">Workers</NavLink>
            </li>
            <li>
              <NavLink to="/admin/services">Services</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Outlet /> */}
    </>
  );
}

export default Admindashboard;