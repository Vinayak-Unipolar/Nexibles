import React from "react";



import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import About from "@/components/static-pages/About";
import NexiblesInstagramSection from "@/components/home/NexiblesInstagramSection";
import SubscribeBanner from "@/components/shop/SubscribeBanner";
// import HomeNavbar from "@/components/home/HomeNavbar";
//page
const page = () => {
  return (
    <div>
      <Navbar />
      <div >
      <About />
      <SubscribeBanner/>
      <NexiblesInstagramSection/>
      </div>
      <Footer />
    </div>
  );
};

export default page;
