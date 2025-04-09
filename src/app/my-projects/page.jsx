import React from 'react'
import MyProjects from '@/components/dashboard/MyProjects'
import MyAccount from '@/components/dashboard/MyAccount'
import RelatedCategory from '@/components/shop/unused/Relatedcategory'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'

function MyprojectsSection() {
    return (
        <div>
            <Navbar />
            <div className="md:flex bg-white">
                <div className="md:w-1/3">
                    <MyAccount />
                </div>
                <div className="w-full">
                    <MyProjects />
                </div>
            </div>
            <RelatedCategory />
            <Footer />
        </div>
    )
}

export default MyprojectsSection