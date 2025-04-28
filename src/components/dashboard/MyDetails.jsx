'use client';
import React from 'react';
import { useAuth } from '../../utils/authContext';
import { useRouter } from 'next/navigation';

function MyDetails() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-base font-medium text-gray-600">
          Please log in to view your details.
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

  const handleEdit = () => {
    router.push('/edit-details');
  };

  return (
    <div className="flex mt-6">
      <div className="w-full p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">My Details</h2>
          <button
            onClick={handleEdit}
            className="px-3 py-1 text-sm text-white transition duration-200 bg-[#103b60] rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="flex flex-col">
              <span className="font-medium">Name:</span>
              <span>{firstName} {lastName}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-medium">Email:</span>
              <span>{emailAddress || 'Not provided'}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-medium">Mobile:</span>
              <span>{mobile || 'Not provided'}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-medium">Address:</span>
              <span>{address || 'Not provided'}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-medium">Gender:</span>
              <span>{gender || 'Not provided'}</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex flex-col">
              <span className="font-medium">City:</span>
              <span>{city || 'Not provided'}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-medium">Country:</span>
              <span>{country || 'Not provided'}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-medium">ZIP Code:</span>
              <span>{zip || 'Not provided'}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-medium">Date of Birth:</span>
              <span>{dateOfBirth || 'Not provided'}</span>
            </p>

            <p className="flex flex-col">
              <span className="font-medium">Occupation:</span>
              <span>{occupation || 'Not provided'}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-medium">Company:</span>
              <span>{company || 'Not provided'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDetails;