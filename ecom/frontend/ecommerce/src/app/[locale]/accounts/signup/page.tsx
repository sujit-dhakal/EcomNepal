"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { registrationSchema } from "../../validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { checkEmail, registerUser, checkUserName } from "@/lib/store";
import { useTranslations, useLocale } from "next-intl";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface RegistrationFormValues {
  user_id: "";
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirm_password: string;
}

const initialValues: RegistrationFormValues = {
  user_id: "",
  email: "",
  first_name: "",
  last_name: "",
  username: "",
  password: "",
  confirm_password: "",
};

const page = () => {
  const t = useTranslations("SignUp");
  const locale = useLocale();
  const [userNameAlreadyExist, setUserNameAlreadyExist] =
    useState<boolean>(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const formik = useFormik<RegistrationFormValues>({
    initialValues,
    validationSchema: toFormikValidationSchema(registrationSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        const checkEmailReponse = await dispatch(checkEmail(values.email));
        if (checkEmailReponse.payload.data.status == 400) {
          setEmailAlreadyExist(true);
          return;
        }
        const checkUserNameResponse = await dispatch(
          checkUserName(values.username)
        );
        if (checkUserNameResponse.payload.data.status == 400) {
          setUserNameAlreadyExist(true);
          return;
        }
        const response: any = dispatch(registerUser(values));
        setIsRegistered(true);
      } catch (error: any) {
        console.log(error.response.data);
      }
      resetForm();
      setTimeout(() => {
        setIsRegistered(false);
        setUserNameAlreadyExist(false);
        setEmailAlreadyExist(false);
      }, 5000);
    },
  });

  return (
    <div className="h-[calc(75vh-265px)] w-[90%] md:w-[370px] text-center m-auto mt-[25px]">
      <div className="w-full">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <h1 className="text-3xl">{t("heading")}</h1>
            <h2>{t("subheading")}</h2>
          </div>

          {/* Email */}
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
            {emailAlreadyExist && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                Email already exists..
              </div>
            )}
          </div>

          {/* First Name */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("first_name")}
              type="text"
              placeholder="firstname"
              className="w-full py-1 px-2 ring-2 ring-black focus:ring-transparent rounded-[20px]"
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.first_name}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("last_name")}
              type="text"
              placeholder="last_name"
              className="w-full py-1 px-2 ring-2 ring-black focus:ring-transparent rounded-[20px]"
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.last_name}
              </div>
            )}
          </div>

          {/* Username */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("username")}
              type="text"
              placeholder="username"
              className="w-full py-1 px-2 ring-2 ring-black focus:ring-transparent rounded-[20px]"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.username}
              </div>
            )}
            {userNameAlreadyExist && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                UserName already exists.
              </div>
            )}
          </div>

          {/* Password */}
          <div className="mt-6 relative">
            <input
              {...formik.getFieldProps("password")}
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="w-full py-1 px-2 ring-2 ring-black focus:ring-transparent rounded-[20px]"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[15px] transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mt-6 relative">
            <input
              {...formik.getFieldProps("confirm_password")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="confirm password"
              className="w-full py-1 px-2 ring-2 ring-black focus:ring-transparent rounded-[20px]"
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[15px] transform -translate-y-1/2 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                  {formik.errors.confirm_password}
                </div>
              )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-black hover:bg-opacity-70 py-2 w-full text-white rounded-[20px]"
            >
              {t("SignUp")}
            </button>
          </div>
        </form>

        <div className="mt-6">
          {t("alreadyHaveAnAccount")}
          <Link href={`/${locale}/accounts/login`}>
            <span className="text-blue-700 hover:underline">{t("login")}</span>
          </Link>
        </div>

        {isRegistered && (
          <div className="text-green-800">
            Check your mail to verify the account.
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
