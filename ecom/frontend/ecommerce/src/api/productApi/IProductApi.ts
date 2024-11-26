import { Product } from "@/types/productTypes";
import { Comment } from "@/types/commentTypes";

export interface IProductApi {
  getProducts(query: string): Promise<Product[]>;
  getProductDetail(productId: string): Promise<Product>;
  getComments(productId: string): Promise<Comment[]>;
  getAverageRating(productId: string): Promise<{ rating: number; count: number }>;
  addComment(comment: Comment): Promise<Comment>;
  getUserComments(query: string): Promise<Comment[]>;
}