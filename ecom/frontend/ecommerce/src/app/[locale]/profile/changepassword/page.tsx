"use client";
import React, { useState } from 'react';
import { useFormik } from "formik";
import { changePasswordSchema } from "@/app/[locale]/validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAppDispatch } from "@/lib/hooks";
import { changePassword } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useLocale } from "next-intl";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ChangePasswordFormValues {
  old_password: string;
  password: string;
  confirm_password: string;
}

const initialValues: ChangePasswordFormValues = {
  old_password: "",
  password: "",
  confirm_password: "",
}

const ChangePassword = () => {
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);

  const formik = useFormik<ChangePasswordFormValues>({
    initialValues,
    validationSchema: toFormikValidationSchema(changePasswordSchema),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const response: any = await dispatch(changePassword({ oldPassword: values.old_password, newPassword: values.password, newPasswordConfirm: values.confirm_password }));
        if (response?.error) {
          setError(response.error.message || "Something went wrong. Please try again.")
        } else {
          router.push(`/${locale}/profile`);
        }
      } catch (error: any) {
        console.log(error.response.data);
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
        resetForm();
      }
    },
  });

  return (
    <div className="flex items-center justify-center xl:justify-start xl:ml-[200px]">
      <div className="w-full max-w-md pt-8 sm:p-8">
        <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
        <form onSubmit={formik.handleSubmit} className="mt-6">
          <div className="mb-6 relative">
            <input
              {...formik.getFieldProps("old_password")}
              type={showPassword ? "text" : "password"}
              id="oldPassword"
              className="mt-2 block w-full px-4 py-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Enter old password"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[20px] transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {formik.touched.old_password && formik.errors.old_password && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.old_password}
              </div>
            )}
          </div>

          <div className="mb-6 relative">
            <input
              {...formik.getFieldProps("password")}
              type={showNewPassword ? "text" : "password"}
              id="Password"
              className="mt-2 block w-full px-4 py-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Enter new password"
            />
            <div
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-[20px] transform -translate-y-1/2 cursor-pointer"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mb-6 relative">
            <input
              {...formik.getFieldProps("confirm_password")}
              type={showNewConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="mt-2 block w-full px-4 py-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Enter new confirm password"
            />
            <div
              onClick={() => setShowNewConfirmPassword(!showNewConfirmPassword)}
              className="absolute right-3 top-[20px] transform -translate-y-1/2 cursor-pointer"
            >
              {showNewConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <div className="text-red-900 text-sm mb-[-20px] text-left pl-3">
                  {formik.errors.confirm_password}
                </div>
              )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-black text-white rounded-[20px] hover:bg-opacity-70 focus:outline-none"
          >
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
        <div className="mt-4 text-center">
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
