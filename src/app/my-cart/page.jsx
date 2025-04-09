// Page component
'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import RelatedCategory from '@/components/shop/unused/Relatedcategory';
import { updateCartItems } from '../../redux/store/cartSlice';

const MyCart = dynamic(() => import('@/components/add-to-cart/My-Cart'), { ssr: false });

function Page() {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (isClient) {
        try {
          const productIds = cartItems.map(item => item.id);

          if (productIds.length === 0) {
            setRelatedProducts([]);
            return;
          }

          const response = await fetch(`${APIURL}/api/related-products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productIds }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setRelatedProducts(data);
        } catch (error) {
          console.error('Error fetching related products:', error);
          setRelatedProducts([]);
        }
      }
    };

    if (isClient) {
      fetchRelatedProducts();
    }
  }, [isClient, cartItems]);

  if (!isClient) {
    return null; 
  }

  return (
    <>
      <Navbar />
      <div className='containers'>
        <MyCart />
        <RelatedCategory
          relatedProducts={relatedProducts}
          currentProductIds={cartItems.map(item => item.id)}
        />
      </div>
      <Footer />
    </>
  );
}

export default Page;