import TempCards from "@/components/templatess/TempCards"
import FilterTemplates from "@/components/templatess/FilterTemplates"
import Navbar from "@/components/shop/Navbar"
import Footer from "@/components/shop/Footer"
import TempBackdrop from "@/components/templatess/TempBackdrop"

export default function page() {
    return (
        <div>
            <Navbar />
            <TempBackdrop />
            <div className="md:flex justify-evenly">
                <div className="md:w-1/3 w-full bg-white">
                    <FilterTemplates />
                </div>
                <div className="w-2/2">
                    <TempCards />
                </div>
            </div>
            <Footer />
        </div>
    )
}