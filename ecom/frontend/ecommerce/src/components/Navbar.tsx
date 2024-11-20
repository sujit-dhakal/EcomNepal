"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import NavItems from "./NavItems";
import SearchBar from "./search/SearchBar";
import { useTranslations, useLocale } from "next-intl";

const Navbar = () => {
  const t = useTranslations("NavBar");
  const locale = useLocale();
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggle]);
  return (
    <>
      <div className="top-0 left-0 container px-2 m-auto">
        <div className="flex justify-between items-center py-8">
          <div className="font-bold text-3xl cursor-pointer">
            <Link href={`/${locale}`}>EcomNepal</Link>
          </div>
          <div className="xl:hidden">
            <button onClick={handleToggle}>
              {toggle ? (
                <div
                  className={`fixed p-4 text-left left-0 top-[48px] w-full h-full bg-black text-white z-10`}
                >
                  <IoMdClose />
                  <div className="mt-10 flex flex-col items-start h-full overflow-y-auto p-4">
                    <div className="pb-4">
                      <SearchBar />
                    </div>
                    <NavItems />
                  </div>
                </div>
              ) : (
                <FaBars />
              )}
            </button>
          </div>
          <div className="hidden xl:block">
            <SearchBar />
          </div>
          <div className="hidden xl:block">
            <NavItems />
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
