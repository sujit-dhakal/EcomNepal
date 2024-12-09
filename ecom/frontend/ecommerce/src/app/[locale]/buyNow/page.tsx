"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/api/baseConfig";

const page = () => {
  const [items, setItems] = useState<>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchItem = async () => {
    setIsLoading(true);
    const response = await client.get(
      "http://localhost:8000/cart/direct_purchase_items"
    );
    console.log(response.data);
    setItems(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const buyItem = items[0];

  return (
    <div>
      <h1>{buyItem.product.name}</h1>
      <p>{buyItem.product.price}</p>
      <p>{buyItem.quantity}</p>
      <p>{buyItem.total_price}</p>
    </div>
  );
};

export default page;
