import { GrFormNext } from "react-icons/gr";
import Link from "next/link";

export default function HeadingRoutes() {
  return (
    <div className="h-14 bg-white md:py-8 mt-6 px-12">
      <div className="flex items-start justify-start px-2 sm:px-8">
        <div className="flex items-center">
          {/* Home Link */}
          <Link href="/">
            <p className="text-black text-sm font-semibold cursor-pointer z-30">Home</p>
          </Link>
          <GrFormNext className="text-gray-500 mx-2 z-30" size={20} />
        </div>
        <div className="flex items-center">
          {/* Shop Link */}
          <Link href="/shop">
            <p className="text-black text-sm font-semibold cursor-pointer z-30">Shop</p>
          </Link>
          <GrFormNext className="text-gray-500 mx-2 z-30" size={20} />
        </div>
        {/* All Categories Link */}
        <Link href="/all-categories">
          <p className="text-gray-600 text-sm font-semibold cursor-pointer z-30">All Categories</p>
        </Link>
      </div>
    </div>
  );
}