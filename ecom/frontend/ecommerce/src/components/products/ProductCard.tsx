import { Product } from "@/types/productTypes";
import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";

export interface ProductCard {
  product: Product;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCard> = ({ product, imageUrl }) => {
  const locale = useLocale();
  return (
    <div className="w-70 md:w-75 mx-10">
      <Link href={`/${locale}/product/${product.id}`}>
        <div className="relative bg-[#F5F5F5]">
          <div className="">
            <Image
              src={imageUrl}
              alt="product image"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-black text-base font-medium">{product.name}</h1>
          <div className="flex items-center gap-1">
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
            <span>({product.average_rating?.count || 0})</span>
          </div>
          <p className="text-[#DB4444] text-base font-medium">
            {product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
