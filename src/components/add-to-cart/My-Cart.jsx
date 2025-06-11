// // "use client";
// // import { useState, useEffect, useCallback } from "react";
// // import { BsCart3 } from "react-icons/bs";
// // import { MdDelete } from "react-icons/md";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { toast } from "react-toastify";
// // import { useSelector, useDispatch } from 'react-redux';
// // import { removeFromCart, setCoupon, removeCoupon, setGST, updateCartItems } from '../../redux/store/cartSlice';

// // export default function MyCart() {
// //   const token = process.env.NEXT_PUBLIC_API_KEY;
// //   const APIURL = process.env.NEXT_PUBLIC_API_URL;
// //   const dispatch = useDispatch();
// //   const { items: cartItems, appliedCoupon, gstAmount } = useSelector((state) => state.cart);
// //   const [promoCode, setPromoCode] = useState("");
// //   const [couponError, setCouponError] = useState("");
// //   const router = useRouter();
// //   const [isProcessingOrder, setIsProcessingOrder] = useState(false);
// //   const GST_RATE = 0.18;


// //   const applyCouponToItems = useCallback(
// //     (coupon) => {
// //       const total = calculateSubTotal();
// //       if (total >= coupon.min_amount) {
// //         const updatedCartItems = cartItems.map((item) => {
// //           const discount = (item.totalPrice * coupon.discount) / 100;
// //           return {
// //             ...item,
// //             discountAmount: discount,
// //             discountPercentage: coupon.discount,
// //             discountedPrice: item.totalPrice - discount,
// //           };
// //         });

// //         const totalDiscount = updatedCartItems.reduce(
// //           (sum, item) => sum + (item.discountAmount || 0),
// //           0
// //         );
// //         const cappedDiscount = Math.min(totalDiscount, coupon.max_discount);
// //         const scaleFactor = totalDiscount > 0 ? cappedDiscount / totalDiscount : 1;

// //         return updatedCartItems.map((item) => {
// //           const adjustedDiscount = item.discountAmount * scaleFactor;
// //           return {
// //             ...item,
// //             discountAmount: adjustedDiscount,
// //             discountedPrice: item.totalPrice - adjustedDiscount,
// //           };
// //         });
// //       }
// //       return cartItems;
// //     },
// //     [cartItems]
// //   );
// //   //console.log(cartItems);
// //   const removeCartItem = (index) => {
// //     dispatch(removeFromCart(index));
// //     if (appliedCoupon) {
// //       const total = calculateSubTotal();
// //       if (total < appliedCoupon.min_amount || cartItems.length <= 1) {
// //         handleRemoveCoupon();
// //       } else {
// //         const updatedItems = applyCouponToItems(appliedCoupon);
// //         dispatch(updateCartItems(updatedItems));
// //       }
// //     }
// //     updateGST();
// //   };

// //   const calculateSubTotal = () => {
// //     return cartItems.reduce((total, item) => total + item.totalPrice, 0);
// //   };

// //   const calculateTotalAfterDiscount = () => {
// //     return cartItems.reduce(
// //       (total, item) => total + (item.discountedPrice || item.totalPrice),
// //       0
// //     );
// //   };

// //   const calculateGST = () => {
// //     const totalAfterDiscount = calculateTotalAfterDiscount();
// //     return totalAfterDiscount * GST_RATE;
// //   };

// //   const calculateGrandTotal = () => {
// //     const totalAfterDiscount = calculateTotalAfterDiscount();
// //     const gst = calculateGST();
// //     return totalAfterDiscount + gst;
// //   };

// //   const calculateTotalSavings = () => {
// //     const totalSavings = cartItems.reduce(
// //       (sum, item) => sum + (item.discountAmount || 0),
// //       0
// //     );
// //     return totalSavings.toFixed(2);
// //   };

// //   const updateGST = () => {
// //     const gst = calculateGST();
// //     dispatch(setGST(gst.toFixed(2)));
// //   };

// //   useEffect(() => {
// //     updateGST();
// //     if (cartItems.length === 0 && appliedCoupon) {
// //       dispatch(removeCoupon());
// //       setPromoCode("");
// //     }
// //   }, [cartItems, appliedCoupon]);

// //   const applyPromoCode = async () => {
// //     if (!promoCode) {
// //       setCouponError("Please enter a promo code.");
// //       return;
// //     }
// //     setIsProcessingOrder(true);
// //     try {
// //       const response = await fetch(
// //         `${APIURL}/api/coupon/promo_code/${promoCode}`,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             "API-Key": token,
// //           },
// //         }
// //       );
// //       const data = await response.json();

// //       if (data.status === "success" && data.data.length > 0) {
// //         const coupon = data.data[0];
// //         const total = calculateSubTotal();

// //         const validityDate = new Date(coupon.validity_date);
// //         const currentDate = new Date();
// //         if (validityDate < currentDate) {
// //           setCouponError("Coupon has expired");
// //           return;
// //         }

// //         if (total >= coupon.min_amount) {
// //           const finalCartItems = applyCouponToItems(coupon);
// //           dispatch(updateCartItems(finalCartItems));
// //           dispatch(setCoupon(coupon));
// //           updateGST();
// //           setCouponError("");
// //         } else {
// //           setCouponError(
// //             `Minimum order amount for this coupon is ₹${coupon.min_amount}.`
// //           );
// //         }
// //       } else {
// //         setCouponError("Invalid promo code.");
// //       }
// //     } catch (error) {
// //       console.error("Error applying coupon:", error);
// //       setCouponError("An error occurred while applying the promo code.");
// //     } finally {
// //       setIsProcessingOrder(false);
// //     }
// //   };

// //   const handleRemoveCoupon = () => {
// //     dispatch(removeCoupon());
// //     setPromoCode("");
// //     updateGST();
// //   };

// //   const isLoggedIn = () => {
// //     if (typeof window !== "undefined") {
// //       const token = localStorage.getItem("token");
// //       return !!token;
// //     }
// //     return false;
// //   };

// //   const createOrder = async (e) => {
// //     e.preventDefault();
// //     if (isProcessingOrder || cartItems.length === 0) {
// //       return;
// //     }
// //     if (!isLoggedIn()) {
// //       toast.warning("You need to login first");
// //       router.push("/login");
// //     } else {
// //       router.push("/shipping");
// //     }
// //   };

