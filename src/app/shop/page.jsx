"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shop/Navbar'
import Banner from '@/components/shop/bannerproducts/Banner';
import Footer from '@/components/shop/Footer';
import Trendingproducts from '@/components/shop/trendingproducts/Trendingproducts';
import Backdrop from '@/components/shop/Backdrop';
import Productcategory from '@/components/shop/productcategory/Productcategory';
import Advantages from '@/components/shop/Advantages';
import PopularProducts from '@/components/shop/popularproducts/Popularproducts';
import AllProducts from '@/components/shop/AllProducts';
import SubscribeBanner from '@/components/shop/SubscribeBanner';

const Shop = () => {
  const [categoryData, setData] = useState([])
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIURL}/api/category_master`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'API-Key': token,
          }
        });
        const data = await response.json();
        if (data.status === 'success') {
          const filterCategory = data.data.filter(category => category.origin?.toLowerCase() === "nexibles");
          setData(filterCategory);
        }
        else {
          console.error('failed to fetch categories', data.error);
        }
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Backdrop />
      <div className=''>
        {/* <Banner categoryData={categoryData} /> */}
         <PopularProducts />
         <AllProducts/>
         <SubscribeBanner/>
        {/* <Trendingproducts /> */}
        {/* <Productcategory categoryData={categoryData} /> */}
        {/* <Advantages /> */}
      </div>
      <Footer />
    </>
  )
}
export default Shop;