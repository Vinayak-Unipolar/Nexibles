'use client';
import React from 'react';
import { useAuth } from '../../utils/authContext';

function MyDetails() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600">
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">My Details</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="font-medium">Name:</strong> {firstName} {lastName}
            </p>
            <p>
              <strong className="font-medium">Email:</strong> {emailAddress || 'Not provided'}
            </p>
            <p>
              <strong className="font-medium">Mobile:</strong> {mobile || 'Not provided'}
            </p>
            <p>
              <strong className="font-medium">Address:</strong> {address || 'Not provided'}
            </p>
            <p>
              <strong className="font-medium">City:</strong> {city || 'Not provided'}
            </p>
            <p>
              <strong className="font-medium">Country:</strong> {country || 'Not provided'}
            </p>
            <p>
              <strong className="font-medium">ZIP Code:</strong> {zip || 'Not provided'}
            </p>
            <p>
              <strong className="font-medium">Date of Birth:</strong> {dateOfBirth || 'Not provided'}
            </p>
            <p>
              <strong className="font-medium">Gender:</strong> {gender || 'Not provided'}
            </p>
            <p>
              <strong className="font-medium">Occupation:</strong> {occupation || 'Not provided'}
            </p>
            <p>
              <strong className="font-medium">Company:</strong> {company || 'Not provided'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyDetails;