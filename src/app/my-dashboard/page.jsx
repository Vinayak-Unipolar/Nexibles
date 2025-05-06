'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MyDashboard from '@/components/dashboard/MyDashboard'
import MyAccount from '@/components/dashboard/MyAccount'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import { useAuth } from '@/utils/authContext'

const Mydashboard = () => {
    const { user } = useAuth();
    const router = useRouter();

    // useEffect(() => {
    //     if (!user) {
    //         router.push('/login');
    //     }
    // }, [user, router]);
    // if (!user) {
    //     return null;
    // }

    return (
        <div>
            <Navbar />
            <div className="mt-12 bg-white md:mt-16 md:flex containers ">
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