import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";

export default function DeliveryOptions({
  zipCode,
  setZipCode,
  CheckShippingCost,
  isDeliveryAvailable,
  deliveryEstimate
}) {
  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    setZipCode(value);
    if (value.length === 6) {
      CheckShippingCost(value);
    }
  };

  return (
    <div className="mt-6">
      <hr className="border-gray-300 mb-6" />
      <div className="flex gap-2 items-center">
        <span className="text-gray-800 font-bold text-sm uppercase">DELIVERY OPTIONS</span>
        <TbTruckDelivery size={24} />
      </div>
      <input
        id="zipCode"
        type="text"
        value={zipCode}
        onChange={handleZipCodeChange}
        placeholder="Enter 6-digit zip code"
        maxLength={6}
        className="w-full md:w-[15rem] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mt-2 text-sm"
      />
      {zipCode.length === 6 && (
        <div className="mt-4">
          {isDeliveryAvailable ? (
            <div className="text-sm">
              {deliveryEstimate.date && (
                <>
                  <p className="font-medium text-red-700">Get it by: {deliveryEstimate.date}</p>
                  <p className="text-gray-700">
                    Production: {deliveryEstimate.productionDays} days + Shipping: {deliveryEstimate.shippingDays} days
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="bg-red-50 p-3 rounded-md border border-red-200">
              <p className="text-red-600 font-semibold">Delivery Not Available</p>
              <p className="text-red-500 text-sm">
                We currently do not deliver to this zip code.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}