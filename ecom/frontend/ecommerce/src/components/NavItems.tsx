"use client";
import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { actions, logoutUser } from "@/lib/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const NavItems = () => {
  const t = useTranslations("NavBar");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const router = useRouter();
  let isAuth = useAppSelector((state) => state.user.isAuthenticated);
  const handlelogout = async () => {
    const token = Cookies.get("refreshToken");
    if (token) {
      try {
        const response = await dispatch(logoutUser(token));
        console.log(response);
        if (response.payload.status == 200) {
          dispatch(actions.logout());
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          router.push(`/${locale}/accounts/login`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <ul className="flex gap-6">
        <li className="sm:pb-4 md:p-0">
          <Link href={`/${locale}/home`}>{t("Home")}</Link>
        </li>
        <li className="sm:pb-4 md:p-0">
          <Link href={`/${locale}/contact`}>{t("Contact")}</Link>
        </li>
        {isAuth ? (
          <>
            <li className="sm:pb-4 md:p-0">
              <Link href={`/${locale}/profile`}>Profile</Link>
            </li>
            <li className="sm:pb-4 md:p-0">
              <button onClick={handlelogout}>Logout</button>
            </li>
            <li className="sm:pb-4 md:p-0">
              <Link href={`/${locale}/cart`}>Cart</Link>
            </li>
          </>
        ) : (
          <>
            <li className="sm:pb-4 md:p-0">
              <Link href={`/${locale}/accounts/signup`}>{t("SignUp")}</Link>
            </li>
            <li className="sm:pb-4 md:p-0">
              <Link href={`/${locale}/accounts/login`}>{t("Login")}</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default NavItems;
