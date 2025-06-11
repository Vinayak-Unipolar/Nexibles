"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { X } from "lucide-react";

function RequestForm({
  isOpen = false,
  onClose = () => {},
  initialCategory = "",
  isModal = true,
  initialSampleKit = false,
  containerClassName = "",
  formClassName = "",
  title = "Request A Free Quote",
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternate_phone: "",
    companyName: "",
    languagePreference: "",
    industry: "",
    category: initialCategory,
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
    requestSampleKit: initialSampleKit,
    gst_in: "",
    pancard: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    alternate_phone: "",
    gst_in: "",
    pancard: "",
    zipPostalCode: "",
    terms: "",
    gstPanCombo: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);

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
    "Garment",
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

  // Validation functions
  const validatePhone = (value) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value)) {
      return "Phone number must be exactly 10 digits.";
    }
    return "";
  };

  const validateAlternatePhone = (value) => {
    if (!value) return "";
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value)) {
      return "Alternate phone number must be exactly 10 digits.";
    }
    return "";
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const validateGSTIN = (value) => {
    if (!value || value.toUpperCase() === "NA") return "";
    const gstRegex = /^[A-Z0-9]{15}$/;
    if (!gstRegex.test(value)) {
      return "GSTIN must be exactly 15 alphanumeric characters.";
    }
    return "";
  };

  const validatePAN = (value) => {
    if (!value || value.toUpperCase() === "NA") return "";
    const panRegex = /^[A-Z0-9]{10}$/;
    if (!panRegex.test(value)) {
      return "PAN Card must be exactly 10 alphanumeric characters.";
    }
    return "";
  };

  const validateZipCode = (value) => {
    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(value)) {
      return "ZIP/Postal Code must be exactly 6 digits.";
    }
    return "";
  };

  const validateGSTPANCombo = (gst, pan) => {
    const isGSTValid = gst && gst.toUpperCase() !== "NA" && /^[A-Z0-9]{15}$/.test(gst);
    const isPANValid = pan && pan.toUpperCase() !== "NA" && /^[A-Z0-9]{10}$/.test(pan);
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      category: initialCategory,
      requestSampleKit: initialSampleKit,
    }));
  }, [initialCategory, initialSampleKit]);

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
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        toast.error("Failed to load categories");
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData.requestSampleKit) {
      setFormData((prev) => ({
        ...prev,
        country: "India",
      }));
    }
  }, [formData.requestSampleKit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    // Format and validate inputs
    if (name === "phone") {
      formattedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setErrors((prev) => ({ ...prev, phone: validatePhone(formattedValue) }));
    } else if (name === "alternate_phone") {
      formattedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setErrors((prev) => ({ ...prev, alternate_phone: validateAlternatePhone(formattedValue) }));
    } else if (name === "gst_in") {
      formattedValue = value.toUpperCase() === "NA" ? "NA" : value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
      setErrors((prev) => ({
        ...prev,
        gst_in: validateGSTIN(formattedValue),
        gstPanCombo: validateGSTPANCombo(formattedValue, formData.pancard),
      }));
    } else if (name === "pancard") {
      formattedValue = value.toUpperCase() === "NA" ? "NA" : value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
      setErrors((prev) => ({
        ...prev,
        pancard: validatePAN(formattedValue),
        gstPanCombo: validateGSTPANCombo(formData.gst_in, formattedValue),
      }));
    } else if (name === "zipPostalCode") {
      formattedValue = value.replace(/[^0-9]/g, "").slice(0, 6);
      setErrors((prev) => ({ ...prev, zipPostalCode: validateZipCode(formattedValue) }));
    } else if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : formattedValue,
    }));
  };

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
    if (isProcessingOrder) return { success: false };
    setIsProcessingOrder(true);

    try {
      const orderNo = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const date = new Date();
      const orderDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
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
        pancard: formData.pancard,
        gst_in: formData.gst_in,
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
      if (responseData.success !== true) {
        throw new Error(responseData.message || "Failed to create order");
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("orderNo", requestBody.orderNo);
      }
      return { success: true, orderNo: responseData.orderNo };
    } catch (error) {
      return { success: false, error: error.message };
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

    // Validate all fields before proceeding
    const newErrors = {
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      alternate_phone: validateAlternatePhone(formData.alternate_phone),
      gst_in: validateGSTIN(formData.gst_in),
      pancard: validatePAN(formData.pancard),
      zipPostalCode: formData.requestSampleKit ? validateZipCode(formData.zipPostalCode) : "",
      terms: formData.requestSampleKit && !termsAccepted ? "Please accept the Terms and Conditions." : "",
      gstPanCombo: validateGSTPANCombo(formData.gst_in, formData.pancard),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      return;
    }

    try {
      const leadData = {
        full_name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        alternate_email: null,
        phone: formData.phone,
        alternate_phone: formData.alternate_phone || null,
        company_name: formData.companyName,
        language_preference: formData.languagePreference || null,
        website_url: formData.companyWebsite || null,
        industry_sector: formData.industry,
        city: formData.city || null,
        state: formData.state || null,
        country: formData.country || null,
        street_address: formData.streetAddress || null,
        address_line_2: formData.addressLine2 || null,
        zip_postal_code: formData.zipPostalCode || null,
        products_interested_in: formData.projectDescription || null,
        quote_quantity: formData.orderQuantity || null,
        budget: null,
        preferred_delivery_date: null,
        enquiry_source: "Nexibles Website",
        package_buying_history: formData.packageBuyingHistory || null,
        referred_by: null,
        lead_assigned_to: null,
        visiting_card: null,
        additional_comments: formData.projectDescription || null,
        category: formData.category,
        gst_in: formData.gst_in || null,
        pancard: formData.pancard || null,
        tags: null,
      };

      const emailData = {
        clientName: `${formData.firstName} ${formData.lastName}`.trim(),
        clientEmail: formData.email,
        phone: formData.phone,
        message: formData.projectDescription || "Not provided",
      };

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

      const leadResponseData = await leadResponse.json();
      if (!leadResponse.ok) {
        throw new Error(
          leadResponseData.message ||
            `Failed to save lead: ${JSON.stringify(leadResponseData.errors || {})}`
        );
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

      const emailResponseData = await emailResponse.json();
      if (!emailResponse.ok) {
        throw new Error(
          emailResponseData.error ||
            `Failed to send emails: ${JSON.stringify(emailResponseData.errors || {})}`
        );
      }

      const orderResult = await createOrder();
      if (!orderResult.success) {
        throw new Error(orderResult.error || "Failed to create order");
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
      if (typeof window !== "undefined") {
        window.location.href = paymentResponse.data.url;
      }
    } catch (error) {
      setLoading(false);
      toast.error(`Failed: ${error.message}`);
      setSubmitStatus(`Failed: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    // Validate all fields before proceeding
    const newErrors = {
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      alternate_phone: validateAlternatePhone(formData.alternate_phone),
      gst_in: formData.requestSampleKit ? validateGSTIN(formData.gst_in) : "",
      pancard: formData.requestSampleKit ? validatePAN(formData.pancard) : "",
      zipPostalCode: formData.requestSampleKit ? validateZipCode(formData.zipPostalCode) : "",
      terms: formData.requestSampleKit && !termsAccepted ? "Please accept the Terms and Conditions." : "",
      gstPanCombo: formData.requestSampleKit ? validateGSTPANCombo(formData.gst_in, formData.pancard) : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
    const eventId = `Request_Quote_${day}${month}${year}${minutes}${seconds}${milliseconds}`;

    const waitForGtag = (callback, timeout = 10000) => {
      const start = Date.now();
      const checkGtag = () => {
        if (typeof window.gtag === "function") {
          callback();
        } else if (Date.now() - start < timeout) {
          setTimeout(checkGtag, 100);
        }
      };
      checkGtag();
    };

    const waitForFbq = (callback, timeout = 10000) => {
      const start = Date.now();
      const checkFbq = () => {
        if (typeof window.fbq === "function") {
          callback();
        } else if (Date.now() - start < timeout) {
          setTimeout(checkFbq, 100);
        }
      };
      checkFbq();
    };

    waitForGtag(() => {
      window.gtag("event", "conversion", {
        send_to: "AW-17014026366/T9rTCODv-MYaEP7g9bA_",
        transaction_id: eventId,
      });
    });

    waitForFbq(() => {
      window.fbq("trackCustom", "RequestQuote", { eventID: eventId });
    });

    const emailData = {
      clientName: `${formData.firstName} ${formData.lastName}`.trim(),
      clientEmail: formData.email,
      phone: formData.phone,
      message: formData.projectDescription || "Not provided",
    };

    const leadData = {
      full_name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      alternate_email: null,
      phone: formData.phone,
      alternate_phone: formData.alternate_phone || null,
      company_name: formData.companyName,
      language_preference: formData.languagePreference || null,
      website_url: formData.companyWebsite || null,
      industry_sector: formData.industry,
      city: formData.city || null,
      state: formData.state || null,
      country: formData.country || null,
      street_address: formData.streetAddress || null,
      address_line_2: formData.addressLine2 || null,
      zip_postal_code: formData.zipPostalCode || null,
      products_interested_in: formData.projectDescription || null,
      quote_quantity: formData.orderQuantity || null,
      budget: null,
      preferred_delivery_date: null,
      enquiry_source: "Nexibles Website",
      package_buying_history: formData.packageBuyingHistory || null,
      referred_by: null,
      lead_assigned_to: null,
      visiting_card: null,
      additional_comments: formData.projectDescription || null,
      category: formData.category,
      gst_in: formData.gst_in || null,
      pancard: formData.pancard || null,
      tags: null,
    };

    if (formData.requestSampleKit) {
      makePayment(e);
    } else {
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
              throw new Error(
                errorData.message ||
                  `Network response was not ok: ${JSON.stringify(errorData.errors || {})}`
              );
            });
          }
          return response.json();
        })
        .then(() => fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/leads/send-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "API-Key": process.env.NEXT_PUBLIC_API_KEY,
            },
            body: JSON.stringify(emailData),
          }
        ))
        .then((emailResponse) => {
          if (!emailResponse.ok) {
            return emailResponse.json().then((emailError) => {
              throw new Error(
                emailError.error ||
                  `Failed to send email: ${JSON.stringify(emailError.errors || {})}`
              );
            });
          }
          return emailResponse.json();
        })
        .then(() => {
          toast.success("Form submitted successfully!");
          setSubmittedData(leadData);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            alternate_phone: "",
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
            orderQuantity: "",
            packageBuyingHistory: "",
            projectDescription: "",
            requestSampleKit: initialSampleKit,
            gst_in: "",
            pancard: "",
          });
          setTermsAccepted(false);
          setLoading(false);
          setErrors({
            email: "",
            phone: "",
            alternate_phone: "",
            gst_in: "",
            pancard: "",
            zipPostalCode: "",
            terms: "",
            gstPanCombo: "",
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (isModal) onClose();
        })
        .catch((error) => {
          toast.error(`Failed to submit form: ${error.message}`);
          setLoading(false);
        });
    }
  };

  const formContent = (
    <div className={`p-4 md:p-6 ${formClassName}`}>
      <h2 className="pb-2 mb-4 text-xl font-semibold text-black border-b-2 border-black sm:text-2xl">
        {title}
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

      {submittedData && (
        <div className="mb-4 p-4 rounded bg-blue-100 text-blue-700">
          <h3 className="text-lg font-semibold mb-2">Submitted Data</h3>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {Object.entries(submittedData).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="p-2 font-medium capitalize">{key.replace(/_/g, " ")}</td>
                  <td className="p-2">{value || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-black sm:text-md">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black sm:text-md">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
              required
            />
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
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
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
              placeholder="Phone (10 digits)"
              className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
              required
              maxLength={10}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
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
              Alternate Phone
            </label>
            <input
              type="tel"
              name="alternate_phone"
              value={formData.alternate_phone}
              onChange={handleChange}
              placeholder="Alternate Phone (10 digits)"
              className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
              maxLength={10}
            />
            {errors.alternate_phone && (
              <p className="mt-1 text-sm text-red-500">{errors.alternate_phone}</p>
            )}
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
              <option value="" className="text-gray-900">Please select...</option>
              {industries.map((industry) => (
                <option key={industry} value={industry} className="text-gray-900">
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
                {loadingCategories ? "Loading categories..." : "Please select..."}
              </option>
              {loadingCategories ? null : Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.name} className="text-gray-900">
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
              Language Preference *
            </label>
            <select
              name="languagePreference"
              value={formData.languagePreference}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black bg-transparent border border-black rounded-md focus:outline-none"
              required
            >
              <option value="" className="text-gray-900">Please select...</option>
              {languages.map((language) => (
                <option key={language} value={language} className="text-gray-900">
                  {language}
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
              className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black sm:text-md">
            Type of pouch and product you are looking to pack (to help us send the most relevant samples).
          </label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Example: Grammage, preferred finish and material type."
            className="w-full h-20 p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
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
              formData.requestSampleKit
                ? "bg-red-500 ring-red-300"
                : "bg-gray-300 ring-gray-200"
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
                  <option value="" className="text-gray-900">Please select...</option>
                  {orderQuantities.map((quantity) => (
                    <option key={quantity} value={quantity} className="text-gray-900">
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
                  <option value="" className="text-gray-900">Please select...</option>
                  {packageBuyingHistories.map((history) => (
                    <option key={history} value={history} className="text-gray-900">
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
              <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-4">
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
                <div>
                  <input
                    type="text"
                    name="zipPostalCode"
                    value={formData.zipPostalCode}
                    onChange={handleChange}
                    placeholder="ZIP/Postal Code (6 digits)"
                    className="w-full p-2 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                    required
                    maxLength={6}
                  />
                  {errors.zipPostalCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.zipPostalCode}</p>
                  )}
                </div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 text-black bg-transparent border border-black rounded-md focus:outline-none"
                  required
                >
                  <option value="" className="text-gray-900">Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country} className="text-gray-900">
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
               <label className="block text-sm font-medium text-red-600 sm:text-md">
                     (At least one of GSTIN or PAN Card is required)
                  </label>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="gst_in"
                    value={formData.gst_in}
                    onChange={handleChange}
                    placeholder="GSTIN (15 characters)"
                    className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                    maxLength={15}
                  />
                  {errors.gst_in && <p className="mt-1 text-sm text-red-500">{errors.gst_in}</p>}
                </div>
                <div className="flex items-center justify-center my-2 sm:my-0">
                  <span className="text-sm font-semibold text-black sm:text-md">OR</span>
                </div>
                <div className="flex-1">
                  
                  <input
                    type="text"
                    name="pancard"
                    value={formData.pancard}
                    onChange={handleChange}
                    placeholder="PAN Card (10 characters)"
                    className="w-full p-2 mt-1 text-black placeholder-black bg-transparent border border-black rounded-md focus:outline-none"
                    maxLength={10}
                  />
                  {errors.pancard && <p className="mt-1 text-sm text-red-500">{errors.pancard}</p>}
                </div>
                
              </div>
              {errors.gstPanCombo && (
                <p className="mt-1 text-sm text-red-500">{errors.gstPanCombo}</p>
              )}
            </div>

            {total && (
              <div className="mb-4 rounded-md">
                <p className="text-sm font-medium text-gray-800">Sample Kit Details:</p>
                <p className="text-sm text-gray-600">Base Price: ₹{total.basePrice}</p>
                <p className="text-sm text-gray-600">GST (18%): ₹{total.gst.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-1">Shipping is included in the price.</p>
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
                  required={formData.requestSampleKit}
                />
                <span
                  className={`relative inline-block w-6 h-6 mr-2 rounded-md border-2 border-black bg-transparent transition-all duration-200 ease-in-out ${
                    termsAccepted ? "bg-[#103b60]" : ""
                  }`}
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-md font-semibold text-black">
                  I agree to the{" "}
                  <Link href="/terms-conditions" legacyBehavior>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      Terms and Conditions
                    </a>
                  </Link>
                </span>
              </label>
              {errors.terms && <p className="ml-2 text-sm text-red-500">{errors.terms}</p>}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading || (formData.requestSampleKit && !termsAccepted)}
          className={`w-full bg-[#103b60] text-white p-2 rounded-md focus:outline-none text-sm sm:text-base ${
            loading || (formData.requestSampleKit && !termsAccepted)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {loading
            ? "Submitting..."
            : formData.requestSampleKit
            ? `Pay ₹${total ? total.total.toFixed(0) : 413}`
            : "Submit"}
        </button>
      </form>
    </div>
  );

  return (
    <AnimatePresence>
      {isModal && isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`relative w-full h-full max-h-full sm:max-w-4xl sm:h-auto bg-white sm:rounded border border-black sm:shadow-lg overflow-y-auto ${containerClassName}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-4 text-black text-2xl font-bold focus:outline-none"
            >
              <X />
            </button>
            {formContent}
          </motion.div>
        </motion.div>
      ) : (
        !isModal && (
          <div className={`bg-white rounded-lg shadow-md ${containerClassName}`}>
            {formContent}
          </div>
        )
      )}
    </AnimatePresence>
  );
}

export default RequestForm;