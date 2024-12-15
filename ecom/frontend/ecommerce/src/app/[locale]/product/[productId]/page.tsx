"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { getProductDetail, getComments, getAverageRating } from "@/lib/store";
import { client } from "@/api/baseConfig";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import SectionHeader from "@/components/homepage/SectionHeader";
import { RootState } from "@/lib/store";
import ReviewForm from "@/components/products/ReviewForm";
import { HorizontalLine, Section } from "../../page";
import ProductSection from "@/components/homepage/ProductSection";

const page = ({
  params,
}: {
  params: {
    productId: string;
  };
}) => {
  const router = useRouter();
  const locale = useLocale();
  const [addToCartValue, setAddToCartValue] = useState("Add to cart");
  const dispatch = useAppDispatch();
  const { product, isLoading: isProductLoading } = useAppSelector(
    (state: RootState) => state.product.productState
  );
  const isAuth = useAppSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const { comments, isLoading, isError } = useAppSelector(
    (state: RootState) => state.product.commentState
  );
  const { rating, count } = useAppSelector(
    (state: RootState) =>
      state.product.commentState.averageRating || { rating: 0, count: 0 }
  );

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
    router.push(`/${locale}/checkout?product_id=${productId}`);
  };

  useEffect(() => {
    dispatch(getProductDetail(params.productId));
    dispatch(getComments(params.productId));
    dispatch(getAverageRating(params.productId));
  }, [dispatch, params.productId]);

  if (isProductLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!product || !product.id) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  return (
    <>
      <div className="mt-[50px]">
        <div className="flex flex-col justify-center lg:flex-row gap-16 px-3.5">
          <div className="flex justify-center">
            <img
              src={`http://localhost:8000/${product.image}`}
              alt="product image"
              className="w-[450px] h-[350px] rounded-lg"
            />
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col gap-5 max-w-[420px]">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-black">
                  {product.name}
                </h1>
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className={`text-lg ${index < Math.round(rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                          }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span>({count || 0})</span>
                </div>
                <h1 className="text-md text-red-900">${product.price}</h1>
                <p className="text-md text-black">
                  {product.description}
                </p>
              </div>
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

        <>
          {/* Comments Section */}
          {isLoading ? (
            <p>Loading comments...</p>
          ) : isError ? (
            <p>Failed to load comments. Please try again.</p>
          ) : (
            (comments.length > 0 || isAuth) && (
              <div className="container mx-auto mt-20 px-4 space-y-14">
                <HorizontalLine />
                <Section>
                  <SectionHeader
                    topHeading="Ratings and Reviews"
                    heading={
                      <span className="flex items-center gap-2">
                        <span className="text-yellow-500">★</span>
                        <span>{rating ? rating.toFixed(2) : "0.00"} Ratings</span>
                        <span className="w-2 h-2 bg-black rounded-full mx-1"></span>
                        <span>{count || 0} Reviews</span>
                      </span>
                    }
                  />
                  {isAuth && <ReviewForm productId={product.id} />}

                  {comments.length > 0 && (
                    <div className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-6 mx-auto">
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="py-4 px-2 bg-white border-t-2 border-black border-opacity-30 w-full md:w-[350px] lg:w-[480px] xl:w-[400px] 2xl:w-[480px] justify-self-center shadow-lg"
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
                          <p className="mt-2 text-sm text-justify">
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Section>
              </div>
            )
          )}
        </>

        <div className="container mx-auto mt-20 px-4 space-y-14">
          <HorizontalLine />
          <Section>
            {product && product.id && (
              <ProductSection
                type="similar"
                topHeading="Related Items"
                heading="You Might Also Like"
                productId={product.id}
              />
            )}
          </Section>
        </div>
      </div>
    </>
  );
};

export default page;
