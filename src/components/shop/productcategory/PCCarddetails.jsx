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
import SKUSelector from './SKUSelector';
import DeliveryOptions from './DeliveryOptions';

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
      material: productDetails.product.material,
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
            ? `${process.env.NEXT_PUBLIC_CDN_URL}/product/${productDetails.product.image}`
            : null;

          const additionalImages =
            additionalImagesData.status === 'success' && additionalImagesData.data
              ? additionalImagesData.data.map(img => `${process.env.NEXT_PUBLIC_CDN_URL}/product/${img.image_url}`)
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
    <div className="h-auto min-h-screen bg-white">
      <div className="px-4 mx-auto md:px-6 lg:px-8 containers max-w-7xl">
        <div className="flex flex-col pt-6 md:flex-row md:gap-12 md:pt-10">
          {/* Product Images Section */}
          <div className="w-full h-[45vh] md:w-1/2 md:h-[60vh] mb-8 md:mb-0 sticky top-[15%]">
            <ProductImages
              productImages={productImages}
              defaultImage={
                productImages[0] ||
                `${process.env.NEXT_PUBLIC_CDN_URL}/product/${productDetails.product.image}`
              }
              onImageClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-1/2 md:pl-4">
            <ProductDetails
              productDetails={productDetails}
              debouncedDecrease={debouncedDecrease}
              debouncedIncrease={debouncedIncrease}
              name={productDetails.product.name}
              description={productDetails.product.description}
              price={productPrice || productDetails.product.price}
              material={productDetails.product.material}
              selectedQuantity={selectedQuantity}
              handleQuantityInputChange={handleQuantityInputChange}
              priceAfterCalculation={priceAfterCalculation}
              minimumQuantity={minimumQuantity}
            />

            <div className="mt-8">
              <SKUSelector
                selectedSKU={selectedSKU}
                setSelectedSKU={setSelectedSKU}
                numberOfSKUs={numberOfSKUs}
                selectedQuantity={selectedQuantity}
                minimumQuantity={minimumQuantity}
                handleAddToCart={handleAddToCart}
              />
            </div>

            <div className="mt-8">
              <DeliveryOptions
                zipCode={zipCode}
                setZipCode={setZipCode}
                CheckShippingCost={CheckShippingCost}
                isDeliveryAvailable={isDeliveryAvailable}
                deliveryEstimate={deliveryEstimate}
              />
            </div>
          </div>
        </div>

        {/* Product Overview Section */}
        <div className="mt-16 md:mt-24">
          <Overview productDetails={productDetails} productImages={productImages} />
        </div>

        <hr className="my-12 border-gray-200" />

        {/* Review Section */}
        <div className="my-12">
          <ReviewSection productDetails={productDetails} />
        </div>

        {/* Related Products Section */}
        <div className="mt-12 mb-16">
          <RelatedProducts productDetails={productDetails} />
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productDetails={productDetails}
        productImages={productImages}
      />
    </div>
  );
}