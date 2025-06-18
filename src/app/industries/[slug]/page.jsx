import ClientPage from "./ClientPage";

// Generate metadata server-side
export async function generateMetadata({ params }) {
  try {
    const APIURL = process.env.NEXT_PUBLIC_API_URL || "https://webapi.nexibles.com";
    const slugify = (url) =>
      url
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
        .replace(/-+/g, "-")
        .trim();

    const getFirstImage = (content) => {
      if (!content) return "https://cdn.nexibles.com/Industries_inner/Picture%201_Coffee.webp";
      const match = content.match(/<img[^>]+src=["'](.*?)["']/i);
      return match ? match[1] : "https://cdn.nexibles.com/Industries_inner/Picture%201_Coffee.webp";
    };

    console.log(`[Server] Fetching metadata for slug: ${params.slug}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${APIURL}/api/pages`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }
    const data = await res.json();
    console.log("[Server] API Response:", data);

    if (data.status !== "success" || !Array.isArray(data.data)) {
      throw new Error("Invalid pages data format");
    }

    const page = data.data.find((p) => slugify(p.url) === params.slug);
    console.log("[Server] Found Page:", page);

    if (!page) {
      return {
        title: "Page Not Found | Nexibles",
        description: "The page you are looking for could not be found.",
        keywords: "not found, 404, nexibles",
        robots: "noindex",
      };
    }

    return {
      title: page.title || "Coffee Packaging Solutions | Nexibles High-Barrier Pouches & Sustainable Options",
      description: page.metadescription || "Discover Nexibles' coffee packaging solutions with high-barrier films, degassing valves, and eco-friendly options to preserve aroma and enhance shelf appeal for coffee brands.",
      keywords: page.keywords || "coffee packaging, high-barrier films, degassing valves, sustainable coffee packaging, custom coffee pouches, Nexibles",
      alternates: {
        canonical: `https://www.nexibles.com/industries/${params.slug}`,
      },
      openGraph: {
        title: page.title || "Coffee Packaging Solutions | Nexibles High-Barrier Pouches & Sustainable Options",
        description: page.metadescription || "Discover Nexibles' coffee packaging solutions with high-barrier films, degassing valves, and eco-friendly options to preserve aroma and enhance shelf appeal for coffee brands.",
        type: "website",
        url: `https://www.nexibles.com/industries/${params.slug}`,
        images: [getFirstImage(page.content)],
      },
      twitter: {
        card: "summary_large_image",
        title: page.title || "Coffee Packaging Solutions | Nexibles High-Barrier Pouches & Sustainable Options",
        description: page.metadescription || "Discover Nexibles' coffee packaging solutions with high-barrier films, degassing valves, and eco-friendly options to preserve aroma and enhance shelf appeal for coffee brands.",
        images: [getFirstImage(page.content)],
      },
    };
  } catch (error) {
    console.error("[Server] Error generating metadata:", error.message);
    return {
      title: "Coffee Packaging Solutions | Nexibles High-Barrier Pouches & Sustainable Options",
      description: "Discover Nexibles' coffee packaging solutions with high-barrier films, degassing valves, and eco-friendly options to preserve aroma and enhance shelf appeal for coffee brands.",
      keywords: "coffee packaging, high-barrier films, degassing valves, sustainable coffee packaging, custom coffee pouches, Nexibles",
      alternates: {
        canonical: `https://www.nexibles.com/industries/${params.slug}`,
      },
      openGraph: {
        title: "Coffee Packaging Solutions | Nexibles High-Barrier Pouches & Sustainable Options",
        description: "Discover Nexibles' coffee packaging solutions with high-barrier films, degassing valves, and eco-friendly options to preserve aroma and enhance shelf appeal for coffee brands.",
        type: "website",
        url: `https://www.nexibles.com/industries/${params.slug}`,
        images: ["https://cdn.nexibles.com/Industries_inner/Picture%201_Coffee.webp"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Coffee Packaging Solutions | Nexibles High-Barrier Pouches & Sustainable Options",
        description: "Discover Nexibles' coffee packaging solutions with high-barrier films, degassing valves, and eco-friendly options to preserve aroma and enhance shelf appeal for coffee brands.",
        images: ["https://cdn.nexibles.com/Industries_inner/Picture%201_Coffee.webp"],
      },
    };
  }
}

// Fetch initial data server-side
async function fetchInitialData(slug) {
  try {
    const APIURL = process.env.NEXT_PUBLIC_API_URL || "https://webapi.nexibles.com";
    const slugify = (url) =>
      url
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
        .replace(/-+/g, "-")
        .trim();

    console.log(`[Server] Fetching data for slug: ${slug}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${APIURL}/api/pages`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }
    const data = await res.json();
    console.log("[Server] API Response:", data);

    if (data.status !== "success" || !Array.isArray(data.data)) {
      throw new Error("Invalid pages data format");
    }

    const page = data.data.find((p) => slugify(p.url) === slug);
    console.log("[Server] Found Page:", page);

    if (!page) {
      return { data: null, error: `Page with slug "${slug}" not found` };
    }

    return { data: page, error: null };
  } catch (error) {
    console.error("[Server] Error fetching initial data:", error.message);
    return { data: null, error: error.message || "Failed to load page content." };
  }
}

export default async function Page({ params }) {
  const { data: initialData, error: initialError } = await fetchInitialData(params.slug);
  return <ClientPage params={params} initialData={initialData} initialError={initialError} />;
}











// import ClientPage from "./ClientPage";

// // Static fallback data for tea-packaging-solutions
// const fallbackPageData = {
//   title: "Tea Packaging Solutions | Printed Pouches & Sachets for Freshness",
//   metadescription:
//     "Lock in aroma and flavour with foil-lined tea sachets, stand-up pouches, and sustainable formats designed for artisanal blends and large-scale exports.",
//   keywords:
//     "tea packaging, tea sachets, printed tea pouches, tea pouch manufacturers, tea bag packaging, stand-up pouches for tea, loose leaf tea packaging, matte finish tea bags, zipper tea pouches, laminated tea sachets, airtight packaging for herbal and premium teas, export-grade tea pouches with foil barrier, biodegradable tea packaging for D2C brands, customized tea sachets for private labels, resealable tea packaging suppliers in India",
//   content: "<div><h1>Tea Packaging Solutions</h1><p>Sorry, content could not be loaded. Please try again later.</p></div>",
//   url: "tea-packaging-solutions",
// };

// // Generate metadata server-side
// export async function generateMetadata({ params }) {
//   try {
//     const APIURL = process.env.NEXT_PUBLIC_API_URL || "https://webapi.nexibles.com";
//     const slugify = (url) =>
//       url
//         .toLowerCase()
//         .replace(/\s+/g, "-")
//         .replace(/[^a-z0-9\-]/g, "")
//         .replace(/-+/g, "-")
//         .trim();

//     const getFirstImage = (content) => {
//       if (!content) return "https://cdn.nexibles.com/Industries_inner/Picture%201_Tea.webp";
//       const match = content.match(/<img[^>]+src=["'](.*?)["']/i);
//       return match ? match[1] : "https://cdn.nexibles.com/Industries_inner/Picture%201_Tea.webp";
//     };

//     console.log(`[Server] Fetching metadata for slug: ${params.slug}`);
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout
//     const res = await fetch(`${APIURL}/api/pages`, {
//       cache: "no-store",
//       signal: controller.signal,
//     });
//     clearTimeout(timeoutId);

//     if (!res.ok) {
//       const errorText = await res.text();
//       throw new Error(`Network response was not ok: ${res.status} - ${errorText}`);
//     }
//     const data = await res.json();
//     console.log("[Server] API Response:", data);

//     if (data.status !== "success" || !Array.isArray(data.data)) {
//       throw new Error("Invalid pages data format");
//     }

//     const page = data.data.find((p) => slugify(p.url) === params.slug);
//     console.log("[Server] Found Page:", page);

//     if (!page) {
//       return {
//         title: "Page Not Found | Nexibles",
//         description: "The page you are looking for could not be found.",
//         keywords: "not found, 404, nexibles",
//         robots: "noindex",
//       };
//     }

//     return {
//       title: page.title,
//       description: page.metadescription,
//       keywords: page.keywords,
//       alternates: {
//         canonical: `https://www.nexibles.com/industries/${params.slug}`,
//       },
//       openGraph: {
//         title: page.title,
//         description: page.metadescription,
//         type: "website",
//         url: `https://www.nexibles.com/industries/${params.slug}`,
//         images: [getFirstImage(page.content)],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: page.title,
//         description: page.metadescription,
//         images: [getFirstImage(page.content)],
//       },
//     };
//   } catch (error) {
//     console.error("[Server] Error generating metadata:", error.message);
//     return {
//       title: fallbackPageData.title,
//       description: fallbackPageData.metadescription,
//       keywords: fallbackPageData.keywords,
//       alternates: {
//         canonical: `https://www.nexibles.com/industries/${params.slug}`,
//       },
//       openGraph: {
//         title: fallbackPageData.title,
//         description: fallbackPageData.metadescription,
//         type: "website",
//         url: `https://www.nexibles.com/industries/${params.slug}`,
//         images: ["https://cdn.nexibles.com/Industries_inner/Picture%201_Tea.webp"],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: fallbackPageData.title,
//         description: fallbackPageData.metadescription,
//         images: ["https://cdn.nexibles.com/Industries_inner/Picture%201_Tea.webp"],
//       },
//     };
//   }
// }

// // Fetch initial data server-side
// async function fetchInitialData(slug) {
//   try {
//     const APIURL = process.env.NEXT_PUBLIC_API_URL || "https://webapi.nexibles.com";
//     const slugify = (url) =>
//       url
//         .toLowerCase()
//         .replace(/\s+/g, "-")
//         .replace(/[^a-z0-9\-]/g, "")
//         .replace(/-+/g, "-")
//         .trim();

//     console.log(`[Server] Fetching data for slug: ${slug}`);
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 5000);
//     const res = await fetch(`${APIURL}/api/pages`, {
//       cache: "no-store",
//       signal: controller.signal,
//     });
//     clearTimeout(timeoutId);

//     if (!res.ok) {
//       const errorText = await res.text();
//       throw new Error(`Network response was not ok: ${res.status} - ${errorText}`);
//     }
//     const data = await res.json();
//     console.log("[Server] API Response:", data);

//     if (data.status !== "success" || !Array.isArray(data.data)) {
//       throw new Error("Invalid pages data format");
//     }

//     const page = data.data.find((p) => slugify(p.url) === slug);
//     console.log("[Server] Found Page:", page);

//     if (!page) {
//       return { data: null, error: `Page with slug "${slug}" not found` };
//     }

//     return { data: page, error: null };
//   } catch (error) {
//     console.error("[Server] Error fetching initial data:", error.message);
//     return { data: fallbackPageData, error: error.message || "Failed to load page content." };
//   }
// }

// export default async function Page({ params }) {
//   const { data: initialData, error: initialError } = await fetchInitialData(params.slug);
//   return <ClientPage params={params} initialData={initialData} initialError={initialError} />;
// }