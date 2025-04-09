import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import HelpBanner from '@/components/help/HelpBanner'
import Help from '@/components/help/Help'

const page = () => {
  return (
    <div>       
        <Navbar />
        <HelpBanner />
        <Help />
        <Footer />
    </div>
  )
}

export default page