import { Product } from "@/types/productTypes";
import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

export interface ProductCard {
  product: Product;
}

const ProductCard: React.FC<ProductCard> = ({ product }) => {
  const locale = useLocale();
  return (
    <div className="max-w-xs mx-auto rounded-lg shadow-md bg-white transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg">
      <Link href={`/${locale}/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={`Image of ${product.name}`}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h2>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`text-lg ${
                    index < Math.round(product.average_rating?.rating || 0)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.average_rating?.count || 0})
            </span>
          </div>
          <p className="text-xl font-bold text-red-500 mt-3">
            ${product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
