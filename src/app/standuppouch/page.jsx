'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa6';

const StandUpPouches = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <main className="bg-white text-black">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-14 items-center">
            {/* Left: Content */}
            <motion.div
              className="flex flex-col justify-center"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-black"
                variants={fadeInUp}
              >
                Stand Up Pouches
              </motion.h1>
              <motion.p
                className="text-2xl mb-6 font-semibold text-black"
                variants={fadeInUp}
              >
                Custom Printed, Food-Grade, Retail-Ready Packaging
              </motion.p>
              <motion.p
                className="text-lg max-w-xl text-black"
                variants={fadeInUp}
              >
                Premium pouches for brands seeking high-performance, customizable packaging. Perfect for snacks, powders, and more.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  className="mt-8 inline-block bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
                  href="/request-quote"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>
            {/* Right: Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                alt="Stand up pouch packaging display"
                className=""
                height={400}
                src="https://cdn.nexibles.com/product/130x210+80%20SUP.webp"
                width={600}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features & Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                alt="Stand up pouch packaging display"
                className="md:ml-20"
                height={300}
                src="https://cdn.nexibles.com/product/160x240+90%20SUP.webp"
                width={500}
              />
            </motion.div>
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              variants={staggerChildren}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl font-bold text-black"
                variants={fadeInUp}
              >
                <>
                  <div>Stand Up Pouch</div>
                  <span>Features</span>
                </>
              </motion.h2>
              <motion.ul
                className="space-y-4 text-lg text-black"
                variants={staggerChildren}
              >
                {[
                  'Self-standing bottom gusset for optimal shelf display',
                  'High-barrier materials to protect against moisture, oxygen & UV',
                  'Zipper closure for resealability and extended freshness',
                  'Heat-sealable design for tamper evidence',
                  'Custom printing for full-color branding',
                  'Windows, spouts, tear notches, and euro slots',
                ].map((feature, index) => (
                  <motion.li
                    className="flex items-center space-x-2 group"
                    key={index}
                    variants={fadeInUp}
                  >
                    <span className="flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full group-hover:bg-yellow-500 transition">
                      <FaCheck className="w-4 h-4 text-white" />
                    </span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.p
                className="text-lg text-black"
                variants={fadeInUp}
              >
                Suitable for dry and liquid products, with eco-friendly and recyclable options.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Applications & Product Uses */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-black relative"
            initial={{ opacity: 0, rotateX: -10 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Applications & Product Uses
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-0 bg-yellow-400 transition-all duration-500 group-hover:w-1/2" />
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            <motion.ul
              className="md:col-span-3 space-y-6"
              initial="hidden"
              whileInView="visible"
              variants={staggerChildren}
              viewport={{ once: true }}
            >
              {[
                { title: 'Food Packaging', items: 'Coffee, tea, dry fruits, spices, snacks' },
                { title: 'Health & Wellness', items: 'Protein powders, vitamins, superfoods' },
                { title: 'Cosmetics & Personal Care', items: 'Bath salts, creams, powders' },
                { title: 'Pet Products', items: 'Dry food, treats, supplements' },
                { title: 'Industrial Goods', items: 'Fertilizers, seeds, and powders' },
              ].map((app, index) => (
                <motion.li
                  className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  key={index}
                  style={{ marginLeft: index % 2 === 0 ? '0' : '2rem' }}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                >
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                  <strong className="text-xl text-black font-semibold">{app.title}:</strong>
                  <p className="text-black mt-1">{app.items}</p>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="md:col-span-2 relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <Image
                  alt="Custom stand up pouches"
                  className="w-full h-[620px] rounded-xl shadow-2xl"
                  height={300}
                  src="https://cdn.nexibles.com/industries/Chips.webp"
                  width={400}
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-yellow-400 opacity-20 rounded-xl -z-10"
                initial={{ scale: 0.8, rotate: 5 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ rotate: -3 }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          </div>
          <motion.p
            className="text-lg text-black mt-12 text-center relative px-4 py-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="absolute inset-0 bg-yellow-100 opacity-30 rounded-lg -z-10" />
            Looking for <strong>stand up pouch manufacturers near me</strong>? We ship across India with fast turnarounds.
          </motion.p>
        </div>
      </section>

      {/* Custom Printing & Mockups */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-black relative group"
            initial={{ opacity: 0, rotateX: -10 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Custom Printing & Mockups
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 group-hover:w-1/2" />
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
            <motion.div
              className="md:col-span-3 space-y-6"
              initial="hidden"
              whileInView="visible"
              variants={staggerChildren}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-lg text-black"
                variants={fadeInUp}
              >
                Build brand impact with premium stand up pouch printing. We offer:
              </motion.p>
              <motion.ul
                className="space-y-4 text-lg text-black"
                variants={staggerChildren}
              >
                {[
                  'Digital printing for short runs',
                  'Flexographic and rotogravure for high-volume orders',
                  'Matte, glossy, and metallic finishes',
                ].map((item, index) => (
                  <motion.li
                    className="relative p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    key={index}
                    style={{ marginRight: index % 2 === 0 ? '2rem' : '0' }}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1.5 : -1.5 }}
                  >
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.p
                className="text-lg text-black relative px-4 py-2"
                variants={fadeInUp}
              >
                <span className="absolute inset-0 bg-yellow-100 opacity-30 rounded-lg -z-10" />
                Preview your pouch with our <strong>stand up pouch mockup</strong> service.
              </motion.p>
            </motion.div>
            <motion.div
              className="md:col-span-2 relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 transform -skew-y-6">
                <Image
                  alt="Custom printed stand up pouch mockup"
                  className="w-full h-auto rounded-xl shadow-2xl"
                  height={300}
                  src="https://cdn.nexibles.com/industries/Picture%203.webp"
                  width={500}
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-yellow-400 opacity-15 rounded-xl -z-10"
                initial={{ scale: 0.8, skewY: 6 }}
                whileInView={{ scale: 1, skewY: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ skewY: -3 }}
              />
              <motion.div
                className="absolute -top-4 -left-4 w-10 h-10 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-black relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
            viewport={{ once: true }}
          >
            Industries We Serve
            <motion.div
              className="absolute top-0 right-4 w-6 h-6 bg-yellow-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={staggerChildren}
            viewport={{ once: true }}
          >
            {[
              'Food & Beverage Brands',
              'Health Supplement Companies',
              'Cosmetic & Personal Care Brands',
              'Pet Product Manufacturers',
              'Organic & Eco-Friendly Brands',
            ].map((industry, index) => (
              <motion.div
                className="relative flex items-center justify-center w-48 h-48 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20, rotate: -10 }}
                key={index}
                style={{ transform: `translateY(${index % 2 === 0 ? '0' : '2rem'})` }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                variants={fadeInUp}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              >
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                <p className="text-lg text-black text-center px-4">{industry}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-12 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6">
            {[
              {
                a: 'Yes, all materials are FDA-compliant and suitable for direct food contact.',
                q: 'Are your stand up pouches food-grade?',
              },
              {
                a: 'Absolutely. We offer recyclable and biodegradable stand up pouches for brands focused on sustainability.',
                q: 'Do you offer eco-friendly options?',
              },
              {
                a: 'Yes, we provide stand up pouch mockups so you can approve the size, print, and finish before final production.',
                q: 'Can I see a mockup before placing a full order?',
              },
              {
                a: 'We offer flexible MOQs to support businesses of all sizes.',
                q: 'What is your minimum order quantity (MOQ)?',
              },
            ].map((faq, index) => (
              <motion.article
                className="bg-gray-100 p-6 border-l-4 border-yellow-400"
                initial={{ opacity: 0, y: 50 }}
                key={index}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-semibold text-black mb-2">{faq.q}</h3>
                <p className="text-lg text-black">{faq.a}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default StandUpPouches;