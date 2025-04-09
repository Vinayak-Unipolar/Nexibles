'use client'
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import { useState } from "react";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const modalRef = useRef();
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = window.location.origin;
    try {
      const response = await fetch(`${APIURL}/api/login/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          emailAddress: email, 
          baseUrl: baseUrl 
        }),// Change "email" to "emailAddress"
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success("Check your email for reset password");
        onClose();
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };


  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-end pt-4 pr-4">
          <button onClick={onClose} className="text-gray-900">
            <IoMdClose size={28} />
          </button>
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Forgot Password</h1>
          <p className="text-lg text-gray-700 mb-6">Enter your email address to reset your password.</p>
          <div className="flex justify-center items-center">
            <img
              src="/login/reset-password.png"
              alt="forgot_password"
              className="h-16" />
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-gray-900 font-semibold">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              required
              className="border border-gray-900 rounded-full px-4 py-2 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-[#111B36] text-white py-2 rounded-full transition-colors duration-300">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
