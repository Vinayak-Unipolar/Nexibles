'use client';
import React from 'react';

export default function SubscribeBanner() {
  return (
    <section className="mx-auto my-10 px-4  w-full">
      {/* Outer container with gradient background */}
      <div className="bg-gradient-to-r from-[#FDF5EC] to-[#FAF5EB] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        
        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
          Sign Up And Get 10% Off
        </h2>
        
        {/* Subtext */}
        <p className="text-sm md:text-base text-gray-700 mb-6">
          Sign up for early sale access, new in, promotions and more
        </p>
        
        {/* Email Input + Subscribe Button */}
        <div className="max-w-md w-full flex">
          <input
            type="email"
            placeholder="Enter your e-mail"
            className="flex-1 p-3 rounded-l-md border border-r-0 border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="button"
            className="bg-black text-white px-6 py-3 rounded-r-md
                       hover:bg-gray-900 transition-colors"
          >
            SUBSCRIBE
          </button>
        </div>

      </div>
    </section>
  );
}
