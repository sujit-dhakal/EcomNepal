import axios from "axios";
import { Product } from "@/types/productTypes";
import { apiUrl } from "@/api/config";

export const fetchSimilarProducts = async (
  productName: string,
  productId: number
): Promise<Product[]> => {
  try {
    const response = await axios.get(apiUrl("product-recommend/"), {
      params: { q: productName, product_id: productId },
    });
    const updatedProducts = response.data.results.map((product: Product) => ({
      ...product,
      image: apiUrl(product.image),
    }));
    return updatedProducts;
  } catch (error) {
    console.error("Error fetching similar products:", error);
    throw error;
  }
};
