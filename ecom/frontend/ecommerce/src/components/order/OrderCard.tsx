import React from "react";
import { client } from "@/api/baseConfig";
import { useState, useEffect } from "react";

const OrderCard = ({ order }) => {
  const [orderDetails, setOrderDetails] = useState({});
  const fetchOrderDetails = async () => {
    const response = await client.get(
      `http://localhost:8000/orders/${order.id}/details`
    );
    console.log(response.data);
    setOrderDetails(response.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="border border-gray-500 w-[400px]">
      <h1>Status: {orderDetails.status}</h1>
      <div>
        {Array.isArray(orderDetails.items) && orderDetails.items.length > 0 ? (
          orderDetails.items.map((item, index) => (
            <div key={index} className="border-b py-2">
              <p>Product Name: {item.product_name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
      <h1>Total: {orderDetails.total_amount}</h1>
    </div>
  );
};

export default OrderCard;
