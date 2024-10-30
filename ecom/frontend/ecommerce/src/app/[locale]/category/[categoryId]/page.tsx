import axios from "axios";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/productTypes";

const fetchCategoryProducts = async (categoryId: string) => {
  const response = await axios.get(
    `http://django-app:8000/product-filter/${categoryId}`
  );
  return response.data;
};

const page = async ({
  params,
}: {
  params: {
    categoryId: string;
  };
}) => {
  const products = await fetchCategoryProducts(params.categoryId);
  console.log(products);
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product: Product) => (
          <ProductCard
            product={product}
            imageUrl={`http://django-app:8000${product.image}`}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
