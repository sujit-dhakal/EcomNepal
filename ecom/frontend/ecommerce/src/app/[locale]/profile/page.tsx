"use client";
import { useAppDispatch } from "@/lib/hooks";
import { userProfile, RootState } from "@/lib/store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const page = () => {
  const dispatch = useAppDispatch();
  const profile = useSelector((state: RootState) => state.user.user);
  const [onSave, setOnSave] = useState<boolean>(false);
  useEffect(() => {
    const data = dispatch(userProfile());
    console.log(data);
  }, [dispatch]);
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
    <>
      <div className="text-center mt-[50px]">
        <h1 className="text-3xl">
          Welcome
          <span className="text-red-900 font-bold ml-1">
            {profile.first_name}!
          </span>
        </h1>
      </div>
      <div className="h-[calc(100vh-265px)] w-[90%] md:w-[400px] m-auto mt-[25px]">
        <div className="w-full">
          <h1 className="text-2xl text-red-700">Edit Your Profile</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-3">
              <div className="px-2 font-semibold">Username</div>
              <input
                type="text"
                placeholder={profile.username}
                value={profile.username}
                className="w-full py-1 px-2 border-2 border-black rounded-[20px]"
                disabled
              />
            </div>
            <div className="mt-6">
              <div className="px-2 font-semibold">First Name</div>
              <input
                type="text"
                name="first_name"
                placeholder={profile.first_name}
                value={formik.values.first_name}
                onChange={formik.handleChange}
                className="w-full py-1 px-2 border-2 border-black rounded-[20px]"
              />
            </div>
            <div className="mt-6">
              <div className="px-2 font-semibold">Last Name</div>
              <input
                type="text"
                name="last_name"
                placeholder={profile.last_name}
                value={formik.values.last_name}
                onChange={formik.handleChange}
                className="w-full py-1 px-2 border-2 border-black rounded-[20px]"
              />
            </div>
            <div className="mt-6">
              <div className="px-2 font-semibold">Email</div>
              <input
                type="email"
                name="email"
                placeholder={profile.email}
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full py-1 px-2 border-2 border-black rounded-[20px]"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-black py-2 w-full text-white rounded-[20px]"
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
        </div>
      </div>
    </>
  );
};

export default page;
