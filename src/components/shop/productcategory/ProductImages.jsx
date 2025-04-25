import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

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
  const thumbnailContainerRef = useRef(null);

  const handleImageClick = (index) => {
    onImageClick(index);
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = direction === 'up' ? -100 : 100;
      thumbnailContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex w-full h-full overflow-hidden rounded-lg">
      {/* Mobile View: Swiper Carousel with Pagination */}
      <div className="block w-full md:hidden">
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
                  className="object-contain w-full h-full"
                  onClick={() => handleImageClick(index)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View: Main Image with Vertical Thumbnails on Left */}
      <div className="hidden w-full overflow-hidden rounded-lg md:flex">
        {/* Vertical Thumbnail Column with Arrows */}
        <div className="relative flex flex-col items-center w-24 p-2 bg-white">
          {productImages.length > 4 && (
            <button
              onClick={() => scrollThumbnails('up')}
              className="p-1 mb-2 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
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
                <div className="flex items-center justify-center w-full h-full p-1 bg-white">
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {productImages.length > 4 && (
            <button
              onClick={() => scrollThumbnails('down')}
              className="p-1 mt-2 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
              aria-label="Scroll thumbnails down"
            >
              <DownArrow />
            </button>
          )}
        </div>

        {/* Main Image with Zoom Component */}
        <div className="relative flex items-center justify-center flex-1 p-4">
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={3}
            centerOnInit={true}
            wheel={{ disabled: true }}
            doubleClick={{ disabled: true }}
            panning={{ disabled: false }}
            onPanning={() => {}}
            onPinch={() => {}}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div
                  className="absolute inset-0 z-10 cursor-pointer"
                  onClick={() => handleImageClick(currentImageIndex)}
                ></div>

                <TransformComponent
                  wrapperClass="w-full h-full flex items-center justify-center"
                  contentClass="max-w-full max-h-[52vh]"
                >
                  <img
                    src={productImages[currentImageIndex] || defaultImage}
                    alt="Product main image"
                    className="max-w-full max-h-[52vh] object-contain mx-auto"
                  />
                </TransformComponent>

                <div className="absolute z-20 flex gap-2 p-2 rounded-md bottom-4 right-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      zoomOut();
                    }}
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                    aria-label="Zoom out"
                  >
                    -
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetTransform();
                    }}
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                    aria-label="Reset zoom"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.645-4.038.75.75 0 00-.53-.919z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      zoomIn();
                    }}
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                </div>
              </>
            )}
          </TransformWrapper>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;