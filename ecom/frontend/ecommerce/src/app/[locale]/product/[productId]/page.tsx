"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { getProductDetail } from "@/lib/store";
import { client } from "@/api/baseConfig";

const page = ({
  params,
}: {
  params: {
    productId: string;
  };
}) => {
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
  useEffect(() => {
    dispatch(getProductDetail(params.productId));
  }, [dispatch, params.productId]);
  return (
    <div>
      <div className="flex flex-col justify-center lg:flex-row gap-16 px-3.5">
        <div className="flex flex-col justify-center items-center lg:flex-row-reverse gap-5">
          <div className="flex justify-center items-center bg-[#F5F5F5] w-fit lg:w-[500px] h-[400px] lg:h-[600px]">
            <img src="/images/products/joystick.svg"></img>
          </div>
          <div className="flex lg:flex-col gap-3.5">
            <div className="flex justify-center items-center w-[90px] lg:w-[170px] h-[90px] lg:h-[138px] bg-[#F5F5F5]">
              <img src="/images/products/joystick.svg" className="w-20 lg:w-fit h-20"></img>
            </div>
            <div className="flex justify-center items-center w-[90px] lg:w-[170px] h-[90px] lg:h-[138px] bg-[#F5F5F5]">
              <img src="/images/products/joystick.svg" className="w-20 lg:w-fit h-20"></img>
            </div>
            <div className="flex justify-center items-center w-[90px] lg:w-[170px] h-[90px] lg:h-[138px] bg-[#F5F5F5]">
              <img src="/images/products/joystick.svg" className="w-20 lg:w-fit h-20"></img>
            </div>
            <div className="flex justify-center items-center w-[90px] lg:w-[170px] h-[90px] lg:h-[138px] bg-[#F5F5F5]">
              <img src="/images/products/joystick.svg" className="w-20 lg:w-fit h-20"></img>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 max-w-[420px]">
            <h1 className="text-2xl font-semibold text-black">{product.name}</h1>
            <h1 className="text-2xl text-black">{product.price}</h1>
            <p className="text-sm text-black">{product.description}</p>
            {isAuth && (
              <>
                <hr className="border-black" />
                <button
                  className="bg-orange-500 text-white"
                  type="button"
                  onClick={() => addToCart(product.id)}
                >
                  {addToCartValue}
                </button>
                <button className="bg-blue-950 text-white">Buy Now</button>
              </>
            )}
          </div>
        </div>
      </div>






    </div>
  );
};

export default page;
