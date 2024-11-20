"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { UserApi } from "@/api/userAPI/userApi";

const ForgotPassword: FC = () => {
  const locale = useLocale();
  const userApi = new UserApi();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await userApi.forgotPassword(email);
      setSuccessMessage("Password reset link sent successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error sending reset email. Please try again.");
      setSuccessMessage("");
      console.error("Error sending reset email:", error);
    }
  }

  return (
    <div className="flex items-center justify-center mt-[100px]">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Forgot Password
        </h1>
        <p className="text-sm text-center text-gray-500 mt-2">
          Enter your email address below to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-1 mt-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-black rounded-[20px] hover:bg-opacity-70 focus:outline-none"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        {/* Success/Error Messages */}
        <div className="mt-4 text-center">
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </div>
        {/* Back to Login */}
        <div className="mt-4 text-center">
          <Link
            href={`/${locale}/accounts/login`}
            className="text-base text-blue-500 hover:underline focus:outline-none"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
