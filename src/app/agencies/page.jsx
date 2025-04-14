"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";

// Imported images
import heroImage from "../../../public/home/bgimg2.png";
import section2Image from "../../../public/home/bgimg2.png";
import section3Image from "../../../public/home/bgimg2.png";

const Page = () => {
  return (
    <>
      {/* Section 1 - Hero Section */}
      <Navbar />
      <section className="bg-white py-20 px-10 mx-auto mt-4 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Digital, Creative Or Ad Agency?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partner With Nexibles For Smart Packaging Solutions
            </h2>
            <p className="text-lg text-gray-800 mb-4">
              Get Branded Packaging For Your Clients,
              <br />
              <strong>From 500 Pieces To Nationwide Campaigns</strong>
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              {[
                "Client-Centric Custom Packaging For Brand Campaigns",
                "Short-Run Orders Ideal For Pilots & Product Launches",
                "Rapid Turnaround For Last-Minute Requirements",
              ].map((item, index) => (
                <li key={index} className="relative group cursor-pointer w-fit">
                  <span className="transition-colors duration-300 group-hover:text-black">
                    {item}
                  </span>
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-[#00b08d] transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-[#662f90] border border-[#662f90] text-[#662f90] hover:text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Partner With Us
            </motion.button>
          </div>

          <div className="w-full h-64 md:h-80 flex items-center justify-center rounded overflow-hidden bg-white shadow">
            <img
              src={heroImage.src}
              alt="Agency Collaboration"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Section 1B - Value Cards */}
        <div className="max-w-7xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Custom Client Packaging",
              subtitle: "Full Branding Control",
              desc: "Design and deliver packaging that reflects your client’s voice with full customization across formats and sizes.",
            },
            {
              title: "Campaign-Friendly MOQs",
              subtitle: "Start Small, Scale Fast",
              desc: "No need to overstock. Order what you need—just in time for seasonal runs or market tests.",
            },
            {
              title: "White-Label Service",
              subtitle: "Your Brand, Our Expertise",
              desc: "Offer premium packaging under your agency’s banner while we take care of the production backend.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-[#C2C2C2] p-6 rounded shadow-sm hover:shadow-md transition"
            >
              <p className="text-xs font-medium text-gray-600 mb-1">
                {card.subtitle}
              </p>
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                {card.title}
              </h4>
              <p className="text-sm text-gray-700">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-white w-full py-12 px-10 mx-auto md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="w-full h-64 md:h-80 flex items-center justify-center rounded">
            <img
              src={section2Image.src}
              alt="Collaboration Visual"
              className="object-contain w-full h-full"
            />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Make Packaging Part Of Your Creative Offering
            </h2>
            <p className="text-lg text-gray-800 mb-4">
              Add <strong>branded packaging</strong> to your service stack and boost value for your clients.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              {[
                "Work Directly With Our Packaging Engineers",
                "Manage Everything Under Your Own Branding",
                "Fast Prototyping Support For Your Clients",
              ].map((item, index) => (
                <li key={index} className="relative group cursor-pointer w-fit">
                  <span className="transition-colors duration-300 group-hover:text-black">
                    {item}
                  </span>
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-[#00b08d] transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-[#662f90] border border-[#662f90] text-[#662f90] hover:text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
            >
             Partner With Us
            </motion.button>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-gradient-to-r from-[#ECE0CC] to-[#FAFAFA] px-10 py-16 mx-auto md:px-20 w-full">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4 md:px-0">
          <div className="px-4 md:px-10">
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Let’s Start A Project
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Get A Tailored Packaging Quote For Your Clients
            </h2>
            <div className="w-full h-40 md:h-48 flex items-center justify-center rounded">
              <img
                src={section3Image.src}
                alt="Form Visual"
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          <div className="space-y-3 px-4 md:px-10 text-gray-700">
            {`Whether you’re launching a limited edition or refreshing a brand's packaging strategy, our team is here to help.`}
            <br /><br />
            We support agencies with fast prototyping, scalable options, and client-approved quality.
            <br /><br />
            Request a quote and make packaging part of your next campaign.

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-white hover:bg-[#662f90] border border-[#662f90] text-[#662f90] hover:text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Partner With Us
            </motion.button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Page;
