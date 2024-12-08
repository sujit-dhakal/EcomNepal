"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProducts } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Product } from "@/types/productTypes";
import { useLocale } from "next-intl";
import ProductCard from "@/components/products/ProductCard";

const page = () => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.productState.products);

  useEffect(() => {
    if (query) {
      dispatch(getProducts(query));
    }
  }, [query]);
  return (
    <div className="container mx-auto px-2">
      <h1 className="text-xl font-semibold my-10">
        Search Result: Found {products.length} products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-12">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div >
  );
};

export default page;
