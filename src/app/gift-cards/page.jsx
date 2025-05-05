"use client"
import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import MyAccount from '@/components/dashboard/MyAccount'

function page() {
  return (
    <div>
      <Navbar />
      <div className="bg-white md:mt-16 md:flex containers">
        <div className="w-full md:w-1/3">
          <MyAccount />
        </div>
        <div className="flex items-center justify-center w-full p-6">
          <div className="text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-800">Coming Soon</h2>
            <p className="mb-6 text-gray-600">{`We're working hard to bring you new features. Please check back later!`}</p>
            <div className="inline-block px-6 py-3 font-medium text-white transition-colors bg-[#103b60] rounded-lg shadow-md">
              Stay Tuned
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default page