'use client';

import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];   // Images for smaller screens
  largeImages: string[];  // Images for larger screens
}

const Carousel: React.FC<CarouselProps> = ({ images, largeImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideInterval = 3000;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(handleNext, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="min-w-full flex">
            <div className="block sm:hidden w-full max-h-[660px] flex justify-center items-center">
              <img src={image} alt={`Slide ${index}`} className="w-full object-cover" />
            </div>
            <div className="hidden sm:block w-full max-h-[450px] flex justify-center items-center">
              <img src={largeImages[index]} alt={`Slide ${index} - large`} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-[#DB4444] border-white border-2' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
