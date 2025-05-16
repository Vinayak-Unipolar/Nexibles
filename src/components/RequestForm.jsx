"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { X } from "lucide-react";

function RequestForm({ isOpen, onClose, initialCategory = "" }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    languagePreference: "",
    industry: "",
    category: initialCategory, // Initialize with the passed initialCategory
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
    requestSampleKit: false,
    gst_in: "", 

  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

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

  const languages = ["Hindi", "English", "Marathi", "Gujarati", "Kannada"];

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

  const orderQuantities = [
    "1,000 – 5,000 units",
    "5,000 – 10,000 units",
    "10,000 – 25,000 units",
    "25,000 – 100,000 units",
    "100,000 – 250,000 units",
    "250,000+ units",
  ];

  const packageBuyingHistories = [
    "First Time Packaging Buyer",
    "Switching Packaging Providers",
    "Seeking Additional Packaging Provider",
  ];

  // Update formData.category when initialCategory changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      category: initialCategory,
    }));
  }, [initialCategory]);

  // Fetch categories on component mount
  useEffect(() => {
      const fetchCategories = async () => {
        try {
          setLoadingCategories(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/category_master`,
            {
              headers: {
                "Content-Type": "application/json",
                "API-Key": process.env.NEXT_PUBLIC_API_KEY,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch categories");
          }
          const data = await response.json();
          console.log("Fetched categories:", data);
          if (Array.isArray(data.data)) {
            setCategories(data.data);
          } else {
            console.error("Categories data is not an array:", data);
            setCategories([]);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
          toast.error("Failed to load categories");
          setCategories([]);
        } finally {
          setLoadingCategories(false);
        }
      };
  
      fetchCategories();
    }, []);
    
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "gstin") {
      const formattedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) && value.length > 0) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  useEffect(() => {
    if (formData.requestSampleKit) {
      setFormData((prev) => ({
        ...prev,
        country: "India",
      }));
    }
  }, [formData.requestSampleKit]);

  const calculateTotal = () => {
    if (formData.requestSampleKit) {
      const basePrice = 350;
      const gst = basePrice * 0.18;
      return { basePrice, gst, total: basePrice + gst };
    }
    return null;
  };

  const total = calculateTotal();

  const createOrder = async () => {
    if (isProcessingOrder) return false;
    setIsProcessingOrder(true);

    try {
      const orderNo = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const orderDate = new Date().toISOString();
      const finalTotal = total ? total.total.toFixed(2) : "413.00";
      const requestBody = {
        orderNo,
        orderDate,
        pmtMethod: "PhonePe",
        customerID: `CUST-${Date.now()}`,
        salutation: "",
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.phone,
        eMail: formData.email,
        street: formData.streetAddress,
        address: `${formData.streetAddress}, ${formData.addressLine2}`,
        city: formData.city,
        state: formData.state,
        company: formData.companyName,
        zipcode: formData.zipPostalCode,
        country: formData.country,
        remark: formData.projectDescription,
        coupon: "",
        currency: "",
        invamt: finalTotal,
        tax: total ? total.gst.toFixed(2) : "63.00",
        ordstatus: "",
        discount: "0",
        disamt: "0",
        promoDiscount: "0",
        minDeliveryAmt: finalTotal,
        orderCharge: "0.00",
        ipAddress: "",
        confirm_status: "0",
        origin: "Nexibles",
        orderDetails: await getRequestFormOrderDetails(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/createorder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "API-Key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const responseData = await response.json();
      if (responseData.success === true) {
        if (typeof window !== "undefined")
          localStorage.setItem("orderNo", responseData.orderNo);
        return { success: true, orderNo: responseData.orderNo };
      } else {
        throw new Error(responseData.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Error in createOrder:", error);
      return { success: false, error };
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const getRequestFormOrderDetails = async () => {
    return [
      {
        id: 0,
        name: "Nexibles Sample Kit",
        price: "413.00",
        quantity: 1,
        payment_status: "pending",
        discountAmount: "0.00",
        discountPercentage: "0.00",
        discountedPrice: "0.00",
        product_config_id: null,
        product_option_id: null,
        origin: "Nexibles Website",
        skuCount: 1,
        material: "",
        total_cost: "413.00",
      },
    ];
  };

  const makePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const leadData = {
        full_name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName,
        language_preference: formData.languagePreference,
        website_url: formData.companyWebsite,
        industry_sector: formData.industry,
        category: formData.category,
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
        request_sample_kit: formData.requestSampleKit,
        gstin: formData.gst_in || "",
      };
      const emailData = {
        clientName: `${formData.firstName} ${formData.lastName}`.trim(),
        clientEmail: formData.email,
        phone: formData.phone,
        message:`
          ${formData.projectDescription || "Not provided"}`
      };

      console.log("Submitting leadData in makePayment:", leadData);

      const leadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "API-Key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(leadData),
        }
      );

      if (!leadResponse.ok) {
        const errorData = await leadResponse.json();
        throw new Error(errorData.message || "Failed to save lead");
      }

      const emailResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "API-Key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(emailData),
        }
      );

      if (!emailResponse.ok) {
        const emailError = await emailResponse.json();
        throw new Error(emailError.error || "Failed to send emails");
      }

      const orderResult = await createOrder();
      if (!orderResult.success) {
        throw new Error("Failed to create order");
      }

      const amount = total ? total.total : 413;
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Invalid total price for payment");
      }

      const baseUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_API_URL;

      const transactionId = "T" + Date.now();
      const orderNo = orderResult.orderNo;

      const data = {
        orderNo,
        name: formData.firstName,
        number: formData.phone,
        MUID: `CUST-${Date.now()}`,
        amount: Math.round(amount * 100),
        transactionId,
        redirectUrl: `${baseUrl}/api/check-status?transactionId=${transactionId}&url=${baseUrl}`,
      };

      const paymentResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
        data
      );
      if (typeof window !== "undefined")
        window.location.href = paymentResponse.data.url;
    } catch (error) {
      setLoading(false);
      console.error("Error processing payment:", error);
      toast.error(`Failed: ${error.message}`);
      setSubmitStatus(`Failed: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.requestSampleKit && !termsAccepted) {
      setSubmitStatus("Please accept the Terms and Conditions.");
      return;
    }
    if (formData.requestSampleKit) {
      makePayment(e);
    } else {
      const leadData = {
        full_name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName,
        language_preference: formData.languagePreference,
        website_url: formData.companyWebsite,
        industry_sector: formData.industry,
        category: formData.category,
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
        request_sample_kit: formData.requestSampleKit,
        gst_in: formData.gst_in || "",
      };

      console.log("Submitting leadData:", leadData);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify(leadData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.message || "Network response was not ok");
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Lead submission response:", data);
          setSubmitStatus("Form submitted successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            companyName: "",
            languagePreference: "",
            industry: "",
            category: "",
            companyWebsite: "",
            streetAddress: "",
            addressLine2: "",
            city: "",
            state: "",
            zipPostalCode: "",
            country: "",
            gstin: "",
            orderQuantity: "",
            packageBuyingHistory: "",
            projectDescription: "",
            requestSampleKit: false,
          });
          setTermsAccepted(false);
          onClose();
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          setSubmitStatus(`Failed to submit form: ${error.message}`);
        });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full h-full max-h-full sm:max-w-4xl sm:h-auto bg-[#ece0cc] sm:rounded-lg sm:shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-4 text-black text-2xl font-bold focus:outline-none"
            >
              <X />
            </button>
            <div className="p-4 sm:p-6 lg:p-8">
              <h2 className="pb-2 mb-4 text-xl font-semibold text-black border-b-2 border-black sm:text-2xl">
                Request A Free Quote
              </h2>

              {submitStatus && (
                <div
                  className={`mb-4 p-4 rounded text-sm sm:text-base ${
                    submitStatus.includes("success")
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {submitStatus}
                </div>
              )}

              <form onSubmit={handleSubmit}>
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
                        className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md sm:mt-1 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

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
                      className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
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
                      className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                      required
                      maxLength={10}
                    />
                  </div>
                </div>

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
                      className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black sm:text-md">
                      Language Preference *
                    </label>
                    <select
                      name="languagePreference"
                      value={formData.LlanguagPreference}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none"
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

                <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-black sm:text-md">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none"
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
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none"
                      required
                      disabled={loadingCategories}
                    >
                      <option value="" className="text-gray-900">
                        {loadingCategories
                          ? "Loading categories..."
                          : "Please select..."}
                      </option>
                      {loadingCategories ? null : Array.isArray(categories) &&
                        categories.length > 0 ? (
                        categories.map((category) => (
                          <option
                            key={category.id}
                            value={category.name}
                            className="text-gray-900"
                          >
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option value="" className="text-gray-900" disabled>
                          No categories available
                        </option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
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
                      className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                    />
                  </div>
                </div>

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

                <div className="flex items-center gap-4 mt-6 mb-4">
                  <span className="text-lg font-semibold">Request Sample Kit</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        requestSampleKit: !prev.requestSampleKit,
                      }))
                    }
                    className={`relative inline-flex items-center h-7 w-14 rounded-full shadow-inner transition-colors duration-300 focus:outline-none ring-2 ring-offset-1 ${
                      formData.requestSampleKit ? "bg-red-500 ring-red-300" : "bg-gray-300 ring-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block w-6 h-6 transform rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
                        formData.requestSampleKit ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>


                {formData.requestSampleKit && (
                  <>
                    <h3 className="pb-2 mb-4 text-sm font-semibold text-black border-b-2 border-black sm:text-xl">
                      Packaging Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-black sm:text-md">
                          Order Quantity 
                        </label>
                        <select
                          name="orderQuantity"
                          value={formData.orderQuantity}
                          onChange={handleChange}
                          className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none"
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
                          Package Buying History 
                        </label>
                        <select
                          name="packageBuyingHistory"
                          value={formData.packageBuyingHistory}
                          onChange={handleChange}
                          className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none"
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
                        className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                        placeholder="Address Line 2"
                        className="w-full p-2 mt-3 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                      />
                      <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-3">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                          className="w-full p-2 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                          required
                        />
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="State"
                          className="w-full p-2 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                          required
                        />
                        <input
                          type="text"
                          name="zipPostalCode"
                          value={formData.zipPostalCode}
                          onChange={handleChange}
                          placeholder="ZIP / Postal Code"
                          className="w-full p-2 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                          required
                          maxLength={6}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-black sm:text-md">
                          GSTIN
                        </label>
                        <input
                          type="text"
                          name="gstin"
                          value={formData.gst_in || ""}
                          onChange={handleChange}
                          placeholder="Enter GSTIN (optional)"
                          className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black sm:text-md">
                          Country *
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none"
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
                    </div>

                    {total && (
                      <div className="mb-4 rounded-md">
                        <p className="text-sm font-medium text-gray-800">
                          Sample Kit Details:
                        </p>
                        <p className="text-sm text-gray-600">
                          Base Price: ₹{total.basePrice}
                        </p>
                        <p className="text-sm text-gray-600">
                          GST (18%): ₹{total.gst.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Shipping is included in the price.
                        </p>
                      </div>
                    )}

                    <div className="mb-4 flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="termsAccepted"
                          name="termsAccepted"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="sr-only"
                          required
                        />
                        <span
                          className={`relative inline-block w-6 h-6 mr-2 rounded-md border-2 border-black bg-transparent transition-all duration-200 ease-in-out
                            ${termsAccepted ? "bg-[#103b60]" : ""}`}
                        >
                          {termsAccepted && (
                            <svg
                              className="absolute w-4 h-4 text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4 10-10"
                              />
                            </svg>
                          )}
                        </span>
                        <span className="text-md font-semibold text-black">
                          I agree to the{" "}
                          <Link
                            href="/terms-conditions"
                            className="underline text-blue-600 hover:text-blue-800"
                          >
                            Terms and Conditions
                          </Link>
                        </span>
                      </label>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={
                    loading || (formData.requestSampleKit && !termsAccepted)
                  }
                  className={`w-full bg-[#103b60] text-white p-2 rounded-md focus:outline-none text-sm sm:text-base ${
                    loading || (formData.requestSampleKit && !termsAccepted)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loading
                    ? "Processing..."
                    : formData.requestSampleKit
                    ? `Pay ₹${total ? total.total.toFixed(0) : 413}`
                    : "Submit"}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RequestForm;