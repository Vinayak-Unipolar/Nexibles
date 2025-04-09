import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import MyAccount from '@/components/dashboard/MyAccount'
import MyUploads from '@/components/dashboard/MyUploads'
import RelatedCategory from '@/components/shop/unused/Relatedcategory'

const page = () => {
    return (
        <div>
            <Navbar />
            <div className="md:flex bg-white">
                <div className="md:w-1/3 w-full">
                    <MyAccount />
                </div>
                <div className="w-full">
                    <MyUploads />
                </div>
            </div>
            <RelatedCategory />
            <Footer />
        </div>
    )
}

export default page