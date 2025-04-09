import React, { useState, useEffect } from 'react';
import speci from '../../../../public/home/speci.png';
import Loader from '@/components/comman/Loader';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const faqVariants = {
  collapsed: { 
    opacity: 0, 
    height: 0,
    transition: { duration: 0.3 }
  },
  expanded: { 
    opacity: 1, 
    height: "auto",
    transition: { duration: 0.3 }
  }
};

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
      fetchFaqs();
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
          <motion.div 
            className="px-6 md:py-2"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-4">
              <motion.h2 
                className="text-gray-900 font-bold text-2xl mb-2"
                variants={itemVariants}
              >
                Description
              </motion.h2>
              <motion.div 
                className="flex flex-col md:flex-row"
                variants={itemVariants}
              >
                <div className="md:w-[60%] pr-6">
                  <motion.p
                    className="text-gray-700 text-lg leading-8"
                    dangerouslySetInnerHTML={{ __html: productDetails.product.long_desc }}
                    variants={itemVariants}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}

      {/* FAQs Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
          <Loader />
        ) : faqs.length > 0 ? (
          <div>
            <motion.h2 
              className="text-gray-900 font-bold text-2xl mb-4"
              variants={itemVariants}
            >
              FAQs
            </motion.h2>
            {faqs.map((faq, index) => (
              <motion.div 
                key={faq.id} 
                className="border-b border-gray-300 py-4"
                variants={itemVariants}
              >
                <motion.div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFaq(index)}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-lg text-gray-700 font-semibold">
                    Q. {faq.question}
                  </p>
                  <motion.span 
                    className="text-2xl text-gray-500"
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedFaq === index ? '-' : '+'}
                  </motion.span>
                </motion.div>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.p
                      className="text-lg text-gray-600 mt-2"
                      variants={faqVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                    >
                      A. {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </motion.div>
    </>
  );
}