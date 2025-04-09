"use client";
import Navbar from '@/components/shop/Navbar';
import LabelsHero from '@/components/labels/LabelsHero';
import LabelsPinkSection from '@/components/labels/LabelsPinkSection';
import LabelsViewOtherCategories from '@/components/labels/LabelsViewOtherCategories';
import KeyProduct from '@/components/pouches/KeyProduct';

import Footer from '@/components/shop/Footer';

import React from 'react'

 const page = () => {
  return (
    <div>
      <Navbar />      
      <LabelsHero/>
      <LabelsPinkSection/>
      <KeyProduct/>
      <LabelsViewOtherCategories/>
      <Footer />
    </div>
  )
};
export default page;
