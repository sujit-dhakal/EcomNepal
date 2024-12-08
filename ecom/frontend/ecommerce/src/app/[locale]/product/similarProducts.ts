import axios from "axios";
import { Product } from "@/types/productTypes";

export const fetchSimilarProducts = async (
  productName: string,
  productId: number
): Promise<Product[]> => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/product-recommend/?q=${productName}&product_id=${productId}`
    );
    const updatedProducts = response.data.results.map((product: Product) => ({
      ...product,
      image: product.image.replace("django-app:8000", "127.0.0.1:8000"),
    }));
    return updatedProducts;
  } catch (error) {
    console.error("Error fetching similar products:", error);
    throw error;
  }
};
