import Link from "next/link";
import Image from "next/image";

const AllCategoryCards = ({ categoryData }) => {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  // Take the first three items from categoryData for the 3-box grid
  const topThreeCategories = categoryData.slice(0, 3);

  return (
    <div className="h-auto bg-white">
      {/* New 3-box grid section */}
      <div className="mb-10 px-4 md:px-64">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left box (full height of the row) - First category */}
          <div className="bg-gray-200 rounded-lg p-6 text-center relative h-full">
            <Link href={`/category/${topThreeCategories[0].cat_url}`} passHref>
              <div className="relative w-full h-72 md:h-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/${topThreeCategories[0].bg_Img}`}
                  alt={topThreeCategories[0].name}
                  className="rounded-lg object-contain"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Link>
            <p className="text-gray-900 font-semibold absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full">
              {topThreeCategories[0].name}
            </p>
          </div>
          {/* Right side (two boxes split vertically) */}
          <div className="grid grid-cols-1 md:grid--2 gap-6">
            {/* Second category */}
            <div className="bg-gray-200 rounded-lg p-6 text-center relative">
              <Link
                href={`/category/${topThreeCategories[1].cat_url}`}
                passHref
              >
                <div className="relative w-full h-[240px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/${topThreeCategories[1].bg_Img}`}
                    alt={topThreeCategories[1].name}
                    className="rounded-lg object-contain"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Link>
              <p className="text-gray-900 font-semibold mt-2">
                {topThreeCategories[1].name}
              </p>
            </div>
            {/* Third category */}
            <div className="bg-gray-200 rounded-lg p-6 text-center relative">
              <Link
                href={`/category/${topThreeCategories[2].cat_url}`}
                passHref
              >
                <div className="relative w-full h-[240px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/${topThreeCategories[2].bg_Img}`}
                    alt={topThreeCategories[2].name}
                    className="rounded-lg object-contain"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Link>
              <p className="text-gray-900 font-semibold mt-2">
                {topThreeCategories[2].name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* All Categories title */}
      <div className="px-4 md:px-64 mb-10">
        <p className="text-center text-[30px] md:text-[60px] font-semibold">All Categories</p>
      </div>

      {/* Existing category cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-4 md:px-64">
        {categoryData.map((category) => (
          <div key={category.id} className="mt-4">
            <div className="rounded-full text-left p-2 transition-all duration-300 border border-gray-300 shadow-md hover:shadow-2xl hover:-translate-y-1">
              <Link href={`/category/${category.cat_url}`} passHref>
                <div className="w-auto h-[150px] md:h-[250px] relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/${category.bg_Img}`}
                    alt={category.name}
                    className="rounded-md object-contain transition-transform duration-300 hover:scale-105 p-2 md:p-4"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Link>
            </div>
            <p className="text-gray-900 font-semibold text-sm md:text-base text-center py-2 md:py-4">
              {category.name}
            </p>
          </div>
        ))}
      </div>

      <div className="py-10 px-4 md:px-64 mt-10 relative bg-gray-300">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8 z-10 relative">
          Key Product Features
        </h2>
        <div
          className="absolute px-6 inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1200x600')",
          }} // Replace with your background image URL
        ></div>
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Feature 1",
              "Feature 2",
              "Feature 3",
              "Feature 4",
              "Feature 5",
              "Feature 6",
            ].map((feature, index) => (
              <div
                key={index}
                className=" p-6 text-center  transition-all duration-300 hover:-translate-y-2 bg-opacity-90 flex flex-col justify-center items-center"
              >
                <div className="w-1/2  h-48 bg-gray-400 rounded-lg mb-4"></div>{" "}
                {/* Placeholder for image */}
                <p className="text-gray-900 font-semibold">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategoryCards;