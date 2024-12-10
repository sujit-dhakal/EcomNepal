"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getShippingAddresses } from "@/lib/store";
import Link from "next/link";
import { useLocale } from "next-intl";

const ShippingAddressComponent: React.FC<{ onAddressChange: (hasAddress: boolean) => void }> = ({
  onAddressChange
}) => {
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.shipping.addresses);

  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchAddress = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await dispatch(getShippingAddresses());

      const fetchedAddresses = Array.isArray(response.payload)
        ? response.payload
        : [response.payload];

      // Find the index of the default address
      const defaultIndex = fetchedAddresses.findIndex((addr) => addr.is_default);
      const hasAddress = fetchedAddresses.length > 0;
      onAddressChange(hasAddress);

      // Set selected address index: default if available, otherwise a random address
      if (defaultIndex !== -1) {
        setSelectedAddressIndex(defaultIndex);
      } else {
        setSelectedAddressIndex(fetchedAddresses.length > 0 ? 0 : null);
      }
    } catch (error) {
      console.error("Error fetching shipping addresses:", error);
      setIsError(true);
      onAddressChange(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, [dispatch, onAddressChange]);

  const handleSelectAddress = (index: number) => {
    setSelectedAddressIndex(index);
    onAddressChange(true);
  };

  // Ensure addresses is always an array
  const normalizedAddresses = Array.isArray(addresses) ? addresses : [];
  if (isLoading) {
    return <p>Loading shipping addresses...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error loading shipping addresses. Please try again.</p>;
  }

  return (
    <div className="basis-1/2 py-6 sm:px-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Select Shipping Address</h2>
        <Link href={`/${locale}/shipping`}>
          <button
            className="px-3 text-lg bg-black text-white rounded-[20px] hover:bg-opacity-70"
          >
            Add
          </button>
        </Link>
      </div>

      {normalizedAddresses.length === 0 ? (
        <div className="text-center">
          <p className="text-red-600 my-[150px]">No shipping address available.</p>
        </div>
      ) : (
        <form className="space-y-4 pt-6">
          {normalizedAddresses.map((address, index) => (
            <label
              key={index}
              className={`flex items-start p-4 border rounded cursor-pointer space-x-4 ${selectedAddressIndex === index ? "border-black" : "border-gray-300"
                }`}
            >
              <input
                type="radio"
                name="shippingAddress"
                value={index}
                checked={selectedAddressIndex === index}
                onChange={() => handleSelectAddress(index)}
                className="mt-1"
              />
              <div>
                <p className="font-semibold">{address.city}, {address.state}</p>
                <p>{address.country}</p>
                <p>Postal Code: {address.postal_code}</p>
              </div>
            </label>
          ))}
        </form>
      )}
    </div>
  );
};

export default ShippingAddressComponent;
