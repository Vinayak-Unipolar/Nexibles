"use client";
import { LiaShippingFastSolid } from "react-icons/lia";
import Link from "next/link";
import { useEffect } from "react";

export default function ShippingAddress({
  defaultAddress,
  addresses,
  user,
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  isDeliveryAvailable,
  deliveryEstimate,
  selectedAddress,
  setSelectedAddress
}) {
  // Log props for debugging
  useEffect(() => {
    //console.log("ShippingAddress - defaultAddress:", defaultAddress);
    //console.log("ShippingAddress - addresses:", addresses);
    //console.log("ShippingAddress - selectedAddress:", selectedAddress);

    // Preselect the default address if it exists and selectedAddress is not set
    if (defaultAddress?.data?.id && addresses && !selectedAddress) {
      const defaultAddr = addresses.find(
        (addr) => String(addr.id) === String(defaultAddress.data.id)
      );
      if (defaultAddr) {
        console.log("Preselecting default address:", defaultAddr);
        setSelectedAddress(defaultAddr);
      } else {
        console.log("Default address not found in addresses array");
      }
    }
  }, [defaultAddress, addresses, selectedAddress, setSelectedAddress]);

  const handleAddressSelection = (address) => {
    //console.log("Selected address:", address);
    setSelectedAddress(address);
  };

  const renderAddressFields = (address) => {
    const fields = [
      // { key: "title" },
      { key: "houseno" },
      { key: "floor" },
      { key: "address" },
      { key: "address2" },
      { key: "city" },
      { key: "state" },
      { key: "zip" },
      { key: "country" },
      // { key: "phone" },
      // { key: "mobile" },
      // { key: "addressType" },
      // { key: "company" },
      { key: "location" },
      { key: "serviceArea" },
      { key: "gstin" },
      { key: "latlong" },
      { key: "street_no" },
      // { key: "addedon", format: (value) => new Date(value).toLocaleString("en-GB", {
      //   day: "2-digit", month: "2-digit", year: "numeric",
      //   hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
      // })}
    ];

    const values = fields
      .filter(({ key }) => address[key] && address[key] !== "")
      .map(({ key, format }) => format ? format(address[key]) : address[key]);

    return (
      <p className="text-gray-700">
        {values.join(', ')}
      </p>
    );
  };

  return (
    <div className="md:w-1/2 w-full bg-white px-8 py-4">
      {addresses && addresses.length > 1 ? (
        <>
          <div className="flex space-x-8 justify-start items-center">
            <h3 className="md:text-3xl text-xl text-gray-900 font-bold mb-4">Shipping</h3>
            <LiaShippingFastSolid className="text-gray-900" size={48} />
          </div>
          <hr className="border border-gray-300" />
          <div className="mt-4 mb-4">
            <p className="text-gray-900 font-bold mb-2">Select Shipping Address</p>
            <div className="space-y-4">
              {addresses.map((address) => (
                <label
                  key={address.id}
                  className={`block border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedAddress?.id === address.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-300 hover:bg-gray-50 "
                    }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="shippingAddress"
                      value={address.id}
                      checked={String(selectedAddress?.id) === String(address.id)}
                      onChange={() => handleAddressSelection(address)}
                      className="mt-1 h-5 w-5 text-blue-500"
                    />
                    <div className="flex-1">
                     <div>
                       <p className="text-gray-900 font-semibold">
                        {address.title || address.company}, {address.addressType}
                      </p>
                     </div>
                      {renderAddressFields(address)}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          {/* {selectedAddress && (
            <div className="flex justify-between mt-4 mb-4">
              <div className="flex flex-col">
                <p className="text-gray-900 text-2xl font-bold">
                  {user?.result?.firstName ?? user?.firstName} {user?.result?.lastName ?? user?.lastName}
                </p>
                {renderAddressFields(selectedAddress)}
              </div>
              <Link href="/manageaddress">
                <p className="text-gray-900 underline uppercase text-sm font-bold cursor-pointer">change address</p>
              </Link>
            </div>
          )} */}
          <hr className="border border-gray-300" />
          <div className="mt-4 flex items-start justify-between">
            <div className="flex flex-col">
              <p className="text-gray-900 font-bold md:text-xl text-base mb-4">Shipping Details</p>
              <div className="h-auto w-auto border-2 border-gray-900 rounded-3xl p-4 flex flex-col justify-start items-start">
                <p className="text-gray-900">
                  {isDeliveryAvailable ? (
                    <>
                      Production Time: 21 days<br />
                      Shipping Time: {deliveryEstimate.days || "7"} days<br />
                      {deliveryEstimate.date && (
                        <>Estimated Delivery: {deliveryEstimate.date}</>
                      )}
                    </>
                  ) : (
                    <>
                      Production Time: 21 days<br />
                      Estimated Delivery: 28 days total
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : addresses && addresses.length === 1 ? (
        <>
          <div className="flex space-x-8 justify-start items-center">
            <h3 className="md:text-3xl text-xl text-gray-900 font-bold mb-4">Shipping</h3>
            <LiaShippingFastSolid className="text-gray-900" size={48} />
          </div>
          <hr className="border border-gray-300" />
          <div className="flex justify-between mt-4 mb-4">
            <div className="flex flex-col">
              <p className="text-gray-900 text-2xl font-bold">
                {user?.result?.firstName ?? user?.firstName} {user?.result?.lastName ?? user?.lastName}
              </p>
              {selectedAddress && renderAddressFields(selectedAddress)}
            </div>
            <Link href="/manageaddress">
              <p className="text-gray-900 underline uppercase text-sm font-bold cursor-pointer">change address</p>
            </Link>
          </div>
          <hr className="border border-gray-300" />
          <div className="mt-4 flex items-start justify-between">
            <div className="flex flex-col">
              <p className="text-gray-900 font-bold md:text-xl text-base mb-4">Shipping Details</p>
              <div className="h-auto w-auto border-2 border-gray-900 rounded-3xl p-4 flex flex-col justify-start items-start">
                <p className="text-gray-900">
                  {isDeliveryAvailable ? (
                    <>
                      Production Time: 21 days<br />
                      Shipping Time: {deliveryEstimate.days || "7"} days<br />
                      {deliveryEstimate.date && (
                        <>Estimated Delivery: {deliveryEstimate.date}</>
                      )}
                    </>
                  ) : (
                    <>
                      Production Time: 21 days<br />
                      Estimated Delivery: 28 days total
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-gray-900 font-bold text-3xl px-6">Delivery Address</h2>
          <form onSubmit={handleSubmit} className="py-4 px-8">
            <div className="flex flex-col space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none" placeholder="Company Name (required for business addresses)" required />
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none" placeholder="Address 1" required />
              <input type="text" name="address2" value={formData.address2} onChange={handleChange} className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none" placeholder="Address 2" />
              <input type="text" name="floor" value={formData.floor} onChange={handleChange} className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none" placeholder="Floor" />
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none" placeholder="City/Town" required />
              <select name="state" value={formData.state} onChange={handleChange} className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none">
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
              </select>
              <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none" placeholder="zip" required maxLength={6} />
              <select name="country" value={formData.country} onChange={handleChange} className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none">
                <option value="India">India</option>
                <option value="Germany">Germany</option>
              </select>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none" placeholder="Phone" maxLength={10} />
            </div>
            <div className="mt-4">
              <button type="submit" className="bg-[#013b60] rounded-md text-white px-8 py-2">Save Address</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}