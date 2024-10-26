import axios from "axios";
import ProductList from "@/components/products/ProductList";
import Filter from "@/components/filtering/Filter";

const fetchData = async () => {
  const response = await axios.get("http://django-app:8000/products/");
  const products = response.data;
  return products;
};
const page = async () => {
  const products = await fetchData();
  return (
    <>
      <div>
        <Filter />
      </div>
      <div className="flex justify-center">
        <ProductList products={products} />
      </div>
    </>
  );
};

export default page;
