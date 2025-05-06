'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MyDashboard from '@/components/dashboard/MyDashboard'
import MyAccount from '@/components/dashboard/MyAccount'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import { useAuth } from '@/utils/authContext'

const DashboardPage = () => {
    const { user } = useAuth()
    const router = useRouter()
    if (!user) {
        return (
            <div className="flex flex-col">
                <Navbar />
                <div className="h-screen  flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-10  text-center max-w-lg w-full">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                            Please Login to View Your Dashboard
                        </h2>
                        <p className="text-gray-500 mb-8 text-lg">
                            Login to access your profile and saved addresses
                        </p>
                        <button
                            onClick={() => router.push('/login')}
                            className="bg-[#103b60] text-white px-8 py-3 rounded-full text-lg font-medium  transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Login
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 md:flex gap-8">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <MyAccount />
                    </div>
                    <div className="w-full md:w-2/3">
                        <MyDashboard />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DashboardPage