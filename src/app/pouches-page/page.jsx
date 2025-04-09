"use client";
import React from 'react';
import Navbar from '@/components/shop/Navbar'
import PouchesHeroSection from '@/components/pouches/PouchesHeroSection';
import PouchesPinkSection from '@/components/pouches/PouchesPinkSection';
import KeyProduct from '@/components/pouches/KeyProduct';
import ViewOtherCategories from '@/components/pouches/ViewOtherCategories';
import Footer from '@/components/shop/Footer';


const PouchesPage = () => {
  return (
    <div>
      <Navbar />
      <PouchesHeroSection />
      <PouchesPinkSection />
      <KeyProduct />
      <ViewOtherCategories />
     <Footer />
    </div>
  );
};

export default PouchesPage;
