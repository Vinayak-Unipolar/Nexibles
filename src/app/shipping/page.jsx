"use client"
import React, { useState,Suspense } from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import Shipping from '@/components/shipping/Shipping'
import { useEffect } from 'react'
import { useAuth } from '@/utils/authContext'

function ShippingPage() {
    const [defaultAddress, setDefaultAddress] = useState();
    const { user } = useAuth();
    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user) return;
                let id = user?.result?.customerId || user?.customerId;
                const response = await fetch(`${APIURL}/api/customerAddress/default/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setDefaultAddress(data);
            } catch (error) {
                console.error("Error fetching Data", error);
            }
        }
        fetchData();
    }, [user]);

    return (
        <div>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <div className='containers'>
                    <Shipping defaultAddress={defaultAddress} />
                </div>
            </Suspense>
            <Footer />
        </div>
    )
}

export default ShippingPage