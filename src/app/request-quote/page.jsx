import FAQ from '@/components/FAQ'
import RequestFormPage from '@/components/RequestFormpage'
import Footer from '@/components/shop/Footer'
import Navbar from '@/components/shop/Navbar'
import React from 'react'

function page() {
  return (
    <div>
      <Navbar />
      <div className='mt-16 bg-[#ece0cc]'>
        <RequestFormPage />
        <FAQ/>
      </div>
      <Footer />
    </div>
  )
}

export default page