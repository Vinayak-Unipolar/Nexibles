// 'use client';
// import React, { useEffect, useState } from 'react';
// import LoadingScreen from './loading-screen/page';
// import 'react-toastify/dist/ReactToastify.css';
// import Footer from '@/components/shop/Footer';
// import AdvantageItem from '@/components/home/AdvantageItem';
// import HeaderSection from '@/components/home/HeaderSection';
// import Navbar from '@/components/shop/Navbar';
// import Popularproducts from '@/components/shop/popularproducts/Popularproducts';
// import StatsAndTestimonials from '@/components/StatsAndTestimonials/StatsAndTestimonials';
// import ProductSections from '@/components/shop/ProductSections';
// import NexiblesInstagramSection from '@/components/home/NexiblesInstagramSection';
// import Industries from '@/components/home/Industries';
// import GoogleAnalytics from '@/components/GoogleAnalytics';
// import MarketingTracker, {
//   trackQuoteForm,
//   trackSignUpForm,
//   trackWhatsAppChat,
// } from '@/components/MarketingTracker';
// import BrandLogosSection from '@/components/instagramandlogos/BrandLogosSection';
// import { showToast } from '@/components/toastify/CustomToast';

// const Modal = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState('');
//   const token = process.env.NEXT_PUBLIC_API_KEY;

//   // Auto-close modal after 5 seconds
//   useEffect(() => {
//     if (!isOpen) return;

//     const autoCloseTimer = setTimeout(() => {
//       onClose();
//     }, 5000); // 5 seconds

