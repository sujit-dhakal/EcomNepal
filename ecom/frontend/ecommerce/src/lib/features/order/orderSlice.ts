import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrdersThunk, getOrderDetailsThunk } from "./orderThunk";
import { OrderTypes, OrderState } from "@/types/orderTypes";

const initialState: OrderState = {
  isLoading: false,
  isError: false,
  orders: [],
  orderItems: [],
  selectedOrder: null,
};

export const buildOrderSlice = () => {
  const getOrders = getOrdersThunk();
  const getOrderDetails = getOrderDetailsThunk();

  const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Get Orders
        .addCase(getOrders.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(
          getOrders.fulfilled,
          (state, action: PayloadAction<OrderTypes[]>) => {
            state.isLoading = false;
            state.orders = action.payload;
            state.isError = false;
          }
        )
        .addCase(getOrders.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        })
        // Get Order Details
        .addCase(getOrderDetails.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(
          getOrderDetails.fulfilled,
          (state, action: PayloadAction<OrderTypes>) => {
            state.isLoading = false;
            state.selectedOrder = action.payload;
            state.isError = false;
          }
        )
        .addCase(getOrderDetails.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        });
    },
  });

  return {
    orderSlice,
    getOrders,
    getOrderDetails,
  };
};
