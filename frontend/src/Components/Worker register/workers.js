import React from 'react'
import {useNavigate} from "react-router-dom"
function Workers() {
  const navigate=useNavigate()
  return (
    <div>
        <div className='bg-indigo-500 '>
  <h1 className='text-center text-2xl font-bold md: pb-6 text-3xl font-bold'>Work With Us</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis urna leo, eu finibus nisl egestas consequat. Proin a ornare lacus. Pellentesque et commodo augue. Nullam fermentum posuere ante, venenatis imperdiet turpis luctus sed. Vestibulum consequat ac turpis vel sagittis. Suspendisse augue elit, malesuada efficitur ultrices a, facilisis a eros. Proin consectetur rhoncus pretium.</p>
<div className=' flex justify-center mt-4 pb-5'>
<button className='rounded-md px-4 py-2 text-white bg-indigo-600 hover:bg-transparent hover:border-emerald-50 hover:text-white ' onClick={()=>navigate("/join")}>Join Now</button>
</div>
</div>
    </div>
  )
}

export default Workers