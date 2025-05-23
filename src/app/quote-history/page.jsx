"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MyAccount from "@/components/dashboard/MyAccount";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import { useAuth } from "@/utils/authContext";
import { toast } from "react-toastify";

// Enhanced RequestQuoteHistory component with modified design
const RequestQuoteHistory = ({ email }) => {
  const [quoteHistory, setQuoteHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuoteHistory = async (retries = 3, delay = 1000) => {
      const userEmail = user?.result?.emailAddress;
      if (!userEmail) {
        console.error("User email is not available.");
        setError("User email is not available. Please log in again.");
        setLoading(false);
        return;
      }

      console.log("Fetching quote history for email:", userEmail);

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
          console.log(`Attempt ${i + 1}/${retries} to fetch quote history...`);

          const response = await fetch(
            `https://nexiblesapp.barecms.com/api/leads/email?email=${encodeURIComponent(userEmail)}`,
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
              errorData.message || `Failed to fetch quote history: ${response.status}`;
            throw new Error(errorMessage);
          }

          const data = await response.json();
          console.log("API response data:", data);

          if (data.status === "success" && Array.isArray(data.data)) {
            setQuoteHistory(data.data);
            setLoading(false);
            return;
          } else {
            throw new Error("No quote history found or invalid response format");
          }
        } catch (err) {
          console.error(`Attempt ${i + 1} failed:`, err.message);
          if (i === retries - 1) {
            setError(err.message || "Failed to fetch quote history");
            toast.error("Failed to load quote history");
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

    fetchQuoteHistory();
  }, [email, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#103b60]"></div>
          <p className="text-gray-600 font-medium">Loading your quote history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Request Quote History</h2>
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">Error Loading Quote History</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quoteHistory.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Request Quote History</h2>
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Quote Requests Found</h3>
            <p className="text-gray-600 mb-6">You have not requested any quotes yet. Start by requesting a quote to see your history here.</p>
            <button className="bg-[#103b60] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d2d4a] transition-colors duration-200">
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white  p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Request Quote History</h2>
          <div className="bg-[#103b60] text-white px-4 py-2 rounded-full text-sm font-medium">
            {quoteHistory.length} {quoteHistory.length === 1 ? 'Quote' : 'Quotes'}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {quoteHistory.map((quote) => (
            <div
              key={quote.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-[#103b60] rounded-full flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Quote Request</p>
                    <p className="text-xs text-gray-500">
                      {new Date(quote.created_at).toLocaleDateString('en-US', {
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
                      <p className="text-sm text-gray-900 break-all">{quote.email || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Product</p>
                      <p className="text-sm text-gray-900">{quote.category || quote.city || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Company</p>
                      <p className="text-sm text-gray-900">{quote.company_name || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Industry</p>
                      <p className="text-sm text-gray-900">{quote.industry_sector || "N/A"}</p>
                    </div>
                  </div>

                  {quote.additional_comments && (
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Comments</p>
                        <p className="text-sm text-gray-900 line-clamp-3">{quote.additional_comments}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-2 border-t border-gray-200">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">
                    Source: {quote.enquiry_source || "Direct"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const QuoteHistoryPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
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
              Please login to access your quote request history and manage your account.
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

  return (
    <div>
      <Navbar />
      <div className="bg-white md:mt-16 md:flex containers">
        <div className="w-full md:w-1/3">
          <MyAccount />
        </div>
        <div className="w-full md:w-full">
          <RequestQuoteHistory email={user.email} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuoteHistoryPage;