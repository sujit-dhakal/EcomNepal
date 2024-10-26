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
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product: Product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
