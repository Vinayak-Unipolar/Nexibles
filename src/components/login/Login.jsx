"use client"
import Link from 'next/link';
import React from 'react'
import { FaEnvelope, FaLock } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
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
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const data = await response.json();
                toast.success("Registered Successfully!. Please Login");
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
                })
                setIsLogin(true);
            }
        } catch (error) {
            console.error('Error:', error.message);
            toast.error(error.message);
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
            <div className="bg-white min-h-screen flex items-center justify-center p-4 mt-8">
                <div className="w-full max-w-6xl shadow-xl rounded-xl border overflow-hidden">
                    <div className="flex flex-col md:flex-row h-[600px]">
                        {/* Image Section */}
                        <motion.div 
                            className="md:w-1/2 w-full "
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="h-full flex items-center justify-center p-6 bg-gray-100">
                                <img
                                    src="/Pictures/Factory.png"
                                    alt="Auth illustration"
                                    className="w-full h-full object-fill rounded-lg shadow-lg"
                                />
                            </div>
                        </motion.div>
                        
                        {/* Form Section */}
                        <motion.div 
                            className="md:w-1/2 w-full bg-white p-8 overflow-y-auto"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {isLogin ? (
                                <>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome back!</h2>
                                    <p className="text-gray-600 mb-6">Enter to get unlimited access to data & information.</p>
                                    
                                    <form onSubmit={handleLogin} className="flex flex-col space-y-5">
                                        <div className="relative">
                                            <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500" />
                                            <input
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                placeholder="Enter your email address"
                                                required
                                                className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-gray-700 focus:border-[#103b60] focus:outline-none"
                                            />
                                        </div>
                                        
                                        <div className="relative">
                                            <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                placeholder="Enter your password"
                                                required
                                                className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-10 text-gray-700 focus:border-[#103b60] focus:outline-none"
                                            />
                                            <span
                                                onClick={togglePasswordVisibility}
                                                className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-500"
                                            >
                                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="remember"
                                                    className="h-4 w-4 text-[#103b60] focus:ring-[#103b60] border-gray-300 rounded"
                                                />
                                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                                    Remember me
                                                </label>
                                            </div>
                                            <div
                                                onClick={() => setShowModal(true)}
                                                className="text-sm font-medium text-[#103b60] hover:text-[#103b60] cursor-pointer"
                                            >
                                                Forgot your password?
                                            </div>
                                        </div>
                                        
                                        <button
                                            type="submit"
                                            className="w-full bg-[#103b60] text-white py-3 rounded-lg font-medium  transition-colors"
                                        >
                                            Log in
                                        </button>
                                        
                                        <div className="text-center mt-4">
                                            <p className="text-gray-600">
                                                Don't have an account?{" "}
                                                <span
                                                    onClick={toggleForm}
                                                    className="text-[#103b60] cursor-pointer font-medium"
                                                >
                                                    Register here
                                                </span>
                                            </p>
                                        </div>
                                    </form>
                                    
                                    <div className="mt-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">Or login with</span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6">
    <button className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
        <FcGoogle className="h-5 w-5" />
        Sign up with Google
    </button>
</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Create an account</h2>
                                    <p className="text-gray-600 mb-6">Join us today and get access to all features</p>
                                    
                                    <form onSubmit={handleRegister} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col">
                                                <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    required
                                                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#103b60] focus:outline-none"
                                                    value={userDetails.firstName}
                                                    onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                                                />
                                            </div>
                                            
                                            <div className="flex flex-col">
                                                <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    required
                                                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#103b60] focus:outline-none"
                                                    value={userDetails.lastName}
                                                    onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                                                />
                                            </div>
                                            
                                            <div className="flex flex-col">
                                                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#103b60] focus:outline-none"
                                                    value={userDetails.emailAddress}
                                                    onChange={(e) => setUserDetails({ ...userDetails, emailAddress: e.target.value })}
                                                />
                                            </div>
                                            
                                            <div className="flex flex-col relative">
                                                <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                                                    Password
                                                </label>
                                                <input
                                                    type={showPasswordRegister ? "text" : "password"}
                                                    id="password"
                                                    required
                                                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#103b60] focus:outline-none pr-10"
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
                                        
                                        <button
                                            type="submit"
                                            className="w-full bg-[#103b60] text-white py-3 rounded-lg font-medium  transition-colors"
                                        >
                                            Create account
                                        </button>
                                        
                                        <div className="text-center">
                                            <p className="text-gray-600">
                                                Already have an account?{" "}
                                                <span
                                                    onClick={toggleForm}
                                                    className="text-[#103b60]  cursor-pointer font-medium"
                                                >
                                                    Log in
                                                </span>
                                            </p>
                                        </div>
                                    </form>
                                </>
                            )}
                            
                            <div className="mt-6 text-xs text-gray-500">
                                <p>
                                    By {isLogin ? "logging in" : "registering"}, you agree to our{" "}
                                    <Link href="#" className="text-[#103b60] hover:underline">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="#" className="text-[#103b60] hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
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