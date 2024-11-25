"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCartSum, getCartItems } from "@/lib/store";
import Paypal from "@/components/paypal/Paypal";

const page = () => {
  const sum = useAppSelector((state) => state.cart.sum);
  const cartItems = useAppSelector((state) => state.cart.itemsInCart);
  const dispatch = useAppDispatch();

  const fetchSum = async () => {
    const response = await dispatch(getCartSum());
    console.log(response);
  };
  const fetchCart = async () => {
    const response = await dispatch(getCartItems());
    console.log(response);
  };
  useEffect(() => {
    fetchCart();
    fetchSum();
  }, []);
  return (
    <div className="container mx-auto px-2 mt-[50px]">
      <h2 className="text-2xl font-semibold">Pay Now</h2>
      <div className="flex flex-col lg:flex-row justify-between gap-[60px]">
        <Paypal cartItems={cartItems} sum={sum} />
      </div>
    </div>
  );
};
export default page;
