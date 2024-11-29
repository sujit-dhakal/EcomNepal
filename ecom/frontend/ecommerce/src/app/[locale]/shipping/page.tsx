"use client";
import { useAppDispatch } from "@/lib/hooks";
import { addShippingAddress } from "@/lib/store";
import { ShippingAddress } from "@/types/shippingTypes";
import { useFormik } from "formik";
import React from "react";
import { shippingSchema } from "../validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const initialValues: ShippingAddress = {
  state: "",
  country: "",
  postal_code: "",
  city: "",
  isdefault: false,
};

const page = () => {
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(addShippingAddress(values));
        if (response.type === "addShippingAddress/fulfilled") {
          resetForm();
          router.push(`/${locale}/profile/addresses`);
        }
      } catch (error) {
        console.error("Submission error:", error);
      }
    },
    validationSchema: toFormikValidationSchema(shippingSchema),
  });
  return (
    <div className="flex flex-col items-center mt-[50px]">
      <p className="text-3xl font-bold">Add New Address</p>
      <div className="w-[370px] my-[50px] px-4">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <input
              type="text"
              placeholder="city"
              name="city"
              onChange={handleChange}
              value={values.city}
              className="w-full ring-2 ring-black rounded-[20px] p-2 focus:ring-transparent"
            />
            {errors.city && (
              <div className="text-red-900 text-sm">{errors.city}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="country"
              name="country"
              onChange={handleChange}
              value={values.country}
              className="w-full ring-2 ring-black rounded-[20px] p-2 focus:ring-transparent"
            />
            {errors.country && (
              <div className="text-red-900 text-sm">{errors.country}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="postalcode"
              name="postal_code"
              onChange={handleChange}
              value={values.postal_code}
              className="w-full ring-2 ring-black rounded-[20px] p-2 focus:ring-transparent"
            />
            {errors.postal_code && (
              <div className="text-red-900 text-sm">{errors.postal_code}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="state"
              name="state"
              onChange={handleChange}
              value={values.state}
              className="w-full ring-2 ring-black rounded-[20px] p-2 focus:ring-transparent"
            />
            {errors.state && (
              <div className="text-red-900 text-sm">{errors.state}</div>
            )}
          </div>
          <div className="flex space-x-2">
            <label htmlFor="default">Set as default</label>
            <input
              type="checkbox"
              name="isdefault"
              checked={values.isdefault}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="p-2 text-white font-semibold bg-black hover:bg-opacity-70 rounded-[20px]">Add</button>
        </form>
      </div>
    </div>
  );
};

export default page;
