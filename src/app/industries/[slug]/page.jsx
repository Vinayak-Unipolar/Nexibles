


"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import Loader from "@/components/comman/Loader";

const Page = ({ params }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

 useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://nexiblesapp.barecms.com/api/pages`);
        const data = await res.json();
        if (data.status !== "success" || !Array.isArray(data.data)) {
          throw new Error("Invalid pages data format");
        }

        const page = data.data.find(
          (p) => slugify(p.title) === params.slug
        );
        if (!page) {
          throw new Error("Page not found");
        }

        setPageData(page);
      } catch (error) {
        console.error("Error fetching page data:", error);
        setError(error.message || "Failed to load page content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [params.slug]);

  const slugify = (title) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
  console.log("title", params.slug);

  if (loading) {
    return <Loader />;
  }


  if (error || !pageData) {
    return (
      <div>
        <Navbar />
        <div className="p-10 text-red-600 text-xl">{error || "Page not found"}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-16 px-6 md:px-20">
        {/* <h1 className="text-4xl font-bold mb-6 text-blue-900">{pageData.title}</h1>
        <p className="text-base text-gray-700 mb-6">{pageData.metadescription}</p> */}
        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
