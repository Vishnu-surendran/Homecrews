import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminactions } from "../../../store/store";
import Admindashboard from "../Dashboard/Admindashboard";
import Adminstatehook from "../../../hooks/Adminhooks/Adminstatehook";
import { blockuser } from "../../../store/store";
import AdminLayout from "../Layout/AdminLayout";
function Users() {
 const users = useLoaderData();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(adminactions.Userlist(users));
  },[])
const BlockUser=(id)=>{
dispatch(blockuser(id))
}
  const userdata = useSelector((state) => state.AdminAuth.Users);
  return (
    <>
      <AdminLayout>
      <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
               <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="mb-4 flex items-center justify-between">
                        <div>
                           
                           <span class="text-base font-normal text-gray-500">This is a list of Users</span>
                        </div>
                        <div class="flex-shrink-0">
                        <form action="#" method="GET" class="">
                          
                              <input type="text" name="email" id="mobile-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search"/>
                        </form>
                        </div>
                     </div>

                     {userdata ? <div class="flex flex-col mt-8">
                        <div class="overflow-x-auto rounded-lg">
                           <div class="align-middle inline-block min-w-full">
                              <div class="shadow overflow-hidden sm:rounded-lg">
                                 <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                       <tr>
                                          <th scope="col" class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Name
                                          </th>
                                          <th scope="col" class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Email
                                          </th>
                                          <th scope="col" class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Bookings
                                          </th>
                                          <th scope="col" class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Actions
                                          </th>
                                       </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                      {userdata.map((user)=>{
                                           return <tr>
                                            <td class="p-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                {user.username}
                                               </td>
                                            
                                               <td class="p-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                                               {user.email}
                                               </td>
                                               <td class="p-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                  $2300
                                               </td>
                                               <td class="p-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                                               {user.isBlocked ?
                  <button className="rounded-md px-2" onClick={()=>BlockUser(user._id)}>UNBLOCK</button>
                  : 
                   <button className="rounded-md px-2" onClick={()=>BlockUser(user._id)}>BLOCK</button>
                  }
                       
                                               </td>
                                            </tr>
                                      })}
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>:<div>No users found</div> }
                     
                  </div>
               </div>
             
            </div>
         </main>
      </div>
      {/* Modal */}
  
    
      </AdminLayout>
    </>
  );
}

export default Users;
