"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import MyAccount from '@/components/dashboard/MyAccount'
import { PaymentDelivery } from '@/components/dashboard/PaymentDelivery'
import RelatedCategory from '@/components/shop/unused/Relatedcategory'
import { useEffect } from 'react'
import { useAuth } from '@/utils/authContext'

const Page = () => {
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
    const [savedAddresses, setSavedAddresses] = useState([]);
    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user) return;
                let customerId = user?.result?.customerId || user?.customerId;
                const response = await fetch(`${APIURL}/api/customerAddress/getData`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ customerId :customerId })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setSavedAddresses(data);
            } catch (error) {
                console.error("Error fetching Data",error);
            }
        }
        fetchData();
    }, [user]);

    return (
        <div>
            <Navbar />
            <div className="bg-white md:flex ">
                <div className="w-full mt-12 containers md:w-1/3 md:mt-16">
                    <MyAccount />
                </div>
                <div className="w-full md:w-full">
                <PaymentDelivery savedAddresses={savedAddresses} />
                </div>
            </div>
            <RelatedCategory />
            <Footer />
        </div>
    )
}
export default Page