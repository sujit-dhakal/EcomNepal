import axios from "axios";
import ProductCard from "@/components/products/ProductCard";
import Filter from "@/components/filtering/Filter";
import { Product } from "@/types/productTypes";

const fetchData = async () => {
  const response = await axios.get("http://django-app:8000/products/");
  return response.data;
};
const page = async () => {
  const products = await fetchData();
  return (
    <>
      <div>
        <Filter />
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product: Product) => (
            <ProductCard product={product} imageUrl={product.image} />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
