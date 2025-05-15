"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import AllCategoryCards from '@/components/all-category/AllCategoryCards'
import HeadingRoutes from '@/components/all-category/HeadingRoutes'
import CategoryImageBg from '@/components/all-category/CategoryImageBg'
import Loader from '@/components/comman/Loader'
import PopularProducts from '@/components/shop/popularproducts/Popularproducts'

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
      <Footer />
    </div>
  )
}

export default Page
