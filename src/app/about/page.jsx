import React from "react";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import About from "@/components/static-pages/About";
// import HomeNavbar from "@/components/home/HomeNavbar";
//page
const page = () => {
  return (
    <div>
      <Navbar />
      <div >
      <About />
      </div>
      <Footer />
    </div>
  );
};

export default page;
