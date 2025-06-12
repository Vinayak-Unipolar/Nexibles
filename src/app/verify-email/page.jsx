"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

function VerifyEmail() {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const hasVerified = useRef(false);

  useEffect(() => {
    console.log("VerifyEmail useEffect triggered", {
      token,
      APIURL,
      searchParams: searchParams.toString(),
    });

    if (!token || typeof token !== "string" || token.length < 10) {
      console.log("Token validation failed:", {
        token,
        type: typeof token,
        length: token?.length,
      });
      setError("Invalid or missing verification token. Please request a new link.");
      setLoading(false);
      toast.error("Invalid or missing verification token.", { toastId: "verify-error" });
      return;
    }

    if (hasVerified.current) {
      console.log("Verification already attempted, skipping");
      return;
    }

    hasVerified.current = true;

    const verifyEmail = async () => {
      setError(null);
      setSuccess(false);
      const url = `${APIURL}/api/login/verify-email?token=${token}`;
      console.log("Sending request to:", url);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response received:", {
          status: response.status,
          ok: response.ok,
          headers: Object.fromEntries(response.headers),
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("Non-JSON response:", text);
          throw new Error("Server returned an unexpected response. Please try again later.");
        }

        const data = await response.json();
        console.log("Verification response:", data);

        if (response.ok && data.status === "success") {
          console.log("Verification successful, setting success state");
          setSuccess(true);
          setLoading(false); // Explicitly set loading to false here
          toast.success("Email verified successfully! You can now log in.", {
            toastId: "verify-success",
          });
        } else {
          let errorMessage = data.message || "Failed to verify email.";
          if (response.status === 400) {
            if (data.message.includes("already verified") || data.message.includes("invalid or has already been used")) {
              errorMessage =
                "This email has already been verified or the link is invalid. Please proceed to login or request a new verification email.";
            } else {
              errorMessage = "Invalid verification token. Please request a new link.";
            }
          } else if (response.status === 401) {
            errorMessage = "Unauthorized request. Please check your token.";
          } else if (response.status === 404) {
            errorMessage = "Verification link not found. Please request a new link.";
          } else if (response.status >= 500) {
            errorMessage = "Server error. Please try again later or contact support.";
          }
          throw new Error(errorMessage);
        }
      } catch (err) {
        console.error("Verification error:", err.message);
        setError(err.message || "An error occurred during verification.");
        setLoading(false); // Ensure loading is false on error
        toast.error(err.message || "An error occurred during verification.", {
          toastId: "verify-error",
        });
      }
    };

    verifyEmail();

    // Simplified cleanup without isMounted
    return () => {
      console.log("Cleaning up VerifyEmail useEffect");
    };
  }, [token, APIURL]);

  useEffect(() => {
    console.log("State updated:", { loading, success, error });
    if (success) {
      console.log("Starting redirect countdown");
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            console.log("Redirecting to /login due to successful verification");
            router.push("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [success, router]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg md:p-8">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-900 md:text-3xl">
          Email Verification
        </h2>

        {loading && (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
            <p className="ml-2 text-sm text-gray-600 md:text-base">
              Verifying your email, please wait...
            </p>
          </div>
        )}

        {!loading && success && (
          <div className="text-center">
            <p className="mb-4 text-sm text-green-600 md:text-base">
              Your email has been successfully verified! You can now log in to your account.
            </p>
            <p className="mb-4 text-sm text-gray-600 md:text-base">
              Redirecting to login in {redirectCountdown} second{redirectCountdown !== 1 ? "s" : ""}...
            </p>
            <Link href="/login" prefetch={false}>
              <button className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#103b60] rounded-lg md:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                Go to Login Now
              </button>
            </Link>
          </div>
        )}

        {!loading && !success && error && (
          <div className="text-center">
            <p className="mb-4 text-sm text-red-600 md:text-base">{error}</p>
            {(error.includes("already verified") || error.includes("invalid or has already been used")) && (
              <p className="mb-4 text-sm text-gray-600 md:text-base">
                {`Please return to the login page and click "Resend Verification Email" to receive a new link.`}
              </p>
            )}
            <Link href="/login" prefetch={false}>
              <button className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#103b60] rounded-lg md:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                Back to Login
              </button>
            </Link>
          </div>
        )}

        <div className="mt-6 text-xs text-center text-gray-500 sm:text-sm">
          <p>
            Need help? Contact our{" "}
            <Link href="/contact-us" legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                support team
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;