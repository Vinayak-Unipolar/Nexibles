'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuth } from '@/utils/authContext';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD
=======
import standuppouch from '@/../public/product/standuppouch.jpg';
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/store/cartSlice';
import { toast } from 'react-toastify';

const Configuration = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
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
  const [selectedSeal, setSelectedSeal] = useState('');
  const [selectedHangHole, setSelectedHangHole] = useState('');
  const [selectedPouchOpening, setSelectedPouchOpening] = useState('');
  const [selectedMultiProcesses, setSelectedMultiProcesses] = useState([]);
  const [zipperOptions, setZipperOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [designNames, setDesignNames] = useState(['']);
  const [selectedQuantities, setSelectedQuantities] = useState([500]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [costData, setCostData] = useState(null);
  const [isQuotationLoading, setIsQuotationLoading] = useState(false);
  const [isQuotationGenerated, setIsQuotationGenerated] = useState(false);
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isWidthOpen, setIsWidthOpen] = useState(false);
  const [isLengthOpen, setIsLengthOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isMandatoryProcessOpen, setIsMandatoryProcessOpen] = useState(false);
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);
  const [isSealOpen, setIsSealOpen] = useState(false);
  const [isHangHoleOpen, setIsHangHoleOpen] = useState(false);
  const [isPouchOpeningOpen, setIsPouchOpeningOpen] = useState(false);
  const [isSkuQuantityOpen, setIsSkuQuantityOpen] = useState(Array(quantity).fill(false));

  const NEXI_CDN_URL = process.env.NEXT_NEXIBLES_CDN_URL || "https://cdn.nexibles.com";

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

  // Login to get a fresh token on every page refresh
  const loginForThirdParty = useCallback(async (retries = 3) => {
    setToken(null); // Clear existing token in state
<<<<<<< HEAD
=======
  
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Ideally, move this to a secure backend API
        const response = await fetch('https://nexiblesapp.barecms.com/proxy?r=user/authenticate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: process.env.NEXT_PUBLIC_API_EMAIL || 'sales@artnext.in',
            password: process.env.NEXT_PUBLIC_API_PASSWORD || 'Artnext@1',
            subdomain: 'nexibles',
            otp: false,
            ipaddress: process.env.NEXT_PUBLIC_IP_ADDRESS || '58.84.60.235',
          }),
        });
  
        const result = await response.json();
        if (result.status && result.data?.token) {
          const newToken = result.data.token;
          setToken(newToken);
          return newToken;
        } else {
          throw new Error(result.message || 'Login failed');
        }
      } catch (err) {
        console.error(`Authentication attempt ${attempt} failed:`, err.message);
        if (attempt === retries) {
          setError('Failed to authenticate after multiple attempts.');
          return null;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }, []);

  // Fetch category data
  const fetchCategoryData = useCallback(async (retries = 3) => {
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    const token = process.env.NEXT_PUBLIC_API_KEY;

    if (!APIURL || !token) {
      setError('API URL or API Key is missing.');
      return false;
    }

    for (let attempt = 1; retries; attempt++) {
      try {
        const response = await fetch(`${APIURL}/api/category_master`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'API-Key': token,
          },
        });

        const data = await response.json();
        if (data.status === 'success' && Array.isArray(data.data)) {
          const filterCategory = data.data
            .filter((category) => category.origin?.toLowerCase() === 'nexibles')
            .map((category) => ({
              id: category.id,
              name: category.name,
              bg_Img: category.bg_Img,
              cat_url: category.cat_url || '',
            }));
          setCategories(filterCategory);
          if (filterCategory.length > 0) {
            setSelectedCategory(filterCategory[0].id);
          }
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
  }, []);

  // Fetch product data
  const fetchProductData = useCallback(async (authToken, retries = 3) => {
    if (!authToken) {
      setError('Authentication token is missing.');
      return false;
    }

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
        if (data.status && Array.isArray(data.data)) {
          const targetProduct = data.data.find((p) => p.id === '122');
          if (!targetProduct) throw new Error('Product ID 122 not found');

          setProduct(targetProduct);

          const { minimum_width, maximum_width, minimum_length, maximum_length } = targetProduct;

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

          const materials = Array.isArray(targetProduct.pouch_media)
            ? targetProduct.pouch_media.map((m) => ({
                value: m.id,
                label: m.media_title,
                widths: m.media_widths ? m.media_widths.split(',') : [],
              }))
            : [];
          setMaterialOptions(materials);
          setSelectedMaterial(materials[0] || null);

          const mandatory = Array.isArray(targetProduct.pouch_postpress)
            ? targetProduct.pouch_postpress
<<<<<<< HEAD
<<<<<<< HEAD
              .filter((p) => p.mandatory_any_one)
              .map((p) => ({
                value: p.id,
                label: p.process_name,
              }))
=======
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                .filter((p) => p.mandatory_any_one && p.process_name !== 'Aplix Zipper')
                .map((p) => ({
                  value: p.id,
                  label: p.process_name,
                }))
<<<<<<< HEAD
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
            : [];
          setMandatoryProcesses(mandatory);
          setSelectedMandatoryProcess(mandatory[0] || null);

          const optional = Array.isArray(targetProduct.pouch_postpress)
            ? targetProduct.pouch_postpress
                .filter((p) => p.optional && !p.mandatory_any_one)
                .map((p) => ({
                  id: p.id,
                  name: p.process_name,
                }))
            : [];
          setOptionalProcesses(optional);

          const zippers = Array.isArray(targetProduct.pouch_postpress)
            ? targetProduct.pouch_postpress
<<<<<<< HEAD
<<<<<<< HEAD
              .filter((p) => p.mandatory_any_one)
              .map((p) => ({
                value: p.id,
                label: p.process_name,
              }))
=======
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                .filter((p) => p.mandatory_any_one && p.process_name !== 'Aplix Zipper')
                .map((p) => ({
                  value: p.id,
                  label: p.process_name,
                }))
<<<<<<< HEAD
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
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
  }, []);

  useEffect(() => {
    let isMounted = true;
<<<<<<< HEAD
=======
  
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
    const initialize = async () => {
      setLoading(true);
      setError(null);
      setIsAuthLoading(true);
<<<<<<< HEAD
=======
  
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
      if (!user) {
        router.push('/login');
        setIsAuthLoading(false);
        setLoading(false);
        return;
<<<<<<< HEAD
      }

      // Fetch a new token on every page refresh
      const authToken = await loginForThirdParty();
      if (!authToken && isMounted) {
        setError('Authentication failed.');
        setIsAuthLoading(false);
        setLoading(false);
        return;
      }

      if (isMounted) {
        const [productSuccess, categorySuccess] = await Promise.all([
          fetchProductData(authToken),
          fetchCategoryData(),
        ]);
        if (!productSuccess || !categorySuccess) {
          window.location.reload();
          return;
        }
      }

      if (isMounted) {
        setIsAuthLoading(false);
        setLoading(false);
      }
    };
  
    initialize();
=======
      }
  
      // Fetch a new token on every page refresh
      const authToken = await loginForThirdParty();
      if (!authToken && isMounted) {
        setError('Authentication failed.');
        setIsAuthLoading(false);
        setLoading(false);
        return;
      }
  
      if (isMounted) {
        const [productSuccess, categorySuccess] = await Promise.all([
          fetchProductData(authToken),
          fetchCategoryData(),
        ]);
        if (!productSuccess || !categorySuccess) {
          window.location.reload();
          return;
        }
      }
  
      if (isMounted) {
        setIsAuthLoading(false);
        setLoading(false);
      }
    };
  
    initialize();
  
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
    return () => {
      isMounted = false;
    };
  }, [user, router, loginForThirdParty, fetchProductData, fetchCategoryData]);

<<<<<<< HEAD
<<<<<<< HEAD
  // Reset selectedPouchOpening when category is Stand Up Pouch
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
  useEffect(() => {
    setIsSkuQuantityOpen(Array(quantity).fill(false));
  }, [quantity]);

  useEffect(() => {
    if (isQuotationGenerated) {
      setIsQuotationGenerated(false);
      setCostData(null);
    }
  }, [
    jobName,
    selectedCategory,
    selectedWidth,
    selectedLength,
    selectedMaterial,
    selectedMandatoryProcess,
    selectedSeal,
    selectedHangHole,
    selectedPouchOpening,
    selectedMultiProcesses,
    quantity,
    designNames,
    selectedQuantities,
  ]);

<<<<<<< HEAD
  // Handle multi-select process checkbox changes
=======
  useEffect(() => {
    setIsSkuQuantityOpen(Array(quantity).fill(false));
  }, [quantity]);

  useEffect(() => {
    if (isQuotationGenerated) {
      setIsQuotationGenerated(false);
      setCostData(null);
    }
  }, [
    jobName,
    selectedCategory,
    selectedWidth,
    selectedLength,
    selectedMaterial,
    selectedMandatoryProcess,
    selectedSeal,
    selectedHangHole,
    selectedPouchOpening,
    selectedMultiProcesses,
    quantity,
    designNames,
    selectedQuantities,
  ]);

