import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import standuppouch from '@/../public/product/standuppouch.jpg';

export default function Configuration() {
  const [quantity, setQuantity] = useState(1);
  const [designNames, setDesignNames] = useState(['']);
  const [selectedQuantities, setSelectedQuantities] = useState([100]);
  const [selectedSize, setSelectedSize] = useState('');
  const [projectName, setProjectName] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('');
  const [selectedCorner, setSelectedCorner] = useState('');
  const [materials, setMaterials] = useState([]);
  const [features, setFeatures] = useState([]);
  const [skus, setSkus] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [cornerTypes, setCornerTypes] = useState(['Rounded', 'Square']); // Fallback
  const [gussetList, setGussetList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Third-party login function
  const loginForThirdParty = async () => {
    try {
      const response = await fetch("https://nexiblesapp.barecms.com/proxy?r=user/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "sales@artnext.in",
          password: "Artnext@1",
          subdomain: "nexibles",
          otp: false,
          ipaddress: "58.84.60.235",
        }),
      });

      const result = await response.json();

      if (result.status === true) {
        localStorage.setItem("token2", result.data.token);
        return result.data.token;
      } else {
        setError(result.message || "Third party login failed");
        return null;
      }
    } catch (error) {
      setError("An error occurred during third party login. Please try again.");
      return null;
    }
  };

  // Fetch product details (media types, mandatory processes, SKUs)
  const fetchProductDetails = async (productId = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token2") || await loginForThirdParty();
      if (!token) return;

      const response = await fetch(
        `https://nexiblesapp.barecms.com/proxy?r=products/get-product-details&product_id=${productId}&press_id=82`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "environment": "frontdesk",
          },
        }
      );
      const data = await response.json();

      if (data.status) {
        setSelectedProduct(data.data);
        // Set materials (media types)
        const mediaTypes = data.data.pouch_media?.map((m) => m.media_title) || [];
        setMaterials(mediaTypes);
        setSelectedMaterial(mediaTypes[0] || '');

        // Set mandatory processes as features
        const mandatoryProcesses = data.data.pouch_postpress
          ?.filter((p) => p.mandatory_any_one === true)
          .map((p) => p.process_name) || [];
        setFeatures(mandatoryProcesses);
        setSelectedFeature(mandatoryProcesses[0] || '');

        // Set SKUs based on no_of_sku
        const skuCount = data.data.no_of_sku || 1;
        const skuOptions = Array.from({ length: skuCount }, (_, i) => ({ id: i + 1 }));
        setSkus(skuOptions);

        // Fetch gusset list for sizes
        await fetchGussetList(productId);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch gusset list (for sizes)
  const fetchGussetList = async (productId) => {
    try {
      const token = localStorage.getItem("token2") || await loginForThirdParty();
      if (!token) return;
      const response = await fetch(
        `https://nexiblesapp.barecms.com/proxy?r=products/get-product-gusset-list&product_id=${productId}&press_id=82`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "environment": "frontdesk",
          },
        }
      );
      const data = await response.json();
      if (data.status) {
        setGussetList(data.data);
        // Derive sizes from gusset list (e.g., pouch_width or open_size)
        const uniqueSizes = [
          ...new Set(data.data.map((gusset) => `${gusset.pouch_width}mm (Open: ${gusset.open_size})`)),
        ];
        setSizes(uniqueSizes);
        setSelectedSize(uniqueSizes[0] || '');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchProductDetails();
  }, []);

  // Clear error after 10 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const handleQuantityChange = (index, value) => {
    const updated = [...selectedQuantities];
    updated[index] = parseInt(value);
    setSelectedQuantities(updated);
  };

  // Calculate total quantity
  const totalQuantity = selectedQuantities.reduce((a, b) => a + b, 0);

  // Pricing logic (placeholder, as Createestimate doesn't provide prices)
  const subtotal = totalQuantity * 10; // Placeholder price per unit
  const tax = +(subtotal * 0.1).toFixed(2); // 10% tax
  const total = +(subtotal + tax).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <Head>
        <title>Custom Pouches | Configuration Tool</title>
        <meta name="description" content="Configure your custom pouches with our interactive tool" />
      </Head>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-6 p-4 bg-blue-100 text-blue-700 rounded-lg text-center">
          Loading product data...
        </div>
      )}

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
              <motion.div className="mb-8" variants={itemVariants}>
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
              <motion.div className="mb-8" variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Pouch Specifications
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sizes (from gusset list) */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Size</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        disabled={sizes.length === 0}
                      >
                        {sizes.length > 0 ? (
                          sizes.map((size, idx) => (
                            <option key={idx} value={size}>{size}</option>
                          ))
                        ) : (
                          <option value="">No sizes available</option>
                        )}
                      </select>
                    </div>

                    {/* Material (Media Type) */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Material</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedMaterial}
                        onChange={(e) => setSelectedMaterial(e.target.value)}
                        disabled={materials.length === 0}
                      >
                        {materials.length > 0 ? (
                          materials.map((material, idx) => (
                            <option key={idx} value={material}>{material}</option>
                          ))
                        ) : (
                          <option value="">No materials available</option>
                        )}
                      </select>
                    </div>

                    {/* Optional Features (Mandatory Process) */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Optional Features</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedFeature}
                        onChange={(e) => setSelectedFeature(e.target.value)}
                        disabled={features.length === 0}
                      >
                        {features.length > 0 ? (
                          features.map((feature, idx) => (
                            <option key={idx} value={feature}>{feature}</option>
                          ))
                        ) : (
                          <option value="">No features available</option>
                        )}
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
                        {cornerTypes.map((corner, idx) => (
                          <option key={idx} value={corner}>{corner}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* SKU Quantity */}
              <motion.div className="mb-8" variants={itemVariants}>
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
                      disabled={skus.length === 0}
                    >
                      {skus.length > 0 ? (
                        skus.map((sku) => (
                          <option key={sku.id} value={sku.id}>{sku.id}</option>
                        ))
                      ) : (
                        <option value="">No SKUs available</option>
                      )}
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
          </motion.div>
        </motion.div>

        {/* Sticky Preview & Quotation Sidebar */}
        <motion.div className="lg:w-w-1/2" variants={itemVariants}>
          <div className="sticky top-8">
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-40 w-48">
                  <Image
                    src={selectedProduct?.product_picture || standuppouch}
                    alt="Pouch Preview"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              </motion.div>
              <div className="mt-6 text-center text-gray-600 text-sm">
                <p>{selectedSize || 'N/A'} • {selectedMaterial || 'N/A'}</p>
                <p>{selectedFeature || 'N/A'} • {selectedCorner || 'N/A'}</p>
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