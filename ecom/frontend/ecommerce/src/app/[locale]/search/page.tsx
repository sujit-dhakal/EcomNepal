"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types/productTypes";
const page = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const fetchResults = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/search/?q=${query}`
    );
    setProducts(response.data.results);
    console.log(response.data);
  };

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query]);
  return (
    <div>
      <h1>Search Result: Found {products.length} products</h1>
      {products.map((product: Product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </div>
  );
};

export default page;
