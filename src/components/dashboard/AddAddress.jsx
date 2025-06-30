"use client";
import React, { useState } from "react";
import { useAuth } from "@/utils/authContext";
import { RxCross2 } from "react-icons/rx";

const AddAddress = (props) => {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    customerId: "",
    location: "",
    serviceArea: "",
    title: "",
    houseno: "",
    floor: "",
    address: "",
    address2: "",
    state: "Maharashtra",
    city: "",
    zip: "",
    country: "India",
    phone: "",
    mobile: "",
    addressType: "",
    company: "",
    addedon: "",
    latlong: "",
    street_no: "",
    addressTypeOther: "",
    gstin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "gstin" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) return;
      let customerId = user?.result?.customerId || user?.customerId;
      const formDataWithCustomerId = { ...formData, customerId };
      formDataWithCustomerId.addedon = new Date().toISOString();
      const response = await fetch(`${APIURL}/api/customerAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithCustomerId),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error("Failed to insert address");
      }

      const data = await response.json();
      props.setShowAddAddress(false);
      window.location.reload();
    } catch (error) {
      console.error("Error inserting address:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-md sm:max-w-lg h-[85vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => props.setShowAddAddress(false)}
          className="absolute text-black top-2 right-2"
        >
          <RxCross2 className="cursor-pointer" size={24} />
        </button>
        <div className="px-4 py-4 sm:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 sm:text-3xl sm:text-left">
            Enter Your New Address
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-2 sm:px-8 sm:space-y-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="Floor"
              required
            />
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="Address Line 1"
              required
            />
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="Address Line 2"
            />
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="City/Town"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="State"
              required
            />
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="ZIP"
              required
              maxLength={6}
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="Country"
              required
            />
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="Phone"
              required
              maxLength={10}
            />
            <select
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              required
            >
              <option value="">Select Address Type</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="Company"
            />
            <input
              type="text"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
              placeholder="GSTIN"
              maxLength={15}
            />
          </div>
          <div className="mt-2 sm:mt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#103b60] rounded-md text-white px-6 py-2 sm:px-8 sm:py-2 text-sm sm:text-base"
            >
              Use this address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;