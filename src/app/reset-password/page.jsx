'use client'
import React from "react";
import CNFPassword from "@/components/login/CNFPassword";

const Changepassword = () => {


  const getToken = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('token');
    }
    return null; 
  };

  const token = getToken();

  return (
    <div>
      {token && <CNFPassword token={token} />}
    </div>
  );
};

export default Changepassword;

