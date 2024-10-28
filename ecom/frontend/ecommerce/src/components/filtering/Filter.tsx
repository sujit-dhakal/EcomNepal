"use client";
import { client } from "@/api/baseConfig";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Slider, { scrollLeft, scrollRight } from "../homepage/Slider";
import SectionHeader from "../homepage/SectionHeader";
import Button from "../Button";

const Filter: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const [categoreis, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await client.get("categories/");
    setCategories(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Transform categories into items for the slider
  const categoryItems = categoreis.map((category) => (
    <Link href={`/${locale}/category/${category.name}`}>
      <div
        key={category.id}
        className="flex justify-center items-center w-32 md:w-44 h-32 md:h-36 text-base text-black hover:text-white border border-black border-opacity-30 hover:border-opacity-0 rounded hover:bg-[#DB4444]"
      >
        {category.name}
      </div >
    </Link>
  ));

  return (
    <>
      <SectionHeader
        topHeading="Categories"
        heading="Browse By Category"
        buttons={[
          <Button text="Previous" onClick={() => scrollLeft(sliderRef)} type="button" className="md:w-40 md:h-14 md:text-base" />,
          <Button text="Next" onClick={() => scrollRight(sliderRef)} type="button" className="md:w-40 md:h-14 md:text-base" />
        ]}
      />
      <Slider items={categoryItems} sliderRef={sliderRef} />
    </>
  );
};

export default Filter;
