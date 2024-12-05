export interface OrderItemTypes {
  productName: string;
  quantity: string;
  price: string;
}

export interface OrderTypes {
  id: number;
  status: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItemTypes[];
}

export interface OrderState {
  isLoading: boolean;
  isError: boolean;
  orders: OrderTypes[];
  orderItems: OrderItemTypes[];
  selectedOrder: OrderTypes | null;
}
