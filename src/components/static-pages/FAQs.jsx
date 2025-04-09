"use client"
import React, { useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import faqsData from './faqsData'; // Assuming faqsData is exported from faqsData.js

const FAQs = () => {
    const [openState, setOpenState] = useState(null);

    const handleDropDown = (index) => {
        setOpenState(openState === index ? null : index);
    }

    return (
        <div className="bg-white px-10">
            <h2 className="text-gray-900 font-bold text-2xl py-10">FAQ&apos;s...</h2>
            <div className="w-full h-auto border border-gray-900 rounded-lg px-8 py-4 mb-10">
                {faqsData.map((faq, index) => (
                    <div key={faq.id}>
                        <div className="py-4 flex justify-between items-center cursor-pointer">
                            <p className="text-gray-900 font-semibold text-lg" onClick={() => handleDropDown(index)}>{faq.question}</p>
                            {openState === index ? (
                                <IoIosArrowUp className="text-gray-900" size={28} />
                            ) : (
                                <IoIosArrowDown className="text-gray-900" size={28} />
                            )}
                        </div>
                        {openState === index && (
                            <div>
                                <p className="text-gray-900 mb-2 text-lg">{faq.answer}</p>
                            </div>
                        )}
                        <hr />
                    </div>
                ))}
                <div className="md:flex justify-start items-center md:space-x-4 mt-56">
                    <div>
                        <p className="font-bold text-gray-900">Still can&apos;t find your question</p>
                    </div>
                    <div>
                        <button className="bg-[#30384E] text-white rounded-md w-auto py-3 px-14 uppercase">call us +91 22 12345678</button>
                    </div>
                    <div>
                        <a href="mailto:support@nexibles.com" className="font-bold text-gray-900">/ support@nexibles.com /</a>
                    </div>
                    <div>
                        <FaWhatsapp className="text-gray-900" size={28} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQs;
