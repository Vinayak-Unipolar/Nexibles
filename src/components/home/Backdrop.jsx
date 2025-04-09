import Link from "next/link";

export default function Backdrop() {
    return (
        <div className="relative">
            <img
                src="/home/HomeHeaderBanner.jpg"
                alt="Header Banner"
                className="w-full h-[450px] object-cover"
            />

            <div className="absolute bottom-10 left-0 right-0 py-6 px-4 md:px-28">
                <p className="mb-2 text-3xl md:text-5xl text-gray-800">One Stop <span className="font-bold uppercase"> Shop </span><span className="inline-block w-5 h-2 bg-red-500"></span></p>
                <p className="text-lg md:text-2xl text-white">for all your print & packaging needs...</p>
                <p className="mb-2 text-base md:text-xl text-gray-800">customise your business stationery now!!</p>
                <Link href="/all-category">
                    <button className="bg-white text-gray-500 w-52 md:w-44 py-2 px-6 font-semibold rounded-full uppercase">order now</button>
                </Link>
            </div>
        </div>
    );
}
