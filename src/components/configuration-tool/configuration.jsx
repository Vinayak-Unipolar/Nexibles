'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuth } from '@/utils/authContext';
import { useRouter } from 'next/navigation';
import standuppouch from '@/../public/product/standuppouch.jpg';

const Configuration = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // State management
  const [product, setProduct] = useState(null);
  const [jobName, setJobName] = useState('');
  const [sizeOptions, setSizeOptions] = useState({ widths: [], lengths: [] });
  const [selectedWidth, setSelectedWidth] = useState(null);
  const [selectedLength, setSelectedLength] = useState(null);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [mandatoryProcesses, setMandatoryProcesses] = useState([]);
  const [selectedMandatoryProcess, setSelectedMandatoryProcess] = useState(null);
  const [optionalProcesses, setOptionalProcesses] = useState([]);
  const [selectedOptionalProcesses, setSelectedOptionalProcesses] = useState([]);
  const [zipperOptions, setZipperOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [designNames, setDesignNames] = useState(['']);
  const [selectedQuantities, setSelectedQuantities] = useState([500]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [costData, setCostData] = useState(null);
  const [isQuotationLoading, setIsQuotationLoading] = useState(false);
  const [token, setToken] = useState(null);
  // New states for categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Login to get token with retry
  const loginForThirdParty = useCallback(async (retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch('https://nexiblesapp.barecms.com/proxy?r=user/authenticate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'sales@artnext.in',
            password: 'Artnext@1',
            subdomain: 'nexibles',
            otp: false,
            ipaddress: '58.84.60.235',
          }),
        });

        const result = await response.json();
        if (result.status) {
          const newToken = result.data.token;
          localStorage.setItem('token2', newToken);
          setToken(newToken);
          return newToken;
        } else {
          throw new Error(result.message || 'Login failed');
        }
      } catch (err) {
        if (attempt === retries) {
          setError('Failed to authenticate after multiple attempts.');
          return null;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }, [setError]);

  // Fetch category data with retry
  const fetchCategoryData = useCallback(async (retries = 3) => {
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    const token = process.env.NEXT_PUBLIC_API_KEY;

    if (!APIURL || !token) {
      setError('API URL or API Key is missing.');
      return false;
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(`${APIURL}/api/category_master`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'API-Key': token,
          },
        });

        const data = await response.json();
        if (data.status === 'success' && data.data) {
          const filterCategory = data.data
            .filter((category) => category.origin?.toLowerCase() === 'nexibles')
            .map((category) => ({
              id: category.id,
              name: category.name,
              cat_url: category.cat_url || '',
            }));
          setCategories(filterCategory);
          return true;
        } else {
          throw new Error(data.error || 'Failed to fetch category data');
        }
      } catch (err) {
        if (attempt === retries) {
          setError(err.message || 'Error fetching category data');
          return false;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }, [setError]);

  // Fetch product data with retry
  const fetchProductData = useCallback(async (authToken, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(
          'https://nexiblesapp.barecms.com/proxy?r=products/get-product-list&product_type=8&press_id=82&limit=10&offset=0',
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Environment: 'frontdesk',
            },
          }
        );

        const data = await response.json();
        if (data.status && data.data) {
          const targetProduct = data.data.find((p) => p.id === '122');
          if (!targetProduct) throw new Error('Product ID 122 not found');

          setProduct(targetProduct);

          // Generate size options
          const { minimum_width, maximum_width, minimum_length, maximum_length } = targetProduct;

          // Validate size parameters
          if (
            !minimum_width ||
            !maximum_width ||
            !minimum_length ||
            !maximum_length ||
            isNaN(parseInt(minimum_width)) ||
            isNaN(parseInt(maximum_width)) ||
            isNaN(parseInt(minimum_length)) ||
            isNaN(parseInt(maximum_length))
          ) {
            throw new Error('Invalid size parameters in product data');
          }

          const widthStep = (parseInt(maximum_width) - parseInt(minimum_width)) / 9;
          const lengthStep = (parseInt(maximum_length) - parseInt(minimum_length)) / 9;
          const widths = Array.from({ length: 10 }, (_, i) => {
            const width = Math.round(parseInt(minimum_width) + i * widthStep);
            return { value: width, label: `${width} mm` };
          });
          const lengths = Array.from({ length: 10 }, (_, i) => {
            const length = Math.round(parseInt(minimum_length) + i * lengthStep);
            return { value: length, label: `${length} mm` };
          });
          setSizeOptions({ widths, lengths });
          setSelectedWidth(widths[0] || null);
          setSelectedLength(lengths[0] || null);

          // Set material options
          const materials = Array.isArray(targetProduct.pouch_media)
            ? targetProduct.pouch_media.map((m) => ({
                value: m.id,
                label: m.media_title,
                widths: m.media_widths ? m.media_widths.split(',') : [],
              }))
            : [];
          setMaterialOptions(materials);
          setSelectedMaterial(materials[0] || null);

          // Set mandatory processes
          const mandatory = Array.isArray(targetProduct.pouch_postpress)
            ? targetProduct.pouch_postpress
                .filter((p) => p.mandatory_any_one)
                .map((p) => ({
                  value: p.id,
                  label: p.process_name,
                }))
            : [];
          setMandatoryProcesses(mandatory);
          setSelectedMandatoryProcess(mandatory[0] || null);

          // Set optional processes
          const optional = Array.isArray(targetProduct.pouch_postpress)
            ? targetProduct.pouch_postpress
                .filter((p) => p.optional && !p.mandatory_any_one)
                .map((p) => ({
                  id: p.id,
                  name: p.process_name,
                }))
            : [];
          setOptionalProcesses(optional);

          // Set zipper options
          const zippers = Array.isArray(targetProduct.pouch_postpress)
            ? targetProduct.pouch_postpress
                .filter((p) => p.mandatory_any_one)
                .map((p) => ({
                  value: p.id,
                  label: p.process_name,
                }))
            : [];
          setZipperOptions(zippers);

          return true;
        } else {
          throw new Error(data.message || 'Failed to fetch product data');
        }
      } catch (err) {
        if (attempt === retries) {
          setError(err.message);
          return false;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }, [
    setProduct,
    setSizeOptions,
    setSelectedWidth,
    setSelectedLength,
    setMaterialOptions,
    setSelectedMaterial,
    setMandatoryProcesses,
    setSelectedMandatoryProcess,
    setOptionalProcesses,
    setZipperOptions,
    setError,
  ]);

  // Initialize authentication, product, and category data fetching
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      setError(null);

      if (user) {
        setIsAuthLoading(false);
        const authToken = await loginForThirdParty();
        if (authToken) {
          const [productSuccess, categorySuccess] = await Promise.all([
            fetchProductData(authToken),
            fetchCategoryData(),
          ]);
          if (!productSuccess || !categorySuccess) {
            setError('Failed to load product or category data after multiple attempts.');
          }
        } else {
          setError('Authentication failed.');
        }
      } else {
        router.push('/login');
      }

      setLoading(false);
    };

    initialize();
  }, [user, router, loginForThirdParty, fetchProductData, fetchCategoryData]);

  // Handle optional process checkbox changes
  const handleOptionalProcessChange = (processId) => {
    setSelectedOptionalProcesses((prev) =>
      prev.includes(processId)
        ? prev.filter((id) => id !== processId)
        : [...prev, processId]
    );
  };

  // Handle SKU quantity changes
  const handleQuantityChange = (index, value) => {
    if (index >= quantity) return; // Prevent out-of-bounds updates
    const updated = [...selectedQuantities];
    updated[index] = parseInt(value);
    setSelectedQuantities(updated);
  };

  // Calculate total quantity
  const totalQuantity = selectedQuantities.reduce((a, b) => a + b, 0);

  // Handle Request Quotation
  const handleRequestQuotation = async () => {
    setIsQuotationLoading(true);
    setError(null);
    try {
      let authToken = token || localStorage.getItem('token2');
      if (!authToken) {
        authToken = await loginForThirdParty();
        if (!authToken) throw new Error('No authentication token');
      }

      // Validate required fields
      if (!jobName) throw new Error('Project name is required');
      if (!selectedWidth || !selectedLength) throw new Error('Width and length are required');
      if (!selectedMaterial) throw new Error('Material is required');
      if (!selectedMandatoryProcess) throw new Error('Mandatory process is required');

      const payload = {
        formData: {
          job_name: jobName || 'Untitled Project',
          quantity_one: totalQuantity.toString(),
          quantity_two: '0',
          quantity_three: '0',
          length: selectedLength?.value.toString() || '',
          width: selectedWidth?.value.toString() || '',
          no_of_sku: quantity.toString(),
          pouch_printing_color: '7',
          media_id: selectedMaterial?.value || '',
          media_0: '',
          media_1: '',
          media_2: '',
          media_3: '',
          gusset_size: '3',
          gusset_color: '7',
          seal_size: '',
          mandatory_one_process: selectedMandatoryProcess?.value || '',
          optional_process: selectedOptionalProcesses,
          type: 'basic',
        },
        productId: '122',
        printingTypeId: '8',
        customerId: '26176',
      };

      const response = await fetch(
        'https://nexiblesapp.barecms.com/proxy?r=flexible-pouch/save-requirement&press_id=82',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            Environment: 'frontdesk',
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result.status && result.data?.costing_data?.length > 0) {
        setCostData(result.data.costing_data[0]);
      } else {
        throw new Error(result.message || 'Failed to generate quotation: Invalid response data');
      }
    } catch (err) {
      console.error('Quotation error:', err);
      setError(err.message);
      alert('Failed to generate quotation: ' + err.message);
    } finally {
      setIsQuotationLoading(false);
    }
  };

  // Skeleton UI Component
  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-6">
      <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/4">
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
          </div>
          <div className="bg-white rounded-xl p-6 mt-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render auth loading state
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Render existing loading and error states
  if (loading) return <div className="min-h-screen bg-gray-50 py-12 px-6"><SkeletonLoader /></div>;
  if (error && !product)
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="text-center p-4 text-red-500 bg-red-50 rounded-lg max-w-md mx-auto">
          {error}
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <Head>
        <title>Custom Pouches | Configuration Tool</title>
        <meta name="description" content="Configure your custom pouches with our interactive tool" />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Pouch Configuration Tool</h1>
        <p className="text-lg text-gray-600">Design your perfect packaging solution</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row justify-center mx-auto gap-8">
        {/* Main Configuration Content */}
        <motion.div
          className="lg:w-2/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Pouch Specifications */}
              <motion.div className="mb-8" variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Pouch Specifications
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Category</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        disabled={categories.length === 0}
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {categories.length === 0 && (
                        <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
                      )}
                    </div>

                    {/* Width */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Width</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedWidth?.value || ''}
                        onChange={(e) => {
                          const selected = sizeOptions.widths.find((w) => w.value === parseInt(e.target.value));
                          setSelectedWidth(selected);
                        }}
                      >
                        <option value="" disabled>
                          Select width
                        </option>
                        {sizeOptions.widths?.map((width, idx) => (
                          <option key={idx} value={width.value}>
                            {width.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Length */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Length</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedLength?.value || ''}
                        onChange={(e) => {
                          const selected = sizeOptions.lengths.find((l) => l.value === parseInt(e.target.value));
                          setSelectedLength(selected);
                        }}
                      >
                        <option value="" disabled>
                          Select length
                        </option>
                        {sizeOptions.lengths?.map((length, idx) => (
                          <option key={idx} value={length.value}>
                            {length.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Material */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Material</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedMaterial?.value || ''}
                        onChange={(e) => {
                          const selected = materialOptions.find((m) => m.value === e.target.value);
                          setSelectedMaterial(selected);
                        }}
                      >
                        <option value="" disabled>
                          Select material
                        </option>
                        {materialOptions.map((material, idx) => (
                          <option key={idx} value={material.value}>
                            {material.label}
                          </option>
                        ))}
                      </select>
                      {selectedMaterial && (
                        <p className="text-sm text-gray-500 mt-1">
                          Available widths: {selectedMaterial.widths.join(', ')} mm
                        </p>
                      )}
                    </div>

                    {/* Mandatory Process */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Mandatory Process</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedMandatoryProcess?.value || ''}
                        onChange={(e) => {
                          const selected = mandatoryProcesses.find((p) => p.value === e.target.value);
                          setSelectedMandatoryProcess(selected);
                        }}
                      >
                        <option value="" disabled>
                          Select mandatory process
                        </option>
                        {mandatoryProcesses.map((process, idx) => (
                          <option key={idx} value={process.value}>
                            {process.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* SKU Configuration */}
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
                        setSelectedQuantities(Array(q).fill(500));
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sku) => (
                        <option key={sku} value={sku}>
                          {sku}
                        </option>
                      ))}
                    </select>
                  </div>

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
                            <option value={500}>500 Pcs</option>
                            <option value={1000}>1000 Pcs</option>
                            <option value={2000}>2000 Pcs</option>
                            <option value={3000}>3000 Pcs</option>
                            <option value={5000}>5000 Pcs</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Optional Processes */}
              {optionalProcesses.length > 0 && (
                <motion.div className="mb-8" variants={itemVariants}>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                    Optional Processes
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4">
                    {optionalProcesses.map((process, idx) => (
                      <label key={idx} className="flex items-center space-x-3 text-gray-700">
                        <input
                          type="checkbox"
                          value={process.id}
                          checked={selectedOptionalProcesses.includes(process.id)}
                          onChange={() => handleOptionalProcessChange(process.id)}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <span>{process.name}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Sticky Preview & Quotation Sidebar */}
        <motion.div className="lg:w-1/4" variants={itemVariants}>
          <div className="sticky top-16">
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-40 w-48">
                  {product && (
                    <Image
                      src={standuppouch}
                      alt={product.product_name}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  )}
                </div>
              </motion.div>
              <div className="mt-6 text-center text-gray-600 text-sm">
                <p>
                  {selectedWidth && selectedLength
                    ? `${selectedWidth.label} x ${selectedLength.label}`
                    : 'Not selected'}
                </p>
                <p>
                  {selectedMaterial?.label || 'Not selected'} • {selectedMandatoryProcess?.label || 'Not selected'}
                </p>
                <p>Category: {categories.find((cat) => cat.id === selectedCategory)?.name || 'Not selected'}</p>
              </div>
            </div>

            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quotation</h3>
              <div className="mb-4 text-center text-gray-600 text-sm">
                <p>{jobName || 'Your Custom Pouch'}</p>
              </div>
              <hr className="my-4 border-gray-200" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Quantity</span>
                  <span className="font-medium">{totalQuantity || 0} pcs</span>
                </div>
                {costData && (
                  <div className="flex justify-between font-bold text-lg text-gray-800">
                    <span>Total</span>
                    <span>₹{Number(costData.total_cost).toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-4">
                <motion.button
                  className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                    isQuotationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
                  }`}
                  whileHover={{ scale: isQuotationLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isQuotationLoading ? 1 : 0.98 }}
                  onClick={handleRequestQuotation}
                  disabled={isQuotationLoading}
                >
                  {isQuotationLoading ? 'Generating...' : 'Request Quotation'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Configuration;
















