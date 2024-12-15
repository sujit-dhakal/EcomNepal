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
import { shuffleArray } from "@/lib/shuffleArray";
import { RootState } from "@/lib/store";

interface ProductSectionProps {
  type?: "bestselling" | "latest" | "similar";
  topHeading: string;
  heading: string;
  productId?: number;
}

const ProductSection = ({ type, topHeading, heading, productId }: ProductSectionProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const { relatedProducts } = useAppSelector(
    (state: RootState) => state.product.productState
  );

  useEffect(() => {
    const fetchProducts = async () => {
      if (type === "bestselling") {
        const response = await axios.get(
          "http://127.0.0.1:8000/products?query=bestselling"
        );
        setProducts(response.data);
      } else if (type === "latest") {
        const response = await axios.get(
          "http://127.0.0.1:8000/products?query=latest"
        );
        setProducts(response.data);
      } else if (type === "similar" && productId) {     
        setProducts(relatedProducts.map((product) => ({
          ...product,
          image: `http://localhost:8000${product.image}`
        })));
      } else {
        dispatch(getProducts());
      }
    };
    fetchProducts();
  }, [dispatch, type, productId]);

  const displayedProducts = type
    ? products.slice(0, 4)
    : useAppSelector((state) => state.product.productState.products).slice(0, 8);

  const shuffledProducts = shuffleArray(displayedProducts);

  const handleViewAll = () => {
    if (type) {
      if (type === "similar") {
        router.push(`/${locale}/product?type=${type}&product_id=${productId}`)
      } else {
        router.push(`/${locale}/product?type=${type}`);
      }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-12">
        {shuffledProducts.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default ProductSection;
