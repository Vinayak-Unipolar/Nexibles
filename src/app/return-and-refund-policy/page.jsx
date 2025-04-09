import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import ReturnPolicy from '@/components/static-pages/ReturnPolicy'

const page = () => {
  return (
    <div>
        <Navbar />
        <ReturnPolicy />
        <Footer />
    </div>
  )
}

export default page