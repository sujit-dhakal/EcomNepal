"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductDetail, getProducts } from "@/lib/store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/productTypes";
import ProductCard from "@/components/products/ProductCard";
import { shuffleArray } from "@/lib/shuffleArray";

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.productState.products);
  const { relatedProducts } = useAppSelector((state) => state.product.productState);
  const searchParams = useSearchParams();
  const productType = searchParams.get("type") || "";
  const productId = searchParams.get("product_id");

  useEffect(() => {
    const fetchProducts = async () => {
      if (productId) {
        dispatch(getProductDetail(productId));
      } else {
        dispatch(getProducts(productType));
      }
    };
    fetchProducts();
  }, [dispatch, productType, productId]);

  const updatedRelatedProducts = relatedProducts.map((product) => ({
    ...product,
    image: `http://localhost:8000${product.image}`,
  }));

  const displayedProducts = productType === "similar" ? updatedRelatedProducts : products;
  const shuffledProducts = shuffleArray(displayedProducts);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-10 text-center">
        {productType.charAt(0).toUpperCase() + productType.slice(1)} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-12">
        {shuffledProducts.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
