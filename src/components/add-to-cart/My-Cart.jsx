"use client";
import { useState, useEffect, useCallback } from "react";
import { BsCart3 } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, setCoupon, removeCoupon, setGST, updateCartItems } from '../../redux/store/cartSlice';

export default function MyCart() {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();
  const { items: cartItems, appliedCoupon, gstAmount } = useSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const router = useRouter();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const GST_RATE = 0.18;


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
  console.log(cartItems);
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
    if (!isLoggedIn()) {
      toast.warning("You need to login first");
      router.push("/login");
    } else {
      router.push("/shipping");
    }
  };

  return (
    <div className="bg-white mt-20 md:flex">
      <div className="w-full md:w-1/2 bg-white border-t">
        <h2 className="text-blue-3 py-4 px-4 md:px-8 font-bold text-2xl md:text-3xl border-gray-200 flex items-center">
          My Cart <BsCart3 className="ml-2 md:ml-4" size={24} />
        </h2>
        <div className="flex flex-col space-y-4 py-2 px-4">
          {cartItems.map((item, index) => (
            <div key={index} className="w-full">
              <div className="flex flex-col md:flex-col justify-between p-2 m-2 rounded-md border border-gray-400">
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
                      className="h-24 w-24 md:h-40 md:w-44 object-contain"
                    />
                  </Link>
                  <div className="px-2 md:px-2 flex-grow">
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/product/${encodeURIComponent(
                          item.category.toLowerCase()
                        ).replace(/%20/g, "-")}/${encodeURIComponent(
                          item.name.toLowerCase()
                        ).replace(/%20/g, "-")}/${item.id}`}
                        className="cursor-pointer"
                      >
                        <p className="text-gray-900 font-bold text-lg md:text-xl mb-2">
                          {item.name}
                        </p>
                      </Link>
                      <MdDelete
                        className="text-gray-900 cursor-pointer"
                        size={24}
                        onClick={() => removeCartItem(index)}
                      />
                    </div>
                    {item?.selectedOptions &&
                      Object.keys(item.selectedOptions).length > 0 ? (
                      <div className="bg-white w-full">
                        <ul className="text-sm md:text-base">
                          {item?.selectedOptions &&
                            Object.entries(item.selectedOptions).map(
                              ([key, option]) => (
                                <li key={key} className="text-gray-700">
                                  {key}: {option.optionName}
                                  <h1 className="mt-1">Price: ₹{option.price}</h1>
                                </li>
                              )
                            )}
                          <li className="font-semibold mt-1">
                            Quantity: {item.quantity}
                          </li>

                        </ul>
                      </div>
                    ) : (
                      <>
                        <li className="mt-1 list-none">
                          Material: {item.material}
                        </li>
                        <li className="mt-1 list-none">
                          Price: ₹ {item.price} / Sku: {item.skuCount}</li>
                        {/* <li className="mt-1 list-none">
                          
                        </li> */}

                        <li className="font-semibold mt-1 list-none">
                          Quantity: {item.quantity}
                        </li>
                        <div className="flex justify-end"><li className="font-semibold mt-1 list-none">
                          Total: {item.totalPrice}
                        </li></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-gray-300">
          <div className="flex justify-between items-center">
            <p className="text-gray-900 font-bold text-lg md:text-xl">
              Items Total
            </p>
            <p className="text-gray-900 font-bold text-lg md:text-xl">
              ₹ {calculateSubTotal().toFixed(2)}
            </p>
          </div>
        </div>
        {cartItems.length === 0 && (
          <p className="text-gray-600 px-4 py-4 font-bold text-xl md:text-2xl">
            Your Cart is empty.{" "}
            <Link href="/all-category" className="underline">
              Continue Shopping
            </Link>
          </p>
        )}
      </div>

      <div className="w-full md:w-1/2  bg-gray-100 p-4 md:p-8 rounded-md">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md sticky top-24">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Order Summary</h3>

          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-900 font-bold md:text-lg text-md">Total (excl. GST)</p>
            <p className="text-gray-900 font-bold md:text-lg text-md">₹ {calculateTotalAfterDiscount().toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-900 font-bold md:text-lg text-md">GST (18%)</p>
            <p className="text-gray-900 font-bold md:text-lg text-md"> + ₹ {gstAmount}</p>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-900 font-bold md:text-lg text-md">Discount</p>
              <p className="text-gray-900 font-bold md:text-lg text-md">- ₹{calculateTotalSavings()}</p>
            </div>
          )}
          <hr className="border-gray-300 my-4" />
          <div className="mb-6">
            <p className="text-gray-900 font-bold md:text-lg text-md mb-2">Apply Coupon</p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="text"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md  focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter coupon code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                onClick={applyPromoCode}
                className="px-4 py-2 bg-black text-white rounded-b-md sm:rounded-b-none sm:rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-red-500 mt-2">{couponError}</p>}
          </div>
          {appliedCoupon && (
            <div className="mt-4">
              <p className="text-green-600 font-semibold md:text-lg text-md">
                Coupon {promoCode} applied!  You saved ₹{calculateTotalSavings()}.
              </p>
              <button
                onClick={handleRemoveCoupon}
                className="text-red-600 underline hover:text-red-800 focus:outline-none"
              >
                Remove Coupon
              </button>
            </div>
          )}
          <hr className="border-gray-300 my-4" />
          <div className="flex justify-between items-center mt-4 mb-6">
            <p className="text-gray-900 font-bold text-xl md:text-2xl">Grand Total</p>
            <p className="text-gray-900 font-bold text-xl md:text-2xl">₹ {calculateGrandTotal().toFixed(2)}</p>
          </div>
          <button
            className="w-full px-6 py-3 bg-black text-white rounded-md uppercase font-bold text-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
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