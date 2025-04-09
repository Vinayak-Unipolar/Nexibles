import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import FAQs from '@/components/static-pages/FAQs'

const page = () => {
    return (
        <div className="bg-white">
            <div className="border-b">
                <Navbar />
            </div>
            <div className="md:ml-52">
                <FAQs />
            </div>
            <Footer />
        </div>
    )
}

export default page