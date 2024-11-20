"use client";
import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { actions, logoutUser } from "@/lib/store";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

const NavItems = () => {
  const t = useTranslations("NavBar");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();
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
  const navItems = [
    { path: `/${locale}`, label: t("Home") },
    { path: `/${locale}/contact`, label: t("Contact") },
    ...(isAuth
      ? [
          { path: `/${locale}/profile`, label: "Profile" },
          { path: `/${locale}/cart`, label: "Cart" },
        ]
      : [
          { path: `/${locale}/accounts/signup`, label: t("SignUp") },
          { path: `/${locale}/accounts/login`, label: t("Login") },
        ]),
  ];
  return (
    <>
      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`font-medium px-2 py-1 hover:bg-black hover:text-white hover:px-2 hover:py-1 hover:rounded-md ${
              pathName == item.path
                ? "bg-black text-white px-2 py-1 rounded-lg"
                : ""
            }`}
          >
            <Link href={item.path}>{item.label}</Link>
          </li>
        ))}
        {isAuth && (
          <li className="font-medium px-2 py-1 hover:bg-black hover:text-white hover:px-2 hover:py-1 hover:rounded-md">
            <button onClick={handlelogout}>Logout</button>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavItems;
