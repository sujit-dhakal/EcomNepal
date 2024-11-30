"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { loginSchema } from "../../validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { actions, loginUser } from "@/lib/store";
import Cookies from "js-cookie";
import { loginUserType } from "@/types/userTypes";
import { useTranslations, useLocale } from "next-intl";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const initialValues: loginUserType = {
  email: "",
  password: "",
};

const page = () => {
  const t = useTranslations("login");
  const locale = useLocale();
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true); // for invalid email or password error
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik<loginUserType>({
    initialValues,
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response: any = await dispatch(loginUser(values));
        console.log(response);
        if (response.payload.status == 200) {
          console.log("login successful");
          dispatch(actions.login());
          Cookies.set("accessToken", response.payload.data.access);
          Cookies.set("refreshToken", response.payload.data.refresh);
          router.push(`/${locale}`);
        } else {
          console.log("login failed");
          setLoginSuccess(false);
        }
        return response;
      } catch (error: any) {
        console.log(error.response.data);
      }
    },
  });
  return (
    <div className="h-[calc(60vh-265px)] w-[90%] md:w-[370px] text-center m-auto mt-[100px]">
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="text-center">
            <h1 className="text-3xl text-bold mb-4">{t("heading")}</h1>
          </div>
          {/* email */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("email")}
              type="text"
              placeholder="email"
              className="w-full py-1 px-2 ring-2 ring-black focus:ring-transparent rounded-[20px]"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.email}
              </div>
            )}
          </div>
          {/* password */}
          <div className="mt-6 relative">
            <input
              {...formik.getFieldProps("password")}
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="w-full py-1 px-2 ring-2 ring-black focus:ring-transparent rounded-[20px]"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[8px] transform-translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="mt-6 px-3 text-sm text-left text-blue-700 hover:underline">
            <Link href={`/${locale}/accounts/forgotpassword`}>
              Forgot Password?
            </Link>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-black hover:bg-opacity-70 py-2 w-full text-white rounded-[20px]"
            >
              {t("login")}
            </button>
          </div>
          <div className="mt-6">
            {t("notAUser")}
            <Link href={`/${locale}/accounts/signup`}>
              <span className="text-blue-700 hover:underline">
                {t("createAccount")}
              </span>
            </Link>
          </div>
          <div>
            {!loginSuccess && (
              <div className="text-red-900 text-sm">
                Invalid Email or Password
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
