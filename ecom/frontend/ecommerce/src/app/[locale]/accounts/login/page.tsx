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

const initialValues: loginUserType = {
  email: "",
  password: "",
};

const page = () => {
  const t = useTranslations("login");
  const locale = useLocale();
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true); // for invalid email or password error
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
          router.push(`/${locale}/profile`);
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
    <div className="h-[calc(100vh-265px)] w-[90%] md:w-[700px] text-center m-auto mt-[100px]">
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
              className="w-full py-1 px-2 border-2 border-black rounded-[20px] md:w-[50%]"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.email}
              </div>
            )}
          </div>
          {/* password */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("password")}
              type="password"
              placeholder="password"
              className="w-full py-1 px-2 border-2 border-black rounded-[20px] md:w-[50%]"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-black py-2 w-full text-white rounded-[20px] md:w-[50%]"
            >
              {t("login")}
            </button>
          </div>
          <div className="mt-6">
            {t("notAUser")}
            <Link href={`/${locale}/accounts/signup`}>
              <span className="text-blue-700">{t("createAccount")}</span>
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
