import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '@/components/comman/Loader';

// Animation variants for FAQs
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

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const DescriptionSection = ({ long_desc, description = '', productDetails = {}, certifications = [] }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = 'https://webapi.nexibles.com/api/faq';
  const productId = productDetails?.product?.id;

  const tabs = [
    { id: 'description', label: 'Product Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'applications', label: 'Applications' },
    { id: 'faqs', label: 'FAQs' },
    // { id: 'downloads', label: 'Downloads' },
  ];

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFaqs = async () => {
      if (!productId) {
        setIsLoading(false);
        setError('No product ID provided');
        return;
      }

      try {
        const response = await fetch(APIURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'API-Key': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }

        const data = await response.json();

        if (data.status === 'success') {
          const filteredFaqs = data.data.filter(faq => faq.productid === productId);
          setFaqs(filteredFaqs);
        } else {
          setError('API returned an error');
        }
      } catch (error) {
        setError(error.message || 'Error fetching FAQs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, [token, productId]);

  const tabContent = {
    description: {
      type: 'html', // Changed to 'html' to render raw HTML
      content: long_desc && long_desc.trim() ? long_desc : 'No description available',
    },
    specifications: {
      type: 'html', // Changed to 'html' to render raw HTML
      content: description && description.trim() ? description : 'No specifications available',
    },
    applications: {
      type: 'list',
      content: [
        'Ideal for packaging dry goods like snacks, grains, and spices',
        'Suitable for pet food, coffee, tea, and confectionery products',
        'Perfect for personal care items like bath salts or powdered cosmetics',
        'Can be used for eco-friendly packaging of sustainable products',
        'Great for promotional or limited-edition product launches',
      ],
    },
    faqs: {
      type: 'faq',
      content: faqs,
    },
    downloads: {
      type: 'message',
      content: 'No Data to Download',
    },
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const renderContent = (tabData) => {
    if (!tabData) {
      return <p className="text-gray-600 text-sm sm:text-base">Content not available</p>;
    }

    switch (tabData.type) {
      case 'html':
        return (
          <div
            className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: tabData.content }}
          />
        );
      case 'list':
        return (
          <ul className="space-y-2 sm:space-y-3">
            {tabData.content.map((item, index) => (
              <li key={index} className="flex items-start">
                {/* Removed the yellow dot span */}
                <span className="text-gray-600 text-sm sm:text-base">
                  {typeof item === 'string' ? item : (
                    <span>
                      <span className="font-medium text-gray-800">{item.label}:</span> {item.value}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        );
      case 'faq':
        return (
          <motion.div
            className="space-y-3 sm:space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {isLoading ? (
              <Loader />
            ) : error ? (
              <p className="text-red-500 text-sm sm:text-base">{error}</p>
            ) : faqs.length > 0 ? (
              tabData.content.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg shadow-sm"
                  variants={itemVariants}
                >
                  <motion.div
                    className="flex justify-between items-center cursor-pointer px-3 sm:px-4 py-2 sm:py-3"
                    onClick={() => toggleFaq(index)}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm sm:text-base text-gray-700 font-semibold">
                      Q. {faq.question}
                    </p>
                    <motion.span
                      className="text-xl sm:text-2xl text-gray-500"
                      animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openFaqIndex === index ? '−' : '+'}
                    </motion.span>
                  </motion.div>
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.p
                        className="px-3 sm:px-4 pb-2 sm:pb-3 text-gray-600 text-sm sm:text-base"
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
              ))
            ) : (
              <p className="text-gray-600 text-sm sm:text-base">No FAQs available for this product</p>
            )}
          </motion.div>
        );
      case 'message':
        return <p className="text-gray-500 italic text-center text-sm sm:text-base">{tabData.content}</p>;
      default:
        return <p className="text-gray-600 text-sm sm:text-base">{tabData.content}</p>;
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 md:p-8 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-7xl shadow-sm transition-all duration-300">
      {/* Tab Navigation */}
      <div
        className="flex flex-wrap border-b border-gray-200 mb-4 sm:mb-6 md:mb-8 gap-1 sm:gap-2"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-xs sm:text-sm font-semibold rounded-t-lg transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-black bg-white shadow-sm'
                : 'text-gray-500 hover:text-blue-900 hover:bg-gray-100'
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-[#ffd13e] rounded-t-lg"></span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 transition-opacity duration-300">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className={activeTab === tab.id ? 'block' : 'hidden'}
          >
            {renderContent(tabContent[tab.id])}
          </div>
        ))}
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 sm:space-x-2 bg-white rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <span className="text-yellow-400 text-base sm:text-lg">★</span>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionSection;