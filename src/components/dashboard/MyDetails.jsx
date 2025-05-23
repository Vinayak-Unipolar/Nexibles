'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../utils/authContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Loader from '../comman/Loader';

// Separate Input Component to prevent re-renders
const EditableInput = ({ label, value, field, type = "text", placeholder, onChange, isEditing }) => {
  const inputRef = useRef(null);

  return (
    <div>
      <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">{label}</p>
      {isEditing ? (
        <input
          ref={inputRef}
          type={type}
          value={value || ''}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          className="w-full text-base border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#103b60] focus:border-transparent"
          autoComplete="off"
          onBlur={() => {
            // Store cursor position
            if (inputRef.current) {
              inputRef.current.dataset.cursorPos = inputRef.current.selectionStart;
            }
          }}
          onFocus={() => {
            // Restore cursor position
            if (inputRef.current && inputRef.current.dataset.cursorPos) {
              const pos = parseInt(inputRef.current.dataset.cursorPos);
              setTimeout(() => {
                inputRef.current.setSelectionRange(pos, pos);
              }, 0);
            }
          }}
        />
      ) : (
        <p className="text-base font-medium border-b border-gray-100 pb-2">
          {value || 'Not provided'}
        </p>
      )}
    </div>
  );
};

// Separate Select Component
const EditableSelect = ({ label, value, field, options, onChange, isEditing }) => {
  return (
    <div>
      <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">{label}</p>
      {isEditing ? (
        <select
          value={value || ''}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-full text-base border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#103b60] focus:border-transparent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-base border-b border-gray-100 pb-2">{value || 'Not provided'}</p>
      )}
    </div>
  );
};

function MyDetails() {
  const { user } = useAuth();
  const router = useRouter();
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);

  // Stable reference for input change handler
  const handleInputChangeRef = useRef((field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  });

  // Fetch customer data when component mounts
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!user?.result?.customerId) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://nexiblesapp.barecms.com/api/customer/${user.result.customerId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }

        const result = await response.json();
        if (result.status === 'success') {
          setCustomerData(result.data);
          setEditData(result.data);
          console.log(result.data.firstName);
        } else {
          throw new Error('API response was not successful');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [user?.result?.customerId]);

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      setEditData(customerData);
    }
    setIsEditing(!isEditing);
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      setSaveLoading(true);

      const response = await fetch(
        `https://nexiblesapp.barecms.com/api/customer/${user.result.customerId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editData)
        }
      );

      const result = await response.json();
      if (response.ok) {
        setCustomerData(editData);
        setIsEditing(false);
        toast.success('Details updated successfully!');
      } else {
        throw new Error('API response was not successful');
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update details. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-10 bg-white rounded-2xl shadow-xl text-center max-w-md w-full mx-4 relative overflow-hidden border border-gray-100">
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full -ml-16 -mt-16 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full -mr-16 -mb-16 opacity-50"></div>
          <div className="relative">
            <div className="w-16 h-1 bg-[#103b60] mx-auto mb-6 rounded-full"></div>
            <div className="text-2xl font-semibold text-gray-800 mb-2">
              Authentication Required
            </div>
            <div className="text-xl font-medium text-gray-600 mb-6">
              Please log in to view your details.
            </div>
            <div className="p-4 rounded-xl text-sm text-gray-500 border border-gray-100">
              Your personal information is only visible after authentication.
            </div>
            <button
              onClick={() => router.push('/login')}
              className="mt-8 px-6 py-3 bg-[#103b60] text-white font-medium rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 w-full"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <Loader />
    );
  }

  const displayData = isEditing ? editData : customerData || {};
  const {
    firstName = '',
    lastName = '',
    emailAddress = '',
    mobile = '',
    address = '',
    city = '',
    country = '',
    zip = '',
    dateOfBirth = '',
    gender = '',
    occupation = '',
    company = '',
  } = displayData;

  // Gender options
  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'Prefer not to say', label: 'Prefer not to say' }
  ];

  return (
    <div className="flex mt-16 md:mt-6">
      <div className="w-full bg-white overflow-hidden">
        <div className="relative p-8 border-b border-gray-100">
          <div className="absolute top-0 left-0 w-full h-16 opacity-80"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">My Details</h2>
              <p className="mt-2 text-sm text-gray-500">Personal information and contact details</p>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-2 text-sm font-medium text-gray-700 transition duration-300 bg-gray-200 rounded-full hover:bg-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    disabled={saveLoading}
                    className="px-6 py-2 text-sm font-medium text-white transition duration-300 bg-green-600 rounded-full hover:bg-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saveLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="px-6 py-2 text-sm font-medium text-white transition duration-300 bg-[#103b60] rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full -ml-12 -mb-12 opacity-30"></div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full -mr-8 -mt-8 opacity-30"></div>
                <h3 className="text-lg font-semibold text-[#103b60] mb-6 flex items-center">
                  <div className="w-1 h-6 bg-[#103b60] mr-3 rounded-full"></div>
                  Personal
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <EditableInput
                      label="First Name"
                      value={firstName}
                      field="firstName"
                      onChange={handleInputChangeRef.current}
                      isEditing={isEditing}
                    />
                    <EditableInput
                      label="Last Name"
                      value={lastName}
                      field="lastName"
                      onChange={handleInputChangeRef.current}
                      isEditing={isEditing}
                    />
                  </div>
                  <EditableInput
                    label="Date of Birth"
                    value={dateOfBirth}
                    field="dateOfBirth"
                    type="date"
                    onChange={handleInputChangeRef.current}
                    isEditing={isEditing}
                  />
                  <EditableSelect
                    label="Gender"
                    value={gender}
                    field="gender"
                    options={genderOptions}
                    onChange={handleInputChangeRef.current}
                    isEditing={isEditing}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 rounded-full -ml-8 -mt-8 opacity-30"></div>
                <h3 className="text-lg font-semibold text-[#103b60] mb-6 flex items-center">
                  <div className="w-1 h-6 bg-[#103b60] mr-3 rounded-full"></div>
                  Contact
                </h3>
                <div className="space-y-6">
                  <EditableInput
                    label="Email"
                    value={emailAddress}
                    field="emailAddress"
                    type="email"
                    onChange={handleInputChangeRef.current}
                    isEditing={isEditing}
                  />
                  <EditableInput
                    label="Mobile"
                    value={mobile}
                    field="mobile"
                    type="tel"
                    onChange={handleInputChangeRef.current}
                    isEditing={isEditing}
                  />
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