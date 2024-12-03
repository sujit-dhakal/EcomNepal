export interface AverageRating {
  rating: number;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  average_rating: AverageRating;
}

export interface ProductState {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
  product: Product;
}
