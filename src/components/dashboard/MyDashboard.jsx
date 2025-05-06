'use client'
import React from 'react'
import { useAuth } from '@/utils/authContext'

const MyDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
        <div className="min-h-screen px-10 py-10 bg-white">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">My Dashboard</h2>
            <p className="text-2xl font-semibold text-gray-900">Hello, {user?.result?.firstName || user?.firstName} !</p>
            <p className="text-gray-900">Your Account Activity</p>
        </div>
    </div>
  )
}

export default MyDashboard