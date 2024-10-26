import { Product } from "@/types/productTypes";
import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Image from 'next/image';

export interface ProductCard {
  product: Product;
}

const ProductCard: React.FC<ProductCard> = ({ product }) => {
  const locale = useLocale();
  return (
    <div className="w-64" className="flex flex-col gap-2">
      <div className="relative bg-[#F5F5F5]">
        <div className="px-20 py-10">
          <img src="/images/products/71RdoeXxtrL 1.png" alt="Products image"></img>
        </div>
        <div className="w-9 flex flex-col gap-2 absolute top-2 right-4">
          <div className="flex justify-center items-center w-9 h-9 bg-white rounded-full">
            <img src="/images/heart small.svg" alt="small heart" className="w-6 h-6"></img>
          </div>
          <div className="flex justify-center items-center w-9 h-9 bg-white rounded-full">
            <img src="/images/Quick View.svg" alt="Quick View" className="w-6 h-6"></img>
          </div>
        </div>
      </div>
      <Link href={`/${locale}/product/${product.id}`}>
        <div className="flex flex-col gap-2">
          <h1 className="text-black text-base font-medium">{product.name}</h1>
          <p className="text-[#DB4444] text-base font-medium">{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
