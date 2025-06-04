'use client';

import React, { useState, useEffect } from 'react';
import { FiDownload, FiArrowLeft } from 'react-icons/fi';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useAuth } from '@/utils/authContext';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Loader from '../../../components/comman/Loader';
import Footer from '@/components/shop/Footer';
import Navbar from '@/components/shop/Navbar';

const OrderDetails = () => {
    const { orderNo } = useParams();
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
    const { user } = useAuth();
    const customerId = user?.result?.customerId;
    const [orderGroup, setOrderGroup] = useState([]);
    const [keylineDownloaded, setKeylineDownloaded] = useState({});
    const [uploadingOrder, setUploadingOrder] = useState(null);
    const [orderFiles, setOrderFiles] = useState({});
    const [skuNames, setSkuNames] = useState({});
    const [skuUploads, setSkuUploads] = useState({});
    const [checklistExist, setChecklistExist] = useState({});
    const [keylineLoading, setKeylineLoading] = useState({});
    const [selectedFiles, setSelectedFiles] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                if (!user || !customerId) return;
                const fetchedOrders = await fetchOrderHistory();
                if (fetchedOrders.length > 0) {
                    await fetchOrderFiles();
                    const downloadedState = {};
                    const checklistState = {};
                    fetchedOrders.forEach((order) => {
                        downloadedState[order.orderNo] = hasOrderFiles(order.orderNo);
                        checklistState[order.orderNo] = order.checklist_exist;
                    });
                    setKeylineDownloaded(downloadedState);
                    setChecklistExist(checklistState);
                }
            } catch (error) {
                console.error('Error loading data:', error);
                toast.error('Failed to load order data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user, customerId]);

    const hasOrderFiles = (orderNo) => {
        return orderFiles[orderNo]?.length > 0;
    };

    const fetchOrderHistory = async () => {
        try {
            if (!user) return [];

            let customerID = user?.result?.customerId || user?.customerId;
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

            const response = await fetch(`${APIURL}/api/getorderdetails/${customerID}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'API-Key': `irrv211vui9kuwn11efsb4xd4zdkuq`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order history');
            }

            const data = await response.json();
            const filteredOrders = data.orderDetails.filter(
                (order) => order.origin === 'Nexibles' && order.orderNo === orderNo
            );
            const sortedOrders = filteredOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

            setOrderGroup(sortedOrders);
            return sortedOrders;
        } catch (error) {
            console.error('Error fetching order history:', error);
            toast.error('Failed to fetch order history. Please try again.');
            return [];
        }
    };

    const fetchOrderFiles = async () => {
        try {
            if (!customerId) return;

            const token = localStorage.getItem('token');
            const response = await fetch(`${APIURL}/api/orderFile/byCustomer/${customerId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'API-Key': `irrv211vui9kuwn11efsb4xd4zdkuq`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch order files');

            const result = await response.json();
            if (result.status === 'success') {
                const filesByOrder = result.data.reduce((acc, file) => {
                    const orderId = file.oder_id;
                    if (!acc[orderId]) {
                        acc[orderId] = [];
                    }
                    acc[orderId].push(file);
                    return acc;
                }, {});

                setOrderFiles(filesByOrder);
                const initialSkuUploads = {};
                Object.keys(filesByOrder).forEach((orderNo) => {
                    initialSkuUploads[orderNo] = {};
                    filesByOrder[orderNo].forEach((file) => {
                        initialSkuUploads[orderNo][file.sku_no] = true;
                        setSkuNames((prev) => ({
                            ...prev,
                            [`${orderNo}_${file.sku_no}`]: file.sku_name,
                        }));
                    });
                });

                setSkuUploads(initialSkuUploads);
                return filesByOrder;
            }
        } catch (error) {
            console.error('Error fetching order files:', error);
            toast.error('Failed to fetch order files. Please try again.');
            return {};
        }
    };

    const updateChecklistExist = async (orderNo) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${APIURL}/api/ordermaster/update_order/${orderNo}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'API-Key': `irrv211vui9kuwn11efsb4xd4zdkuq`,
                },
                body: JSON.stringify({
                    checklist_exist: 1,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update checklist_exist');
            }

            const result = await response.json();
            if (result.status === 'success') {
                setChecklistExist((prev) => ({ ...prev, [orderNo]: 1 }));
            } else {
                throw new Error(result.message || 'Failed to update checklist_exist');
            }
        } catch (error) {
            console.error('Error updating checklist_exist:', error);
            toast.error('Failed to update checklist status. Please try again.');
        }
    };

    const handleKeylineDownload = async (orderNo, productId) => {
        try {
            setKeylineLoading((prev) => ({ ...prev, [orderNo]: true }));
            const response = await fetch(`${APIURL}/api/product/${productId}`, {
                headers: {
                    'API-Key': 'irrv211vui9kuwn11efsb4xd4zdkuq',
                },
            });
            const result = await response.json();

            if (result.status === 'success' && result.data.keylineimage) {
                const fileName = result.data.keylineimage.split('/').pop();
                const downloadUrl = `${APIURL}/download-keyline-simple/${fileName}`;
                const downloadResponse = await fetch(downloadUrl);

                if (!downloadResponse.ok) {
                    throw new Error(`Download failed: ${downloadResponse.status}`);
                }

                const blob = await downloadResponse.blob();
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = fileName;
                link.style.display = 'none';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
                localStorage.setItem(`keylineDownloaded_${orderNo}`, 'true');
                setKeylineDownloaded((prev) => ({ ...prev, [orderNo]: true }));
                await updateChecklistExist(orderNo);
                toast.success('Keyline file downloaded successfully!');
            } else {
                throw new Error('Keyline image not found.');
            }
        } catch (error) {
            console.error('Error downloading keyline file:', error);
            toast.error('Failed to download keyline file. Please try again later.');
        } finally {
            setKeylineLoading((prev) => ({ ...prev, [orderNo]: false }));
        }
    };

    const sanitizeFileName = (name) => {
        return name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9.-]/g, '');
    };

    const handleDesignUpload = (orderNo, skuNo, event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        if (skuUploads[orderNo]?.[skuNo]) {
            toast.error('A design is already uploaded for this SKU. Remove it before uploading a new one.');
            return;
        }

        setSelectedFiles((prev) => ({
            ...prev,
            [`${orderNo}_${skuNo}`]: Array.from(files),
        }));
    };

    const handleSubmitUpload = async (orderNo, skuNo) => {
        const customSkuName = skuNames[`${orderNo}_${skuNo}`] || `SKU Name ${skuNo.split('SKU')[1]}`;
        const files = selectedFiles[`${orderNo}_${skuNo}`];

        if (!files || files.length === 0) {
            toast.error('No files selected for upload.');
            return;
        }

        setUploadingOrder(`${orderNo}_${skuNo}`);

        try {
            const token = localStorage.getItem('token');

            for (const file of files) {
                const sanitizedFileName = sanitizeFileName(file.name);
                const fileName = `${orderNo}_${customerId}_${skuNo}_${sanitizedFileName}`;

                const uploadFormData = new FormData();
                uploadFormData.append('File', file);

                const uploadResponse = await fetch(`${APIURL}/api/product/upload`, {
                    method: 'POST',
                    body: uploadFormData,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!uploadResponse.ok) {
                    throw new Error('File upload failed');
                }

                const uploadResult = await uploadResponse.json();

                if (uploadResult.status !== 1) {
                    throw new Error(uploadResult.message || 'File upload failed');
                }

                const fileDetailsResponse = await fetch(`${APIURL}/api/orderFile`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customer_id: customerId,
                        oder_id: orderNo,
                        side: skuNo,
                        file_name: fileName,
                        sku_no: skuNo,
                        sku_name: customSkuName,
                    }),
                });

                if (!fileDetailsResponse.ok) {
                    throw new Error('Failed to save file details');
                }

                const fileDetailsResult = await fileDetailsResponse.json();

                if (fileDetailsResult.status === 'success') {
                    await fetchOrderFiles();
                    toast.success('Design uploaded and saved successfully!');
                } else {
                    throw new Error(fileDetailsResult.message || 'Failed to save file details');
                }
            }

            setSelectedFiles((prev) => {
                const newSelectedFiles = { ...prev };
                delete newSelectedFiles[`${orderNo}_${skuNo}`];
                return newSelectedFiles;
            });
        } catch (error) {
            console.error('Error in upload process:', error);
            toast.error(error.message || 'Failed to upload design. Please try again.');
        } finally {
            setUploadingOrder(null);
        }
    };

    const handleSkuNameChange = (orderNo, skuNo, value) => {
        setSkuNames((prev) => ({
            ...prev,
            [`${orderNo}_${skuNo}`]: value,
        }));
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'UTC',
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const generateSkuData = (skuCount) => {
        const skus = [];
        for (let i = 1; i <= skuCount; i++) {
            skus.push({
                sku_no: `SKU${i}`,
                sku_name: `SKU Name ${i}`,
            });
        }
        return skus;
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen mt-8">
                <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-12">
                    <Link
                        href="/my-orderhistory"
                        className="inline-flex items-center mb-6 text-sm font-medium text-[#103b60] hover:text-[#252b3d]"
                    >
                        <FiArrowLeft className="mr-2" size={16} />
                        Back to Orders
                    </Link>
                    <div className="space-y-8">
                        {loading ? (
                            <p className="text-center text-lg text-gray-600">
                                <Loader />
                            </p>
                        ) : orderGroup.length === 0 ? (
                            <p className="text-gray-900 text-lg text-center">Order not found.</p>
                        ) : (
                            <div className="bg-white border border-gray-200 rounded-xl shadow-lg">
                                <div className="p-6 sm:p-8">
                                    <h2 className="mb-6 text-xl font-semibold text-gray-900 sm:text-2xl">Order #{orderNo}</h2>

                                    {orderGroup.map((order) => {
                                        const displayPrice = order.discountedPrice ? parseFloat(order.discountedPrice) : order.price;
                                        const hasDiscount = order.discountAmount && parseFloat(order.discountAmount) > 0;
                                        const skus = generateSkuData(order.skuCount);

                                        return (
                                            <div
                                                key={order.id}
                                                className="flex flex-col gap-6 py-6 border-t border-gray-200 lg:flex-row first:border-t-0"
                                            >
                                                <div className="flex-shrink-0 w-full lg:w-80">
                                                    <img
                                                        src={`${CDN_URL}/product/${order.image}`}
                                                        alt={order.product_name}
                                                        className="object-contain w-full h-48 rounded-lg lg:h-48"
                                                        onError={(e) => (e.target.src = '/placeholder-image.jpg')}
                                                    />
                                                </div>

                                                <div className="flex-grow space-y-6">
                                                    <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">{order.product_name}</h3>

                                                    <div className="space-y-6 md:flex md:space-x-6 md:space-y-0">
                                                        {/* Address and Customer Details Column */}


                                                        {/* Order Details Column */}
                                                        <div className="flex-1 space-y-4">
                                                            <div className="grid grid-cols-1 gap-3 text-sm">
                                                                <p>
                                                                    <span className="font-semibold text-gray-700">Order Date:</span>{' '}
                                                                    {formatDate(order.orderDate)}
                                                                </p>
                                                                {order.transaction_id && (
                                                                    <p>
                                                                        <span className="font-semibold text-gray-700">Transaction ID:</span>{' '}
                                                                        {order.transaction_id}
                                                                    </p>
                                                                )}
                                                                <p>
                                                                    <span className="font-semibold text-gray-700">Quantity:</span> {order.quantity}
                                                                </p>
                                                                <p>
                                                                    <span className="font-semibold text-gray-700">Sku Count:</span> {order.skuCount}
                                                                </p>
                                                                <p>
                                                                    <span className="font-semibold text-gray-700">Material:</span> {order.material}
                                                                </p>
                                                                {/* <div className="space-y-2 border-t pt-2">
                                                                    <p>
                                                                        <span className="font-semibold text-gray-700">Product Price (per item):</span> ₹{order.price}
                                                                    </p>
                                                                    <p>
                                                                        <span className="font-semibold text-gray-700">Subtotal ({order.quantity} items):</span> ₹{(order.price * order.quantity)} <span className="text-gray-500 text-xs"></span>
                                                                    </p>
                                                                    <p>
                                                                        <span className="font-semibold text-gray-700">GST (18%):</span> + ₹{order.tax}
                                                                    </p>
                                                                    <p>
                                                                        <span className="font-semibold text-gray-700">Shipping Fee:</span> + ₹{order.orderCharge}
                                                                    </p>
                                                                    {hasDiscount && (
                                                                        <p>
                                                                            <span className="font-semibold text-gray-700">Discount ({order.discountPercentage}%):</span> − ₹{order.discountAmount}
                                                                        </p>
                                                                    )}
                                                                    <p className="font-bold text-gray-800">
                                                                        <span className="font-semibold">Total:</span> ₹{order.invamt}
                                                                    </p>
                                                                    {!hasDiscount && (
                                                                        <p className="text-gray-600 text-sm italic">
                                                                            <span className="font-semibold text-gray-700">Total Price:</span> ₹{displayPrice} (No discount applied)
                                                                        </p>
                                                                    )}
                                                                </div> */}
                                                                <div className="grid grid-cols-1 gap-3 text-sm">
                                                                    <div>
                                                                        <p className="font-semibold text-gray-700">Shipping Address:</p>
                                                                        <p>
                                                                            {order?.company || ' '}, {order?.street || ' '}, {order?.city || ''},{' '}
                                                                            {order?.state || ''} {order?.zipcode || ''}, {order?.country || ''}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-semibold text-gray-700">Customer Details:</p>
                                                                        <p>
                                                                            <p>First Name: {order?.firstName || ' '}</p>
                                                                            <p>Last Name: {order?.lastName || ' '}</p>
                                                                            <p>Email: {order?.eMail || ''}</p>
                                                                            <p>Mobile: {order?.mobile || ''}</p>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {order.product_config_id && (
                                                                    <p>
                                                                        <span className="font-semibold text-gray-700">Product Options:</span>{' '}
                                                                        {order.product_config_id} : {order.product_option_id}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 space-y-4 text-sm">
                                                            <p>
                                                                <span className="font-semibold text-gray-700">Product Price (per item):</span> ₹{order.price}
                                                            </p>
                                                            <p>
                                                                <span className="font-semibold text-gray-700">Subtotal ({order.quantity} items):</span> ₹{(order.price * order.quantity)} <span className="text-gray-500 text-xs"></span>
                                                            </p>
                                                            <p>
                                                                <span className="font-semibold text-gray-700">GST (18%):</span> + ₹{order.tax}
                                                            </p>
                                                            <p>
                                                                <span className="font-semibold text-gray-700">Shipping Fee:</span> + ₹{order.orderCharge}
                                                            </p>
                                                            {hasDiscount && (
                                                                <p>
                                                                    <span className="font-semibold text-gray-700">Discount ({order.discountPercentage}%):</span> − ₹{order.discountAmount}
                                                                </p>
                                                            )}
                                                            <p className="font-bold text-gray-800">
                                                                <span className="font-semibold">Total:</span> ₹{order.invamt}
                                                            </p>
                                                            {!hasDiscount && (
                                                                <p className="text-gray-600 text-sm italic">
                                                                    <span className="font-semibold text-gray-700">Total Price:</span> ₹{displayPrice} (No discount applied)
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Separator */}
                                                    <hr className="my-6 border-gray-200" />

                                                    <div className="space-y-4">
                                                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-0">
                                                            {/* Left side - Keyline section */}
                                                            <div className="flex-shrink-0 lg:pr-6 lg:border-r lg:border-gray-300">
                                                                <div className='mb-4'>
                                                                    <h5 className="text-md font-medium text-gray-700 ">Keyline </h5>
                                                                    <span className='text-xs '>(Download keyline to upload your design)</span>
                                                                </div>

                                                                <button
                                                                    className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors w-full lg:w-auto justify-center lg:justify-start ${checklistExist[orderNo] === 1
                                                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                                        : keylineLoading[orderNo]
                                                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                                            : 'bg-[#103b60] text-white hover:bg-[#252b3d] hover:shadow-md'
                                                                        }`}
                                                                    onClick={() => handleKeylineDownload(orderNo, order.product_id)}
                                                                    disabled={checklistExist[orderNo] === 1 || keylineLoading[orderNo]}
                                                                >
                                                                    <FiDownload className="mr-2" size={16} />
                                                                    {keylineLoading[orderNo]
                                                                        ? 'Downloading...'
                                                                        : checklistExist[orderNo] === 1
                                                                            ? 'Downloaded'
                                                                            : 'Download'}
                                                                </button>
                                                            </div>

                                                            {/* Right side - SKU section */}
                                                            {checklistExist[orderNo] === 1 && (
                                                                <div className="flex-1 lg:pl-6">
                                                                    <h5 className="text-md font-medium text-gray-700 mb-3">SKU</h5>
                                                                    <div className="space-y-4">
                                                                        <div className="flex flex-col gap-3">
                                                                            {skus.map((sku) => {
                                                                                const isUploaded = skuUploads[orderNo]?.[sku.sku_no] || false;
                                                                                const skuKey = `${orderNo}_${sku.sku_no}`;
                                                                                const hasSelectedFiles = selectedFiles[skuKey]?.length > 0;

                                                                                return (
                                                                                    <div key={sku.sku_no} className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                                                        <input
                                                                                            type="text"
                                                                                            value={skuNames[`${orderNo}_${sku.sku_no}`] || sku.sku_name}
                                                                                            onChange={(e) => handleSkuNameChange(orderNo, sku.sku_no, e.target.value)}
                                                                                            className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                                            placeholder="Enter SKU Name"
                                                                                        />
                                                                                        <label
                                                                                            htmlFor={`upload_${orderNo}_${sku.sku_no}`}
                                                                                            className={`inline-flex items-center justify-center px-4 py-2 bg-[#30384E] text-white rounded-md hover:bg-[#252b3d] transition-colors text-sm font-medium cursor-pointer shadow-sm hover:shadow-md w-full sm:w-auto ${uploadingOrder === `${orderNo}_${sku.sku_no}` || isUploaded
                                                                                                ? 'opacity-50 cursor-not-allowed'
                                                                                                : ''
                                                                                                }`}
                                                                                        >
                                                                                            <MdOutlineFileUpload className="mr-2" size={16} />
                                                                                            <span className="hidden sm:inline">
                                                                                                {uploadingOrder === `${orderNo}_${sku.sku_no}`
                                                                                                    ? 'Uploading...'
                                                                                                    : isUploaded
                                                                                                        ? 'Already Uploaded'
                                                                                                        : `Upload Files for ${sku.sku_no}`}
                                                                                            </span>
                                                                                            <span className="sm:hidden">
                                                                                                {uploadingOrder === `${orderNo}_${sku.sku_no}`
                                                                                                    ? 'Uploading...'
                                                                                                    : isUploaded
                                                                                                        ? 'Uploaded'
                                                                                                        : 'Upload Files'}
                                                                                            </span>
                                                                                        </label>
                                                                                        <input
                                                                                            type="file"
                                                                                            id={`upload_${orderNo}_${sku.sku_no}`}
                                                                                            className="hidden"
                                                                                            onChange={(e) => handleDesignUpload(orderNo, sku.sku_no, e)}
                                                                                            accept="image/*,.pdf"
                                                                                            multiple
                                                                                            disabled={uploadingOrder === `${orderNo}_${sku.sku_no}` || isUploaded}
                                                                                        />
                                                                                        {hasSelectedFiles && (
                                                                                            <button
                                                                                                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors w-full sm:w-auto justify-center ${uploadingOrder === `${orderNo}_${sku.sku_no}`
                                                                                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                                                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                                                                                                    }`}
                                                                                                onClick={() => handleSubmitUpload(orderNo, sku.sku_no)}
                                                                                                disabled={uploadingOrder === `${orderNo}_${sku.sku_no}`}
                                                                                            >
                                                                                                Submit
                                                                                            </button>
                                                                                        )}
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>

                                                                        {/* Selected Files Section */}
                                                                        {selectedFiles &&
                                                                            Object.keys(selectedFiles).some((key) => key.startsWith(orderNo)) && (
                                                                                <div className="mt-4 text-sm">
                                                                                    <h3 className="mb-2 font-semibold text-gray-700">Selected Files:</h3>
                                                                                    <div className="space-y-2">
                                                                                        {skus.map((sku) => {
                                                                                            const skuKey = `${orderNo}_${sku.sku_no}`;
                                                                                            if (selectedFiles[skuKey]) {
                                                                                                return (
                                                                                                    <div key={sku.sku_no} className="flex flex-col sm:flex-row sm:items-start w-full gap-1 sm:gap-0">
                                                                                                        <span className="font-medium w-full sm:w-[100px] sm:shrink-0 text-gray-700">
                                                                                                            {skuNames[skuKey] || sku.sku_name} ({sku.sku_no}):
                                                                                                        </span>
                                                                                                        <span className="text-[#4B6284] sm:ml-2 break-all sm:truncate sm:max-w-[calc(100%-120px)]">
                                                                                                            {selectedFiles[skuKey].map((file) => file.name).join(', ')}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                );
                                                                                            }
                                                                                            return null;
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                        {/* Uploaded Files Section */}
                                                                        {orderFiles[orderNo] && orderFiles[orderNo].length > 0 && (
                                                                            <div className="mt-4 text-sm">
                                                                                <h3 className="mb-2 font-semibold text-gray-700">Uploaded Files:</h3>
                                                                                <div className="space-y-2">
                                                                                    {orderFiles[orderNo].map((file) => (
                                                                                        <div key={file.id} className="flex flex-col sm:flex-row sm:items-start w-full gap-1 sm:gap-0">
                                                                                            <span className="font-medium w-full sm:w-[100px] sm:shrink-0 text-gray-700">
                                                                                                {file.sku_name} ({file.sku_no}):
                                                                                            </span>
                                                                                            <span
                                                                                                className="text-[#4B6284] sm:ml-2 break-all sm:truncate sm:max-w-[calc(100%-120px)]"
                                                                                                title={file.file_name}
                                                                                            >
                                                                                                {file.file_name.split('_').pop()}
                                                                                            </span>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderDetails;