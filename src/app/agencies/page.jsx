"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";


const Page = () => {
  return (
    <>
      {/* Section 1 - Hero Section */}
      <Navbar />
      <section className="px-10 py-20 mx-auto mt-4 bg-white md:px-20">
        <div className="grid items-center gap-10 mx-auto max-w-7xl md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Digital, Creative Or Ad Agency?
            </p>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Partner With Nexibles For Smart Packaging Solutions
            </h2>
            <p className="mb-4 text-lg text-gray-800">
              Get Branded Packaging For Your Clients,
              <br />
              <strong>From 500 Pieces To Nationwide Campaigns</strong>
            </p>

            <ul className="mb-6 space-y-2 text-gray-700 list-disc list-inside">
              {[
                "Client-Centric Custom Packaging For Brand Campaigns",
                "Short-Run Orders Ideal For Pilots & Product Launches",
                "Rapid Turnaround For Last-Minute Requirements",
              ].map((item, index) => (
                <li key={index} className="relative cursor-pointer group w-fit">
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

          <div className="flex items-center justify-center w-full h-64 overflow-hidden bg-white rounded shadow md:h-80">
            <img
              src={heroImage.src}
              alt="Agency Collaboration"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Section 1B - Value Cards */}
        <div className="grid gap-6 mx-auto mt-10 max-w-7xl md:grid-cols-3">
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
              <p className="mb-1 text-xs font-medium text-gray-600">
                {card.subtitle}
              </p>
              <h4 className="mb-2 text-lg font-bold text-gray-900">
                {card.title}
              </h4>
              <p className="text-sm text-gray-700">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 */}
      <section className="w-full px-10 py-12 mx-auto bg-white md:px-20">
        <div className="grid items-center gap-10 mx-auto max-w-7xl md:grid-cols-2">
          <div className="flex items-center justify-center w-full h-64 rounded md:h-80">
            <img
              src={section2Image.src}
              alt="Collaboration Visual"
              className="object-contain w-full h-full"
            />
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Make Packaging Part Of Your Creative Offering
            </h2>
            <p className="mb-4 text-lg text-gray-800">
              Add <strong>branded packaging</strong> to your service stack and boost value for your clients.
            </p>
            <ul className="mb-6 space-y-2 text-gray-700 list-disc list-inside">
              {[
                "Work Directly With Our Packaging Engineers",
                "Manage Everything Under Your Own Branding",
                "Fast Prototyping Support For Your Clients",
              ].map((item, index) => (
                <li key={index} className="relative cursor-pointer group w-fit">
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
        <div className="grid items-center gap-10 px-4 mx-auto max-w-7xl md:grid-cols-2 md:px-0">
          <div className="px-4 md:px-10">
            <p className="mb-1 text-sm font-semibold text-gray-700">
              Let’s Start A Project
            </p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
              Get A Tailored Packaging Quote For Your Clients
            </h2>
            <div className="flex items-center justify-center w-full h-40 rounded md:h-48">
              <img
                src={section3Image.src}
                alt="Form Visual"
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          <div className="px-4 space-y-3 text-gray-700 md:px-10">
            Whether you are launching a limited edition or refreshing a brands packaging strategy, our team is here to help.
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
