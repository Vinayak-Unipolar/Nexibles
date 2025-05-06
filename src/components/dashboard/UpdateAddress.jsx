"use client";
import React, { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';

const UpdatedAddress = ({ addressId, setShowUpdateAddress }) => {
    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;

    const [formData, setFormData] = useState({
        title: '',
        floor: '',
        address: '',
        address2: '',
        city: '',
        state: 'Maharashtra',
        zip: '',
        country: 'India',
        phone: '',
        addressType: '',
        company: '',
        gstin: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${APIURL}/api/customerAddress/${addressId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update address');
            }
            setShowUpdateAddress(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                if (addressId) {
                    const response = await fetch(`${APIURL}/api/customerAddress/${addressId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch address');
                    }
                    const responseData = await response.json();
                    if (responseData.success === 1 && responseData.data && responseData.data.length > 0) {
                        const addressData = responseData.data[0];
                        setFormData({
                            title: addressData.title || '',
                            floor: addressData.floor || '',
                            address: addressData.address || '',
                            address2: addressData.address2 || '',
                            city: addressData.city || '',
                            state: addressData.state || 'Maharashtra',
                            zip: addressData.zip || '',
                            country: addressData.country || 'India',
                            phone: addressData.phone || '',
                            addressType: addressData.addressType || '',
                            company: addressData.company || '',
                            gstin: addressData.gstin || ''
                        });
                    } else {
                        console.error('No data found for addressId:', addressId);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch address:', error);
            }
        };
        fetchAddress();
    }, [addressId]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg w-full max-w-md sm:max-w-lg h-[85vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto">
                <button
                    onClick={() => setShowUpdateAddress(false)}
                    className="absolute text-black top-2 right-2"
                >
                    <RxCross2 className="cursor-pointer" size={24} />
                </button>
                <div className="px-4 py-4 sm:px-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 sm:text-3xl sm:text-left">
                        Update Your Address
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
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
                        >
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Delhi">Delhi</option>
                        </select>
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
                        />
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
                        >
                            <option value="India">India</option>
                            <option value="Germany">Germany</option>
                        </select>
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
                        />
                        <select
                            name="addressType"
                            value={formData.addressType}
                            onChange={(e) => {
                                const value = e.target.value;
                                setFormData((prevState) => ({
                                    ...prevState,
                                    addressType: value === 'Others' ? '' : value,
                                }));
                            }}
                            className="w-full px-3 py-1 text-sm text-gray-900 border-2 rounded-full outline-none sm:px-4 sm:py-1 sm:text-base"
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

export default UpdatedAddress;