"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useLocale } from "next-intl";

const Top = () => {
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    const currentUrl = new URL(window.location.href);
    const newPathName = currentUrl.pathname.replace(
      /^\/(en|np)/,
      `/${nextLocale}`
    );
    router.replace(newPathName);
  };

  return (
    <div className="w-full text-[15px] md:text-[20px] lg:text-[20px] bg-black text-white flex items-center justify-between px-10 py-2.5">
      <div className="flex-grow text-center">
        <p>
          Holi Offer - OFF 50%!{" "}
          <Link href={`${localActive}/product?type=dashain`}>
            <span className="font-medium hover:underline">ShopNow</span>
          </Link>
        </p>
      </div>
      <div>
        <select
          defaultValue={localActive}
          className="border-0 bg-black text-white"
          onChange={onSelectChange}
        >
          <option value="en">English</option>
          <option value="np">Nepali</option>
        </select>
      </div>
    </div>
  );
};

export default Top;
