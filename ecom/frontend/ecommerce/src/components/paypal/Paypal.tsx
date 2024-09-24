"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { client } from "@/api/baseConfig";
import { CartItems } from "@/types/cartTypes";
import React from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface createOrderProps {
  cartItems: CartItems[];
  sum: number;
}
const Paypal: React.FC<createOrderProps> = ({ cartItems, sum }) => {
  const router = useRouter();
  const locale = useLocale();
  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  const createOrder = async () => {
    try {
      const paypalresponse = await client.post("create-paypal-order/", {
        items: cartItems,
        total: sum,
      });
      console.log(paypalresponse.data.paypal_order_id);
      return paypalresponse.data.paypal_order_id;
    } catch (error: any) {
      console.log("create order", error.response.data);
    }
  };

  const onApprove = async (data: any, action: any) => {
    try {
      const response = await client.post("capture-paypal-order/", {
        orderID: data.orderID,
        items: cartItems,
        total: sum,
      });
      console.log("payment successsful", response.data);
      alert("paid successfully");
      router.push(`/${locale}`);
    } catch (error: any) {
      console.log("onApprove", error.response.data);
    }
  };
  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
};

export default Paypal;
