import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import AddToCart from '@/components/add-to-cart/AddToCart'
// import DesignPreview from '@/components/add-to-cart/DesignPreview'

function page() {
  return (
    <div>   
        {/* <DesignPreview /> */}
        <Navbar />
        <AddToCart />
        <Footer />
    </div>
  )
}

export default page