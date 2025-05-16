"use client";
import React, { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is included in the Nexibles Sample Kit?",
      answer:
        "The Nexibles Sample Kit includes a variety of packaging samples such as pouches, sachets, and eco-friendly materials. It showcases different sizes, finishes, and material types to help you choose the best packaging for your product.",
    },
    {
      question: "How long does it take to receive a quote?",
      answer:
        "Once you submit the form, our team typically reviews your requirements and sends a detailed quote within 1-2 business days. For urgent requests, please mention your timeline in the project description.",
    },
    {
      question: "Can I customize the packaging for my brand?",
      answer:
        "Yes, Nexibles offers fully customizable packaging solutions. You can specify pouch types, sizes, colors, finishes, and branding elements like logos and designs to align with your brand identity.",
    },
    {
      question: "What are the minimum order quantities for packaging?",
      answer:
        "Our minimum order quantities start at 1,000 units, but we offer flexible options for businesses of all sizes. Select your preferred quantity in the form, and we’ll tailor the quote to your needs.",
    },
    {
      question: "Is shipping included in the Sample Kit price?",
      answer:
        "Yes, the Sample Kit price of ₹413 (including GST) covers shipping within India. For international shipping, please contact our team for additional details.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl pb-8 sm:pb-12 bg-[#ece0cc]">
      <h2 className="pb-2 mb-4 text-lg sm:text-xl lg:text-2xl font-semibold text-black border-b-2 border-black">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-black rounded-md bg-transparent"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-3 sm:p-4 text-left text-xs sm:text-sm lg:text-md font-medium text-black flex justify-between items-center focus:outline-none"
            >
              <span>{faq.question}</span>
              <span className="text-base sm:text-lg">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-3 sm:p-4 text-xs sm:text-sm lg:text-base text-gray-600 border-t border-black">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;