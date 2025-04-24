"use client"
import React, { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
const UpdatedAddress = ({ addressId, setShowUpdateAddress }) => {
    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;

    const [formData, setFormData] = useState({
        title: '',
        address: '',
        address2: '',
        city: '',
        state: 'Maharashtra',
        zip: '',
        country: 'India',
        phone: '',
        addressType: '',
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
                            title: addressData.title,
                            floor: addressData.floor,
                            address: addressData.address,
                            address2: addressData.address2,
                            city: addressData.city,
                            state: addressData.state,
                            zip: addressData.zip,
                            country: addressData.country,
                            phone: addressData.phone,
                            addressType: addressData.addressType,
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
        <div className="bg-white py-10 relative">  {/* Added relative positioning */}
            <button
                onClick={() => setShowUpdateAddress(false)}
                className="absolute top-0 right-0 text-black"
            >
                <RxCross2 className="cursor-pointer" size={34} />
            </button>
            <div>
                <h2 className="text-gray-900 font-bold text-3xl px-8">Update Your Address</h2>
            </div>
            <form onSubmit={handleSubmit} className="py-4 px-8">
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none"
                        placeholder="Company Name"
                        required
                    />
                    <input
                        type="text"
                        name="floor"
                        value={formData.floor}
                        onChange={handleChange}
                        className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none"
                        placeholder="Floor"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none"
                        placeholder="Address 1"
                        required
                    />
                    <input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none"
                        placeholder="Address 2"
                    />
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none"
                        placeholder="City/Town"
                        required
                    />
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none"
                    >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                    </select>
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none"
                        placeholder="ZIP"
                        required
                    />
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none"
                    >
                        <option value="India">India</option>
                        <option value="Germany">Germany</option>
                    </select>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none"
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
                        className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none"
                    >
                        <option value="">Select Address Type</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        {/* <option value="Others">Others</option> */}
                    </select>
                    {/* {formData.addressType === '' && (
                        <input
                            type="text"
                            name="addressType"
                            value={formData.addressType}
                            onChange={handleChange}
                            className="border-2 rounded-full text-gray-900 px-4 py-1 outline-none mt-2"
                            placeholder="Please specify"
                            required
                        />
                    )} */}
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

export default UpdatedAddress;
