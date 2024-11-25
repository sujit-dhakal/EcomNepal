export interface ShippingAddress {
  city: string;
  country: string;
  state: string;
  postal_code: string;
  isdefault: boolean;
}

export interface ShippingAddressState {
  addresses: ShippingAddress[];
  address: ShippingAddress;
  isLoading: boolean;
  isError: boolean;
}
