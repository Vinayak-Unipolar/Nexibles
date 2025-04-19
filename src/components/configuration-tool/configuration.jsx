import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import data from '@/components/configuration-tool/data.json';
import standuppouch from '@/../public/product/standuppouch.jpg';

const optionalFeaturesList = [
  "D-Cut Handle Punch",
  "Euro Hang Hole",
  "Round Hang Hole",
  "Tear Notch",
  "Round Corner",
  "Valve",
  "K- Seal",
  "Radius Seal",
  "Straight Seal",
  "Pouch Opening Top",
  "Pouch Opening Bottom",
  "Unprinted Gusset"
];

export default function Configuration() {
  const [quantity, setQuantity] = useState(1);
  const [designNames, setDesignNames] = useState(['']);
  const [selectedQuantities, setSelectedQuantities] = useState([100]);
  const [selectedSize, setSelectedSize] = useState(data.sizes[0]);
  const [projectName, setProjectName] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(data.materials[0]);
  const [selectedFeature, setSelectedFeature] = useState(data.optionalFeatures[0]);
  const [selectedCorner, setSelectedCorner] = useState(data.cornerTypes[0]);
  const [selectedOptionalFeatures, setSelectedOptionalFeatures] = useState([]);

  const handleOptionalFeatureChange = (feature) => {
    setSelectedOptionalFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleQuantityChange = (index, value) => {
    const updated = [...selectedQuantities];
    updated[index] = parseInt(value);
    setSelectedQuantities(updated);
  };

  const subtotal = selectedQuantities.reduce((total, q) => total + (selectedSize.price * q), 0);
  const tax = +(subtotal * 0.1).toFixed(2); // 10% tax
  const total = +(subtotal + tax).toFixed(2);
  const totalQuantity = selectedQuantities.reduce((a, b) => a + b, 0);

 
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <Head>
        <title>Custom Pouches | Configuration Tool</title>
        <meta name="description" content="Configure your custom pouches with our interactive tool" />
      </Head>
 
      <div className="flex flex-col lg:flex-row justify-center mx-auto gap-8">
        {/* Main Configuration Content */}
        <motion.div
          className="lg:w-2/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Pouch Configuration Tool</h1>
            <p className="text-lg text-gray-600">Design your perfect packaging solution</p>
          </motion.div>
 
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="p-8">
              {/* Project Name */}
              <motion.div
                className="mb-8"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                  Project Details
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <label className="block text-gray-700 font-medium mb-2">Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter your project name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
              </motion.div>
 
              {/* Pouch Features */}
              <motion.div
                className="mb-8"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Pouch Specifications
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sizes */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Size</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        onChange={(e) => {
                          const selected = data.sizes.find(
                            (s) => s.label === e.target.value
                          );
                          setSelectedSize(selected);
                        }}
                      >
                        {data.sizes.map((size, idx) => (
                          <option key={idx} value={size.label}>
                            {size.label}
                          </option>
                        ))}
                      </select>
                    </div>
 
                    {/* Material */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Material</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedMaterial}
                        onChange={(e) => setSelectedMaterial(e.target.value)}
                      >
                        {data.materials.map((material, idx) => (
                          <option key={idx} value={material}>{material}</option>
                        ))}
                      </select>
                    </div>
 
                    {/* Optional Features */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Mandatory Process</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedFeature}
                        onChange={(e) => setSelectedFeature(e.target.value)}
                      >
                        {data.optionalFeatures.map((feature, idx) => (
                          <option key={idx} value={feature}>{feature}</option>
                        ))}
                      </select>
                    </div>
 
                    {/* Corners */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Corner Type</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedCorner}
                        onChange={(e) => setSelectedCorner(e.target.value)}
                      >
                        {data.cornerTypes.map((corner, idx) => (
                          <option key={idx} value={corner}>{corner}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
 
              {/* SKU Quantity */}
              <motion.div
                className=""
                variants={itemVariants}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                  SKU Configuration
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Number of SKUs</label>
                    <select
                      className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                      value={quantity}
                      onChange={(e) => {
                        const q = parseInt(e.target.value);
                        setQuantity(q);
                        setDesignNames(Array(q).fill(''));
                        setSelectedQuantities(Array(q).fill(100));
                      }}
                    >
                      {data.skus.map((sku) => (
                        <option key={sku.id} value={sku.id}>{sku.id}</option>
                      ))}
                    </select>
                  </div>
 
                  {/* Design Names & Quantities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Design Names</label>
                      {[...Array(quantity)].map((_, index) => (
                        <div key={index} className="mb-3">
                          <input
                            type="text"
                            placeholder={`Design ${index + 1} name`}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
                            value={designNames[index] || ''}
                            onChange={(e) => {
                              const updated = [...designNames];
                              updated[index] = e.target.value;
                              setDesignNames(updated);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                      {[...Array(quantity)].map((_, index) => (
                        <div key={index} className="mb-3">
                          <select
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                            value={selectedQuantities[index]}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                          >
                            <option value={100}>100 Pcs</option>
                            <option value={200}>200 Pcs</option>
                            <option value={300}>300 Pcs</option>
                            <option value={500}>500 Pcs</option>
                            <option value={1000}>1000 Pcs</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="p-8">
              {/* Project Details, Size, Material, etc. remain the same ... */}

              {/* Optional Features (Checkboxes) */}
              <motion.div className="mb-8" variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                  Optional Features
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
                  {optionalFeaturesList.map((feature, idx) => (
                    <label key={idx} className="flex items-center space-x-3 text-gray-700">
                      <input
                        type="checkbox"
                        value={feature}
                        checked={selectedOptionalFeatures.includes(feature)}
                        onChange={() => handleOptionalFeatureChange(feature)}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* SKU Configuration remains the same... */}
            </div>
          </motion.div>
         
        </motion.div>
 
        {/* Sticky Preview & Quotation Sidebar */}
        <motion.div
          className="lg:w-w-1/2"
          variants={itemVariants}
        >
          <div className="sticky top-8 ">
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-40 w-48">
                  <Image
                    src={standuppouch}
                    alt="Pouch Preview"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              </motion.div>
              <div className="mt-6 text-center text-gray-600 text-sm">
                <p>{selectedSize.label} • {selectedMaterial}</p>
                <p>{selectedFeature} • {selectedCorner}</p>
              </div>
            </div>
 
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quotation</h3>
              <div className="mb-4 text-center text-gray-600 text-sm">
                <p>{projectName || 'Your Custom Pouch'}</p>
              </div>
              <hr className="my-4 border-gray-200" />
 
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Quantity</span>
                  <span className="font-medium">{totalQuantity} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium">₹{tax}</span>
                </div>
              </div>
 
              <hr className="my-4 border-gray-200" />
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
 
              <div className="mt-8 space-y-4">
                <motion.button
                  className="w-full py-3 px-4 bg-black text-white font-medium rounded-lg transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add To Cart
                </motion.button>
                <motion.button
                  className="w-full py-3 px-4 bg-white text-black font-medium rounded-lg border border-gray-300 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Configuration
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
     
      {/* Footer */}
      <motion.div
        className="mt-8 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
      </motion.div>
    </div>
  );
}
 