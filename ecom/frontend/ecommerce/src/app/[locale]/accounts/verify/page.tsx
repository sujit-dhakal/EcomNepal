"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const page = () => {
  const router = useRouter();
  const locale = useLocale();
  useEffect(() => {
    setTimeout(() => {
      router.push(`/${locale}/accounts/login`);
    }, 5000);
  }, []);
  return (
    <div>
      <p>Email Verified.</p>
      <p>Redirecting</p>
      <p>Wait few seconds.</p>
    </div>
  );
};

export default page;
