import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import React from "react";

const Contact = () => {
  // Custom color variables for consistent usage
  const primaryColor = "#00b08d"; // Teal/mint green
  const secondaryColor = "#662f90"; // Purple

  return (
    <>
      <Navbar />
      {/* Section 1 - Hero Section with Features */}
      <section className="bg-gray-50 py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: primaryColor }}>
              Small Or Big Business?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5">
              Choose Nexibles As Your Flexible Packaging Supplier
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Buy Customised Flexible Packaging Online,
              <br />
              <strong>From 500 Pieces To Thousands</strong>
            </p>

            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-8">
              {[
                "Print Test And On-Demand Ordering For Startups",
                "Short Runs For Small And Medium-Sized Businesses",
                "Best-Turnaround Time For Big Companies",
              ].map((item, index) => (
                <li key={index} className="relative group cursor-pointer w-fit">
                  <span className="transition-colors duration-300 group-hover:text-opacity-80" 
                        style={{ color: "inherit", ":hover": { color: primaryColor } }}>
                    {item}
                  </span>
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                        style={{ backgroundColor: primaryColor }}></span>
                </li>
              ))}
            </ul>

            <button className="text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: primaryColor }}>
              Request Quote
            </button>
          </div>

          <div className="w-full h-64 md:h-96 flex items-center justify-center rounded-lg overflow-hidden bg-white shadow-md">
            <img
              src="/src/assets/images/bg-2.jpg"
              alt="Packaging Visual"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Optimised Packaging Supply",
              subtitle: "Low Minimum Orders",
              desc: "Avoid Large Stocks And Organise Production By Ordering Just What You Need, Even On A Regular Basis.",
            },
            {
              title: "Fast Time To Market",
              subtitle: "Last Minute Supply",
              desc: "Easily Manage Any Urgency Such As Exhibitions Or Low Stock Of The Packs Of Best Selling Products.",
            },
            {
              title: "Simplified Design Management",
              subtitle: "No-Limit Creativity",
              desc: "Create Special Editions, Product Lines Or Flavors Printing From 1 To 20 Designs In One Order, Even In Different Quantities.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border"
              style={{ borderColor: "rgba(0, 176, 141, 0.2)" }}
            >
              <p className="text-xs font-medium mb-2" style={{ color: secondaryColor }}>{card.subtitle}</p>
              <h4 className="font-bold text-xl text-gray-800 mb-3">{card.title}</h4>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 - Quality Assurance */}
      <section className="bg-white w-full py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-64 md:h-96 flex items-center justify-center rounded-lg">
            <img
              src="/src/assets/images/bg-2.jpg"
              alt="Packaging Visual"
              className="object-contain w-full h-full rounded-lg shadow-sm"
            />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5">
              We Help Brands To Package With Quality Stand-Up Pouches
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              You Will Stay On The Safe Side With Our{" "}
              <strong style={{ color: secondaryColor }}>Flexible Packaging</strong> Supply. Let Us Prove It!
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-8">
              {[
                "Stand Up Pouches Made In Italy According To International Safety Standards",
                "Packaging Certified For Food Contact",
                "Recyclable Pouches Available For Environmentally Friendly Packaging",
              ].map((item, index) => (
                <li key={index} className="relative group cursor-pointer w-fit">
                  <span className="transition-colors duration-300 group-hover:text-opacity-80" 
                        style={{ color: "inherit", ":hover": { color: secondaryColor } }}>
                    {item}
                  </span>
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                        style={{ backgroundColor: secondaryColor }}></span>
                </li>
              ))}
            </ul>

            <button className="text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: secondaryColor }}>
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* Section 3 - CTA/Quote Request */}
      <section className="px-6 py-20 md:px-20 w-full" 
               style={{ background: `linear-gradient(to right, rgba(0, 176, 141, 0.1), rgba(102, 47, 144, 0.1))` }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="px-4 md:px-10">
            <p className="text-sm font-semibold mb-2" style={{ color: secondaryColor }}>
              Fill Out The Form
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Find Your Best Price: Request A Quote
            </h2>
            <div className="w-full h-48 md:h-56 flex items-center justify-center rounded-lg">
              <img
                src="/src/assets/images/bg-2.jpg"
                alt="Packaging Visual"
                className="object-contain w-full h-full rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-6 px-4 md:px-10 bg-white p-8 rounded-lg shadow-sm">
            <div className="text-gray-700 space-y-4">
              <p>
                We work with businesses of all sizes to create flexible packaging that meets both budget and branding needs.
              </p>
              <p>
                Our industry specialists will guide you to select the best pouch style, materials, and features tailored to your product.
              </p>
              <p>
                Lets get you started with a personalized quote today.
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: primaryColor }}>
                Request Quote
              </button>
              <button className="bg-white text-gray-800 border font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-gray-50"
                      style={{ borderColor: secondaryColor, color: secondaryColor }}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;