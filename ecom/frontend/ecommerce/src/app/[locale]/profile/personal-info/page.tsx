"use client";
import React, { useState } from 'react';
import { RootState } from "@/lib/store";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import axios from "axios";

const PersonalInfo: React.FC = () => {
  const profile = useSelector((state: RootState) => state.user.user);
  const [onSaveMessage, setOnSaveMessage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      email: profile.email || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!formik.dirty) {
        setOnSaveMessage("No changes to save.");
        setTimeout(() => setOnSaveMessage(null), 3000);
        return;
      }
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/users/${profile.user_id}/`,
          values
        );
        setOnSaveMessage("Changes made successfully.");
        setTimeout(() => {
          setOnSaveMessage(null);
        }, 3000);
      } catch (error) {
        setOnSaveMessage("An error occurred while saving changes.");
      }
    },
  });

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      {/* Personal Info Form */}
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col xl:flex-row justify-between xl:gap-4 sm:px-10">
          <div className="mt-6">
            <div className="px-2">Username</div>
            <input
              type="text"
              placeholder={profile.username}
              className="w-full xl:w-[400px] h-[50px] mt-1 py-1 px-2 border-2 bg-gray-200 rounded-[10px]"
              disabled
            />
          </div>
          <div className="mt-6">
            <div className="px-2">Email</div>
            <input
              type="email"
              name="email"
              placeholder={profile.email}
              onChange={formik.handleChange}
              className="w-full xl:w-[400px] h-[50px] mt-1 py-1 px-2 border-2 bg-gray-200 rounded-[10px]"
            />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row justify-between xl:gap-4 sm:px-10">
          <div className="mt-6">
            <div className="px-2">First Name</div>
            <input
              type="text"
              name="first_name"
              placeholder={profile.first_name}
              onChange={formik.handleChange}
              className="w-full xl:w-[400px] h-[50px] mt-1 py-1 px-2 border-2 bg-gray-200 rounded-[10px]"
            />
          </div>
          <div className="mt-6">
            <div className="px-2">Last Name</div>
            <input
              type="text"
              name="last_name"
              placeholder={profile.last_name}
              onChange={formik.handleChange}
              className="w-full xl:w-[400px] h-[50px] mt-1 py-1 px-2 border-2 bg-gray-200 rounded-[10px]"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-around pt-4">
          <button
            type="submit"
            className="bg-black hover:bg-opacity-70 py-3 w-full sm:w-1/2 md:w-[300px] text-white rounded-[10px]"
          >
            Save Changes
          </button>
        </div>
        {onSaveMessage && (
          <div className="text-center mt-6">
            <p
              className={`${onSaveMessage === "Changes made successfully."
                  ? "text-green-900"
                  : "text-red-900"
                }`}
            >
              {onSaveMessage}
            </p>
          </div>
        )}
      </form>
    </section>
  );
};

export default PersonalInfo;
