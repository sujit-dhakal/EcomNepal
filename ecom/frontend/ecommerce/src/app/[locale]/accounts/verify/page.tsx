"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const Page = () => {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    setTimeout(() => {
      router.push(`/${locale}/accounts/login`);
    }, 5000);
  }, []);

  return (

      
    <div className="h-full p-[100px] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">
          Email Verified Successfully
        </h1>
        <p className="text-lg text-green-600 mb-2">
          Redirecting you to your account...
        </p>
        <p className="text-md text-gray-600 mb-6">
          Please wait a few seconds while we take you to the next step.
        </p>
        <div className="animate-pulse text-3xl text-green-600">
          ⏳
        </div>
        {/* Uncomment when ready to redirect */}
        
        <p className="mt-6 text-sm text-gray-500">
          If you are not redirected, click <a href={`/${locale}/accounts/login`} className="text-green-600 hover:text-green-500">here</a>.
        </p>
       
      </div>
    </div>
  );
};

export default Page;
