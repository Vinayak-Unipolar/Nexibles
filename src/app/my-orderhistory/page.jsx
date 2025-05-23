"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import RelatedCategory from '@/components/shop/unused/Relatedcategory'
import MyOrderHistory from '@/components/dashboard/MyOrdderHistory'
import MyAccount from '@/components/dashboard/MyAccount'
import { useAuth } from '@/utils/authContext'

const Page = () => {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [user, router]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        if (!user) return; // Early return inside the effect

        const productIds = cartItems.map(item => item.id) || [];

        const response = await fetch(`${APIURL}/api/related-products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productIds })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const filterCategory = data?.data?.filter(category =>
          category.origin?.toLowerCase() === "nexibles") || [];
        setRelatedProducts(filterCategory);
      } catch (error) {
        console.error('Error fetching related products:', error);
        setRelatedProducts([]);
      }
    };

    fetchRelatedProducts();
  }, [cartItems, user, APIURL]); 
  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className='mt-12 containers md:mt-16'>
        <div className="md:flex">
          <div className="w-full bg-white md:w-1/3">
            <MyAccount />
          </div>
          <div className="w-full md:w-full">
            <MyOrderHistory />
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <RelatedCategory relatedProducts={relatedProducts} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Page