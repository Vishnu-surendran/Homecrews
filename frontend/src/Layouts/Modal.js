import React from 'react'

function Modal({children}) {
  return (
    <>
     <div class="main-modal fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster" style={{background: "rgba(0,0,0,.7)"}}>
  <div class="border border-blue-500 shadow-lg modal-container bg-white w-4/12 md:max-w-11/12 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
     <div class="modal-content py-4 text-left px-6">
    
    {children}
     </div>
  </div>
</div>
    
    </>
  )
}

export default Modal