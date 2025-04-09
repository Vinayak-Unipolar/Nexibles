const Askusanything = () => {
    return (
        <div>
    <div className="bg-white h-auto">

        {/* Content Section */}
        <div className="md:flex px-6 md:px-20 py-20">

            {/* Left Section */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center items-center">
                <div>
                    <h2 className="text-gray-800 font-bold">ASK US ANYTHING</h2> <br />
                    <p className="text-gray-800 font-semibold">
                        Do you print Wedding Invitations, Greeting Cards, T-shirts, Banners, Phone Casings, Envelopes, Loyalty Cards, Restaurant Menus, Burial Programmes, Wine Labels, Wall Murals, Vehicle Decals, Sport Jerseys, etc?
                    </p> <br />
                    <p className="text-gray-800 font-semibold">
                        We hold periodic webinars. You can sign up for one or schedule a one-on-one tour of the application.
                    </p>
                    <br />
                    <button className="px-6 py-2 bg-red-1 text-white">Request A Free Demo</button>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <div className="flex flex-col md:flex-row gap-x-8">

                    <div className="mb-4 md:mb-0">
                        <h2 className="bg-purple-700 px-3 py-1 text-white">AUTOMATION</h2>
                        <p className="text-gray-400 text-3xl font-bold items-center flex justify-center mt-1">100%</p>
                    </div>

                    <div className="mb-4 md:mb-0">
                        <h2 className="bg-yellow-500 px-3 py-1 text-white">SUPPORT</h2>
                        <p className="text-gray-400 text-3xl font-bold items-center flex justify-center mt-1">24/7</p>
                    </div>

                    <div>
                        <h2 className="bg-sky-500 px-3 py-1 text-white">LIVE STORES</h2>
                        <p className="text-gray-400 text-3xl font-bold items-center flex justify-center mt-1">1,500+</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

    )
}
export default Askusanything;