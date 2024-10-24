"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import NavItems from "./NavItems";
import SearchBar from "./search/SearchBar";

const Navbar = () => {
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
      <div className="top-0 left-0 w-full">
        <div className="flex justify-between items-center md:flex py-4 px-2 md:px-4">
          <div className="font-bold text-3xl cursor-pointer">
            <Link href="/">EcomNepal</Link>
          </div>
          <div className="md:hidden">
            <button onClick={handleToggle}>
              {toggle ? (
                <div
                  className={`fixed p-4 text-left left-0 top-[48px] w-full h-full bg-black text-white`}
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
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <div className="hidden md:block">
            <NavItems />
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
