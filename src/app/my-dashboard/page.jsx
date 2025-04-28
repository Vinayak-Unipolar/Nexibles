'use client'
import React from 'react'
import MyDashboard from '@/components/dashboard/MyDashboard'
import MyAccount from '@/components/dashboard/MyAccount'
import RelatedCategory from '@/components/shop/unused/Relatedcategory'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'

const Mydashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-white md:mt-16 md:flex containers ">
                <div className="w-full md:w-1/3">
                    <MyAccount />
                </div>
                <div className="w-full md:w-full">
                    <MyDashboard />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Mydashboard