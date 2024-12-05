"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const OrderConfirm: React.FC = () => {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/${locale}/profile/orders`);
    });

    return () => clearTimeout(timer);
  }, [locale, router]);

  return (
    <section className="p-6 mt-10 max-w-xl mx-auto bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
      <p className="text-lg text-gray-700 mb-4">Your order has been successfully placed.</p>
      <p className="text-gray-500 mb-6">
        You will be redirected to your orders page shortly.
      </p>
      <div className="animate-pulse text-xl text-gray-600">Redirecting...</div>
    </section>
  );
};

export default OrderConfirm;
