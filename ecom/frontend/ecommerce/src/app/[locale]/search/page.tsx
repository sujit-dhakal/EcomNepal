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
  const products = useAppSelector((state) => state.product.productState.products);

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
        <div className="flex flex-wrap justify-center xl:justify-between gap-4 lg:gap-8">
          {products.map((product: Product) => (
            <Link href={`/${locale}/product/${product.id}`} key={product.id}>
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
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-black text-base font-medium">
                      {product.name}
                    </h1>
                    <p className="text-[#DB4444] text-base font-medium">
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div >
  );
};

export default page;
