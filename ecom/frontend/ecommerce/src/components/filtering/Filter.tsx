"use client";
import { client } from "@/api/baseConfig";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const Filter = () => {
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
  return (
    <div className="mb-12 w-[75%] m-auto">
      <div className="flex justify-between">
        {categoreis.map((category: any) => (
          <div key={category.id}>
            <Link href={`/${locale}/category/${category.name}`}>
              <div className="border border-1 border-gray-600 p-4 hover:bg-black hover:text-white">
                {category.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
