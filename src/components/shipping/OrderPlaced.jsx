"use client";
import Link from "next/link";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAuth } from "@/utils/authContext";
import { FiDownload, FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

const OrderPlaced = ({ productDetails, defaultAddress, transactionId }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1
      }/${date.getFullYear()}`;
    setCurrentDate(formattedDate);
    const storedOrderNo = localStorage.getItem("orderNo");
    setOrderNo(storedOrderNo);
  }, []);

  const calculateTotalPrice = () => {
    return productDetails.reduce((total, item) => {
      const price = parseFloat(item.discountedPrice);
      return total + price;
    }, 0).toFixed(2);
  };

  const calculateDiscountAmount = () => {
    return productDetails.reduce((total, item) => {
      const discount = parseFloat(item.discountAmount);
      return total + discount;
    }, 0).toFixed(2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div>
      <div className="md:flex md:mt-20">
        <div className="md:w-1/2 w-full bg-white px-6 border-t">
          <div className="py-3">
            <h2 className="text-gray-900 md:text-3xl text-xl font-bold flex justify-start items-center">
              Thank You For Your Order.{" "}
              <FaCircleCheck className="ml-3" size={40} />
            </h2>
          </div>
          <hr />
          <div className="flex justify-between py-4">
            <div className="text-gray-900">
              <h4 className="font-bold text-lg mb-2">Delivery Address:</h4>
              {/* <br /> */}
              {/* <p className="font-bold">
                {user?.result?.firstName || user?.firstName}{" "}
                {user?.result?.lastName || user?.lastName}
              </p> */}
              {defaultAddress?.data && (
                <div>
                  <>
                    {defaultAddress?.data?.title && (
                      <p>{defaultAddress?.data?.title}</p>
                    )}
                    {defaultAddress?.data?.floor && (
                      <p>{defaultAddress?.data?.floor},</p>
                    )}
                    {defaultAddress?.data?.address && (
                      <p>{defaultAddress?.data?.address}</p>
                    )}

                    {defaultAddress?.data?.address2 && (
                      <p>{defaultAddress?.data?.address2},</p>
                    )}
                    <p>
                      {[
                        defaultAddress?.data?.city,
                        defaultAddress?.data?.state,
                        defaultAddress?.data?.zip,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    {defaultAddress?.data?.country && (
                      <p>{defaultAddress?.data?.country}</p>
                    )}
                  </>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="md:flex py-4">
            {/* <div className="h-auto w-72 border-2 border-gray-900 rounded-3xl p-4 flex flex-col justify-start items-start">
              <label className="text-gray-900 font-semibold mt-2">
                {"Standard"}
              </label>
              <p className="text-gray-900">Estimated Delivery in 7 Days.</p>
            </div> */}
            <div className="mt-2">
              <div className="text-gray-900">
                <h4 className="font-bold">Order Date:</h4>
                <p>{productDetails[0]?.orderDate ? formatDate(productDetails[0].orderDate) : currentDate}</p>
              </div>
              <div className="text-gray-900">
                <h4 className="font-bold">Order #:</h4>
                <p>{productDetails[0]?.orderNo || orderNo}</p>
              </div>
              {productDetails[0]?.coupon && (
                <div className="text-gray-900">
                  <h4 className="font-bold">Coupon Applied:</h4>
                  <p>{productDetails[0]?.coupon}</p>
                </div>
              )}
            </div>
          </div>
          <div className="text-gray-900 mb-4">
            <div>
              Your order is in process now. The Order details have been emailed
              at <br />
              orders@nexibles.com. For live updates, you can also visit{" "}
              <Link href="/my-dashboard" className="underline">
                My Account
              </Link>
            </div>
          </div>
          <hr />
        </div>
        <div className="md:w-1/2 w-full bg-gray-300 md:p-14 p-4">
          <div className="bg-white h-full w-full">
            <div className="md:p-10 p-4">
              <h3 className="text-gray-900 font-bold text-xl md:text-3xl">
                Order Summary
              </h3>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-900 text-sm font-bold">Sub Total</p>
                  <p className="text-gray-900 text-sm font-bold">
                    RS. {productDetails[0]?.invamt || calculateTotalPrice()}
                  </p>
                </div>
                <hr />
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-900 text-sm font-bold">
                    Shipping : Standard
                  </p>
                  {productDetails[0]?.orderCharge && parseFloat(productDetails[0].orderCharge) > 0 ? (
                    <p className="text-gray-900 text-sm font-bold">
                      + RS. {parseFloat(productDetails[0].orderCharge).toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-green-500 text-sm font-bold uppercase">
                      Free
                    </p>
                  )}
                </div>
                {/* <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-900 text-sm font-bold uppercase">
                    GST (18%)
                  </p>
                  <p className="text-gray-900 text-sm font-bold uppercase">
                    + RS. {productDetails[0]?.tax || "0.00"}
                  </p>
                </div> */}
                <hr />
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-900 text-sm font-bold">
                    Discount {productDetails[0]?.promoDiscount && `(${productDetails[0].promoDiscount}%)`}
                  </p>
                  <p className="text-red-500 uppercase text-sm font-bold">
                    - RS. {productDetails[0]?.disamt || calculateDiscountAmount()}
                  </p>
                </div>
                <hr />
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-900 text-sm font-bold">Total Paid</p>
                  <p className="text-gray-900 uppercase text-sm font-bold">
                    RS. {productDetails[0]?.invamt || calculateTotalPrice()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-1/2 w-full bg-white">
          <div className="py-6 px-6">
            <h4 className="font-bold text-gray-900 text-xl py-2">
              Purchased Items
            </h4>
            <div className="max-w-7xl mx-auto space-y-6 ">
              {productDetails.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {product.image && (
                    <div className="md:w-48 h-48 md:h-auto relative">
                      <img
                        src={`${process.env.NEXT_PUBLIC_CDN_URL}/product/${product.image}`}
                        alt={product.product_name}
                        className="h-full w-full object-cover"
                      />
                      {product.discountPercentage !== "0.00" && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          -{product.discountPercentage}% OFF
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex-1 p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {product.product_name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-semibold text-gray-900">{product.quantity}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold text-gray-900">RS. {product.price}</span>
                      </div>

                      {product.product_name !== "Nexibles Sample Kit" && product.discountedPrice !== product.price && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">Total:</span>
                          <span className="font-semibold text-green-600">
                            RS. {product.discountedPrice}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Material information */}
                    {product.material && (
                      <div className="mb-3">
                        <p className="text-gray-800">
                          <span className="font-semibold">Material:</span>{' '}
                          {product.material}
                        </p>
                      </div>
                    )}

                    {/* SKU Count information */}
                    {/* {product.skuCount && (
                      <div className="mb-3">
                        <p className="text-gray-800">
                          <span className="font-semibold">SKU Count:</span>{' '}
                          {product.skuCount}
                        </p>
                      </div>
                    )} */}

                    {/* Product Options */}
                    {product.product_config_id && (
                      <div className="mb-3">
                        <p className="text-gray-800">
                          <span className="font-semibold">Product Options:</span>{' '}
                          {product.product_config_id} : {product.product_option_id}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/2 hidden bg-white"></div>
      </div>
    </div>
  );
};

export default OrderPlaced;