//     return () => clearTimeout(autoCloseTimer); // Cleanup timer on unmount or manual close
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       showToast({
//         type: 'error',
//         title: 'Missing Email',
//         message: 'Please enter a valid email.',
//       });
//       return;
//     }

//     try {
//       const ipResponse = await fetch("https://api.ipify.org?format=json");
//       const ipData = await ipResponse.json();
//       const ipAddress = ipData.ip;
//       const createdAt = new Date().toISOString().slice(0, 19);

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'API-Key': token,
//         },
//         body: JSON.stringify({
//           email,
//           origin: 'Nexibles',
//           ip_address: ipAddress,
//           created_at: createdAt,
//         }),
//       });

//       if (response.ok) {
//         showToast({
//           type: 'success',
//           title: 'Subscription Successful',
//           message: 'You’ve successfully subscribed!',
//         });
//         trackSignUpForm();
//         setEmail('');
//         onClose();
//       } else {
//         showToast({
//           type: 'error',
//           title: 'Subscription Failed',
//           message: 'Please try again later.',
//         });
//       }
//     } catch (error) {
//       showToast({
//         type: 'error',
//         title: 'Error Occurred',
//         message: 'Something went wrong. Please try again.',
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="relative w-full max-w-md mx-4 overflow-hidden bg-white rounded-2xl">
//         <button
//           onClick={onClose}
//           className="absolute z-10 p-1 text-black bg-white rounded-full top-2 right-2 hover:text-gray-700"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         <div className="relative w-full h-52">
//           <img
//             src={`${process.env.NEXT_PUBLIC_CDN_URL}/Tea.webp`}
//             alt="Nexibles Product"
//             className="object-fill w-full h-full"
//           />
//         </div>

//         <div className="flex flex-col items-center p-6">
//           <p className="mb-1 text-xs tracking-wide text-gray-500 uppercase">
//             SUBSCRIBE TO OUR NEWSLETTER!
//           </p>

//           <h2 className="mb-6 text-xl font-bold text-center">
//             Subscribe to get notified about our <br /> upcoming offers and more!
//           </h2>

//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your e-mail"
//             className="w-[80%] p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400"
//           />
//           <button
//             onClick={handleSubscribe}
//             className="w-[80%] bg-black text-white py-3 rounded-xl border-2 border-transparent hover:bg-white hover:text-black hover:border-black font-medium transition-all duration-300 uppercase mb-6"
//           >
//             Subscribe
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Home = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [categoryData, setData] = useState([]);
//   const token = process.env.NEXT_PUBLIC_API_KEY;
//   const APIURL = process.env.NEXT_PUBLIC_API_URL;
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const lastShown = localStorage.getItem('modalLastShown');
//     const now = new Date().getTime();
//     const oneDay = 24 * 60 * 60 * 1000;

//     const timer = setTimeout(() => {
//       if (!lastShown || now - parseInt(lastShown) > oneDay) {
//         setShowModal(true);
//         localStorage.setItem('modalLastShown', now.toString());
//       }
//     }, 10000);

//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${APIURL}/api/category_master`, {
//           method: 'GET',
//           headers: {
//             'Content-type': 'application/json',
//             'API-Key': token,
//           },
//         });
//         const data = await response.json();
//         if (data.status === 'success') {
//           const filterCategory = data.data.filter(
//             (category) => category.origin?.toLowerCase() === 'nexibles'
//           );
//           setData(filterCategory);
//         } else {
//           showToast({
//             type: 'error',
//             title: 'Fetch Failed',
//             message: data?.error || 'Unable to fetch category data.',
//           });
//         }
//       } catch (error) {
//         showToast({
//           type: 'error',
//           title: 'Fetch Error',
//           message: 'Something went wrong while fetching categories.',
//         });
//       }
//     };

//     fetchData();

//     return () => clearTimeout(timer);
//   }, []);

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="min-h-screen">
//       <GoogleAnalytics />
//       <MarketingTracker metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
//       <Modal isOpen={showModal} onClose={closeModal} />
//       <Navbar />
//       <HeaderSection />
//       <Industries />
//       <Popularproducts />
//       <StatsAndTestimonials />
//       <section className="py-10 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="md:text-3xl text-2xl font-bold text-black mb-8 tracking-tight text-center">
//             Trusted by 1500+ Brands
//           </h2>
//           <BrandLogosSection />
//         </div>
//       </section>
//       <AdvantageItem />
//       <ProductSections />
//       <NexiblesInstagramSection />
//       <Footer />
//     </div>
//   );
// };

// export default Home;


'use client';
import React, { useEffect, useState } from 'react';
import LoadingScreen from './loading-screen/page';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/shop/Footer';
import AdvantageItem from '@/components/home/AdvantageItem';
import HeaderSection from '@/components/home/HeaderSection';
import Navbar from '@/components/shop/Navbar';
import Popularproducts from '@/components/shop/popularproducts/Popularproducts';
import StatsAndTestimonials from '@/components/StatsAndTestimonials/StatsAndTestimonials';
import ProductSections from '@/components/shop/ProductSections';
import NexiblesInstagramSection from '@/components/home/NexiblesInstagramSection';
import Industries from '@/components/home/Industries';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MarketingTracker, {
  trackQuoteForm,
  trackSignUpForm,
  trackWhatsAppChat,
} from '@/components/MarketingTracker';
import BrandLogosSection from '@/components/instagramandlogos/BrandLogosSection';
import { showToast } from '@/components/toastify/CustomToast';

const Modal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const token = process.env.NEXT_PUBLIC_API_KEY;

  // Auto-close modal after 5 seconds
  useEffect(() => {
    if (!isOpen) return;

    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, 5000); // 5 seconds

    return () => clearTimeout(autoCloseTimer); // Cleanup timer on unmount or manual close
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast({
        type: 'error',
        title: 'Missing Email',
        message: 'Please enter a valid email.',
      });
      return;
    }

    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;
      const createdAt = new Date().toISOString().slice(0, 19);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': token,
        },
        body: JSON.stringify({
          email,
          origin: 'Nexibles',
          ip_address: ipAddress,
          created_at: createdAt,
        }),
      });

      if (response.ok) {
        showToast({
          type: 'success',
          title: 'Subscription Successful',
          message: 'You’ve successfully subscribed!',
        });
        trackSignUpForm();
        setEmail('');
        onClose();
      } else {
        showToast({
          type: 'error',
          title: 'Subscription Failed',
          message: 'Please try again later.',
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Error Occurred',
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md mx-4 overflow-hidden bg-white rounded-2xl">
        <button
          onClick={onClose}
          className="absolute z-10 p-1 text-black bg-white rounded-full top-2 right-2 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative w-full h-52">
          <img
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/Tea.webp`}
            alt="Nexibles Product"
            className="object-fill w-full h-full"
          />
        </div>

        <div className="flex flex-col items-center p-6">
          <p className="mb-1 text-xs tracking-wide text-gray-500 uppercase">
            SUBSCRIBE TO OUR NEWSLETTER!
          </p>

          <h2 className="mb-6 text-xl font-bold text-center">
            Subscribe to get notified about our <br /> upcoming offers and more!
          </h2>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your e-mail"
            className="w-[80%] p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button
            onClick={handleSubscribe}
            className="w-[80%] bg-black text-white py-3 rounded-xl border-2 border-transparent hover:bg-white hover:text-black hover:border-black font-medium transition-all duration-300 uppercase mb-6"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoryData, setData] = useState([]);
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem('modalLastShown');
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    const timer = setTimeout(() => {
      if (!lastShown || now - parseInt(lastShown) > oneDay) {
        setShowModal(true);
        localStorage.setItem('modalLastShown', now.toString());
      }
    }, 10000);

    const fetchData = async () => {
      try {
        const response = await fetch(`${APIURL}/api/category_master`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'API-Key': token,
          },
        });
        const data = await response.json();
        if (data.status === 'success') {
          const filterCategory = data.data.filter(
            (category) => category.origin?.toLowerCase() === 'nexibles'
          );
          setData(filterCategory);
        } else {
          showToast({
            type: 'error',
            title: 'Fetch Failed',
            message: data?.error || 'Unable to fetch category data.',
          });
        }
      } catch (error) {
        showToast({
          type: 'error',
          title: 'Fetch Error',
          message: 'Something went wrong while fetching categories.',
        });
      }
    };

    fetchData();

    return () => clearTimeout(timer);
  }, []);

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  return (
    <div className="min-h-screen">
      <GoogleAnalytics />
      <MarketingTracker metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
      {/* <Modal isOpen={showModal} onClose={closeModal} /> */}
      <Navbar />
      <HeaderSection />
      <Industries />
      <Popularproducts />
      <StatsAndTestimonials />
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="md:text-3xl text-2xl font-bold text-black mb-8 tracking-tight text-center">
            Trusted by 1500+ Brands
          </h2>
          <BrandLogosSection />
        </div>
      </section>
      <AdvantageItem />
      <ProductSections />
      <NexiblesInstagramSection />
      <Footer />
    </div>
  );
};

export default Home;