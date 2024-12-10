"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCartSum, getCartItems } from "@/lib/store";
import Paypal from "../paypal/Paypal";
import { Product } from "@/types/productTypes";
import { useSearchParams } from "next/navigation";

const CheckoutDetail: React.FC<{ product: Product | null }> = ({ product }) => {
  const searchParams = useSearchParams();
  const sum = useAppSelector((state) => state.cart.sum);
  const cartItems = useAppSelector((state) => state.cart.itemsInCart);
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<any[]>([]);
  const [hasAddress, setHasAddress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSum = async () => {
    await dispatch(getCartSum());
  };
  const fetchCart = async () => {
    await dispatch(getCartItems());
  };

  useEffect(() => {
    const productId = searchParams.get("product_id");
    if (productId) {
      setItems([{ product, total_price: parseFloat(product.price.toString()) }]);
    } else if (product) {
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
          <div
            key={index}
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
        <p className="font-semibold">${subtotal.toFixed(2)}</p>
      </div>
      <div className="flex justify-between border-t border-gray-400 pt-4">
        <p>Shipping:</p>
        <p className="font-semibold">{shipping}</p>
      </div>
      <div className="flex justify-between font-bold text-lg border-t border-gray-400 mt-4 pt-4">
        <p>Total:</p>
        <p>${total.toFixed(2)}</p>
      </div>
      <Paypal
        cartItems={items}
        sum={sum}
        validateShippingAddress={() => hasAddress}
        onValidationFail={() => setError("Shipping address is required to proceed.")}
      />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CheckoutDetail;
