import React from 'react'
import StripeCheckout from "react-stripe-checkout"
function Sample() {
  return (
    <div>
        <StripeCheckout
        stripeKey='pk_test_51MhGhZSF4gjAcxP8xIlincPestBeQnSPewnNVSjX74L39C4aKkJBVHdbtghzGJzlmanKpMvdINw4DtSHwX8j5Y3E00Eqs5mkG5'
        
        />
    </div>
  )
}

export default Sample