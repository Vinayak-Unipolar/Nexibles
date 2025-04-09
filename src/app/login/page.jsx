'use client'
import React from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import Login from '@/components/login/Login'

function Page() {
    return (
        <div>
            <Navbar />
            <div className='containers'>
            <Login />
            </div>
            <Footer />
        </div>
    )
}

export default Page



