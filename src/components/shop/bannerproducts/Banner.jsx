import React, { useEffect, useState } from 'react';
import Link from "next/link";

export default function Banner() {
  const [productData, setProductData] = useState([]);
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  // Fetching data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIURL}/api/category_master/cat/3`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'API-Key': token,
          },
        });
        const result = await response.json();

        if (result.status === "success") {
          setProductData(result.data);  
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {productData.map((product) => (
            <Link href={`/category/${product.cat_url}`} key={product.id}>
              <div className="relative border-2 rounded-lg p-3 md:p-4 flex flex-row items-center h-40 md:h-64 overflow-hidden group transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col max-w-1/2 z-10">
                  <h3 className="text-gray-900 font-bold text-lg md:text-2xl mb-2 md:mb-4 line-clamp-2">{product.name}</h3>
                  <button className="bg-[#30384E] rounded-md text-xs md:text-sm text-white py-2 px-3 md:px-6 uppercase w-fit hover:bg-[#414b69] transition-colors">
                    Order now
                  </button>
                </div>
                
                <div className="ml-auto">
                  <img
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/${product.bg_Img}`}
                    alt={product.name}
                    className="h-32 w-32 md:h-52 md:w-52 object-contain"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}