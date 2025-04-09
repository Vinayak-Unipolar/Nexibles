'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion, AnimatePresence } from 'framer-motion';

const Popularproducts = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://nexiblesapp.barecms.com/api/category_master', {
                    headers: {
                        'Content-Type': 'application/json',
                        'API-Key': process.env.NEXT_PUBLIC_API_KEY,
                    }
                });
                const data = await response.json();

                if (data.status === 'success') {
                    const nexiblesCategories = data.data.filter(
                        category => category.origin === 'Nexibles'
                    );
                    setCategories(nexiblesCategories);
                    if (nexiblesCategories.length > 0) {
                        setSelectedCategory(nexiblesCategories[0].cat_url);
                    }
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!selectedCategory) return;

            setLoading(true);
            try {
                const response = await fetch(`https://nexiblesapp.barecms.com/api/product/get_list/${selectedCategory}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'API-Key': process.env.NEXT_PUBLIC_API_KEY,
                    }
                });
                const data = await response.json();

                if (data.status === 'success') {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 768, settings: { slidesToShow: 1 } },
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 1280, settings: { slidesToShow: 4 } },
        ],
    };

    const handleCategoryChange = (catUrl) => {
        setSelectedCategory(catUrl);
    };

    // Animation variants
    const tabVariants = {
        inactive: { opacity: 0.7, y: 5 },
        active: { opacity: 1, y: 0 },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { scale: 1.03, transition: { duration: 0.3 } }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1 
            }
        }
    };

    return (
        <motion.div 
            className='bg-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className='px-6 md:px-20'>
                <motion.h2 
                    className="text-4xl font-bold text-center text-[#333] mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {`What's New`}
                </motion.h2>

                {/* Category Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-gray-100 rounded-xl p-1.5">
                        {categories.map((category, index) => (
                            <motion.button
                                key={category.id} 
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                initial="inactive"
                                animate={selectedCategory === category.cat_url ? "active" : "inactive"}
                                className={`px-4 py-2 text-sm font-semibold relative z-10 rounded-xl ${
                                    selectedCategory === category.cat_url ? 'bg-[#ECE0CC] text-black' : 'bg-transparent'
                                }`}
                                onClick={() => handleCategoryChange(category.cat_url)}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            key="loading"
                            className="grid grid-cols-1 md:grid-cols-4 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {[1, 2, 3, 4].map((placeholder) => (
                                <motion.div 
                                    key={placeholder}
                                    variants={cardVariants}
                                    className="animate-pulse"
                                >
                                    <div className="bg-white border border-[#eaeaea] rounded-lg overflow-hidden">
                                        <div className="p-6 flex justify-center items-center">
                                            <div className="bg-gray-200 h-64 w-full rounded-md"></div>
                                        </div>
                                        <div className="px-4 pb-4">
                                            <div className="bg-gray-200 h-10 w-full rounded-md"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="products"
                            className="px-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Slider {...settings}>
                                {products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        variants={cardVariants}
                            
                                        className="px-2 md:px-4"
                                    >
                                        <Link href={`/product/${encodeURIComponent(product.category.toLowerCase()).replace(/%20/g, '-')}/${encodeURIComponent(product.name.toLowerCase()).replace(/%20/g, '-')}/${product.id}`} passHref>
                                            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                                                <div className='px-4 flex justify-center items-center min-h-[150px]'>
                                                    <motion.img
                                                        src={product.image ? `https://nexiblesapp.barecms.com/uploads/${product.image}` : '/placeholder.png'}
                                                        alt={product.name}
                                                        className="max-h-64 object-contain"
                                                        whileHover={{ scale: 1.08 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                </div>
                                                <p className="text-center text-gray-800 font-semibold my-4">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </Slider>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Popularproducts;