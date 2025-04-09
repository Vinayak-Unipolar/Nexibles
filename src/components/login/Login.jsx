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
                // toast.error(data.status)
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
            }
        } catch (error) {
            console.error('Error:', error.message);
            toast.error(error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibilityRegister = () => setShowPasswordRegister(!showPasswordRegister); // Toggle for registration password
    useEffect(() => {
    }, [userDetails]);


    return (
        <>
            {loading && <Loader btnLoad={false} />}
            <div className="bg-white mt-20">
                <div className="md:flex">
                    <div className="md:w-1/2 w-full bg-white md:px-8 px-4 border-t py-4">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Log-in</h2>
                        <hr />
                        <p className="text-xl font-bold text-gray-900 py-2">Please login to access your account and explore amazing features.</p>
                        <form onSubmit={handleLogin} action="" className="flex flex-col space-y-4 py-4">
                            <div className="relative">
                                <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-900" />
                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="Enter Your Email"
                                    required
                                    className="text-sm pl-12 w-full rounded-md border-2 border-gray-900 py-3 px-8 font-bold text-gray-900"
                                />
                            </div>
                            <div className="relative">
                                <div>
                                    <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-900" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder="Enter Your Password"
                                        required
                                        className="text-sm pl-12 w-full rounded-md border-2 border-gray-900 py-3 px-8 font-bold text-gray-900"
                                    />
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-900"
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                            </div>

                            <p onClick={() => setShowModal(true)} className="underline text-gray-600 cursor-pointer ml-2">Forgot Password</p>
                            <p className="text-gray-900 text-sm mt-10">By signing in, you have read and agree to our General Terms and Conditions. For more details on how we use the information we collect about you, please read our Privacy and Cookie Policy.</p>
                            <div className="mt-4">
                                <button className="bg-[#30384E] rounded-md text-white px-8 py-2 " type="submit" >LOG-IN</button>
                            </div>
                        </form>
                    </div>
                    <div className="md:w-1/2 w-full bg-gray-300 p-8">
                        <div className="bg-white h-full w-full">
                            {/*<div className="flex flex-col justify-center items-center">*/}
                            <img
                                src="/login/signup-placeholder-nexibles.jpg"
                                alt="Login-placeholder"
                                className="w-full h-full" />
                            {/* <h2 className="text-gray-900 font-bold text-xl">Dont have an account sign-up...</h2>
                                <div className="mt-6">
                                  
                                    <div className="space-y-4">
                                        <div className="">
                                            <button className="text-sm tracking-wider text-start md:w-[400px] w-full rounded-md  text-white bg-black px-8 py-3 flex items-center justify-between">
                                                Continue with Google
                                                <FaGoogle className="ml-2" size={20} />
                                            </button>
                                        </div>
                                        <div className="">
                                            <button className="text-sm tracking-wider text-start md:w-[400px] w-full rounded-md  text-white bg-black px-8 py-3 flex items-center justify-between">
                                                Continue with Facebook
                                                <FaFacebook className="ml-2" size={20} />
                                            </button>
                                        </div>
                                        <div className="">
                                            <button className="text-sm tracking-wider text-start md:w-[400px] w-full rounded-md  text-white bg-black px-8 py-3 flex items-center justify-between">
                                                Continue with Apple
                                                <FaApple className="ml-2" size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <div className="bg-white border-t">
                    <div className="px-8 py-4">
                        <h2 className="text-gray-900 font-bold py-2 text-xl">Create an account with email.</h2>
                        <div className="py-2">
                            <form action="" onSubmit={handleRegister}>
                                <div className="flex flex-wrap gap-10">
                                    <div className="flex flex-col w-full md:w-1/5">
                                        <label htmlFor="" className="text-gray-900 font-bold">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="border-b border-gray-900 text-gray-900 w-full outline-none"
                                            value={userDetails.firstName}
                                            onChange={(e) => { setUserDetails({ ...userDetails, firstName: e.target.value }) }}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full md:w-1/5">
                                        <label htmlFor="" className="text-gray-900 font-bold">Last Name</label>
                                        <input
                                            className="border-b border-gray-900 text-gray-900 w-full outline-none"
                                            type="text"
                                            required
                                            value={userDetails.lastName}
                                            onChange={(e) => { setUserDetails({ ...userDetails, lastName: e.target.value }) }}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full md:w-1/5">
                                        <label htmlFor="" className="text-gray-900 font-bold">Email</label>
                                        <input
                                            className="border-b border-gray-900 text-gray-900 w-full outline-none"
                                            type="email"
                                            required
                                            value={userDetails.emailAddress}
                                            onChange={(e) => { setUserDetails({ ...userDetails, emailAddress: e.target.value }) }}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full md:w-1/5 relative">
                                        <label className="text-gray-900 font-bold">Password</label>
                                        <input
                                            className="border-b border-gray-900 text-gray-900 w-full outline-none"
                                            type={showPasswordRegister ? "text" : "password"} // Toggle here for register password
                                            required
                                            value={userDetails.password}
                                            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                        />
                                        <span
                                            onClick={togglePasswordVisibilityRegister}
                                            className="absolute top-1/2 bottom-5 right-4 transform -translate-y-1/2 cursor-pointer text-gray-900"
                                        >
                                            {showPasswordRegister ? <FaEye /> : <FaEyeSlash />}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button className="px-8 py-2 bg-[#111B36] text-white rounded-md  uppercase mt-6">create an account</button>
                                </div>
                            </form>
                        </div>

                        <div className="py-4">
                            <p className="text-gray-900 text-sm">By registering with your email address or logging in using Google or Facebook or Apple, you consent to receive transactional, promotional and/or commercial messages from us We may use several modes of communication concerning your website usage. Registration also enables us to manage your stored designs: By clicking on the Create an Account bution, you agree to our General Terms and Conditions. View our Privacy and Cookie Policy. You also authorize us (Nexibles Pvt. Ltd.) ) and its representatives to contact you through Call, Email SMS or WhatsApp. This consent evemdes your registration under DNC/NDNC (this would mean we would contact you even if you are registered on any Do Not Disturb list prior to this account creation)</p>
                        </div>
                    </div>
                </div>
                {showModal && <ForgotPassword onClose={() => setShowModal(false)} />}
            </div>
        </>
    )
}

export default Login