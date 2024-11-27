"use client";
import React, { useState } from 'react';
import { useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import axios from "axios";

const PersonalInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useSelector((state: RootState) => state.user.user);
  const [onSave, setOnSave] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      email: profile.email || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/users/${profile.user_id}/`,
          values
        );
        setOnSave(true);
        setTimeout(() => {
          setOnSave(false);
        }, 3000);
        console.log(response);
      } catch (error) {
        console.log(error);
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
            className="bg-black py-3 w-full sm:w-1/2 md:w-[300px] text-white rounded-[10px]"
          >
            Save Changes
          </button>
          {onSave && (
            <div className="text-green-900 text-center mt-6">
              Changes made successfully.
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

export default PersonalInfo;