// //   return (
// //     <div className="mt-20 bg-white md:flex">
// //       <div className="w-full bg-white border-t md:w-1/2">
// //         <h2 className="flex items-center px-4 py-4 text-2xl font-bold border-gray-200 text-blue-3 md:px-8 md:text-3xl">
// //           My Cart <BsCart3 className="ml-2 md:ml-4" size={24} />
// //         </h2>
// //         <div className="flex flex-col px-4 py-2 space-y-4">
// //           {cartItems.map((item, index) => (
// //             <div key={index} className="w-full">
// //               <div className="flex flex-col justify-between p-2 m-2 border border-gray-400 rounded-md md:flex-col">
// //                 <div className="flex w-full md:w-auto">
// //                   <Link
// //                     href={`/product/${encodeURIComponent(
// //                       item.category.toLowerCase()
// //                     ).replace(/%20/g, "-")}/${encodeURIComponent(
// //                       item.name.toLowerCase()
// //                     ).replace(/%20/g, "-")}/${item.id}`}
// //                     className="cursor-pointer"
// //                   >
// //                     <img
// //                       src={item.image}
// //                       alt={item.name}
// //                       className="object-contain w-24 h-24 md:h-40 md:w-44"
// //                     />
// //                   </Link>
// //                   <div className="flex-grow px-2 md:px-2">
// //                     <div className="flex items-start justify-between">
// //                       <Link
// //                         href={`/product/${encodeURIComponent(
// //                           item.category.toLowerCase()
// //                         ).replace(/%20/g, "-")}/${encodeURIComponent(
// //                           item.name.toLowerCase()
// //                         ).replace(/%20/g, "-")}/${item.id}`}
// //                         className="cursor-pointer"
// //                       >
// //                         <p className="mb-2 text-lg font-bold text-gray-900 md:text-xl">
// //                           {item.name}
// //                         </p>
// //                       </Link>
// //                       <MdDelete
// //                         className="text-red-500 cursor-pointer hover:text-red-700"
// //                         size={24}
// //                         onClick={() => removeCartItem(index)}
// //                       />
// //                     </div>
// //                     {item?.selectedOptions &&
// //                       Object.keys(item.selectedOptions).length > 0 ? (
// //                       <div className="w-full bg-white">
// //                         <ul className="text-sm md:text-base">
// //                           {item?.selectedOptions &&
// //                             Object.entries(item.selectedOptions).map(
// //                               ([key, option]) => (
// //                                 <li key={key} className="text-gray-700">
// //                                   {key}: {option.optionName}
// //                                   <h1 className="mt-1">Price: ₹{option.price}</h1>
// //                                 </li>
// //                               )
// //                             )}
// //                           <li className="mt-1 font-semibold">
// //                             Quantity: {item.quantity}
// //                           </li>

// //                         </ul>
// //                       </div>
// //                     ) : (
// //                       <>
// //                         <li className="mt-1 text-sm list-none">
// //                           Material: {item.material}
// //                         </li>
// //                         <li className="mt-1 text-sm list-none">
// //                           Price: ₹ {item.price} / Sku: {item.skuCount}</li>
// //                         {/* <li className="mt-1 list-none">

// //                         </li> */}

// //                         <li className="mt-1 font-semibold list-none">
// //                           Quantity: {item.quantity}
// //                         </li>
// //                         <div className="flex justify-end"><li className="mt-1 font-semibold list-none">
// //                           Total: {item.totalPrice}
// //                         </li></div>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //         <div className="px-4 py-2 border-t border-gray-300">
// //           <div className="flex items-center justify-between">
// //             <p className="text-lg font-bold text-gray-900 md:text-xl">
// //               Items Total
// //             </p>
// //             <p className="text-lg font-bold text-gray-900 md:text-xl">
// //               ₹ {calculateSubTotal().toFixed(2)}
// //             </p>
// //           </div>
// //         </div>
// //         {cartItems.length === 0 && (
// //           <p className="px-4 py-4 text-xl font-bold text-gray-600 md:text-2xl">
// //             Your Cart is empty.{" "}
// //             <Link href="/all-category" className="underline">
// //               Continue Shopping
// //             </Link>
// //           </p>
// //         )}
// //       </div>

// //       <div className="w-full p-4 bg-gray-100 rounded-md md:w-1/2 md:p-8">
// //         <div className="sticky p-4 bg-white rounded-lg shadow-md md:p-8 top-24">
// //           <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">Order Summary</h3>

// //           <div className="flex items-center justify-between mb-4">
// //             <p className="font-bold text-gray-900 md:text-lg text-md">Total (excl. GST)</p>
// //             <p className="font-bold text-gray-900 md:text-lg text-md">₹ {calculateTotalAfterDiscount().toFixed(2)}</p>
// //           </div>
// //           <div className="flex items-center justify-between mb-4">
// //             <p className="font-bold text-gray-900 md:text-lg text-md">GST (18%)</p>
// //             <p className="font-bold text-gray-900 md:text-lg text-md"> + ₹ {gstAmount}</p>
// //           </div>
// //           {appliedCoupon && (
// //             <div className="flex items-center justify-between mb-4">
// //               <p className="font-bold text-gray-900 md:text-lg text-md">Discount</p>
// //               <p className="font-bold text-gray-900 md:text-lg text-md">- ₹{calculateTotalSavings()}</p>
// //             </div>
// //           )}
// //           <hr className="my-4 border-gray-300" />
// //           <div className="mb-6">
// //             <p className="mb-2 font-bold text-gray-900 md:text-lg text-md">Apply Coupon</p>
// //             <div className="flex flex-col sm:flex-row">
// //               <input
// //                 type="text"
// //                 className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
// //                 placeholder="Enter coupon code"
// //                 value={promoCode}
// //                 onChange={(e) => setPromoCode(e.target.value)}
// //               />
// //               <button
// //                 onClick={applyPromoCode}
// //                 className="px-4 py-2 bg-[#103b60] text-white rounded-b-md sm:rounded-b-none sm:rounded-r-md focus:outline-none"
// //               >
// //                 Apply
// //               </button>
// //             </div>
// //             {couponError && <p className="mt-2 text-red-500">{couponError}</p>}
// //           </div>
// //           {appliedCoupon && (
// //             <div className="mt-4">
// //               <p className="font-semibold text-green-600 md:text-lg text-md">
// //                 Coupon {promoCode} applied!  You saved ₹{calculateTotalSavings()}.
// //               </p>
// //               <button
// //                 onClick={handleRemoveCoupon}
// //                 className="text-red-600 underline hover:text-red-800 focus:outline-none"
// //               >
// //                 Remove Coupon
// //               </button>
// //             </div>
// //           )}
// //           <hr className="my-4 border-gray-300" />
// //           <div className="flex items-center justify-between mt-4 mb-6">
// //             <p className="text-xl font-bold text-gray-900 md:text-2xl">Grand Total</p>
// //             <p className="text-xl font-bold text-gray-900 md:text-2xl">₹ {calculateGrandTotal().toFixed(2)}</p>
// //           </div>
// //           <button
// //             className="w-full px-6 py-3 bg-[#103b60] text-white rounded-md font-bold text-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
// //             onClick={createOrder}
// //             disabled={isProcessingOrder}
// //           >
// //             {isProcessingOrder ? "Processing..." : "Proceed to Checkout"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { BsCart3 } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, setCoupon, removeCoupon, setGST, updateCartItems, updateItemFiles } from '../../redux/store/cartSlice';

