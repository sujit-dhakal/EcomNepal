import React from 'react';

type SliderProps = {
  items: React.ReactNode[]; // Array of elements (e.g., cards) to display in the carousel
  // visibleItems?: number; // Number of items visible at once
  sliderRef?: React.RefObject<HTMLDivElement>;
};

export const scrollLeft = (sliderRef: React.RefObject<HTMLDivElement>) => {
  if (sliderRef.current) {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: 'smooth',
    });
  }
};

export const scrollRight = (sliderRef: React.RefObject<HTMLDivElement>) => {
  if (sliderRef.current) {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: 'smooth',
    });
  }
};

const Slider: React.FC<SliderProps> = ({ items, sliderRef }) => {
  return (
    <div className="relative w-full">
      <div
        ref={sliderRef}
        className="flex justify-between overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="
              flex justify-center
              min-w-[100%] 
              sm:min-w-[33.33%] 
              xl:min-w-[20%]
              2xl:min-w-[17%]
              snap-center
            "
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
