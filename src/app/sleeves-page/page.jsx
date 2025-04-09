"use client";
// import HomeNavbar from '@/components/home/HomeNavbar'
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import SleevesHero from '@/components/Sleeves/SleevesHero';
import SleeveKeyProduct from '@/components/Sleeves/SleevesKeyProduct';
import SleevesPinkSection from '@/components/Sleeves/SleevesPinkSection';
import SleevesViewOtherCategories from '@/components/Sleeves/SleevesViewOtherCategories';
import React from 'react'

 const page = () => {
  return (
    <div>
      {/* <HomeNavbar /> */}
      <Navbar />
      <SleevesHero />
      <SleevesPinkSection />
      <SleeveKeyProduct />
      <SleevesViewOtherCategories />
      <Footer />
    </div>
  )
};
export default page;
