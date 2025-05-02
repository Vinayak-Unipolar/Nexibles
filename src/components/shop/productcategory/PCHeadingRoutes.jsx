import { GrFormNext } from "react-icons/gr";
import Link from "next/link";

export default function PCHeadingRoutes({ productDetails }) {
  const categoryName = productDetails.product ? productDetails.product.category : '';
  const encodedCategory = encodeURIComponent(categoryName.toLowerCase()).replace(/%20/g, '-');

  return (
    <div className="h-14 bg-white py-14 mt-[0.8rem] ">
      <div className="flex flex-wrap items-center justify-start px-4 py-3 border-t border-gray-300 sm:px-8 ">
        {/* Home Link */}
        <Link href="/" className="text-sm font-semibold text-gray-600 cursor-pointer md:text-sm">
          Home
        </Link>
        <GrFormNext className="mx-2 text-gray-500" size={20} />

        {/* Products Link */}
        <Link href="/shop" className="text-sm font-semibold text-gray-600 cursor-pointer md:text-sm">
          Products
        </Link>
        <GrFormNext className="mx-2 text-gray-500" size={20} />

        {/* Category Link */}
        <Link href={`/category/${encodedCategory}`}>
          <div className="flex items-center">
            <p className="mr-2 text-sm font-semibold text-gray-600 cursor-pointer md:text-sm">
              {productDetails.product ? productDetails.product.category : ''}
            </p>
            <GrFormNext className="text-gray-500" size={20} />
          </div>
        </Link>

        {/* Product Name (Current Page) */}
        <p className="ml-2 text-sm font-semibold text-black cursor-pointer md:text-sm">
          {productDetails.product ? productDetails.product.name : ''}
        </p>
      </div>
    </div>
  );
}