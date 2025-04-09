import { FiCheckCircle } from "react-icons/fi";
import Image from "next/image";

const MiddleSection = () => {
    return (
        <div>
            <div className="h-auto bg-white">
                <div className="px-6 md:px-20 py-14">

                    <h3 className="text-blue-900 font-bold text-3xl mb-14 text-center">Production grade Web-to-print platform</h3>

                    <div className="flex flex-col md:flex-row md:justify-around">

                        <div className="group cursor-pointer mb-8 md:mb-0 text-center md:text-left">
                            <p className="text-gray-400 group-hover:text-purple-800 transition-colors duration-300 font-bold text-5xl mb-6">01</p>
                            <h3 className="text-gray-700 font-semibold mb-1">Print-Ready Vector PDF</h3>
                            <p className="text-gray-700 text-sm">You get high resolution print-ready PDF<br />with crisp, clean vector elements in either<br />CMYK or RGB format. In addition, you<br />can download as JPEG or PNG</p>
                        </div>

                        <div className="group cursor-pointer mb-8 md:mb-0 text-center md:text-left">
                            <p className="text-gray-400 group-hover:text-purple-800 transition-colors duration-300 font-bold text-5xl mb-6">02</p>
                            <h3 className="text-gray-700 font-semibold mb-1">Global Scale</h3>
                            <p className="text-gray-700 text-sm">PitchPrint is built on AWS Serverless<br />Cloud, which vastly scales to<br />accommodate billion of requests.<br />Anytime, seamlessly.</p>
                        </div>

                        <div className="group cursor-pointer mb-8 md:mb-0 text-center md:text-left">
                            <p className="text-gray-400 group-hover:text-purple-800 transition-colors duration-300 font-bold text-5xl mb-6">03</p>
                            <h3 className="text-gray-700 font-semibold mb-1">Completely Customizable</h3>
                            <p className="text-gray-700 text-sm">From the theme, fonts, images to<br />layouts, you can undress every pixel and<br />fully customize the app to blend into<br />your website&apos;s look + feel.</p>
                        </div>

                        <div className="group cursor-pointer text-center md:text-left">
                            <p className="text-gray-400 group-hover:text-purple-800 transition-colors duration-300 font-bold text-5xl mb-6">04</p>
                            <h3 className="text-gray-700 font-semibold mb-1">Continuous Updates</h3>
                            <p className="text-gray-700 text-sm">We innovate every day and with the help<br />of our customers, have built and keep<br />building the product to be the best.<br />We don&apos;t settle!</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* <div className="h-auto bg-gray-100">
                <div className="flex flex-col md:flex-row py-14 px-20">

                    <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0 hidden md:block">
                        <Image
                            src="/home/spark.png"
                            alt="spark"
                            width={500}
                            height={100}
                            priority
                            className=""
                        />
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <div className="text-center md:text-left">
                            <p className="text-gray-700 font-semibold mb-2">SPARK</p>
                            <h3 className="text-gray-700 text-3xl font-bold mb-6">Powerful Print API</h3>
                            <p className="text-gray-700">
                                An API that allows you to programmatically create multiple print-ready PDF files without launching the design editor. <br /> <br />
                                Spark is designed for creating print files on the fly, replacing texts and images per copy. <br /> <br />
                                Consider scenarios where busy clients like Estate Agents who periodically need business cards,
                                Party Planners who need to get those banners with no fuss or Direct Mail markers who need to automate their processes,
                                Corporate gift items with personalizable prints.
                                You simply send their details to the API and it will reply with crisp PDF files ready for print <br /> <br />
                                In just 3 steps, you can have the Print-ready PDF delivered automatically to your printer.
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    )
}
export default MiddleSection;