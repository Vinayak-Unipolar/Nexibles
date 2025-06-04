// "use client";
// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useAuth } from "@/utils/authContext";
// import { useRouter, useSearchParams } from "next/navigation";
// import { toast } from "react-toastify";
// import ShippingAddress from "./ShippingAddress";
// import OrderSummary from "./OrderSummary";
// import PaymentMethod from "./PaymentMethod";
// import CartItems from "./CartItems";
// import { useSelector, useDispatch } from 'react-redux';
// import { setCoupon, setGST } from '../../redux/store/cartSlice';

// export default function Shipping({ defaultAddress, addresses }) {
//   const token = process.env.NEXT_PUBLIC_API_KEY;
//   const APIURL = process.env.NEXT_PUBLIC_API_URL;
//   const dispatch = useDispatch();
//   const { items: cartItems, appliedCoupon, gstAmount } = useSelector((state) => state.cart);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [subTotal, setSubTotal] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [shippingCost, setShippingCost] = useState(0);
//   const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false);
//   const [deliveryEstimate, setDeliveryEstimate] = useState({ days: "", date: "" });
//   const [loading2, setLoading2] = useState(false);
//   const [isProcessingOrder, setIsProcessingOrder] = useState(false);
//   const { user } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const status = searchParams.get("status");
//   const GST_RATE = 0.18;

//   const [formData, setFormData] = useState({
//     customerId: "",
//     location: "",
//     serviceArea: "",
//     title: "",
//     houseno: "",
//     floor: "",
//     address: "",
//     address2: "",
//     state: "",
//     city: "",
//     zip: "",
//     country: "",
//     phone: "",
//     mobile: "",
//     addressType: "",
//     company: "",
//     addedon: new Date().toISOString(),
//     latlong: "",
//     street_no: "",
//     isDefault: "1",
//   });

//   const validateAndCorrectWeights = async (cartItems) => {
//     try {
//       const response = await fetch(`${APIURL}/api/sizes`, {
//         headers: {
//           'API-Key': 'irrv211vui9kuwn11efsb4xd4zdkuq'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch size data');
//       }

//       const sizeData = await response.json();

//       const nexiblesSize = sizeData.find(item =>
//         item.Size.toLowerCase() === 'nexibles'
//       );
//       const nexiblesWeight = nexiblesSize ? parseFloat(nexiblesSize.Weight) : 0;
//       const correctedItems = cartItems.map(item => {
//         return {
//           ...item,
//           weight: nexiblesWeight
//         };
//       });

//       return correctedItems;

//     } catch (error) {
//       console.error('Error validating Nexibles weight:', error);
//       return cartItems.map(item => ({
//         ...item,
//         weight: 0
//       }));
//     }
//   };

//   const CheckShippingCost = async (zipcode, items) => {
//     if (!zipcode) {
//       //console.log('No zip code provided for shipping cost check');
//       return;
//     }
//     try {
//       const correctedItems = await validateAndCorrectWeights(items);
//       const totalWeight = correctedItems.reduce((sum, item) => {
//         const weightInGrams = parseFloat(item.weight) || 0;
//         const weightInKg = weightInGrams / 1000;
//         const itemQuantity = parseInt(item.quantity) || 1;
//         return sum + (weightInKg * itemQuantity);
//       }, 0);
//       const weightToUse = totalWeight > 0 ? totalWeight : 0.001;

//       const response = await fetch(`${APIURL}/api/shipping/check`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           delivery_postcode: zipcode,
//           weight: weightToUse,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch shipping cost: ${response.statusText}`);
//       }

//       const data = await response.json();
//       const totalAfterDiscount = parseFloat(subTotal) - parseFloat(discountAmount);
//       const calculatedGst = totalAfterDiscount * GST_RATE;

//       if (data.status && data.rateOfFirstIndex) {
//         setIsDeliveryAvailable(true);
//         const shippingFee = parseFloat(data.rateOfFirstIndex) || 150;
//         setShippingCost(shippingFee);
//         const productionTime = 21;
//         const shippingDays = parseInt(data.estimated_delivery_daysOfFirstIndex, 10) || 0;

