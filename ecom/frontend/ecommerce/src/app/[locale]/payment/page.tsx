"use client";
import ShippingAddressComponent from "@/components/checkout/ShippingAddress";
import CheckoutDetail from "@/components/checkout/CheckoutDetail";

const page = () => {
  return (
    <div className="container mx-auto px-2 mt-[50px]">
      <h2 className="text-2xl font-semibold">Billing Details</h2>
      <div className="flex flex-col lg:flex-row justify-between gap-[60px]">
        <ShippingAddressComponent />
        <CheckoutDetail />
      </div>
    </div>
  );
};
export default page;
