'use client';
import React, { useState, useEffect, useCallback } from 'react';
import ProductModal from './ProductModal';
import ProductImages from './ProductImages';
import ProductDetails from './ProductDetails';
import AddToCartButton from './AddToCartButton';
import Overview from './Overview';
import ReviewSection from './ReviewSection';
import RelatedProducts from './RelatedProducts';
import { toast } from 'react-toastify';
import Loader from '@/components/comman/Loader';
import { TbTruckDelivery } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/store/cartSlice';
import Link from 'next/link';
export default function PCCardDetails({ productDetails }) {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const initialQty = parseInt(productDetails.product?.qty, 10) || 1;
  const [selectedQuantity, setSelectedQuantity] = useState(initialQty);
  const [selectedSKU, setSelectedSKU] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [productPrice, setProductPrice] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(true);
  const [deliveryEstimate, setDeliveryEstimate] = useState({
    productionDays: "",
    shippingDays: "",
    date: ""
  });

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const minimumQuantity = parseInt(productDetails.product?.qty, 10) || 1;

  const numberOfSKUs = Math.floor(parseInt(selectedQuantity, 10) / minimumQuantity) || 1;

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const CheckShippingCost = async (zipcode) => {
    if (!zipcode) return;
    try {
      const totalWeight = parseFloat(productDetails.product?.weight || 1) * selectedQuantity;
      const weightToUse = (totalWeight > 0 ? totalWeight : 1) / 1000;
  
      const response = await fetch(`${APIURL}/api/shipping/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          delivery_postcode: zipcode,
          weight: weightToUse,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch shipping cost');
      }
  
      const data = await response.json();
      if (data.status && data.rateOfFirstIndex) {
        setIsDeliveryAvailable(true);
        const shippingFee = parseFloat(data.rateOfFirstIndex);
        setShippingCost(shippingFee);
        const productionTime = 21; 
        const shippingDays = parseInt(data.estimated_delivery_daysOfFirstIndex, 10) || 4;
        const currentDate = new Date(); 
        const deliveryDate = new Date(currentDate);
        deliveryDate.setDate(currentDate.getDate() + productionTime + shippingDays);
        const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
        setDeliveryEstimate({
          productionDays: productionTime,
          shippingDays: shippingDays,
          date: formattedDeliveryDate,
        });
      } else {
        setIsDeliveryAvailable(false);
        setShippingCost(0);
        setDeliveryEstimate({ productionDays: "", shippingDays: "", date: "" });
      }
    } catch (err) {
      console.error('Error fetching shipping cost:', err);
      setIsDeliveryAvailable(false);
      setDeliveryEstimate({ productionDays: "", shippingDays: "", date: "" });
      setShippingCost(0);
    }
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    setZipCode(value);
    if (value.length === 6) {
      CheckShippingCost(value);
    }
  };

  const handleAddToCart = () => {
    const qtyToUse = parseInt(selectedQuantity, 10) || 0;
    if (qtyToUse < minimumQuantity) {
      toast.warning(`Quantity must be at least ${minimumQuantity}`);
      return;
    }

    const unitPrice = productPrice || productDetails.product.price;
    const totalPrice = unitPrice * qtyToUse;

    const firstImage = productImages && productImages.length > 0 ? productImages[0] : '';

    const productToAdd = {
      id: productDetails.product.id,
      name: productDetails.product.name,
      category: productDetails.product.category,
      image: firstImage,
      price: unitPrice,
      quantity: qtyToUse,
      totalPrice: totalPrice,
      skuCount: selectedSKU,
    };

    dispatch(addToCart(productToAdd));
    const existingItem = cartItems.find(item => item.id === productToAdd.id);
    setCartItemCount(existingItem ? cartItems.length : cartItems.length + 1);
    //toast.success('Product added to cart successfully');
  };

  const handleIncreaseQuantity = useCallback(() => {
    setSelectedQuantity(prevQty => parseInt(prevQty || 0, 10) + 1);
  }, []);

  const handleDecreaseQuantity = useCallback(() => {
    setSelectedQuantity(prevQty => {
      const currentQty = parseInt(prevQty || 0, 10);
      return currentQty > 1 ? currentQty - 1 : 1;
    });
  }, []);
  const handleQuantityInputChange = (e) => {
    const value = e.target.value;
    setSelectedQuantity(value);
    if (parseInt(value, 10) < minimumQuantity * selectedSKU) {
      setSelectedSKU(1);
    }
  };
  const handleSKUChange = (e) => {
    setSelectedSKU(parseInt(e.target.value, 10));
  };

  const debouncedIncrease = debounce(handleIncreaseQuantity, 300);
  const debouncedDecrease = debounce(handleDecreaseQuantity, 300);

  const priceAfterCalculation = (productPrice || productDetails.product.price) *
    (parseInt(selectedQuantity, 10) || minimumQuantity);

  useEffect(() => {
    const productId = productDetails.product?.id;
    if (productId) {
      setLoading(true);
      setError(null);

      const fetchAdditionalImages = fetch(`${APIURL}/api/productimages/${productId}`, {
        headers: {
          'Content-type': 'application/json',
          'API-Key': apiKey,
        },
      })
        .then(res => res.json())
        .catch(error => ({ status: 'error', error }));

      Promise.all([fetchAdditionalImages])
        .then(([additionalImagesData]) => {
          const defaultImage = productDetails?.product?.image
            ? `${process.env.NEXT_PUBLIC_CDN_URL}/${productDetails.product.image}`
            : null;

          const additionalImages =
            additionalImagesData.status === 'success' && additionalImagesData.data
              ? additionalImagesData.data.map(img => `${process.env.NEXT_PUBLIC_CDN_URL}/${img.image_url}`)
              : [];

          setProductImages([defaultImage, ...additionalImages].filter(Boolean));
          setProductPrice(parseFloat(productDetails.product.price));
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
          setError('Failed to load product data. Please try again later.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productDetails?.product?.id, apiKey]);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen h-auto">
      <div className="containers mx-auto px-4 ">
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full h-[45vh] md:w-1/2">
            <ProductImages
              productImages={productImages}
              defaultImage={
                productImages[0] ||
                `${process.env.NEXT_PUBLIC_CDN_URL}/${productDetails.product.image}`
              }
              onImageClick={() => setIsModalOpen(true)}
            />
          </div>

          <div className="w-full md:w-1/2 md:mt-0">
            <ProductDetails
              name={productDetails.product.name}
              description={productDetails.product.description}
              price={productPrice || productDetails.product.price}
              material={productDetails.product.material}
            />
            <div className="mt-4 md:mt-6">
              {productPrice !== null || productDetails.product.price ? (
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <span className="text-base md:text-lg font-semibold text-gray-800">₹{productPrice || productDetails.product.price}</span>
                  <span className="text-gray-500 text-base md:text-lg">×</span>
                  <div className="flex items-center rounded-md border border-gray-200 bg-white shadow-sm">
                    <button
                      onClick={debouncedDecrease}
                      className="w-8 md:w-9 h-8 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-l-md disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={parseInt(selectedQuantity || 0, 10) <= 1}
                    >
                      <span className="text-lg md:text-xl font-medium">-</span>
                    </button>
                    <input
                      type="text"
                      value={selectedQuantity}
                      onChange={handleQuantityInputChange}
                      className="w-12 md:w-16 h-8 md:h-9 text-center border-none focus:outline-none text-gray-800 font-medium"
                    />
                    <button
                      onClick={debouncedIncrease}
                      className="w-8 md:w-9 h-8 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-r-md"
                    >
                      <span className="text-lg md:text-xl font-medium">+</span>
                    </button>
                  </div>
                  <span className="text-gray-500 text-base md:text-lg mx-1 md:mx-2">=</span>
                  <span className="text-base md:text-lg font-bold text-gray-900 ">₹{priceAfterCalculation}</span>
                  <span className="text-gray-400 text-xs w-full md:w-auto md:ml-2">
                    (Minimum Quantity: {minimumQuantity})
                  </span>
                </div>
              ) : null}
            </div>
            <div className="">
              <label htmlFor="skuSelect" className="block text-sm font-medium text-gray-700 mb-1">
                Number of SKUs
              </label>
              <div className="md:flex w-full items-center">
                <div className="md:w-1/3 md:pr-1 md:pb-0 pb-2">
                  <select
                    id="skuSelect"
                    value={selectedSKU}
                    onChange={handleSKUChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    disabled={numberOfSKUs < 1}
                  >
                    {Array.from({ length: numberOfSKUs }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:w-1/2 md:pl-1">
                  <div className="">
                    {(parseInt(selectedQuantity, 10) || 0) >= minimumQuantity ? (
                      <button
                        onClick={handleAddToCart}
                        className="w-full md:w-auto bg-[#30384E] hover:bg-[#252b3d] rounded-md px-8 md:px-24 py-2 text-white font-medium transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className="w-full md:w-auto bg-[#30384E] hover:bg-[#252b3d] rounded-md px-8 md:px-12 py-3 text-white font-medium transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Add to Cart
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
            {/* Delivery Options (unchanged) */}
            <div className="mt-4 md:mt-6">
              <div className="flex gap-2 items-center">
                <div className="text-gray-800 font-bold text-xs md:text-sm uppercase flex items-center">
                  DELIVERY OPTIONS
                </div>
                <TbTruckDelivery size={24} />
              </div>
              <input
                id="zipCode"
                type="text"
                value={zipCode}
                onChange={handleZipCodeChange}
                placeholder="Enter 6-digit zip code"
                maxLength={6}
                className="w-full md:w-[15rem] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mt-2 text-sm md:text-base"
              />
              {zipCode.length === 6 && (
                <div className="mt-3 md:mt-4">
                  {isDeliveryAvailable ? (
                    <div className="text-sm md:text-md">
                      {deliveryEstimate.productionDays && deliveryEstimate.shippingDays && deliveryEstimate.date && (
                        <>
                          <p className="font-medium text-red-700">Get it by: {deliveryEstimate.date}</p>
                          <p className="text-gray-700">Production: {deliveryEstimate.productionDays} days + Shipping: {deliveryEstimate.shippingDays} days</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="bg-red-50 p-2 md:p-3 rounded-md border border-red-200">
                      <p className="text-red-600 font-semibold text-sm md:text-base">Delivery Not Available</p>
                      <p className="text-red-500 text-xs md:text-sm">
                        We currently do not deliver to this zip code.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Remaining sections (unchanged) */}
        <div className="mt-8 md:mt-24">
          <Overview productDetails={productDetails} productImages={productImages} />
        </div>
        <div className="mt-6 md:mt-10">
          <ReviewSection productDetails={productDetails} />
        </div>
        <div className="mt-6 md:mt-20 mb-8 md:mb-12">
          <RelatedProducts productDetails={productDetails} />
        </div>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productDetails={productDetails}
        productImages={productImages}
      />
    </div>
  );
}