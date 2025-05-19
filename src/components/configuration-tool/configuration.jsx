'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useAuth } from '@/utils/authContext';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/store/cartSlice';
import Loader from '../comman/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Configuration = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [jobName, setJobName] = useState('');
  const [sizeOptions, setSizeOptions] = useState({ widths: [], lengths: [] });
  const [selectedWidth, setSelectedWidth] = useState(null);
  const [lengthInput, setLengthInput] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [materialOptions, setMaterialOptions] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [mandatoryProcesses, setMandatoryProcesses] = useState([]);
  const [selectedMandatoryProcess, setSelectedMandatoryProcess] = useState(null);
  const [optionalProcesses, setOptionalProcesses] = useState([]);
  const [selectedSeal, setSelectedSeal] = useState('');
  const [selectedHangHole, setSelectedHangHole] = useState('');
  const [selectedPouchOpening, setSelectedPouchOpening] = useState('');
  const [selectedMultiProcesses, setSelectedMultiProcesses] = useState([]);
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
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isMandatoryProcessOpen, setIsMandatoryProcessOpen] = useState(false);
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);
  const [isSealOpen, setIsSealOpen] = useState(false);
  const [isHangHoleOpen, setIsHangHoleOpen] = useState(false);
  const [isPouchOpeningOpen, setIsPouchOpeningOpen] = useState(false);
  const [isSkuQuantityOpen, setIsSkuQuantityOpen] = useState([false]);
  const [gussetOptions, setGussetOptions] = useState([]);
  const [selectedGusset, setSelectedGusset] = useState(null);

  const NEXI_CDN_URL = process.env.NEXT_NEXIBLES_CDN_URL || 'https://cdn.nexibles.com';
  const DEFAULT_IMAGE_URL = `${NEXI_CDN_URL}/category/default-image.jpg`;

  const loginForThirdParty = useCallback(async (retries = 3) => {
    setToken(null);
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
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

  const fetchCategoryData = useCallback(async (authToken, retries = 3) => {
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
          const uniqueCategories = [];
          const seenNames = new Set();

          data.data.forEach((product) => {
            const productName = product.product_name?.trim();
            if (productName && !seenNames.has(productName.toLowerCase())) {
              seenNames.add(productName.toLowerCase());
              uniqueCategories.push({
                id: product.id,
                name: productName,
                bg_Img: product.product_picture || DEFAULT_IMAGE_URL,
                cat_url: '',
              });
            }
          });

          setCategories(uniqueCategories);
          if (uniqueCategories.length > 0) {
            const defaultCategory = uniqueCategories.find((cat) => cat.id === '122') || uniqueCategories[0];
            setSelectedCategory(defaultCategory.id);
          }
          return true;
        } else {
          throw new Error(data.message || 'Failed to fetch category data');
        }
      } catch (err) {
        console.error(`Category fetch attempt ${attempt} failed:`, err.message);
        if (attempt === retries) {
          setError(err.message || 'Error fetching category data');
          return false;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }, []);

  const fetchProductData = useCallback(async (authToken, categoryId, retries = 3) => {
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
          const targetProduct = data.data.find((p) => p.id === categoryId);
          if (!targetProduct) throw new Error(`Product with ID ${categoryId} not found`);

          setProduct(targetProduct);

          const { minimum_length, maximum_length } = targetProduct;

          if (
            !minimum_length ||
            !maximum_length ||
            isNaN(parseInt(minimum_length)) ||
            isNaN(parseInt(maximum_length))
          ) {
            throw new Error('Invalid length parameters in product data');
          }

          const lengths = Array.from({ length: 10 }, (_, i) => {
            const lengthStep = (parseInt(maximum_length) - parseInt(minimum_length)) / 9;
            const length = Math.round(parseInt(minimum_length) + i * lengthStep);
            return { value: length, label: `${length} mm` };
          });
          setSizeOptions((prev) => ({ ...prev, lengths }));
          setLengthInput(lengths[0]?.value?.toString() || '');

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
              .filter((p) => p.mandatory_any_one && p.process_name !== 'Aplix Zipper')
              .map((p) => ({
                value: p.id,
                label: p.process_name,
              }))
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

          return true;
        } else {
          throw new Error(data.message || 'Failed to fetch product data');
        }
      } catch (err) {
        console.error(`Product fetch attempt ${attempt} failed:`, err.message);
        if (attempt === retries) {
          setError(err.message);
          return false;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }, []);

  const fetchGussetData = useCallback(async (authToken, productId, retries = 3) => {
    if (!authToken || !productId) {
      setError('Authentication token or product ID is missing.');
      return false;
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(
          `https://nexiblesapp.barecms.com/proxy?r=products/get-product-gusset-list&product_id=${productId}&press_id=82`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Environment: 'frontdesk',
            },
          }
        );

        const data = await response.json();
        if (data.status && Array.isArray(data.data)) {
          const validGussets = data.data
            .filter((g) => g.status === '1' && parseInt(g.pouch_width) > 0)
            .map((g) => ({
              id: g.id,
              pouch_width: g.pouch_width,
              open_size: g.open_size,
              close_size: g.close_size,
              label: `${g.pouch_width} mm`,
            }));

          setGussetOptions(validGussets);
          setSelectedGusset(validGussets[0] || null);

          const widths = validGussets.map((g) => ({
            value: parseInt(g.pouch_width),
            label: `${g.pouch_width} mm`,
          }));
          setSizeOptions((prev) => ({ ...prev, widths }));
          setSelectedWidth(widths[0] || null);

          return true;
        } else {
          throw new Error(data.message || 'Failed to fetch gusset data');
        }
      } catch (err) {
        console.error(`Gusset fetch attempt ${attempt} failed:`, err.message);
        if (attempt === retries) {
          setError(err.message || 'Error fetching gusset data');
          return false;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }, []);

  useEffect(() => {
    if (!user) {
      toast.warning('You need to be logged in to customize.', {
        toastId: 'login-warning',
      });
      router.push('/login');
      setIsAuthLoading(false);
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      setLoading(true);
      setError(null);
      setIsAuthLoading(true);

      const authToken = await loginForThirdParty();
      if (!authToken && isMounted) {
        setError('Authentication failed.');
        setIsAuthLoading(false);
        setLoading(false);
        return;
      }

      if (isMounted) {
        const categorySuccess = await fetchCategoryData(authToken);
        if (!categorySuccess) {
          setError('Failed to load categories. Please try again.');
          setIsAuthLoading(false);
          setLoading(false);
          return;
        }

        const productSuccess = await fetchProductData(authToken, '122');
        if (!productSuccess) {
          setError('Failed to load product data. Please try again.');
          setIsAuthLoading(false);
          setLoading(false);
          return;
        }

        const gussetSuccess = await fetchGussetData(authToken, '122');
        if (!gussetSuccess) {
          setError('Failed to load gusset data. Please try again.');
          setIsAuthLoading(false);
          setLoading(false);
          return;
        }
      }

      if (isMounted) {
        setIsAuthLoading(false);
        setLoading(false);
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, [user, router, loginForThirdParty, fetchCategoryData, fetchProductData, fetchGussetData]);

  useEffect(() => {
    if (token && selectedCategory) {
      fetchGussetData(token, selectedCategory);
    }
  }, [selectedCategory, token, fetchGussetData]);

  useEffect(() => {
    setIsSkuQuantityOpen(Array(Math.max(1, quantity)).fill(false));
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
    lengthInput,
    selectedMaterial,
    selectedMandatoryProcess,
    selectedSeal,
    selectedHangHole,
    selectedPouchOpening,
    selectedMultiProcesses,
    selectedGusset,
    quantity,
    designNames,
    selectedQuantities,
  ]);

  const handleMultiProcessChange = (processId) => {
    setSelectedMultiProcesses((prev) =>
      prev.includes(processId) ? prev.filter((id) => id !== processId) : [...prev, processId]
    );
  };

  const handleQuantityChange = (index, value) => {
    if (index >= quantity) return;
    const updated = [...selectedQuantities];
    updated[index] = parseInt(value) || 500;
    setSelectedQuantities(updated);
  };

  const handleLengthInputChange = (value) => {
    setLengthInput(value);
    setLengthError('');

    if (!value) return;

    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue <= 0) {
      setLengthError('Please enter a valid positive number');
      return;
    }

    if (product) {
      const minLength = parseInt(product.minimum_length);
      const maxLength = parseInt(product.maximum_length);
      if (numValue < minLength || numValue > maxLength) {
        setLengthError(`Length must be between ${minLength} mm and ${maxLength} mm`);
      }
    }
  };

  const totalQuantity = selectedQuantities.reduce((a, b) => a + (parseInt(b) || 0), 0);

  const handleRequestQuotation = async () => {
    setIsQuotationLoading(true);
    setError(null);

    try {
      const authToken = await loginForThirdParty();
      if (!authToken) throw new Error('Authentication token is missing.');

      if (!jobName) throw new Error('Project name is required');
      if (!selectedWidth) throw new Error('Width is required');
      if (!lengthInput) throw new Error('Length is required');
      if (lengthError) throw new Error('Invalid length value');
      if (!selectedMaterial) throw new Error('Material is required');
      if (!selectedGusset) throw new Error('Gusset is required');

      const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name;
      const normalizedCategoryName = categoryName?.trim().toLowerCase() || '';
      const optionalProcessIds = [
        selectedSeal,
        selectedHangHole,
        normalizedCategoryName !== 'stand up pouch' ? selectedPouchOpening : null,
        ...selectedMultiProcesses,
      ].filter(Boolean);

      const payload = {
        formData: {
          job_name: jobName || 'Untitled Project',
          quantity_one: totalQuantity.toString(),
          quantity_two: '0',
          quantity_three: '0',
          length: lengthInput.toString(),
          width: selectedWidth?.value.toString() || '',
          no_of_sku: quantity.toString(),
          pouch_printing_color: '7',
          media_id: selectedMaterial?.value || '',
          media_0: '',
          media_1: '',
          media_2: '',
          media_3: '',
          gusset_size: selectedGusset?.close_size || '3',
          gusset_color: '7',
          seal_size: '',
          mandatory_one_process: selectedMandatoryProcess?.value || '',
          optional_process: optionalProcessIds,
          type: 'basic',
        },
        productId: selectedCategory || '122',
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

    const unitPrice = totalQuantity > 0 ? totalCost / totalQuantity : 0;
    const totalPrice = totalCost;

    const selectedOptions = {
      width: { optionName: selectedWidth?.label || 'Not specified', price: 0 },
      length: { optionName: lengthInput ? `${lengthInput} mm` : 'Not specified', price: 0 },
      mandatoryProcess: { optionName: selectedMandatoryProcess?.label || 'Not specified', price: 0 },
      seal: { optionName: sealOptions.find((opt) => opt.value === selectedSeal)?.label || 'None', price: 0 },
      hangHole: {
        optionName: hangHoleOptions.find((opt) => opt.value === selectedHangHole)?.label || 'None',
        price: 0,
      },
      pouchOpening: {
        optionName: pouchOpeningOptions.find((opt) => opt.value === selectedPouchOpening)?.label || 'None',
        price: 0,
      },
      gusset: { optionName: selectedGusset?.label || 'Not specified', price: 0 },
      additionalOptions: {
        optionName:
          multiSelectOptions
            .filter((opt) => selectedMultiProcesses.includes(opt.id))
            .map((opt) => opt.name)
            .join(', ') || 'None',
        price: 0,
      },
    };

    const productToAdd = {
      id: product.id,
      name: jobName || product.product_name || 'Custom Pouch',
      category: categories.find((cat) => cat.id === selectedCategory)?.name || 'Pouches',
      image: categories.find((cat) => cat.id === selectedCategory)?.bg_Img || DEFAULT_IMAGE_URL,
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
        <div className="text-gray-600">
          <Loader />
        </div>
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <Head>
        <title>Custom Pouches | Configuration Tool</title>
        <meta name="description" content="Configure your custom pouches with our interactive tool" />
      </Head>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Pouch Configuration Tool</h1>
        <p className="text-lg text-gray-600">Design your perfect packaging solution</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center mx-auto gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="mb-8">
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
              </div>

              <div className="mb-8 relative">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Pouch Specifications
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  {/* Display Min/Max Width and Length */}
                  {/* {product && (
                    <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Size Constraints for {categories.find((cat) => cat.id === selectedCategory)?.name || 'Selected Category'}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Width Range:</span> {product.minimum_width || 'N/A'} mm - {product.maximum_width || 'N/A'} mm
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Length Range:</span> {product.minimum_length || 'N/A'} mm - {product.maximum_length || 'N/A'} mm
                          </p>
                        </div>
                      </div>
                    </div>
                  )} */}
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
                          <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            <div
                              className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                              onClick={() => {
                                setSelectedCategory('122');
                                fetchProductData(token, '122');
                                fetchGussetData(token, '122');
                                setIsCategoryOpen(false);
                              }}
                            >
                              <div className="w-6 h-6 mr-2 flex-shrink-0"></div>
                              <span>Select default category</span>
                            </div>
                            {categories.map((category) => (
                              <div
                                key={category.id}
                                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                onClick={() => {
                                  setSelectedCategory(category.id);
                                  if (category.name.trim().toLowerCase() === 'stand up pouch') {
                                    setSelectedPouchOpening('');
                                  }
                                  fetchProductData(token, category.id);
                                  fetchGussetData(token, category.id);
                                  setIsCategoryOpen(false);
                                }}
                              >
                                <div className="w-6 h-6 mr-2 flex-shrink-0">
                                  <Image
                                    src={category.bg_Img}
                                    alt={category.name}
                                    width={24}
                                    height={24}
                                    className="object-contain rounded"
                                    onError={(e) => {
                                      e.target.src = DEFAULT_IMAGE_URL;
                                    }}
                                  />
                                </div>
                                <span>{category.name}</span>
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
                      <label className="block text-gray-700 font-medium mb-1">
                        Width
                        <span className="text-xs text-gray-500 ml-1">
                          (Min : {product.minimum_width || 'N/A'} mm - Max : {product.maximum_width || 'N/A'} mm)
                        </span>
                      </label>
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
                          <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            <div
                              className="p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setSelectedWidth(null);
                                setIsWidthOpen(false);
                              }}
                            >
                              Select width
                            </div>
                            {sizeOptions.widths
                              .filter(
                                (width, index, self) =>
                                  index === self.findIndex((w) => w.value === width.value)
                              )
                              .map((width, idx) => (
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
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Length
                        <span className="text-xs text-gray-500 ml-1">
                          (Min : {product.minimum_length || 'N/A'} mm - Max : {product.maximum_length || 'N/A'} mm)
                        </span>
                      </label>
                      <input
                        type="number"
                        placeholder={`Enter length (${product?.minimum_length || '0'}-${product?.maximum_length || '0'} mm)`}
                        className={`w-full px-4 py-3 border ${lengthError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 outline-none`}
                        value={lengthInput}
                        onChange={(e) => handleLengthInputChange(e.target.value)}
                        min={product?.minimum_length || 0}
                        max={product?.maximum_length || Infinity}
                      />
                      {lengthError && (
                        <p className="text-sm text-red-500 mt-1">{lengthError}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Material</label>
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
                          <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
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
                      {selectedMaterial && (
                        <p className="text-sm text-gray-500 mt-1">
                          Available widths: {selectedMaterial.widths.join(', ')} mm
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Mandatory Process</label>
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
                          <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 relative">
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
                        <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
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
                            <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
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
              </div>

              {(sealOptions.length > 0 || hangHoleOptions.length > 0 || pouchOpeningOptions.length > 0 || multiSelectOptions.length > 0) && (
                <div className="mb-8 relative">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                    Optional Processes
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-xl space-y-6">
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
                              <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
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
                              <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
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
                              <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
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

                    {multiSelectOptions.length > 0 && (
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Additional Options</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {multiSelectOptions.map((process) => (
                            <label key={process.id} className="flex items-center space-x-3 text-gray-700">
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
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-1/4">
          <div className="sticky top-16">
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex justify-center">
                <div className="relative h-40 w-48">
                  {selectedCategory && categories.length > 0 ? (
                    <Image
                      src={categories.find((cat) => cat.id === selectedCategory)?.bg_Img || DEFAULT_IMAGE_URL}
                      alt={categories.find((cat) => cat.id === selectedCategory)?.name || 'Pouch Image'}
                      fill
                      className="object-contain rounded-lg"
                      onError={(e) => {
                        e.target.src = DEFAULT_IMAGE_URL;
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Select a category</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 text-center text-gray-600 text-sm">
                <p>
                  {selectedWidth && lengthInput
                    ? `${selectedWidth.label} x ${lengthInput} mm`
                    : 'Not selected'}
                </p>
                <p>
                  {selectedMaterial?.label || 'Not selected'} •{' '}
                  {selectedMandatoryProcess?.label || 'Not selected'}
                </p>
                {/* <p>Gusset: {selectedGusset?.label || 'Not selected'}</p> */}
                <p>
                  Category: {categories.find((cat) => cat.id === selectedCategory)?.name || 'Not selected'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
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
                {isQuotationGenerated ? (
                  <button
                    className="w-full py-3 px-4 font-medium rounded-lg bg-[#103b60] text-white hover:bg-[#0a2b47] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#103b60]"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                      isQuotationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
                    }`}
                    onClick={handleRequestQuotation}
                    disabled={isQuotationLoading}
                  >
                    {isQuotationLoading ? 'Generating...' : 'Request Quotation'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
