import { Product } from "@/types/productTypes";
import { Comment } from "@/types/commentTypes";
import { IProductApi } from "./IProductApi";
import { client } from "../baseConfig";

export class ProductApi implements IProductApi {
  async getProductDetail(productId: string): Promise<Product> {
    const response = await client.get(`product/${productId}`);
    return response.data;
  }
  async getProducts(query: string): Promise<Product[]> {
    const response = await client.get("products/", {
      params: { query },
    });
    return response.data;
  }
  async getComments(productId: string): Promise<Comment[]> {
    const response = await client.get(`comments/product_comments/${productId}`);
    return response.data;
  }
  async getAverageRating(productId: string): Promise<{ rating: number; count: number }> {
    const response = await client.get( `comments/average_rating/${productId}`);
    return response.data;
  }
  async addComment(comment: Comment): Promise<Comment> {
    const response = await client.post('comments/', comment);
    return response.data;
  }
  async getUserComments(query: string): Promise<Comment[]> {
    const response = await client.get("comments/my_comments");
    return response.data;
  }
}
