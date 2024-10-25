import { Product } from "@/types/productTypes";
import ProductCard from "./ProductCard";

export interface ProductList {
  products: Product[];
}

const ProductList: React.FC<ProductList> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default ProductList;
