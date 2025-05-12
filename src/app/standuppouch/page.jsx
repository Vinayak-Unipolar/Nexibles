'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
              <motion.p className="text-2xl mb-6 font-semibold text-black" variants fórmat={fadeInUp}>
                Custom Printed, Food-Grade, Retail-Ready Packaging
              </motion.p>
              <motion.p className="text-lg max-w-xl text-black" variants={fadeInUp}>
                Premium pouches for brands seeking high-performance, customizable packaging. Perfect for snacks, powders, and more.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  href="/contact"
                  className="mt-8 inline-block bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
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
                src="https://cdn.nexibles.com/industries/Picture%203.webp"
                alt="Stand up pouch packaging display"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-2xl object-cover"
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
                src="https://cdn.nexibles.com/industries/Picture%203.webp"
                alt="Stand up pouch packaging display"
                width={500}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg"
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
                    key={index}
                    className="flex items-center space-x-2 group"
                    variants={fadeInUp}
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full group-hover:bg-yellow-500 transition"></span>
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

      {/* Why Choose Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose Stand Up Pouches?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://cdn.nexibles.com/industries/Picture%203.webp"
                alt="Stand up pouch packaging display"
                width={500}
                height={300}
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </motion.div>
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              variants={staggerChildren}
              viewport={{ once: true }}
            >
              <motion.p className="text-lg text-black" variants={fadeInUp}>
                Stand up pouches offer a modern, space-efficient, and consumer-friendly solution for various industries.
              </motion.p>
              <motion.p className="text-lg text-black" variants={fadeInUp}>
                Available in multiple styles, materials, and finishes—from matte kraft to glossy foil laminates.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Applications & Product Uses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Applications & Product Uses
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.ul
              className="space-y-4 text-lg text-black"
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
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
                  variants={fadeInUp}
                >
                  <strong>{app.title}:</strong> {app.items}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://cdn.nexibles.com/industries/Picture%203.webp"
                alt="Custom stand up pouches"
                width={500}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
          <motion.p
            className="text-lg text-black mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Looking for <strong>stand up pouch manufacturers near me</strong>? We ship across India with fast turnarounds.
          </motion.p>
        </div>
      </section>

      {/* Material Options & Sizes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Material Options & Sizes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'Popular Sizes',
                items: ['Small (100g–250g)', 'Medium (500g–1kg)', 'Large (2kg–5kg)'],
              },
              {
                title: 'Material Options',
                items: ['PET / PE', 'Kraft Paper Laminates', 'Foil-Based High Barrier Films', 'Recyclable and Compostable Films'],
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-8 rounded-lg  hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-black mb-4">{card.title}</h3>
                <ul className="space-y-2 text-lg text-black">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Printing & Mockups */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Custom Printing & Mockups
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              variants={staggerChildren}
              viewport={{ once: true }}
            >
              <motion.p className="text-lg text-black" variants={fadeInUp}>
                Build brand impact with premium stand up pouch printing. We offer:
              </motion.p>
              <motion.ul className="space-y-2 text-lg text-black" variants={staggerChildren}>
                {[
                  'Digital printing for short runs',
                  'Flexographic and rotogravure for high-volume orders',
                  'Matte, glossy, and metallic finishes',
                ].map((item, index) => (
                  <motion.li key={index} className="flex items-center space-x-2" variants={fadeInUp}>
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.p className="text-lg text-black" variants={fadeInUp}>
                Preview your pouch with our <strong>stand up pouch mockup</strong> service.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://cdn.nexibles.com/industries/Picture%203.webp"
                alt="Custom printed stand up pouch mockup"
                width={500}
                height={300}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Industries We Serve
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              'Food & Beverage Brands',
              'Health Supplement Companies',
              'Cosmetic & Personal Care Brands',
              'Pet Product Manufacturers',
              'Organic & Eco-Friendly Brands',
            ].map((industry, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-6 rounded-lg border border-1 hover:bg-gray-200 transition-colors"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-lg text-black text-center">{industry}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          q: 'Are your stand up pouches food-grade?',
          a: 'Yes, all materials are FDA-compliant and suitable for direct food contact.',
        },
        {
          q: 'Do you offer eco-friendly options?',
          a: 'Absolutely. We offer recyclable and biodegradable stand up pouches for brands focused on sustainability.',
        },
        {
          q: 'Can I see a mockup before placing a full order?',
          a: 'Yes, we provide stand up pouch mockups so you can approve the size, print, and finish before final production.',
        },
        {
          q: 'What is your minimum order quantity (MOQ)?',
          a: 'We offer flexible MOQs to support businesses of all sizes.',
        },
      ].map((faq, index) => (
        <motion.article
          key={index}
          className="bg-gray-100 p-6 border-l-4 border-yellow-400"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-black mb-2">{faq.q}</h3>
          <p className="text-lg text-black">{faq.a}</p>
        </motion.article>
      ))}
    </div>
  </div>
</section>

      {/* Request a Quote */}
      {/* <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold mb-6 text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Request a Quote
          </motion.h2>
          <motion.p
            className="text-lg mb-8 max-w-2xl mx-auto text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to elevate your packaging? Partner with Nexibles for custom stand up pouches that reflect your brand’s quality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-block bg-yellow-400 text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </section> */}
    </main>
  );
};

export default StandUpPouches;