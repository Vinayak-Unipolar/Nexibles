"use client"
import Link from 'next/link';
import React from 'react'
import { FaEnvelope, FaLock } from "react-icons/fa"
import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/authContext';
import { useRouter } from 'next/navigation';
import Loader from '../comman/Loader';
import { toast } from 'react-toastify';
import ForgotPassword from './ForgotPassword';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

function Login() {
    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    const [showPasswordRegister, setShowPasswordRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${APIURL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    emailAddress: email,
                    password: password,
                }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                const token = data.token;
                login(data.data);
                toast.success("Login Successfull");
                router.push('/');
                localStorage.setItem('token', token);
            }
            else {
                toast.error("Invalid Email or Password");
            }
        } catch (error) {
            console.log('Invalid Request', error);
        }
        finally {
            setLoading(false);
        }
    }

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
    });

   const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${APIURL}/api/login/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails)
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.status === 'error' && data.message.includes('is already exist')) {
                toast.error('Email already exists. Please use a different email.');
            } else {
                throw new Error(data.message || 'Network response was not ok');
            }
        } else {

            // Generate event ID using date-time format: ddmmyyyyminutessseconds
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
            
            const eventId = `${day}${month}${year}${minutes}${seconds}${milliseconds}`;
            
            // Track Google Ads Conversion 
            gtag('event', 'conversion', {
                'send_to': 'AW-17014026366/6bz-COPv-MYaEP7g9bA_',
                'event_callback': function() {
                    console.log('Google conversion tracked successfully');
                },
                'transaction_id': eventId  // Adding eventID as transaction_id for deduplication
            });
            
            // Track Meta/Facebook Conversion with same eventID
            fbq('track', 'Subscribe', {
                eventID: eventId
            });
            
            console.log('Conversion event tracked with ID:', eventId);
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
            });
            setIsLogin(true);
            toast.success("Registered Successfully! Please Login");
        }
    } catch (error) {
        console.error('Error:', error.message);
        toast.error(error.message || 'An error occurred during registration');
    }
};

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibilityRegister = () => setShowPasswordRegister(!showPasswordRegister);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    useEffect(() => {
    }, [userDetails]);

    return (
        <>
            {loading && <Loader btnLoad={false} />}
            <div className="flex items-center justify-center  p-4 bg-white md:mt-24 my-12">
                <div className="w-full max-w-4xl overflow-hidden ">
                    <div className="flex flex-col md:flex-row h-auto md:h-[580px]">
                        {/* Image Section - Hidden on mobile */}
                        <motion.div
                            className="hidden md:block md:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center justify-center h-full p-6 ">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/create-an-account-with-nexibles.webp`}
                                    alt="Auth illustration"
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                        </motion.div>

                        {/* Form Section */}
                        <motion.div
                            className="w-full p-6 overflow-y-auto bg-white md:p-8 md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {isLogin ? (
                                <>
                                    <h2 className="mb-4 mt-8 text-2xl font-bold text-center text-gray-900 md:text-3xl">Welcome back!</h2>
                                    <p className="mb-6 text-sm text-center text-gray-600 md:text-base">Enter to get unlimited access to data & information.</p>

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
                                    <h2 className="mb-4 text-2xl font-bold text-center text-gray-900 md:text-3xl">Create an account</h2>
                                    <p className="mb-6 text-sm text-center text-gray-600 md:text-base">Join us today and get access to all features</p>

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
                                    <Link href="#" className="text-[#4F1E9B] hover:underline">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="#" className="text-[#4F1E9B] hover:underline">
                                        Privacy Policy
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
























// "use client"
// import Link from 'next/link';
// import React from 'react'
// import { FaEnvelope, FaLock } from "react-icons/fa"
// import { useState, useEffect } from 'react';
// import { useAuth } from '@/utils/authContext';
// import { useRouter } from 'next/navigation';
// import Loader from '../comman/Loader';
// import { toast } from 'react-toastify';
// import ForgotPassword from './ForgotPassword';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { motion } from "framer-motion";

// function Login() {
//     const token = process.env.NEXT_PUBLIC_API_KEY;
//     const APIURL = process.env.NEXT_PUBLIC_API_URL;
//     const [showPasswordRegister, setShowPasswordRegister] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [password, setPassword] = useState("");
//     const router = useRouter();
//     const { login } = useAuth();
//     const [isLogin, setIsLogin] = useState(true);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await fetch(`${APIURL}/api/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     emailAddress: email,
//                     password: password,
//                 }),
//             });
//             const data = await response.json();
//             if (data.status === 'success') {
//                 const token = data.token;
//                 login(data.data);
//                 toast.success("Login Successfull");
//                 router.push('/');
//                 localStorage.setItem('token', token);
//             }
//             else {
//                 toast.error("Invalid Email or Password");
//             }
//         } catch (error) {
//             console.log('Invalid Request', error);
//         }
//         finally {
//             setLoading(false);
//         }
//     }

//     const [userDetails, setUserDetails] = useState({
//         customerId: "",
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         cName: "",
//         gender: "",
//         houseno: "",
//         floor: "",
//         address: "",
//         address2: "",
//         landmark: "",
//         city: "",
//         prov: "",
//         zip: "",
//         country: "",
//         phone: "",
//         emailAddress: "",
//         mobile: "",
//         mobile2: "",
//         company: "",
//         title: "",
//         workPhone: "",
//         dateOfBirth: "",
//         anniversary: "",
//         newsletter: "",
//         ipaddress: "",
//         subsms: "",
//         addedDate: "",
//         addedBy: "",
//         refby: "",
//         datasource: "",
//         occupation: "",
//         designation: "",
//         contactpref: "",
//         pref: "",
//         activatedon: "",
//         securecode: "",
//         active: "",
//         password: "",
//         profImage: "",
//     });

//     const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await fetch(`${APIURL}/api/login/create`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userDetails)
//         });

//         const data = await response.json(); // Parse the response JSON

//         if (response.ok) {
//             if (data.status === 'error' && data.message.includes('is already exist')) {
//                 toast.error('Email already exists. Please use a different email.');
//             } else {
//                 throw new Error(data.message || 'Network response was not ok');
//             }
//         } else {
//             // Reset user details
//             setUserDetails({
//                 customerId: "",
//                 firstName: "",
//                 middleName: "",
//                 lastName: "",
//                 cName: "",
//                 gender: "",
//                 houseno: "",
//                 floor: "",
//                 address: "",
//                 address2: "",
//                 landmark: "",
//                 city: "",
//                 prov: "",
//                 zip: "",
//                 country: "",
//                 phone: "",
//                 emailAddress: "",
//                 mobile: "",
//                 mobile2: "",
//                 company: "",
//                 title: "",
//                 workPhone: "",
//                 dateOfBirth: "",
//                 anniversary: "",
//                 newsletter: "",
//                 ipaddress: "",
//                 subsms: "",
//                 addedDate: "",
//                 addedBy: "",
//                 refby: "",
//                 datasource: "",
//                 occupation: "",
//                 designation: "",
//                 contactpref: "",
//                 pref: "",
//                 activatedon: "",
//                 securecode: "",
//                 active: "",
//                 password: "",
//                 profImage: "",
//             });
//             setIsLogin(true);
//             toast.success("Registered Successfully! Please Login");
//         }
//     } catch (error) {
//         console.error('Error:', error.message);
//         toast.error(error.message || 'An error occurred during registration');
//     }
// };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const togglePasswordVisibilityRegister = () => setShowPasswordRegister(!showPasswordRegister);

//     const toggleForm = () => {
//         setIsLogin(!isLogin);
//     };

//     useEffect(() => {
//     }, [userDetails]);

//     return (
//         <>
//             {loading && <Loader btnLoad={false} />}
//             <div className="flex items-center justify-center  p-4 bg-white md:mt-24 my-12">
//                 <div className="w-full max-w-4xl overflow-hidden ">
//                     <div className="flex flex-col md:flex-row h-auto md:h-[580px]">
//                         {/* Image Section - Hidden on mobile */}
//                         <motion.div
//                             className="hidden md:block md:w-1/2"
//                             initial={{ opacity: 0, x: -50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             <div className="flex items-center justify-center h-full p-6 ">
//                                 <img
//                                     src={`${process.env.NEXT_PUBLIC_CDN_URL}/create-an-account-with-nexibles.webp`}
//                                     alt="Auth illustration"
//                                     className="object-cover w-full h-full rounded-lg"
//                                 />
//                             </div>
//                         </motion.div>

//                         {/* Form Section */}
//                         <motion.div
//                             className="w-full p-6 overflow-y-auto bg-white md:p-8 md:w-1/2"
//                             initial={{ opacity: 0, x: 50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             {isLogin ? (
//                                 <>
//                                     <h2 className="mb-4 mt-8 text-2xl font-bold text-center text-gray-900 md:text-3xl">Welcome back!</h2>
//                                     <p className="mb-6 text-sm text-center text-gray-600 md:text-base">Enter to get unlimited access to data & information.</p>

//                                     <form onSubmit={handleLogin} className="flex flex-col space-y-4">
//                                         <div className="relative">
//                                             <FaEnvelope className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 left-4" />
//                                             <input
//                                                 type="email"
//                                                 onChange={(e) => setEmail(e.target.value)}
//                                                 value={email}
//                                                 placeholder="Enter your email address"
//                                                 required
//                                                 className="w-full rounded-lg border border-gray-300 py-2.5 pl-12 pr-4 text-gray-700 focus:border-[#103b60] focus:outline-none"
//                                             />
//                                         </div>

//                                         <div className="relative">
//                                             <FaLock className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 left-4" />
//                                             <input
//                                                 type={showPassword ? "text" : "password"}
//                                                 onChange={(e) => setPassword(e.target.value)}
//                                                 value={password}
//                                                 placeholder="Enter your password"
//                                                 required
//                                                 className="w-full rounded-lg border border-gray-300 py-2.5 pl-12 pr-10 text-gray-700 focus:border-[#103b60] focus:outline-none"
//                                             />
//                                             <span
//                                                 onClick={togglePasswordVisibility}
//                                                 className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer top-1/2 right-4"
//                                             >
//                                                 {showPassword ? <FaEye /> : <FaEyeSlash />}
//                                             </span>
//                                         </div>

//                                         <div className="flex items-center justify-end">
//                                             <div
//                                                 onClick={() => setShowModal(true)}
//                                                 className="text-sm font-medium text-[#103b60] hover:text-[#103b60] cursor-pointer"
//                                             >
//                                                 Forgot password?
//                                             </div>
//                                         </div>

//                                         <button
//                                             type="submit"
//                                             className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#103b60] rounded-lg md:text-base hover:bg-[#0d2e4d] focus:outline-none focus:ring-2 focus:ring-[#103b60] focus:ring-opacity-50"
//                                         >
//                                             Log in
//                                         </button>

//                                         <div className="mt-4 text-center">
//                                             <p className="text-sm text-gray-600">
//                                                 {`Don't have an account?`}{" "}
//                                                 <span
//                                                     onClick={toggleForm}
//                                                     className="text-[#4F1E9B] cursor-pointer font-medium hover:underline"
//                                                 >
//                                                     Register here
//                                                 </span>
//                                             </p>
//                                         </div>
//                                     </form>
//                                 </>
//                             ) : (
//                                 <>
//                                     <h2 className="mb-4 text-2xl font-bold text-center text-gray-900 md:text-3xl">Create an account</h2>
//                                     <p className="mb-6 text-sm text-center text-gray-600 md:text-base">Join us today and get access to all features</p>

//                                     <form onSubmit={handleRegister} className="space-y-4">
//                                         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                                             <div className="flex flex-col">
//                                                 <label htmlFor="firstName" className="mb-1 text-sm font-medium text-gray-700">
//                                                     First Name*
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     id="firstName"
//                                                     required
//                                                     className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none"
//                                                     value={userDetails.firstName}
//                                                     onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
//                                                 />
//                                             </div>

//                                             <div className="flex flex-col">
//                                                 <label htmlFor="lastName" className="mb-1 text-sm font-medium text-gray-700">
//                                                     Last Name*
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     id="lastName"
//                                                     required
//                                                     className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none"
//                                                     value={userDetails.lastName}
//                                                     onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
//                                                 />
//                                             </div>

//                                             <div className="flex flex-col md:col-span-2">
//                                                 <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
//                                                     Email Address*
//                                                 </label>
//                                                 <input
//                                                     type="email"
//                                                     id="email"
//                                                     required
//                                                     className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none"
//                                                     value={userDetails.emailAddress}
//                                                     onChange={(e) => setUserDetails({ ...userDetails, emailAddress: e.target.value })}
//                                                 />
//                                             </div>

//                                             <div className="relative flex flex-col md:col-span-2">
//                                                 <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
//                                                     Password*
//                                                 </label>
//                                                 <input
//                                                     type={showPasswordRegister ? "text" : "password"}
//                                                     id="password"
//                                                     required
//                                                     className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:border-[#103b60] focus:outline-none pr-10"
//                                                     value={userDetails.password}
//                                                     onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
//                                                 />
//                                                 <span
//                                                     onClick={togglePasswordVisibilityRegister}
//                                                     className="absolute right-3 bottom-2.5 cursor-pointer text-gray-500"
//                                                 >
//                                                     {showPasswordRegister ? <FaEye /> : <FaEyeSlash />}
//                                                 </span>
//                                             </div>
//                                         </div>

//                                         <div className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 id="terms"
//                                                 required
//                                                 className="w-4 h-4 text-[#103b60] focus:ring-[#103b60] border-gray-300 rounded"
//                                             />
//                                             <label htmlFor="terms" className="block ml-2 text-xs text-gray-700 md:text-sm">
//                                                 I agree to the Terms of Service and Privacy Policy
//                                             </label>
//                                         </div>

//                                         <button
//                                             type="submit"
//                                             className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#103b60] rounded-lg md:text-base hover:bg-[#0d2e4d] focus:outline-none focus:ring-2 focus:ring-[#103b60] focus:ring-opacity-50"
//                                         >
//                                             Create account
//                                         </button>

//                                         <div className="text-center">
//                                             <p className="text-sm text-gray-600">
//                                                 Already have an account?{" "}
//                                                 <span
//                                                     onClick={toggleForm}
//                                                     className="text-[#4F1E9B] cursor-pointer font-medium hover:underline"
//                                                 >
//                                                     Log in
//                                                 </span>
//                                             </p>
//                                         </div>
//                                     </form>
//                                 </>
//                             )}

//                             <div className="mt-6 text-xs text-center text-gray-500">
//                                 <p>
//                                     By {isLogin ? "logging in" : "registering"}, you agree to our{" "}
//                                     <Link href="#" className="text-[#4F1E9B] hover:underline">
//                                         Terms of Service
//                                     </Link>{" "}
//                                     and{" "}
//                                     <Link href="#" className="text-[#4F1E9B] hover:underline">
//                                         Privacy Policy
//                                     </Link>
//                                 </p>
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//                 {showModal && <ForgotPassword onClose={() => setShowModal(false)} />}
//             </div>
//         </>
//     );
// }

// export default Login;