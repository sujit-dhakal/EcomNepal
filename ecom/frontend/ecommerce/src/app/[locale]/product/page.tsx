"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProducts } from "@/lib/store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/productTypes";
import ProductCard from "@/components/products/ProductCard";

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.productState.products);
  const searchParams = useSearchParams();
  const productType = searchParams.get("type") || "";

  useEffect(() => {
    dispatch(getProducts(productType));
  }, [dispatch, productType]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-10 text-center">
        {productType.charAt(0).toUpperCase() + productType.slice(1)} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-12">
        {products.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
