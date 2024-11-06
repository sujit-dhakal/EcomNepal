"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { registrationSchema } from "../../validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { checkEmail, registerUser, checkUserName } from "@/lib/store";
import { useTranslations, useLocale } from "next-intl";

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
  const dispatch = useAppDispatch();
  const formik = useFormik<RegistrationFormValues>({
    initialValues,
    validationSchema: toFormikValidationSchema(registrationSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        const checkEmailReponse = await dispatch(checkEmail(values.email));
        console.log(checkEmailReponse);
        if (checkEmailReponse.payload.data.status == 400) {
          setEmailAlreadyExist(true);
          return;
        }
        const checkUserNameResponse = await dispatch(
          checkUserName(values.username)
        );
        console.log(checkUserNameResponse);
        if (checkUserNameResponse.payload.data.status == 400) {
          setUserNameAlreadyExist(true);
          return;
        }
        const response: any = dispatch(registerUser(values));
        setIsRegistered(true);
        console.log(response);
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
    <div className="h-[calc(100vh-265px)] w-[90%] md:w-[700px] text-center m-auto mt-[25px]">
      {/* side image */}
      {/* signup form */}
      <div className="w-full">
        <form onSubmit={formik.handleSubmit}>
          <div className="">
            <h1 className="text-3xl">{t("heading")}</h1>
            <h2>{t("subheading")}</h2>
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
            {emailAlreadyExist ? (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                Email already exists..
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {/* firstname */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("first_name")}
              type="text"
              placeholder="firstname"
              className="w-full py-1 px-2 border-2 border-black rounded-[20px] md:w-[50%]"
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.first_name}
              </div>
            )}
          </div>
          {/* lastname */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("last_name")}
              type="text"
              placeholder="last_name"
              className="w-full py-1 px-2 border-2 border-black rounded-[20px] md:w-[50%]"
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.last_name}
              </div>
            )}
          </div>
          {/* username */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("username")}
              type="text"
              placeholder="username"
              className="w-full py-1 px-2 border-2 border-black rounded-[20px] md:w-[50%]"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.username}
              </div>
            )}
            {userNameAlreadyExist ? (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                UserNameAlreadyExists.
              </div>
            ) : (
              <div></div>
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
          {/* confirm password */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("confirm_password")}
              type="password"
              placeholder="confirm password"
              className="w-full py-1 px-2 border-2 border-black rounded-[20px] md:w-[50%]"
            />
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                  {formik.errors.confirm_password}
                </div>
              )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-black py-2 w-full text-white rounded-[20px] md:w-[50%]"
            >
              {t("SignUp")}
            </button>
          </div>
        </form>
        <div className="mt-6">
          {t("alreadyHaveAnAccount")}
          <Link href={`/${locale}/accounts/login`}>
            <span className="text-blue-700">{t("login")}</span>
          </Link>
        </div>
        {isRegistered ? (
          <div className="text-green-800">
            Check your mail to verify the account.
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default page;
