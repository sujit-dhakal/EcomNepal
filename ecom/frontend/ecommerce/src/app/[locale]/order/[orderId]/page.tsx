"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState, getOrderDetails } from "@/lib/store";
import { client } from "@/api/baseConfig";

interface OrderDetailsProps {
  params: { orderId: string };
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ params }) => {
  const { orderId } = params;
  const dispatch = useAppDispatch();
  const { selectedOrder, isLoading, isError } = useAppSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    const deleteBuyNowItemsFromCart = async () => {
      await client.delete(
        "http://127.0.0.1:8000/cart/delete_direct_purchase_items/"
      );
    };
    deleteBuyNowItemsFromCart();
    if (orderId) {
      dispatch(getOrderDetails(Number(orderId)));
    }
  }, [dispatch, orderId]);

  if (isLoading)
    return <div className="text-center text-xl">Loading order details...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500 text-xl">
        Error fetching order details.
      </div>
    );

  if (!selectedOrder) {
    return (
      <div className="text-center text-gray-500">No order details found.</div>
    );
  }

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Order #{selectedOrder.id}
      </h2>

      <div className="space-y-2">
        {/* Order Info */}
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-medium text-lg text-gray-700">
            <strong>Status:</strong> {selectedOrder.status}
          </p>
          <p className="font-medium text-lg text-gray-700">
            <strong>Date:</strong>{" "}
            {new Date(selectedOrder.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-medium text-lg text-gray-700">
            <strong>Total Amount:</strong> ${selectedOrder.total_amount}
          </p>
        </div>
      </div>

      <h3 className="mt-6 text-2xl font-semibold text-gray-800">Items:</h3>
      <ul className="space-y-4 mt-2">
        {selectedOrder.items.map((item, index) => (
          <li
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition-colors"
          >
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-gray-700">
                {item.product_name}
              </p>
              <p className="text-lg font-medium text-gray-700">
                {item.quantity} × ${item.price}
              </p>
            </div>
            <div className="mt-2 text-gray-600">
              <p>
                <strong>Price:</strong> ${item.price}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OrderDetails;