// export default function MyCart() {
//   const token = process.env.NEXT_PUBLIC_API_KEY;
//   const APIURL = process.env.NEXT_PUBLIC_API_URL;
//   const dispatch = useDispatch();
//   const { items: cartItems, appliedCoupon, gstAmount } = useSelector((state) => state.cart);
//   const [promoCode, setPromoCode] = useState("");
//   const [couponError, setCouponError] = useState("");
//   const router = useRouter();
//   const [isProcessingOrder, setIsProcessingOrder] = useState(false);
//   const GST_RATE = 0.18;

//  const handleFileUpload = async (index, skuIndex, event) => {
//   const file = event.target.files[0];
//   if (file) {
//     // Check if file is PDF
//     if (file.type !== 'application/pdf') {
//       // Store error message in files array instead of toast
//       const updatedFiles = [...(cartItems[index].files || [])];
//       updatedFiles[skuIndex] = { 
//         error: "Only PDF files are allowed",
//         hasError: true
//       };
//       dispatch(updateItemFiles({ index, files: updatedFiles }));
//       event.target.value = ''; // Clear the input
//       return;
//     }

//     // Clear any previous error for this slot
//     const updatedFiles = [...(cartItems[index].files || [])];
//     if (updatedFiles[skuIndex]?.hasError) {
//       updatedFiles[skuIndex] = null;
//       dispatch(updateItemFiles({ index, files: updatedFiles }));
//     }

//     // Prepare form data for the API request
//     const formData = new FormData();
//     formData.append("File", file);

//     try {
//       // Make the API call
//       const response = await fetch(`${APIURL}/api/product/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (result.status === 1) {
//         // Extract the original name from the API response
//         const originalName = result.data.originalname;

//         // Update the files in your state with only serializable data
//         const finalUpdatedFiles = [...(cartItems[index].files || [])];
        
//         // Store only serializable data (no file object)
//         finalUpdatedFiles[skuIndex] = { 
//           originalName: originalName,
//           fileName: file.name, // Client-side file name for display
//           uploadedAt: new Date().toISOString(), // Timestamp for reference
//           hasError: false
//         };
        
//         dispatch(updateItemFiles({ index, files: finalUpdatedFiles }));
//       } else {
//         // Store upload failure error
//         const errorUpdatedFiles = [...(cartItems[index].files || [])];
//         errorUpdatedFiles[skuIndex] = { 
//           error: "File upload failed",
//           hasError: true
//         };
//         dispatch(updateItemFiles({ index, files: errorUpdatedFiles }));
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       // Store network error
//       const errorUpdatedFiles = [...(cartItems[index].files || [])];
//       errorUpdatedFiles[skuIndex] = { 
//         error: "Error uploading file",
//         hasError: true
//       };
//       dispatch(updateItemFiles({ index, files: errorUpdatedFiles }));
//     }
//   }
// };

//   const applyCouponToItems = useCallback(
//     (coupon) => {
//       const total = calculateSubTotal();
//       if (total >= coupon.min_amount) {
//         const updatedCartItems = cartItems.map((item) => {
//           const discount = (item.totalPrice * coupon.discount) / 100;
//           return {
//             ...item,
//             discountAmount: discount,
//             discountPercentage: coupon.discount,
//             discountedPrice: item.totalPrice - discount,
//           };
//         });

//         const totalDiscount = updatedCartItems.reduce(
//           (sum, item) => sum + (item.discountAmount || 0),
//           0
//         );
//         const cappedDiscount = Math.min(totalDiscount, coupon.max_discount);
//         const scaleFactor = totalDiscount > 0 ? cappedDiscount / totalDiscount : 1;

//         return updatedCartItems.map((item) => {
//           const adjustedDiscount = item.discountAmount * scaleFactor;
//           return {
//             ...item,
//             discountAmount: adjustedDiscount,
//             discountedPrice: item.totalPrice - adjustedDiscount,
//           };
//         });
//       }
//       return cartItems;
//     },
//     [cartItems]
//   );

//   const removeCartItem = (index) => {
//     dispatch(removeFromCart(index));
//     if (appliedCoupon) {
//       const total = calculateSubTotal();
//       if (total < appliedCoupon.min_amount || cartItems.length <= 1) {
//         handleRemoveCoupon();
//       } else {
//         const updatedItems = applyCouponToItems(appliedCoupon);
//         dispatch(updateCartItems(updatedItems));
//       }
//     }
//     updateGST();
//   };

//   const calculateSubTotal = () => {
//     return cartItems.reduce((total, item) => total + item.totalPrice, 0);
//   };

//   const calculateTotalAfterDiscount = () => {
//     return cartItems.reduce(
//       (total, item) => total + (item.discountedPrice || item.totalPrice),
//       0
//     );
//   };

//   const calculateGST = () => {
//     const totalAfterDiscount = calculateTotalAfterDiscount();
//     return totalAfterDiscount * GST_RATE;
//   };

