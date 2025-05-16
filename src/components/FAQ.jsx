"use client";
import React, { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I request a quote for custom printed pouches?",
      answer:
        "Fill out the quote form by selecting your pouch type, size, quantity, and finish. Add any specific requirements like zippers, windows, or spouts. Our team will send a tailored quote within 24 to 48 hours.",
    },
    {
      question: "What is the minimum order quantity (MOQ) at Nexibles?",
      answer:
        "Our MOQs are the lowest in the industry—starting at just 500 pieces. You can opt for Nexi Classic sizes for faster production or request custom dimensions using our configuration tool.",
    },
    {
      question: "Can I request a quote for multiple pouch types or SKUs in one go?",
      answer:
        "Yes, you can! Please use the comment section in the form to briefly elaborate on each product or SKU requirement. This helps us create an accurate and consolidated quote for you.",
    },
    {
      question: "What details should I include for a faster quote?",
      answer: `To speed up the process, include:
- Product type and pouch format (e.g., Stand-Up, Spout)
- Size (in mm or choose Nexi Classic)
- Quantity per SKU
- Material preference (matte/glossy/metallic)
- Features needed (zipper, valve, window, etc.)`,
    },
    {
      question: "How long does it take to receive a quotation?",
      answer:
        "You’ll receive a custom quote via email or WhatsApp within 24–48 hours of submitting your complete requirements.",
    },
    {
      question: "How to order a sample kit?",
      answer:
        "Simply check the “Order Sample Kit” box while submitting the form. A nominal courier fee of ₹350 + GST will be charged at checkout. You’ll receive a set of printed pouch samples for evaluation.",
    },
    {
      question: "What happens after I approve the quote?",
      answer:
        "Once you approve the quote and artwork (or request design help), we begin prepress work. Production starts within 24–48 hours post payment, and dispatch follows in 7–10 business days.",
    },
    {
      question: "Do you ship across India and internationally?",
      answer:
        "Yes, we ship pan-India including Tier 2 and Tier 3 cities. International shipping is also available. Shipping charges are extra and calculated separately based on your delivery location.",
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
              <div className="p-3 sm:p-4 text-xs sm:text-sm lg:text-base text-gray-600 border-t border-black whitespace-pre-line">
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
