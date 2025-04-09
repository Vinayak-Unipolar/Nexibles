'use client'
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import PopularcardDetail from '@/components/shop/popularproducts/PopularcardDetail';
import Cardbanner from "@/components/shop/productcategory/Cardbanner";
import RelatedCategory from '@/components/shop/unused/Relatedcategory';

const ProductPage = () => {

    return (
        <div>
            <Navbar />
            <Cardbanner />
            <PopularcardDetail />
            <RelatedCategory />
            <Footer />
        </div>
    );
};

export default ProductPage;
