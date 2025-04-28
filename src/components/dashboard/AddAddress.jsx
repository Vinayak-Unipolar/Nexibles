"use client"
import React, { useState } from 'react';
import { useAuth } from '@/utils/authContext';
import { RxCross2 } from 'react-icons/rx';

const AddAddress = (props) => {
    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        customerId: '',
        location: '',
        serviceArea: '',
        title: '',
        houseno: '',
        floor: '',
        address: '',
        address2: '',
        state: 'Maharashtra', // Set default value
        city: '',
        zip: '',
        country: 'India', // Set default value
        phone: '',
        mobile: '',
        addressType: '',
        company: '',
        addedon: '',
        latlong: '',
        street_no: '',
        addressTypeOther: '',
        gstin: '' // Added GSTIN field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataWithCustomerId)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server response:', errorData);
                throw new Error('Failed to insert address');
            }

            const data = await response.json();
            props.setShowAddAddress(false);
            window.location.reload();
        } catch (error) {
            console.error("Error inserting address:", error);
        }
    };

    return (
        <div className="relative py-4 bg-white">
            <button
                onClick={() => props.setShowAddAddress(false)}
                className="absolute top-0 right-0 text-black"
            >
                <RxCross2 className="cursor-pointer" size={34} />
            </button>
            <div className="">
                <h2 className="px-8 text-3xl font-bold text-gray-900">Enter Your New Address</h2>
            </div>
            <form onSubmit={handleSubmit} className="px-8 py-4">
                <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            placeholder="Title (required for business addresses)"
                            required
                        />
                        <input
                            type="text"
                            name="floor"
                            value={formData.floor}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            placeholder="Floor"
                            required
                        />
                    </div>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            placeholder="Address 1"
                            required
                        />
                        <input
                            type="text"
                            name="address2"
                            value={formData.address2}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            placeholder="Address 2"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            placeholder="City/Town"
                            required
                        />
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            required
                        >
                            <option value="">Select State</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Delhi">Delhi</option>
                        </select>
                    </div>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            placeholder="ZIP"
                            required
                            maxLength={6}
                        />
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            required
                        >
                            <option value="">Select Country</option>
                            <option value="India">India</option>
                            <option value="Germany">Germany</option>
                        </select>
                    </div>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            placeholder="Phone"
                            required
                            maxLength={10}
                        />
                        <select
                            name="addressType"
                            value={formData.addressType}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            required
                        >
                            <option value="">Select Address Type</option>
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="gstin"
                            value={formData.gstin}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            placeholder="GSTIN"
                        />
                        {/* Placeholder for the second input - you can pair it with another field or leave it empty */}
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="flex-1 px-4 py-1 text-gray-900 border-2 rounded-full outline-none"
                            placeholder="Company"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <button type="submit" className="bg-[#103b60] rounded-md text-white px-8 py-2">
                        Use this address
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAddress;