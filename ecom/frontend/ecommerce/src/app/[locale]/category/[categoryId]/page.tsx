"use client";
import { client } from "@/api/baseConfig";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/productTypes";
import { useEffect, useState } from "react";

const page = ({
  params,
}: {
  params: {
    categoryId: string;
  };
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchCategoryProducts = async () => {
    const response = await client.get(`product-filter/${params.categoryId}`);
    setProducts(response.data);
  };
  useEffect(() => {
    fetchCategoryProducts();
  }, []);
  return (
    <div>
      {products.map((product: Product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default page;
