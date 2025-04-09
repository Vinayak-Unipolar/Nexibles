"use client"
import HomeNavbar from '@/components/home/HomeNavbar'
import Navbar from '@/components/shop/Navbar'
import KeyProduct from '@/components/pouches/KeyProduct'
import RollStockHeroSection from '@/components/roll-stock/RollStockHeroSection'
import RollStockPinkSection from '@/components/roll-stock/RollStockPinkSection'
import RollStockViewOtherCategories from '@/components/roll-stock/RollStockViewOtherCategories'
import ViewOtherCategories from '@/components/roll-stock/RollStockViewOtherCategories'
import Footer from '@/components/shop/Footer'
import React from 'react'


const rollstockpage = () => {
  return (
    <div>
      {/* <HomeNavbar /> */}
      <Navbar />
      <RollStockHeroSection />
      <RollStockPinkSection />
      <KeyProduct />
      <RollStockViewOtherCategories />
      <Footer />
    </div>
  )
}

export default rollstockpage;

