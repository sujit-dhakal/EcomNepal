import { ShippingAddress } from "@/types/shippingTypes";

export interface IShippingApi {
  getAddress(): Promise<ShippingAddress>; // Fetch default address
  getAddresses(): Promise<ShippingAddress[]> // Fetch all addresses
  addAddress(address: ShippingAddress): Promise<ShippingAddress>;
}
