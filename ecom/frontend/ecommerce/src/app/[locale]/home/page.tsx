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
      <div className="mb-12">
        <img
          src="/ecommerce.jpg"
          alt="ecommerce image"
          className="w-[75%] m-auto h-[50vh] lg:h-[80vh]"
        />
      </div>
      <div className="">
        <div className="mb-12 w-[75%] m-auto">
          <h1 className="text-3xl mb-12">Browse by Category</h1>
        </div>
        <Filter />
      </div>
      <div className="mb-12 w-[75%] m-auto">
        <h1 className="text-3xl mb-12">Our Products</h1>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center md:justify-between gap-4 lg:gap-8">
            {products.map((product: Product) => (
              <ProductCard product={product} imageUrl={product.image} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
