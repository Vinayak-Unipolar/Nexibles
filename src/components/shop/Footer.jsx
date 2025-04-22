"use client";
import { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaMobile } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { BsSendFill } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion, useInView } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const token = "irrv211vui9kuwn11efsb4xd4zdkuq";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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

  // Animation variants
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

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: "easeOut" } },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: i * 0.1 + 0.6, ease: "easeOut" },
    }),
  };

  return (
    <footer>
      <div className="h-auto bg-[#103b60]">
        <div className="px-6 py-14 md:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row md:justify-around">
            <div className="mb-8 md:mb-0">
              <motion.ul
                className="text-white tracking-widest"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.li
                  className="font-bold mb-4 text-white uppercase"
                  variants={titleVariants}
                >
                  Customer Service
                </motion.li>
                {[
                  { href: "/my-dashboard", text: "My Account" },
                  { href: "/privacy-policy", text: "Privacy Policy" },
                  { href: "/shipping-policy", text: "Shipping Policy" },
                  { href: "/return-and-refund-policy", text: "Returns & Refund" },
                  { href: "/terms-conditions", text: "Terms & Conditions" },
                ].map((item, index) => (
                  <motion.li
                    key={item.text}
                    custom={index}
                    variants={itemVariants}
                  >
                    <Link href={item.href}>
                      <span className="text-white mb-2 block">{item.text}</span>
                    </Link>
                  </motion.li>
                ))}
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
                  variants={titleVariants}
                >
                  Company
                </motion.li>
                {[
                  { href: "/about", text: "About" },
                  { href: "/infrastructure", text: "Infrastructure" },
                  { href: "/businesses", text: "Industries" },
                ].map((item, index) => (
                  <motion.li
                    key={item.text}
                    custom={index}
                    variants={itemVariants}
                  >
                    <Link href={item.href}>
                      <span className="text-white mb-2 block">{item.text}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div>
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.h3
                  className="font-bold text-white mr-3 mb-4 tracking-widest uppercase"
                  variants={titleVariants}
                >
                  Subscribe
                </motion.h3>
                <motion.p
                  className="text-white mb-4 tracking-wider"
                  variants={itemVariants}
                  custom={0}
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
                  variants={formVariants}
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
                  <button
                    className="bg-red-1 text-white mr-1 rounded-md px-2 md:px-6 py-2 hover:bg-red-900 focus:outline-none text-sm md:text-base"
                  >
                    <BsSendFill />
                  </button>
                </motion.form>
                {message && (
                  <motion.p
                    className="text-white mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {message}
                  </motion.p>
                )}
              </motion.div>
              <motion.div
                className="text-white"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.h3
                  className="font-bold py-4 tracking-widest uppercase"
                  variants={titleVariants}
                >
                  Follow Us
                </motion.h3>
                <div className="flex gap-x-7">
                  <a
                    href="https://wa.me/919821045101"
                    className="hover:text-gray-300"
                  >
                    <FaWhatsapp size={25} />
                  </a>
                  <a
                    href="tel:+919821045101"
                    className="hover:text-gray-300"
                  >
                    <IoCallOutline size={25} />
                  </a>
                  <a
                    href="mailto:sales@artnext.in"
                    className="hover:text-gray-300"
                  >
                    <FiMail size={25} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;