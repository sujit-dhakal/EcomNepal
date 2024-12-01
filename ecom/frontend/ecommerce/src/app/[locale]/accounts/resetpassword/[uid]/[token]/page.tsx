"use client";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/app/[locale]/validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAppDispatch } from "@/lib/hooks";
import { resetPassword } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { useLocale } from "next-intl";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ResetPasswordFormValues {
  password: string;
  confirm_password: string;
}

const initialValues: ResetPasswordFormValues = {
  password: "",
  confirm_password: "",
}

const PasswordReset: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { uid, token } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik<ResetPasswordFormValues>({
    initialValues,
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response: any = dispatch(resetPassword({ uid, token, newPassword: values.password, newPasswordConfirm: values.confirm_password }));
        setSuccessMessage("Password has been reset successfully!");
        setErrorMessage("");
        setTimeout(() => router.push(`/${locale}/accounts/login`), 2000);
      } catch (error: any) {
        console.log(error.response.data);
        setErrorMessage("Error resetting password. Please try again.");
        setSuccessMessage("");
      }
      resetForm();
    },
  });

  return (
    <div className="flex items-center justify-center mt-[100px]">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-700">Reset Password</h1>
        <p className="text-sm text-center text-gray-500 mt-2">
          Enter your new password below to reset it.
        </p>
        <form onSubmit={formik.handleSubmit} className="mt-6">
          {/* New Password Input */}
          <div className="mb-4 relative">
            <input
              {...formik.getFieldProps("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-2 py-1 mt-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Enter new password"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[25px] transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.password}
              </div>
            )}
          </div>
          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <input
              {...formik.getFieldProps("confirm_password")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full px-2 py-1 mt-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Confirm new password"
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[25px] transform -translate-y-1/2 cursor-pointer"
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
              className="w-full px-4 py-2 text-white bg-black rounded-[20px] hover:bg-opacity-70 focus:outline-none"
            >
              Reset Password
            </button>
          </div>
        </form>
        {/* Success/Error Messages */}
        <div className="mt-4 text-center">
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
