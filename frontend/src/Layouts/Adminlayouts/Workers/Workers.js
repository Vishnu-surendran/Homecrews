import React,{useEffect} from "react";
import Admindashboard from "../Dashboard/Admindashboard";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminactions } from "../../../store/store";
import { blockWorker } from "../../../store/store";
import AdminLayout from "../Layout/AdminLayout";
function Workers() {
  const dispatch = useDispatch();
  const workerdata = useLoaderData();

  useEffect(() => {
    dispatch(adminactions.workerlist(workerdata));
  }, [])
  const Blockworker=(id)=>{
dispatch(blockWorker(id))
  }
  const workers = useSelector((state) => state.AdminAuth.workers);
  let Approved
if(workers){
  Approved=workers.filter(worker=>worker.isApproved)
   }

  return (
    <>
    <AdminLayout>
    {Approved && (
      <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
               <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
           
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="mb-4 flex items-center justify-between">
                        <div>

                           <span class="text-base font-normal text-gray-500">Workers</span>
                        </div>
                        <div class="flex-shrink-0">
                           <a href="#" class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">View all</a>
                        </div>
                     </div>

                     {Approved ? <div class="flex flex-col mt-8">
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
                                            Service
                                          </th>
                                          <th scope="col" class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Actions
                                          </th>
                                       </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                      {Approved.map((worker)=>{
                                           return <tr>
                                            <td class="p-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                {worker.username}
                                               </td>
                                            
                                               <td class="p-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                                               {worker.email}
                                               </td>
                                               <td class="p-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                 {worker.service}
                                               </td>
                                               <td class="p-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                                               {worker.isBlocked ?
                  <button className="rounded-md px-2" onClick={()=>Blockworker(worker._id)}>UNBLOCK</button>
                  : 
                   <button className="rounded-md px-2" onClick={()=>Blockworker(worker._id)}>BLOCK</button>
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
    )}
    
    

      </AdminLayout>
    </>
  );
}

export default Workers;
