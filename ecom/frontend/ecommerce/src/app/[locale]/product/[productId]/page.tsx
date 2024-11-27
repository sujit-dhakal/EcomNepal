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
import SectionHeader from "@/components/homepage/SectionHeader";
import Button from "@/components/Button";

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
  const product = useAppSelector((state: RootState) => state.product.productState.product);
  const isAuth = useAppSelector((state: RootState) => state.user.isAuthenticated);
  const { comments, isLoading, isError } = useAppSelector((state: RootState) => state.product.commentState);
  const { rating, count } = useAppSelector((state: RootState) => state.product.commentState.averageRating || { rating: 0, count: 0 });

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

  useEffect(() => {
    dispatch(getProductDetail(params.productId));
    dispatch(getComments(params.productId));
    dispatch(getAverageRating(params.productId));
  }, [dispatch, params.productId]);

  return (
    <div className="mt-[50px]">
      <div className="flex flex-col justify-center lg:flex-row gap-16 px-3.5">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt="product image"
            className="w-[450px] h-[350px] rounded-lg"
          />
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col gap-5 max-w-[420px]">
            <h1 className="text-2xl font-semibold text-black">
              {product.name}
            </h1>
            <h1 className="text-md text-red-900">${product.price}</h1>
            <p className="text-md text-black">{product.description}</p>
            {isAuth && (
              <>
                <hr className="border-black border-opacity-30" />
                <button
                  className="bg-black hover:bg-opacity-70 text-white rounded-lg py-2 px-4"
                  type="button"
                  onClick={() => addToCart(product.id)}
                >
                  {addToCartValue}
                </button>
                <button
                  className="bg-black hover:bg-opacity-70 text-white text-md rounded-lg py-2 px-4"
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

      {/* Comments Section */}
      {isLoading ? (
        <p>Loading comments...</p>
      ) : isError ? (
        <p>Failed to load comments. Please try again.</p>
      ) : comments.length > 0 && (
        <div className="container mx-auto mt-20 px-4">
          <div className="flex items-center gap-2 text-2xl font-semibold mb-4">
            <div className="text-yellow-500">★</div>
            <div>{rating.toFixed(2)} product rating</div>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div>{count} ratings</div>
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="py-4 border-t border-black border-opacity-30 w-full md:w-[350px] lg:w-[480px] xl:w-[400px] 2xl:w-[480px] justify-self-center"
              >
                <div className="flex flex-col">
                  <p className="font-semibold">{comment.user}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className={`text-lg ${index < Math.round(comment.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                          }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-justify">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto mt-20 px-4">
        <div className="w-full px-3.5 md:px-0">
          <hr className="border-0.5 border-black border-opacity-30" />
        </div>

        <section className="flex flex-col gap-10 md:gap-[60px] w-full mt-10 px-3.5 md:px-0">
          <SectionHeader
            topHeading="Related Items"
            heading="You Might Also Like"
            buttons={[
              <Button
                text="View All"
                className="md:w-40 md:h-14 md:text-base"
              />,
            ]}
          />
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center md:justify-between gap-4 lg:gap-8">
              {similarProducts.map((product: Product) => (
                <ProductCard product={product} imageUrl={product.image} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
