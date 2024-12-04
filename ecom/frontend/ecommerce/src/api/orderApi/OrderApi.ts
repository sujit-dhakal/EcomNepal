import { OrderTypes } from "@/types/orderTypes";
import { IOrderApi } from "./IOrderApi";
import { client } from "../baseConfig";

export class OrderApi implements IOrderApi {
  async getOrders(): Promise<OrderTypes[]> {
    const response = await client.get("orders/");
    return response.data;
  }

  async getOrderDetails(orderId: number): Promise<OrderTypes> {
    const response = await client.get(`orders/${orderId}/details/`);
    return response.data;
  }
}
