import React from "react";
import Footer from "@/components/shop/Footer";
import HomeContactForm from "@/components/home/HomeContactForm";
import Navbar from "@/components/shop/Navbar";
//page
const page = () => {
  return (
    <div>
      <Navbar />
        <HomeContactForm />
          <Footer />
    </div>
  );
};

export default page;
