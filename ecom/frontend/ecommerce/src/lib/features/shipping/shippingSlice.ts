import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addShippingAddressThunk,
  getShippingAddressesThunk,
} from "./shippingThunk";
import { ShippingAddress, ShippingAddressState } from "@/types/shippingTypes";

const initialState: ShippingAddressState = {
  addresses: [],
  address: {
    city: "",
    country: "",
    state: "",
    postal_code: "",
    isdefault: false,
  },
  isLoading: false,
  isError: false,
};

export const buildShippingSlice = () => {
  const addShippingAddress = addShippingAddressThunk();
  const getShippingAddresses = getShippingAddressesThunk();
  const shippingSlice = createSlice({
    name: "shipping",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getShippingAddresses.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
      builder
        .addCase(
          getShippingAddresses.fulfilled,
          (state, action: PayloadAction<ShippingAddress>) => {
            state.addresses = action.payload;
            state.isLoading = false;
            state.isError = false;
          }
        )
        .addCase(getShippingAddresses.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        }),
        builder.addCase(addShippingAddress.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        });
      builder
        .addCase(
          addShippingAddress.fulfilled,
          (state, action: PayloadAction<ShippingAddress>) => {
            state.address = action.payload;
            state.isLoading = false;
            state.isError = false;
          }
        )
        .addCase(addShippingAddress.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        });
    },
  });
  return {
    shippingSlice,
    addShippingAddress,
    getShippingAddresses,
  };
};
