"use client";
import ShippingAddressComponent from "@/components/checkout/ShippingAddress";
import CheckoutDetail from "@/components/checkout/CheckoutDetail";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getProductDetail } from "@/lib/store";

const page = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.productState.product);
  const product_id = searchParams.get("product_id");

  useEffect(() => {
      dispatch(getProductDetail(product_id))
    
  }, [dispatch]);

  return (
    <div className="container mx-auto px-2 mt-[50px]">
      <h2 className="text-2xl font-semibold">Checkout Details</h2>
      <div className="flex flex-col lg:flex-row justify-between gap-[60px]">
        <ShippingAddressComponent />
        <CheckoutDetail product={product} />
      </div>
    </div>
  );
};
export default page;
