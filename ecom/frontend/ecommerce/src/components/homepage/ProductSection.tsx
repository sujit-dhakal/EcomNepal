"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProducts } from "@/lib/store";
import { useState, useEffect } from "react";
import { Product } from "@/types/productTypes";
import ProductCard from "../products/ProductCard";
import SectionHeader from "./SectionHeader";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import axios from "axios";

interface ProductSectionProps {
  type?: "bestselling" | "latest";
  topHeading: string;
  heading: string;
}

const ProductSection = ({ type, topHeading, heading }: ProductSectionProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale = useLocale();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (type === "bestselling") {
        const response = await axios.get("http://127.0.0.1:8000/products?query=bestselling");
        setProducts(response.data);
      } else if (type === "latest") {
        const response = await axios.get("http://127.0.0.1:8000/products?query=latest");
        setProducts(response.data);
      } else {
        dispatch(getProducts());
      }
    };
    fetchProducts();
  }, [dispatch, type]);

  const displayedProducts = type ? products.slice(0, 5) : useAppSelector((state) => state.product.productState.products).slice(0, 10);

  const handleViewAll = () => {
    if (type) {
      router.push(`/${locale}/product?type=${type}`);
    } else {
      router.push(`/${locale}/product`);
    }
  };

  return (
    <>
      <SectionHeader
        topHeading={topHeading}
        heading={heading}
        buttons={[
          <Button
            text="View All"
            className="md:w-40 md:h-14 md:text-base"
            onClick={handleViewAll}
          />,
        ]}
      />
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center xl:justify-between gap-4 lg:gap-8">
          {displayedProducts.map((product: Product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductSection;
