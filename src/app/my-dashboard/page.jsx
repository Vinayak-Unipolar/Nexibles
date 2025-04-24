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
            <div className="md:flex bg-white containers">
                {/* <div className="md:w-1/3 w-full">
                    <MyAccount />
                </div> */}
                <div className="md:w-full w-full">
                    <MyDashboard />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Mydashboard