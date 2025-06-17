"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head"; // Import Head from next/head
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

const Page = ({ params }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${APIURL}/api/pages`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        if (data.status !== "success" || !Array.isArray(data.data)) {
          throw new Error("Invalid pages data format");
        }

        const page = data.data.find(
          (p) => slugify(p.url) === params.slug
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

  const slugify = (url) =>
    url.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

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

  if (loading) {
    return <Loader />;
  }

  if (error || !pageData) {
    return (
      <div>
        <Navbar />
        <div className="p-10 mt-20 text-red-600 text-xl">{error || "Page not found"}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{pageData.title}</title> {/* Set meta title dynamically */}
      </Head>
      <Navbar />
      <div className="mx-auto mt-16 page-content font-poppins">
        <style>{pageCss}</style>
        <div
          className="font-poppins"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.content) }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Page;








// "use client";

// import React, { useState, useEffect } from "react";
// import Navbar from "@/components/shop/Navbar";
// import Footer from "@/components/shop/Footer";
// import Loader from "@/components/comman/Loader";
// import DOMPurify from "dompurify";

// // CSS for the page content
// const pageCss = `

// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

// .page-content .hover-underline:hover::after {
//   width: 100%;
//   font-family: 'Poppins', sans-serif;

// }
// .page-content .hover-underline::after {
//   content: '';
//   position: absolute;
//   left: 0;
//   bottom: -2px;
//   width: 0;
//   height: 2px;
//   transition: width 0.3s ease;
// }
// .page-content {
//   width: 100%;
//   max-width: 100vw;
//   margin-top: 20px;
//   padding: 0;
// }
// .page-content .container {
//   max-width: 90rem;
//   margin-left: auto;
//   margin-right: auto;
// }
// .page-content .hero-section {
//   background-color: #ffffff;
//   padding: 2.5rem 1.5rem;
// }
// @media (min-width: 768px) {
//   .page-content .hero-section {
//     padding: 2.5rem 5rem;
//   }
// }
// .page-content .hero-grid {
//   display: grid;
//   gap: 3rem;
// }
// @media (min-width: 768px) {
//   .page-content .hero-grid {
//     grid-template-columns: repeat(2, minmax(0, 1fr));
//   }
// }
// .page-content .hero-grid-align {
//   align-items: center;
// }
// .page-content .hero-subtext {
//   font-size: 16px;
//   font-weight: 600;
//   color: #1e3a8a;
// }
// .page-content .hero-title {
//   font-size: 1.875rem;
//   font-weight: 700;
//   color: #1e3a8a;
//   margin-bottom: 1.25rem;
// }
// @media (min-width: 768px) {
//   .page-content .hero-title {
//     font-size: 2.25rem;
//   }
// }
// .page-content .hero-text {
//   font-size: 1.125rem;
//   color: #4b5563;
//   margin-bottom: 1.5rem;
// }

// .page-content .hero-text-strong {
//   font-weight: 700;
//   color: #374151;
//   display: block;
// }
// .page-content .hero-text-base {
//   font-size: 1rem;
//   color: #4b5563;
//   margin-bottom: 1.5rem;
// }
// .page-content .hero-list {
//   list-style: disc;
//   list-style-position: inside;
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
//   color: #4b5563;
//   margin-bottom: 2rem;
// }
// .page-content .hero-list-item {
//   position: relative;
//   cursor: pointer;
//   width: fit-content;
// }
// .page-content .hero-list-item span:hover {
//   color: #1e3a8a;
// }
// .page-content .hero-list-item-underline::after {
//   background-color: #1e3a8a;
// }
// .page-content .hero-image-container {
//   width: 100%;
//   height: 16rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 0.5rem;
//   overflow: hidden;
//   background-color: #ffffff;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
// }
// @media (min-width: 768px) {
//   .page-content .hero-image-container {
//     height: 24rem;
//   }
// }
// .page-content .hero-image {
//   width: 100%;
//   height: 100%;
//   object-fit: fill;
// }
// .page-content .features-section {
//   padding: 2.5rem 1.5rem;
// }
// @media (min-width: 768px) {
//   .page-content .features-section {
//     padding: 2.5rem 5rem;
//   }
// }
// .page-content .features-grid {
//   display: grid;
//   gap: 2rem;
//   margin-top: 4rem;
// }
// @media (min-width: 768px) {
//   .page-content .features-grid {
//     grid-template-columns: repeat(3, minmax(0, 1fr));
//   }
// }
// .page-content .feature-card {
//   background-color: #ffffff;
//   padding: 2rem;
//   border-radius: 0.5rem;
//   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//   transition: all 0.3s ease;
//   border: 1px solid rgba(0, 176, 141, 0.2);
// }
// .page-content .feature-card:hover {
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
// }
// .page-content .feature-subtext {
//   font-size: 0.75rem;
//   font-weight: 500;
//   margin-bottom: 0.5rem;
//   color: #1e3a8a;
// }
// .page-content .feature-title {
//   font-size: 1.25rem;
//   font-weight: 700;
//   color: #1f2937;
//   margin-bottom: 0.75rem;
// }
// .page-content .feature-text {
//   font-size: 0.875rem;
//   color: #6b7280;
// }
// .page-content .challenges-section {
//   background-color: #ffffff;
//   width: 100%;
//   padding: 2.5rem 1.5rem;
// }
// @media (min-width: 768px) {
//   .page-content .challenges-section {
//     padding: 2.5rem 5rem;
//   }
// }
// .page-content .challenges-grid {
//   display: grid;
//   gap: 3rem;
//   align-items: center;
// }
// @media (min-width: 768px) {
//   .page-content .challenges-grid {
//     grid-template-columns: repeat(2, minmax(0, 1fr));
//   }
// }
// .page-content .challenges-image-container {
//   width: 100%;
//   height: 16rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 0.5rem;
// }
// @media (min-width: 768px) {
//   .page-content .challenges-image-container {
//     height: 24rem;
//   }
// }
// .page-content .challenges-image {
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
//   border-radius: 0.5rem;
//   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
// }
// .page-content .challenges-title {
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: #1e3a8a;
//   margin-bottom: 1.25rem;
// }
// @media (min-width: 768px) {
//   .page-content .challenges-title {
//     font-size: 1.875rem;
//   }
// }
// .page-content .challenges-text {
//   font-size: 1.125rem;
//   color: #4b5563;
//   margin-bottom: 1.5rem;
// }
// .page-content .challenges-text-base {
//   font-size: 1rem;
//   color: #4b5563;
//   margin-bottom: 1.5rem;
// }
// .page-content .challenges-list {
//   list-style: disc;
//   list-style-position: inside;
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
//   color: #4b5563;
//   margin-bottom: 2rem;
// }
// .page-content .challenges-list-item {
//   position: relative;
//   cursor: pointer;
//   width: fit-content;
// }
// .page-content .challenges-list-item span:hover {
//   color: #1e3a8a;
// }
// .page-content .challenges-list-item-underline::after {
//   background-color: #1e3a8a;
// }
// .page-content .button {
//   font-weight: 600;
//   padding: 0.75rem 2rem;
//   border-radius: 0.5rem;
//   transition: all 0.3s ease;
//   color: #000000;
//   background-color: #ffd13e;
//   border: none;
//   cursor: pointer;
// }
// .page-content .button:hover {
//   background-color: #e5bc37;
//   color: #000000;
// }
// .page-content .cta-section {
//   background-color: #ffffff;
//   padding: 2.5rem 1.5rem;
//   width: 100%;
// }
// @media (min-width: 768px) {
//   .page-content .cta-section {
//     padding: 2.5rem 5rem;
//   }
// }
// .page-content .cta-grid {
//   display: grid;
//   gap: 2.5rem;
//   align-items: center;
// }
// @media (min-width: 768px) {
//   .page-content .cta-grid {
//     grid-template-columns: repeat(2, minmax(0, 1fr));
//   }
// }
// .page-content .cta-content {
//   padding: 1rem 2.5rem;
// }
// @media (min-width: 768px) {
//   .page-content .cta-content {
//     padding: 2.5rem;
//   }
// }
// .page-content .cta-subtext {
//   font-size: 0.875rem;
//   font-weight: 600;
//   margin-bottom: 0.5rem;
//   color: #1e3a8a;
// }
// .page-content .cta-title {
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: #1e3a8a;
//   margin-bottom: 1rem;
// }
// @media (min-width: 768px) {
//   .page-content .cta-title {
//     font-size: 1.875rem;
//   }
// }
// .page-content .cta-text {
//   font-size: 1rem;
//   color: #4b5563;
//   margin-bottom: 1rem;
// }
// .page-content .cta-image-container {
//   width: 100%;
//   height: 12rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 0.5rem;
//   overflow: hidden;
// }
// @media (min-width: 768px) {
//   .page-content .cta-image-container {
//     height: 20rem;
//   }
// }
// .page-content .cta-image {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   border-radius: 0.5rem;
//   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
// }
// .page-content .cta-form {
//   padding: 2rem;
//   background-color: #ffffff;
//   border-radius: 0.5rem;
//   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// }
// .page-content .cta-form-text {
//   color: #4b5563;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// }
// .page-content .cta-buttons {
//   display: flex;
//   gap: 1rem;
// }
// `;

// const Page = ({ params }) => {
//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const APIURL = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     const fetchPageData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${APIURL}/api/pages`);
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await res.json();
//         if (data.status !== "success" || !Array.isArray(data.data)) {
//           throw new Error("Invalid pages data format");
//         }

//         const page = data.data.find(
//           (p) => slugify(p.url) === params.slug
//         );
//         if (!page) {
//           throw new Error("Page not found");
//         }

//         setPageData(page);
//       } catch (error) {
//         console.error("Error fetching page data:", error);
//         setError(error.message || "Failed to load page content. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPageData();
//   }, [params.slug]);

  
//   const slugify = (url) =>
//     url.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
//   console.log("title", params.slug);

//   // Sanitize HTML content
//   const sanitizeHtml = (html) => {
//     return DOMPurify.sanitize(html, {
//       ALLOWED_TAGS: [
//         "section",
//         "article",
//         "div",
//         "p",
//         "span",
//         "ul",
//         "li",
//         "img",
//         "h1",
//         "h2",
//         "h3",
//         "a",
//         "strong",
//         "em",
//       ],
//       ALLOWED_ATTR: ["class", "id", "href", "src", "alt"],
//     });
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (error || !pageData) {
//     return (
//       <div>
//         <Navbar />
//         <div className="p-10 mt-20 text-red-600 text-xl">{error || "Page not found"}</div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div >
//       <Navbar />
//       <div className="mx-auto mt-16 page-content font-poppins">
//         <style >{pageCss}</style>
//         <div
//         className=" font-poppins"
//           dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.content) }}
//         />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Page;

















// "use client";

// import React, { useState, useEffect } from "react";
// import Navbar from "@/components/shop/Navbar";
// import Footer from "@/components/shop/Footer";
// import Loader from "@/components/comman/Loader";

// const Page = ({ params }) => {
//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const APIURL = process.env.NEXT_PUBLIC_API_URL;

//  useEffect(() => {
//     const fetchPageData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`https://nexiblesapp.barecms.com/api/pages`);
//         const data = await res.json();
//         if (data.status !== "success" || !Array.isArray(data.data)) {
//           throw new Error("Invalid pages data format");
//         }

//         const page = data.data.find(
//           (p) => slugify(p.title) === params.slug
//         );
//         if (!page) {
//           throw new Error("Page not found");
//         }

//         setPageData(page);
//       } catch (error) {
//         console.error("Error fetching page data:", error);
//         setError(error.message || "Failed to load page content. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPageData();
//   }, [params.slug]);

//   const slugify = (title) =>
//     title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
//   console.log("title", params.slug);

//   if (loading) {
//     return <Loader />;
//   }


//   if (error || !pageData) {
//     return (
//       <div>
//         <Navbar />
//         <div className="p-10 text-red-600 text-xl">{error || "Page not found"}</div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="mx-auto mt-16 px-6 md:px-20">
//         {/* <h1 className="text-4xl font-bold mb-6 text-blue-900">{pageData.title}</h1>
//         <p className="text-base text-gray-700 mb-6">{pageData.metadescription}</p> */}
//         <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Page;