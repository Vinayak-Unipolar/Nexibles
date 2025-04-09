import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import ShippingPolicy from '@/components/static-pages/ShippingPolicy'

const page = () => {
  return (
    <div>
        <Navbar />
        <ShippingPolicy />
        <Footer />
    </div>
  )
}

export default page