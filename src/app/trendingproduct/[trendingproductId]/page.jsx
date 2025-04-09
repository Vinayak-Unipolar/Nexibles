//trendingproduct/[trendingproductId]//page.jsx
'use client'
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import CardDetail from '@/components/shop/trendingproducts/TrendingcardDetail';
import Cardbanner from "@/components/shop/productcategory/Cardbanner";
import RelatedCategory from '@/components/shop/unused/Relatedcategory';

const ProductPage = () => {

    return (
        <div>
            <Navbar />
            <Cardbanner />
            <CardDetail />
            <RelatedCategory />
            <Footer />
        </div>
    );
};

export default ProductPage;
