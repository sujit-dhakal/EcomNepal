import axios from "axios";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/productTypes";
import Filter from "@/components/filtering/Filter";

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
    <div className="container mx-auto md:px-2">
      {/* <Filter /> */}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center xl:justify-between gap-4 lg:gap-8">
          {products.map((product: Product) => (
            <ProductCard
              product={product}
              imageUrl={`http://django-app:8000${product.image}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
