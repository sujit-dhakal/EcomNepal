"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getShippingAddresses, RootState } from "@/lib/store";
import { useLocale } from "next-intl";
import Link from "next/link";

const Addresses: React.FC = () => {
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state: RootState) => state.shipping.addresses);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchAddress = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await dispatch(getShippingAddresses());

    } catch (error) {
      console.error("Error fetching shipping addresses:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading shipping addresses...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error loading shipping addresses. Please try again.</p>;
  }

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Addresses</h2>
        <Link href={`/${locale}/shipping`}>
          <button
            className="px-3 text-lg bg-black text-white rounded-[20px] hover:bg-opacity-70"
          >
            Add
          </button>
        </Link>
      </div>
      {addresses.length === 0 ? (
        <div className="text-center">
          <p className="text-red-600 my-[150px]">No shipping address available.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {addresses.map((addr, index) => (
            <li
              key={index}
              className="border border-gray-200 rounded-lg p-4"
            >
              <p className="font-semibold">{addr.city}, {addr.state}</p>
              <p>{addr.country}</p>
              <p>Postal Code: {addr.postal_code}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Addresses;