>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
  const handleMultiProcessChange = (processId) => {
    setSelectedMultiProcesses((prev) =>
      prev.includes(processId)
        ? prev.filter((id) => id !== processId)
        : [...prev, processId]
    );
  };

  const handleQuantityChange = (index, value) => {
    if (index >= quantity) return;
    const updated = [...selectedQuantities];
    updated[index] = parseInt(value);
    setSelectedQuantities(updated);
  };

  const totalQuantity = selectedQuantities.reduce((a, b) => a + b, 0);

  const handleRequestQuotation = async () => {
    setIsQuotationLoading(true);
    setError(null);
  
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      let authToken = token || localStorage.getItem('token2');
      if (!authToken) {
        authToken = await loginForThirdParty();
        if (!authToken) throw new Error('No authentication token');
      }

=======
      // Always fetch a fresh token for critical actions
      const authToken = await loginForThirdParty();
      if (!authToken) throw new Error('Authentication token is missing.');
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
      // Always fetch a fresh token for critical actions
      const authToken = await loginForThirdParty();
      if (!authToken) throw new Error('Authentication token is missing.');
  
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
      if (!jobName) throw new Error('Project name is required');
      if (!selectedWidth || !selectedLength) throw new Error('Width and length are required');
      if (!selectedMaterial) throw new Error('Material is required');
      if (!selectedMandatoryProcess) throw new Error('Mandatory process is required');
<<<<<<< HEAD
<<<<<<< HEAD

      // Combine all selected optional processes
=======
  
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
      const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name;
      const normalizedCategoryName = categoryName?.trim().toLowerCase();
      const optionalProcessIds = [
        selectedSeal,
        selectedHangHole,
        normalizedCategoryName !== 'stand up pouch' ? selectedPouchOpening : null,
        ...selectedMultiProcesses,
      ].filter(Boolean);
<<<<<<< HEAD

=======
  
      const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name;
      const normalizedCategoryName = categoryName?.trim().toLowerCase();
      const optionalProcessIds = [
        selectedSeal,
        selectedHangHole,
        normalizedCategoryName !== 'stand up pouch' ? selectedPouchOpening : null,
        ...selectedMultiProcesses,
      ].filter(Boolean);
  
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
  
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
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
          optional_process: optionalProcessIds,
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
        setIsQuotationGenerated(true);
      } else {
        throw new Error(result.message || 'Failed to generate quotation.');
      }
    } catch (err) {
      console.error('Quotation error:', err);
      const errorMessage = err.message.includes('token')
        ? 'Authentication token is invalid or expired. Please try again.'
        : err.message;
      setError(errorMessage);
      toast.error(`Failed to generate quotation: ${errorMessage}`);
    } finally {
      setIsQuotationLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!costData || !product) {
      toast.error('Cannot add to cart: Missing cost or product data');
      return;
    }

    const totalCost = Number(costData.total_cost);
    if (isNaN(totalCost)) {
      toast.error('Invalid cost data');
      return;
    }

    const unitPrice = totalCost / totalQuantity;
    const totalPrice = totalCost;

    const selectedOptions = {
      width: { optionName: selectedWidth?.label || 'Not specified', price: 0 },
      length: { optionName: selectedLength?.label || 'Not specified', price: 0 },
      mandatoryProcess: { optionName: selectedMandatoryProcess?.label || 'Not specified', price: 0 },
      seal: { optionName: sealOptions.find((opt) => opt.value === selectedSeal)?.label || 'None', price: 0 },
      hangHole: { optionName: hangHoleOptions.find((opt) => opt.value === selectedHangHole)?.label || 'None', price: 0 },
      pouchOpening: { optionName: pouchOpeningOptions.find((opt) => opt.value === selectedPouchOpening)?.label || 'None', price: 0 },
      additionalOptions: {
        optionName: multiSelectOptions
          .filter((opt) => selectedMultiProcesses.includes(opt.id))
          .map((opt) => opt.name)
          .join(', ') || 'None',
        price: 0,
      },
    };

    const productToAdd = {
      id: product.id,
      name: jobName || product.title || 'Custom Pouch',
      category: categories.find((cat) => cat.id === selectedCategory)?.name || 'Pouches',
      image: `${NEXI_CDN_URL}/category/${categories.find((cat) => cat.id === selectedCategory)?.bg_Img || 'default-image.jpg'}`,
      price: unitPrice,
      quantity: totalQuantity,
      totalPrice: totalPrice,
      skuCount: quantity,
      material: selectedMaterial?.label || 'Not specified',
      selectedOptions,
    };

    dispatch(addToCart(productToAdd));
    toast.success('Product added to cart successfully!');
  };

  const normalizedCategoryName = useMemo(() => {
    const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name || '';
    return categoryName.trim().toLowerCase();
  }, [selectedCategory, categories]);

  const sealOptions = useMemo(
    () =>
      optionalProcesses
        .filter((p) => ['K-Seal', 'Radius Seal'].includes(p.name))
        .map((p) => ({ value: p.id, label: p.name })),
    [optionalProcesses]
  );

  const hangHoleOptions = useMemo(
    () =>
      optionalProcesses
        .filter((p) => ['D-Cut Handle Punch', 'Euro Hang Hole', 'Round Hang Hole'].includes(p.name))
        .map((p) => ({ value: p.id, label: p.name })),
    [optionalProcesses]
  );

  const pouchOpeningOptions = useMemo(
    () =>
      normalizedCategoryName !== 'stand up pouch'
        ? optionalProcesses
            .filter((p) => ['Pouch Opening Top', 'Pouch Opening Bottom'].includes(p.name))
            .map((p) => ({ value: p.id, label: p.name }))
        : [],
    [normalizedCategoryName, optionalProcesses]
  );

  const radiusSealId = sealOptions.find((s) => s.label === 'Radius Seal')?.value;
  const multiSelectOptions = useMemo(
    () =>
      optionalProcesses
        .filter((p) => {
          if (p.name === 'Round Corner') {
            return selectedSeal === radiusSealId;
          }
          return ['Tear Notch', 'Valve'].includes(p.name);
        })
        .map((p) => ({ id: p.id, name: p.name })),
    [optionalProcesses, selectedSeal, radiusSealId]
  );

  if (process.env.NODE_ENV === 'development') {
<<<<<<< HEAD
   // console.log('Selected Category ID:', selectedCategory);
    //console.log('Category Name:', categories.find((cat) => cat.id === selectedCategory)?.name || '');
    //console.log('Normalized Category Name:', normalizedCategoryName);
    //console.log('Pouch Opening Options:', pouchOpeningOptions);
=======
    console.log('Selected Category ID:', selectedCategory);
    console.log('Category Name:', categories.find((cat) => cat.id === selectedCategory)?.name || '');
    console.log('Normalized Category Name:', normalizedCategoryName);
    console.log('Pouch Opening Options:', pouchOpeningOptions);
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
    if (!sealOptions.some((s) => s.label === 'Radius Seal')) {
      console.warn('Warning: "Radius Seal" not found in optionalProcesses');
    }
    if (!multiSelectOptions.some((p) => p.name === 'Round Corner') && selectedSeal === radiusSealId) {
      console.warn('Warning: "Round Corner" not found in optionalProcesses when Radius Seal is selected');
    }
    if (normalizedCategoryName === 'stand up pouch' && pouchOpeningOptions.length > 0) {
      console.warn('Warning: Pouch Opening options should not be defined for Stand Up Pouch category');
    }
  }

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

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen bg-gray-50 py-12 px-6"><SkeletonLoader /></div>;

  if (error && !product) {
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
<<<<<<< HEAD
  }

  // Define optional process groups
  const sealOptions = optionalProcesses
    .filter((p) => ['K-Seal', 'Radius Seal'].includes(p.name))
    .map((p) => ({ value: p.id, label: p.name }));
  const hangHoleOptions = optionalProcesses
    .filter((p) => ['D-Cut Handle Punch', 'Euro Hang Hole', 'Round Hang Hole'].includes(p.name))
    .map((p) => ({ value: p.id, label: p.name }));
  // Only define pouchOpeningOptions if category is not Stand Up Pouch
  const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name;
  const pouchOpeningOptions = categoryName !== 'Stand Up Pouch'
    ? optionalProcesses
      .filter((p) => ['Pouch Opening Top', 'Pouch Opening Bottom'].includes(p.name))
      .map((p) => ({ value: p.id, label: p.name }))
    : [];

  // Define multi-select options, including Round Corner only if Radius Seal is selected
  const radiusSealId = sealOptions.find((s) => s.label === 'Radius Seal')?.value;
  const multiSelectOptions = optionalProcesses
    .filter((p) => {
      if (p.name === 'Round Corner') {
        return selectedSeal === radiusSealId;
      }
      return ['Tear Notch', 'Valve'].includes(p.name);
    })
    .map((p) => ({ id: p.id, name: p.name }));

  // Log warnings for debugging
  if (process.env.NODE_ENV === 'development') {
    if (!sealOptions.some((s) => s.label === 'Radius Seal')) {
      console.warn('Warning: "Radius Seal" not found in optionalProcesses');
    }
    if (!multiSelectOptions.some((p) => p.name === 'Round Corner') && selectedSeal === radiusSealId) {
      console.warn('Warning: "Round Corner" not found in optionalProcesses when Radius Seal is selected');
    }
    if (categoryName === 'Stand Up Pouch' && pouchOpeningOptions.length > 0) {
      console.warn('Warning: Pouch Opening options should not be defined for Stand Up Pouch category');
    }
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
  }

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
        <motion.div
          className="lg:w-2/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            variants={containerVariants}
            initial="motion"
            animate="visible"
          >
            <div className="p-8">
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

              <motion.div className="mb-8" variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Pouch Specifications
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Category</label>
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                          disabled={categories.length === 0}
                        >
                          <span>
                            {categories.find((cat) => cat.id === selectedCategory)?.name || 'Select category'}
                          </span>
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isCategoryOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            <div
                              className="p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setSelectedCategory('');
                                setIsCategoryOpen(false);
                              }}
                            >
                              Select category
                            </div>
                            {categories.map((category) => (
                              <div
                                key={category.id}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                  setSelectedCategory(category.id);
                                  if (category.name.trim().toLowerCase() === 'stand up pouch') {
                                    setSelectedPouchOpening('');
                                  }
                                  setIsCategoryOpen(false);
                                }}
                              >
                                {category.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {categories.length === 0 && (
                        <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Width</label>
<<<<<<< HEAD
<<<<<<< HEAD
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedWidth?.value || ''}
                        onChange={(e) => {
                          const selected = sizeOptions.widths.find((w) => w.value === parseInt(e.target.value));
                          setSelectedWidth(selected);
                        }}
                      >
                        <option value="" >
                          Select width
                        </option>
                        {sizeOptions.widths?.map((width, idx) => (
                          <option key={idx} value={width.value}>
                            {width.label}
                          </option>
                        ))}
                      </select>
=======
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                          onClick={() => setIsWidthOpen(!isWidthOpen)}
                        >
                          <span>{selectedWidth?.label || 'Select width'}</span>
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isWidthOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            <div
                              className="p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setSelectedWidth(null);
                                setIsWidthOpen(false);
                              }}
                            >
                              Select width
                            </div>
                            {sizeOptions.widths?.map((width, idx) => (
                              <div
                                key={idx}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                  setSelectedWidth(width);
                                  setIsWidthOpen(false);
                                }}
                              >
                                {width.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
<<<<<<< HEAD
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Length</label>
<<<<<<< HEAD
<<<<<<< HEAD
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedLength?.value || ''}
                        onChange={(e) => {
                          const selected = sizeOptions.lengths.find((l) => l.value === parseInt(e.target.value));
                          setSelectedLength(selected);
                        }}
                      >
                        <option value="" >
                          Select length
                        </option>
                        {sizeOptions.lengths?.map((length, idx) => (
                          <option key={idx} value={length.value}>
                            {length.label}
                          </option>
                        ))}
                      </select>
=======
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                          onClick={() => setIsLengthOpen(!isLengthOpen)}
                        >
                          <span>{selectedLength?.label || 'Select length'}</span>
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isLengthOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            <div
                              className="p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setSelectedLength(null);
                                setIsLengthOpen(false);
                              }}
                            >
                              Select length
                            </div>
                            {sizeOptions.lengths?.map((length, idx) => (
                              <div
                                key={idx}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                  setSelectedLength(length);
                                  setIsLengthOpen(false);
                                }}
                              >
                                {length.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
<<<<<<< HEAD
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Material</label>
<<<<<<< HEAD
<<<<<<< HEAD
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedMaterial?.value || ''}
                        onChange={(e) => {
                          const selected = materialOptions.find((m) => m.value === e.target.value);
                          setSelectedMaterial(selected);
                        }}
                      >
                        <option value="" >
                          Select material
                        </option>
                        {materialOptions.map((material, idx) => (
                          <option key={idx} value={material.value}>
                            {material.label}
                          </option>
                        ))}
                      </select>
=======
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                          onClick={() => setIsMaterialOpen(!isMaterialOpen)}
                        >
                          <span>{selectedMaterial?.label || 'Select material'}</span>
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isMaterialOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            <div
                              className="p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setSelectedMaterial(null);
                                setIsMaterialOpen(false);
                              }}
                            >
                              Select material
                            </div>
                            {materialOptions.map((material, idx) => (
                              <div
                                key={idx}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                  setSelectedMaterial(material);
                                  setIsMaterialOpen(false);
                                }}
                              >
                                {material.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
<<<<<<< HEAD
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                      {selectedMaterial && (
                        <p className="text-sm text-gray-500 mt-1">
                          Available widths: {selectedMaterial.widths.join(', ')} mm
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Mandatory Process</label>
<<<<<<< HEAD
<<<<<<< HEAD
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                        value={selectedMandatoryProcess?.value || ''}
                        onChange={(e) => {
                          const selected = mandatoryProcesses.find((p) => p.value === e.target.value);
                          setSelectedMandatoryProcess(selected);
                        }}
                      >
                        <option value="" >
                          Select mandatory process
                        </option>
                        {mandatoryProcesses
                          .filter((process) => process.label !== 'Aplix Zipper')
                          .map((process, idx) => (
                            <option key={idx} value={process.value}>
                              {process.label}
                            </option>
                          ))}
                      </select>
=======
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                          onClick={() => setIsMandatoryProcessOpen(!isMandatoryProcessOpen)}
                        >
                          <span>{selectedMandatoryProcess?.label || 'Select mandatory process'}</span>
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isMandatoryProcessOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            <div
                              className="p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setSelectedMandatoryProcess(null);
                                setIsMandatoryProcessOpen(false);
                              }}
                            >
                              Select mandatory process
                            </div>
                            {mandatoryProcesses
                              .filter((process) => process.label !== 'Aplix Zipper')
                              .map((process, idx) => (
                                <div
                                  key={idx}
                                  className="p-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedMandatoryProcess(process);
                                    setIsMandatoryProcessOpen(false);
                                  }}
                                >
                                  {process.label}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
<<<<<<< HEAD
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div className="mb-8" variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                  SKU Configuration
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Number of SKUs</label>
                    <div className="relative w-full md:w-1/2">
                      <button
                        type="button"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                        onClick={() => setIsQuantityOpen(!isQuantityOpen)}
                      >
                        <span>{quantity || 'Select number of SKUs'}</span>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isQuantityOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sku) => (
                            <div
                              key={sku}
                              className="p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setQuantity(sku);
                                setDesignNames(Array(sku).fill(''));
                                setSelectedQuantities(Array(sku).fill(500));
                                setIsQuantityOpen(false);
                              }}
                            >
                              {sku}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
                        <div key={index} className="mb-3 relative">
                          <button
                            type="button"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                            onClick={() => {
                              const updated = [...isSkuQuantityOpen];
                              updated[index] = !updated[index];
                              setIsSkuQuantityOpen(updated);
                            }}
                          >
                            <span>{selectedQuantities[index] ? `${selectedQuantities[index]} Pcs` : 'Select quantity'}</span>
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {isSkuQuantityOpen[index] && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                              {[500, 1000, 2000, 3000, 5000].map((qty) => (
                                <div
                                  key={qty}
                                  className="p-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    handleQuantityChange(index, qty);
                                    const updated = [...isSkuQuantityOpen];
                                    updated[index] = false;
                                    setIsSkuQuantityOpen(updated);
                                  }}
                                >
                                  {qty} Pcs
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {(sealOptions.length > 0 || hangHoleOptions.length > 0 || pouchOpeningOptions.length > 0 || multiSelectOptions.length > 0) && (
                <motion.div className="mb-8" variants={itemVariants}>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                    Optional Processes
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-xl space-y-6">
<<<<<<< HEAD
<<<<<<< HEAD
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {/* Seal Dropdown */}
                    {sealOptions.length > 0 && (
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Seal Type</label>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                          value={selectedSeal}
                          onChange={(e) => setSelectedSeal(e.target.value)}
                        >
                          <option value="">Select seal type</option>
                          {sealOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
=======
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {sealOptions.length > 0 && (
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Seal Type</label>
                          <div className="relative">
                            <button
                              type="button"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                              onClick={() => setIsSealOpen(!isSealOpen)}
                            >
                              <span>{sealOptions.find((opt) => opt.value === selectedSeal)?.label || 'Select seal type'}</span>
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isSealOpen && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                <div
                                  className="p-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedSeal('');
                                    setIsSealOpen(false);
                                  }}
                                >
                                  Select seal type
                                </div>
                                {sealOptions.map((option) => (
                                  <div
                                    key={option.value}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                      setSelectedSeal(option.value);
                                      setIsSealOpen(false);
                                    }}
                                  >
                                    {option.label}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e

                      {hangHoleOptions.length > 0 && (
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Hang Hole</label>
                          <div className="relative">
                            <button
                              type="button"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                              onClick={() => setIsHangHoleOpen(!isHangHoleOpen)}
                            >
                              <span>{hangHoleOptions.find((opt) => opt.value === selectedHangHole)?.label || 'Select hang hole'}</span>
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isHangHoleOpen && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                <div
                                  className="p-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedHangHole('');
                                    setIsHangHoleOpen(false);
                                  }}
                                >
                                  Select hang hole
                                </div>
                                {hangHoleOptions.map((option) => (
                                  <div
                                    key={option.value}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                      setSelectedHangHole(option.value);
                                      setIsHangHoleOpen(false);
                                    }}
                                  >
                                    {option.label}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {pouchOpeningOptions.length > 0 && selectedCategory && (
                        <div className={normalizedCategoryName === 'stand up pouch' ? 'hidden' : ''}>
                          <label className="block text-gray-700 font-medium mb-2">Pouch Opening</label>
                          <div className="relative">
                            <button
                              type="button"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                              onClick={() => setIsPouchOpeningOpen(!isPouchOpeningOpen)}
                            >
                              <span>{pouchOpeningOptions.find((opt) => opt.value === selectedPouchOpening)?.label || 'Select pouch opening'}</span>
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isPouchOpeningOpen && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                <div
                                  className="p-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedPouchOpening('');
                                    setIsPouchOpeningOpen(false);
                                  }}
                                >
                                  Select pouch opening
                                </div>
                                {pouchOpeningOptions.map((option) => (
                                  <div
                                    key={option.value}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                      setSelectedPouchOpening(option.value);
                                      setIsPouchOpeningOpen(false);
                                    }}
                                  >
                                    {option.label}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

<<<<<<< HEAD
                    {/* Multi-Select Checkboxes */}
=======
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {sealOptions.length > 0 && (
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Seal Type</label>
                          <div className="relative">
                            <button
                              type="button"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                              onClick={() => setIsSealOpen(!isSealOpen)}
                            >
                              <span>{sealOptions.find((opt) => opt.value === selectedSeal)?.label || 'Select seal type'}</span>
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isSealOpen && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                <div
                                  className="p-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedSeal('');
                                    setIsSealOpen(false);
                                  }}
                                >
                                  Select seal type
                                </div>
                                {sealOptions.map((option) => (
                                  <div
                                    key={option.value}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                      setSelectedSeal(option.value);
                                      setIsSealOpen(false);
                                    }}
                                  >
                                    {option.label}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {hangHoleOptions.length > 0 && (
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Hang Hole</label>
                          <div className="relative">
                            <button
                              type="button"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                              onClick={() => setIsHangHoleOpen(!isHangHoleOpen)}
                            >
                              <span>{hangHoleOptions.find((opt) => opt.value === selectedHangHole)?.label || 'Select hang hole'}</span>
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isHangHoleOpen && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                <div
                                  className="p-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedHangHole('');
                                    setIsHangHoleOpen(false);
                                  }}
                                >
                                  Select hang hole
                                </div>
                                {hangHoleOptions.map((option) => (
                                  <div
                                    key={option.value}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                      setSelectedHangHole(option.value);
                                      setIsHangHoleOpen(false);
                                    }}
                                  >
                                    {option.label}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {pouchOpeningOptions.length > 0 && selectedCategory && (
                        <div className={normalizedCategoryName === 'stand up pouch' ? 'hidden' : ''}>
                          <label className="block text-gray-700 font-medium mb-2">Pouch Opening</label>
                          <div className="relative">
                            <button
                              type="button"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
                              onClick={() => setIsPouchOpeningOpen(!isPouchOpeningOpen)}
                            >
                              <span>{pouchOpeningOptions.find((opt) => opt.value === selectedPouchOpening)?.label || 'Select pouch opening'}</span>
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isPouchOpeningOpen && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                <div
                                  className="p-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedPouchOpening('');
                                    setIsPouchOpeningOpen(false);
                                  }}
                                >
                                  Select pouch opening
                                </div>
                                {pouchOpeningOptions.map((option) => (
                                  <div
                                    key={option.value}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                      setSelectedPouchOpening(option.value);
                                      setIsPouchOpeningOpen(false);
                                    }}
                                  >
                                    {option.label}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                    {multiSelectOptions.length > 0 && (
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Additional Options</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {multiSelectOptions.map((process) => (
                            <label
                              key={process.id}
                              className="flex items-center space-x-3 text-gray-700"
                            >
                              <input
                                type="checkbox"
                                value={process.id}
                                checked={selectedMultiProcesses.includes(process.id)}
                                onChange={() => handleMultiProcessChange(process.id)}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <span>{process.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="lg:w-1/4" variants={itemVariants}>
          <div className="sticky top-16">
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-40 w-48">
                  {selectedCategory && categories.length > 0 ? (
                    <Image
                      src={`${NEXI_CDN_URL}/category/${categories.find((cat) => cat.id === selectedCategory)?.bg_Img || 'default-image.jpg'}`}
                      alt={
                        categories.find((cat) => cat.id === selectedCategory)?.name || 'Pouch Image'
                      }
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                      onError={(e) => {
                        e.target.src = `${NEXI_CDN_URL}/category/default-image.jpg`;
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Select a category</span>
                    </div>
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
                  {selectedMaterial?.label || 'Not selected'} •{' '}
                  {selectedMandatoryProcess?.label || 'Not selected'}
<<<<<<< HEAD
                </p>
                <p>
                  Category: {categories.find((cat) => cat.id === selectedCategory)?.name || 'Not selected'}
                </p>
<<<<<<< HEAD
                <p>Category: {categoryName || 'Not selected'}</p>
=======
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
                </p>
                <p>
                  Category: {categories.find((cat) => cat.id === selectedCategory)?.name || 'Not selected'}
                </p>
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
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
<<<<<<< HEAD
<<<<<<< HEAD
                <motion.button
                  className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${isQuotationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  whileHover={{ scale: isQuotationLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isQuotationLoading ? 1 : 0.98 }}
                  onClick={handleRequestQuotation}
                  disabled={isQuotationLoading}
                >
                  {isQuotationLoading ? 'Generating...' : 'Request Quotation'}
                </motion.button>
=======
                {isQuotationGenerated ? (
                  <motion.button
                    className="w-full py-3 px-4 font-medium rounded-lg bg-[#103b60] text-white hover:bg-[#0a2b47] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#103b60]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </motion.button>
                ) : (
                  <motion.button
                    className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                      isQuotationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
                    }`}
=======
                {isQuotationGenerated ? (
                  <motion.button
                    className="w-full py-3 px-4 font-medium rounded-lg bg-[#103b60] text-white hover:bg-[#0a2b47] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#103b60]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </motion.button>
                ) : (
                  <motion.button
                    className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                      isQuotationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
                    }`}
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
                    whileHover={{ scale: isQuotationLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isQuotationLoading ? 1 : 0.98 }}
                    onClick={handleRequestQuotation}
                    disabled={isQuotationLoading}
                  >
                    {isQuotationLoading ? 'Generating...' : 'Request Quotation'}
                  </motion.button>
                )}
<<<<<<< HEAD
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Configuration;


















// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { useAuth } from '@/utils/authContext';
// import { useRouter } from 'next/navigation';
// import standuppouch from '@/../public/product/standuppouch.jpg';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../redux/store/cartSlice';
// import { toast } from 'react-toastify';

// const Configuration = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [isAuthLoading, setIsAuthLoading] = useState(true);
//   const [product, setProduct] = useState(null);
//   const [jobName, setJobName] = useState('');
//   const [sizeOptions, setSizeOptions] = useState({ widths: [], lengths: [] });
//   const [selectedWidth, setSelectedWidth] = useState(null);
//   const [selectedLength, setSelectedLength] = useState(null);
//   const [materialOptions, setMaterialOptions] = useState([]);
//   const [selectedMaterial, setSelectedMaterial] = useState(null);
//   const [mandatoryProcesses, setMandatoryProcesses] = useState([]);
//   const [selectedMandatoryProcess, setSelectedMandatoryProcess] = useState(null);
//   const [optionalProcesses, setOptionalProcesses] = useState([]);
//   const [selectedSeal, setSelectedSeal] = useState('');
//   const [selectedHangHole, setSelectedHangHole] = useState('');
//   const [selectedPouchOpening, setSelectedPouchOpening] = useState('');
//   const [selectedMultiProcesses, setSelectedMultiProcesses] = useState([]);
//   const [zipperOptions, setZipperOptions] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [designNames, setDesignNames] = useState(['']);
//   const [selectedQuantities, setSelectedQuantities] = useState([500]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [costData, setCostData] = useState(null);
//   const [isQuotationLoading, setIsQuotationLoading] = useState(false);
//   const [isQuotationGenerated, setIsQuotationGenerated] = useState(false);
//   const [token, setToken] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [isWidthOpen, setIsWidthOpen] = useState(false);
//   const [isLengthOpen, setIsLengthOpen] = useState(false);
//   const [isMaterialOpen, setIsMaterialOpen] = useState(false);
//   const [isMandatoryProcessOpen, setIsMandatoryProcessOpen] = useState(false);
//   const [isQuantityOpen, setIsQuantityOpen] = useState(false);
//   const [isSealOpen, setIsSealOpen] = useState(false);
//   const [isHangHoleOpen, setIsHangHoleOpen] = useState(false);
//   const [isPouchOpeningOpen, setIsPouchOpeningOpen] = useState(false);
//   const [isSkuQuantityOpen, setIsSkuQuantityOpen] = useState(Array(quantity).fill(false));

//   const NEXI_CDN_URL = process.env.NEXT_NEXIBLES_CDN_URL || "https://cdn.nexibles.com";

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.5 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   };

//   // Login to get a fresh token on every page refresh
//   const loginForThirdParty = useCallback(async (retries = 3) => {
//     setToken(null); // Clear existing token in state
  
//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         // Ideally, move this to a secure backend API
//         const response = await fetch('https://nexiblesapp.barecms.com/proxy?r=user/authenticate', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email: process.env.NEXT_PUBLIC_API_EMAIL || 'sales@artnext.in',
//             password: process.env.NEXT_PUBLIC_API_PASSWORD || 'Artnext@1',
//             subdomain: 'nexibles',
//             otp: false,
//             ipaddress: process.env.NEXT_PUBLIC_IP_ADDRESS || '58.84.60.235',
//           }),
//         });
  
//         const result = await response.json();
//         if (result.status && result.data?.token) {
//           const newToken = result.data.token;
//           setToken(newToken);
//           return newToken;
//         } else {
//           throw new Error(result.message || 'Login failed');
//         }
//       } catch (err) {
//         console.error(`Authentication attempt ${attempt} failed:`, err.message);
//         if (attempt === retries) {
//           setError('Failed to authenticate after multiple attempts.');
//           return null;
//         }
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }
//   }, []);

//   // Fetch category data
//   const fetchCategoryData = useCallback(async (retries = 3) => {
//     const APIURL = process.env.NEXT_PUBLIC_API_URL;
//     const token = process.env.NEXT_PUBLIC_API_KEY;

//     if (!APIURL || !token) {
//       setError('API URL or API Key is missing.');
//       return false;
//     }

//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         const response = await fetch(`${APIURL}/api/category_master`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'API-Key': token,
//           },
//         });

//         const data = await response.json();
//         if (data.status === 'success' && Array.isArray(data.data)) {
//           const filterCategory = data.data
//             .filter((category) => category.origin?.toLowerCase() === 'nexibles')
//             .map((category) => ({
//               id: category.id,
//               name: category.name,
//               bg_Img: category.bg_Img,
//               cat_url: category.cat_url || '',
//             }));
//           setCategories(filterCategory);
//           if (filterCategory.length > 0) {
//             setSelectedCategory(filterCategory[0].id);
//           }
//           return true;
//         } else {
//           throw new Error(data.error || 'Failed to fetch category data');
//         }
//       } catch (err) {
//         if (attempt === retries) {
//           setError(err.message || 'Error fetching category data');
//           return false;
//         }
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }
//   }, []);

//   // Fetch product data
//   const fetchProductData = useCallback(async (authToken, retries = 3) => {
//     if (!authToken) {
//       setError('Authentication token is missing.');
//       return false;
//     }

//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         const response = await fetch(
//           'https://nexiblesapp.barecms.com/proxy?r=products/get-product-list&product_type=8&press_id=82&limit=10&offset=0',
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//               Environment: 'frontdesk',
//             },
//           }
//         );

//         const data = await response.json();
//         if (data.status && Array.isArray(data.data)) {
//           const targetProduct = data.data.find((p) => p.id === '122');
//           if (!targetProduct) throw new Error('Product ID 122 not found');

//           setProduct(targetProduct);

//           const { minimum_width, maximum_width, minimum_length, maximum_length } = targetProduct;

//           if (
//             !minimum_width ||
//             !maximum_width ||
//             !minimum_length ||
//             !maximum_length ||
//             isNaN(parseInt(minimum_width)) ||
//             isNaN(parseInt(maximum_width)) ||
//             isNaN(parseInt(minimum_length)) ||
//             isNaN(parseInt(maximum_length))
//           ) {
//             throw new Error('Invalid size parameters in product data');
//           }

//           const widthStep = (parseInt(maximum_width) - parseInt(minimum_width)) / 9;
//           const lengthStep = (parseInt(maximum_length) - parseInt(minimum_length)) / 9;
//           const widths = Array.from({ length: 10 }, (_, i) => {
//             const width = Math.round(parseInt(minimum_width) + i * widthStep);
//             return { value: width, label: `${width} mm` };
//           });
//           const lengths = Array.from({ length: 10 }, (_, i) => {
//             const length = Math.round(parseInt(minimum_length) + i * lengthStep);
//             return { value: length, label: `${length} mm` };
//           });
//           setSizeOptions({ widths, lengths });
//           setSelectedWidth(widths[0] || null);
//           setSelectedLength(lengths[0] || null);

//           const materials = Array.isArray(targetProduct.pouch_media)
//             ? targetProduct.pouch_media.map((m) => ({
//                 value: m.id,
//                 label: m.media_title,
//                 widths: m.media_widths ? m.media_widths.split(',') : [],
//               }))
//             : [];
//           setMaterialOptions(materials);
//           setSelectedMaterial(materials[0] || null);

//           const mandatory = Array.isArray(targetProduct.pouch_postpress)
//             ? targetProduct.pouch_postpress
//                 .filter((p) => p.mandatory_any_one && p.process_name !== 'Aplix Zipper')
//                 .map((p) => ({
//                   value: p.id,
//                   label: p.process_name,
//                 }))
//             : [];
//           setMandatoryProcesses(mandatory);
//           setSelectedMandatoryProcess(mandatory[0] || null);

//           const optional = Array.isArray(targetProduct.pouch_postpress)
//             ? targetProduct.pouch_postpress
//                 .filter((p) => p.optional && !p.mandatory_any_one)
//                 .map((p) => ({
//                   id: p.id,
//                   name: p.process_name,
//                 }))
//             : [];
//           setOptionalProcesses(optional);

//           const zippers = Array.isArray(targetProduct.pouch_postpress)
//             ? targetProduct.pouch_postpress
//                 .filter((p) => p.mandatory_any_one && p.process_name !== 'Aplix Zipper')
//                 .map((p) => ({
//                   value: p.id,
//                   label: p.process_name,
//                 }))
//             : [];
//           setZipperOptions(zippers);

//           return true;
//         } else {
//           throw new Error(data.message || 'Failed to fetch product data');
//         }
//       } catch (err) {
//         if (attempt === retries) {
//           setError(err.message);
//           return false;
//         }
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }
//   }, []);

//   useEffect(() => {
//     let isMounted = true;
  
//     const initialize = async () => {
//       setLoading(true);
//       setError(null);
//       setIsAuthLoading(true);
  
//       if (!user) {
//         router.push('/login');
//         setIsAuthLoading(false);
//         setLoading(false);
//         return;
//       }
  
//       // Fetch a new token on every page refresh
//       const authToken = await loginForThirdParty();
//       if (!authToken && isMounted) {
//         setError('Authentication failed.');
//         setIsAuthLoading(false);
//         setLoading(false);
//         return;
//       }
  
//       if (isMounted) {
//         const [productSuccess, categorySuccess] = await Promise.all([
//           fetchProductData(authToken),
//           fetchCategoryData(),
//         ]);
//         if (!productSuccess || !categorySuccess) {
//           setError('Failed to load product or category data.');
//         }
//       }
  
//       if (isMounted) {
//         setIsAuthLoading(false);
//         setLoading(false);
//       }
//     };
  
//     initialize();
  
//     return () => {
//       isMounted = false;
//     };
//   }, [user, router, loginForThirdParty, fetchProductData, fetchCategoryData]);

//   useEffect(() => {
//     setIsSkuQuantityOpen(Array(quantity).fill(false));
//   }, [quantity]);

//   useEffect(() => {
//     if (isQuotationGenerated) {
//       setIsQuotationGenerated(false);
//       setCostData(null);
//     }
//   }, [
//     jobName,
//     selectedCategory,
//     selectedWidth,
//     selectedLength,
//     selectedMaterial,
//     selectedMandatoryProcess,
//     selectedSeal,
//     selectedHangHole,
//     selectedPouchOpening,
//     selectedMultiProcesses,
//     quantity,
//     designNames,
//     selectedQuantities,
//   ]);

//   const handleMultiProcessChange = (processId) => {
//     setSelectedMultiProcesses((prev) =>
//       prev.includes(processId)
//         ? prev.filter((id) => id !== processId)
//         : [...prev, processId]
//     );
//   };

//   const handleQuantityChange = (index, value) => {
//     if (index >= quantity) return;
//     const updated = [...selectedQuantities];
//     updated[index] = parseInt(value);
//     setSelectedQuantities(updated);
//   };

//   const totalQuantity = selectedQuantities.reduce((a, b) => a + b, 0);

//   const handleRequestQuotation = async () => {
//     setIsQuotationLoading(true);
//     setError(null);
  
//     try {
//       // Always fetch a fresh token for critical actions
//       const authToken = await loginForThirdParty();
//       if (!authToken) throw new Error('Authentication token is missing.');
  
//       if (!jobName) throw new Error('Project name is required');
//       if (!selectedWidth || !selectedLength) throw new Error('Width and length are required');
//       if (!selectedMaterial) throw new Error('Material is required');
//       if (!selectedMandatoryProcess) throw new Error('Mandatory process is required');
  
//       const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name;
//       const normalizedCategoryName = categoryName?.trim().toLowerCase();
//       const optionalProcessIds = [
//         selectedSeal,
//         selectedHangHole,
//         normalizedCategoryName !== 'stand up pouch' ? selectedPouchOpening : null,
//         ...selectedMultiProcesses,
//       ].filter(Boolean);
  
//       const payload = {
//         formData: {
//           job_name: jobName || 'Untitled Project',
//           quantity_one: totalQuantity.toString(),
//           quantity_two: '0',
//           quantity_three: '0',
//           length: selectedLength?.value.toString() || '',
//           width: selectedWidth?.value.toString() || '',
//           no_of_sku: quantity.toString(),
//           pouch_printing_color: '7',
//           media_id: selectedMaterial?.value || '',
//           media_0: '',
//           media_1: '',
//           media_2: '',
//           media_3: '',
//           gusset_size: '3',
//           gusset_color: '7',
//           seal_size: '',
//           mandatory_one_process: selectedMandatoryProcess?.value || '',
//           optional_process: optionalProcessIds,
//           type: 'basic',
//         },
//         productId: '122',
//         printingTypeId: '8',
//         customerId: '26176',
//       };
  
//       const response = await fetch(
//         'https://nexiblesapp.barecms.com/proxy?r=flexible-pouch/save-requirement&press_id=82',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${authToken}`,
//             Environment: 'frontdesk',
//           },
//           body: JSON.stringify(payload),
//         }
//       );
  
//       const result = await response.json();
//       if (result.status && result.data?.costing_data?.length > 0) {
//         setCostData(result.data.costing_data[0]);
//         setIsQuotationGenerated(true);
//       } else {
//         throw new Error(result.message || 'Failed to generate quotation.');
//       }
//     } catch (err) {
//       console.error('Quotation error:', err);
//       const errorMessage = err.message.includes('token')
//         ? 'Authentication token is invalid or expired. Please try again.'
//         : err.message;
//       setError(errorMessage);
//       toast.error(`Failed to generate quotation: ${errorMessage}`);
//     } finally {
//       setIsQuotationLoading(false);
//     }
//   };

//   const handleAddToCart = () => {
//     if (!costData || !product) {
//       toast.error('Cannot add to cart: Missing cost or product data');
//       return;
//     }

//     const totalCost = Number(costData.total_cost);
//     if (isNaN(totalCost)) {
//       toast.error('Invalid cost data');
//       return;
//     }

//     const unitPrice = totalCost / totalQuantity;
//     const totalPrice = totalCost;

//     const selectedOptions = {
//       width: { optionName: selectedWidth?.label || 'Not specified', price: 0 },
//       length: { optionName: selectedLength?.label || 'Not specified', price: 0 },
//       mandatoryProcess: { optionName: selectedMandatoryProcess?.label || 'Not specified', price: 0 },
//       seal: { optionName: sealOptions.find((opt) => opt.value === selectedSeal)?.label || 'None', price: 0 },
//       hangHole: { optionName: hangHoleOptions.find((opt) => opt.value === selectedHangHole)?.label || 'None', price: 0 },
//       pouchOpening: { optionName: pouchOpeningOptions.find((opt) => opt.value === selectedPouchOpening)?.label || 'None', price: 0 },
//       additionalOptions: {
//         optionName: multiSelectOptions
//           .filter((opt) => selectedMultiProcesses.includes(opt.id))
//           .map((opt) => opt.name)
//           .join(', ') || 'None',
//         price: 0,
//       },
//     };

//     const productToAdd = {
//       id: product.id,
//       name: jobName || product.title || 'Custom Pouch',
//       category: categories.find((cat) => cat.id === selectedCategory)?.name || 'Pouches',
//       image: `${NEXI_CDN_URL}/category/${categories.find((cat) => cat.id === selectedCategory)?.bg_Img || 'default-image.jpg'}`,
//       price: unitPrice,
//       quantity: totalQuantity,
//       totalPrice: totalPrice,
//       skuCount: quantity,
//       material: selectedMaterial?.label || 'Not specified',
//       selectedOptions,
//     };

//     dispatch(addToCart(productToAdd));
//     toast.success('Product added to cart successfully!');
//   };

//   const normalizedCategoryName = useMemo(() => {
//     const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name || '';
//     return categoryName.trim().toLowerCase();
//   }, [selectedCategory, categories]);

//   const sealOptions = useMemo(
//     () =>
//       optionalProcesses
//         .filter((p) => ['K-Seal', 'Radius Seal'].includes(p.name))
//         .map((p) => ({ value: p.id, label: p.name })),
//     [optionalProcesses]
//   );

//   const hangHoleOptions = useMemo(
//     () =>
//       optionalProcesses
//         .filter((p) => ['D-Cut Handle Punch', 'Euro Hang Hole', 'Round Hang Hole'].includes(p.name))
//         .map((p) => ({ value: p.id, label: p.name })),
//     [optionalProcesses]
//   );

//   const pouchOpeningOptions = useMemo(
//     () =>
//       normalizedCategoryName !== 'stand up pouch'
//         ? optionalProcesses
//             .filter((p) => ['Pouch Opening Top', 'Pouch Opening Bottom'].includes(p.name))
//             .map((p) => ({ value: p.id, label: p.name }))
//         : [],
//     [normalizedCategoryName, optionalProcesses]
//   );

//   const radiusSealId = sealOptions.find((s) => s.label === 'Radius Seal')?.value;
//   const multiSelectOptions = useMemo(
//     () =>
//       optionalProcesses
//         .filter((p) => {
//           if (p.name === 'Round Corner') {
//             return selectedSeal === radiusSealId;
//           }
//           return ['Tear Notch', 'Valve'].includes(p.name);
//         })
//         .map((p) => ({ id: p.id, name: p.name })),
//     [optionalProcesses, selectedSeal, radiusSealId]
//   );

//   if (process.env.NODE_ENV === 'development') {
//     console.log('Selected Category ID:', selectedCategory);
//     console.log('Category Name:', categories.find((cat) => cat.id === selectedCategory)?.name || '');
//     console.log('Normalized Category Name:', normalizedCategoryName);
//     console.log('Pouch Opening Options:', pouchOpeningOptions);
//     if (!sealOptions.some((s) => s.label === 'Radius Seal')) {
//       console.warn('Warning: "Radius Seal" not found in optionalProcesses');
//     }
//     if (!multiSelectOptions.some((p) => p.name === 'Round Corner') && selectedSeal === radiusSealId) {
//       console.warn('Warning: "Round Corner" not found in optionalProcesses when Radius Seal is selected');
//     }
//     if (normalizedCategoryName === 'stand up pouch' && pouchOpeningOptions.length > 0) {
//       console.warn('Warning: Pouch Opening options should not be defined for Stand Up Pouch category');
//     }
//   }

//   const SkeletonLoader = () => (
//     <div className="animate-pulse space-y-6">
//       <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-2/3 space-y-6">
//           <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
//             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//             <div className="h-12 bg-gray-200 rounded"></div>
//             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//             </div>
//           </div>
//         </div>
//         <div className="lg:w-1/4">
//           <div className="bg-gray-50 rounded-xl p-6 space-y-4">
//             <div className="h-40 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
//           </div>
//           <div className="bg-white rounded-xl p-6 mt-6 space-y-4">
//             <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             <div className="h-4 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded"></div>
//             <div className="h-12 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (isAuthLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (loading) return <div className="min-h-screen bg-gray-50 py-12 px-6"><SkeletonLoader /></div>;

//   if (error && !product) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-6">
//         <div className="text-center p-4 text-red-500 bg-red-50 rounded-lg max-w-md mx-auto">
//           {error}
//           <button
//             className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
//             onClick={() => window.location.reload()}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
//       <Head>
//         <title>Custom Pouches | Configuration Tool</title>
//         <meta name="description" content="Configure your custom pouches with our interactive tool" />
//       </Head>

//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold text-gray-800 mb-2">Pouch Configuration Tool</h1>
//         <p className="text-lg text-gray-600">Design your perfect packaging solution</p>
//       </motion.div>

//       <div className="flex flex-col lg:flex-row justify-center mx-auto gap-8">
//         <motion.div
//           className="lg:w-2/3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div
//             className="bg-white rounded-2xl shadow-xl overflow-hidden"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <div className="p-8">
//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
//                   Project Details
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <label className="block text-gray-700 font-medium mb-2">Project Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter your project name"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
//                     value={jobName}
//                     onChange={(e) => setJobName(e.target.value)}
//                   />
//                 </div>
//               </motion.div>

//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
//                   Pouch Specifications
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Category</label>
//                       <div className="relative">
//                         <button
//                           type="button"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
//                           onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//                           disabled={categories.length === 0}
//                         >
//                           <span>
//                             {categories.find((cat) => cat.id === selectedCategory)?.name || 'Select category'}
//                           </span>
//                           <svg
//                             className="w-5 h-5 text-gray-400"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </button>
//                         {isCategoryOpen && (
//                           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
//                             <div
//                               className="p-2 cursor-pointer hover:bg-gray-100"
//                               onClick={() => {
//                                 setSelectedCategory('');
//                                 setIsCategoryOpen(false);
//                               }}
//                             >
//                               Select category
//                             </div>
//                             {categories.map((category) => (
//                               <div
//                                 key={category.id}
//                                 className="p-2 cursor-pointer hover:bg-gray-100"
//                                 onClick={() => {
//                                   setSelectedCategory(category.id);
//                                   if (category.name.trim().toLowerCase() === 'stand up pouch') {
//                                     setSelectedPouchOpening('');
//                                   }
//                                   setIsCategoryOpen(false);
//                                 }}
//                               >
//                                 {category.name}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                       {categories.length === 0 && (
//                         <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Width</label>
//                       <div className="relative">
//                         <button
//                           type="button"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
//                           onClick={() => setIsWidthOpen(!isWidthOpen)}
//                         >
//                           <span>{selectedWidth?.label || 'Select width'}</span>
//                           <svg
//                             className="w-5 h-5 text-gray-400"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </button>
//                         {isWidthOpen && (
//                           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
//                             <div
//                               className="p-2 cursor-pointer hover:bg-gray-100"
//                               onClick={() => {
//                                 setSelectedWidth(null);
//                                 setIsWidthOpen(false);
//                               }}
//                             >
//                               Select width
//                             </div>
//                             {sizeOptions.widths?.map((width, idx) => (
//                               <div
//                                 key={idx}
//                                 className="p-2 cursor-pointer hover:bg-gray-100"
//                                 onClick={() => {
//                                   setSelectedWidth(width);
//                                   setIsWidthOpen(false);
//                                 }}
//                               >
//                                 {width.label}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Length</label>
//                       <div className="relative">
//                         <button
//                           type="button"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
//                           onClick={() => setIsLengthOpen(!isLengthOpen)}
//                         >
//                           <span>{selectedLength?.label || 'Select length'}</span>
//                           <svg
//                             className="w-5 h-5 text-gray-400"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </button>
//                         {isLengthOpen && (
//                           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
//                             <div
//                               className="p-2 cursor-pointer hover:bg-gray-100"
//                               onClick={() => {
//                                 setSelectedLength(null);
//                                 setIsLengthOpen(false);
//                               }}
//                             >
//                               Select length
//                             </div>
//                             {sizeOptions.lengths?.map((length, idx) => (
//                               <div
//                                 key={idx}
//                                 className="p-2 cursor-pointer hover:bg-gray-100"
//                                 onClick={() => {
//                                   setSelectedLength(length);
//                                   setIsLengthOpen(false);
//                                 }}
//                               >
//                                 {length.label}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Material</label>
//                       <div className="relative">
//                         <button
//                           type="button"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
//                           onClick={() => setIsMaterialOpen(!isMaterialOpen)}
//                         >
//                           <span>{selectedMaterial?.label || 'Select material'}</span>
//                           <svg
//                             className="w-5 h-5 text-gray-400"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </button>
//                         {isMaterialOpen && (
//                           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
//                             <div
//                               className="p-2 cursor-pointer hover:bg-gray-100"
//                               onClick={() => {
//                                 setSelectedMaterial(null);
//                                 setIsMaterialOpen(false);
//                               }}
//                             >
//                               Select material
//                             </div>
//                             {materialOptions.map((material, idx) => (
//                               <div
//                                 key={idx}
//                                 className="p-2 cursor-pointer hover:bg-gray-100"
//                                 onClick={() => {
//                                   setSelectedMaterial(material);
//                                   setIsMaterialOpen(false);
//                                 }}
//                               >
//                                 {material.label}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                       {selectedMaterial && (
//                         <p className="text-sm text-gray-500 mt-1">
//                           Available widths: {selectedMaterial.widths.join(', ')} mm
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Mandatory Process</label>
//                       <div className="relative">
//                         <button
//                           type="button"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
//                           onClick={() => setIsMandatoryProcessOpen(!isMandatoryProcessOpen)}
//                         >
//                           <span>{selectedMandatoryProcess?.label || 'Select mandatory process'}</span>
//                           <svg
//                             className="w-5 h-5 text-gray-400"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </button>
//                         {isMandatoryProcessOpen && (
//                           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
//                             <div
//                               className="p-2 cursor-pointer hover:bg-gray-100"
//                               onClick={() => {
//                                 setSelectedMandatoryProcess(null);
//                                 setIsMandatoryProcessOpen(false);
//                               }}
//                             >
//                               Select mandatory process
//                             </div>
//                             {mandatoryProcesses
//                               .filter((process) => process.label !== 'Aplix Zipper')
//                               .map((process, idx) => (
//                                 <div
//                                   key={idx}
//                                   className="p-2 cursor-pointer hover:bg-gray-100"
//                                   onClick={() => {
//                                     setSelectedMandatoryProcess(process);
//                                     setIsMandatoryProcessOpen(false);
//                                   }}
//                                 >
//                                   {process.label}
//                                 </div>
//                               ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
//                   SKU Configuration
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-medium mb-2">Number of SKUs</label>
//                     <div className="relative w-full md:w-1/2">
//                       <button
//                         type="button"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
//                         onClick={() => setIsQuantityOpen(!isQuantityOpen)}
//                       >
//                         <span>{quantity || 'Select number of SKUs'}</span>
//                         <svg
//                           className="w-5 h-5 text-gray-400"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </button>
//                       {isQuantityOpen && (
//                         <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
//                           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sku) => (
//                             <div
//                               key={sku}
//                               className="p-2 cursor-pointer hover:bg-gray-100"
//                               onClick={() => {
//                                 setQuantity(sku);
//                                 setDesignNames(Array(sku).fill(''));
//                                 setSelectedQuantities(Array(sku).fill(500));
//                                 setIsQuantityOpen(false);
//                               }}
//                             >
//                               {sku}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Design Names</label>
//                       {[...Array(quantity)].map((_, index) => (
//                         <div key={index} className="mb-3">
//                           <input
//                             type="text"
//                             placeholder={`Design ${index + 1} name`}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
//                             value={designNames[index] || ''}
//                             onChange={(e) => {
//                               const updated = [...designNames];
//                               updated[index] = e.target.value;
//                               setDesignNames(updated);
//                             }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Quantity</label>
//                       {[...Array(quantity)].map((_, index) => (
//                         <div key={index} className="mb-3 relative">
//                           <button
//                             type="button"
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
//                             onClick={() => {
//                               const updated = [...isSkuQuantityOpen];
//                               updated[index] = !updated[index];
//                               setIsSkuQuantityOpen(updated);
//                             }}
//                           >
//                             <span>{selectedQuantities[index] ? `${selectedQuantities[index]} Pcs` : 'Select quantity'}</span>
//                             <svg
//                               className="w-5 h-5 text-gray-400"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                           </button>
//                           {isSkuQuantityOpen[index] && (
//                             <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
//                               {[500, 1000, 2000, 3000, 5000].map((qty) => (
//                                 <div
//                                   key={qty}
//                                   className="p-2 cursor-pointer hover:bg-gray-100"
//                                   onClick={() => {
//                                     handleQuantityChange(index, qty);
//                                     const updated = [...isSkuQuantityOpen];
//                                     updated[index] = false;
//                                     setIsSkuQuantityOpen(updated);
//                                   }}
//                                 >
//                                   {qty} Pcs
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {(sealOptions.length > 0 || hangHoleOptions.length > 0 || pouchOpeningOptions.length > 0 || multiSelectOptions.length > 0) && (
//                 <motion.div className="mb-8" variants={itemVariants}>
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                     <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
//                     Optional Processes
//                   </h2>
//                   <div className="bg-gray-50 p-6 rounded-xl space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       {sealOptions.length > 0 && (
//                         <div>
//                           <label className="block text-gray-700 font-medium mb-2">Seal Type</label>
//                           <div className="relative">
//                             <button
//                               type="button"
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
//                               onClick={() => setIsSealOpen(!isSealOpen)}
//                             >
//                               <span>{sealOptions.find((opt) => opt.value === selectedSeal)?.label || 'Select seal type'}</span>
//                               <svg
//                                 className="w-5 h-5 text-gray-400"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                               </svg>
//                             </button>
//                             {isSealOpen && (
//                               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
//                                 <div
//                                   className="p-2 cursor-pointer hover:bg-gray-100"
//                                   onClick={() => {
//                                     setSelectedSeal('');
//                                     setIsSealOpen(false);
//                                   }}
//                                 >
//                                   Select seal type
//                                 </div>
//                                 {sealOptions.map((option) => (
//                                   <div
//                                     key={option.value}
//                                     className="p-2 cursor-pointer hover:bg-gray-100"
//                                     onClick={() => {
//                                       setSelectedSeal(option.value);
//                                       setIsSealOpen(false);
//                                     }}
//                                   >
//                                     {option.label}
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {hangHoleOptions.length > 0 && (
//                         <div>
//                           <label className="block text-gray-700 font-medium mb-2">Hang Hole</label>
//                           <div className="relative">
//                             <button
//                               type="button"
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
//                               onClick={() => setIsHangHoleOpen(!isHangHoleOpen)}
//                             >
//                               <span>{hangHoleOptions.find((opt) => opt.value === selectedHangHole)?.label || 'Select hang hole'}</span>
//                               <svg
//                                 className="w-5 h-5 text-gray-400"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                               </svg>
//                             </button>
//                             {isHangHoleOpen && (
//                               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
//                                 <div
//                                   className="p-2 cursor-pointer hover:bg-gray-100"
//                                   onClick={() => {
//                                     setSelectedHangHole('');
//                                     setIsHangHoleOpen(false);
//                                   }}
//                                 >
//                                   Select hang hole
//                                 </div>
//                                 {hangHoleOptions.map((option) => (
//                                   <div
//                                     key={option.value}
//                                     className="p-2 cursor-pointer hover:bg-gray-100"
//                                     onClick={() => {
//                                       setSelectedHangHole(option.value);
//                                       setIsHangHoleOpen(false);
//                                     }}
//                                   >
//                                     {option.label}
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {pouchOpeningOptions.length > 0 && selectedCategory && (
//                         <div className={normalizedCategoryName === 'stand up pouch' ? 'hidden' : ''}>
//                           <label className="block text-gray-700 font-medium mb-2">Pouch Opening</label>
//                           <div className="relative">
//                             <button
//                               type="button"
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white flex justify-between items-center"
//                               onClick={() => setIsPouchOpeningOpen(!isPouchOpeningOpen)}
//                             >
//                               <span>{pouchOpeningOptions.find((opt) => opt.value === selectedPouchOpening)?.label || 'Select pouch opening'}</span>
//                               <svg
//                                 className="w-5 h-5 text-gray-400"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                               </svg>
//                             </button>
//                             {isPouchOpeningOpen && (
//                               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
//                                 <div
//                                   className="p-2 cursor-pointer hover:bg-gray-100"
//                                   onClick={() => {
//                                     setSelectedPouchOpening('');
//                                     setIsPouchOpeningOpen(false);
//                                   }}
//                                 >
//                                   Select pouch opening
//                                 </div>
//                                 {pouchOpeningOptions.map((option) => (
//                                   <div
//                                     key={option.value}
//                                     className="p-2 cursor-pointer hover:bg-gray-100"
//                                     onClick={() => {
//                                       setSelectedPouchOpening(option.value);
//                                       setIsPouchOpeningOpen(false);
//                                     }}
//                                   >
//                                     {option.label}
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {multiSelectOptions.length > 0 && (
//                       <div>
//                         <label className="block text-gray-700 font-medium mb-2">Additional Options</label>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           {multiSelectOptions.map((process) => (
//                             <label
//                               key={process.id}
//                               className="flex items-center space-x-3 text-gray-700"
//                             >
//                               <input
//                                 type="checkbox"
//                                 value={process.id}
//                                 checked={selectedMultiProcesses.includes(process.id)}
//                                 onChange={() => handleMultiProcessChange(process.id)}
//                                 className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
//                               />
//                               <span>{process.name}</span>
//                             </label>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>

//         <motion.div className="lg:w-1/4" variants={itemVariants}>
//           <div className="sticky top-16">
//             <div className="bg-gray-50 rounded-xl p-6 mb-6">
//               <motion.div
//                 className="flex justify-center"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="relative h-40 w-48">
//                   {selectedCategory && categories.length > 0 ? (
//                     <Image
//                       src={`${NEXI_CDN_URL}/category/${categories.find((cat) => cat.id === selectedCategory)?.bg_Img || 'default-image.jpg'}`}
//                       alt={
//                         categories.find((cat) => cat.id === selectedCategory)?.name || 'Pouch Image'
//                       }
//                       layout="fill"
//                       objectFit="contain"
//                       className="rounded-lg"
//                       onError={(e) => {
//                         e.target.src = `${NEXI_CDN_URL}/category/default-image.jpg`;
//                       }}
//                     />
//                   ) : (
//                     <div className="h-full w-full bg-gray-200 rounded-lg flex items-center justify-center">
//                       <span className="text-gray-500 text-sm">Select a category</span>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//               <div className="mt-6 text-center text-gray-600 text-sm">
//                 <p>
//                   {selectedWidth && selectedLength
//                     ? `${selectedWidth.label} x ${selectedLength.label}`
//                     : 'Not selected'}
//                 </p>
//                 <p>
//                   {selectedMaterial?.label || 'Not selected'} •{' '}
//                   {selectedMandatoryProcess?.label || 'Not selected'}
//                 </p>
//                 <p>
//                   Category: {categories.find((cat) => cat.id === selectedCategory)?.name || 'Not selected'}
//                 </p>
//               </div>
//             </div>

//             <motion.div
//               className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quotation</h3>
//               <div className="mb-4 text-center text-gray-600 text-sm">
//                 <p>{jobName || 'Your Custom Pouch'}</p>
//               </div>
//               <hr className="my-4 border-gray-200" />

//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total Quantity</span>
//                   <span className="font-medium">{totalQuantity || 0} pcs</span>
//                 </div>
//                 {costData && (
//                   <div className="flex justify-between font-bold text-lg text-gray-800">
//                     <span>Total</span>
//                     <span>₹{Number(costData.total_cost).toFixed(2)}</span>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-8 space-y-4">
//                 {isQuotationGenerated ? (
//                   <motion.button
//                     className="w-full py-3 px-4 font-medium rounded-lg bg-[#103b60] text-white hover:bg-[#0a2b47] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#103b60]"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleAddToCart}
//                   >
//                     Add to Cart
//                   </motion.button>
//                 ) : (
//                   <motion.button
//                     className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
//                       isQuotationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
//                     }`}
//                     whileHover={{ scale: isQuotationLoading ? 1 : 1.02 }}
//                     whileTap={{ scale: isQuotationLoading ? 1 : 0.98 }}
//                     onClick={handleRequestQuotation}
//                     disabled={isQuotationLoading}
//                   >
//                     {isQuotationLoading ? 'Generating...' : 'Request Quotation'}
//                   </motion.button>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Configuration;
  




// 'use client'
// import React, { useState, useEffect, useCallback } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { useAuth } from '@/utils/authContext';
// import { useRouter } from 'next/navigation';
// import standuppouch from '@/../public/product/standuppouch.jpg';

// const Configuration = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [isAuthLoading, setIsAuthLoading] = useState(true);

//   // State management
//   const [product, setProduct] = useState(null);
//   const [jobName, setJobName] = useState('');
//   const [sizeOptions, setSizeOptions] = useState({ widths: [], lengths: [] });
//   const [selectedWidth, setSelectedWidth] = useState(null);
//   const [selectedLength, setSelectedLength] = useState(null);
//   const [materialOptions, setMaterialOptions] = useState([]);
//   const [selectedMaterial, setSelectedMaterial] = useState(null);
//   const [mandatoryProcesses, setMandatoryProcesses] = useState([]);
//   const [selectedMandatoryProcess, setSelectedMandatoryProcess] = useState(null);
//   const [optionalProcesses, setOptionalProcesses] = useState([]);
//   const [selectedSeal, setSelectedSeal] = useState('');
//   const [selectedHangHole, setSelectedHangHole] = useState('');
//   const [selectedPouchOpening, setSelectedPouchOpening] = useState('');
//   const [selectedMultiProcesses, setSelectedMultiProcesses] = useState([]);
//   const [zipperOptions, setZipperOptions] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [designNames, setDesignNames] = useState(['']);
//   const [selectedQuantities, setSelectedQuantities] = useState([500]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [costData, setCostData] = useState(null);
//   const [isQuotationLoading, setIsQuotationLoading] = useState(false);
//   const [token, setToken] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   // Framer Motion variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.5 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   };

//   // Login to get token with retry
//   const loginForThirdParty = useCallback(async (retries = 3) => {
//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         const response = await fetch('https://nexiblesapp.barecms.com/proxy?r=user/authenticate', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email: 'sales@artnext.in',
//             password: 'Artnext@1',
//             subdomain: 'nexibles',
//             otp: false,
//             ipaddress: '58.84.60.235',
//           }),
//         });

//         const result = await response.json();
//         if (result.status) {
//           const newToken = result.data.token;
//           localStorage.setItem('token2', newToken);
//           setToken(newToken);
//           return newToken;
//         } else {
//           throw new Error(result.message || 'Login failed');
//         }
//       } catch (err) {
//         if (attempt === retries) {
//           setError('Failed to authenticate after multiple attempts.');
//           return null;
//         }
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }
//   }, [setError]);

//   // Fetch category data with retry
//   const fetchCategoryData = useCallback(async (retries = 3) => {
//     const APIURL = process.env.NEXT_PUBLIC_API_URL;
//     const token = process.env.NEXT_PUBLIC_API_KEY;

//     if (!APIURL || !token) {
//       setError('API URL or API Key is missing.');
//       return false;
//     }

//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         const response = await fetch(`${APIURL}/api/category_master`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'API-Key': token,
//           },
//         });

//         const data = await response.json();
//         if (data.status === 'success' && data.data) {
//           const filterCategory = data.data
//             .filter((category) => category.origin?.toLowerCase() === 'nexibles')
//             .map((category) => ({
//               id: category.id,
//               name: category.name,
//               cat_url: category.cat_url || '',
//             }));
//           setCategories(filterCategory);
//           return true;
//         } else {
//           throw new Error(data.error || 'Failed to fetch category data');
//         }
//       } catch (err) {
//         if (attempt === retries) {
//           setError(err.message || 'Error fetching category data');
//           return false;
//         }
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }
//   }, [setError]);

//   // Fetch product data with retry
//   const fetchProductData = useCallback(async (authToken, retries = 3) => {
//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         const response = await fetch(
//           'https://nexiblesapp.barecms.com/proxy?r=products/get-product-list&product_type=8&press_id=82&limit=10&offset=0',
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//               Environment: 'frontdesk',
//             },
//           }
//         );

//         const data = await response.json();
//         if (data.status && data.data) {
//           const targetProduct = data.data.find((p) => p.id === '122');
//           if (!targetProduct) throw new Error('Product ID 122 not found');

//           setProduct(targetProduct);

//           // Generate size options
//           const { minimum_width, maximum_width, minimum_length, maximum_length } = targetProduct;

//           if (
//             !minimum_width ||
//             !maximum_width ||
//             !minimum_length ||
//             !maximum_length ||
//             isNaN(parseInt(minimum_width)) ||
//             isNaN(parseInt(maximum_width)) ||
//             isNaN(parseInt(minimum_length)) ||
//             isNaN(parseInt(maximum_length))
//           ) {
//             throw new Error('Invalid size parameters in product data');
//           }

//           const widthStep = (parseInt(maximum_width) - parseInt(minimum_width)) / 9;
//           const lengthStep = (parseInt(maximum_length) - parseInt(minimum_length)) / 9;
//           const widths = Array.from({ length: 10 }, (_, i) => {
//             const width = Math.round(parseInt(minimum_width) + i * widthStep);
//             return { value: width, label: `${width} mm` };
//           });
//           const lengths = Array.from({ length: 10 }, (_, i) => {
//             const length = Math.round(parseInt(minimum_length) + i * lengthStep);
//             return { value: length, label: `${length} mm` };
//           });
//           setSizeOptions({ widths, lengths });
//           setSelectedWidth(widths[0] || null);
//           setSelectedLength(lengths[0] || null);

//           // Set material options
//           const materials = Array.isArray(targetProduct.pouch_media)
//             ? targetProduct.pouch_media.map((m) => ({
//               value: m.id,
//               label: m.media_title,
//               widths: m.media_widths ? m.media_widths.split(',') : [],
//             }))
//             : [];
//           setMaterialOptions(materials);
//           setSelectedMaterial(materials[0] || null);

//           // Set mandatory processes
//           const mandatory = Array.isArray(targetProduct.pouch_postpress)
//             ? targetProduct.pouch_postpress
//               .filter((p) => p.mandatory_any_one)
//               .map((p) => ({
//                 value: p.id,
//                 label: p.process_name,
//               }))
//             : [];
//           setMandatoryProcesses(mandatory);
//           setSelectedMandatoryProcess(mandatory[0] || null);

//           // Set optional processes
//           const optional = Array.isArray(targetProduct.pouch_postpress)
//             ? targetProduct.pouch_postpress
//               .filter((p) => p.optional && !p.mandatory_any_one)
//               .map((p) => ({
//                 id: p.id,
//                 name: p.process_name,
//               }))
//             : [];
//           setOptionalProcesses(optional);

//           // Set zipper options
//           const zippers = Array.isArray(targetProduct.pouch_postpress)
//             ? targetProduct.pouch_postpress
//               .filter((p) => p.mandatory_any_one)
//               .map((p) => ({
//                 value: p.id,
//                 label: p.process_name,
//               }))
//             : [];
//           setZipperOptions(zippers);

//           return true;
//         } else {
//           throw new Error(data.message || 'Failed to fetch product data');
//         }
//       } catch (err) {
//         if (attempt === retries) {
//           setError(err.message);
//           return false;
//         }
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }
//   }, [
//     setProduct,
//     setSizeOptions,
//     setSelectedWidth,
//     setSelectedLength,
//     setMaterialOptions,
//     setSelectedMaterial,
//     setMandatoryProcesses,
//     setSelectedMandatoryProcess,
//     setOptionalProcesses,
//     setZipperOptions,
//     setError,
//   ]);

//   // Initialize authentication, product, and category data fetching
//   useEffect(() => {
//     const initialize = async () => {
//       setLoading(true);
//       setError(null);

//       if (user) {
//         setIsAuthLoading(false);
//         const authToken = await loginForThirdParty();
//         if (authToken) {
//           const [productSuccess, categorySuccess] = await Promise.all([
//             fetchProductData(authToken),
//             fetchCategoryData(),
//           ]);
//           if (!productSuccess || !categorySuccess) {
//             setError('Failed to load product or category data after multiple attempts.');
//           }
//         } else {
//           setError('Authentication failed.');
//         }
//       } else {
//         router.push('/login');
//       }

//       setLoading(false);
//     };

//     initialize();
//   }, [user, router, loginForThirdParty, fetchProductData, fetchCategoryData]);

//   // Reset selectedPouchOpening when category is Stand Up Pouch
//   useEffect(() => {
//     const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name;
//     if (categoryName === 'Stand Up Pouch') {
//       setSelectedPouchOpening('');
//     }
//   }, [selectedCategory, categories, setSelectedPouchOpening]);

//   // Handle multi-select process checkbox changes
//   const handleMultiProcessChange = (processId) => {
//     setSelectedMultiProcesses((prev) =>
//       prev.includes(processId)
//         ? prev.filter((id) => id !== processId)
//         : [...prev, processId]
//     );
//   };

//   // Handle SKU quantity changes
//   const handleQuantityChange = (index, value) => {
//     if (index >= quantity) return;
//     const updated = [...selectedQuantities];
//     updated[index] = parseInt(value);
//     setSelectedQuantities(updated);
//   };

//   // Calculate total quantity
//   const totalQuantity = selectedQuantities.reduce((a, b) => a + b, 0);

//   // Handle Request Quotation
//   const handleRequestQuotation = async () => {
//     setIsQuotationLoading(true);
//     setError(null);
//     try {
//       let authToken = token || localStorage.getItem('token2');
//       if (!authToken) {
//         authToken = await loginForThirdParty();
//         if (!authToken) throw new Error('No authentication token');
//       }

//       if (!jobName) throw new Error('Project name is required');
//       if (!selectedWidth || !selectedLength) throw new Error('Width and length are required');
//       if (!selectedMaterial) throw new Error('Material is required');
//       if (!selectedMandatoryProcess) throw new Error('Mandatory process is required');

//       // Combine all selected optional processes
//       const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name;
//       const optionalProcessIds = [
//         selectedSeal,
//         selectedHangHole,
//         categoryName !== 'Stand Up Pouch' ? selectedPouchOpening : null,
//         ...selectedMultiProcesses,
//       ].filter(Boolean);

//       const payload = {
//         formData: {
//           job_name: jobName || 'Untitled Project',
//           quantity_one: totalQuantity.toString(),
//           quantity_two: '0',
//           quantity_three: '0',
//           length: selectedLength?.value.toString() || '',
//           width: selectedWidth?.value.toString() || '',
//           no_of_sku: quantity.toString(),
//           pouch_printing_color: '7',
//           media_id: selectedMaterial?.value || '',
//           media_0: '',
//           media_1: '',
//           media_2: '',
//           media_3: '',
//           gusset_size: '3',
//           gusset_color: '7',
//           seal_size: '',
//           mandatory_one_process: selectedMandatoryProcess?.value || '',
//           optional_process: optionalProcessIds,
//           type: 'basic',
//         },
//         productId: '122',
//         printingTypeId: '8',
//         customerId: '26176',
//       };

//       const response = await fetch(
//         'https://nexiblesapp.barecms.com/proxy?r=flexible-pouch/save-requirement&press_id=82',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${authToken}`,
//             Environment: 'frontdesk',
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();
//       if (result.status && result.data?.costing_data?.length > 0) {
//         setCostData(result.data.costing_data[0]);
//       } else {
//         throw new Error(result.message || 'Failed to generate quotation: Invalid response data');
//       }
//     } catch (err) {
//       console.error('Quotation error:', err);
//       setError(err.message);
//       alert('Failed to generate quotation: ' + err.message);
//     } finally {
//       setIsQuotationLoading(false);
//     }
//   };

//   // Skeleton UI Component
//   const SkeletonLoader = () => (
//     <div className="animate-pulse space-y-6">
//       <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-2/3 space-y-6">
//           <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
//             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//             <div className="h-12 bg-gray-200 rounded"></div>
//             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//             </div>
//           </div>
//         </div>
//         <div className="lg:w-1/4">
//           <div className="bg-gray-50 rounded-xl p-6 space-y-4">
//             <div className="h-40 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
//           </div>
//           <div className="bg-white rounded-xl p-6 mt-6 space-y-4">
//             <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             <div className="h-4 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded"></div>
//             <div className="h-12 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (isAuthLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (loading) return <div className="min-h-screen bg-gray-50 py-12 px-6"><SkeletonLoader /></div>;
//   if (error && !product)
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-6">
//         <div className="text-center p-4 text-red-500 bg-red-50 rounded-lg max-w-md mx-auto">
//           {error}
//           <button
//             className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
//             onClick={() => window.location.reload()}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   // Define optional process groups
//   const sealOptions = optionalProcesses
//     .filter((p) => ['K-Seal', 'Radius Seal'].includes(p.name))
//     .map((p) => ({ value: p.id, label: p.name }));
//   const hangHoleOptions = optionalProcesses
//     .filter((p) => ['D-Cut Handle Punch', 'Euro Hang Hole', 'Round Hang Hole'].includes(p.name))
//     .map((p) => ({ value: p.id, label: p.name }));
//   // Only define pouchOpeningOptions if category is not Stand Up Pouch
//   const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name;
//   const pouchOpeningOptions = categoryName !== 'Stand Up Pouch'
//     ? optionalProcesses
//       .filter((p) => ['Pouch Opening Top', 'Pouch Opening Bottom'].includes(p.name))
//       .map((p) => ({ value: p.id, label: p.name }))
//     : [];

//   // Define multi-select options, including Round Corner only if Radius Seal is selected
//   const radiusSealId = sealOptions.find((s) => s.label === 'Radius Seal')?.value;
//   const multiSelectOptions = optionalProcesses
//     .filter((p) => {
//       if (p.name === 'Round Corner') {
//         return selectedSeal === radiusSealId;
//       }
//       return ['Tear Notch', 'Valve'].includes(p.name);
//     })
//     .map((p) => ({ id: p.id, name: p.name }));

//   // Log warnings for debugging
//   if (process.env.NODE_ENV === 'development') {
//     if (!sealOptions.some((s) => s.label === 'Radius Seal')) {
//       console.warn('Warning: "Radius Seal" not found in optionalProcesses');
//     }
//     if (!multiSelectOptions.some((p) => p.name === 'Round Corner') && selectedSeal === radiusSealId) {
//       console.warn('Warning: "Round Corner" not found in optionalProcesses when Radius Seal is selected');
//     }
//     if (categoryName === 'Stand Up Pouch' && pouchOpeningOptions.length > 0) {
//       console.warn('Warning: Pouch Opening options should not be defined for Stand Up Pouch category');
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
//       <Head>
//         <title>Custom Pouches | Configuration Tool</title>
//         <meta name="description" content="Configure your custom pouches with our interactive tool" />
//       </Head>

//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold text-gray-800 mb-2">Pouch Configuration Tool</h1>
//         <p className="text-lg text-gray-600">Design your perfect packaging solution</p>
//       </motion.div>

//       <div className="flex flex-col lg:flex-row justify-center mx-auto gap-8">
//         <motion.div
//           className="lg:w-2/3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div
//             className="bg-white rounded-2xl shadow-xl overflow-hidden"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <div className="p-8">
//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
//                   Project Details
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <label className="block text-gray-700 font-medium mb-2">Project Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter your project name"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
//                     value={jobName}
//                     onChange={(e) => setJobName(e.target.value)}
//                   />
//                 </div>
//               </motion.div>

//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
//                   Pouch Specifications
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Category</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedCategory}
//                         onChange={(e) => setSelectedCategory(e.target.value)}
//                         disabled={categories.length === 0}
//                       >
//                         <option value="" disabled>
//                           Select category
//                         </option>
//                         {categories.map((category) => (
//                           <option key={category.id} value={category.id}>
//                             {category.name}
//                           </option>
//                         ))}
//                       </select>
//                       {categories.length === 0 && (
//                         <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Width</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedWidth?.value || ''}
//                         onChange={(e) => {
//                           const selected = sizeOptions.widths.find((w) => w.value === parseInt(e.target.value));
//                           setSelectedWidth(selected);
//                         }}
//                       >
//                         <option value="" >
//                           Select width
//                         </option>
//                         {sizeOptions.widths?.map((width, idx) => (
//                           <option key={idx} value={width.value}>
//                             {width.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Length</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedLength?.value || ''}
//                         onChange={(e) => {
//                           const selected = sizeOptions.lengths.find((l) => l.value === parseInt(e.target.value));
//                           setSelectedLength(selected);
//                         }}
//                       >
//                         <option value="" >
//                           Select length
//                         </option>
//                         {sizeOptions.lengths?.map((length, idx) => (
//                           <option key={idx} value={length.value}>
//                             {length.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Material</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedMaterial?.value || ''}
//                         onChange={(e) => {
//                           const selected = materialOptions.find((m) => m.value === e.target.value);
//                           setSelectedMaterial(selected);
//                         }}
//                       >
//                         <option value="" >
//                           Select material
//                         </option>
//                         {materialOptions.map((material, idx) => (
//                           <option key={idx} value={material.value}>
//                             {material.label}
//                           </option>
//                         ))}
//                       </select>
//                       {selectedMaterial && (
//                         <p className="text-sm text-gray-500 mt-1">
//                           Available widths: {selectedMaterial.widths.join(', ')} mm
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Mandatory Process</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedMandatoryProcess?.value || ''}
//                         onChange={(e) => {
//                           const selected = mandatoryProcesses.find((p) => p.value === e.target.value);
//                           setSelectedMandatoryProcess(selected);
//                         }}
//                       >
//                         <option value="" >
//                           Select mandatory process
//                         </option>
//                         {mandatoryProcesses
//                           .filter((process) => process.label !== 'Aplix Zipper')
//                           .map((process, idx) => (
//                             <option key={idx} value={process.value}>
//                               {process.label}
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
//                   SKU Configuration
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-medium mb-2">Number of SKUs</label>
//                     <select
//                       className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                       value={quantity}
//                       onChange={(e) => {
//                         const q = parseInt(e.target.value);
//                         setQuantity(q);
//                         setDesignNames(Array(q).fill(''));
//                         setSelectedQuantities(Array(q).fill(500));
//                       }}
//                     >
//                       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sku) => (
//                         <option key={sku} value={sku}>
//                           {sku}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Design Names</label>
//                       {[...Array(quantity)].map((_, index) => (
//                         <div key={index} className="mb-3">
//                           <input
//                             type="text"
//                             placeholder={`Design ${index + 1} name`}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
//                             value={designNames[index] || ''}
//                             onChange={(e) => {
//                               const updated = [...designNames];
//                               updated[index] = e.target.value;
//                               setDesignNames(updated);
//                             }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Quantity</label>
//                       {[...Array(quantity)].map((_, index) => (
//                         <div key={index} className="mb-3">
//                           <select
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                             value={selectedQuantities[index]}
//                             onChange={(e) => handleQuantityChange(index, e.target.value)}
//                           >
//                             <option value={500}>500 Pcs</option>
//                             <option value={1000}>1000 Pcs</option>
//                             <option value={2000}>2000 Pcs</option>
//                             <option value={3000}>3000 Pcs</option>
//                             <option value={5000}>5000 Pcs</option>
//                           </select>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {(sealOptions.length > 0 || hangHoleOptions.length > 0 || pouchOpeningOptions.length > 0 || multiSelectOptions.length > 0) && (
//                 <motion.div className="mb-8" variants={itemVariants}>
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                     <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
//                     Optional Processes
//                   </h2>
//                   <div className="bg-gray-50 p-6 rounded-xl space-y-6">
//                     <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//                     {/* Seal Dropdown */}
//                     {sealOptions.length > 0 && (
//                       <div>
//                         <label className="block text-gray-700 font-medium mb-2">Seal Type</label>
//                         <select
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                           value={selectedSeal}
//                           onChange={(e) => setSelectedSeal(e.target.value)}
//                         >
//                           <option value="">Select seal type</option>
//                           {sealOptions.map((option) => (
//                             <option key={option.value} value={option.value}>
//                               {option.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     )}

//                     {/* Hang Hole Dropdown */}
//                     {hangHoleOptions.length > 0 && (
//                       <div>
//                         <label className="block text-gray-700 font-medium mb-2">Hang Hole</label>
//                         <select
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                           value={selectedHangHole}
//                           onChange={(e) => setSelectedHangHole(e.target.value)}
//                         >
//                           <option value="">Select hang hole</option>
//                           {hangHoleOptions.map((option) => (
//                             <option key={option.value} value={option.value}>
//                               {option.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     )}

//                     {/* Pouch Opening Dropdown (Only if category is not Stand Up Pouch) */}
//                     {categoryName !== 'Stand Up Pouch' && pouchOpeningOptions.length > 0 && (
//                       <div>
//                         <label className="block text-gray-700 font-medium mb-2">Pouch Opening</label>
//                         <select
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                           value={selectedPouchOpening}
//                           onChange={(e) => setSelectedPouchOpening(e.target.value)}
//                         >
//                           <option value="">Select pouch opening</option>
//                           {pouchOpeningOptions.map((option) => (
//                             <option key={option.value} value={option.value}>
//                               {option.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     )}
//                     </div>

//                     {/* Multi-Select Checkboxes */}
//                     {multiSelectOptions.length > 0 && (
//                       <div>
//                         <label className="block text-gray-700 font-medium mb-2">Additional Options</label>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           {multiSelectOptions.map((process) => (
//                             <label
//                               key={process.id}
//                               className="flex items-center space-x-3 text-gray-700"
//                             >
//                               <input
//                                 type="checkbox"
//                                 value={process.id}
//                                 checked={selectedMultiProcesses.includes(process.id)}
//                                 onChange={() => handleMultiProcessChange(process.id)}
//                                 className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
//                               />
//                               <span>{process.name}</span>
//                             </label>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>

//         <motion.div className="lg:w-1/4" variants={itemVariants}>
//           <div className="sticky top-16">
//             <div className="bg-gray-50 rounded-xl p-6 mb-6">
//               <motion.div
//                 className="flex justify-center"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="relative h-40 w-48">
//                   {product && (
//                     <Image
//                       src={standuppouch}
//                       alt={product.product_name}
//                       layout="fill"
//                       objectFit="contain"
//                       className="rounded-lg"
//                     />
//                   )}
//                 </div>
//               </motion.div>
//               <div className="mt-6 text-center text-gray-600 text-sm">
//                 <p>
//                   {selectedWidth && selectedLength
//                     ? `${selectedWidth.label} x ${selectedLength.label}`
//                     : 'Not selected'}
//                 </p>
//                 <p>
//                   {selectedMaterial?.label || 'Not selected'} • {selectedMandatoryProcess?.label || 'Not selected'}
//                 </p>
//                 <p>Category: {categoryName || 'Not selected'}</p>
//               </div>
//             </div>

//             <motion.div
//               className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quotation</h3>
//               <div className="mb-4 text-center text-gray-600 text-sm">
//                 <p>{jobName || 'Your Custom Pouch'}</p>
//               </div>
//               <hr className="my-4 border-gray-200" />

//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total Quantity</span>
//                   <span className="font-medium">{totalQuantity || 0} pcs</span>
//                 </div>
//                 {costData && (
//                   <div className="flex justify-between font-bold text-lg text-gray-800">
//                     <span>Total</span>
//                     <span>₹{Number(costData.total_cost).toFixed(2)}</span>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-8 space-y-4">
//                 <motion.button
//                   className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${isQuotationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
//                     }`}
//                   whileHover={{ scale: isQuotationLoading ? 1 : 1.02 }}
//                   whileTap={{ scale: isQuotationLoading ? 1 : 0.98 }}
//                   onClick={handleRequestQuotation}
//                   disabled={isQuotationLoading}
//                 >
//                   {isQuotationLoading ? 'Generating...' : 'Request Quotation'}
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Configuration;







// // 'use client'
// // import React, { useState, useEffect, useCallback } from 'react';
// // import Head from 'next/head';
// // import Image from 'next/image';
// // import { motion } from 'framer-motion';
// // import { useAuth } from '@/utils/authContext';
// // import { useRouter } from 'next/navigation';
// // import standuppouch from '@/../public/product/standuppouch.jpg';

// // const Configuration = () => {
// //   const { user } = useAuth();
// //   const router = useRouter();
// //   const [isAuthLoading, setIsAuthLoading] = useState(true);

// //   // State management
// //   const [product, setProduct] = useState(null);
// //   const [jobName, setJobName] = useState('');
// //   const [sizeOptions, setSizeOptions] = useState({ widths: [], lengths: [] });
// //   const [selectedWidth, setSelectedWidth] = useState(null);
// //   const [selectedLength, setSelectedLength] = useState(null);
// //   const [materialOptions, setMaterialOptions] = useState([]);
// //   const [selectedMaterial, setSelectedMaterial] = useState(null);
// //   const [mandatoryProcesses, setMandatoryProcesses] = useState([]);
// //   const [selectedMandatoryProcess, setSelectedMandatoryProcess] = useState(null);
// //   const [optionalProcesses, setOptionalProcesses] = useState([]);
// //   const [selectedOptionalProcesses, setSelectedOptionalProcesses] = useState([]);
// //   const [zipperOptions, setZipperOptions] = useState([]);
// //   const [quantity, setQuantity] = useState(1);
// //   const [designNames, setDesignNames] = useState(['']);
// //   const [selectedQuantities, setSelectedQuantities] = useState([500]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [costData, setCostData] = useState(null);
// //   const [isQuotationLoading, setIsQuotationLoading] = useState(false);
// //   const [token, setToken] = useState(null);
// //   // New states for categories
// //   const [categories, setCategories] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState('');

// //   // Framer Motion variants
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.5 },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { y: 20, opacity: 0 },
// //     visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
// //   };

// //   // Login to get token with retry
// //   const loginForThirdParty = useCallback(async (retries = 3) => {
// //     for (let attempt = 1; attempt <= retries; attempt++) {
// //       try {
// //         const response = await fetch('https://nexiblesapp.barecms.com/proxy?r=user/authenticate', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({
// //             email: 'sales@artnext.in',
// //             password: 'Artnext@1',
// //             subdomain: 'nexibles',
// //             otp: false,
// //             ipaddress: '58.84.60.235',
// //           }),
// //         });

// //         const result = await response.json();
// //         if (result.status) {
// //           const newToken = result.data.token;
// //           localStorage.setItem('token2', newToken);
// //           setToken(newToken);
// //           return newToken;
// //         } else {
// //           throw new Error(result.message || 'Login failed');
// //         }
// //       } catch (err) {
// //         if (attempt === retries) {
// //           setError('Failed to authenticate after multiple attempts.');
// //           return null;
// //         }
// //         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
// //       }
// //     }
// //   }, [setError]);

// //   // Fetch category data with retry
// //   const fetchCategoryData = useCallback(async (retries = 3) => {
// //     const APIURL = process.env.NEXT_PUBLIC_API_URL;
// //     const token = process.env.NEXT_PUBLIC_API_KEY;

// //     if (!APIURL || !token) {
// //       setError('API URL or API Key is missing.');
// //       return false;
// //     }

// //     for (let attempt = 1; attempt <= retries; attempt++) {
// //       try {
// //         const response = await fetch(`${APIURL}/api/category_master`, {
// //           method: 'GET',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'API-Key': token,
// //           },
// //         });

// //         const data = await response.json();
// //         if (data.status === 'success' && data.data) {
// //           const filterCategory = data.data
// //             .filter((category) => category.origin?.toLowerCase() === 'nexibles')
// //             .map((category) => ({
// //               id: category.id,
// //               name: category.name,
// //               cat_url: category.cat_url || '',
// //             }));
// //           setCategories(filterCategory);
// //           return true;
// //         } else {
// //           throw new Error(data.error || 'Failed to fetch category data');
// //         }
// //       } catch (err) {
// //         if (attempt === retries) {
// //           setError(err.message || 'Error fetching category data');
// //           return false;
// //         }
// //         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
// //       }
// //     }
// //   }, [setError]);

// //   // Fetch product data with retry
// //   const fetchProductData = useCallback(async (authToken, retries = 3) => {
// //     for (let attempt = 1; attempt <= retries; attempt++) {
// //       try {
// //         const response = await fetch(
// //           'https://nexiblesapp.barecms.com/proxy?r=products/get-product-list&product_type=8&press_id=82&limit=10&offset=0',
// //           {
// //             headers: {
// //               Authorization: `Bearer ${authToken}`,
// //               Environment: 'frontdesk',
// //             },
// //           }
// //         );

// //         const data = await response.json();
// //         if (data.status && data.data) {
// //           const targetProduct = data.data.find((p) => p.id === '122');
// //           if (!targetProduct) throw new Error('Product ID 122 not found');

// //           setProduct(targetProduct);

// //           // Generate size options
// //           const { minimum_width, maximum_width, minimum_length, maximum_length } = targetProduct;

// //           // Validate size parameters
// //           if (
// //             !minimum_width ||
// //             !maximum_width ||
// //             !minimum_length ||
// //             !maximum_length ||
// //             isNaN(parseInt(minimum_width)) ||
// //             isNaN(parseInt(maximum_width)) ||
// //             isNaN(parseInt(minimum_length)) ||
// //             isNaN(parseInt(maximum_length))
// //           ) {
// //             throw new Error('Invalid size parameters in product data');
// //           }

// //           const widthStep = (parseInt(maximum_width) - parseInt(minimum_width)) / 9;
// //           const lengthStep = (parseInt(maximum_length) - parseInt(minimum_length)) / 9;
// //           const widths = Array.from({ length: 10 }, (_, i) => {
// //             const width = Math.round(parseInt(minimum_width) + i * widthStep);
// //             return { value: width, label: `${width} mm` };
// //           });
// //           const lengths = Array.from({ length: 10 }, (_, i) => {
// //             const length = Math.round(parseInt(minimum_length) + i * lengthStep);
// //             return { value: length, label: `${length} mm` };
// //           });
// //           setSizeOptions({ widths, lengths });
// //           setSelectedWidth(widths[0] || null);
// //           setSelectedLength(lengths[0] || null);

// //           // Set material options
// //           const materials = Array.isArray(targetProduct.pouch_media)
// //             ? targetProduct.pouch_media.map((m) => ({
// //                 value: m.id,
// //                 label: m.media_title,
// //                 widths: m.media_widths ? m.media_widths.split(',') : [],
// //               }))
// //             : [];
// //           setMaterialOptions(materials);
// //           setSelectedMaterial(materials[0] || null);

// //           // Set mandatory processes
// //           const mandatory = Array.isArray(targetProduct.pouch_postpress)
// //             ? targetProduct.pouch_postpress
// //                 .filter((p) => p.mandatory_any_one)
// //                 .map((p) => ({
// //                   value: p.id,
// //                   label: p.process_name,
// //                 }))
// //             : [];
// //           setMandatoryProcesses(mandatory);
// //           setSelectedMandatoryProcess(mandatory[0] || null);

// //           // Set optional processes
// //           const optional = Array.isArray(targetProduct.pouch_postpress)
// //             ? targetProduct.pouch_postpress
// //                 .filter((p) => p.optional && !p.mandatory_any_one)
// //                 .map((p) => ({
// //                   id: p.id,
// //                   name: p.process_name,
// //                 }))
// //             : [];
// //           setOptionalProcesses(optional);

// //           // Set zipper options
// //           const zippers = Array.isArray(targetProduct.pouch_postpress)
// //             ? targetProduct.pouch_postpress
// //                 .filter((p) => p.mandatory_any_one)
// //                 .map((p) => ({
// //                   value: p.id,
// //                   label: p.process_name,
// //                 }))
// //             : [];
// //           setZipperOptions(zippers);

// //           return true;
// //         } else {
// //           throw new Error(data.message || 'Failed to fetch product data');
// //         }
// //       } catch (err) {
// //         if (attempt === retries) {
// //           setError(err.message);
// //           return false;
// //         }
// //         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
// //       }
// //     }
// //   }, [
// //     setProduct,
// //     setSizeOptions,
// //     setSelectedWidth,
// //     setSelectedLength,
// //     setMaterialOptions,
// //     setSelectedMaterial,
// //     setMandatoryProcesses,
// //     setSelectedMandatoryProcess,
// //     setOptionalProcesses,
// //     setZipperOptions,
// //     setError,
// //   ]);

// //   // Initialize authentication, product, and category data fetching
// //   useEffect(() => {
// //     const initialize = async () => {
// //       setLoading(true);
// //       setError(null);

// //       if (user) {
// //         setIsAuthLoading(false);
// //         const authToken = await loginForThirdParty();
// //         if (authToken) {
// //           const [productSuccess, categorySuccess] = await Promise.all([
// //             fetchProductData(authToken),
// //             fetchCategoryData(),
// //           ]);
// //           if (!productSuccess || !categorySuccess) {
// //             setError('Failed to load product or category data after multiple attempts.');
// //           }
// //         } else {
// //           setError('Authentication failed.');
// //         }
// //       } else {
// //         router.push('/login');
// //       }

// //       setLoading(false);
// //     };

// //     initialize();
// //   }, [user, router, loginForThirdParty, fetchProductData, fetchCategoryData]);

// //   // Handle optional process checkbox changes
// //   const handleOptionalProcessChange = (processId) => {
// //     setSelectedOptionalProcesses((prev) =>
// //       prev.includes(processId)
// //         ? prev.filter((id) => id !== processId)
// //         : [...prev, processId]
// //     );
// //   };

// //   // Handle SKU quantity changes
// //   const handleQuantityChange = (index, value) => {
// //     if (index >= quantity) return; // Prevent out-of-bounds updates
// //     const updated = [...selectedQuantities];
// //     updated[index] = parseInt(value);
// //     setSelectedQuantities(updated);
// //   };

// //   // Calculate total quantity
// //   const totalQuantity = selectedQuantities.reduce((a, b) => a + b, 0);

// //   // Handle Request Quotation
// //   const handleRequestQuotation = async () => {
// //     setIsQuotationLoading(true);
// //     setError(null);
// //     try {
// //       let authToken = token || localStorage.getItem('token2');
// //       if (!authToken) {
// //         authToken = await loginForThirdParty();
// //         if (!authToken) throw new Error('No authentication token');
// //       }

// //       // Validate required fields
// //       if (!jobName) throw new Error('Project name is required');
// //       if (!selectedWidth || !selectedLength) throw new Error('Width and length are required');
// //       if (!selectedMaterial) throw new Error('Material is required');
// //       if (!selectedMandatoryProcess) throw new Error('Mandatory process is required');

// //       const payload = {
// //         formData: {
// //           job_name: jobName || 'Untitled Project',
// //           quantity_one: totalQuantity.toString(),
// //           quantity_two: '0',
// //           quantity_three: '0',
// //           length: selectedLength?.value.toString() || '',
// //           width: selectedWidth?.value.toString() || '',
// //           no_of_sku: quantity.toString(),
// //           pouch_printing_color: '7',
// //           media_id: selectedMaterial?.value || '',
// //           media_0: '',
// //           media_1: '',
// //           media_2: '',
// //           media_3: '',
// //           gusset_size: '3',
// //           gusset_color: '7',
// //           seal_size: '',
// //           mandatory_one_process: selectedMandatoryProcess?.value || '',
// //           optional_process: selectedOptionalProcesses,
// //           type: 'basic',
// //         },
// //         productId: '122',
// //         printingTypeId: '8',
// //         customerId: '26176',
// //       };

// //       const response = await fetch(
// //         'https://nexiblesapp.barecms.com/proxy?r=flexible-pouch/save-requirement&press_id=82',
// //         {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             Authorization: `Bearer ${authToken}`,
// //             Environment: 'frontdesk',
// //           },
// //           body: JSON.stringify(payload),
// //         }
// //       );

// //       const result = await response.json();
// //       if (result.status && result.data?.costing_data?.length > 0) {
// //         setCostData(result.data.costing_data[0]);
// //       } else {
// //         throw new Error(result.message || 'Failed to generate quotation: Invalid response data');
// //       }
// //     } catch (err) {
// //       console.error('Quotation error:', err);
// //       setError(err.message);
// //       alert('Failed to generate quotation: ' + err.message);
// //     } finally {
// //       setIsQuotationLoading(false);
// //     }
// //   };

// //   // Skeleton UI Component
// //   const SkeletonLoader = () => (
// //     <div className="animate-pulse space-y-6">
// //       <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
// //       <div className="flex flex-col lg:flex-row gap-8">
// //         <div className="lg:w-2/3 space-y-6">
// //           <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
// //             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
// //             <div className="h-12 bg-gray-200 rounded"></div>
// //             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="h-12 bg-gray-200 rounded"></div>
// //               <div className="h-12 bg-gray-200 rounded"></div>
// //               <div className="h-12 bg-gray-200 rounded"></div>
// //               <div className="h-12 bg-gray-200 rounded"></div>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="lg:w-1/4">
// //           <div className="bg-gray-50 rounded-xl p-6 space-y-4">
// //             <div className="h-40 bg-gray-200 rounded"></div>
// //             <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
// //             <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
// //           </div>
// //           <div className="bg-white rounded-xl p-6 mt-6 space-y-4">
// //             <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
// //             <div className="h-4 bg-gray-200 rounded"></div>
// //             <div className="h-4 bg-gray-200 rounded"></div>
// //             <div className="h-12 bg-gray-200 rounded"></div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   // Render auth loading state
// //   if (isAuthLoading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-gray-600">Loading...</div>
// //       </div>
// //     );
// //   }

// //   // Render existing loading and error states
// //   if (loading) return <div className="min-h-screen bg-gray-50 py-12 px-6"><SkeletonLoader /></div>;
// //   if (error && !product)
// //     return (
// //       <div className="min-h-screen bg-gray-50 py-12 px-6">
// //         <div className="text-center p-4 text-red-500 bg-red-50 rounded-lg max-w-md mx-auto">
// //           {error}
// //           <button
// //             className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
// //             onClick={() => window.location.reload()}
// //           >
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
// //       <Head>
// //         <title>Custom Pouches | Configuration Tool</title>
// //         <meta name="description" content="Configure your custom pouches with our interactive tool" />
// //       </Head>

// //       <motion.div
// //         initial={{ opacity: 0, y: -20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, delay: 0.2 }}
// //         className="text-center mb-12"
// //       >
// //         <h1 className="text-4xl font-bold text-gray-800 mb-2">Pouch Configuration Tool</h1>
// //         <p className="text-lg text-gray-600">Design your perfect packaging solution</p>
// //       </motion.div>

// //       <div className="flex flex-col lg:flex-row justify-center mx-auto gap-8">
// //         {/* Main Configuration Content */}
// //         <motion.div
// //           className="lg:w-2/3"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6 }}
// //         >
// //           <motion.div
// //             className="bg-white rounded-2xl shadow-xl overflow-hidden"
// //             variants={containerVariants}
// //             initial="hidden"
// //             animate="visible"
// //           >
// //             <div className="p-8">
// //               {/* Project Name */}
// //               <motion.div className="mb-8" variants={itemVariants}>
// //                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
// //                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
// //                   Project Details
// //                 </h2>
// //                 <div className="bg-gray-50 p-6 rounded-xl">
// //                   <label className="block text-gray-700 font-medium mb-2">Project Name</label>
// //                   <input
// //                     type="text"
// //                     placeholder="Enter your project name"
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
// //                     value={jobName}
// //                     onChange={(e) => setJobName(e.target.value)}
// //                   />
// //                 </div>
// //               </motion.div>

// //               {/* Pouch Specifications */}
// //               <motion.div className="mb-8" variants={itemVariants}>
// //                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
// //                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
// //                   Pouch Specifications
// //                 </h2>
// //                 <div className="bg-gray-50 p-6 rounded-xl">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     {/* Category */}
// //                     <div>
// //                       <label className="block text-gray-700 font-medium mb-2">Category</label>
// //                       <select
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
// //                         value={selectedCategory}
// //                         onChange={(e) => setSelectedCategory(e.target.value)}
// //                         disabled={categories.length === 0}
// //                       >
// //                         <option value="" disabled>
// //                           Select category
// //                         </option>
// //                         {categories.map((category) => (
// //                           <option key={category.id} value={category.id}>
// //                             {category.name}
// //                           </option>
// //                         ))}
// //                       </select>
// //                       {categories.length === 0 && (
// //                         <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
// //                       )}
// //                     </div>

// //                     {/* Width */}
// //                     <div>
// //                       <label className="block text-gray-700 font-medium mb-2">Width</label>
// //                       <select
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
// //                         value={selectedWidth?.value || ''}
// //                         onChange={(e) => {
// //                           const selected = sizeOptions.widths.find((w) => w.value === parseInt(e.target.value));
// //                           setSelectedWidth(selected);
// //                         }}
// //                       >
// //                         <option value="" disabled>
// //                           Select width
// //                         </option>
// //                         {sizeOptions.widths?.map((width, idx) => (
// //                           <option key={idx} value={width.value}>
// //                             {width.label}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     {/* Length */}
// //                     <div>
// //                       <label className="block text-gray-700 font-medium mb-2">Length</label>
// //                       <select
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
// //                         value={selectedLength?.value || ''}
// //                         onChange={(e) => {
// //                           const selected = sizeOptions.lengths.find((l) => l.value === parseInt(e.target.value));
// //                           setSelectedLength(selected);
// //                         }}
// //                       >
// //                         <option value="" disabled>
// //                           Select length
// //                         </option>
// //                         {sizeOptions.lengths?.map((length, idx) => (
// //                           <option key={idx} value={length.value}>
// //                             {length.label}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     {/* Material */}
// //                     <div>
// //                       <label className="block text-gray-700 font-medium mb-2">Material</label>
// //                       <select
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
// //                         value={selectedMaterial?.value || ''}
// //                         onChange={(e) => {
// //                           const selected = materialOptions.find((m) => m.value === e.target.value);
// //                           setSelectedMaterial(selected);
// //                         }}
// //                       >
// //                         <option value="" disabled>
// //                           Select material
// //                         </option>
// //                         {materialOptions.map((material, idx) => (
// //                           <option key={idx} value={material.value}>
// //                             {material.label}
// //                           </option>
// //                         ))}
// //                       </select>
// //                       {selectedMaterial && (
// //                         <p className="text-sm text-gray-500 mt-1">
// //                           Available widths: {selectedMaterial.widths.join(', ')} mm
// //                         </p>
// //                       )}
// //                     </div>

// //                     {/* Mandatory Process */}
// //                     <div>
// //                       <label className="block text-gray-700 font-medium mb-2">Mandatory Process</label>
// //                       <select
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
// //                         value={selectedMandatoryProcess?.value || ''}
// //                         onChange={(e) => {
// //                           const selected = mandatoryProcesses.find((p) => p.value === e.target.value);
// //                           setSelectedMandatoryProcess(selected);
// //                         }}
// //                       >
// //                         <option value="" disabled>
// //                           Select mandatory process
// //                         </option>
// //                         {mandatoryProcesses.map((process, idx) => (
// //                           <option key={idx} value={process.value}>
// //                             {process.label}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>

// //               {/* SKU Configuration */}
// //               <motion.div className="mb-8" variants={itemVariants}>
// //                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
// //                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
// //                   SKU Configuration
// //                 </h2>
// //                 <div className="bg-gray-50 p-6 rounded-xl">
// //                   <div className="mb-6">
// //                     <label className="block text-gray-700 font-medium mb-2">Number of SKUs</label>
// //                     <select
// //                       className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
// //                       value={quantity}
// //                       onChange={(e) => {
// //                         const q = parseInt(e.target.value);
// //                         setQuantity(q);
// //                         setDesignNames(Array(q).fill(''));
// //                         setSelectedQuantities(Array(q).fill(500));
// //                       }}
// //                     >
// //                       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sku) => (
// //                         <option key={sku} value={sku}>
// //                           {sku}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <label className="block text-gray-700 font-medium mb-2">Design Names</label>
// //                       {[...Array(quantity)].map((_, index) => (
// //                         <div key={index} className="mb-3">
// //                           <input
// //                             type="text"
// //                             placeholder={`Design ${index + 1} name`}
// //                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
// //                             value={designNames[index] || ''}
// //                             onChange={(e) => {
// //                               const updated = [...designNames];
// //                               updated[index] = e.target.value;
// //                               setDesignNames(updated);
// //                             }}
// //                           />
// //                         </div>
// //                       ))}
// //                     </div>
// //                     <div>
// //                       <label className="block text-gray-700 font-medium mb-2">Quantity</label>
// //                       {[...Array(quantity)].map((_, index) => (
// //                         <div key={index} className="mb-3">
// //                           <select
// //                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
// //                             value={selectedQuantities[index]}
// //                             onChange={(e) => handleQuantityChange(index, e.target.value)}
// //                           >
// //                             <option value={500}>500 Pcs</option>
// //                             <option value={1000}>1000 Pcs</option>
// //                             <option value={2000}>2000 Pcs</option>
// //                             <option value={3000}>3000 Pcs</option>
// //                             <option value={5000}>5000 Pcs</option>
// //                           </select>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>

// //               {/* Optional Processes */}
// //               {optionalProcesses.length > 0 && (
// //                 <motion.div className="mb-8" variants={itemVariants}>
// //                   <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
// //                     <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
// //                     Optional Processes
// //                   </h2>
// //                   <div className="bg-gray-50 p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4">
// //                     {optionalProcesses.map((process, idx) => (
// //                       <label key={idx} className="flex items-center space-x-3 text-gray-700">
// //                         <input
// //                           type="checkbox"
// //                           value={process.id}
// //                           checked={selectedOptionalProcesses.includes(process.id)}
// //                           onChange={() => handleOptionalProcessChange(process.id)}
// //                           className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
// //                         />
// //                         <span>{process.name}</span>
// //                       </label>
// //                     ))}
// //                   </div>
// //                 </motion.div>
// //               )}
// //             </div>
// //           </motion.div>
// //         </motion.div>

// //         {/* Sticky Preview & Quotation Sidebar */}
// //         <motion.div className="lg:w-1/4" variants={itemVariants}>
// //           <div className="sticky top-16">
// //             <div className="bg-gray-50 rounded-xl p-6 mb-6">
// //               <motion.div
// //                 className="flex justify-center"
// //                 whileHover={{ scale: 1.05 }}
// //                 transition={{ duration: 0.3 }}
// //               >
// //                 <div className="relative h-40 w-48">
// //                   {product && (
// //                     <Image
// //                       src={standuppouch}
// //                       alt={product.product_name}
// //                       layout="fill"
// //                       objectFit="contain"
// //                       className="rounded-lg"
// //                     />
// //                   )}
// //                 </div>
// //               </motion.div>
// //               <div className="mt-6 text-center text-gray-600 text-sm">
// //                 <p>
// //                   {selectedWidth && selectedLength
// //                     ? `${selectedWidth.label} x ${selectedLength.label}`
// //                     : 'Not selected'}
// //                 </p>
// //                 <p>
// //                   {selectedMaterial?.label || 'Not selected'} • {selectedMandatoryProcess?.label || 'Not selected'}
// //                 </p>
// //                 <p>Category: {categories.find((cat) => cat.id === selectedCategory)?.name || 'Not selected'}</p>
// //               </div>
// //             </div>

// //             <motion.div
// //               className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
// //               whileHover={{ y: -5 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quotation</h3>
// //               <div className="mb-4 text-center text-gray-600 text-sm">
// //                 <p>{jobName || 'Your Custom Pouch'}</p>
// //               </div>
// //               <hr className="my-4 border-gray-200" />

// //               <div className="space-y-3">
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Total Quantity</span>
// //                   <span className="font-medium">{totalQuantity || 0} pcs</span>
// //                 </div>
// //                 {costData && (
// //                   <div className="flex justify-between font-bold text-lg text-gray-800">
// //                     <span>Total</span>
// //                     <span>₹{Number(costData.total_cost).toFixed(2)}</span>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="mt-8 space-y-4">
// //                 <motion.button
// //                   className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
// //                     isQuotationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
// //                   }`}
// //                   whileHover={{ scale: isQuotationLoading ? 1 : 1.02 }}
// //                   whileTap={{ scale: isQuotationLoading ? 1 : 0.98 }}
// //                   onClick={handleRequestQuotation}
// //                   disabled={isQuotationLoading}
// //                 >
// //                   {isQuotationLoading ? 'Generating...' : 'Request Quotation'}
// //                 </motion.button>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Configuration;



















// 'use client'
// import React, { useState, useEffect, useCallback } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { useAuth } from '@/utils/authContext';
// import { useRouter } from 'next/navigation';
// import standuppouch from '@/../public/product/standuppouch.jpg';

// const Configuration = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [isAuthLoading, setIsAuthLoading] = useState(true);

//   // State management
//   const [product, setProduct] = useState(null);
//   const [jobName, setJobName] = useState('');
//   const [sizeOptions, setSizeOptions] = useState({ widths: [], lengths: [] });
//   const [selectedWidth, setSelectedWidth] = useState(null);
//   const [selectedLength, setSelectedLength] = useState(null);
//   const [materialOptions, setMaterialOptions] = useState([]);
//   const [selectedMaterial, setSelectedMaterial] = useState(null);
//   const [mandatoryProcesses, setMandatoryProcesses] = useState([]);
//   const [selectedMandatoryProcess, setSelectedMandatoryProcess] = useState(null);
//   const [optionalProcesses, setOptionalProcesses] = useState([]);
//   const [selectedOptionalProcesses, setSelectedOptionalProcesses] = useState([]);
//   const [zipperOptions, setZipperOptions] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [designNames, setDesignNames] = useState(['']);
//   const [selectedQuantities, setSelectedQuantities] = useState([100]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [costData, setCostData] = useState(null);
//   const [isQuotationLoading, setIsQuotationLoading] = useState(false);
//   const [token, setToken] = useState(null);
//   // New states for categories
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   // Framer Motion variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.5 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   };

//   // Login to get token with retry
//   const loginForThirdParty = useCallback(async (retries = 3) => {
//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         const response = await fetch('https://nexiblesapp.barecms.com/proxy?r=user/authenticate', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email: 'sales@artnext.in',
//             password: 'Artnext@1',
//             subdomain: 'nexibles',
//             otp: false,
//             ipaddress: '58.84.60.235',
//           }),
//         });

//         const result = await response.json();
//         if (result.status) {
//           const newToken = result.data.token;
//           localStorage.setItem('token2', newToken);
//           setToken(newToken);
//           return newToken;
//         } else {
//           throw new Error(result.message || 'Login failed');
//         }
//       } catch (err) {
//         if (attempt === retries) {
//           setError('Failed to authenticate after multiple attempts.');
//           return null;
//         }
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }
//   }, [setError]);

//   // Fetch category data with retry
//   const fetchCategoryData = useCallback(async (retries = 3) => {
//     const APIURL = process.env.NEXT_PUBLIC_API_URL;
//     const token = process.env.NEXT_PUBLIC_API_KEY;

//     if (!APIURL || !token) {
//       setError('API URL or API Key is missing.');
//       return false;
//     }

//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         const response = await fetch(`${APIURL}/api/category_master`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'API-Key': token,
//           },
//         });

//         const data = await response.json();
//         if (data.status === 'success' && data.data) {
//           const filterCategory = data.data
//             .filter((category) => category.origin?.toLowerCase() === 'nexibles')
//             .map((category) => ({
//               id: category.id,
//               name: category.name, // Adjust if the field is different, e.g., category_name
//               cat_url: category.cat_url || '', // Provide fallback if cat_url is missing
//             }));
//           setCategories(filterCategory);
//           return true;
//         } else {
//           throw new Error(data.error || 'Failed to fetch category data');
//         }
//       } catch (err) {
//         if (attempt === retries) {
//           setError(err.message || 'Error fetching category data');
//           return false;
//         }
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }
//   }, [setError]);

//   // Fetch product data with retry
//   const fetchProductData = useCallback(async (authToken, retries = 3) => {
//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         const response = await fetch(
//           'https://nexiblesapp.barecms.com/proxy?r=products/get-product-list&product_type=8&press_id=82&limit=10&offset=0',
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//               Environment: 'frontdesk',
//             },
//           }
//         );

//         const data = await response.json();
//         if (data.status && data.data) {
//           const targetProduct = data.data.find((p) => p.id === '122');
//           if (!targetProduct) throw new Error('Product ID 122 not found');

//           setProduct(targetProduct);

//           // Generate size options
//           const { minimum_width, maximum_width, minimum_length, maximum_length } = targetProduct;

//           // Validate size parameters
//           if (
//             !minimum_width ||
//             !maximum_width ||
//             !minimum_length ||
//             !maximum_length ||
//             isNaN(parseInt(minimum_width)) ||
//             isNaN(parseInt(maximum_width)) ||
//             isNaN(parseInt(minimum_length)) ||
//             isNaN(parseInt(maximum_length))
//           ) {
//             throw new Error('Invalid size parameters in product data');
//           }

//           const widthStep = (parseInt(maximum_width) - parseInt(minimum_width)) / 9;
//           const lengthStep = (parseInt(maximum_length) - parseInt(minimum_length)) / 9;
//           const widths = Array.from({ length: 10 }, (_, i) => {
//             const width = Math.round(parseInt(minimum_width) + i * widthStep);
//             return { value: width, label: `${width} mm` };
//           });
//           const lengths = Array.from({ length: 10 }, (_, i) => {
//             const length = Math.round(parseInt(minimum_length) + i * lengthStep);
//             return { value: length, label: `${length} mm` };
//           });
//           setSizeOptions({ widths, lengths });
//           setSelectedWidth(widths[0] || null);
//           setSelectedLength(lengths[0] || null);

//           // Set material options
//           const materials = Array.isArray(targetProduct.pouch_media)
//             ? targetProduct.pouch_media.map((m) => ({
//                 value: m.id,
//                 label: m.media_title,
//                 widths: m.media_widths ? m.media_widths.split(',') : [],
//               }))
//             : [];
//           setMaterialOptions(materials);
//           setSelectedMaterial(materials[0] || null);

//           // Set mandatory processes
//           const mandatory = Array.isArray(targetProduct.pouch_postpress)
//             ? targetProduct.pouch_postpress
//                 .filter((p) => p.mandatory_any_one)
//                 .map((p) => ({
//                   value: p.id,
//                   label: p.process_name,
//                 }))
//             : [];
//           setMandatoryProcesses(mandatory);
//           setSelectedMandatoryProcess(mandatory[0] || null);

//           // Set optional processes
//           const optional = Array.isArray(targetProduct.pouch_postpress)
//             ? targetProduct.pouch_postpress
//                 .filter((p) => p.optional && !p.mandatory_any_one)
//                 .map((p) => ({
//                   id: p.id,
//                   name: p.process_name,
//                 }))
//             : [];
//           setOptionalProcesses(optional);

//           // Set zipper options
//           const zippers = Array.isArray(targetProduct.pouch_postpress)
//             ? targetProduct.pouch_postpress
//                 .filter((p) => p.mandatory_any_one)
//                 .map((p) => ({
//                   value: p.id,
//                   label: p.process_name,
//                 }))
//             : [];
//           setZipperOptions(zippers);

//           return true;
//         } else {
//           throw new Error(data.message || 'Failed to fetch product data');
//         }
//       } catch (err) {
//         if (attempt === retries) {
//           setError(err.message);
//           return false;
//         }
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }
//   }, [
//     setProduct,
//     setSizeOptions,
//     setSelectedWidth,
//     setSelectedLength,
//     setMaterialOptions,
//     setSelectedMaterial,
//     setMandatoryProcesses,
//     setSelectedMandatoryProcess,
//     setOptionalProcesses,
//     setZipperOptions,
//     setError,
//   ]);

//   // Initialize authentication, product, and category data fetching
//   useEffect(() => {
//     const initialize = async () => {
//       setLoading(true);
//       setError(null);

//       if (user) {
//         setIsAuthLoading(false);
//         const authToken = await loginForThirdParty();
//         if (authToken) {
//           const [productSuccess, categorySuccess] = await Promise.all([
//             fetchProductData(authToken),
//             fetchCategoryData(), // No authToken needed for category API
//           ]);
//           if (!productSuccess || !categorySuccess) {
//             setError('Failed to load product or category data after multiple attempts.');
//           }
//         } else {
//           setError('Authentication failed.');
//         }
//       } else {
//         router.push('/login');
//       }

//       setLoading(false);
//     };

//     initialize();
//   }, [user, router, loginForThirdParty, fetchProductData, fetchCategoryData]);

//   // Handle optional process checkbox changes
//   const handleOptionalProcessChange = (processId) => {
//     setSelectedOptionalProcesses((prev) =>
//       prev.includes(processId)
//         ? prev.filter((id) => id !== processId)
//         : [...prev, processId]
//     );
//   };

//   // Handle SKU quantity changes
//   const handleQuantityChange = (index, value) => {
//     const updated = [...selectedQuantities];
//     updated[index] = parseInt(value);
//     setSelectedQuantities(updated);
//   };

//   // Calculate total quantity
//   const totalQuantity = selectedQuantities.reduce((a, b) => a + b, 0);

//   // Handle Request Quotation
//   const handleRequestQuotation = async () => {
//     setIsQuotationLoading(true);
//     setError(null);
//     try {
//       let authToken = token || localStorage.getItem('token2');
//       if (!authToken) {
//         authToken = await loginForThirdParty();
//         if (!authToken) throw new Error('No authentication token');
//       }

//       // Validate required fields
//       if (!jobName) throw new Error('Project name is required');
//       if (!selectedWidth || !selectedLength) throw new Error('Width and length are required');
//       if (!selectedMaterial) throw new Error('Material is required');
//       if (!selectedMandatoryProcess) throw new Error('Mandatory process is required');

//       const payload = {
//         formData: {
//           job_name: jobName || 'Untitled Project',
//           quantity_one: totalQuantity.toString(),
//           quantity_two: '0',
//           quantity_three: '0',
//           length: selectedLength?.value.toString() || '',
//           width: selectedWidth?.value.toString() || '',
//           no_of_sku: quantity.toString(),
//           pouch_printing_color: '7',
//           media_id: selectedMaterial?.value || '',
//           media_0: '',
//           media_1: '',
//           media_2: '',
//           media_3: '',
//           gusset_size: '3',
//           gusset_color: '7',
//           seal_size: '',
//           mandatory_one_process: selectedMandatoryProcess?.value || '',
//           optional_process: selectedOptionalProcesses,
//           // category_id: selectedCategory || '', // Removed as it may not be expected by the API
//           type: 'basic',
//         },
//         productId: '122',
//         printingTypeId: '8',
//         customerId: '26176',
//       };

//       const response = await fetch(
//         'https://nexiblesapp.barecms.com/proxy?r=flexible-pouch/save-requirement&press_id=82',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${authToken}`,
//             Environment: 'frontdesk',
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();
//       if (result.status && result.data?.costing_data?.length > 0) {
//         setCostData(result.data.costing_data[0]);
//       } else {
//         throw new Error(result.message || 'Failed to generate quotation: Invalid response data');
//       }
//     } catch (err) {
//       console.error('Quotation error:', err);
//       setError(err.message);
//       alert('Failed to generate quotation: ' + err.message);
//     } finally {
//       setIsQuotationLoading(false);
//     }
//   };

//   // Skeleton UI Component
//   const SkeletonLoader = () => (
//     <div className="animate-pulse space-y-6">
//       <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-2/3 space-y-6">
//           <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
//             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//             <div className="h-12 bg-gray-200 rounded"></div>
//             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//             </div>
//           </div>
//         </div>
//         <div className="lg:w-1/4">
//           <div className="bg-gray-50 rounded-xl p-6 space-y-4">
//             <div className="h-40 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
//           </div>
//           <div className="bg-white rounded-xl p-6 mt-6 space-y-4">
//             <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             <div className="h-4 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded"></div>
//             <div className="h-12 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Render auth loading state
//   if (isAuthLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   // Render existing loading and error states
//   if (loading) return <div className="min-h-screen bg-gray-50 py-12 px-6"><SkeletonLoader /></div>;
//   if (error && !product)
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-6">
//         <div className="text-center p-4 text-red-500 bg-red-50 rounded-lg max-w-md mx-auto">
//           {error}
//           <button
//             className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
//             onClick={() => window.location.reload()}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
//       <Head>
//         <title>Custom Pouches | Configuration Tool</title>
//         <meta name="description" content="Configure your custom pouches with our interactive tool" />
//       </Head>

//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold text-gray-800 mb-2">Pouch Configuration Tool</h1>
//         <p className="text-lg text-gray-600">Design your perfect packaging solution</p>
//       </motion.div>

//       <div className="flex flex-col lg:flex-row justify-center mx-auto gap-8">
//         {/* Main Configuration Content */}
//         <motion.div
//           className="lg:w-2/3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div
//             className="bg-white rounded-2xl shadow-xl overflow-hidden"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <div className="p-8">
//               {/* Project Name */}
//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
//                   Project Details
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <label className="block text-gray-700 font-medium mb-2">Project Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter your project name"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
//                     value={jobName}
//                     onChange={(e) => setJobName(e.target.value)}
//                   />
//                 </div>
//               </motion.div>

//               {/* Pouch Specifications */}
//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
//                   Pouch Specifications
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Category */}
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Category</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedCategory}
//                         onChange={(e) => setSelectedCategory(e.target.value)}
//                         disabled={categories.length === 0}
//                       >
//                         <option value="" disabled>
//                           Select category
//                         </option>
//                         {categories.map((category) => (
//                           <option key={category.id} value={category.id}>
//                             {category.name}
//                           </option>
//                         ))}
//                       </select>
//                       {categories.length === 0 && (
//                         <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
//                       )}
//                     </div>

//                     {/* Width */}
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Width</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedWidth?.value || ''}
//                         onChange={(e) => {
//                           const selected = sizeOptions.widths.find((w) => w.value === parseInt(e.target.value));
//                           setSelectedWidth(selected);
//                         }}
//                       >
//                         <option value="" disabled>
//                           Select width
//                         </option>
//                         {sizeOptions.widths?.map((width, idx) => (
//                           <option key={idx} value={width.value}>
//                             {width.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Length */}
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Length</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedLength?.value || ''}
//                         onChange={(e) => {
//                           const selected = sizeOptions.lengths.find((l) => l.value === parseInt(e.target.value));
//                           setSelectedLength(selected);
//                         }}
//                       >
//                         <option value="" disabled>
//                           Select length
//                         </option>
//                         {sizeOptions.lengths?.map((length, idx) => (
//                           <option key={idx} value={length.value}>
//                             {length.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Material */}
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Material</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedMaterial?.value || ''}
//                         onChange={(e) => {
//                           const selected = materialOptions.find((m) => m.value === e.target.value);
//                           setSelectedMaterial(selected);
//                         }}
//                       >
//                         <option value="" disabled>
//                           Select material
//                         </option>
//                         {materialOptions.map((material, idx) => (
//                           <option key={idx} value={material.value}>
//                             {material.label}
//                           </option>
//                         ))}
//                       </select>
//                       {selectedMaterial && (
//                         <p className="text-sm text-gray-500 mt-1">
//                           Available widths: {selectedMaterial.widths.join(', ')} mm
//                         </p>
//                       )}
//                     </div>

//                     {/* Mandatory Process */}
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Mandatory Process</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedMandatoryProcess?.value || ''}
//                         onChange={(e) => {
//                           const selected = mandatoryProcesses.find((p) => p.value === e.target.value);
//                           setSelectedMandatoryProcess(selected);
//                         }}
//                       >
//                         <option value="" disabled>
//                           Select mandatory process
//                         </option>
//                         {mandatoryProcesses.map((process, idx) => (
//                           <option key={idx} value={process.value}>
//                             {process.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* SKU Configuration */}
//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
//                   SKU Configuration
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-medium mb-2">Number of SKUs</label>
//                     <select
//                       className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                       value={quantity}
//                       onChange={(e) => {
//                         const q = parseInt(e.target.value);
//                         setQuantity(q);
//                         setDesignNames(Array(q).fill(''));
//                         setSelectedQuantities(Array(q).fill(100));
//                       }}
//                     >
//                       {[1, 2, 3, 4, 5].map((sku) => (
//                         <option key={sku} value={sku}>
//                           {sku}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Design Names</label>
//                       {[...Array(quantity)].map((_, index) => (
//                         <div key={index} className="mb-3">
//                           <input
//                             type="text"
//                             placeholder={`Design ${index + 1} name`}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
//                             value={designNames[index] || ''}
//                             onChange={(e) => {
//                               const updated = [...designNames];
//                               updated[index] = e.target.value;
//                               setDesignNames(updated);
//                             }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Quantity</label>
//                       {[...Array(quantity)].map((_, index) => (
//                         <div key={index} className="mb-3">
//                           <select
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                             value={selectedQuantities[index]}
//                             onChange={(e) => handleQuantityChange(index, e.target.value)}
//                           >
//                             <option value={100}>500Pcs</option>
//                             <option value={200}>1000 Pcs</option>
//                             <option value={300}>2000 Pcs</option>
//                             <option value={500}>3000 Pcs</option>
//                             <option value={1000}> Pcs</option>
//                           </select>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Optional Processes */}
//               {optionalProcesses.length > 0 && (
//                 <motion.div className="mb-8" variants={itemVariants}>
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                     <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
//                     Optional Processes
//                   </h2>
//                   <div className="bg-gray-50 p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4">
//                     {optionalProcesses.map((process, idx) => (
//                       <label key={idx} className="flex items-center space-x-3 text-gray-700">
//                         <input
//                           type="checkbox"
//                           value={process.id}
//                           checked={selectedOptionalProcesses.includes(process.id)}
//                           onChange={() => handleOptionalProcessChange(process.id)}
//                           className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
//                         />
//                         <span>{process.name}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Sticky Preview & Quotation Sidebar */}
//         <motion.div className="lg:w-1/4" variants={itemVariants}>
//           <div className="sticky top-16">
//             <div className="bg-gray-50 rounded-xl p-6 mb-6">
//               <motion.div
//                 className="flex justify-center"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="relative h-40 w-48">
//                   {product && (
//                     <Image
//                       src={standuppouch}
//                       alt={product.product_name}
//                       layout="fill"
//                       objectFit="contain"
//                       className="rounded-lg"
//                     />
//                   )}
//                 </div>
//               </motion.div>
//               <div className="mt-6 text-center text-gray-600 text-sm">
//                 <p>
//                   {selectedWidth && selectedLength
//                     ? `${selectedWidth.label} x ${selectedLength.label}`
//                     : 'Not selected'}
//                 </p>
//                 <p>
//                   {selectedMaterial?.label || 'Not selected'} • {selectedMandatoryProcess?.label || 'Not selected'}
//                 </p>
//                 <p>Category: {categories.find((cat) => cat.id === selectedCategory)?.name || 'Not selected'}</p>
//               </div>
//             </div>

//             <motion.div
//               className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quotation</h3>
//               <div className="mb-4 text-center text-gray-600 text-sm">
//                 <p>{jobName || 'Your Custom Pouch'}</p>
//               </div>
//               <hr className="my-4 border-gray-200" />

//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total Quantity</span>
//                   <span className="font-medium">{totalQuantity || 0} pcs</span>
//                 </div>
//                 {costData && (
//                   <div className="flex justify-between font-bold text-lg text-gray-800">
//                     <span>Total</span>
//                     <span>₹{Number(costData.total_cost).toFixed(2)}</span>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-8 space-y-4">
//                 <motion.button
//                   className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
//                     isQuotationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
//                   }`}
//                   whileHover={{ scale: isQuotationLoading ? 1 : 1.02 }}
//                   whileTap={{ scale: isQuotationLoading ? 1 : 0.98 }}
//                   onClick={handleRequestQuotation}
//                   disabled={isQuotationLoading}
//                 >
//                   {isQuotationLoading ? 'Generating...' : 'Request Quotation'}
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

<<<<<<< HEAD
// export default Configuration;




// 'use client'
// import React, { useState, useEffect, useCallback } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { useAuth } from '@/utils/authContext';
// import { useRouter } from 'next/navigation';
// import standuppouch from '@/../public/product/standuppouch.jpg';

// const Configuration = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [isAuthLoading, setIsAuthLoading] = useState(true);

//   // Check authentication status and redirect if not logged in
//   useEffect(() => {
//     if (user === null) {
//       router.push('/login');
//     } else {
//       setIsAuthLoading(false);
//     }
//   }, [user, router]);

//   // State management
//   const [product, setProduct] = useState(null);
//   const [jobName, setJobName] = useState('');
//   const [sizeOptions, setSizeOptions] = useState({ widths: [], lengths: [] });
//   const [selectedWidth, setSelectedWidth] = useState(null);
//   const [selectedLength, setSelectedLength] = useState(null);
//   const [materialOptions, setMaterialOptions] = useState([]);
//   const [selectedMaterial, setSelectedMaterial] = useState(null);
//   const [mandatoryProcesses, setMandatoryProcesses] = useState([]);
//   const [selectedMandatoryProcess, setSelectedMandatoryProcess] = useState(null);
//   const [optionalProcesses, setOptionalProcesses] = useState([]);
//   const [selectedOptionalProcesses, setSelectedOptionalProcesses] = useState([]);
//   const [zipperOptions, setZipperOptions] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [designNames, setDesignNames] = useState(['']);
//   const [selectedQuantities, setSelectedQuantities] = useState([100]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [costData, setCostData] = useState(null);
//   const [isQuotationLoading, setIsQuotationLoading] = useState(false);
//   const [token, setToken] = useState(null);

//   // Framer Motion variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.5 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   };

//   // Login to get token with retry
//   const loginForThirdParty = useCallback(async (retries = 3) => {
//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         const response = await fetch('https://nexiblesapp.barecms.com/proxy?r=user/authenticate', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email: 'sales@artnext.in',
//             password: 'Artnext@1',
//             subdomain: 'nexibles',
//             otp: false,
//             ipaddress: '58.84.60.235',
//           }),
//         });

//         const result = await response.json();
//         if (result.status) {
//           const newToken = result.data.token;
//           localStorage.setItem('token2', newToken);
//           setToken(newToken);
//           return newToken;
//         } else {
//           throw new Error(result.message || 'Login failed');
//         }
//       } catch (err) {
//         if (attempt === retries) {
//           setError('Failed to authenticate after multiple attempts.');
//           return null;
//         }
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
//       }
//     }
//   }, []);

//   // Fetch product data with retry
//   const fetchProductData = useCallback(
//     async (authToken, retries = 3) => {
//       for (let attempt = 1; attempt <= retries; attempt++) {
//         try {
//           const response = await fetch(
//             'https://nexiblesapp.barecms.com/proxy?r=products/get-product-list&product_type=8&press_id=82&limit=10&offset=0',
//             {
//               headers: {
//                 Authorization: `Bearer ${authToken}`,
//                 Environment: 'frontdesk',
//               },
//             }
//           );

//           const data = await response.json();
//           if (data.status && data.data) {
//             const targetProduct = data.data.find((p) => p.id === '122');
//             if (!targetProduct) throw new Error('Product ID 122 not found');

//             setProduct(targetProduct);

//             // Generate size options
//             const { minimum_width, maximum_width, minimum_length, maximum_length } = targetProduct;
//             const widthStep = (parseInt(maximum_width) - parseInt(minimum_width)) / 9;
//             const lengthStep = (parseInt(maximum_length) - parseInt(minimum_length)) / 9;
//             const widths = Array.from({ length: 10 }, (_, i) => {
//               const width = Math.round(parseInt(minimum_width) + i * widthStep);
//               return { value: width, label: `${width} mm` };
//             });
//             const lengths = Array.from({ length: 10 }, (_, i) => {
//               const length = Math.round(parseInt(minimum_length) + i * lengthStep);
//               return { value: length, label: `${length} mm` };
//             });
//             setSizeOptions({ widths, lengths });
//             setSelectedWidth(widths[0] || null);
//             setSelectedLength(lengths[0] || null);

//             // Set material options
//             const materials = targetProduct.pouch_media.map((m) => ({
//               value: m.id,
//               label: m.media_title,
//               widths: m.media_widths ? m.media_widths.split(',') : [],
//             }));
//             setMaterialOptions(materials);
//             setSelectedMaterial(materials[0] || null);

//             // Set mandatory processes
//             const mandatory = targetProduct.pouch_postpress
//               .filter((p) => p.mandatory_any_one)
//               .map((p) => ({
//                 value: p.id,
//                 label: p.process_name,
//               }));
//             setMandatoryProcesses(mandatory);
//             setSelectedMandatoryProcess(mandatory[0] || null);

//             // Set optional processes
//             const optional = targetProduct.pouch_postpress
//               .filter((p) => p.optional && !p.mandatory_any_one)
//               .map((p) => ({
//                 id: p.id,
//                 name: p.process_name,
//               }));
//             setOptionalProcesses(optional);

//             // Set zipper options
//             const zippers = targetProduct.pouch_postpress
//               .filter((p) => p.mandatory_any_one)
//               .map((p) => ({
//                 value: p.id,
//                 label: p.process_name,
//               }));
//             setZipperOptions(zippers);

//             return true;
//           } else {
//             throw new Error(data.message || 'Failed to fetch product data');
//           }
//         } catch (err) {
//           if (attempt === retries) {
//             setError(err.message);
//             return false;
//           }
//           await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//         }
//       }
//     },
//     []
//   );

//   // Initialize authentication and data fetching
//   useEffect(() => {
//     const initialize = async () => {
//       setLoading(true);
//       setError(null);

//       let authToken = localStorage.getItem('token2');
//       if (!authToken) {
//         authToken = await loginForThirdParty();
//       } else {
//         setToken(authToken);
//       }

//       if (authToken) {
//         const success = await fetchProductData(authToken);
//         if (!success) {
//           setError('Failed to load product data after multiple attempts.');
//         }
//       } else {
//         setError('Authentication failed.');
//       }

//       setLoading(false);
//     };

//     initialize();
//   }, [loginForThirdParty, fetchProductData]);

//   // Handle optional process checkbox changes
//   const handleOptionalProcessChange = (processId) => {
//     setSelectedOptionalProcesses((prev) =>
//       prev.includes(processId)
//         ? prev.filter((id) => id !== processId)
//         : [...prev, processId]
//     );
//   };

//   // Handle SKU quantity changes
//   const handleQuantityChange = (index, value) => {
//     const updated = [...selectedQuantities];
//     updated[index] = parseInt(value);
//     setSelectedQuantities(updated);
//   };

//   // Calculate total quantity
//   const totalQuantity = selectedQuantities.reduce((a, b) => a + b, 0);

//   // Handle Request Quotation
//   const handleRequestQuotation = async () => {
//     setIsQuotationLoading(true);
//     setError(null);
//     try {
//       let authToken = token || localStorage.getItem('token2');
//       if (!authToken) {
//         authToken = await loginForThirdParty();
//         if (!authToken) throw new Error('No authentication token');
//       }

//       // Validate required fields
//       if (!jobName) throw new Error('Project name is required');
//       if (!selectedWidth || !selectedLength) throw new Error('Width and length are required');
//       if (!selectedMaterial) throw new Error('Material is required');
//       if (!selectedMandatoryProcess) throw new Error('Mandatory process is required');

//       const payload = {
//         formData: {
//           job_name: jobName || 'Untitled Project',
//           quantity_one: totalQuantity.toString(),
//           quantity_two: '0',
//           quantity_three: '0',
//           length: selectedLength?.value.toString() || '',
//           width: selectedWidth?.value.toString() || '',
//           no_of_sku: quantity.toString(),
//           pouch_printing_color: '7',
//           media_id: selectedMaterial?.value || '',
//           media_0: '',
//           media_1: '',
//           media_2: '',
//           media_3: '',
//           gusset_size: '3',
//           gusset_color: '7',
//           seal_size: '',
//           mandatory_one_process: selectedMandatoryProcess?.value || '',
//           optional_process: selectedOptionalProcesses,
//           type: 'basic',
//         },
//         productId: '122',
//         printingTypeId: '8',
//         customerId: '26176',
//       };

//       const response = await fetch(
//         'https://nexiblesapp.barecms.com/proxy?r=flexible-pouch/save-requirement&press_id=82',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${authToken}`,
//             Environment: 'frontdesk',
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();
//       if (result.status && result.data?.costing_data?.length > 0) {
//         setCostData(result.data.costing_data[0]);
//         alert('Quotation generated successfully!');
//       } else {
//         throw new Error(result.message || 'Failed to generate quotation: Invalid response data');
//       }
//     } catch (err) {
//       console.error('Quotation error:', err);
//       setError(err.message);
//       alert('Failed to generate quotation: ' + err.message);
//     } finally {
//       setIsQuotationLoading(false);
//     }
//   };

//   // Skeleton UI Component
//   const SkeletonLoader = () => (
//     <div className="animate-pulse space-y-6">
//       <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-2/3 space-y-6">
//           <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
//             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//             <div className="h-12 bg-gray-200 rounded"></div>
//             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//               <div className="h-12 bg-gray-200 rounded"></div>
//             </div>
//           </div>
//         </div>
//         <div className="lg:w-1/4">
//           <div className="bg-gray-50 rounded-xl p-6 space-y-4">
//             <div className="h-40 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
//           </div>
//           <div className="bg-white rounded-xl p-6 mt-6 space-y-4">
//             <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             <div className="h-4 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded"></div>
//             <div className="h-12 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Render auth loading state
//   if (isAuthLoading || user === null) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   // Render existing loading and error states
//   if (loading) return <div className="min-h-screen bg-gray-50 py-12 px-6"><SkeletonLoader /></div>;
//   if (error && !product)
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-6">
//         <div className="text-center p-4 text-red-500 bg-red-50 rounded-lg max-w-md mx-auto">
//           {error}
//           <button
//             className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
//             onClick={() => window.location.reload()}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
//       <Head>
//         <title>Custom Pouches | Configuration Tool</title>
//         <meta name="description" content="Configure your custom pouches with our interactive tool" />
//       </Head>

//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold text-gray-800 mb-2">Pouch Configuration Tool</h1>
//         <p className="text-lg text-gray-600">Design your perfect packaging solution</p>
//       </motion.div>

//       <div className="flex flex-col lg:flex-row justify-center mx-auto gap-8">
//         {/* Main Configuration Content */}
//         <motion.div
//           className="lg:w-2/3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div
//             className="bg-white rounded-2xl shadow-xl overflow-hidden"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <div className="p-8">
//               {/* Project Name */}
//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
//                   Project Details
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <label className="block text-gray-700 font-medium mb-2">Project Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter your project name"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
//                     value={jobName}
//                     onChange={(e) => setJobName(e.target.value)}
//                   />
//                 </div>
//               </motion.div>

//               {/* Pouch Specifications */}
//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
//                   Pouch Specifications
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Width */}
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Width</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedWidth?.value || ''}
//                         onChange={(e) => {
//                           const selected = sizeOptions.widths.find((w) => w.value === parseInt(e.target.value));
//                           setSelectedWidth(selected);
//                         }}
//                       >
//                         <option value="" disabled>Select width</option>
//                         {sizeOptions.widths?.map((width, idx) => (
//                           <option key={idx} value={width.value}>
//                             {width.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Length */}
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Length</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedLength?.value || ''}
//                         onChange={(e) => {
//                           const selected = sizeOptions.lengths.find((l) => l.value === parseInt(e.target.value));
//                           setSelectedLength(selected);
//                         }}
//                       >
//                         <option value="" disabled>Select length</option>
//                         {sizeOptions.lengths?.map((length, idx) => (
//                           <option key={idx} value={length.value}>
//                             {length.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Material */}
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Material</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedMaterial?.value || ''}
//                         onChange={(e) => {
//                           const selected = materialOptions.find((m) => m.value === e.target.value);
//                           setSelectedMaterial(selected);
//                         }}
//                       >
//                         <option value="" disabled>Select material</option>
//                         {materialOptions.map((material, idx) => (
//                           <option key={idx} value={material.value}>
//                             {material.label}
//                           </option>
//                         ))}
//                       </select>
//                       {selectedMaterial && (
//                         <p className="text-sm text-gray-500 mt-1">
//                           Available widths: {selectedMaterial.widths.join(', ')} mm
//                         </p>
//                       )}
//                     </div>

//                     {/* Mandatory Process */}
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Mandatory Process</label>
//                       <select
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                         value={selectedMandatoryProcess?.value || ''}
//                         onChange={(e) => {
//                           const selected = mandatoryProcesses.find((p) => p.value === e.target.value);
//                           setSelectedMandatoryProcess(selected);
//                         }}
//                       >
//                         <option value="" disabled>Select mandatory process</option>
//                         {mandatoryProcesses.map((process, idx) => (
//                           <option key={idx} value={process.value}>
//                             {process.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* SKU Configuration */}
//               <motion.div className="mb-8" variants={itemVariants}>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
//                   SKU Configuration
//                 </h2>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-medium mb-2">Number of SKUs</label>
//                     <select
//                       className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                       value={quantity}
//                       onChange={(e) => {
//                         const q = parseInt(e.target.value);
//                         setQuantity(q);
//                         setDesignNames(Array(q).fill(''));
//                         setSelectedQuantities(Array(q).fill(100));
//                       }}
//                     >
//                       {[1, 2, 3, 4, 5].map((sku) => (
//                         <option key={sku} value={sku}>
//                           {sku}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Design Names</label>
//                       {[...Array(quantity)].map((_, index) => (
//                         <div key={index} className="mb-3">
//                           <input
//                             type="text"
//                             placeholder={`Design ${index + 1} name`}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none"
//                             value={designNames[index] || ''}
//                             onChange={(e) => {
//                               const updated = [...designNames];
//                               updated[index] = e.target.value;
//                               setDesignNames(updated);
//                             }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Quantity</label>
//                       {[...Array(quantity)].map((_, index) => (
//                         <div key={index} className="mb-3">
//                           <select
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
//                             value={selectedQuantities[index]}
//                             onChange={(e) => handleQuantityChange(index, e.target.value)}
//                           >
//                             <option value={100}>100 Pcs</option>
//                             <option value={200}>200 Pcs</option>
//                             <option value={300}>300 Pcs</option>
//                             <option value={500}>500 Pcs</option>
//                             <option value={1000}>1000 Pcs</option>
//                           </select>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Optional Processes */}
//               {optionalProcesses.length > 0 && (
//                 <motion.div className="mb-8" variants={itemVariants}>
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                     <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
//                     Optional Processes
//                   </h2>
//                   <div className="bg-gray-50 p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4">
//                     {optionalProcesses.map((process, idx) => (
//                       <label key={idx} className="flex items-center space-x-3 text-gray-700">
//                         <input
//                           type="checkbox"
//                           value={process.id}
//                           checked={selectedOptionalProcesses.includes(process.id)}
//                           onChange={() => handleOptionalProcessChange(process.id)}
//                           className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
//                         />
//                         <span>{process.name}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Sticky Preview & Quotation Sidebar */}
//         <motion.div className="lg:w-1/4" variants={itemVariants}>
//           <div className="sticky top-16">
//             <div className="bg-gray-50 rounded-xl p-6 mb-6">
//               <motion.div
//                 className="flex justify-center"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="relative h-40 w-48">
//                   {product && (
//                     <Image
//                       src={standuppouch}
//                       alt={product.product_name}
//                       layout="fill"
//                       objectFit="contain"
//                       className="rounded-lg"
//                     />
//                   )}
//                 </div>
//               </motion.div>
//               <div className="mt-6 text-center text-gray-600 text-sm">
//                 <p>
//                   {selectedWidth && selectedLength
//                     ? `${selectedWidth.label} x ${selectedLength.label}`
//                     : 'Not selected'}
//                 </p>
//                 <p>{selectedMaterial?.label || 'Not selected'} • {selectedMandatoryProcess?.label || 'Not selected'}</p>
//               </div>
//             </div>

//             <motion.div
//               className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quotation</h3>
//               <div className="mb-4 text-center text-gray-600 text-sm">
//                 <p>{jobName || 'Your Custom Pouch'}</p>
//               </div>
//               <hr className="my-4 border-gray-200" />

//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total Quantity</span>
//                   <span className="font-medium">{totalQuantity || 0} pcs</span>
//                 </div>
//                 {costData && (
//                   <div className="flex justify-between font-bold text-lg text-gray-800">
//                     <span>Total</span>
//                     <span>₹{Number(costData.total_cost).toFixed(2)}</span>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-8 space-y-4">
//                 <motion.button
//                   className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
//                     isQuotationLoading
//                       ? 'bg-gray-400 cursor-not-allowed'
//                       : 'bg-black text-white hover:bg-gray-800'
//                   }`}
//                   whileHover={{ scale: isQuotationLoading ? 1 : 1.02 }}
//                   whileTap={{ scale: isQuotationLoading ? 1 : 0.98 }}
//                   onClick={handleRequestQuotation}
//                   disabled={isQuotationLoading}
//                 >
//                   {isQuotationLoading ? 'Generating...' : 'Request Quotation'}
//                 </motion.button>
//                 <motion.button
//                   className="w-full py-3 px-4 bg-[#103b60] text-black font-medium rounded-lg border border-gray-300 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Save Configuration
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Configuration;
=======
export default Configuration;
>>>>>>> 23d204b565fe080b917ed45e400c1e37e0fddbe6
=======
// export default Configuration;
>>>>>>> f485fed5cc687e8f75251d2171a0da8cbb22760e
