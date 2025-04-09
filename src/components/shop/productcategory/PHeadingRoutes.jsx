import { GrFormNext } from "react-icons/gr";
import Link from 'next/link';
export default function PHeadingRoutes({ product }) {
    const formatCategoryName = (name) => {
        if (!name) return "";
        return name.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const categoryName = product && product.length > 0
        ? formatCategoryName(product[0].category)
        : "";

    return (
        <div className="h-14 bg-white border-t border-gray-300 py-20">
            <div className="flex sm:flex-row items-center justify-start px-4 sm:px-8 py-3">
                <Link href='/shop' className="text-gray-600 text-sm font-semibold">
                    Home
                </Link>
                <GrFormNext className="text-gray-500 mx-2" size={20} />
                <Link href='/all-category' className="text-gray-600 text-sm font-semibold">
                    Products
                </Link>
                <GrFormNext className="text-gray-500 mx-2" size={20} />
                <p className="text-black text-sm font-semibold cursor-pointer mt-1 sm:mt-0">
                    {categoryName}
                </p>
            </div>
        </div>
    );
}