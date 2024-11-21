"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCartSum, getCartItems } from "@/lib/store";
import Paypal from "@/components/paypal/Paypal";

const CheckoutDetail: React.FC = () => {
  const sum = useAppSelector((state) => state.cart.sum);
  const cartItems = useAppSelector((state) => state.cart.itemsInCart);
  const dispatch = useAppDispatch();
  const [selectedPayment, setSelectedPayment] = useState<string>("Cash");

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

      {/* Payment Methods */}
      <div>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="Paypal"
              checked={selectedPayment === "Paypal"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="w-5 h-5"
            />
            <p className="flex items-center space-x-2">
              Paypal
            </p>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="Cash"
              checked={selectedPayment === "Cash"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="w-5 h-5"
            />
            <p>Cash on Delivery</p>
          </label>
        </div>
      </div>
      {/* <Paypal cartItems={cartItems} sum={sum} /> */}

      {/* Place Order Button */}
      <div>
        <button
          className="w-full sm:w-1/2 px-4 py-2 bg-black hover:bg-opacity-70 text-white font-semibold rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutDetail;
