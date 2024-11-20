"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { useLocale } from "next-intl";
import { UserApi } from "@/api/userAPI/userApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordReset: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const { locale: currentlocale, uid, token } = useParams();
  const userApi = new UserApi();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }
    try {
      const data = {
        new_password: password,
        new_password_confirm: confirmPassword
      };
      const response = await userApi.resetPassword(uid, token, data);
      setSuccessMessage("Password has been reset successfully!");
      setErrorMessage("");
      setTimeout(() => router.push(`/${locale}/accounts/login`), 3000);
    } catch (error) {
      setErrorMessage("Error resetting password. Please try again.");
      setSuccessMessage("");
      console.error("Error resetting password:", error);
    }
  }

  return (
    <div className="flex items-center justify-center mt-[100px]">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-700">Reset Password</h1>
        <p className="text-sm text-center text-gray-500 mt-2">
          Enter your new password below to reset it.
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* New Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-1 mt-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Enter new password"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[25px] transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-2 py-1 mt-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Confirm new password"
              required
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[25px] transform -translate-y-1/2 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
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
