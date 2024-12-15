"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCartSum, getCartItems } from "@/lib/store";
import Paypal from "../paypal/Paypal";
import { Product } from "@/types/productTypes";
import { useSearchParams } from "next/navigation";

const CheckoutDetail: React.FC<{
  product: Product | null;
}> = ({ product, address }) => {
  const searchParams = useSearchParams();
  const sum = useAppSelector((state) => state.cart.sum);
  const cartItems = useAppSelector((state) => state.cart.itemsInCart);
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<any[]>([]);

  const fetchSum = async () => {
    await dispatch(getCartSum());
  };
  const fetchCart = async () => {
    await dispatch(getCartItems());
  };

  useEffect(() => {
    const productId = searchParams.get("product_id");
    if (productId) {
      setItems([
        {
          product,
          quantity: 1,
          total_price: product?.price,
        },
      ]);
      console.log(items);
    } else {
      fetchCart();
      setItems(cartItems);
    }
    fetchSum();
  }, [cartItems, product, dispatch, searchParams]);

  const subtotal = items.reduce((total, item) => total + item.total_price, 0);
  const shipping = "Free";
  const total = subtotal;

  return (
    <div className="basis-1/2 py-6 sm:px-6 space-y-6">
      {/* Product Summary */}
      <div>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-4">
              <img
                src={
                  item.product.image.startsWith("http")
                    ? item.product.image
                    : `http://localhost:8000/${item.product.image}`
                }
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <p className="font-medium">{item.product.name}</p>
            </div>
            <p className="font-semibold">${item.total_price}</p>
          </div>
        ))}
      </div>

      {/* Summary Details */}
      <div className="flex justify-between">
        <p>Subtotal:</p>
        <p className="font-semibold">${subtotal}</p>
      </div>
      <div className="flex justify-between border-t border-gray-400 pt-4">
        <p>Shipping:</p>
        <p className="font-semibold">{shipping}</p>
      </div>
      <div className="flex justify-between font-bold text-lg border-t border-gray-400 mt-4 pt-4">
        <p>Total:</p>
        <p>${total}</p>
      </div>
      {address.length > 0 ? (
        <Paypal cartItems={items} sum={sum} />
      ) : (
        <p className="text-red-500 font-medium">
          Please provide a valid address to proceed with the payment.
        </p>
      )}
    </div>
  );
};

export default CheckoutDetail;
