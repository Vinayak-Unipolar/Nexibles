"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
// Removed: import AllCategoryCards from '@/components/all-category/AllCategoryCards'
import HeadingRoutes from '@/components/all-category/HeadingRoutes'
import CategoryImageBg from '@/components/configuration-tool/configimage'
import Loader from '@/components/comman/Loader'
import Configuration from '@/components/configuration-tool/configuration.jsx'; 
const Page = () => {
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${APIURL}/api/category_master`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'API-Key': token,
          }
        })
        const data = await response.json()
        if (data.status === 'success') {
          const filterCategory = data.data.filter(category => category.origin?.toLowerCase() === "nexibles")
          setCategoryData(filterCategory)
        } else {
          console.error('failed to fetch categories', data.error)
        }
      } catch (error) {
        console.log("Error Fetching Data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="">
      <Navbar />
      {/* <CategoryImageBg /> */}
      <div className="md:flex mt-12">
        <div className="md:w-full bg-white">
          <Configuration categoryData={categoryData} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page
