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
    <div>
      <div>
        {categoreis.map((category: any) => (
          <div key={category.id}>
            <Link href={`/${locale}/category/${category.name}`}>
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
