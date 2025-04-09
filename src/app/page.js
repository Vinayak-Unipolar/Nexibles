"use client"
import React, { useEffect, useState } from 'react'
import WhatWeDo from '@/components/home/WhatWeDo'
import Footer from '@/components/shop/Footer'
import GreenPart from '@/components/home/GreenPart'
import AdvantageItem from '@/components/home/AdvantageItem'
import HeaderSection from '@/components/home/HeaderSection'
import Navbar from '@/components/shop/Navbar'
import Trendingproducts from '@/components/shop/trendingproducts/Trendingproducts'
import Productcategory from '@/components/shop/productcategory/Productcategory'
import Popularproducts from '@/components/shop/popularproducts/Popularproducts'
import StatsAndTestimonials from '@/components/StatsAndTestimonials/StatsAndTestimonials'
import ProductSections from '@/components/shop/ProductSections'
import NexiblesInstagramSection from '@/components/home/NexiblesInstagramSection'

const Home = () => {
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
        } else {
          console.error('failed to fetch categories', data.error);
        }
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <HeaderSection />
      <Productcategory categoryData={categoryData} />
      <Popularproducts />
      <ProductSections />
      <Trendingproducts />
      <AdvantageItem />
      <StatsAndTestimonials/>
      <NexiblesInstagramSection/>
      <Footer />
    </div>
  )
}

export default Home