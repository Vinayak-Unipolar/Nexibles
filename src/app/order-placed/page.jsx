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
  const [emailsSent, setEmailsSent] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      const orderNo = typeof window !== "undefined" ? localStorage.getItem('orderNo') : null;

      if (!orderNo) {
        router.push('/');
        return;
      }

      const response = await fetch(`${APIURL}/api/ordermaster/${orderNo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': token,
        }
      });

      const data = await response.json();

      if (data.status === "success" && data.data) {
        setOrderDetails(data.data);

        // Set address from order data
        const orderData = data.data[0];
        setDefaultAddress({
          data: {
            title: orderData.company || '',
            address: orderData.address || orderData.street || '',
            city: orderData.city || '',
            state: orderData.state || '',
            zip: orderData.zipcode || '',
            country: orderData.country || ''
          }
        });

        // Track purchase and send emails if conditions are met
        if (data.data[0].payment_status === 'COMPLETED' && data.data[0].transaction_id && data.data[0].orderNo) {
          // Track purchase
          if (!purchaseTracked && typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('status') === 'success') {
              const orderTotal = parseFloat(data.data[0].invamt) || 0;
              const productIds = [data.data[0].product_id];
              const eventId = `purchase-${data.data[0].orderNo}`;
              if (typeof fbq !== 'undefined') {
                fbq('track', 'Purchase', {
                  value: orderTotal,
                  currency: 'INR',
                  content_ids: productIds,
                  content_type: 'product',
                  eventID: eventId
                });
              }
              setPurchaseTracked(true);
            }
          }

          // if (!emailsSent) {
          //   try {
          //     const emailResponse = await fetch(`https://nexiblesapp.barecms.com/api/send-order-emails`, {
          //       method: 'POST',
          //       headers: {
          //         'Content-Type': 'application/json',
          //         'API-Key': token,
          //       },
          //       body: JSON.stringify({
          //         orderNo: data.data[0].orderNo,
          //         transactionId: data.data[0].transaction_id
          //       })
          //     });

          //     const emailResult = await emailResponse.json();
          //     if (emailResult.status === 'success') {
          //       console.log('Emails sent successfully');
          //       setEmailsSent(true);
          //     } else {
          //       console.error('Failed to send emails:', emailResult.message);
          //     }
          //   } catch (emailError) {
          //     console.error('Error sending emails:', emailError);
          //   }
          // }
        }

        dispatch(updateCartItems([]));
        dispatch(removeCoupon());
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
    fetchOrderDetails();
  }, []);

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