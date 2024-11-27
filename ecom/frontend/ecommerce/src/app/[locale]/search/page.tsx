"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProducts } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types/productTypes";
import { useLocale } from "next-intl";
const page = () => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
    if (query) {
      dispatch(getProducts(query));
    }
  }, [query]);
  return (
    <div className="container mx-auto px-2">
      <h1 className="text-xl font-semibold my-10">
        Search Result: Found {products.length} products
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center md:justify-between gap-4 lg:gap-8">
          {products.map((product: Product) => (
            <div>
              <div className="w-70 md:w-75 mx-10">
                <div className="relative bg-[#F5F5F5]">
                  <div className="">
                    <img
                      src={product.image}
                      alt="image"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="w-9 flex flex-col gap-2 absolute top-2 right-4">
                    <div className="flex justify-center items-center w-9 h-9 bg-white rounded-full">
                      <img
                        src="/images/heart small.svg"
                        alt="small heart"
                        className="w-6 h-6"
                      ></img>
                    </div>
                    <div className="flex justify-center items-center w-9 h-9 bg-white rounded-full">
                      <img
                        src="/images/Quick View.svg"
                        alt="Quick View"
                        className="w-6 h-6"
                      ></img>
                    </div>
                  </div>
                </div>
                <Link href={`/${locale}/product/${product.id}`}>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-black text-base font-medium">
                      {product.name}
                    </h1>
                    <p className="text-[#DB4444] text-base font-medium">
                      {product.price}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
