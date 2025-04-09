import { GrFormNext } from "react-icons/gr";
import Link from "next/link";

export default function PCHeadingRoutes({ productDetails }) {
  const categoryName = productDetails.product ? productDetails.product.category : '';
  const encodedCategory = encodeURIComponent(categoryName.toLowerCase()).replace(/%20/g, '-');

  return (
    <div className="h-14 bg-white py-14 mt-[1.5rem] ">
      <div className="flex flex-wrap items-center justify-start px-4 sm:px-8 py-3 border-t border-gray-300 ">
        {/* Home Link */}
        <Link href="/" className="text-gray-600 md:text-sm text-sm font-semibold cursor-pointer">
          Home
        </Link>
        <GrFormNext className="text-gray-500 mx-2" size={20} />

        {/* Products Link */}
        <Link href="/shop" className="text-gray-600 md:text-sm text-sm font-semibold cursor-pointer">
          Products
        </Link>
        <GrFormNext className="text-gray-500 mx-2" size={20} />

        {/* Category Link */}
        <Link href={`/category/${encodedCategory}`}>
          <div className="flex items-center">
            <p className="text-gray-600 md:text-sm text-sm font-semibold cursor-pointer mr-2">
              {productDetails.product ? productDetails.product.category : ''}
            </p>
            <GrFormNext className="text-gray-500" size={20} />
          </div>
        </Link>

        {/* Product Name (Current Page) */}
        <p className="text-black md:text-sm text-sm font-semibold cursor-pointer ml-2">
          {productDetails.product ? productDetails.product.name : ''}
        </p>
      </div>
    </div>
  );
}