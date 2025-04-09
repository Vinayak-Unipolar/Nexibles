//PCCarddetais.jsx
'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import CardBanner from '@/components/shop/productcategory/Cardbanner';
import PCCarddetails from '@/components/shop/productcategory/PCCarddetails';
import PCHeadingRoutes from '@/components/shop/productcategory/PCHeadingRoutes';
import Loader from '@/components/comman/Loader';

const Page = ({ params: { id } }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [loading,setLoading]=useState(true);
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${APIURL}/options/${id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'API-Key': token,
          },
        });
        const data = await response.json();
        if (data.status === 'success') {
          setProductDetails(data);
        } else {
          console.error("Error fetching product details");
        }
      } catch (error) {
        console.log("Error fetching product details", error);
      }finally{
        setLoading(false)
      }
    }
    fetchdata();
  }, [id]);


  if (loading) {
    return <Loader/>
  }

  return (
    <div>
      <Navbar />
      <PCHeadingRoutes productDetails={productDetails}/>
      <PCCarddetails productDetails={productDetails} />
      <Footer />
    </div>
  );
}

export default Page;
