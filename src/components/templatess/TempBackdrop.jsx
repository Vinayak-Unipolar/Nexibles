import Image from "next/image";

const TempBackdrop = () => {
    return (
        <div className="relative md:h-[450px] h-[300px]">
            <div className="absolute inset-0">
                <Image
                    src="/cards/visitingcard.webp" 
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    className=""
                />
            </div>
            <div className="absolute top-1/2 md:left-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-start">
                <h2 className="md:text-5xl text-3xl font-bold text-white">Browse Templates</h2>
            </div>
        </div>
    );
};

export default TempBackdrop;
