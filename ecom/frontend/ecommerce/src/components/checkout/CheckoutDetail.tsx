"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCartSum, getCartItems } from "@/lib/store";

const CheckoutDetail: React.FC = () => {
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

  const subtotal = cartItems.reduce((total, item) => total + item.total_price, 0);
  const shipping = "Free";
  const total = subtotal;

  return (
    <div className="basis-1/2 py-6 sm:px-6 space-y-6">
      {/* Product Summary */}
      <div>
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center mb-10"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.image}
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
      
      {/* Place Order Button */}
      <div>
        <button
          className="w-full sm:w-1/3 px-4 py-2 bg-black hover:bg-opacity-70 text-white font-semibold rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutDetail;
