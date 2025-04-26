"use client";
import React, { useState } from "react";

function RequestForm() {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    languagePreference: "",
    industry: "",
    companyWebsite: "",
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    zipPostalCode: "",
    country: "",
    orderQuantity: "",
    packageBuyingHistory: "",
    projectDescription: "",
  });

  // State to manage submission status and messages
  const [submitStatus, setSubmitStatus] = useState(null);
  const [emailError, setEmailError] = useState("");

  // List of all countries
  const countries = [
    "India",
    "United Arab Emirates",
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  // Options for Language Preference
  const languages = ["English", "French", "German", "Polish", "Indonesian"];

  // Options for Industry
  const industries = [
    "Beverages",
    "Bread and other Bakery",
    "Candy and other Confection",
    "Child Resistant",
    "Coffee and Tea",
    "Condiments, Sauces, Seasonings, and Spices",
    "Co-Packers/Co-Manufacturers",
    "Dairy and Cheese",
    "Distributor/Broker",
    "Frozen Foods",
    "Fruits and Vegetables",
    "Grains, Rice, and Pasta",
    "Health and Beauty",
    "Lawn and Garden",
    "Marketing Agency",
    "Medical",
    "Non-Food",
    "Nutritional Supplements",
    "Pet and other Animal Food",
    "Prepared Meals",
    "Processed Meats",
    "Printer/Converter",
    "Retail Grocery",
    "Snacks",
    "Tobacco",
  ];

  // Options for Order Quantity
  const orderQuantities = [
    "1,000 – 5,000 units",
    "5,000 – 10,000 units",
    "10,000 – 25,000 units",
    "25,000 – 100,000 units",
    "100,000 – 250,000 units",
    "250,000+ units",
  ];

  // Options for Package Buying History
  const packageBuyingHistories = [
    "First Time Packaging Buyer",
    "Switching Packaging Providers",
    "Seeking Additional Packaging Provider",
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
      if (!emailRegex.test(value) && value.length > 0) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError(""); // Clear error if valid
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Transform formData to match the database schema
    const leadData = {
      full_name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      company_name: formData.companyName,
      language_preference: formData.languagePreference,
      website_url: formData.companyWebsite,
      industry_sector: formData.industry,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      street_address: formData.streetAddress,
      address_line_2: formData.addressLine2,
      zip_postal_code: formData.zipPostalCode,
      products_interested_in: formData.projectDescription,
      quote_quantity: formData.orderQuantity,
      package_buying_history: formData.packageBuyingHistory,
      enquiry_source: "Nexibles Website",
    };

    // Send POST request to the backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSubmitStatus("Form submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          companyName: "",
          languagePreference: "",
          industry: "",
          companyWebsite: "",
          streetAddress: "",
          addressLine2: "",
          city: "",
          state: "",
          zipPostalCode: "",
          country: "",
          orderQuantity: "",
          packageBuyingHistory: "",
          projectDescription: "",
        }); // Reset form

        // Scroll to the top of the page to show the success message
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Smooth scrolling for better UX
        });
      })
      .catch((error) => {
        setSubmitStatus(`Failed to submit form: ${error.message}`);
      });
  };

  return (
    <div className="py-4 sm:py-8 bg-[#ece0cc] min-h-screen">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Side: Form */}
          <div className="lg:col-span-2">
            <h2 className="pb-2 mb-4 text-xl font-semibold text-black border-b-2 border-black sm:text-2xl border-black-500">
              Request A Free Quote
            </h2>

            {submitStatus && (
              <div
                className={`mb-4 muslim:p-4 p-4 rounded text-sm sm:text-base ${
                  submitStatus.includes("success")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submitStatus}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name Section */}
              <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-1">
                <div>
                  <label className="block text-sm font-medium text-black sm:text-md">
                    Name *
                  </label>
                  <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none "
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md sm:mt-1 focus:outline-none "
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email and Phone Section */}
              <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-black sm:text-md">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none "
                    required
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-500">{emailError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-black sm:text-md">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none "
                    required
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Company Name and Language Preference Section */}
              <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-black sm:text-md">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none "
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black sm:text-md">
                    Language Preference *
                  </label>
                  <select
                    name="languagePreference"
                    value={formData.languagePreference}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none "
                    required
                  >
                    <option value="" className="text-gray-900">
                      Please select...
                    </option>
                    {languages.map((language) => (
                      <option
                        key={language}
                        value={language}
                        className="text-gray-900"
                      >
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Industry and Company Website Section */}
              <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-black sm:text-md">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none "
                    required
                  >
                    <option value="" className="text-gray-900">
                      Please select...
                    </option>
                    {industries.map((industry) => (
                      <option
                        key={industry}
                        value={industry}
                        className="text-gray-900"
                      >
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black sm:text-md">
                    Company Website
                  </label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://"
                    className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none "
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-black sm:text-md">
                  Address *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none "
                  required
                />
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="Address Line 2"
                  className="w-full p-2 mt-3 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none "
                />
                <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-3">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full p-2 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none "
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full p-2 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none "
                    required
                  />
                  <input
                    type="text"
                    name="zipPostalCode"
                    value={formData.zipPostalCode}
                    onChange={handleChange}
                    placeholder="ZIP / Postal Code"
                    className="w-full p-2 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none "
                    required
                    maxLength={6}
                  />
                </div>
              </div>

              {/* Country Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-black sm:text-md">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none "
                  required
                >
                  <option value="" className="text-gray-900">
                    Please select...
                  </option>
                  {countries.map((country) => (
                    <option
                      key={country}
                      value={country}
                      className="text-gray-900"
                    >
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Packaging Information Section */}
              <h3 className="pb-2 mb-4 text-lg font-semibold text-black border-b-2 border-black sm:text-xl">
                Packaging Information
              </h3>
              <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-black sm:text-md">
                    Order Quantity *
                  </label>
                  <select
                    name="orderQuantity"
                    value={formData.orderQuantity}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none "
                    required
                  >
                    <option value="" className="text-gray-900">
                      Please select...
                    </option>
                    {orderQuantities.map((quantity) => (
                      <option
                        key={quantity}
                        value={quantity}
                        className="text-gray-900"
                      >
                        {quantity}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black sm:text-md">
                    Package Buying History *
                  </label>
                  <select
                    name="packageBuyingHistory"
                    value={formData.packageBuyingHistory}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none "
                    required
                  >
                    <option value="" className="text-gray-900">
                      Please select...
                    </option>
                    {packageBuyingHistories.map((history) => (
                      <option
                        key={history}
                        value={history}
                        className="text-gray-900"
                      >
                        {history}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project Description Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-black sm:text-md">
                  Describe Your Project
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Examples: pouch type and size, fill weight, preferred finish, and material type."
                  className="w-full h-24 p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none sm:h-32"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#103b60] text-white p-2 rounded-md focus:outline-none  text-sm sm:text-base"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right Side: Sample Text */}
          <div className="p-6 bg-white rounded-lg shadow-md lg:col-span-1">
            <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b-2 border-orange-500">
              Do More With Nexibles
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  Industry Leading Turnaround Times
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  We pride ourselves on turnaround times as fast as 15 days from
                  artwork approval (as fast as 10 days for rollstock) with our
                  Nexibles Record Flexible Packaging Solution.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  A Truly Global Print Network
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Our print capabilities include 25 locations across the globe
                  with a capacity of 8 million linear feet per day.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  Transparent MOQs
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Our minimum order quantities are easy to understand with no
                  hidden fees or gotchas.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  Digital Capabilities At Flexo Prices
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  The flexibility that digital printing offers with prices
                  competitive with flexographic printers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestForm;