import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import hoverbox from '../../../../public/home/hoverbox.png';

const UpArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
  </svg>
);

const DownArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
  </svg>
);

const ProductImages = ({ productImages, defaultImage, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const mainImageRef = useRef(null);
  const zoomRef = useRef(null);
  const hoverBoxRef = useRef(null);
  const thumbnailContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!mainImageRef.current || !zoomRef.current || !hoverBoxRef.current) return;

    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const hoverBoxSize = 100;
    const hoverBoxLeft = Math.max(0, Math.min(e.clientX - left - hoverBoxSize / 2, width - hoverBoxSize));
    const hoverBoxTop = Math.max(0, Math.min(e.clientY - top - hoverBoxSize / 2, height - hoverBoxSize));
    hoverBoxRef.current.style.left = `${hoverBoxLeft}px`;
    hoverBoxRef.current.style.top = `${hoverBoxTop}px`;

    const zoomX = x * 100;
    const zoomY = y * 100;
    zoomRef.current.style.backgroundPosition = `${zoomX}% ${zoomY}%`;
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleImageClick = (index) => onImageClick(index);

  const scrollThumbnails = (direction) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = direction === 'up' ? -100 : 100;
      thumbnailContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex w-full h-full rounded-lg overflow-hidden">
      {/* Mobile View: Swiper Carousel with Pagination */}
      <div className="block md:hidden w-full">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
          onSwiper={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
          className="h-[40vh]"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center w-full h-full bg-[#F9F9F9]">
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-contain"
                  onClick={() => handleImageClick(index)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View: Main Image with Vertical Thumbnails on Left */}
      <div className="hidden md:flex w-full bg-[#F9F9F9] rounded-lg overflow-hidden">
        {/* Vertical Thumbnail Column with Arrows */}
        <div className="w-24 flex flex-col items-center relative p-2 bg-white">
          {productImages.length > 4 && (
            <button
              onClick={() => scrollThumbnails('up')}
              className="mb-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll thumbnails up"
            >
              <UpArrow />
            </button>
          )}
          
          <div
            ref={thumbnailContainerRef}
            className="flex flex-col space-y-2 overflow-y-auto h-[calc(60vh-70px)] scrollbar-hidden"
            style={{
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
            }}
          >
            <style jsx>{`
              .scrollbar-hidden::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 flex-shrink-0 cursor-pointer border transition-all duration-200 rounded-md overflow-hidden ${
                  index === currentImageIndex 
                    ? 'border-gray-800 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <div className="w-full h-full flex items-center justify-center bg-white p-1">
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {productImages.length > 4 && (
            <button
              onClick={() => scrollThumbnails('down')}
              className="mt-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll thumbnails down"
            >
              <DownArrow />
            </button>
          )}
        </div>

        {/* Main Image with Hover Zoom */}
        <div className="flex-1 relative p-4 flex items-center justify-center">
          <div
            className="absolute inset-0 z-10 bg-white opacity-0 transition-opacity duration-300"
            style={{ opacity: isHovered ? 0.7 : 0 }}
          />
          
          <img
            ref={mainImageRef}
            src={productImages[currentImageIndex] || defaultImage}
            alt="Product main image"
            className="max-w-full max-h-[52vh] object-contain mx-auto cursor-zoom-in relative z-20"
            onClick={() => handleImageClick(currentImageIndex)}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          
          {isHovered && (
            <>
              <div
                ref={hoverBoxRef}
                className="absolute z-30 pointer-events-none"
                style={{ width: '100px', height: '100px' }}
              >
                <img src={hoverbox.src} alt="Hover box" className="w-full h-full" />
              </div>
              
              <div
                ref={zoomRef}
                className="absolute top-0 left-full ml-4 w-[100%] h-[60vh] bg-white shadow-xl border z-40 rounded-md overflow-hidden"
                style={{
                  backgroundImage: `url(${productImages[currentImageIndex] || defaultImage})`,
                  backgroundSize: '200%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;