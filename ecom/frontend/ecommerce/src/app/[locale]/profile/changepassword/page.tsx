"use client";
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from "@/lib/hooks";
import { changePassword, RootState } from '@/lib/store'; 
import { useRouter } from 'next/navigation';
import { useLocale } from "next-intl";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [showNewPassword, setShowNewPassword] = useState(false); 
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      setError("New passwords don't match.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await dispatch(changePassword({
        oldPassword,
        newPassword,
        newPasswordConfirm,
      }));
      if (response?.error) {
        setError(response.error.message);
      } else {
        router.push(`/${locale}/profile`); 
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center xl:justify-start xl:ml-[200px]">
      <div className="w-full max-w-md pt-8 sm:p-8">
        <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Enter old password"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[20px] transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="mb-6 relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Enter new password"
            />
            <div
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-[20px] transform -translate-y-1/2 cursor-pointer"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="mb-6 relative">
            <input
              type={showNewConfirmPassword ? "text" : "password"}
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 text-gray-700 border rounded-[20px] focus:outline-none ring-2 focus:ring-2 ring-black focus:ring-green-500"
              placeholder="Enter new confirm password"
            />
            <div
              onClick={() => setShowNewConfirmPassword(!showNewConfirmPassword)}
              className="absolute right-3 top-[20px] transform -translate-y-1/2 cursor-pointer"
            >
              {showNewConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
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
