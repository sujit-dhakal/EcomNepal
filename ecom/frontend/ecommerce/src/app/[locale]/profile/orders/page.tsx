"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState, getOrders } from "@/lib/store";
import Link from "next/link";
import { useLocale } from "next-intl";
import { FaCalendarAlt, FaBox, FaMoneyBillAlt } from "react-icons/fa";

const Orders: React.FC = () => {
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const { orders, isLoading, isError } = useAppSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (isLoading) return <div className="text-center text-xl text-gray-600">Loading orders...</div>;
  if (isError) return <div className="text-center text-red-500 text-xl">Error fetching orders. Please try again later.</div>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-900"
            >
              <Link href={`/${locale}/order/${order.id}`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm font-medium text-gray-700">
                    {order.status}
                  </p>
                </div>
                <div className="flex items-center text-gray-600 mt-4">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  <span className="font-medium">
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mt-2">
                  <FaMoneyBillAlt className="mr-2 text-gray-500" />
                  <span className="font-medium">${order.total_amount}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500">No orders found.</div>
      )}
    </section>
  );
};

export default Orders;
