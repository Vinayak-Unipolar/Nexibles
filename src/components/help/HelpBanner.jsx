export default function HelpBanner() {
    return (
        <>
            <div className="relative">
                <img src="/help/help-center.jpg" alt="banner" className="w-full md:h-[400px] h-[200px]" />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                    <h2 className="md:text-5xl text-2xl md:font-bold font-semibold">Help Center</h2>
                </div>
            </div>
        </>
    )
}