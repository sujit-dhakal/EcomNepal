"use client";
import React from 'react';
import { useAppDispatch } from "@/lib/hooks";
import { userProfile, RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { FaUser, FaShoppingBag, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const profile = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const data = dispatch(userProfile());
  }, [dispatch]);

  const links = [
    { label: 'Personal Info', href: `/${locale}/profile/personal-info`, icon: <FaUser /> },
    { label: 'Orders', href: `/${locale}/profile/orders`, icon: <FaShoppingBag /> },
    { label: 'Reviews', href: `/${locale}/profile/reviews`, icon: <FaStar /> },
    { label: 'Addresses', href: `/${locale}/profile/addresses`, icon: <FaMapMarkerAlt /> },
  ];

  return (
    <aside className="w-full md:w-1/4 sm:p-6 space-y-6">
      <div>
        <h2 className="mt-4 text-3xl font-bold">Welcome</h2>
        <p className="text-lg">{profile.username}</p>
      </div>
      <ul className="space-y-4">
        {links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <li
              key={index}
              className={`flex items-center space-x-3 ${isActive ? "text-black font-bold" : "text-gray-500"
                }`}
            >
              <a
                href={link.href}
                className="flex gap-4 items-center hover:text-black"
              >
                <span className={`${isActive ? "text-black" : "text-gray-500"}`}>{link.icon}</span>
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
