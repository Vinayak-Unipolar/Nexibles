import Image from "next/image";

const CardBanner = ({category,productDetails}) => {
    const filterCategoryname = decodeURIComponent(category);

    return (
        <div className="relative h-[350px] md:h-[400px] lg:h-[450px]">
            <div className="absolute inset-0">
                <Image
                    src="/cards/visitingcard.webp"
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    className=""
                />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-start">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white-1 whitespace-nowrap">
                {productDetails?.name || filterCategoryname   }
               </h2>
            </div>

        </div>
    );
};

export default CardBanner;
