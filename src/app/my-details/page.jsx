"use client"
import React, { useEffect } from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import MyAccount from '@/components/dashboard/MyAccount'
import MyDetails from '@/components/dashboard/MyDetails'
import { useAuth } from '@/utils/authContext'
import { useRouter } from 'next/navigation'

function page() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  if (!user) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <div className="bg-white md:mt-16 md:flex containers ">
        <div className="w-full md:w-1/3">
          <MyAccount />
        </div>
        <div className="w-full md:w-full">
          <MyDetails />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default page