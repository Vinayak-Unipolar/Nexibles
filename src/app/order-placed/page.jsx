'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { updateCartItems, removeCoupon } from '../../redux/store/cartSlice';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import OrderPlaced from '@/components/shipping/OrderPlaced';
import { useAuth } from '@/utils/authContext';
import { useRouter } from 'next/navigation';
import SearchParamsHandler from '../../components/Search';
const Orderplaced = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
const [purchaseTracked, setPurchaseTracked] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      if (!user) return;

      const customerId = user?.result?.customerId || user?.customerId;
      const authToken = typeof window !== "undefined" ? localStorage.getItem('token') : null;
      const orderNo = typeof window !== "undefined" ? localStorage.getItem('orderNo') : null;

      if (!orderNo) {
        router.push('/');
        return;
      }

      const response = await fetch(`${APIURL}/api/getorderdetails/${customerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      const data = await response.json();

      if (data.status === "success") {
        const relevantOrder = data.orderDetails.filter(order => order.orderNo === orderNo);

        if (relevantOrder.length > 0) {
          setOrderDetails(relevantOrder);

          if (!purchaseTracked && searchParams.get('status') === 'success') {
            const orderTotal = parseFloat(relevantOrder[0].invamt) || 0;
            const productIds = [relevantOrder[0].product_id];
            const eventId = `purchase-${relevantOrder[0].orderNo}`;
            fbq('track', 'Purchase', {
              value: orderTotal,
              currency: 'INR',
              content_ids: productIds,
              content_type: 'product',
              eventID: eventId
            });
            setPurchaseTracked(true);
          }

          dispatch(updateCartItems([]));
          dispatch(removeCoupon());
        }
      } else {
        console.error("Failed to fetch order details:", data.message);
        router.push('/');
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      router.push('/');
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrderDetails();
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;
        let id = user?.result?.customerId || user?.customerId;
        const response = await fetch(`${APIURL}/api/customerAddress/default/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDefaultAddress(data);
      } catch (error) {
        console.error("Error fetching Data", error);
      }
    }
    fetchData();
  }, [user]);

  if (orderDetails.length === 0) {
    return (
      <div>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchParamsHandler />
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              Loading order details...
            </div>
          </div>
        </Suspense>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsHandler />
        <OrderPlaced
          productDetails={orderDetails}
          defaultAddress={defaultAddress}
          transactionId={orderDetails[0]?.transaction_id}
        />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Orderplaced;