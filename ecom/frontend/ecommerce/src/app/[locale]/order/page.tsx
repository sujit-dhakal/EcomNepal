"use client";
import { useEffect, useState } from "react";
import { client } from "@/api/baseConfig";
import OrderCard from "@/components/order/OrderCard";

const page = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const response = await client.get("http://localhost:8000/orders/");
    console.log(response.data);
    setOrders(response.data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <div>
            <OrderCard order={order} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
