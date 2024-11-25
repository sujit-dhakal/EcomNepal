"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProducts } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/productTypes";
const page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
    if (query) {
      dispatch(getProducts(query));
    }
  }, [query]);
  return (
    <div className="container mx-auto px-2">
      <h1 className="text-xl font-semibold my-10">Search Result: Found {products.length} products</h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center md:justify-between gap-4 lg:gap-8">
          {products.map((product: Product) => (
            <ProductCard product={product} imageUrl={product.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
