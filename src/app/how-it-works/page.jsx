import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import Howitworks from '@/components/static-pages/Howitworks'

const page = () => {
    return (
        <div className="bg-white">
            <div className="border-b">
                <Navbar />
            </div>
            <div className="md:ml-52">
                <Howitworks />
            </div>
            <Footer />
        </div>
    )
}

export default page