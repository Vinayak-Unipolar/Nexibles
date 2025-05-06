'use client';
import React from 'react';
import { useAuth } from '../../utils/authContext';
import { useRouter } from 'next/navigation';

function MyDetails() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100">
        <div className="p-10 bg-white rounded-2xl shadow-xl text-center max-w-md w-full mx-4 relative overflow-hidden border border-gray-100">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gray-50 rounded-full -ml-16 -mt-16 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mb-16 opacity-50"></div>
          <div className="relative">
            <div className="w-16 h-1 bg-[#103b60] mx-auto mb-6 rounded-full"></div>
            <div className="text-2xl font-semibold text-gray-800 mb-2">
              Authentication Required
            </div>
            <div className="text-xl font-medium text-gray-600 mb-6">
              Please log in to view your details.
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-500 border border-gray-100">
              Your personal information is only visible after authentication.
            </div>
            <button className="mt-8 px-6 py-3 bg-[#103b60] text-white font-medium rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 w-full">
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    emailAddress,
    mobile,
    address,
    city,
    country,
    zip,
    dateOfBirth,
    gender,
    occupation,
    company,
  } = user.result || {};

  // const handleEdit = () => {
  //   router.push('/edit-details');
  // };

  return (
    <div className="flex mt-16 md:mt-6">
      <div className="w-full bg-white  overflow-hidden">
        {/* Header Section with geometric pattern */}
        <div className="relative p-8 border-b border-gray-100">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-gray-50 to-white opacity-80"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">My Details</h2>
              <p className="mt-2 text-sm text-gray-500">Personal information and contact details</p>
            </div>
            <button className="px-6 py-2 text-sm font-medium text-white transition duration-300 bg-[#103b60] rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
              Edit
            </button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-50 rounded-full -ml-12 -mb-12 opacity-30"></div>
        </div>

        {/* Content Section */}
        <div className="p-8 bg-gradient-to-b from-white to-gray-50">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 rounded-full -mr-8 -mt-8 opacity-30"></div>
                <h3 className="text-lg font-semibold text-[#103b60] mb-6 flex items-center">
                  <div className="w-1 h-6 bg-[#103b60] mr-3 rounded-full"></div>
                  Personal
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">Full Name</p>
                    <p className="text-base font-medium border-b border-gray-100 pb-2">{firstName} {lastName}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">Date of Birth</p>
                    <p className="text-base border-b border-gray-100 pb-2">{dateOfBirth || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">Gender</p>
                    <p className="text-base border-b border-gray-100 pb-2">{gender || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gray-50 rounded-full -ml-10 -mb-10 opacity-30"></div>
                <h3 className="text-lg font-semibold text-[#103b60] mb-6 flex items-center">
                  <div className="w-1 h-6 bg-[#103b60] mr-3 rounded-full"></div>
                  Professional
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">Occupation</p>
                    <p className="text-base border-b border-gray-100 pb-2">{occupation || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">Company</p>
                    <p className="text-base border-b border-gray-100 pb-2">{company || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 bg-gray-50 rounded-full -ml-8 -mt-8 opacity-30"></div>
                <h3 className="text-lg font-semibold text-[#103b60] mb-6 flex items-center">
                  <div className="w-1 h-6 bg-[#103b60] mr-3 rounded-full"></div>
                  Contact
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">Email</p>
                    <p className="text-base break-all border-b border-gray-100 pb-2">{emailAddress || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">Mobile</p>
                    <p className="text-base border-b border-gray-100 pb-2">{mobile || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gray-50 rounded-full -mr-10 -mb-10 opacity-30"></div>
                <h3 className="text-lg font-semibold text-[#103b60] mb-6 flex items-center">
                  <div className="w-1 h-6 bg-[#103b60] mr-3 rounded-full"></div>
                  Location
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">Address</p>
                    <p className="text-base border-b border-gray-100 pb-2">{address || 'Not provided'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">City</p>
                      <p className="text-base border-b border-gray-100 pb-2">{city || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">ZIP Code</p>
                      <p className="text-base border-b border-gray-100 pb-2">{zip || 'Not provided'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">Country</p>
                    <p className="text-base border-b border-gray-100 pb-2">{country || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDetails;