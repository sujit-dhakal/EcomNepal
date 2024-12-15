"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { getProductDetail, getComments, getAverageRating } from "@/lib/store";
import { client } from "@/api/baseConfig";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Product } from "@/types/productTypes";
import SectionHeader from "@/components/homepage/SectionHeader";
import Button from "@/components/Button";
import { RootState } from "@/lib/store";
import Link from "next/link";
import ReviewForm from "@/components/products/ReviewForm";

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
  const { product, relatedProducts } = useAppSelector(
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

  const isProductLoading = useAppSelector(
    (state: RootState) => state.product.productState.isLoading
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
  // const fetchSimilarProducts = async (
  //   productName: string,
  //   product_id: number
  // ) => {
  //   try {
  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/product-recommend/?q=${productName}&product_id=${product_id}`
  //     );
  //     const updatedProducts = response.data.results.map((product: Product) => ({
  //       ...product,
  //       image: product.image.replace("django-app:8000", "127.0.0.1:8000"),
  //     }));
  //     setSimilarProducts(updatedProducts);
  //   } catch (error) {
  //     console.error("Error fetching similar products:", error);
  //   }
  // };

  useEffect(() => {
    dispatch(getProductDetail(params.productId));
    dispatch(getComments(params.productId));
    dispatch(getAverageRating(params.productId));
  }, [dispatch, params.productId]);

  // useEffect(() => {
  //   if (product.name) {
  //     fetchSimilarProducts(product.name, product.id);
  //   }
  // }, [product.name, fetchSimilarProducts]);

  return (
    <>
      <div className="mt-[50px]">
        <div>
          {isProductLoading ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </>
          ) : (
            <>
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
                              className={`text-lg ${
                                index < Math.round(rating)
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span>({count})</span>
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
            </>
          )}
        </div>

        <>
          {/* Comments Section */}
          {isLoading ? (
            <p>Loading comments...</p>
          ) : isError ? (
            <p>Failed to load comments. Please try again.</p>
          ) : (
            comments.length > 0 && (
              <div className="container mx-auto mt-20 px-4">
                <div className="w-full px-3.5 md:px-0">
                  <hr className="border-0.5 border-black border-opacity-30" />
                </div>

                <section className="flex flex-col gap-10 md:gap-[60px] w-full mt-10 px-3.5 md:px-0">
                  <SectionHeader
                    topHeading="Ratings and Reviews"
                    heading={
                      <span className="flex items-center gap-2">
                        <span className="text-yellow-500">★</span>
                        <span>{rating.toFixed(2)} Ratings</span>
                        <span className="w-2 h-2 bg-black rounded-full mx-1"></span>
                        <span>{count} Reviews</span>
                      </span>
                    }
                  />
                  {isAuth && <ReviewForm productId={product.id} />}

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
                                className={`text-lg ${
                                  index < Math.round(comment.rating)
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
                </section>
              </div>
            )
          )}
        </>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-12">
              {relatedProducts.map((product: Product) => (
                <div className="max-w-xs mx-auto rounded-lg shadow-md bg-white transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg">
                  <Link href={`/${locale}/product/${product.id}`}>
                    <div className="relative">
                      <img
                        src={`http://localhost:8000/${product.image}`}
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
                                index <
                                Math.round(product.average_rating?.rating || 0)
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
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default page;
