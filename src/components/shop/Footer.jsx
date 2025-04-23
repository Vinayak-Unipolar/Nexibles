"use client";
import { useState, useEffect, useRef } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { FiMail } from "react-icons/fi";
import { FaMobile } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion, useInView } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const token = "irrv211vui9kuwn11efsb4xd4zdkuq";
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px", // Delay until section is closer to viewport center
  });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "API-Key": token,
        },
        body: JSON.stringify({ email: email }),
      });
      if (response.ok) {
        setMessage("Successfully subscribed!");
        toast.success("Successfully subscribed!");
        setEmail("");
      } else {
        setMessage("Subscription failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/product_list/4`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "API-Key": "irrv211vui9kuwn11efsb4xd4zdkuq",
          },
        });
        const result = await response.json();
        if (result.status === "success") {
          setProductData(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Framer Motion variants for animations
  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: i * 0.1 + 0.4, ease: "easeOut" },
    }),
  };

  return (
    <footer ref={footerRef}>
      <div className="h-auto bg-[#103b60]">
        <div className="px-6 py-14 md:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row md:justify-around">
            {/* <div className="mb-8 md:mb-0">
              <motion.ul
                className="text-white tracking-widest"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.li
                  className="font-bold mb-4 text-white"
                  custom={0}
                  variants={titleVariants}
                >
                  PRODUCTS
                </motion.li>
                {productData.length > 0 ? (
                  productData.map((product, index) => (
                    <motion.li
                      key={product.id}
                      className="text-white mb-2 cursor-pointer"
                      custom={index + 1}
                      variants={itemVariants}
                    >
                      <Link
                        href={`/product/${encodeURIComponent(product.category.toLowerCase()).replace(/%20/g, "-")}/${encodeURIComponent(product.name.toLowerCase()).replace(/%20/g, "-")}/${product.id}`}
                      >
                        {product.name}
                      </Link>
                    </motion.li>
                  ))
                ) : (
                  <motion.li
                    className="text-white mb-2"
                    custom={1}
                    variants={itemVariants}
                  >
                    Loading...
                  </motion.li>
                )}
              </motion.ul>
            </div> */}

            <div className="mb-8 md:mb-0">
              <motion.ul
                className="text-white tracking-widest"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.li
                  className="font-bold mb-4 text-white uppercase"
                  custom={0}
                  variants={titleVariants}
                >
                  Customer service
                </motion.li>
                <motion.li
                  custom={1}
                  variants={itemVariants}
                >
                  <Link href="/my-dashboard">
                    <span className="text-white mb-2">My Account</span>
                  </Link>
                </motion.li>
                <motion.li
                  custom={2}
                  variants={itemVariants}
                >
                  <Link href="/privacy-policy">
                    <span className="text-white mb-2">Privacy Policy</span>
                  </Link>
                </motion.li>
                <motion.li
                  custom={3}
                  variants={itemVariants}
                >
                  <Link href="/shipping-policy">
                    <span className="text-white mb-2">Shipping Policy</span>
                  </Link>
                </motion.li>
                <motion.li
                  custom={4}
                  variants={itemVariants}
                >
                  <Link href="/return-and-refund-policy">
                    <span className="text-white mb-2">Returns & Refund</span>
                  </Link>
                </motion.li>
                <motion.li
                  custom={5}
                  variants={itemVariants}
                >
                  <Link href="/terms-conditions">
                    <span className="text-white mb-2">Terms & Conditions</span>
                  </Link>
                </motion.li>
              </motion.ul>
            </div>

            <div className="mb-8 md:mb-0">
              <motion.ul
                className="text-white tracking-widest"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.li
                  className="font-bold mb-4 text-white uppercase"
                  custom={0}
                  variants={titleVariants}
                >
                  Company
                </motion.li>
                <motion.li
                  custom={1}
                  variants={itemVariants}
                >
                  <Link href="/about">
                    <span className="text-white mb-2">About</span>
                  </Link>
                </motion.li>
                <motion.li
                  custom={2}
                  variants={itemVariants}
                >
                  <Link href="/infrastructure">
                    <span className="text-white mb-2">Infrastructure</span>
                  </Link>
                </motion.li>
                <motion.li
                  custom={3}
                  variants={itemVariants}
                >
                  <Link href="/businesses">
                    <span className="text-white mb-2">Industries</span>
                  </Link>
                </motion.li>
              </motion.ul>
            </div>

            <div>
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.h3
                  className="font-bold text-white mr-3 mb-4 tracking-widest"
                  custom={0}
                  variants={titleVariants}
                >
                  SUBSCRIBE
                </motion.h3>
                <motion.p
                  className="text-white mb-4 tracking-wider"
                  custom={1}
                  variants={itemVariants}
                >
                  Do you want to get notified ?<br />
                  Sign up for our newsletter<br />
                  and you will be among the<br />
                  first to find out about<br />
                  new features & offers.
                </motion.p>
                <motion.form
                  className="flex items-center justify-between bg-white rounded-md overflow-hidden"
                  onSubmit={handleSubscribe}
                  custom={2}
                  variants={itemVariants}
                >
                  <span className="text-blue-3 px-4 py-2">
                    <FiMail size={20} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="px-2 md:px-2 py-2 md:py-2 border-0 focus:outline-none text-black text-sm md:text-base flex-grow"
                    required
                  />
                  <motion.button
                    className="bg-[#ffd13e] text-white mr-1 rounded-md px-2 md:px-6 py-2 hover:bg-[#fffc39] focus:outline-none text-sm md:text-base"
                    custom={3}
                    variants={itemVariants}
                  >
                    <BsSendFill style={{ color: "black" }} />
                  </motion.button>
                </motion.form>
                {message && (
                  <motion.p
                    className="text-white mt-2"
                    custom={4}
                    variants={itemVariants}
                  >
                    {message}
                  </motion.p>
                )}
              </motion.div>
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-white"
              >
                <motion.h3
                  className="font-bold py-4 tracking-widest"
                  custom={0}
                  variants={titleVariants}
                >
                  FOLLOW US
                </motion.h3>
                <motion.div
                  className="flex gap-x-7"
                  custom={1}
                  variants={itemVariants}
                >
                  <motion.a
                    href="https://wa.me/919821045101"
                    className="hover:text-gray-300"
                    custom={0}
                    variants={iconVariants}
                  >
                    <FaWhatsapp size={25} />
                  </motion.a>
                  <motion.a
                    href="tel:+919821045101"
                    className="hover:text-gray-300"
                    custom={1}
                    variants={iconVariants}
                  >
                    <IoCallOutline size={25} />
                  </motion.a>
                  <motion.a
                    href="mailto:sales@artnext.in"
                    className="hover:text-gray-300"
                    custom={2}
                    variants={iconVariants}
                  >
                    <FiMail size={25} />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
          {/* <div className="text-start mt-10 text-gray-300 px-14">
            <p>{`© 2024 Artnext Pvt Ltd, All Rights Reserved.`}</p>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
