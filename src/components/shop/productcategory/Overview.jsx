import React, { useState, useEffect } from 'react';
import speci from '../../../../public/home/speci.png';
import Loader from '@/components/comman/Loader';

export default function Overview({ productDetails, productImages }) {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const productId = productDetails.product?.id;

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${APIURL}/api/faq`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'API-Key': token, 
          },
        });
        const data = await response.json();

        if (data.status === 'success') {
          // Filter FAQs based on the product id
          const filteredFaqs = data.data.filter(faq => faq.productid === productId);
          setFaqs(filteredFaqs);
        } else {
          setError('Failed to fetch FAQs');
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchFaqs(); // Fetch FAQs when productId is available
    }
  }, [token, productId]);

  if (!productDetails) {
    return null;
  }

  return (
    <>
      {productDetails?.product?.long_desc && (
        <>
          <hr className="border-gray-300 my-8" />
          <div className="px-6 md:py-2">
            {/* Overview Section */}
            <div className="mb-4">
              <h2 className="text-gray-900 font-bold text-2xl mb-2">Description</h2>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-[60%] pr-6">
                  <p
                    className="text-gray-700 text-lg leading-8"
                    dangerouslySetInnerHTML={{ __html: productDetails.product.long_desc }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Specification Section */}
      {/* <div className="mb-12">
        <h2 className="text-gray-900 font-bold text-2xl mb-6">Specification</h2>
        <p className="text-lg text-gray-700 mb-6">{`To prevent white edges, make sure your design extends to the full bleed size.`}</p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-semibold text-lg">{`Full Bleed Size`}</p>
              <p className="text-lg">{`5.5" x 14.5"`}</p>
              <p className="text-lg">{`139.7 x 368.3 mm`}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">{`Document Trim Size`}</p>
              <p className="text-lg">{`5" x 14"`}</p>
              <p className="text-lg">{`127 x 355.6 mm`}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">{`Safety Area`}</p>
              <p className="text-lg">{`4.5" x 13.5"`}</p>
              <p className="text-lg">{`114.3 x 342.9 mm`}</p>
            </div>
          </div>
          <div className="w-1/2">
            <img src={speci.src} alt="Specification Diagram" className="w-[50vw] h-[55vh]" />
          </div>
        </div>
      </div> */}

      {/* FAQs Section */}
      <div>
        {isLoading ? (
          <Loader />
        ) : faqs.length > 0 ? (
          <div>
            <h2 className="text-gray-900 font-bold text-2xl mb-4">FAQs</h2>
            {faqs.map((faq, index) => (
              <div key={faq.id} className="border-b border-gray-300 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <p className="text-lg text-gray-700 font-semibold">Q. {faq.question}</p>
                  <span className="text-2xl text-gray-500">
                    {expandedFaq === index ? '-' : '+'}
                  </span>
                </div>
                {expandedFaq === index && (
                  <p className="text-lg text-gray-600 mt-2 ">A. {faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
