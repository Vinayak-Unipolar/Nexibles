import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import TermsCondition from '@/components/static-pages/TermsCondition'

const page = () => {
  return (
    <div>
        <Navbar />
        <TermsCondition />
        <Footer />
    </div>
  )
}

export default page