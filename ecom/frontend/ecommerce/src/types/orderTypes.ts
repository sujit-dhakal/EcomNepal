export interface OrderItemTypes {
  product_name: string;
  quantity: string;
  price: string;
}

export interface OrderTypes {
  id: number;
  status: string;
  total_amount: string;
  created_at: string;
  updated_at: string;
  items: OrderItemTypes[];
}

export interface OrderState {
  isLoading: boolean;
  isError: boolean;
  orders: OrderTypes[];
  orderItems: OrderItemTypes[];
  selectedOrder: OrderTypes | null;
}