//   const calculateGrandTotal = () => {
//     const totalAfterDiscount = calculateTotalAfterDiscount();
//     const gst = calculateGST();
//     return totalAfterDiscount + gst;
//   };

//   const calculateTotalSavings = () => {
//     const totalSavings = cartItems.reduce(
//       (sum, item) => sum + (item.discountAmount || 0),
//       0
//     );
//     return totalSavings.toFixed(2);
//   };

//   const updateGST = () => {
//     const gst = calculateGST();
//     dispatch(setGST(gst.toFixed(2)));
//   };

//   useEffect(() => {
//     updateGST();
//     if (cartItems.length === 0 && appliedCoupon) {
//       dispatch(removeCoupon());
//       setPromoCode("");
//     }
//   }, [cartItems, appliedCoupon]);

//   const applyPromoCode = async () => {
//     if (!promoCode) {
//       setCouponError("Please enter a promo code.");
//       return;
//     }
//     setIsProcessingOrder(true);
//     try {
//       const response = await fetch(
//         `${APIURL}/api/coupon/promo_code/${promoCode}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "API-Key": token,
//           },
//         }
//       );
//       const data = await response.json();

//       if (data.status === "success" && data.data.length > 0) {
//         const coupon = data.data[0];
//         const total = calculateSubTotal();

//         const validityDate = new Date(coupon.validity_date);
//         const currentDate = new Date();
//         if (validityDate < currentDate) {
//           setCouponError("Coupon has expired");
//           return;
//         }

//         if (total >= coupon.min_amount) {
//           const finalCartItems = applyCouponToItems(coupon);
//           dispatch(updateCartItems(finalCartItems));
//           dispatch(setCoupon(coupon));
//           updateGST();
//           setCouponError("");
//         } else {
//           setCouponError(
//             `Minimum order amount for this coupon is ₹${coupon.min_amount}.`
//           );
//         }
//       } else {
//         setCouponError("Invalid promo code.");
//       }
//     } catch (error) {
//       console.error("Error applying coupon:", error);
//       setCouponError("An error occurred while applying the promo code.");
//     } finally {
//       setIsProcessingOrder(false);
//     }
//   };

//   const handleRemoveCoupon = () => {
//     dispatch(removeCoupon());
//     setPromoCode("");
//     updateGST();
//   };

//   const isLoggedIn = () => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       return !!token;
//     }
//     return false;
//   };

//   const createOrder = async (e) => {
//     e.preventDefault();
//     if (isProcessingOrder || cartItems.length === 0) {
//       return;
//     }
//     for (const item of cartItems) {
//       if (item.skuCount > 0 && (!item.files || item.files.length < item.skuCount)) {
//         toast.error(`Please upload ${item.skuCount} file(s) for ${item.name}`);
//         return;
//       }
//     }
//     if (!isLoggedIn()) {
//       toast.warning("You need to login first");
//       router.push("/login");
//     } else {
//       router.push("/shipping");
//     }
//   };

//   return (
//     <div className="mt-20 bg-white md:flex">
//       <div className="w-full bg-white border-t md:w-1/2">
//         <h2 className="flex items-center px-4 py-4 text-2xl font-bold border-gray-200 text-blue-3 md:px-8 md:text-3xl">
//           My Cart <BsCart3 className="ml-2 md:ml-4" size={24} />
//         </h2>
//         <div className="flex flex-col px-4 py-2 space-y-4">
//           {cartItems.map((item, index) => (
//             <div key={index} className="w-full">
//               <div className="flex flex-col justify-between p-2 m-2 border border-gray-400 rounded-md md:flex-col">
//                 <div className="flex w-full md:w-auto">
//                   <Link
//                     href={`/product/${encodeURIComponent(
//                       item.category.toLowerCase()
//                     ).replace(/%20/g, "-")}/${encodeURIComponent(
//                       item.name.toLowerCase()
//                     ).replace(/%20/g, "-")}/${item.id}`}
//                     className="cursor-pointer"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="object-contain w-24 h-24 md:h-40 md:w-44"
//                     />
//                   </Link>
//                   <div className="flex-grow px-2 md:px-2">
//                     <div className="flex items-start justify-between">
//                       <Link
//                         href={`/product/${encodeURIComponent(
//                           item.category.toLowerCase()
//                         ).replace(/%20/g, "-")}/${encodeURIComponent(
//                           item.name.toLowerCase()
//                         ).replace(/%20/g, "-")}/${item.id}`}
//                         className="cursor-pointer"
//                       >
//                         <p className="mb-2 text-lg font-bold text-gray-900 md:text-xl">
//                           {item.name}
//                         </p>
//                       </Link>
//                       <MdDelete
//                         className="text-red-500 cursor-pointer hover:text-red-700"
//                         size={24}
//                         onClick={() => removeCartItem(index)}
//                       />
//                     </div>
//                     {item?.selectedOptions && Object.keys(item.selectedOptions).length > 0 ? (
//                       <div className="w-full bg-white overflow-x-auto">
//                         <table className="min-w-full text-sm md:text-base table-auto border border-gray-300">
//                           <tbody>
//                             {item.selectedOptions.width && item.selectedOptions.length && (
//                               <tr className="border-b">
//                                 <td className="p-1 text-sm capitalize">Dimension</td>
//                                 <td className="p-1 text-sm">
//                                   {item.selectedOptions.width.optionName} x {item.selectedOptions.length.optionName}
//                                 </td>
//                               </tr>
//                             )}
//                             {Object.entries(item.selectedOptions).map(([key, option]) =>
//                               key !== "width" && key !== "length" ? (
//                                 <tr key={key} className="border-b">
//                                   <td className="p-1 text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
//                                   <td className="p-1 text-sm">{option.optionName}</td>
//                                 </tr>
//                               ) : null
//                             )}
//                             <tr className="bg-gray-50">
//                               <td className="p-1">Category</td>
//                               <td className="p-1" colSpan="2">{item.category}</td>
//                             </tr>
//                             <tr className="bg-gray-50">
//                               <td className="p-1">Material</td>
//                               <td className="p-1" colSpan="2">{item.material}</td>
//                             </tr>
//                             <tr className="bg-gray-50">
//                               <td className MODE="dark" lassName="p-1">Price</td>
//                               <td className="p-1" colSpan="2">
//                                 ₹{typeof item.price === "number" ? item.price.toFixed(0) : item.price} * 1
//                               </td>
//                             </tr>
//                             <tr className="bg-gray-50">
//                               <td className="p-1">SKU</td>
//                               <td className="p-1" colSpan="2">{item.skuCount}</td>
//                             </tr>
//                             <tr className="bg-gray-50 font-semibold">
//                               <td className="p-1">Quantity</td>
//                               <td className="p-1" colSpan="2">{item.quantity}</td>
//                             </tr>
//                           </tbody>
//                         </table>
//                         <div className="flex mt-2 justify-end">
//                           <li className="mt-1 font-semibold list-none">
//                             Total: ₹{typeof item.totalPrice === "number" ? item.totalPrice.toFixed(0) : item.totalPrice}
//                           </li>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <li className="mt-1 text-sm list-none">Material: {item.material}</li>
//                         <li className="mt-1 text-sm list-none">Price: ₹ {item.price}</li>
//                         <li className="mt-1 text-sm list-none">SKU: {item.skuCount}</li>
//                         <li className="mt-1 font-semibold list-none">Quantity: {item.quantity}</li>
//                         <div className="flex justify-end">
//                           <li className="font-semibold list-none">
//                             Total: ₹{typeof item.totalPrice === "number" ? item.totalPrice.toFixed(0) : item.totalPrice}
//                           </li>
//                         </div>
//                       </>
//                     )}
//                     {/* File Upload Section */}
//                     {item.skuCount > 0 && (
//                       <div className="mt-4">
//                         <p className="text-sm font-semibold">Upload Files for Designs:</p>
//                         <div className="flex flex-col space-y-2 mt-2">
//                           {Array.from({ length: item.skuCount }).map((_, skuIndex) => (
//                             <div key={skuIndex} className="flex items-center space-x-2">
//                               <label className="text-sm">Design {skuIndex + 1}:</label>
//                               <input
//                                 type="file"
//                                 accept=".pdf"
//                                 onChange={(e) => handleFileUpload(index, skuIndex, e)}
//                                 className="text-sm"
//                               />
//                               {item.files && item.files[skuIndex] && (
//                                 <span className={`text-sm ${item.files[skuIndex].hasError ? 'text-red-500' : 'text-green-600'}`}>
//                                   {item.files[skuIndex].hasError ? (
//                                     <span>❌ {item.files[skuIndex].error}</span>
//                                   ) : (
//                                     <span>✅ {item.files[skuIndex].originalName || item.files[skuIndex].fileName}</span>
//                                   )}
//                                 </span>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="px-4 py-2 border-t border-gray-300">
//           <div className="flex items-center justify-between">
//             <p className="text-lg font-bold text-gray-900 md:text-xl">Items Total</p>
//             <p className="text-lg font-bold text-gray-900 md:text-xl">₹ {calculateSubTotal().toFixed(2)}</p>
//           </div>
//         </div>
//         {cartItems.length === 0 && (
//           <p className="px-4 py-4 text-xl font-bold text-gray-600 md:text-2xl">
//             Your Cart is empty.{" "}
//             <Link href="/all-category" className="underline">
//               Continue Shopping
//             </Link>
//           </p>
//         )}
//       </div>

