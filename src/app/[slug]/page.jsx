"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import Loader from '@/components/comman/Loader';

const Page = ({ params: paramsPromise }) => {
    const params = React.use(paramsPromise); 
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchPageData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${APIURL}/api/pages`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'API-Key': token,
                    },
                });
                const data = await res.json();
                if (data.status === 'success') {
                    const page = data.data.find((p) => slugify(p.title) === params.slug);
                    setPageData(page);
                } else {
                    console.error('Failed to fetch pages', data.error);
                }
            } catch (error) {
                console.error("Error fetching page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPageData();
    }, [params.slug]);

    const slugify = (title) => {
        return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    };

    if (loading) {
        return <Loader />;
    }

    if (!pageData) {
        return <div className="p-10 text-red-600 text-xl">Page not found</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="p-10 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">{pageData.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
            </div>
            <Footer />
        </div>
    );
};

export default Page;