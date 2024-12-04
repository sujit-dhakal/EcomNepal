import { OrderApi } from "@/api/orderApi/OrderApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const orderApi = new OrderApi();

export const getOrdersThunk = () => {
  return createAsyncThunk("orders/getOrders", async () => {
    try {
      const response = await orderApi.getOrders();
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const getOrderDetailsThunk = () => {
  return createAsyncThunk("orders/getOrderDetails", async (orderId: number) => {
    try {
      const response = await orderApi.getOrderDetails(orderId);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};