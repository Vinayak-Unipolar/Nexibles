import RequestForm from '@/components/RequestForm'
import Footer from '@/components/shop/Footer'
import Navbar from '@/components/shop/Navbar'
import React from 'react'

function page() {
  return (
    <div>
      <Navbar />
      <div className='mt-20'>
        <RequestForm />
      </div>
      <Footer />
    </div>
  )
}

export default page