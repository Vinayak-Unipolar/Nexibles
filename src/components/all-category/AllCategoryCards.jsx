import Link from "next/link";
import Image from "next/image";

const AllCategoryCards = ({ categoryData }) => {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const NEXI_CDN_URL = process.env.NEXT_NEXIBLES_CDN_URL || "https://cdn.nexibles.com";

  // Take the first three items from categoryData for the 3-box grid
  const topThreeCategories = categoryData.slice(0, 3);

  // Helper function to determine image URL with format fallback
  const getImageUrl = (imageName) => {
    if (!imageName || !NEXI_CDN_URL) return "/placeholder.png";

    // Remove any existing extension if present
    const baseImageName = imageName.replace(/\.(webp|png)$/i, "");

    // Try .webp first, then .png
    const extension = ".webp"; // Default to .webp
    return `${NEXI_CDN_URL}/features/${baseImageName}${extension}`;
  };

  return (
    <div className="h-auto bg-white">
      {/* All Categories title */}
      <div className="px-4 mb-10 md:px-64">
        <p className="text-center text-[30px] md:text-[40px] font-semibold">
          All Pouches
        </p>
      </div>

      {/* Existing category cards */}
      <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-5 md:px-20">
        {categoryData.map((category) => (
          <div key={category.id} className="flex flex-col items-center mt-4">
            <div
              className="relative w-32 h-32 overflow-hidden transition-all duration-300 rounded-lg hover:shadow-lg hover:-translate-y-1 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-72"
            >
              <Link href={`/category/${category.cat_url}`} passHref>
                <Image
                  src={`${NEXI_CDN_URL}/category/${category.bg_Img}`}
                  alt={category.name}
                  className="object-contain transition-transform duration-300 hover:scale-105"
                  layout="fill"
                  objectFit="contain"
                />
              </Link>
            </div>
            <p className="py-2 text-xs font-semibold text-center text-gray-900 sm:text-sm md:text-base md:py-3">
              {category.name}
            </p>
          </div>
        ))}
      </div>

      {/* Key Product Features Section */}
      <div className="px-4 py-10 mt-10 md:px-16">
        <h2 className="mb-8 text-2xl font-semibold text-center md:text-3xl">
          Key Product Features
        </h2>
        <div className="flex justify-center">
          <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-3">
            {[
              { title: "Top-Quality Lamination", image:`${process.env.NEXT_PUBLIC_CDN_URL}/topqualitylamination.png` },
              { title: "Easy Customization", image:`${process.env.NEXT_PUBLIC_CDN_URL}/easycustomization.png` },
              { title: "360-degree Coverage", image:`${process.env.NEXT_PUBLIC_CDN_URL}/degree.png` },
              { title: "Highly Adaptable", image:`${process.env.NEXT_PUBLIC_CDN_URL}/highlyadaptable.png`},
              { title: "Cap sleeves", image:`${process.env.NEXT_PUBLIC_CDN_URL}/capsleeves.png`},
              { title: "Finish Options", image:`${process.env.NEXT_PUBLIC_CDN_URL}/finishoptions.png` },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-full p-4 transition-all duration-300 bg-white hover:-translate-y-2 hover:shadow-lg md:aspect-square"
              >
                <div className="relative w-24 h-24 mb-3 md:w-52 md:h-52">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p className="font-semibold text-center text-gray-900 text-md">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategoryCards;