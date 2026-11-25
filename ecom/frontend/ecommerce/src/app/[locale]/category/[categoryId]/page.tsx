import axios from "axios";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/productTypes";
import { apiUrl, internalApiUrl } from "@/api/config";

const fetchCategoryProducts = async (categoryId: string) => {
  const response = await axios.get(
    internalApiUrl(`product-filter/${categoryId}`)
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
    <div className="container mx-auto md:px-2">
      {/* <Filter /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-12">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              image: apiUrl(product.image)
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
