"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MyAccount from "@/components/dashboard/MyAccount";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import { useAuth } from "@/utils/authContext";
import { toast } from "react-toastify";
 
// Updated RequestQuoteHistory component with API integration
const RequestQuoteHistory = ({ email }) => {
  const [quoteHistory, setQuoteHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
 
  useEffect(() => {
    const fetchQuoteHistory = async (retries = 3, delay = 1000) => {
      // Ensure email is available
      const userEmail = user?.result?.emailAddress; // Fallback email
      if (!userEmail) {
        setError("User email is not available. Please log in again.");
        setLoading(false);
        return;
      }
 
      for (let i = 0; i < retries; i++) {
        try {
          setLoading(true);
 
          // Retrieve the token from localStorage
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Authentication token is missing. Please log in again.");
          }
 
          const response = await fetch(
            `https://nexiblesapp.barecms.com/api/leads/email?email=${userEmail}`,
            {
              method: "GET",
              headers: {
                "API-Key":"irrv211vui9kuwn11efsb4xd4zdkuq",
                "Content-Type": "application/json"
              },
            }
          );
 
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage =
              errorData.message || `Failed to fetch quote history: ${response.status}`;
            throw new Error(errorMessage);
          }
 
          const data = await response.json();
 
          if (data.status === "success") {
            setQuoteHistory(data.data);
            return; // Success, exit retry loop
          } else {
            throw new Error("No quote history found");
          }
        } catch (err) {
          if (i === retries - 1) {
            // Last retry failed
            console.error("Error fetching quote history:", err);
            setError(err.message);
            toast.error("Failed to load quote history");
          } else {
            console.warn(`Retrying fetch (${i + 1}/${retries})...`);
            await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
          }
        } finally {
          if (i === retries - 1 || quoteHistory.length > 0) {
            setLoading(false);
          }
        }
      }
    };
 
    fetchQuoteHistory();
  }, [email, user]);
 
  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#103b60]"></div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Request Quote History</h2>
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          <p>{error}</p>
        </div>
      </div>
    );
  }
 
  if (quoteHistory.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Request Quote History</h2>
        <div className="bg-gray-50 border border-gray-200 text-gray-800 rounded-md p-6 text-center">
          <p className="text-lg">You haven't requested any quotes yet.</p>
        </div>
      </div>
    );
  }
 
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Request Quote History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {quoteHistory.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 whitespace-nowrap">
                  {new Date(quote.created_at).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {quote.category || quote.city || "N/A"}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {quote.industry_sector || "N/A"}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      quote.quote_status
                        ? quote.quote_status.toLowerCase().includes("complete")
                          ? "bg-green-100 text-green-800"
                          : quote.quote_status.toLowerCase().includes("pending")
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {quote.quote_status || "Submitted"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
const QuoteHistoryPage = () => {
  const { user } = useAuth();
  const router = useRouter();
 
  if (!user) {
    return (
      <div className="flex flex-col">
        <Navbar />
        <div className="h-screen flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 text-center max-w-lg w-full">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">
              Please Login to View Your Quote History
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              Login to access your quote request history
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-[#103b60] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Login
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
      <div className="mt-12 containers md:mt-16">
        <div className="md:flex">
          <div className="w-full bg-white md:w-1/3">
            <MyAccount />
          </div>
          <div className="w-full md:w-full">
            <RequestQuoteHistory email={user.email} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
 
export default QuoteHistoryPage;