//         const currentDate = new Date();
//         const deliveryDate = new Date(currentDate);
//         deliveryDate.setDate(currentDate.getDate() + productionTime + shippingDays);
//         const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
//           month: 'short',
//           day: 'numeric',
//           year: 'numeric',
//         });

//         setDeliveryEstimate({
//           days: shippingDays,
//           date: formattedDeliveryDate
//         });

//         const newTotal = (totalAfterDiscount + shippingFee + calculatedGst).toFixed(2);
//         setTotalPrice(newTotal);
//       } else {
//         setIsDeliveryAvailable(false);
//         setShippingCost(0);
//         setDeliveryEstimate({ days: "", date: "" });
//         const newTotal = (totalAfterDiscount + calculatedGst).toFixed(2);
//         setTotalPrice(newTotal);
//       }
//     } catch (err) {
//       console.error('Error fetching shipping cost:', err.message);
//       setIsDeliveryAvailable(false);
//       setDeliveryEstimate({ days: "", date: "" });
//       setShippingCost(0);
//       const totalAfterDiscount = parseFloat(subTotal) - parseFloat(discountAmount);
//       const calculatedGst = totalAfterDiscount * GST_RATE;
//       const newTotal = (totalAfterDiscount + calculatedGst).toFixed(2);
//       setTotalPrice(newTotal);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     if (name === 'zip' && value.length === 6) {
//       CheckShippingCost(value, cartItems);
//     }
//   };

//   const calculateSubtotal = useCallback(() => {
//     const subtotal = cartItems.reduce(
//       (total, item) => total + Number(item.totalPrice || 0),
//       0
//     );
//     return subtotal;
//   }, [cartItems]);

//   useEffect(() => {
//     const initializeClientData = async () => {
//       if (defaultAddress?.data?.zip) {
//         setFormData((prevState) => ({
//           ...prevState,
//           zip: defaultAddress.data.zip,
//           address: defaultAddress.data.address || "",
//           address2: defaultAddress.data.address2 || "",
//           city: defaultAddress.data.city || "",
//           state: defaultAddress.data.state || "",
//           country: defaultAddress.data.country || "",
//           phone: defaultAddress.data.phone || "",
//           mobile: defaultAddress.data.mobile || "",
//         }));
//       } else {
//         // console.log('No default address zip found in defaultAddress:', defaultAddress);
//       }

//       const newSubTotal = calculateSubtotal();
//       setSubTotal(newSubTotal.toFixed(2));

//       let newDiscountAmount = 0;
//       if (appliedCoupon) {
//         const totalDiscount = cartItems.reduce(
//           (sum, item) => sum + (parseFloat(item.discountAmount) || 0),
//           0
//         );
//         const maxDiscount = appliedCoupon.max_discount;
//         newDiscountAmount = Math.min(totalDiscount, maxDiscount);
//         setDiscountAmount(newDiscountAmount.toFixed(2));
//       }

//       const totalAfterDiscount = (newSubTotal - newDiscountAmount).toFixed(2);
//       const calculatedGst = parseFloat(totalAfterDiscount) * GST_RATE;
//       dispatch(setGST(calculatedGst.toFixed(2)));

//       const correctedItems = await validateAndCorrectWeights(cartItems);

//       if (defaultAddress?.data?.zip) {
//         await CheckShippingCost(defaultAddress.data.zip, correctedItems);
//       } else {
//         //console.log('No zip code available to check shipping cost');
//         const newTotalPrice = (parseFloat(totalAfterDiscount) + calculatedGst).toFixed(2);
//         setTotalPrice(newTotalPrice);
//       }
//     };

//     initializeClientData();
//   }, [cartItems, appliedCoupon, defaultAddress, calculateSubtotal, dispatch]);

//   useEffect(() => {
//     if (status) {
//       switch (status) {
//         case "success": toast.success("Payment completed successfully!"); break;
//         case "cancelled": toast.error("Payment was cancelled. Please try again."); break;
//         case "failed": toast.error("Payment failed. Please try again or use a different payment method."); break;
//         case "error": toast.error("Payment failed. Please try again"); break;
//         default: toast.error("Payment was not completed. Please try again.");
//       }
//     }
//   }, [status]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!user) return;
//       let customerId = user?.result?.customerId || user?.customerId;
//       const formDataWithCustomerId = { ...formData, customerId };
//       const response = await fetch(`${APIURL}/api/customerAddress`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formDataWithCustomerId),
//       });

//       if (!response.ok) throw new Error("Failed to insert address");
//       const data = await response.json();
//       if (typeof window !== "undefined") window.location.reload();
//     } catch (error) {
//       console.error("Error inserting address:", error);
//     }
//   };

//   const getOrderDetailsFromRedux = async () => {
//     const correctedItems = await validateAndCorrectWeights(cartItems);

//     return correctedItems.map((product) => {
//       const selectedOptions = product.selectedOptions || {};
//       const flattenedOptions = Object.keys(selectedOptions).reduce((acc, optionKey) => {
//         const option = selectedOptions[optionKey];
//         return { ...acc, [`${optionKey}OptionName`]: option.optionName, [`${optionKey}Price`]: option.price };
//       }, {});

//       const optionKeys = Object.keys(selectedOptions);
//       const productConfigId = optionKeys.length > 0 ? optionKeys[0] : null;
//       const productOptionId = optionKeys.length > 0 ? selectedOptions[optionKeys[0]].optionName : null;

//       return {
//         id: product.id,
//         name: product.name,
//         price: parseFloat(product.price || 0).toFixed(2),
//         quantity: product.quantity || product.totalQuantity || 1,
//         payment_status: "pending",
//         discountAmount: parseFloat(product.discountAmount || 0).toFixed(2),
//         discountPercentage: parseFloat(product.discountPercentage || 0).toFixed(2),
//         discountedPrice: parseFloat(product.discountedPrice || product.totalPrice || 0).toFixed(2),
//         product_option_id: productOptionId,
//         product_config_id: productConfigId,
//         origin: "Nexibles",
//         skuCount: product.skuCount,
//         material: product.material || "",
//       };
//     });
//   };

//   const createOrder = async () => {
//     if (isProcessingOrder) return false;
//     setIsProcessingOrder(true);

//     try {
//       if (!user) {
//         toast.error("You need to login first");
//         router.push("/login");
//         return false;
//       }

//       const orderNo = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
//       const orderDate = new Date().toISOString();
//       const addressDetails = defaultAddress?.data || {};
//       const newSubTotal = calculateSubtotal();
//       const totalAfterDiscount = newSubTotal - parseFloat(discountAmount);
//       const calculatedGst = totalAfterDiscount * GST_RATE;

//       const finalTotal = (totalAfterDiscount + calculatedGst + parseFloat(shippingCost)).toFixed(2);
//       setTotalPrice(finalTotal);

//       const requestBody = {
//         orderNo,
//         orderDate,
//         pmtMethod: "",
//         customerID: user?.result?.customerId || user?.customerId,
//         salutation: "",
//         firstName: user?.result?.firstName || user?.firstName,
//         lastName: user?.result?.lastName || user?.lastName,
//         mobile: addressDetails.phone || user?.result?.mobile,
//         eMail: user?.result?.emailAddress,
//         street: addressDetails.floor || "",
//         address: (addressDetails.address || "") + "," + (addressDetails.address2 || ""),
//         city: addressDetails.city || "",
//         state: addressDetails.state || "",
//         company: addressDetails.title || "",
//         zipcode: addressDetails.zip || "",
//         country: addressDetails.country || "",
//         remark: "",
//         coupon: appliedCoupon?.coupon_code || "",
//         currency: "",
//         invamt: finalTotal,
//         tax: calculatedGst.toFixed(2),
//         ordstatus: "",
//         discount: discountAmount,
//         disamt: discountAmount,
//         promoDiscount: appliedCoupon ? appliedCoupon.discount : "0",
//         minDeliveryAmt: finalTotal,
//         orderCharge: shippingCost.toFixed(2),
//         ipAddress: "",
//         confirm_status: "0",
//         origin: "Nexibles",
//         orderDetails: await getOrderDetailsFromRedux(),
//       };
//       //console.log(requestBody);
//       const response = await fetch(`${APIURL}/api/createorder`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "API-Key": "irrv211vui9kuwn11efsb4xd4zdkuq" },
//         body: JSON.stringify(requestBody),
//       });
//       const responseData = await response.json();
//       if (responseData.success === true) {
//         if (typeof window !== "undefined")
//           localStorage.setItem("orderNo", responseData.orderNo);
//         return true;
//       } else {
//         throw new Error(responseData.message || "Failed to create order");
//       }
//     } catch (error) {
//       console.error("Error in createOrder:", error);
//       return false;
//     } finally {
//       setIsProcessingOrder(false);
//     }
//   };

//   const makePayment = async (e) => {
//     e.preventDefault();
//     setLoading2(true);

//     try {
//       const orderCreated = await createOrder();
//       if (!orderCreated) {
//         setLoading2(false);
//         return;
//       }

//       const amount = parseFloat(totalPrice);
//       if (isNaN(amount) || amount <= 0) {
//         throw new Error("Invalid total price for payment");
//       }

//       var baseUrl = `https://nexibles.com`;
//       if (typeof window !== "undefined") baseUrl = window.location.origin;

//       const transactionId = "T" + Date.now();
//       const orderNo = typeof window !== "undefined" ? localStorage.getItem("orderNo") : null;

//       const data = {
//         orderNo,
//         name: user?.result?.firstName ?? user?.firstName,
//         number: user?.result?.mobile ?? user?.mobile,
//         MUID: user?.result?.customerId ?? user?.customerId,
//         amount: Math.round(amount * 100),
//         transactionId,
//         redirectUrl: `${baseUrl}/api/check-status?transactionId=${transactionId}&url=${baseUrl}`,
//       };

//       const paymentResponse = await axios.post(`${APIURL}/api/payment`, data);
//       if (typeof window !== "undefined") window.location.href = paymentResponse.data.url;
//     } catch (error) {
//       setLoading2(false);
//       console.error("Error processing payment:", error);
//       toast.error("Failed to process payment");
//     }
//   };

//   return (
//     <div className="h-auto mt-20 bg-white">
//       <div className="border rounded-md md:flex">
//         <ShippingAddress
//           defaultAddress={defaultAddress}
//           addresses={addresses}
//           user={user}
//           formData={formData}
//           setFormData={setFormData}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           isDeliveryAvailable={isDeliveryAvailable}
//           deliveryEstimate={deliveryEstimate}
//         />
//         <hr />
//         <OrderSummary
//           subTotal={subTotal}
//           discountAmount={discountAmount}
//           shippingCost={shippingCost}
//           gstAmount={gstAmount}
//           totalPrice={totalPrice}
//           isDeliveryAvailable={isDeliveryAvailable}
//           deliveryEstimate={deliveryEstimate}
//         />
//       </div>
//       <div className="h-auto p-10 bg-white md:flex">
//         <PaymentMethod
//           defaultAddress={defaultAddress}
//           addresses={addresses}
//           totalPrice={totalPrice}
//           makePayment={makePayment}
//           loading2={loading2}
//           isProcessingOrder={isProcessingOrder}
//         />
//         <CartItems cartItems={cartItems} />
//       </div>
//     </div>
//   );
// }"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "@/utils/authContext";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import ShippingAddress from "./ShippingAddress";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import CartItems from "./CartItems";
import { useSelector, useDispatch } from 'react-redux';
import { setCoupon, setGST } from '../../redux/store/cartSlice';

export default function Shipping({ defaultAddress, addresses }) {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();
  const { items: cartItems, appliedCoupon, gstAmount } = useSelector((state) => state.cart);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false);
  const [deliveryEstimate, setDeliveryEstimate] = useState({ days: "", date: "" });
  const [loading2, setLoading2] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const GST_RATE = 0.18;

  // Initialize selectedAddress with defaultAddress.data
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress?.data || null);

  const [formData, setFormData] = useState({
    customerId: "",
    location: "",
    serviceArea: "",
    title: "",
    houseno: "",
    floor: "",
    address: "",
    address2: "",
    state: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    mobile: "",
    addressType: "",
    company: "",
    addedon: new Date().toISOString(),
    latlong: "",
    street_no: "",
    isDefault: "1",
  });

  // Rest of the code remains unchanged...
  const validateAndCorrectWeights = async (cartItems) => {
    try {
      const response = await fetch(`${APIURL}/api/sizes`, {
        headers: {
          'API-Key': 'irrv211vui9kuwn11efsb4xd4zdkuq'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch size data');
      }

      const sizeData = await response.json();

      const nexiblesSize = sizeData.find(item =>
        item.Size.toLowerCase() === 'nexibles'
      );
      const nexiblesWeight = nexiblesSize ? parseFloat(nexiblesSize.Weight) : 0;
      const correctedItems = cartItems.map(item => {
        return {
          ...item,
          weight: nexiblesWeight
        };
      });

      return correctedItems;

    } catch (error) {
      console.error('Error validating Nexibles weight:', error);
      return cartItems.map(item => ({
        ...item,
        weight: 0
      }));
    }
  };

  // In Shipping.js
  // In Shipping.js
  const CheckShippingCost = async (zipcode, items) => {
    if (!zipcode) {
      return;
    }
    try {
      const correctedItems = await validateAndCorrectWeights(items);
      const totalWeight = correctedItems.reduce((sum, item) => {
        const weightInGrams = parseFloat(item.weight) || 0;
        const weightInKg = weightInGrams / 1000;
        const itemQuantity = parseInt(item.quantity) || 1;
        return sum + (weightInKg * itemQuantity);
      }, 0);
      const weightToUse = totalWeight > 0 ? totalWeight : 0.001;

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
        throw new Error(`Failed to fetch shipping cost: ${response.statusText}`);
      }

      const data = await response.json();
      const totalAfterDiscount = parseFloat(subTotal) - parseFloat(discountAmount);
      const calculatedGst = totalAfterDiscount * GST_RATE;

      if (data.status && data.rateOfFirstIndex) {
        setIsDeliveryAvailable(true);
        const shippingFee = parseFloat(data.rateOfFirstIndex);
        setShippingCost(shippingFee);
        const productionTime = 21;
        const shippingDays = parseInt(data.estimated_delivery_daysOfFirstIndex, 10) || 0;

        const currentDate = new Date();
        const deliveryDate = new Date(currentDate);
        deliveryDate.setDate(currentDate.getDate() + productionTime + shippingDays);
        const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

        setDeliveryEstimate({
          days: shippingDays,
          date: formattedDeliveryDate,
        });

        const newTotal = (totalAfterDiscount + shippingFee + calculatedGst).toFixed(2);
        setTotalPrice(newTotal);
      } else {
        setIsDeliveryAvailable(false);
        setShippingCost(0);
        setDeliveryEstimate({ days: "", date: "" });
        const newTotal = (totalAfterDiscount + calculatedGst).toFixed(2);
        setTotalPrice(newTotal);
        // Show toast warning only once
        toast.warning(data.message || "Shipment is not available. Please use another address.", {
          toastId: 'shipping-unavailable', // Use a unique toastId to prevent duplicates
        });
      }
    } catch (err) {
      console.error('Error fetching shipping cost:', err.message);
      setIsDeliveryAvailable(false);
      setDeliveryEstimate({ days: "", date: "" });
      setShippingCost(0);
      const totalAfterDiscount = parseFloat(subTotal) - parseFloat(discountAmount);
      const calculatedGst = totalAfterDiscount * GST_RATE;
      const newTotal = (totalAfterDiscount + calculatedGst).toFixed(2);
      setTotalPrice(newTotal);
      // Only show toast if not already shown in the else block
      toast.warning("Shipment is not available due to an error. Please use another address.", {
        toastId: 'shipping-unavailable', // Use the same toastId to prevent duplicates
      });
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'zip' && value.length === 6) {
      CheckShippingCost(value, cartItems);
    }
  };

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
    setFormData((prevState) => ({
      ...prevState,
      zip: address.zip || "",
      address: address.address || "",
      address2: address.address2 || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "",
      phone: address.phone || "",
      mobile: address.mobile || "",
      title: address.title || "",
      floor: address.floor || "",
    }));
    if (address.zip) {
      CheckShippingCost(address.zip, cartItems);
    }
  };

  const calculateSubtotal = useCallback(() => {
    const subtotal = cartItems.reduce(
      (total, item) => total + Number(item.totalPrice || 0),
      0
    );
    return subtotal;
  }, [cartItems]);

  useEffect(() => {
    const initializeClientData = async () => {
      if (selectedAddress?.zip) {
        setFormData((prevState) => ({
          ...prevState,
          zip: selectedAddress.zip,
          address: selectedAddress.address || "",
          address2: selectedAddress.address2 || "",
          city: selectedAddress.city || "",
          state: selectedAddress.state || "",
          country: selectedAddress.country || "",
          phone: selectedAddress.phone || "",
          mobile: selectedAddress.mobile || "",
          title: selectedAddress.title || "",
          floor: selectedAddress.floor || "",
        }));
      }

      const newSubTotal = calculateSubtotal();
      setSubTotal(newSubTotal.toFixed(2));

      let newDiscountAmount = 0;
      if (appliedCoupon) {
        const totalDiscount = cartItems.reduce(
          (sum, item) => sum + (parseFloat(item.discountAmount) || 0),
          0
        );
        const maxDiscount = appliedCoupon.max_discount;
        newDiscountAmount = Math.min(totalDiscount, maxDiscount);
        setDiscountAmount(newDiscountAmount.toFixed(2));
      }

      const totalAfterDiscount = (newSubTotal - newDiscountAmount).toFixed(2);
      const calculatedGst = parseFloat(totalAfterDiscount) * GST_RATE;
      dispatch(setGST(calculatedGst.toFixed(2)));

      const correctedItems = await validateAndCorrectWeights(cartItems);

      if (selectedAddress?.zip) {
        await CheckShippingCost(selectedAddress.zip, correctedItems);
      } else {
        const newTotalPrice = (parseFloat(totalAfterDiscount) + calculatedGst).toFixed(2);
        setTotalPrice(newTotalPrice);
      }
    };

    initializeClientData();
  }, [cartItems, appliedCoupon, selectedAddress, calculateSubtotal, dispatch]);

  useEffect(() => {
    if (status) {
      switch (status) {
        case "success": toast.success("Payment completed successfully!"); break;
        case "cancelled": toast.error("Payment was cancelled. Please try again."); break;
        case "failed": toast.error("Payment failed. Please try again or use a different payment method."); break;
        case "error": toast.error("Payment failed. Please try again"); break;
        default: toast.error("Payment was not completed. Please try again.");
      }
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) return;
      let customerId = user?.result?.customerId || user?.customerId;
      const formDataWithCustomerId = { ...formData, customerId };
      const response = await fetch(`${APIURL}/api/customerAddress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataWithCustomerId),
      });

      if (!response.ok) throw new Error("Failed to insert address");
      const data = await response.json();
      if (typeof window !== "undefined") window.location.reload();
    } catch (error) {
      console.error("Error inserting address:", error);
    }
  };

  const getOrderDetailsFromRedux = async () => {
    const correctedItems = await validateAndCorrectWeights(cartItems);

    return correctedItems.map((product) => {
      const selectedOptions = product.selectedOptions || {};
      const flattenedOptions = Object.keys(selectedOptions).reduce((acc, optionKey) => {
        const option = selectedOptions[optionKey];
        return { ...acc, [`${optionKey}OptionName`]: option.optionName, [`${optionKey}Price`]: option.price };
      }, {});

      const optionKeys = Object.keys(selectedOptions);
      const productConfigId = optionKeys.length > 0 ? optionKeys[0] : null;
      const productOptionId = optionKeys.length > 0 ? selectedOptions[optionKeys[0]].optionName : null;

      return {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price || 0).toFixed(2),
        quantity: product.quantity || product.totalQuantity || 1,
        payment_status: "pending",
        discountAmount: parseFloat(product.discountAmount || 0).toFixed(2),
        discountPercentage: parseFloat(product.discountPercentage || 0).toFixed(2),
        discountedPrice: parseFloat(product.discountedPrice || product.totalPrice || 0).toFixed(2),
        product_option_id: productOptionId,
        product_config_id: productConfigId,
        origin: "Nexibles",
        skuCount: product.skuCount,
        material: product.material || "",
      };
    });
  };

  const createOrder = async () => {
    if (isProcessingOrder) return false;
    setIsProcessingOrder(true);

    try {
      if (!user) {
        toast.error("You need to login first");
        router.push("/login");
        return false;
      }

      const orderNo = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const orderDate = new Date().toISOString();
      const addressDetails = selectedAddress || {};
      const newSubTotal = calculateSubtotal();
      const totalAfterDiscount = newSubTotal - parseFloat(discountAmount);
      const calculatedGst = totalAfterDiscount * GST_RATE;

      const finalTotal = (totalAfterDiscount + calculatedGst + parseFloat(shippingCost)).toFixed(2);
      setTotalPrice(finalTotal);

      const requestBody = {
        orderNo,
        orderDate,
        pmtMethod: "",
        customerID: user?.result?.customerId || user?.customerId,
        salutation: "",
        firstName: user?.result?.firstName || user?.firstName,
        lastName: user?.result?.lastName || user?.lastName,
        mobile: addressDetails.phone || user?.result?.mobile,
        eMail: user?.result?.emailAddress,
        street: addressDetails.floor || "",
        address: (addressDetails.address || "") + "," + (addressDetails.address2 || ""),
        city: addressDetails.city || "",
        state: addressDetails.state || "",
        company: addressDetails.title || "",
        zipcode: addressDetails.zip || "",
        country: addressDetails.country || "",
        remark: "",
        coupon: appliedCoupon?.coupon_code || "",
        currency: "",
        invamt: finalTotal,
        tax: calculatedGst.toFixed(2),
        ordstatus: "",
        discount: discountAmount,
        disamt: discountAmount,
        promoDiscount: appliedCoupon ? appliedCoupon.discount : "0",
        minDeliveryAmt: finalTotal,
        orderCharge: shippingCost.toFixed(2),
        ipAddress: "",
        confirm_status: "0",
        origin: "Nexibles",
        orderDetails: await getOrderDetailsFromRedux(),
      };
      const response = await fetch(`${APIURL}/api/createorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "API-Key": "irrv211vui9kuwn11efsb4xd4zdkuq" },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();
      if (responseData.success === true) {
        if (typeof window !== "undefined")
          localStorage.setItem("orderNo", responseData.orderNo);
        return true;
      } else {
        throw new Error(responseData.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Error in createOrder:", error);
      return false;
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const makePayment = async (e) => {
    e.preventDefault();
    setLoading2(true);

    try {
      const orderCreated = await createOrder();
      if (!orderCreated) {
        setLoading2(false);
        return;
      }

      const amount = parseFloat(totalPrice);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Invalid total price for payment");
      }

      var baseUrl = `https://nexibles.com`;
      if (typeof window !== "undefined") baseUrl = window.location.origin;

      const transactionId = "T" + Date.now();
      const orderNo = typeof window !== "undefined" ? localStorage.getItem("orderNo") : null;

      const data = {
        orderNo,
        name: user?.result?.firstName ?? user?.firstName,
        number: user?.result?.mobile ?? user?.mobile,
        MUID: user?.result?.customerId ?? user?.customerId,
        amount: Math.round(amount * 100),
        transactionId,
        redirectUrl: `${baseUrl}/api/check-status?transactionId=${transactionId}&url=${baseUrl}`,
      };

      const paymentResponse = await axios.post(`${APIURL}/api/payment`, data);
      if (typeof window !== "undefined") window.location.href = paymentResponse.data.url;
    } catch (error) {
      setLoading2(false);
      console.error("Error processing payment:", error);
      toast.error("Failed to process payment");
    }
  };

  return (
    <div className="h-auto mt-20 bg-white">
      <div className="border rounded-md md:flex">
        <ShippingAddress
          defaultAddress={defaultAddress}
          addresses={addresses}
          user={user}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isDeliveryAvailable={isDeliveryAvailable}
          deliveryEstimate={deliveryEstimate}
          selectedAddress={selectedAddress}
          setSelectedAddress={handleAddressChange}
        />
        <hr />
        <OrderSummary
          subTotal={subTotal}
          discountAmount={discountAmount}
          shippingCost={shippingCost}
          gstAmount={gstAmount}
          totalPrice={totalPrice}
          isDeliveryAvailable={isDeliveryAvailable}
          deliveryEstimate={deliveryEstimate}
        />
      </div>
      <div className="h-auto p-10 bg-white md:flex">
        <PaymentMethod
          defaultAddress={defaultAddress}
          addresses={addresses}
          totalPrice={totalPrice}
          makePayment={makePayment}
          loading2={loading2}
          isProcessingOrder={isProcessingOrder}
          isDeliveryAvailable={isDeliveryAvailable}
        />
        <CartItems cartItems={cartItems} />
      </div>
    </div>
  );
}