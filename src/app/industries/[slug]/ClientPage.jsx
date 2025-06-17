"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import Loader from "@/components/comman/Loader";
import DOMPurify from "dompurify";

// CSS for the page content
const pageCss = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.page-content .hover-underline:hover::after {
  width: 100%;
  font-family: 'Poppins', sans-serif;
}
.page-content .hover-underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  transition: width 0.3s ease;
}
.page-content {
  width: 100%;
  max-width: 100vw;
  margin-top: 20px;
  padding: 0;
}
.page-content .container {
  max-width: 90rem;
  margin-left: auto;
  margin-right: auto;
}
.page-content .hero-section {
  background-color: #ffffff;
  padding: 2.5rem 1.5rem;
}
@media (min-width: 768px) {
  .page-content .hero-section {
    padding: 2.5rem 5rem;
  }
}
.page-content .hero-grid {
  display: grid;
  gap: 3rem;
}
@media (min-width: 768px) {
  .page-content .hero-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.page-content .hero-grid-align {
  align-items: center;
}
.page-content .hero-subtext {
  font-size: 16px;
  font-weight: 600;
  color: #1e3a8a;
}
.page-content .hero-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1.25rem;
}
@media (min-width: 768px) {
  .page-content .hero-title {
    font-size: 2.25rem;
  }
}
.page-content .hero-text {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
}
.page-content .hero-text-strong {
  font-weight: 700;
  color: #374151;
  display: block;
}
.page-content .hero-text-base {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
}
.page-content .hero-list {
  list-style: disc;
  list-style-position: inside;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #4b5563;
  margin-bottom: 2rem;
}
.page-content .hero-list-item {
  position: relative;
  cursor: pointer;
  width: fit-content;
}
.page-content .hero-list-item span:hover {
  color: #1e3a8a;
}
.page-content .hero-list-item-underline::after {
  background-color: #1e3a8a;
}
.page-content .hero-image-container {
  width: 100%;
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}
@media (min-width: 768px) {
  .page-content .hero-image-container {
    height: 24rem;
  }
}
.page-content .hero-image {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.page-content .features-section {
  padding: 2.5rem 1.5rem;
}
@media (min-width: 768px) {
  .page-content .features-section {
    padding: 2.5rem 5rem;
  }
}
.page-content .features-grid {
  display: grid;
  gap: 2rem;
  margin-top: 4rem;
}
@media (min-width: 768px) {
  .page-content .features-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
.page-content .feature-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 176, 141, 0.2);
}
.page-content .feature-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}
.page-content .feature-subtext {
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #1e3a8a;
}
.page-content .feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
}
.page-content .feature-text {
  font-size: 0.875rem;
  color: #6b7280;
}
.page-content .challenges-section {
  background-color: #ffffff;
  width: 100%;
  padding: 2.5rem 1.5rem;
}
@media (min-width: 768px) {
  .page-content .challenges-section {
    padding: 2.5rem 5rem;
  }
}
.page-content .challenges-grid {
  display: grid;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 768px) {
  .page-content .challenges-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.page-content .challenges-image-container {
  width: 100%;
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
}
@media (min-width: 768px) {
  .page-content .challenges-image-container {
    height: 24rem;
  }
}
.page-content .challenges-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.page-content .challenges-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1.25rem;
}
@media (min-width: 768px) {
  .page-content .challenges-title {
    font-size: 1.875rem;
  }
}
.page-content .challenges-text {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
}
.page-content .challenges-text-base {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
}
.page-content .challenges-list {
  list-style: disc;
  list-style-position: inside;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #4b5563;
  margin-bottom: 2rem;
}
.page-content .challenges-list-item {
  position: relative;
  cursor: pointer;
  width: fit-content;
}
.page-content .challenges-list-item span:hover {
  color: #1e3a8a;
}
.page-content .challenges-list-item-underline::after {
  background-color: #1e3a8a;
}
.page-content .button {
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: #000000;
  background-color: #ffd13e;
  border: none;
  cursor: pointer;
}
.page-content .button:hover {
  background-color: #e5bc37;
  color: #000000;
}
.page-content .cta-section {
  background-color: #ffffff;
  padding: 2.5rem 1.5rem;
  width: 100%;
}
@media (min-width: 768px) {
  .page-content .cta-section {
    padding: 2.5rem 5rem;
  }
}
.page-content .cta-grid {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}
@media (min-width: 768px) {
  .page-content .cta-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.page-content .cta-content {
  padding: 1rem 2.5rem;
}
@media (min-width: 768px) {
  .page-content .cta-content {
    padding: 2.5rem;
  }
}
.page-content .cta-subtext {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e3a8a;
}
.page-content .cta-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1rem;
}
@media (min-width: 768px) {
  .page-content .cta-title {
    font-size: 1.875rem;
  }
}
.page-content .cta-text {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1rem;
}
.page-content .cta-image-container {
  width: 100%;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  overflow: hidden;
}
@media (min-width: 768px) {
  .page-content .cta-image-container {
    height: 20rem;
  }
}
.page-content .cta-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.page-content .cta-form {
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.page-content .cta-form-text {
  color: #4b5563;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.page-content .cta-buttons {
  display: flex;
  gap: 1rem;
}
`;

export default function ClientPage({ params, initialData, initialError }) {
  const [pageData, setPageData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [error, setError] = useState(initialError);
  const APIURL = process.env.NEXT_PUBLIC_API_URL || "https://webapi.nexibles.com";

  // Function to extract the first image from content for Open Graph/Twitter Card
  const getFirstImage = (content) => {
    if (!content) return "https://cdn.nexibles.com/Industries_inner/Picture%201_Tea.webp";
    const match = content.match(/<img[^>]+src=["'](.*?)["']/i);
    return match ? match[1] : "https://cdn.nexibles.com/Industries_inner/Picture%201_Tea.webp";
  };

  useEffect(() => {
    // Only fetch if initial data is not provided
    if (!initialData && !initialError) {
      const fetchPageData = async () => {
        setLoading(true);
        setError(null);
        try {
          console.log("[Client] Fetching from API:", `${APIURL}/api/pages`);
          console.log("[Client] Slug:", params.slug);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          const res = await fetch(`${APIURL}/api/pages`, {
            cache: "no-store",
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Network response was not ok: ${res.status} - ${errorText}`);
          }
          const data = await res.json();
          console.log("[Client] API Response:", data);

          if (data.status !== "success" || !Array.isArray(data.data)) {
            throw new Error("Invalid pages data format");
          }

          const page = data.data.find((p) => slugify(p.url) === params.slug);
          console.log("[Client] Found Page:", page);

          if (!page) {
            throw new Error(`Page with slug "${params.slug}" not found`);
          }

          setPageData(page);
          document.title = page.title;
        } catch (error) {
          console.error("[Client] Error fetching page data:", error.message);
          setError(error.message || "Failed to load page content. Please try again later.");
          setPageData({
            title: "Tea Packaging Solutions | Printed Pouches & Sachets for Freshness",
            metadescription:
              "Lock in aroma and flavour with foil-lined tea sachets, stand-up pouches, and sustainable formats designed for artisanal blends and large-scale exports.",
            keywords:
              "tea packaging, tea sachets, printed tea pouches, tea pouch manufacturers, tea bag packaging, stand-up pouches for tea, loose leaf tea packaging, matte finish tea bags, zipper tea pouches, laminated tea sachets, airtight packaging for herbal and premium teas, export-grade tea pouches with foil barrier, biodegradable tea packaging for D2C brands, customized tea sachets for private labels, resealable tea packaging suppliers in India",
            content: "<div><h1>Tea Packaging Solutions</h1><p>Sorry, content could not be loaded. Please try again later.</p></div>",
            url: "tea-packaging-solutions",
          });
          document.title = "Tea Packaging Solutions | Nexibles";
        } finally {
          setLoading(false);
        }
      };

      fetchPageData();
    }
  }, [params.slug, initialData, initialError]);

  const slugify = (url) =>
    url
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
      .replace(/-+/g, "-")
      .trim();

  // Sanitize HTML content
  const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "section",
        "article",
        "div",
        "p",
        "span",
        "ul",
        "li",
        "img",
        "h1",
        "h2",
        "h3",
        "a",
        "strong",
        "em",
      ],
      ALLOWED_ATTR: ["class", "id", "href", "src", "alt"],
    });
  };

  // Retry fetch on button click
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    const fetchPageData = async () => {
      try {
        console.log("[Client] Retrying fetch from API:", `${APIURL}/api/pages`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${APIURL}/api/pages`, {
          cache: "no-store",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Network response was not ok: ${res.status} - ${errorText}`);
        }
        const data = await res.json();
        console.log("[Client] Retry API Response:", data);

        if (data.status !== "success" || !Array.isArray(data.data)) {
          throw new Error("Invalid pages data format");
        }

        const page = data.data.find((p) => slugify(p.url) === params.slug);
        console.log("[Client] Retry Found Page:", page);

        if (!page) {
          throw new Error(`Page with slug "${params.slug}" not found`);
        }

        setPageData(page);
        document.title = page.title;
      } catch (error) {
        console.error("[Client] Error retrying fetch:", error.message);
        setError(error.message || "Failed to load page content. Please try again later.");
        setPageData({
          title: "Tea Packaging Solutions | Printed Pouches & Sachets for Freshness",
          metadescription:
            "Lock in aroma and flavour with foil-lined tea sachets, stand-up pouches, and sustainable formats designed for artisanal blends and large-scale exports.",
          keywords:
            "tea packaging, tea sachets, printed tea pouches, tea pouch manufacturers, tea bag packaging, stand-up pouches for tea, loose leaf tea packaging, matte finish tea bags, zipper tea pouches, laminated tea sachets, airtight packaging for herbal and premium teas, export-grade tea pouches with foil barrier, biodegradable tea packaging for D2C brands, customized tea sachets for private labels, resealable tea packaging suppliers in India",
          content: "<div><h1>Tea Packaging Solutions</h1><p>Sorry, content could not be loaded. Please try again later.</p></div>",
          url: "tea-packaging-solutions",
        });
        document.title = "Tea Packaging Solutions | Nexibles";
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  };

  if (loading) {
    return (
      <div>
        <Head>
          <title>Loading | Nexibles</title>
          <meta name="description" content="Loading page content..." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{pageData?.title || "Tea Packaging Solutions | Nexibles"}</title>
        <meta
          name="description"
          content={
            pageData?.metadescription ||
            "Explore innovative tea packaging solutions with Nexibles."
          }
        />
        <meta
          name="keywords"
          content={
            pageData?.keywords ||
            "tea packaging, tea sachets, printed tea pouches, nexibles"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="canonical" content={`https://www.nexibles.com/industries/${params.slug}`} />
        <meta property="og:title" content={pageData?.title || "Tea Packaging Solutions | Nexibles"} />
        <meta
          property="og:description"
          content={
            pageData?.metadescription ||
            "Explore innovative tea packaging solutions with Nexibles."
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.nexibles.com/industries/${params.slug}`}
        />
        <meta
          property="og:image"
          content={getFirstImage(pageData?.content)}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={pageData?.title || "Tea Packaging Solutions | Nexibles"}
        />
        <meta
          name="twitter:description"
          content={
            pageData?.metadescription ||
            "Explore innovative tea packaging solutions with Nexibles."
          }
        />
        <meta
          name="twitter:image"
          content={getFirstImage(pageData?.content)}
        />
      </Head>
      <Navbar />
      {error ? (
        <div className="p-10 mt-20 text-red-600 text-xl text-center">
          {error}
          <button
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="mx-auto mt-16 page-content font-poppins">
          <style>{pageCss}</style>
          <div
            className="font-poppins"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.content) }}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}