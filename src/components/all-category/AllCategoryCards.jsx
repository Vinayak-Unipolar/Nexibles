import Link from 'next/link';
import Image from 'next/image';

const AllCategoryCards = ({ categoryData }) => {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="h-auto bg-white pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-20">
        {categoryData.map((category) => (
          <div
            key={category.id}
            className="mt-4 text-left p-2 rounded-lg transition-all duration-300 border border-gray-300 shadow-md hover:shadow-2xl hover:-translate-y-1"
          >
            <Link href={`/category/${category.cat_url}`} passHref>
              <div className="w-full h-[150px] md:h-[250px] relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/${category.bg_Img}`}
                  alt={category.name}
                  className="rounded-md object-contain transition-transform duration-300 hover:scale-105 p-2 md:p-4"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="py-2 md:py-4 text-center">
                <p className="text-gray-900 font-semibold text-sm md:text-base">{category.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategoryCards;