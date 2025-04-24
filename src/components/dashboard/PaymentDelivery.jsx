"use client"
import React, { useState } from 'react';
import { FiPlus } from "react-icons/fi";
import AddAddress from './AddAddress';
import { AiFillCloseSquare } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import UpdatedAddress from './UpdateAddress';
import { useAuth } from '@/utils/authContext';
import { toast } from 'react-toastify';
import { SiTicktick } from "react-icons/si";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
export const PaymentDelivery = ({ savedAddresses }) => {
    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;  
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [showUpdateAddress, setShowUpdateAddress] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);
    const { user } = useAuth();

    const handleDeleteClick = (id) => {
        setAddressToDelete(id);
        setShowDeleteModal(true);
    };
    const handleAddAddressClick = () => {
        setShowAddAddress(true);
    };
    const handleEditAddress = (id) => {
        setShowUpdateAddress(true);
        setSelectedAddressId(id);
    };

    const handleCloseModal = () => {
        setShowAddAddress(false);
        setShowUpdateAddress(false);
    };

    const handleDeleteAddress = async () => {
        try {
            const response = await fetch(`${APIURL}/api/customerAddress/${addressToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete address');
            }
            const data = await response.json();
            toast.success("Address deleted successfully");
            setShowDeleteModal(false);
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete address:', error);
        }
    };

    const handleSetDefaultAddress = async (customerId, addressId) => {
        try {
            const response = await fetch(`${APIURL}/api/customerAddress/default/${customerId}/${addressId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to set address as default');
            }
            const data = await response.json();
            window.location.reload();
            toast.success("Address set as default successfully");
        } catch (error) {
            console.error('Failed to set address as default:', error);
        }
    };


    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="md:mt-14 text-3xl font-bold text-gray-900 mb-8">Saved Addresses</h1>
                <button
                    onClick={handleAddAddressClick}
                    className="bg-[#103b60] text-white px-6 py-3 rounded-md hover:bg-[#242936] transition duration-300 flex items-center mb-8"
                >
                    <FiPlus className="mr-2" />
                    Add a new address
                </button>

                {savedAddresses && savedAddresses.data && savedAddresses.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedAddresses.data.map((address, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg shadow-md p-6 flex flex-col justify-between ${address.isDefault === "1" ? 'border-2 border-[#30384E]' : ''}`}
                            >
                                <div>
                                    {address.isDefault === "1" && (
                                        <span className="bg-[#30384E] text-white text-xs font-medium px-2.5 py-1 rounded-full mb-2 inline-block">Default Address</span>
                                    )}
                                    <h3 className="font-bold text-lg text-gray-900">{address.title}</h3>
                                    <p className="text-gray-600">{address.floor}, {address.address}</p>
                                    <p className="text-gray-600">{address.address2}</p>
                                    <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                                    <p className="text-gray-600">{address.country}</p>
                                    <p className="text-gray-600">{address.phone}</p>
                                    <p className="text-gray-600">{address.addressType}</p>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <div>
                                        <button
                                            onClick={() => handleEditAddress(address.id)}
                                            className="text-[#30384E] hover:text-[#242936] mr-3"
                                        >
                                            <BiSolidEdit className="inline-block mr-1" /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(address.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <MdDelete className="inline-block mr-1" /> Delete
                                        </button>
                                    </div>
                                    {address.isDefault != "1" && (
                                        <button
                                            className="text-[#30384E] hover:text-[#242936] underline"
                                            onClick={() => handleSetDefaultAddress(user?.result?.customerId || user?.customerId, address.id)}
                                        >
                                            Make Default
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700">No addresses saved.</p>
                )}


                {showAddAddress && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <AddAddress
                                setShowAddAddress={setShowAddAddress}
                            />
                        </div>
                    </div>
                )}
                {showUpdateAddress && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <UpdatedAddress
                                setShowUpdateAddress={setShowUpdateAddress}
                                addressId={selectedAddressId}
                            />
                        </div>
                    </div>
                )}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-md w-[550px]">
                            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this address?
                            </p>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleDeleteAddress}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md mr-2 hover:bg-red-700 transition duration-300"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}