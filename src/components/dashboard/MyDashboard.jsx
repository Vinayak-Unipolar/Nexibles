'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/authContext';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight, Package, RefreshCcw, User, Lock, Book, CreditCard, MessageSquare, Users, Gift, HelpCircle, Search } from 'lucide-react';
import Image from 'next/image';

const MyDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status and redirect if not logged in
  useEffect(() => {
    if (user === null) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  // Show loading state while checking auth
  if (isLoading || user === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const firstName = user?.result?.firstName || user?.firstName || "User";
  const lastName = user?.result?.lastName || user?.lastName || "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const dummyOrders = [
    {
      status: "IT'S ORDERED!",
      estimatedDelivery: "Saturday 9th September 2023",
      image: "https://nexiblesapp.barecms.com/uploads/80x150+50+50%20CSSG.webp",
      orderNumber: "862682274",
      orderDate: "06 Sep, 2023",
      canCancel: true
    },
    {
      status: "IT'S DELIVERED!",
      deliveryDate: "Saturday 28th November 2020",
      image: "https://nexiblesapp.barecms.com/uploads/80x150+50+50%20CSSG.webp",
      orderNumber: "562358358",
      shippedDate: "27 Nov, 2020",
      delivered: true
    }
  ];

  const navItems = [
    { icon: <User size={20} />, label: "Account overview" },
    { icon: <ShoppingBag size={20} />, label: "My orders", active: true },
    { icon: <User size={20} />, label: "My details" },
    { icon: <Lock size={20} />, label: "Change password" },
    { icon: <Book size={20} />, label: "Address book" },
    { icon: <CreditCard size={20} />, label: "Payment methods" },
    { icon: <MessageSquare size={20} />, label: "Contact preferences" },
    { icon: <Users size={20} />, label: "Social accounts" },
    { icon: <Gift size={20} />, label: "Gift cards & vouchers" },
    { icon: <HelpCircle size={20} />, label: "Need help?" },
    { icon: <Search size={20} />, label: "Where's my order?" },
    { icon: <RefreshCcw size={20} />, label: "How do I make a return?" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6 px-4">
        <div className="text-xl font-bold mb-6">MY ACCOUNT</div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white p-6 mb-4">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-white text-xl font-bold mr-4">
                  {initials}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Hi,</div>
                  <div className="font-semibold">{firstName} {lastName}</div>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div>
                {navItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center py-3 ${item.active ? 'border-l-4 border-blue-600 -ml-6 pl-5' : ''}`}
                  >
                    <span className="mr-3 text-gray-600">{item.icon}</span>
                    <span className={`${item.active ? 'font-semibold' : ''}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white p-6 mb-6">
              <div className="flex items-center mb-4">
                <ShoppingBag size={24} className="mr-3" />
                <h2 className="text-xl font-bold">MY ORDERS</h2>
              </div>
              <div className="text-sm text-gray-500 mb-6">Displaying 1 of 7 orders</div>
              
              {/* Orders list */}
              {dummyOrders.map((order, idx) => (
                <div key={idx} className="border-t py-6">
                  <div className="mb-2 text-sm text-gray-500">ORDER STATUS:</div>
                  <div className="font-bold text-lg mb-1">{order.status}</div>
                  {order.estimatedDelivery && (
                    <div className="text-green-700 mb-4">Estimated delivery {order.estimatedDelivery}</div>
                  )}
                  {order.deliveryDate && (
                    <div className="text-green-700 mb-4">Delivered {order.deliveryDate}</div>
                  )}
                  
                  {order.delivered && (
                    <div className="w-full bg-green-600 h-2 rounded mb-4"></div>
                  )}
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="flex items-start mb-4 md:mb-0">
                      <img src={order.image} alt="Product" className="w-20 h-20 object-cover mr-4" />
                      <div>
                        <div className="mb-1">
                          <span className="text-sm text-gray-500 mr-2">ORDER NO.:</span>
                          <span>{order.orderNumber}</span>
                        </div>
                        {order.orderDate && (
                          <div>
                            <span className="text-sm text-gray-500 mr-2">ORDER DATE:</span>
                            <span>{order.orderDate}</span>
                          </div>
                        )}
                        {order.shippedDate && (
                          <div>
                            <span className="text-sm text-gray-500 mr-2">SHIPPED DATE:</span>
                            <span>{order.shippedDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      <button className="border border-gray-300 hover:border-gray-400 text-gray-800 font-medium py-2 px-6 w-full md:w-48 text-center">
                        VIEW ORDER
                      </button>
                      {order.canCancel && (
                        <button className="border border-gray-300 hover:border-gray-400 text-gray-800 font-medium py-2 px-6 w-full md:w-48 text-center">
                          CANCEL ORDER
                        </button>
                      )}
                      {order.delivered && (
                        <button className="border border-gray-300 hover:border-gray-400 text-gray-800 font-medium py-2 px-6 w-full md:w-48 text-center">
                          TRACK PARCEL
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;