"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MyAccount from "@/components/dashboard/MyAccount";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import { useAuth } from "@/utils/authContext";
import { toast } from "react-toastify";
import { Link } from "next/link";
import { NavLink } from "react-router-dom";
// ConfigurationHistory component to fetch and display configuration data
const ConfigurationHistory = ({ customerID }) => {
  const [configurations, setConfigurations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfigurations = async (retries = 3, delay = 1000) => {
      if (!customerID) {
        console.error("Customer ID is not available.");
        setError("Customer ID is not available. Please log in again.");
        setLoading(false);
        return;
      }

      console.log("Fetching configurations for customer ID:", customerID);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authentication token is missing.");
        setError("Authentication token is missing. Please log in again.");
        setLoading(false);
        return;
      }

      for (let i = 0; i < retries; i++) {
        try {
          setLoading(true);
          console.log(`Attempt ${i + 1}/${retries} to fetch configurations...`);

          const response = await fetch(
            `https://nexiblesapp.barecms.com/api/configuration/${customerID}`,
            {
              method: "GET",
              headers: {
                "API-Key": "irrv211vui9kuwn11efsb4xd4zdkuq",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            }
          );

          console.log("Response status:", response.status);

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage =
              errorData.message || `Failed to fetch configurations: ${response.status}`;
            throw new Error(errorMessage);
          }

          const data = await response.json();
          console.log("API response data:", data);

          if (data.status === 200 && Array.isArray(data.data)) {
            const parsedData = data.data.map((config) => ({
              ...config,
              skus: JSON.parse(config.skus),
              additional_options: JSON.parse(config.additional_options),
            }));
            setConfigurations(parsedData);
            setLoading(false);
            return;
          } else {
            throw new Error("No configurations found or invalid response format");
          }
        } catch (err) {
          console.error(`Attempt ${i + 1} failed:`, err.message);
          if (i === retries - 1) {
            setError(err.message || "Failed to fetch configurations");
            //toast.error("Failed to load configurations");
          } else {
            console.warn(`Retrying fetch (${i + 1}/${retries})...`);
            await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
          }
        } finally {
          if (i === retries - 1) {
            setLoading(false);
          }
        }
      }
    };

    fetchConfigurations();
  }, [customerID]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#103b60]"></div>
          <p className="text-gray-600 font-medium">Loading your configurations...</p>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="max-w-4xl mx-auto px-4 py-8">
  //       <div className="bg-white p-6">
  //         <h2 className="text-3xl font-bold text-gray-900 mb-6">Configuration History</h2>
  //         <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
  //           <div className="flex items-center">
  //             <div className="flex-shrink-0">
  //               <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  //               </svg>
  //             </div>
  //             <div className="ml-3">
  //               <h3 className="text-lg font-medium text-red-800">Error Loading Configurations</h3>
  //               <p className="text-red-700 mt-1">{error}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (configurations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Configuration History</h2>
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Configurations Found</h3>
            <p className="text-gray-600 mb-6">You haven't created any configurations yet. Start by creating a configuration to see your history here.</p>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white  p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Configuration History</h2>
          <div className="bg-[#103b60] text-white px-4 py-2 rounded-full text-sm font-medium">
            {configurations.length} {configurations.length === 1 ? 'Configuration' : 'Configurations'}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {configurations.map((config) => (
            <div
              key={config.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Header */}
              <div className=" px-6 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-[#103b60] rounded-full flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{config.project_name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(config.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</p>
                      <p className="text-sm text-gray-900 break-all">{config.email || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Category</p>
                      <p className="text-sm text-gray-900">{config.category || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Material</p>
                      <p className="text-sm text-gray-900">{config.material || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Dimensions</p>
                      <p className="text-sm text-gray-900">{`${config.width} x ${config.length} mm`}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">SKUs</p>
                      <p className="text-sm text-gray-900">
                        {config.skus.map(sku => `${sku.design_name} (${sku.quantity})`).join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Additional Options</p>
                      <p className="text-sm text-gray-900">
                        {Object.entries(config.additional_options)
                          .filter(([_, value]) => value)
                          .map(([key]) => key.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()))
                          .join(", ") || "None"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Quantity</p>
                      <p className="text-sm text-gray-900">{config.total_quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 6c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Cost</p>
                      <p className="text-sm text-gray-900">₹{config.total_cost.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ConfigurationPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md w-full">
            <div className="mx-auto h-20 w-20 text-gray-300 mb-6">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-8 text-base leading-relaxed">
              Please login to access your configuration history and manage your account.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-[#103b60] text-white px-8 py-3 rounded-xl text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#0d2d4a] transform hover:-translate-y-0.5"
            >
              Login to Continue
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Assuming customerID is available in user object; adjust based on actual structure
  const customerID = user?.result?.customerId; // Fallback to CUST12345 if not available

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-8">
            <div className="lg:w-80 lg:flex-shrink-0 mb-8 lg:mb-0">
              <div className="bg-white sticky top-12">
                <MyAccount />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <ConfigurationHistory customerID={customerID} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfigurationPage;