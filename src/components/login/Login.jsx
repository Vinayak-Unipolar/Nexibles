"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/utils/authContext";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../comman/Loader";
import ForgotPassword from "./ForgotPassword";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';
function Login() {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showConfigMessage, setShowConfigMessage] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [userDetails, setUserDetails] = useState({
    customerId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    cName: "",
    gender: "",
    houseno: "",
    floor: "",
    address: "",
    address2: "",
    landmark: "",
    city: "",
    prov: "",
    zip: "",
    country: "",
    phone: "",
    emailAddress: "",
    mobile: "",
    mobile2: "",
    company: "",
    title: "",
    workPhone: "",
    dateOfBirth: "",
    anniversary: "",
    newsletter: "",
    ipaddress: "",
    subsms: "",
    addedDate: "",
    addedBy: "",
    refby: "",
    datasource: "",
    occupation: "",
    designation: "",
    contactpref: "",
    pref: "",
    activatedon: "",
    securecode: "",
    active: "",
    password: "",
    profImage: "",
    baseUrl: "https://nexibles.com",
  });

  useEffect(() => {
    const configFlag = localStorage.getItem("config") === "true";
    const fromConfig = searchParams.get("from") === "configuration";
    if (configFlag || fromConfig) {
      setShowConfigMessage(true);
      setIsLogin(false); // Show registration form by default
      localStorage.removeItem("config"); // Clear the flag immediately
    }
  }, [searchParams]);

  const executeCaptcha = async () => {
    if (recaptchaRef.current) {
      try {
        recaptchaRef.current.reset();
        const token = await recaptchaRef.current.executeAsync();
        setCaptchaToken(token);
        return token;
      } catch (error) {
        console.error("reCAPTCHA execution error:", error);
        return null;
      }
    }
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const captchaToken = await executeCaptcha();
    if (!captchaToken) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${APIURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: email,
          password: password,
          captchaToken: captchaToken,
        }),
      });
      const data = await response.json();

      if (data.status === "error") {
        return;
      }
      if (data.status === "success") {
        const { data: user, token } = data;
        login(user, token);
        router.push("/");
      }
    } catch (error) {
      console.error("Invalid Request", error);
    } finally {
      setLoading(false);
      setCaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  const token = await executeCaptcha();
  if (!token) {
    toast.error("CAPTCHA verification failed. Please try again.");
    return;
  }

  setLoading(true);
  try {
    const apiUrl = APIURL;
    const response = await fetch(`${apiUrl}/api/login/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userDetails,
        captchaToken: token,
      }),
    });

    const data = await response.json();

    if (response.ok && data.status === "success") {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
      const eventId = `${day}${month}${year}${minutes}${seconds}${milliseconds}`;

      gtag("event", "conversion", {
        send_to: "AW-17014026366/6bz-COPv-MYaEP7g9bA_",
        transaction_id: eventId,
      });

      fbq("track", "Subscribe", {
        eventID: eventId,
      });

      setUserDetails({
        customerId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        cName: "",
        gender: "",
        houseno: "",
        floor: "",
        address: "",
        address2: "",
        landmark: "",
        city: "",
        prov: "",
        zip: "",
        country: "",
        phone: "",
        emailAddress: "",
        mobile: "",
        mobile2: "",
        company: "",
        title: "",
        workPhone: "",
        dateOfBirth: "",
        anniversary: "",
        newsletter: "",
        ipaddress: "",
        subsms: "",
        addedDate: "",
        addedBy: "",
        refby: "",
        datasource: "",
        occupation: "",
        designation: "",
        contactpref: "",
        pref: "",
        activatedon: "",
        securecode: "",
        active: "",
        password: "",
        profImage: "",
        baseUrl: "https://nexibles.com",
      });

      setIsLogin(true);
     toast.success(data.message || "!", {
  autoClose: false,
});
    } else {
      const errorMessage = data.message && data.message.includes("is already exist")
        ? "Email already exists. Please use a different email."
        : data.message || "An error occurred during registration";
      toast.error(errorMessage);
    }
  } catch (error) {
    console.error("Registration error:", error.message);
    toast.error("Registration failed. Please try again later.");
  } finally {
    setLoading(false);
    setCaptchaToken(null);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityRegister = () => {
    setShowPasswordRegister(!showPasswordRegister);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setCaptchaToken(null);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <>
      {loading && <Loader btnLoad={false} />}
      <div className="flex items-center justify-center p-4 bg-white md:mt-20 my-12">
        <style>
          {`
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <div className="w-full max-w-4xl">
          {showConfigMessage && (
            <>
              <p className="text-sm text-center font-semibold text-black md:text-4xl">
                Register First, Then Build & Price Your Own Pouch
              </p>
              <p className="text-sm text-center font-semibold text-black md:text-xl">
                It&apos;s free, takes just 60 seconds, and provides instant pricing for all sizes.
              </p>
            </>
          )}

          <div className="flex flex-col md:flex-row h-auto md:h-[580px]">
            <motion.div
              className="hidden md:block md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center h-full p-6">
                <img
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/create-an-account-with-nexibles.webp`}
                  alt="Auth illustration"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </motion.div>

            <motion.div
              className="w-full p-6 overflow-y-auto overflow-hidden bg-white md:p-8 md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isLogin ? (
                <>
                  <h2 className="mb-4 mt-8 text-2xl font-bold text-center text-gray-900 md:text-3xl">
                    Welcome back!
                  </h2>

                  <p className="mb-6 text-sm text-center text-gray-600 md:text-base">
                    Enter to get unlimited access to data & information.
                  </p>

                  <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <div className="relative">
                      <FaEnvelope className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 left-4" />
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email address"
                        required
                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-12 pr-4 text-gray-700 focus:border-[#103b60] focus:outline-none"
                      />
                    </div>

                    <div className="relative">
                      <FaLock className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 left-4" />
                      <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter your password"
                        required
                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-12 pr-10 text-gray-700 focus:border-[#103b60] focus:outline-none"
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer top-1/2 right-4"
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>

                    <div className="flex items-center justify-end">
                      <div
                        onClick={() => setShowModal(true)}
                        className="text-sm font-medium text-[#103b60] hover:text-[#103b60] cursor-pointer"
                      >
                        Forgot password?
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LfyUSgrAAAAAFuAQCsbx09bMkZBF48ppurtz_5_"
                        size="invisible"
                        onChange={handleCaptchaChange}
                        onError={(error) => console.log("reCAPTCHA Error:", error)}
                        onExpired={() => {
                          console.log("reCAPTCHA Expired");
                          setCaptchaToken(null);
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#103b60] rounded-lg md:text-base hover:bg-[#0d2e4d] focus:outline-none focus:ring-2 focus:ring-[#103b60] focus:ring-opacity-50"
                    >
                      Log in
                    </button>

                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        {`Don't have an account?`}{" "}
                        <span
                          onClick={toggleForm}
                          className="text-[#4F1E9B] cursor-pointer font-medium hover:underline"
                        >
                          Register here
                        </span>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="mb-4 text-2xl font-bold text-center text-gray-900 md:text-3xl">
                    Create an account
                  </h2>
                  <p className="mb-6 text-sm text-center text-gray-600 md:text-base">
                    Join us today and get access to all features
                  </p>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="firstName" className="mb-1 text-sm font-medium text-gray-700">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          required
                          className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none"
                          value={userDetails.firstName}
                          onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="lastName" className="mb-1 text-sm font-medium text-gray-700">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          required
                          className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none"
                          value={userDetails.lastName}
                          onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                        />
                      </div>

                      <div className="flex flex-col md:col-span-2">
                        <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none"
                          value={userDetails.emailAddress}
                          onChange={(e) => setUserDetails({ ...userDetails, emailAddress: e.target.value })}
                        />
                      </div>

                      <div className="relative flex flex-col md:col-span-2">
                        <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
                          Password*
                        </label>
                        <input
                          type={showPasswordRegister ? "text" : "password"}
                          id="password"
                          required
                          className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none pr-10"
                          value={userDetails.password}
                          onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                        />
                        <span
                          onClick={togglePasswordVisibilityRegister}
                          className="absolute right-3 bottom-2.5 cursor-pointer text-gray-500"
                        >
                          {showPasswordRegister ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="w-4 h-4 text-[#103b60] focus:ring-[#103b60] border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="block ml-2 text-xs text-gray-700 md:text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </label>
                    </div>

                    <div className="flex justify-center">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LfyUSgrAAAAAFuAQCsbx09bMkZBF48ppurtz_5_"
                        size="invisible"
                        onChange={handleCaptchaChange}
                        onError={(error) => console.log("reCAPTCHA Error:", error)}
                        onExpired={() => {
                          console.log("reCAPTCHA Expired");
                          setCaptchaToken(null);
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#103b60] rounded-lg md:text-base hover:bg-[#0d2e4d] focus:outline-none focus:ring-2 focus:ring-[#103b60] focus:ring-opacity-50"
                    >
                      Create account
                    </button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <span
                          onClick={toggleForm}
                          className="text-[#4F1E9B] cursor-pointer font-medium hover:underline"
                        >
                          Log in
                        </span>
                      </p>
                    </div>
                  </form>
                </>
              )}

              <div className="mt-6 text-xs text-center text-gray-500">
                <p>
                  By {isLogin ? "logging in" : "registering"}, you agree to our{" "}
                  <Link href="/terms-conditions" legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer" className="text-[#4F1E9B] hover:underline">
                      Terms & Conditions
                    </a>
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer" className="text-[#4F1E9B] hover:underline">
                      Privacy Policy
                    </a>
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        {showModal && <ForgotPassword onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
}

export default Login;





// "use client";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { useAuth } from "@/utils/authContext";
// import { useRouter } from "next/navigation";
// import Loader from "../comman/Loader";
// import { toast } from "react-toastify";
// import ForgotPassword from "./ForgotPassword";
// import { motion } from "framer-motion";
// import ReCAPTCHA from "react-google-recaptcha";

// function Login() {
//   const APIURL = process.env.NEXT_PUBLIC_API_URL;
//   const [showPasswordRegister, setShowPasswordRegister] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [password, setPassword] = useState("");
//   const [showConfigMessage, setShowConfigMessage] = useState(false);
//   const router = useRouter();
//   const { login } = useAuth();
//   const [isLogin, setIsLogin] = useState(true);
//   const [captchaToken, setCaptchaToken] = useState(null);
//   const recaptchaRef = useRef(null);

//   const [userDetails, setUserDetails] = useState({
//     customerId: "",
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     cName: "",
//     gender: "",
//     houseno: "",
//     floor: "",
//     address: "",
//     address2: "",
//     landmark: "",
//     city: "",
//     prov: "",
//     zip: "",
//     country: "",
//     phone: "",
//     emailAddress: "",
//     mobile: "",
//     mobile2: "",
//     company: "",
//     title: "",
//     workPhone: "",
//     dateOfBirth: "",
//     anniversary: "",
//     newsletter: "",
//     ipaddress: "",
//     subsms: "",
//     addedDate: "",
//     addedBy: "",
//     refby: "",
//     datasource: "",
//     occupation: "",
//     designation: "",
//     contactpref: "",
//     pref: "",
//     activatedon: "",
//     securecode: "",
//     active: "",
//     password: "",
//     profImage: "",
//     baseUrl: "https://nexibles.com",
//   });

//   useEffect(() => {
//     if (localStorage.getItem('config') === 'true') {
//       setShowConfigMessage(true);
//       localStorage.removeItem('config');
//     }
//   }, []);

//   const executeCaptcha = async () => {
//     if (recaptchaRef.current) {
//       try {
//         recaptchaRef.current.reset();
//         const token = await recaptchaRef.current.executeAsync();
//         setCaptchaToken(token);
//         return token;
//       } catch (error) {
//         console.error("reCAPTCHA execution error:", error);
//         toast.error("Failed to verify CAPTCHA. Please try again.");
//         return null;
//       }
//     }
//     return null;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const captchaToken = await executeCaptcha();
//     if (!captchaToken) {
//       toast.error("Please complete the CAPTCHA verification.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${APIURL}/api/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           emailAddress: email,
//           password: password,
//           captchaToken: captchaToken,
//         }),
//       });
//       const data = await response.json();
//       console.log('Login API response:', data);

//       if (data.status === "error") {
//         toast.error(data.message);
//         return;
//       }
//       if (data.status === "success") {
//         const { data: user, token } = data; // Destructure correctly
//         login(user, token); // This handles localStorage and toast
//         router.push("/");
//       }
//     } catch (error) {
//       console.error("Invalid Request", error);
//       toast.error("An error occurred during login");
//     } finally {
//       setLoading(false);
//       setCaptchaToken(null);
//       if (recaptchaRef.current) {
//         recaptchaRef.current.reset();
//       }
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const token = await executeCaptcha();
//     if (!token) {
//       toast.error("Please complete the CAPTCHA verification.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const apiUrl = APIURL;
//       const response = await fetch(`${apiUrl}/api/login/create`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...userDetails,
//           captchaToken: token,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.status === "success") {
//         const now = new Date();
//         const day = String(now.getDate()).padStart(2, "0");
//         const month = String(now.getMonth() + 1).padStart(2, "0");
//         const year = now.getFullYear();
//         const hours = String(now.getHours()).padStart(2, "0");
//         const minutes = String(now.getMinutes()).padStart(2, "0");
//         const seconds = String(now.getSeconds()).padStart(2, "0");
//         const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
//         const eventId = `${day}${month}${year}${minutes}${seconds}${milliseconds}`;

//         gtag("event", "conversion", {
//           send_to: "AW-17014026366/6bz-COPv-MYaEP7g9bA_",
//           transaction_id: eventId,
//         });

//         fbq("track", "Subscribe", {
//           eventID: eventId,
//         });
//         setUserDetails({
//           customerId: "",
//           firstName: "",
//           middleName: "",
//           lastName: "",
//           cName: "",
//           gender: "",
//           houseno: "",
//           floor: "",
//           address: "",
//           address2: "",
//           landmark: "",
//           city: "",
//           prov: "",
//           zip: "",
//           country: "",
//           phone: "",
//           emailAddress: "",
//           mobile: "",
//           mobile2: "",
//           company: "",
//           title: "",
//           workPhone: "",
//           dateOfBirth: "",
//           anniversary: "",
//           newsletter: "",
//           ipaddress: "",
//           subsms: "",
//           addedDate: "",
//           addedBy: "",
//           refby: "",
//           datasource: "",
//           occupation: "",
//           designation: "",
//           contactpref: "",
//           pref: "",
//           activatedon: "",
//           securecode: "",
//           active: "",
//           password: "",
//           profImage: "",
//           baseUrl: "https://nexibles.com",
//         });
//         setIsLogin(true);
//         toast.success("Registered Successfully! Please check your email to verify your account.");
//       } else {
//         const errorMessage = data.message && data.message.includes("is already exist")
//           ? "Email already exists. Please use a different email."
//           : data.message || "An error occurred during registration";
//         toast.error(errorMessage);
//       }
//     } catch (error) {
//       console.error("Registration error:", error.message);
//       toast.error(error.message || "An error occurred during registration");

//     } finally {
//       setLoading(false);
//       setCaptchaToken(null);
//       if (recaptchaRef.current) {
//         recaptchaRef.current.reset();
//       }
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const togglePasswordVisibilityRegister = () => setShowPasswordRegister(!showPasswordRegister);

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setCaptchaToken(null);
//     if (recaptchaRef.current) {
//       recaptchaRef.current.reset();
//     }
//   };

//   const handleCaptchaChange = (token) => {
//     //console.log("reCAPTCHA token:", token);
//     setCaptchaToken(token);
//   };

//   useEffect(() => { }, [userDetails]);

//   return (
//     <>
//       {loading && <Loader btnLoad={false} />}
//       <div className="flex items-center justify-center p-4 bg-white md:mt-20 my-12">
//         <style>
//           {`
//             .overflow-y-auto::-webkit-scrollbar {
//               display: none;
//             }
//           `}
//         </style>
        
//         <div className="w-full max-w-4xl">
//           {showConfigMessage && (
//             <>
//               <p className=" text-sm text-center font-semibold text-black md:text-4xl">
//                 Register First, Then Build & Price Your Own Pouch
//               </p>
//               <p className="text-sm text-center font-semibold text-black md:text-xl">
//                 It&apos;s free, takes 60 seconds, and unlocks instant pricing for every size.
//               </p>
//             </>

//           )}
//           <div className="flex flex-col md:flex-row h-auto md:h-[580px]">
//             <motion.div
//               className="hidden md:block md:w-1/2"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="flex items-center justify-center h-full p-6">
//                 <img
//                   src={`${process.env.NEXT_PUBLIC_CDN_URL}/create-an-account-with-nexibles.webp`}
//                   alt="Auth illustration"
//                   className="object-cover w-full h-full rounded-lg"
//                 />
//               </div>
//             </motion.div>

//             <motion.div
//               className="w-full p-6 overflow-y-auto overflow-hidden bg-white md:p-8 md:w-1/2"
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               {isLogin ? (
//                 <>
//                   <h2 className="mb-4 mt-8 text-2xl font-bold text-center text-gray-900 md:text-3xl">
//                     Welcome back!
//                   </h2>

//                   <p className="mb-6 text-sm text-center text-gray-600 md:text-base">
//                     Enter to get unlimited access to data & information.
//                   </p>

//                   <form onSubmit={handleLogin} className="flex flex-col space-y-4">
//                     <div className="relative">
//                       <FaEnvelope className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 left-4" />
//                       <input
//                         type="email"
//                         onChange={(e) => setEmail(e.target.value)}
//                         value={email}
//                         placeholder="Enter your email address"
//                         required
//                         className="w-full rounded-lg border border-gray-300 py-2.5 pl-12 pr-4 text-gray-700 focus:border-[#103b60] focus:outline-none"
//                       />
//                     </div>

//                     <div className="relative">
//                       <FaLock className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 left-4" />
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         onChange={(e) => setPassword(e.target.value)}
//                         value={password}
//                         placeholder="Enter your password"
//                         required
//                         className="w-full rounded-lg border border-gray-300 py-2.5 pl-12 pr-10 text-gray-700 focus:border-[#103b60] focus:outline-none"
//                       />
//                       <span
//                         onClick={togglePasswordVisibility}
//                         className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer top-1/2 right-4"
//                       >
//                         {showPassword ? <FaEye /> : <FaEyeSlash />}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-end">
//                       <div
//                         onClick={() => setShowModal(true)}
//                         className="text-sm font-medium text-[#103b60] hover:text-[#103b60] cursor-pointer"
//                       >
//                         Forgot password?
//                       </div>
//                     </div>

//                     <div className="flex justify-center">
//                       <ReCAPTCHA
//                         ref={recaptchaRef}
//                         sitekey="6LfyUSgrAAAAAFuAQCsbx09bMkZBF48ppurtz_5_"
//                         size="invisible"
//                         onChange={handleCaptchaChange}
//                         onError={(error) => console.log("reCAPTCHA Error:", error)}
//                         onExpired={() => {
//                           console.log("reCAPTCHA Expired");
//                           setCaptchaToken(null);
//                         }}
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#103b60] rounded-lg md:text-base hover:bg-[#0d2e4d] focus:outline-none focus:ring-2 focus:ring-[#103b60] focus:ring-opacity-50"
//                     >
//                       Log in
//                     </button>

//                     <div className="mt-4 text-center">
//                       <p className="text-sm text-gray-600">
//                         {`Don't have an account?`}{" "}
//                         <span
//                           onClick={toggleForm}
//                           className="text-[#4F1E9B] cursor-pointer font-medium hover:underline"
//                         >
//                           Register here
//                         </span>
//                       </p>
//                     </div>
//                   </form>
//                 </>
//               ) : (
//                 <>
//                   <h2 className="mb-4 text-2xl font-bold text-center text-gray-900 md:text-3xl">
//                     Create an account
//                   </h2>
//                   <p className="mb-6 text-sm text-center text-gray-600 md:text-base">
//                     Join us today and get access to all features
//                   </p>

//                   <form onSubmit={handleRegister} className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                       <div className="flex flex-col">
//                         <label htmlFor="firstName" className="mb-1 text-sm font-medium text-gray-700">
//                           First Name*
//                         </label>
//                         <input
//                           type="text"
//                           id="firstName"
//                           required
//                           className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none"
//                           value={userDetails.firstName}
//                           onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
//                         />
//                       </div>

//                       <div className="flex flex-col">
//                         <label htmlFor="lastName" className="mb-1 text-sm font-medium text-gray-700">
//                           Last Name*
//                         </label>
//                         <input
//                           type="text"
//                           id="lastName"
//                           required
//                           className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none"
//                           value={userDetails.lastName}
//                           onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
//                         />
//                       </div>

//                       <div className="flex flex-col md:col-span-2">
//                         <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
//                           Email Address*
//                         </label>
//                         <input
//                           type="email"
//                           id="email"
//                           required
//                           className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none"
//                           value={userDetails.emailAddress}
//                           onChange={(e) => setUserDetails({ ...userDetails, emailAddress: e.target.value })}
//                         />
//                       </div>

//                       <div className="relative flex flex-col md:col-span-2">
//                         <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
//                           Password*
//                         </label>
//                         <input
//                           type={showPasswordRegister ? "text" : "password"}
//                           id="password"
//                           required
//                           className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none pr-10"
//                           value={userDetails.password}
//                           onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
//                         />
//                         <span
//                           onClick={togglePasswordVisibilityRegister}
//                           className="absolute right-3 bottom-2.5 cursor-pointer text-gray-500"
//                         >
//                           {showPasswordRegister ? <FaEye /> : <FaEyeSlash />}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id="terms"
//                         required
//                         className="w-4 h-4 text-[#103b60] focus:ring-[#103b60] border-gray-300 rounded"
//                       />
//                       <label htmlFor="terms" className="block ml-2 text-xs text-gray-700 md:text-sm">
//                         I agree to the Terms of Service and Privacy Policy
//                       </label>
//                     </div>

//                     <div className="flex justify-center">
//                       <ReCAPTCHA
//                         ref={recaptchaRef}
//                         sitekey="6LfyUSgrAAAAAFuAQCsbx09bMkZBF48ppurtz_5_"
//                         size="invisible"
//                         onChange={handleCaptchaChange}
//                         onError={(error) => console.log("reCAPTCHA Error:", error)}
//                         onExpired={() => {
//                           console.log("reCAPTCHA Expired");
//                           setCaptchaToken(null);
//                         }}
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#103b60] rounded-lg md:text-base hover:bg-[#0d2e4d] focus:outline-none focus:ring-2 focus:ring-[#103b60] focus:ring-opacity-50"
//                     >
//                       Create account
//                     </button>

//                     <div className="text-center">
//                       <p className="text-sm text-gray-600">
//                         Already have an account?{" "}
//                         <span
//                           onClick={toggleForm}
//                           className="text-[#4F1E9B] cursor-pointer font-medium hover:underline"
//                         >
//                           Log in
//                         </span>
//                       </p>
//                     </div>
//                   </form>
//                 </>
//               )}

//               <div className="mt-6 text-xs text-center text-gray-500">
//                 <p>
//                   By {isLogin ? "logging in" : "registering"}, you agree to our{" "}
//                   <Link href="/terms-conditions" legacyBehavior>
//                     <a target="_blank" rel="noopener noreferrer" className="text-[#4F1E9B] hover:underline">
//                       Terms & Conditions
//                     </a>
//                   </Link>{" "}
//                   and{" "}
//                   <Link href="/privacy-policy" legacyBehavior>
//                     <a target="_blank" rel="noopener noreferrer" className="text-[#4F1E9B] hover:underline">
//                       Privacy Policy
//                     </a>
//                   </Link>
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//         {showModal && <ForgotPassword onClose={() => setShowModal(false)} />}
//       </div>
//     </>
//   );
// }

// export default Login;