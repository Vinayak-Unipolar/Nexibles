"use client";
import { useState, useRef, useEffect } from "react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { BsSendFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { toast } from "react-toastify";
import Script from "next/script";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Hotjar tracking code
      if (!window.hj) {
        (function(h, o, t, j, a, r) {
          h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments); };
          h._hjSettings = { hjid: 6392410, hjsv: 6 };
          a = o.getElementsByTagName('head')[0];
          r = o.createElement('script');
          r.async = 1;
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
      }
    }
  }, []); 

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
        body: JSON.stringify({ email, origin: "nexibles" }),
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
    <>
      {/* Facebook Meta Pixel Code */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '704750105429204');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=704750105429204&ev=PageView&noscript=1"
          alt="Facebook pixel"
        />
      </noscript>
      {/* End Meta Pixel Code */}
      
      <footer ref={footerRef} className="bg-[#103b60] text-white">
        <div className="px-6 mx-auto max-w-7xl py-14">
          <div className="flex flex-col justify-between gap-10 lg:flex-row md:gap-52 ">

            <div className="flex-1">
              <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"}>
                <motion.h3 className="mb-4 text-lg font-bold tracking-widest" custom={0} variants={titleVariants}>
                  SUBSCRIBE
                </motion.h3>
                <motion.p className="mb-6 text-sm" custom={1} variants={itemVariants}>
                  Do you want to get notified? <br />
                  Sign up for our newsletter and be the first
                  to find out about new features & offers.
                </motion.p>

                
                <motion.form
                  onSubmit={handleSubscribe}
                  className="flex items-center overflow-hidden bg-white rounded-md"
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
                    className="flex-grow px-2 py-2 text-sm text-black focus:outline-none"
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
                  <motion.p className="mt-2 text-sm" custom={4} variants={itemVariants}>
                    {message}
                  </motion.p>
                )}
              </motion.div>

              {/* Follow Us */}
              <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} className="mt-8">
                <motion.h3 className="mb-4 font-bold tracking-widest" custom={0} variants={titleVariants}>
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
                    href="https://www.linkedin.com/company/nexibles/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                    custom={2}
                    variants={iconVariants}
                  >
                    <FaLinkedin size={25} />
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
                <motion.li className="mb-4 font-bold uppercase" custom={0} variants={titleVariants}>
                  Company
                </motion.li>
                <motion.li custom={1} variants={itemVariants}><Link href="/about">About</Link></motion.li>
                {/* <motion.li custom={2} variants={itemVariants}><Link href="/infrastructure">Infrastructure</Link></motion.li> */}
                <motion.li custom={3} variants={itemVariants}><Link href="/all-industry">Industries</Link></motion.li>
                <motion.li custom={3} variants={itemVariants}><Link href="/shop">Nexi Classic</Link></motion.li>
                <motion.li custom={3} variants={itemVariants}><Link href="/configuration-tool">Custom Size Pouch</Link></motion.li>
                <motion.li custom={3} variants={itemVariants}><Link href="/request-quote">Request Quote</Link></motion.li>
              </motion.ul>
            </div>

            {/* Customer Service Links */}
            <div className="flex-1">
              <motion.ul initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-3">
                <motion.li className="mb-4 font-bold uppercase" custom={0} variants={titleVariants}>
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
    </>
  );
};

export default Footer;