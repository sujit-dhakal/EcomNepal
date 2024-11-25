"use client";
import { useEffect, useState } from "react";
import { CartItems } from "@/types/cartTypes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getCartItems,
  getCartSum,
  removeCartItem,
  updateCartItem,
} from "@/lib/store";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";

const page = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.itemsInCart);
  const sum = useAppSelector((state) => state.cart.sum);

  const fetchData = async () => {
    const response = await dispatch(getCartItems());
    console.log(response.payload == 0);
    if (response.payload == 0) {
      setIsEmpty(true);
    }
  };

  const fetchSum = async () => {
    const response = await dispatch(getCartSum());
    console.log(response);
  };

  const removeItem = async (productId: number) => {
    await dispatch(removeCartItem(productId));
    await fetchData();
    await fetchSum();
  };

  const handleQuantityChange = async (
    productId: number,
    newQuantity: number
  ) => {
    await dispatch(updateCartItem({ productId, newQuantity }));
    await fetchData();
    await fetchSum();
  };

  const handleProceed = () => {
    router.push(`/${locale}/checkout/`);
  };
  useEffect(() => {
    fetchData();
    fetchSum();
  }, []);
  return (
    <>
      <div className="w-[75%] m-auto">
        <div className="mt-10 flex justify-center">
          {isEmpty ? (
            <div className="w-64 py-4 px-8 border-2 text-center border-gray-200 mt-20">
              <p className="font-semibold">No items in cart.</p>
              <p className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg">
                <Link href={`/${locale}/home`}>Add some items</Link>
              </p>
            </div>
          ) : (
            <div>
              <table>
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-3 md:px-6 lg:px-20 py-3 md:py-6 lg:py-5 text-sm lg:text-lg">
                      Product Id
                    </th>
                    <th className="px-3 md:px-6 lg:px-20 py-3 md:py-6 lg:py-5 text-sm lg:text-lg">
                      Product Name
                    </th>
                    <th className="px-3 md:px-6 lg:px-20 py-3 md:py-6 lg:py-5 text-sm lg:text-lg">
                      Quantity
                    </th>
                    <th className="px-3 md:px-6 lg:px-20 py-3 md:py-6 lg:py-5 text-sm lg:text-lg">
                      Price
                    </th>
                    <th className="px-3 md:px-6 lg:px-20 py-3 md:py-6 lg:py-5 text-sm lg:text-lg"></th>
                  </tr>
                </thead>
                {cartItems.map((item: CartItems) => (
                  <tbody key={item.product.id} className="bg-white">
                    <tr className="border-b-2 border-gray-200">
                      <td className="px-3 md:px-6 lg:px-20 py-3 md:py-6 lg:py-5 text-sm lg:text-lg">
                        {item.product.id}
                      </td>
                      <td className="px-3 md:px-6 lg:px-20 py-3 md:py-6 lg:py-5 text-sm lg:text-lg">
                        {item.product.name}
                      </td>
                      <td className="px-3 md:px-6 lg:px-20 py-3 md:py-6 lg:py-5 text-sm lg:text-lg">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.product.id,
                              parseInt(e.target.value)
                            )
                          }
                          min={1}
                          max={5}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm [&::-webkit-outer-spin-button]:opacity-100 [&::-webkit-inner-spin-button]:opacity-100"
                        />
                      </td>
                      <td className="px-3 md:px-6 lg:px-20 py-3 md:py-6 lg:py-5 text-sm lg:text-lg">
                        ${item.total_price}
                      </td>
                      <td className="px-3 md:px-6 lg:px-20 py-3 md:py-6 lg:py-5 text-sm lg:text-lg">
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="bg-red-900 px-2 py-1 md:px-4 md:py-2 rounded-lg text-white"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
              <div className="flex justify-center">
                <div className="w-64 py-4 px-8 border-2 text-center border-gray-200 mt-20">
                  <h1>
                    <span className="font-semibold">Total Sum: </span>${sum}
                  </h1>
                  <button
                    className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleProceed}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div >
    </>
  );
};

export default page;
