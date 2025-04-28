import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import MyAccount from '@/components/dashboard/MyAccount'
function page() {
  return (
    <div>
        <Navbar />
        <div className="bg-white md:mt-16 md:flex containers ">
            <div className="w-full md:w-1/3">
            <MyAccount />
            </div>
            <div className="w-full md:w-full">
            {/* <PaymentDelivery /> */}
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default page