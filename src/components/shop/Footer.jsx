"use client";
import { useState, useRef } from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { BsSendFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const token = "irrv211vui9kuwn11efsb4xd4zdkuq";
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px",
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
        body: JSON.stringify({ email ,origin: "nexibles" }),
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
    <footer ref={footerRef} className="bg-[#103b60] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row justify-between gap-10 md:gap-52 ">
          
          {/* Subscribe Section */}
          <div className="flex-1">
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <motion.h3 className="font-bold text-lg mb-4 tracking-widest" custom={0} variants={titleVariants}>
                SUBSCRIBE
              </motion.h3>
              <motion.p className="text-sm mb-6" custom={1} variants={itemVariants}>
                Do you want to get notified? <br />
                Sign up for our newsletter and be the first <br />
                to find out about new features & offers.
              </motion.p>
              <motion.form
                onSubmit={handleSubscribe}
                className="flex items-center bg-white rounded-md overflow-hidden"
                custom={2}
                variants={itemVariants}
              >
                <span className="px-4 py-2 text-[#103b60]">
                  <FiMail size={20} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-grow px-2 py-2 text-black text-sm focus:outline-none"
                  required
                />
                <motion.button
                  type="submit"
                  className="bg-[#ffd13e] px-4 py-2 hover:bg-[#fffc39] transition"
                  custom={3}
                  variants={itemVariants}
                >
                  <BsSendFill style={{ color: "black" }} />
                </motion.button>
              </motion.form>
              {message && (
                <motion.p className="text-sm mt-2" custom={4} variants={itemVariants}>
                  {message}
                </motion.p>
              )}
            </motion.div>

            {/* Follow Us */}
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} className="mt-8">
              <motion.h3 className="font-bold mb-4 tracking-widest" custom={0} variants={titleVariants}>
                FOLLOW US
              </motion.h3>
              <motion.div className="flex space-x-6" custom={1} variants={itemVariants}>
                <motion.a
                  href="https://www.instagram.com/nexibles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                  custom={0}
                  variants={iconVariants}
                >
                  <FaInstagram size={25} />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/nexiblesin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                  custom={1}
                  variants={iconVariants}
                >
                  <ImFacebook2 size={25} />
                </motion.a>
                <motion.a
                  href="https://youtube.com/@nexibles?si=uU5OBkb1TptuNoRD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                  custom={2}
                  variants={iconVariants}
                >
                  <FaYoutube size={25} />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Company Links */}
          <div className="flex-1">
            <motion.ul initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-3">
              <motion.li className="font-bold uppercase mb-4" custom={0} variants={titleVariants}>
                Company
              </motion.li>
              <motion.li custom={1} variants={itemVariants}><Link href="/about">About</Link></motion.li>
              {/* <motion.li custom={2} variants={itemVariants}><Link href="/infrastructure">Infrastructure</Link></motion.li> */}
              <motion.li custom={3} variants={itemVariants}><Link href="/businesses">Industries</Link></motion.li>
            </motion.ul>
          </div>

          {/* Customer Service Links */}
          <div className="flex-1">
            <motion.ul initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-3">
              <motion.li className="font-bold uppercase mb-4" custom={0} variants={titleVariants}>
                Customer Service
              </motion.li>
              <motion.li custom={1} variants={itemVariants}><Link href="/my-dashboard">My Account</Link></motion.li>
              <motion.li custom={2} variants={itemVariants}><Link href="/privacy-policy">Privacy Policy</Link></motion.li>
              <motion.li custom={3} variants={itemVariants}><Link href="/shipping-policy">Shipping Policy</Link></motion.li>
              <motion.li custom={4} variants={itemVariants}><Link href="/return-and-refund-policy">Returns & Refund</Link></motion.li>
              <motion.li custom={5} variants={itemVariants}><Link href="/terms-conditions">Terms & Conditions</Link></motion.li>
            </motion.ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
