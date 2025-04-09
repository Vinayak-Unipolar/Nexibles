'use client'
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import CardBanner from "@/components/shop/productcategory/Cardbanner";
import BlankSpace from "@/components/shop/productcategory/BlankSpace";
import Card from "@/components/shop/productcategory/Card";
import { useEffect, useState } from "react";
import PHeadingRoutes from "@/components/shop/productcategory/PHeadingRoutes";
import Loader from "@/components/comman/Loader";
const ProductCategoryPage = ({ params: { category } }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${APIURL}/api/product/get_list/${category}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'API-Key': token,
          },
        });
        const data = await response.json();
        if (data.status === 'success') {
          setProduct(data.data);
        } else {
          console.error('failed to fetch categories', data.error);
        }
      } catch (error) {
        console.log("Error Fetching Data", error);
      }finally{
        setLoading(false);
      }
    };
    fetchdata();
  }, [category]);
  
  if (loading) {
    // Only show loading state if still fetching data
    return <Loader/>
  }
  return (
    <div>
      <Navbar />
      <div className="containers">
        {product.length > 0 && <PHeadingRoutes product={product} />}
      </div>
      {/* <CardBanner category={category} /> */}
      <div className="md:flex">
        {product.length > 0 &&
          <div className="md:w-1/6">
            <BlankSpace />
          </div>
        }
        <div className="w-full">
          <Card product={product} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductCategoryPage;
