import { ShippingApi } from "@/api/shippingApi/ShippingApi";
import { ShippingAddress } from "@/types/shippingTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

const shipApi = new ShippingApi();

export const addShippingAddressThunk = () => {
  return createAsyncThunk(
    "addShippingAddress",
    async (address: ShippingAddress) => {
      try {
        const response = await shipApi.addAddress(address);
        return response;
      } catch (error: any) {
        return error.response.data;
      }
    }
  );
};
export const getShippingAddressesThunk = () => {
  return createAsyncThunk("getShippingAddress", async () => {
    try {
      const response = await shipApi.getAddresses();
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};
