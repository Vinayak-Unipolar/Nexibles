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
    <div className="py-4 bg-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {productData.map((product) => (
            <Link href={`/category/${product.cat_url}`} key={product.id}>
              <div className="relative flex flex-row items-center h-40 p-3 overflow-hidden transition-all duration-300 border-2 rounded-lg md:p-4 md:h-64 group hover:shadow-lg">
                <div className="z-10 flex flex-col max-w-1/2">
                  <h3 className="mb-2 text-lg font-bold text-gray-900 md:text-2xl md:mb-4 line-clamp-2">{product.name}</h3>
                  <button className="bg-[#30384E] rounded-md text-xs md:text-sm text-white py-2 px-3 md:px-6 uppercase w-fit hover:bg-[#414b69] transition-colors">
                    Order now
                  </button>
                </div>

                <div className="ml-auto">
                  <img
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/product/${product.bg_Img}`}
                    alt={product.name}
                    className="object-contain w-32 h-32 md:h-52 md:w-52"
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