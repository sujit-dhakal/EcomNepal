"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState, useCallback } from "react";
import { getProductDetail } from "@/lib/store";
import { client } from "@/api/baseConfig";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Product } from "@/types/productTypes";
import ProductCard from "@/components/products/ProductCard";
import axios from "axios";

const page = ({
  params,
}: {
  params: {
    productId: string;
  };
}) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const router = useRouter();
  const locale = useLocale();
  const [addToCartValue, setAddToCartValue] = useState("Add to cart");
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const isAuth = useAppSelector((state) => state.user.isAuthenticated);
  const addToCart = async (productId: number) => {
    const response = await client.post(
      "http://127.0.0.1:8000/cart/add_to_cart/",
      {
        product_id: productId,
        quantity: 1,
      }
    );
    setAddToCartValue("Added to Cart");
    console.log(response.data);
  };
  const buyNow = async (productId: number) => {
    const response = await client.post(
      "http://127.0.0.1:8000/cart/add_to_cart/",
      {
        product_id: productId,
        quantity: 1,
      }
    );
    router.push(`/${locale}/cart`);
    console.log(response.data);
  };
  const fetchSimilarProducts = useCallback(async () => {
    if (product.name) {
      const response = await axios.get(
        `http://127.0.0.1:8000/product-recommend/?q=${product.name}`
      );
      setSimilarProducts(response.data.results);
      console.log(response.data);
    }
  }, [product.name]);
  useEffect(() => {
    dispatch(getProductDetail(params.productId));
    fetchSimilarProducts();
  }, [dispatch, params.productId, fetchSimilarProducts]);
  return (
    <div className="mt-[100px]">
      <div className="flex flex-col justify-center lg:flex-row gap-16 px-3.5">
        <img
          src={product.image}
          alt="product image"
          className="w-[450px] h-[350px] rounded-lg"
        />
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 max-w-[420px]">
            <h1 className="text-2xl font-semibold text-black">
              {product.name}
            </h1>
            <h1 className="text-md text-red-900">${product.price}</h1>
            <p className="text-md text-black">{product.description}</p>
            {isAuth && (
              <>
                <hr className="border-black" />
                <button
                  className="bg-orange-500 text-white rounded-lg py-2 px-4"
                  type="button"
                  onClick={() => addToCart(product.id)}
                >
                  {addToCartValue}
                </button>
                <button
                  className="bg-blue-950 text-white text-md rounded-lg py-2 px-4"
                  type="button"
                  onClick={() => buyNow(product.id)}
                >
                  Buy Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <h1>Related Items</h1>
        <div className="flex flex-wrap justify-center md:justify-between gap-4 lg:gap-8">
          {similarProducts.map((product: Product) => (
            <div>
              <ProductCard product={product} imageUrl={product.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
