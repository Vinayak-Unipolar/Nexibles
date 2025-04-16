import BlogPage from '@/components/blogs/BlogPage'
import Footer from '@/components/shop/Footer'
import Navbar from '@/components/shop/Navbar'
import React from 'react'

function page() {
    return (
        <div>
            <Navbar />
            <BlogPage />
            <Footer />
        </div>
    )
}

export default page