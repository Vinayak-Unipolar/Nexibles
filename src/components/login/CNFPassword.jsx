'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const CNFPassword = ({ token }) => {
  const router = useRouter();
  const token2 = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${APIURL}/api/login/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token2, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successfully");
        router.push('/login');
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="mb-8 text-center">
          <img
            src="/home/nexible.gif"
            alt="logo"
            className="h-12 mx-auto mb-4"
          />
          <hr className="mb-2" />
          <h2 className="text-2xl font-bold">Enter Your New Password</h2>
          <p className="text-sm text-gray-600">
            Your new password must be different from previous passwords.
          </p>
          <div className="flex justify-center items-center">
            <img
              src="/login/password.png"
              alt="password-logo"
              className="h-16 mt-4"
            />
          </div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="border-2 border-gray-900 rounded-full px-4 py-2 outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border-2 border-gray-900 rounded-full px-4 py-2 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#111B36] text-white rounded-full px-6 py-2 hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default CNFPassword;
