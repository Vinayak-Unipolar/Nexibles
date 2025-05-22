'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function SubscribeBanner() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const token = 'irrv211vui9kuwn11efsb4xd4zdkuq';

  const handleSubscribe = async (e) => {
  e.preventDefault();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast.error('Please enter a valid email.');
    return;
  }

  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;
    const createdAt = new Date().toISOString().slice(0, 19);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': token,
      },
      body: JSON.stringify({
        email,
        origin: 'Nexibles',
        ip_address: ipAddress,
        created_at: createdAt,
      }),
    });

    if (response.ok) {
      setMessage('Successfully subscribed!');
      toast.success('Successfully subscribed!');
      setEmail('');
    } else {
      const errorData = await response.json();
      setMessage(errorData.msg || 'Subscription failed. Please try again.');
      toast.error(errorData.msg || 'Subscription failed. Please try again.');
    }
  } catch (error) {
    setMessage('An error occurred. Please try again later.');
    toast.error('An error occurred. Please try again later.');
  }
};

  return (
    <section className="mx-auto  m-4 px-4 w-full ">
      <div className="bg-gradient-to-r from-[#2aace2] to-[#fcee21] rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
          Sign Up And Get Your Pouches Ready
        </h2>
        <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6 max-w-lg">
          Sign up for early sale access, new in, promotions and more
        </p>
        <div className="w-full max-w-md flex flex-col sm:flex-row gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 rounded-md sm:rounded-l-md sm:rounded-r-none border border-gray-300 focus:outline-none text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={handleSubscribe}
            className="bg-[#103b60] text-white px-4 py-3 rounded-md sm:rounded-l-none sm:rounded-r-md transition-colors text-sm sm:text-base"
          >
            SUBSCRIBE
          </button>
        </div>
        {message && (
          <p className="mt-4 text-sm text-gray-700">{message}</p>
        )}
        
      </div>
    </section>
  );
}