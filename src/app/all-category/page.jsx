"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import AllCategoryCards from '@/components/all-category/AllCategoryCards'
import HeadingRoutes from '@/components/all-category/HeadingRoutes'
import CategoryImageBg from '@/components/all-category/CategoryImageBg'
import Loader from '@/components/comman/Loader'
import StatsAndTestimonials from '@/components/StatsAndTestimonials/StatsAndTestimonials'
import PopularProducts from '@/components/shop/popularproducts/Popularproducts'
import BrandLogosSection from '@/components/instagramandlogos/BrandLogosSection'
import ProductFeatures from '@/components/all-category/ProductFeatures'

const Page = () => {


  return (
    <div className="">
      <Navbar />
      <CategoryImageBg />
      <div className="md:flex mt-10">
        {/* <div className="md:w-1/4 bg-white">
          <FavoriteCategory />
        </div> */}
        <div className="md:w-full bg-white">
          <PopularProducts />
        </div>
      </div>
      <ProductFeatures />
      <StatsAndTestimonials />
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 tracking-tight text-center">
            Trusted by 1500+ Brands
          </h2>
          <BrandLogosSection />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Page
