"use client";
import { LiaShippingFastSolid } from "react-icons/lia";
import Link from "next/link";

export default function ShippingAddress({ 
  defaultAddress, 
  addresses, 
  user, 
  formData, 
  setFormData, 
  handleChange, 
  handleSubmit, 
  isDeliveryAvailable,
  deliveryEstimate 
}) {
  return (
    <div className="md:w-1/2 w-full bg-white px-8 py-4">
      {defaultAddress && defaultAddress.data && defaultAddress.data.isDefault ? (
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
              {defaultAddress?.data && Object.entries(defaultAddress.data).map(([key, value]) => {
                if (value && key !== "customerId" && key !== "isDefault" && key !== "id") {
                  const displayedKey = key === "title" ? "Company Name" : key;
                  return (
                    <p className="text-gray-900" key={key}>
                      <span className="font-bold">{displayedKey.charAt(0).toUpperCase() + displayedKey.slice(1)}:</span>{" "}
                      {key === "addedon" ? new Date(value).toLocaleString("en-GB", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
                      }) : value}
                    </p>
                  );
                }
                return null;
              })}
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
            {/* <p className="text-gray-900 uppercase underline text-sm font-bold cursor-pointer">View shipping details</p> */}
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