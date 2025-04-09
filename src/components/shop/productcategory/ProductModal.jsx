import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ProductModal = ({ isOpen, onClose, productDetails, productImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const swiperRef = useRef(null);
  const lastTapRef = useRef(0);
  const startPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.allowTouchMove = !isZoomed;
    }
  }, [isZoomed]);

  if (!isOpen) return null;

  const handleImageClick = (e) => {
    if (isMobile) {
      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 300;

      if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
        setIsZoomed((prevZoom) => {
          const newZoomState = !prevZoom;
          if (swiperRef.current) {
            swiperRef.current.allowTouchMove = !newZoomState;
          }
          return newZoomState;
        });
      }

      lastTapRef.current = now;
    } else {
      setIsZoomed(!isZoomed);
    }
  };

  const handleMouseMove = (e) => {
    if (!isMobile && isZoomed) {
      const { offsetX, offsetY } = e.nativeEvent;
      const { offsetWidth, offsetHeight } = e.target;
      const xPos = (offsetX / offsetWidth) * 100;
      const yPos = (offsetY / offsetHeight) * 100;
      setMousePosition({ x: xPos, y: yPos });
    }
  };

  const handleTouchStart = (e) => {
    if (isZoomed) {
      setIsDragging(true);
      startPositionRef.current = {
        x: e.touches[0].clientX - imagePosition.x,
        y: e.touches[0].clientY - imagePosition.y,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const x = e.touches[0].clientX - startPositionRef.current.x;
      const y = e.touches[0].clientY - startPositionRef.current.y;
      const smoothedX = imagePosition.x + (x - imagePosition.x) * 0.1;
      const smoothedY = imagePosition.y + (y - imagePosition.y) * 0.1;
      setImagePosition({ x: smoothedX, y: smoothedY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    setImagePosition((prevPosition) => ({
      x: Math.min(0, Math.max(prevPosition.x, -200)),
      y: Math.min(0, Math.max(prevPosition.y, -200)),
    }));

    if (imagePosition.x === 0 && imagePosition.y === 0) {
      setIsZoomed(false);
      if (swiperRef.current) {
        swiperRef.current.allowTouchMove = true;
      }
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    if (swiperRef.current && isMobile) {
      swiperRef.current.slideTo(index);
    }
    setIsZoomed(false);
    setImagePosition({ x: 0, y: 0 });
    if (swiperRef.current) {
      swiperRef.current.allowTouchMove = true;
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentImageIndex(swiper.activeIndex);
    setIsZoomed(false);
    setImagePosition({ x: 0, y: 0 });
    if (swiperRef.current) {
      swiperRef.current.allowTouchMove = true;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 md:px-20 md:rounded-lg shadow-lg w-full md:w-[90%] h-full md:h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl text-[#30384E]">{productDetails.product.name}</h2>
          <button onClick={onClose} className="text-3xl font-semibold text-[#30384E] hover:text-[#ff6b6b] transition duration-200 ease-in-out">
            &times;
          </button>
        </div>
        <hr className='md:block hidden border-[1px] border-gray-300 w-full'/>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[70%] pr-6">
            <div className="relative overflow-hidden">
              {isMobile ? (
                <Swiper
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  spaceBetween={10}
                  slidesPerView={1}
                  allowTouchMove={!isZoomed}
                  onSlideChange={handleSlideChange}
                  className="w-full h-[60vh] overflow-hidden"
                >
                  {productImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full relative overflow-hidden">
                        <img
                          key={`${index}-${isZoomed}`}
                          onClick={handleImageClick}
                          onMouseMove={handleMouseMove}
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                          // src={image || `${process.env.NEXT_PUBLIC_CDN_URL}/product/${productDetails.product.image}`}
                          src={image || `${process.env.NEXT_PUBLIC_CDN_URL}/${productDetails.product.image}`}
                          alt="Product"
                          className={`w-full h-full object-contain transition-transform duration-300 ${
                            isZoomed ? 'scale-[200%] cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                          }`}
                          style={{
                            transformOrigin: isZoomed ? 'center center' : 'center center',
                            transform: isZoomed ? `scale(2) translate(${imagePosition.x}px, ${imagePosition.y}px)` : 'scale(1)',
                            maxWidth: isZoomed ? 'none' : '100%',
                            maxHeight: isZoomed ? 'none' : '100%',
                            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-[60vh] relative overflow-hidden">
                  <img
                    onClick={handleImageClick}
                    onMouseMove={handleMouseMove}
                    src={productImages[currentImageIndex]}
                    alt="Product"
                    className={`w-full h-full object-contain transition-transform duration-300 ${
                      isZoomed ? 'scale-[200%] cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                    }`}
                    style={
                      isZoomed
                        ? {
                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                          }
                        : {}
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-[30%] mt-6 md:mt-0">
            <p className="hidden md:block text-gray-700 mt-6 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: productDetails.product.description }} />
            <div className="flex mt-4 overflow-x-auto fixed bottom-0 left-0 right-0 bg-white z-10 p-2 md:static md:bg-transparent">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 mr-2 cursor-pointer border-2 overflow-hidden transition-all duration-200 ease-in-out ${
                    index === currentImageIndex ? 'border-[#30384E]' : 'border-gray-300 hover:border-[#30384E]'
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;