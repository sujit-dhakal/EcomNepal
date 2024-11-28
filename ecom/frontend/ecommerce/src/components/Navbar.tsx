"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import NavItems from "./NavItems";
import SearchBar from "./search/SearchBar";
import { useTranslations, useLocale } from "next-intl";
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const t = useTranslations("NavBar");
  const locale = useLocale();
  const pathName = usePathname();
  const [activeOverlay, setActiveOverlay] = useState<"menu" | "search" | null>(null);
  const isAuth = useAppSelector((state) => state.user.isAuthenticated);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeOverlay === "menu" && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveOverlay(null);
      }
      if (activeOverlay === "search" && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setActiveOverlay(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeOverlay]);

  const handleLinkClick = () => setActiveOverlay(null);

  const renderIconLink = (path: string, Icon: any, isProfile: boolean = false) => {
    let isActive = false;
    if (isProfile) {
      isActive = pathName.startsWith(`/${locale}/profile`);
    } else {
      isActive = pathName === path;
    }

    return (
      <Link href={path} onClick={handleLinkClick}>
        <div
          className={`p-2 rounded-full text-gray-500 hover:text-white hover:bg-black cursor-pointer ${isActive ? "bg-black text-white" : ""
            }`}
        >
          <Icon size={24} />
        </div>
      </Link>
    );
  };

  return (
    <div className="relative border-b border-black border-opacity-30 mb-8">
      <div className="container px-2 mx-auto flex justify-between items-center pt-8 pb-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="font-bold text-3xl" onClick={handleLinkClick}>
          EcomNepal
        </Link>

        {/* Desktop Navigation */}
        <div className="flex w-[67%] justify-end xl:justify-between gap-4 mr-4 sm:mr-6 md:mr-[-10px] lg:mr-[-100px] xl:mr-0">
          <div className="hidden w-full xl:flex items-center justify-between gap-6">
            <NavItems onLinkClick={handleLinkClick} />
            <SearchBar onSearch={() => setActiveOverlay(null)} />
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <button
              aria-label="Search"
              className="xl:hidden cursor-pointer text-gray-500"
              onClick={() => setActiveOverlay(activeOverlay === "search" ? null : "search")}
            >
              <FaSearch size={24} />
            </button>
            {isAuth && (
              <>
                {renderIconLink(`/${locale}/cart`, FaShoppingCart)}
                {renderIconLink(`/${locale}/profile`, FaUser, true)}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div ref={menuRef} className="xl:hidden flex text-gray-500">
          <button aria-label="Menu" onClick={() => setActiveOverlay(activeOverlay === "menu" ? null : "menu")}>
            {activeOverlay === "menu" ? <RxCross1 size={24} /> : <FaBars size={24} />}
          </button>
          <div
            className={`fixed top-[125px] left-0 w-full bg-black text-white z-10 p-4 transition-transform duration-300 ${activeOverlay === "menu" ? "transform translate-y-0" : "transform -translate-y-[500px]"
              }`}
          >
            <NavItems onLinkClick={handleLinkClick} />
          </div>
        </div>
      </div>

      {/* Search Bar Overlay for Small Screens */}
      {activeOverlay === "search" && (
        <div
          ref={searchRef}
          className={`absolute top-8 left-0 xl:hidden w-full z-20 px-2 transition-transform duration-300 ease-in-out ${activeOverlay === "search" ? "scale-100 opacity-100 visible" : "scale-90 opacity-0 invisible"
            }`}
        >
          <SearchBar onSearch={() => setActiveOverlay(null)} />
        </div>
      )}
    </div>
  );
};

export default Navbar;