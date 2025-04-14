import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft, FiDownload } from "react-icons/fi";
import { useAuth } from '@/utils/authContext';
import { toast } from 'react-toastify';
import { MdOutlineFileUpload } from "react-icons/md";

const MyOrderHistory = () => {
    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();
    const [keylineDownloaded, setKeylineDownloaded] = useState({});
    const [uploadingOrder, setUploadingOrder] = useState(null);
    const customerId = user?.result?.customerId;
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [orderFiles, setOrderFiles] = useState({});
    const [skuNames, setSkuNames] = useState({}); // State for SKU names
    const [skuUploads, setSkuUploads] = useState({}); // Track uploaded SKUs per order

    const hasOrderFiles = (orderNo) => {
        return orderFiles[orderNo]?.length > 0;
    };

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                if (!user) return;
                let customerID = user?.result?.customerId || user?.customerId;
                const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
                const response = await fetch(`${APIURL}/api/getorderdetails/${customerID}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'API-Key': `irrv211vui9kuwn11efsb4xd4zdkuq`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch order history');
                }
                const data = await response.json();

                const filteredOrders = data.orderDetails.filter(order => order.origin === "Nexibles");
                const sortedOrders = filteredOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(sortedOrders);

                const downloadedState = {};
                filteredOrders.forEach(order => {
                    downloadedState[order.orderNo] = localStorage.getItem(`keylineDownloaded_${order.orderNo}`) === 'true';
                });
                setKeylineDownloaded(downloadedState);
            } catch (error) {
                console.error('Error fetching order history:', error);
                toast.error('Failed to fetch order history. Please try again.');
            }
        };

        const fetchOrderFiles = async () => {
            try {
                if (!customerId) return;
                const token = localStorage.getItem('token');
                const response = await fetch(`${APIURL}/api/orderFile/byCustomer/${customerId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'API-Key': 'irrv211vui9kuwn11efsb4xd4zdkuq'
                    }
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

                    // Initialize skuUploads based on existing files
                    const initialSkuUploads = {};
                    Object.keys(filesByOrder).forEach(orderNo => {
                        initialSkuUploads[orderNo] = {};
                        filesByOrder[orderNo].forEach(file => {
                            initialSkuUploads[orderNo][file.sku_no] = true;
                        });
                    });
                    setSkuUploads(initialSkuUploads);
                }
            } catch (error) {
                console.error('Error fetching order files:', error);
            }
        };

        fetchOrderHistory();
        fetchOrderFiles();
    }, [user, customerId]);

    const handleKeylineDownload = async (orderNo, productId) => {
        try {
            const response = await fetch(`${APIURL}/api/product/${productId}`, {
                headers: {
                    'API-Key': 'irrv211vui9kuwn11efsb4xd4zdkuq',
                }
            });
            const result = await response.json();

            if (result.status === 'success' && result.data.keylineimage) {
                const pdfUrl = `${APIURL}/uploads/${result.data.keylineimage}`;
                window.open(pdfUrl, '_blank');
                localStorage.setItem(`keylineDownloaded_${orderNo}`, 'true');
                setKeylineDownloaded(prev => ({ ...prev, [orderNo]: true }));
            } else {
                throw new Error('Keyline image not found.');
            }
        } catch (error) {
            console.error("Error opening keyline PDF:", error);
            toast.error("Failed to open keyline PDF. Please try again later.");
        }
    };

    const sanitizeFileName = (name) => {
        return name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9.-]/g, '');
    };

    const handleDesignUpload = async (orderNo, skuNo, event) => {
        const files = event.target.files;
        const customSkuName = skuNames[`${orderNo}_${skuNo}`] || `SKU Name ${skuNo.split('SKU')[1]}`;
        if (!files || files.length === 0) return;

        if (skuUploads[orderNo]?.[skuNo]) {
            toast.error('A design is already uploaded for this SKU. Remove it before uploading a new one.');
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
                        'Authorization': `Bearer ${token}`,
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
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        customer_id: customerId,
                        oder_id: orderNo,
                        side: skuNo,
                        file_name: fileName,
                        sku_no: skuNo,
                        sku_name: customSkuName
                    })
                });

                if (!fileDetailsResponse.ok) {
                    throw new Error('Failed to save file details');
                }

                const fileDetailsResult = await fileDetailsResponse.json();

                if (fileDetailsResult.status === 'success') {
                    const updatedFilesResponse = await fetch(`${APIURL}/api/orderFile/byCustomer/${customerId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const updatedFilesResult = await updatedFilesResponse.json();
                    if (updatedFilesResult.status === 'success') {
                        const filesByOrder = updatedFilesResult.data.reduce((acc, file) => {
                            const orderId = file.oder_id;
                            if (!acc[orderId]) {
                                acc[orderId] = [];
                            }
                            acc[orderId].push(file);
                            return acc;
                        }, {});
                        setOrderFiles(filesByOrder);
                        setSkuUploads(prev => ({
                            ...prev,
                            [orderNo]: { ...prev[orderNo], [skuNo]: true }
                        }));
                    }

                    toast.success('Design uploaded and saved successfully!');
                    window.location.reload();
                } else {
                    throw new Error(fileDetailsResult.message || 'Failed to save file details');
                }
            }
        } catch (error) {
            console.error('Error in upload process:', error);
            toast.error(error.message || 'Failed to upload design. Please try again.');
        } finally {
            setUploadingOrder(null);
        }
    };

    const handleSkuNameChange = (orderNo, skuNo, value) => {
        setSkuNames(prev => ({
            ...prev,
            [`${orderNo}_${skuNo}`]: value
        }));
    };

    const groupOrdersByOrderNo = () => {
        const groupedOrders = {};
        orders.forEach(order => {
            if (!groupedOrders[order.orderNo]) {
                groupedOrders[order.orderNo] = [order];
            } else {
                groupedOrders[order.orderNo].push(order);
            }
        });
        return groupedOrders;
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const generateSkuData = (skuCount) => {
        const skus = [];
        for (let i = 1; i <= skuCount; i++) {
            skus.push({
                sku_no: `SKU${i}`,
                sku_name: `SKU Name ${i}`
            });
        }
        return skus;
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="space-y-6 md:mt-16">
                    {orders.length === 0 ? (
                        <p className="text-gray-900">No orders found.</p>
                    ) : (
                        Object.entries(groupOrdersByOrderNo()).map(([orderNo, orderGroup]) => (
                            <div key={orderNo} className="bg-white rounded-lg shadow-lg border border-gray-200">
                                <div className="p-4 sm:p-6">
                                    <h2 className="font-bold text-lg sm:text-xl mb-4">Order #{orderNo}</h2>

                                    {orderGroup.map(order => {
                                        const displayPrice = order.discountedPrice ? parseFloat(order.discountedPrice) : order.price;
                                        const hasDiscount = order.discountAmount && parseFloat(order.discountAmount) > 0;
                                        const skus = generateSkuData(order.skuCount);

                                        return (
                                            <div key={order.id} className="flex flex-col lg:flex-row gap-6 py-4 border-t first:border-t-0">
                                                <div className="w-full lg:w-80 flex-shrink-0">
                                                    <img
                                                        src={`${CDN_URL}/${order.image}`}
                                                        alt={order.product_name}
                                                        className="w-full h-64 lg:h-80 object-contain rounded-md"
                                                    />
                                                </div>

                                                <div className="flex-grow space-y-4">
                                                    <h3 className="font-bold text-xl text-gray-900">{order.product_name}</h3>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                                        <p><span className="font-semibold">Order Date:</span> {formatDate(order.orderDate)}</p>
                                                        <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
                                                        <p><span className="font-semibold">Sku Count:</span> {order.skuCount}</p>
                                                        <p><span className="font-semibold">Material:</span> {order.material}</p>

                                                        {hasDiscount ? (
                                                            <>
                                                                <p><span className="font-semibold">Original Price:</span> ₹{order.price}</p>
                                                                <p><span className="font-semibold">Discount:</span> {order.discountPercentage}% (₹{order.discountAmount})</p>
                                                                <p className="text-green-600"><span className="font-semibold">Discounted Price:</span> ₹{displayPrice}</p>
                                                            </>
                                                        ) : (
                                                            <p><span className="font-semibold">Total Price:</span> ₹{displayPrice}</p>
                                                        )}

                                                        {order.product_config_id && (
                                                            <p><span className="font-semibold">Product Options:</span> {order.product_config_id} : {order.product_option_id}</p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-4 pt-4">
                                                        <button
                                                            className="inline-flex items-center px-4 py-2 bg-[#30384E] text-white rounded-md hover:bg-[#252b3d] transition-colors text-sm"
                                                            onClick={() => handleKeylineDownload(orderNo, order.product_id)}
                                                        >
                                                            <FiDownload className="mr-2" size={16} />
                                                            Keyline
                                                        </button>

                                                        {(keylineDownloaded[orderNo] || hasOrderFiles(orderNo)) && (
                                                            <div className="space-y-4">
                                                                <div className="flex flex-col gap-3">
                                                                    {skus.map((sku, index) => {
                                                                        const isUploaded = skuUploads[orderNo]?.[sku.sku_no] || false;
                                                                        return (
                                                                            <div key={sku.sku_no} className="flex items-center gap-3">
                                                                                <input
                                                                                    type="text"
                                                                                    value={skuNames[`${orderNo}_${sku.sku_no}`] }
                                                                                    onChange={(e) => handleSkuNameChange(orderNo, sku.sku_no, e.target.value)}
                                                                                    className="border border-gray-300 rounded-md px-2 py-1 w-40"
                                                                                    placeholder="Enter SKU Name"
                                                                                />
                                                                                <label
                                                                                    htmlFor={`upload_${orderNo}_${sku.sku_no}`}
                                                                                    className={`inline-flex items-center justify-center px-4 py-2 bg-[#30384E] text-white rounded-md hover:bg-[#252b3d] transition-colors text-sm cursor-pointer
                                                                                        ${uploadingOrder === `${orderNo}_${sku.sku_no}` || isUploaded ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                                >
                                                                                    <MdOutlineFileUpload className="mr-2" size={16} />
                                                                                    {uploadingOrder === `${orderNo}_${sku.sku_no}` ? 'Uploading...' : `Upload for ${sku.sku_no}`}
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
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>

                                                                {orderFiles[orderNo] && orderFiles[orderNo].length > 0 && (
                                                                    <div className="mt-4 text-sm">
                                                                        <h3 className="font-semibold mb-2">Uploaded Files:</h3>
                                                                        <div className="space-y-2">
                                                                            {orderFiles[orderNo].map((file) => (
                                                                                <div
                                                                                    key={file.id}
                                                                                    className="flex items-start w-full"
                                                                                >
                                                                                    <span className="font-medium w-[100px] shrink-0">
                                                                                        {file.sku_name} ({file.sku_no}):
                                                                                    </span>
                                                                                    <span className="text-[#4B6284] ml-2 truncate max-w-[calc(100%-120px)]" title={file.file_name}>
                                                                                        {file.file_name.split('_').pop()}
                                                                                    </span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        {!keylineDownloaded[orderNo] && !hasOrderFiles(orderNo) && (
                                                            <p className="text-gray-600 text-sm italic">
                                                                Download the keyline to upload the design
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrderHistory;