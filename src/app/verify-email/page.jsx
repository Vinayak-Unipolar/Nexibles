"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Link from "next/link";

function VerifyEmail() {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    console.log("useEffect triggered with token:", token, "APIURL:", APIURL);

    if (!token) {
      setError("Invalid or missing verification token.");
      setLoading(false);
      toast.error("Invalid or missing verification token.", { toastId: "verify-error" });
      return;
    }

    if (success) return; // Skip if already verified

    let isMounted = true;

    const verifyEmail = async () => {
      setError(null);
      setSuccess(false);

      try {
        const response = await fetch(`${APIURL}/api/login/verify-email?token=${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("Non-JSON response:", text, "Status:", response.status);
          throw new Error("Server returned an unexpected response. Please try again later.");
        }

        const data = await response.json();
        console.log("Verification response:", data, "Status:", response.status);

        if (isMounted) {
          if (response.ok && data.status === "success") {
            setSuccess(true);
            toast.success("Email verified successfully! You can now log in.", {
              toastId: "verify-success",
            });
          } else {
            throw new Error(data.message || "Failed to verify email.");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Verification error:", err.message);
          setError(err.message || "An error occurred during verification.");
          toast.error(err.message || "An error occurred during verification.", {
            toastId: "verify-error",
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    verifyEmail();

    return () => {
      isMounted = false;
    };
  }, [token, APIURL, success]);

  // Redirect to login page after successful verification
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000); // Redirect after 3 seconds to allow user to see success message
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <motion.div
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md md:p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-900 md:text-3xl">
          Email Verification
        </h2>

        {loading && (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-t-4 border-[#103b60] border-solid rounded-full animate-spin"></div>
            <p className="ml-2 text-sm text-gray-600 md:text-base">
              Verifying your email, please wait...
            </p>
          </div>
        )}

        {!loading && success && (
          <div className="text-center">
            <p className="mb-6 text-sm text-green-600 md:text-base">
              Your email has been successfully verified! You can now log in to your account.
            </p>
            <Link href="/login" prefetch={false}>
              <button className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#103b60] rounded-lg md:text-base hover:bg-[#0d2e4d] focus:outline-none focus:ring-2 focus:ring-[#103b60] focus:ring-opacity-50">
                Go to Login
              </button>
            </Link>
          </div>
        )}

        {!loading && !success && error && (
          <div className="text-center">
            <p className="mb-6 text-sm text-red-600 md:text-base">{error}</p>
            <Link href="/login" prefetch={false}>
              <button className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#103b60] rounded-lg md:text-base hover:bg-[#0d2e4d] focus:outline-none focus:ring-2 focus:ring-[#103b60] focus:ring-opacity-50">
                Back to Login
              </button>
            </Link>
          </div>
        )}

        <div className="mt-6 text-xs text-center text-gray-500">
          <p>
            Need help? Contact our{" "}
            <Link href="/contact-us" legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4F1E9B] hover:underline"
              >
                support team
              </a>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default VerifyEmail;