//       <div className="w-full p-4 bg-gray-100 rounded-md md:w-1/2 md:p-8">
//         <div className="sticky p-4 bg-white rounded-lg shadow-md md:p-8 top-24">
//           <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">Order Summary</h3>

//           <div className="flex items-center justify-between mb-4">
//             <p className="font-bold text-gray-900 md:text-lg text-md">Total (excl. GST)</p>
//             <p className="font-bold text-gray-900 md:text-lg text-md">₹ {calculateTotalAfterDiscount().toFixed(2)}</p>
//           </div>
//           <div className="flex items-center justify-between mb-4">
//             <p className="font-bold text-gray-900 md:text-lg text-md">GST (18%)</p>
//             <p className="font-bold text-gray-900 md:text-lg text-md"> + ₹ {gstAmount}</p>
//           </div>
//           {appliedCoupon && (
//             <div className="flex items-center justify-between mb-4">
//               <p className="font-bold text-gray-900 md:text-lg text-md">Discount</p>
//               <p className="font-bold text-gray-900 md:text-lg text-md">- ₹{calculateTotalSavings()}</p>
//             </div>
//           )}
//           <hr className="my-4 border-gray-300" />
//           <div className="mb-6">
//             <p className="mb-2 font-bold text-gray-900 md:text-lg text-md">Apply Coupon</p>
//             <div className="flex flex-col sm:flex-row">
//               <input
//                 type="text"
//                 className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
//                 placeholder="Enter coupon code"
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//               />
//               <button
//                 onClick={applyPromoCode}
//                 className="px-4 py-2 bg-[#103b60] text-white rounded-b-md sm:rounded-b-none sm:rounded-r-md focus:outline-none"
//               >
//                 Apply
//               </button>
//             </div>
//             {couponError && <p className="mt-2 text-red-500">{couponError}</p>}
//           </div>
//           {appliedCoupon && (
//             <div className="mt-4">
//               <p className="font-semibold text-green-600 md:text-lg text-md">
//                 Coupon {promoCode} applied! You saved ₹{calculateTotalSavings()}.
//               </p>
//               <button
//                 onClick={handleRemoveCoupon}
//                 className="text-red-600 underline hover:text-red-800 focus:outline-none"
//               >
//                 Remove Coupon
//               </button>
//             </div>
//           )}
//           <hr className="my-4 border-gray-300" />
//           <div className="flex items-center justify-between mt-4 mb-6">
//             <p className="text-xl font-bold text-gray-900 md:text-2xl">Grand Total</p>
//             <p className="text-xl font-bold text-gray-900 md:text-2xl">₹ {calculateGrandTotal().toFixed(2)}</p>
//           </div>
//           <button
//             className="w-full px-6 py-3 bg-[#103b60] text-white rounded-md font-bold text-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
//             onClick={createOrder}
//             disabled={isProcessingOrder}
//           >
//             {isProcessingOrder ? "Processing..." : "Proceed to Checkout"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect, useCallback } from "react";
import { BsCart3 } from "react-icons/bs";
import { MdDelete, MdCloudUpload, MdCheckCircle, MdError, MdClose } from "react-icons/md";
import { FiUpload, FiFile } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, setCoupon, removeCoupon, setGST, updateCartItems, updateItemFiles } from '../../redux/store/cartSlice';

export default function MyCart() {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();
  const { items: cartItems, appliedCoupon, gstAmount } = useSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const router = useRouter();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [dragStates, setDragStates] = useState({});
  const [uploadingStates, setUploadingStates] = useState({});
  const GST_RATE = 0.18;

  const setDragState = (itemIndex, skuIndex, isDragging) => {
    setDragStates(prev => ({
      ...prev,
      [`${itemIndex}-${skuIndex}`]: isDragging
    }));
  };

  const setUploadingState = (itemIndex, skuIndex, isUploading) => {
    setUploadingStates(prev => ({
      ...prev,
      [`${itemIndex}-${skuIndex}`]: isUploading
    }));
  };

  const handleFileUpload = async (index, skuIndex, file) => {
    if (!file) return;

    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      const updatedFiles = [...(cartItems[index].files || [])];
      updatedFiles[skuIndex] = { 
        error: "Only PDF files are allowed",
        hasError: true
      };
      dispatch(updateItemFiles({ index, files: updatedFiles }));
      return;
    }

    // Set uploading state
    setUploadingState(index, skuIndex, true);

    // Clear any previous error for this slot
    const updatedFiles = [...(cartItems[index].files || [])];
    if (updatedFiles[skuIndex]?.hasError) {
      updatedFiles[skuIndex] = null;
      dispatch(updateItemFiles({ index, files: updatedFiles }));
    }

    // Prepare form data for the API request
    const formData = new FormData();
    formData.append("File", file);

    try {
      // Make the API call
      const response = await fetch(`${APIURL}/api/product/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === 1) {
        // Extract the original name from the API response
        const originalName = result.data.originalname;

        // Update the files in your state with only serializable data
        const finalUpdatedFiles = [...(cartItems[index].files || [])];
        
        // Store only serializable data (no file object)
        finalUpdatedFiles[skuIndex] = { 
          originalName: originalName,
          fileName: file.name, // Client-side file name for display
          uploadedAt: new Date().toISOString(), // Timestamp for reference
          hasError: false,
          fileSize: file.size
        };
        
        dispatch(updateItemFiles({ index, files: finalUpdatedFiles }));
      } else {
        // Store upload failure error
        const errorUpdatedFiles = [...(cartItems[index].files || [])];
        errorUpdatedFiles[skuIndex] = { 
          error: "File upload failed",
          hasError: true
        };
        dispatch(updateItemFiles({ index, files: errorUpdatedFiles }));
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Store network error
      const errorUpdatedFiles = [...(cartItems[index].files || [])];
      errorUpdatedFiles[skuIndex] = { 
        error: "Error uploading file",
        hasError: true
      };
      dispatch(updateItemFiles({ index, files: errorUpdatedFiles }));
    } finally {
      setUploadingState(index, skuIndex, false);
    }
  };

  const handleDrop = (e, index, skuIndex) => {
    e.preventDefault();
    setDragState(index, skuIndex, false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(index, skuIndex, files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, index, skuIndex) => {
    e.preventDefault();
    setDragState(index, skuIndex, true);
  };

  const handleDragLeave = (e, index, skuIndex) => {
    e.preventDefault();
    // Only set drag state to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragState(index, skuIndex, false);
    }
  };

  const removeFile = (index, skuIndex) => {
    const updatedFiles = [...(cartItems[index].files || [])];
    updatedFiles[skuIndex] = null;
    dispatch(updateItemFiles({ index, files: updatedFiles }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const applyCouponToItems = useCallback(
    (coupon) => {
      const total = calculateSubTotal();
      if (total >= coupon.min_amount) {
        const updatedCartItems = cartItems.map((item) => {
          const discount = (item.totalPrice * coupon.discount) / 100;
          return {
            ...item,
            discountAmount: discount,
            discountPercentage: coupon.discount,
            discountedPrice: item.totalPrice - discount,
          };
        });

        const totalDiscount = updatedCartItems.reduce(
          (sum, item) => sum + (item.discountAmount || 0),
          0
        );
        const cappedDiscount = Math.min(totalDiscount, coupon.max_discount);
        const scaleFactor = totalDiscount > 0 ? cappedDiscount / totalDiscount : 1;

        return updatedCartItems.map((item) => {
          const adjustedDiscount = item.discountAmount * scaleFactor;
          return {
            ...item,
            discountAmount: adjustedDiscount,
            discountedPrice: item.totalPrice - adjustedDiscount,
          };
        });
      }
      return cartItems;
    },
    [cartItems]
  );

  const removeCartItem = (index) => {
    dispatch(removeFromCart(index));
    if (appliedCoupon) {
      const total = calculateSubTotal();
      if (total < appliedCoupon.min_amount || cartItems.length <= 1) {
        handleRemoveCoupon();
      } else {
        const updatedItems = applyCouponToItems(appliedCoupon);
        dispatch(updateCartItems(updatedItems));
      }
    }
    updateGST();
  };

  const calculateSubTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const calculateTotalAfterDiscount = () => {
    return cartItems.reduce(
      (total, item) => total + (item.discountedPrice || item.totalPrice),
      0
    );
  };

  const calculateGST = () => {
    const totalAfterDiscount = calculateTotalAfterDiscount();
    return totalAfterDiscount * GST_RATE;
  };

  const calculateGrandTotal = () => {
    const totalAfterDiscount = calculateTotalAfterDiscount();
    const gst = calculateGST();
    return totalAfterDiscount + gst;
  };

  const calculateTotalSavings = () => {
    const totalSavings = cartItems.reduce(
      (sum, item) => sum + (item.discountAmount || 0),
      0
    );
    return totalSavings.toFixed(2);
  };

  const updateGST = () => {
    const gst = calculateGST();
    dispatch(setGST(gst.toFixed(2)));
  };

  useEffect(() => {
    updateGST();
    if (cartItems.length === 0 && appliedCoupon) {
      dispatch(removeCoupon());
      setPromoCode("");
    }
  }, [cartItems, appliedCoupon]);

  const applyPromoCode = async () => {
    if (!promoCode) {
      setCouponError("Please enter a promo code.");
      return;
    }
    setIsProcessingOrder(true);
    try {
      const response = await fetch(
        `${APIURL}/api/coupon/promo_code/${promoCode}`,
        {
          headers: {
            "Content-Type": "application/json",
            "API-Key": token,
          },
        }
      );
      const data = await response.json();

      if (data.status === "success" && data.data.length > 0) {
        const coupon = data.data[0];
        const total = calculateSubTotal();

        const validityDate = new Date(coupon.validity_date);
        const currentDate = new Date();
        if (validityDate < currentDate) {
          setCouponError("Coupon has expired");
          return;
        }

        if (total >= coupon.min_amount) {
          const finalCartItems = applyCouponToItems(coupon);
          dispatch(updateCartItems(finalCartItems));
          dispatch(setCoupon(coupon));
          updateGST();
          setCouponError("");
        } else {
          setCouponError(
            `Minimum order amount for this coupon is ₹${coupon.min_amount}.`
          );
        }
      } else {
        setCouponError("Invalid promo code.");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setCouponError("An error occurred while applying the promo code.");
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setPromoCode("");
    updateGST();
  };

  const isLoggedIn = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      return !!token;
    }
    return false;
  };

  const createOrder = async (e) => {
    e.preventDefault();
    if (isProcessingOrder || cartItems.length === 0) {
      return;
    }
    for (const item of cartItems) {
      if (item.skuCount > 0 && (!item.files || item.files.length < item.skuCount)) {
        toast.error(`Please upload ${item.skuCount} file(s) for ${item.name}`);
        return;
      }
    }
    if (!isLoggedIn()) {
      toast.warning("You need to login first");
      router.push("/login");
    } else {
      router.push("/shipping");
    }
  };

  return (
    <div className="mt-20 bg-white md:flex">
      <div className="w-full bg-white border-t md:w-1/2">
        <h2 className="flex items-center px-4 py-4 text-2xl font-bold border-gray-200 text-blue-3 md:px-8 md:text-3xl">
          My Cart <BsCart3 className="ml-2 md:ml-4" size={24} />
        </h2>
        <div className="flex flex-col px-4 py-2 space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="w-full">
              <div className="flex flex-col justify-between p-2 m-2 border border-gray-400 rounded-md md:flex-col">
                <div className="flex w-full md:w-auto">
                  <Link
                    href={`/product/${encodeURIComponent(
                      item.category.toLowerCase()
                    ).replace(/%20/g, "-")}/${encodeURIComponent(
                      item.name.toLowerCase()
                    ).replace(/%20/g, "-")}/${item.id}`}
                    className="cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-contain w-24 h-24 md:h-40 md:w-44"
                    />
                  </Link>
                  <div className="flex-grow px-2 md:px-2">
                    <div className="flex items-start justify-between">
                      <Link
                        href={`/product/${encodeURIComponent(
                          item.category.toLowerCase()
                        ).replace(/%20/g, "-")}/${encodeURIComponent(
                          item.name.toLowerCase()
                        ).replace(/%20/g, "-")}/${item.id}`}
                        className="cursor-pointer"
                      >
                        <p className="mb-2 text-lg font-bold text-gray-900 md:text-xl">
                          {item.name}
                        </p>
                      </Link>
                      <MdDelete
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        size={24}
                        onClick={() => removeCartItem(index)}
                      />
                    </div>
                    {item?.selectedOptions && Object.keys(item.selectedOptions).length > 0 ? (
                      <div className="w-full bg-white overflow-x-auto">
                        <table className="min-w-full text-sm md:text-base table-auto border border-gray-300">
                          <tbody>
                            {item.selectedOptions.width && item.selectedOptions.length && (
                              <tr className="border-b">
                                <td className="p-1 text-sm capitalize">Dimension</td>
                                <td className="p-1 text-sm">
                                  {item.selectedOptions.width.optionName} x {item.selectedOptions.length.optionName}
                                </td>
                              </tr>
                            )}
                            {Object.entries(item.selectedOptions).map(([key, option]) =>
                              key !== "width" && key !== "length" ? (
                                <tr key={key} className="border-b">
                                  <td className="p-1 text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                                  <td className="p-1 text-sm">{option.optionName}</td>
                                </tr>
                              ) : null
                            )}
                            <tr className="bg-gray-50">
                              <td className="p-1">Category</td>
                              <td className="p-1" colSpan="2">{item.category}</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="p-1">Material</td>
                              <td className="p-1" colSpan="2">{item.material}</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="p-1">Price</td>
                              <td className="p-1" colSpan="2">
                                ₹{typeof item.price === "number" ? item.price.toFixed(0) : item.price} * 1
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="p-1">SKU</td>
                              <td className="p-1" colSpan="2">{item.skuCount}</td>
                            </tr>
                            <tr className="bg-gray-50 font-semibold">
                              <td className="p-1">Quantity</td>
                              <td className="p-1" colSpan="2">{item.quantity}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="flex mt-2 justify-end">
                          <li className="mt-1 font-semibold list-none">
                            Total: ₹{typeof item.totalPrice === "number" ? item.totalPrice.toFixed(0) : item.totalPrice}
                          </li>
                        </div>
                      </div>
                    ) : (
                      <>
                        <li className="mt-1 text-sm list-none">Material: {item.material}</li>
                        <li className="mt-1 text-sm list-none">Price: ₹ {item.price}</li>
                        <li className="mt-1 text-sm list-none">SKU: {item.skuCount}</li>
                        <li className="mt-1 font-semibold list-none">Quantity: {item.quantity}</li>
                        <div className="flex justify-end">
                          <li className="font-semibold list-none">
                            Total: ₹{typeof item.totalPrice === "number" ? item.totalPrice.toFixed(0) : item.totalPrice}
                          </li>
                        </div>
                      </>
                    )}
                    
                    {/* Enhanced File Upload Section */}
                    {item.skuCount > 0 && (
                      <div className="mt-2 p-1">
                        {/* <div className="flex items-center mb-4">
                          <MdCloudUpload className="text-blue-600 mr-2" size={20} />
                          <h4 className="text-lg font-semibold text-gray-800">Upload Design Files</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Please upload {item.skuCount} PDF file{item.skuCount > 1 ? 's' : ''} for your designs
                        </p> */}
                        
                        <div className="grid gap-2">
                          {Array.from({ length: item.skuCount }).map((_, skuIndex) => {
                            const fileData = item.files && item.files[skuIndex];
                            const isUploading = uploadingStates[`${index}-${skuIndex}`];
                            const isDragging = dragStates[`${index}-${skuIndex}`];
                            
                            return (
                              <div key={skuIndex} className="relative">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    Design {skuIndex + 1}
                                  </span>
                                  {fileData && !fileData.hasError && (
                                    <button
                                      onClick={() => removeFile(index, skuIndex)}
                                      className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                      <MdClose size={16} />
                                    </button>
                                  )}
                                </div>
                                
                                {!fileData || fileData.hasError ? (
                                  <div
                                    className={`relative border-2 border-dashed rounded-lg p-1 text-center transition-all duration-200 cursor-pointer ${
                                      isDragging 
                                        ? 'border-blue-500 bg-blue-50 scale-105' 
                                        : fileData?.hasError 
                                          ? 'border-red-300 bg-red-50 hover:border-red-400' 
                                          : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                                    }`}
                                    onDrop={(e) => handleDrop(e, index, skuIndex)}
                                    onDragOver={handleDragOver}
                                    onDragEnter={(e) => handleDragEnter(e, index, skuIndex)}
                                    onDragLeave={(e) => handleDragLeave(e, index, skuIndex)}
                                    onClick={() => document.getElementById(`file-input-${index}-${skuIndex}`).click()}
                                  >
                                    <input
                                      id={`file-input-${index}-${skuIndex}`}
                                      type="file"
                                      accept=".pdf"
                                      onChange={(e) => {
                                        if (e.target.files[0]) {
                                          handleFileUpload(index, skuIndex, e.target.files[0]);
                                        }
                                      }}
                                      className="hidden"
                                    />
                                    
                                    {isUploading ? (
                                      <div className="flex flex-col items-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                                        <p className="text-sm text-blue-600 font-medium">Uploading...</p>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center">
                                        <FiUpload 
                                          className={`mb-2 ${
                                            fileData?.hasError ? 'text-red-400' : isDragging ? 'text-blue-500' : 'text-gray-400'
                                          }`} 
                                          size={32} 
                                        />
                                        <p className={`text-sm font-medium mb-1 ${
                                          fileData?.hasError ? 'text-red-600' : 'text-gray-700'
                                        }`}>
                                          {isDragging ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
                                        </p>
                                        <p className="text-xs text-gray-500">or click to browse</p>
                                        {fileData?.hasError && (
                                          <div className="mt-2 flex items-center text-red-600">
                                            <MdError className="mr-1" size={16} />
                                            <span className="text-xs">{fileData.error}</span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                                    <div className="flex items-center">
                                      <MdCheckCircle className="text-green-600 mr-3" size={20} />
                                      <div className="flex-grow">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="text-sm font-medium text-green-800">
                                              {fileData.originalName || fileData.fileName}
                                            </p>
                                            {fileData.fileSize && (
                                              <p className="text-xs text-green-600 mt-1">
                                                {formatFileSize(fileData.fileSize)}
                                              </p>
                                            )}
                                          </div>
                                          <FiFile className="text-green-600" size={20} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                          <p className="text-xs text-blue-800">
                            💡 <strong>Tip:</strong> Make sure your PDF files are high quality for the best printing results. 
                            Each file should correspond to one design.
                          </p>
                        </div> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-gray-300">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-900 md:text-xl">Items Total</p>
            <p className="text-lg font-bold text-gray-900 md:text-xl">₹ {calculateSubTotal().toFixed(2)}</p>
          </div>
        </div>
        {cartItems.length === 0 && (
          <p className="px-4 py-4 text-xl font-bold text-gray-600 md:text-2xl">
            Your Cart is empty.{" "}
            <Link href="/all-category" className="underline">
              Continue Shopping
            </Link>
          </p>
        )}
      </div>

      <div className="w-full p-4 bg-gray-100 rounded-md md:w-1/2 md:p-8">
        <div className="sticky p-4 bg-white rounded-lg shadow-md md:p-8 top-24">
          <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">Order Summary</h3>

          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-gray-900 md:text-lg text-md">Total (excl. GST)</p>
            <p className="font-bold text-gray-900 md:text-lg text-md">₹ {calculateTotalAfterDiscount().toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-gray-900 md:text-lg text-md">GST (18%)</p>
            <p className="font-bold text-gray-900 md:text-lg text-md"> + ₹ {gstAmount}</p>
          </div>
          {appliedCoupon && (
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-gray-900 md:text-lg text-md">Discount</p>
              <p className="font-bold text-gray-900 md:text-lg text-md">- ₹{calculateTotalSavings()}</p>
            </div>
          )}
          <hr className="my-4 border-gray-300" />
          <div className="mb-6">
            <p className="mb-2 font-bold text-gray-900 md:text-lg text-md">Apply Coupon</p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="text"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                placeholder="Enter coupon code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                onClick={applyPromoCode}
                className="px-4 py-2 bg-[#103b60] text-white rounded-b-md sm:rounded-b-none sm:rounded-r-md focus:outline-none"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="mt-2 text-red-500">{couponError}</p>}
          </div>
          {appliedCoupon && (
            <div className="mt-4">
              <p className="font-semibold text-green-600 md:text-lg text-md">
                Coupon {promoCode} applied! You saved ₹{calculateTotalSavings()}.
              </p>
              <button
                onClick={handleRemoveCoupon}
                className="text-red-600 underline hover:text-red-800 focus:outline-none"
              >
                Remove Coupon
              </button>
            </div>
          )}
          <hr className="my-4 border-gray-300" />
          <div className="flex items-center justify-between mt-4 mb-6">
            <p className="text-xl font-bold text-gray-900 md:text-2xl">Grand Total</p>
            <p className="text-xl font-bold text-gray-900 md:text-2xl">₹ {calculateGrandTotal().toFixed(2)}</p>
          </div>
          <button
            className="w-full px-6 py-3 bg-[#103b60] text-white rounded-md font-bold text-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            onClick={createOrder}
            disabled={isProcessingOrder}
          >
            {isProcessingOrder ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}