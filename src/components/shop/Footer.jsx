"use client"
import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { FiMail } from "react-icons/fi";
import { FaMobile } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import Link from "next/link";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const token = 'irrv211vui9kuwn11efsb4xd4zdkuq';

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
          'Content-type': 'application/json',
          'API-Key': token,
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
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'API-Key': 'irrv211vui9kuwn11efsb4xd4zdkuq',
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

  return (
    <footer>
      <div className="h-auto bg-[#103b60]">
        <div className="px-6 py-14 md:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row md:justify-around">
            <div className="mb-8 md:mb-0">
              {/* <ul className="text-white tracking-widest">
                <li className="font-bold mb-4 text-white">PRODUCTS</li>
                {productData.length > 0 ? (
                  productData.map((product) => (
                    <Link
                      href={`/product/${encodeURIComponent(product.category.toLowerCase()).replace(/%20/g, '-')}/${encodeURIComponent(product.name.toLowerCase()).replace(/%20/g, '-')}/${product.id}`}
                      key={product.id}
                    >
                      <li className="text-white mb-2 cursor-pointer">
                        {product.name}
                      </li>
                    </Link>
                  ))
                ) : (
                  <li className="text-white mb-2">
                    Loading...
                  </li>
                )}
              </ul> */}
            </div>

            <div className="mb-8 md:mb-0">
              <ul className="text-white tracking-widest">
                <li className="font-bold mb-4 text-white uppercase">
                  Customer service
                </li>
                <Link href="/my-dashboard">
                  <li className="text-white mb-2">My Account</li>
                </Link>
                <Link href="/privacy-policy">
                  <li className="text-white mb-2">Privacy Policy</li>
                </Link>
                <Link href="/shipping-policy">
                  <li className="text-white mb-2">Shipping Policy</li>
                </Link>
                <Link href="/return-and-refund-policy">
                  <li className="text-white mb-2">Returns & Refund</li>
                </Link>
                <Link href="/terms-conditions">
                  <li className="text-white mb-2">Terms & Conditions</li>
                </Link>
              </ul>
            </div>

            <div className="mb-8 md:mb-0">
              <ul className="text-white tracking-widest">
                <li className="font-bold mb-4 text-white uppercase">company</li>
                <Link href="/about">
                  <li className="text-white mb-2">About</li>
                </Link>
                <Link href="/infrastructure">
                  <li className="text-white mb-2">Infrastructure</li>
                </Link>
                <Link href="/businesses">
                  <li className="text-white mb-2">Industries</li>
                </Link>
              </ul>
            </div>

            <div>
              <div>
                <h3 className="font-bold text-white mr-3 mb-4 tracking-widest">
                  SUBSCRIBE
                </h3>
                <p className="text-white mb-4 tracking-wider">
                  Do you want to get notified ?<br />
                  Sign up for our newsletter<br />
                  and you will be among the<br />
                  first to find out about<br />
                  new features & offers.
                </p>
                <form
                  className="flex items-center justify-between bg-white rounded-md overflow-hidden"
                  onSubmit={handleSubscribe}
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
                    className="bg-[#ffd13e] text-white mr-1 rounded-md px-2 md:px-6 py-2 hover:bg-[#fffc39] focus:outline-none text-sm md:text-base"
                  >
                    <BsSendFill style={{ color: 'black' }} />
                  </button>
                </form>
                {message && (
                  <p className="text-white mt-2">
                    {message}
                  </p>
                )}
              </div>
              <div className="text-white">
                <h3 className="font-bold py-4 tracking-widest">
                  FOLLOW US
                </h3>
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
              </div>
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
