"use client";
import React, { useEffect } from 'react';
import { useAppDispatch } from "@/lib/hooks";
import { userProfile, RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { usePathname } from 'next/navigation';
import { useLocale } from "next-intl";
import { FaUser, FaShoppingBag, FaStar, FaMapMarkerAlt, FaLock } from 'react-icons/fa';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const profile = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const links = [
    { label: 'Personal Info', href: `/${locale}/profile/personal-info`, icon: <FaUser /> },
    { label: 'Orders', href: `/${locale}/profile/orders`, icon: <FaShoppingBag /> },
    { label: 'Reviews', href: `/${locale}/profile/reviews`, icon: <FaStar /> },
    { label: 'Address Book', href: `/${locale}/profile/addresses`, icon: <FaMapMarkerAlt /> },
    { label: 'Change Password', href: `/${locale}/profile/changepassword`, icon: <FaLock /> },
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
              <Link
                href={link.href}
                className="flex gap-4 items-center hover:text-black"
              >
                <span className={`${isActive ? "text-black" : "text-gray-500"}`}>{link.icon}</span>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
