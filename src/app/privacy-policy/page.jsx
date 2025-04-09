import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import PrivacyPolicy from '@/components/static-pages/PrivacyPolicy'

const page = () => {
  return (
    <div>
        <Navbar />
        <PrivacyPolicy />
        <Footer />
    </div>
  )
}

export default page