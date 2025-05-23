"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import Loader from "@/components/comman/Loader";

const Page = ({ params }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`);
        const data = await res.json();

        const page = data.data.find(
          (p) => slugify(p.url) === params.slug
        );
        setPageData(page);
      } catch (error) {
        console.error("Error fetching page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [params.slug]);

  const slugify = (url) =>
    url.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
  console.log("uRL", params.slug);

  if (loading) {
    return <Loader />;
  }

  if (!pageData) {
    return (
      <div>
        <Navbar />
        <div className="p-10 text-red-600 text-xl">Page not found</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-16">
        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
