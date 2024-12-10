"use client";
import ShippingAddressComponent from "@/components/checkout/ShippingAddress";
import CheckoutDetail from "@/components/checkout/CheckoutDetail";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getProductDetail } from "@/lib/store";

const page = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.productState.product);
  const product_id = searchParams.get("product_id");
  const [error, setError] = useState<string | null>(null);
  const [hasAddress, setHasAddress] = useState(false);

  useEffect(() => {
      dispatch(getProductDetail(product_id))
  }, [dispatch, product_id]);

  const handlePaypalError = () => {
    setError("Please add shipping address to continue order placement.");
  };

  return (
    <div className="container mx-auto px-2 mt-[50px]">
      <h2 className="text-2xl font-semibold">Checkout Details</h2>
      <div className="flex flex-col lg:flex-row justify-between gap-[60px]">
        <ShippingAddressComponent onAddressChange={(status) => setHasAddress(status)} />
        <CheckoutDetail product={product} hasAddress={hasAddress} onPaypalError={handlePaypalError} />
      </div>
      {error && <p className="text-red-500 mt-4 text-center lg:text-right lg:mr-[120px]">{error}</p>}
    </div>
  );
};
export default page;
