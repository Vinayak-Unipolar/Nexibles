import React, { useState } from 'react';

const DescriptionSection = ({ description, certifications = [] }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const tabs = [
    { id: 'description', label: 'Product Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'applications', label: 'Applications' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'downloads', label: 'Downloads' },
  ];

  const tabContent = {
    description: {
      type: 'paragraph',
      content: description || `
        Introducing our Premium Eco-Friendly Flexi-Pouches, the ultimate solution for modern packaging needs. 
        Crafted with advanced multi-layer technology, these pouches offer superior protection against moisture, 
        oxygen, and UV light, ensuring your products stay fresh for longer periods. 

        Designed for versatility, they support high-definition printing in up to 10 vibrant colors, allowing your 
        brand to stand out with stunning visuals. Customize your pouches with features like resealable zippers, 
        ergonomic spouts, or easy-tear notches to enhance user convenience. 

        Committed to sustainability, our pouches are available in recyclable and biodegradable materials, helping 
        your brand meet environmental goals without compromising on quality or performance.
      `,
    },
    specifications: {
      type: 'list',
      content: [
        { label: 'Material', value: 'High-grade laminated film with multi-layer barrier technology' },
        { label: 'Dimensions', value: '150mm (W) x 220mm (H) x 50mm (D)' },
        { label: 'Capacity', value: 'Up to 500g (depending on product density)' },
        { label: 'Closure Type', value: 'Resealable zipper (optional spout or tear notch)' },
        { label: 'Printing', value: 'Up to 10-color high-definition gravure printing' },
        { label: 'Thickness', value: '80-120 microns' },
        { label: 'Shelf Life', value: 'Extends product freshness up to 12 months' },
      ],
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
      content: [
        {
          question: 'Are these pouches recyclable?',
          answer: 'Yes, we offer recyclable options. Please check the product specifications or contact our team for details.',
        },
        {
          question: 'Can I customize the shape of the pouch?',
          answer: 'Absolutely! We provide custom shapes, including stand-up pouches, flat-bottom bags, and more.',
        },
        {
          question: 'What is the minimum order quantity?',
          answer: 'The minimum order quantity is 500 units, but this may vary based on customization.',
        },
        {
          question: 'How long does production take?',
          answer: 'Production typically takes 15-20 business days after design approval.',
        },
      ],
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
    switch (tabData.type) {
      case 'paragraph':
        return <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">{tabData.content}</p>;
      case 'list':
        return (
          <ul className="space-y-2 sm:space-y-3">
            {tabData.content.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-[#ffd13e] rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
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
          <div className="space-y-3 sm:space-y-4">
            {tabData.content.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-800 hover:bg-gray-50 focus:outline-none transition-colors duration-200 text-sm sm:text-base"
                >
                  <span>{faq.question}</span>
                  <span className="text-gray-500">
                    {openFaqIndex === index ? (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 transform rotate-180 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div className="px-3 sm:px-4 pb-2 sm:pb-3 text-gray-600 text-sm sm:text-base transition-all duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'message':
        return <p className="text-gray-500 italic text-center text-sm sm:text-base">{tabData.content}</p>;
      default:
        return <p className="text-gray-600 text-sm sm:text-base">{tabData.content}</p>;
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 md:p-8 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto shadow-sm transition-all duration-300">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 mb-4 sm:mb-6 md:mb-8 gap-1 sm:gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-xs sm:text-sm font-semibold rounded-t-lg transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-black bg-white shadow-sm'
                : 'text-gray-500 hover:text-blue-900 hover:bg-gray-100'
            }`}
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
        {renderContent(tabContent[activeTab])}
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