import { OrderTypes } from "@/types/orderTypes";

export interface IOrderApi {
  getOrders(): Promise<OrderTypes[]>;
  getOrderDetails(orderId: number): Promise<OrderTypes>;
}
