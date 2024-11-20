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
      <div className="top-0 left-0 container px-2 m-auto">
        <div className="flex justify-end">
          <h1 className="text-3xl">
            Welcome
            <span className="text-red-900 font-bold ml-1">
              {profile.first_name}!
            </span>
          </h1>
        </div>
        <div className="flex justify-around mt-[50px]">
          <div>
            <ul className="">
              <li>abc</li>
              <li>abc</li>
              <li>abc</li>
              <li>abc</li>
            </ul>
          </div>
          <div className="lg:w-[750px] shadow rounded-lg">
            <div className="w-full">
              <h1 className="text-2xl text-red-700 px-10 pt-5">
                Edit Your Profile
              </h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex justify-between px-10">
                  <div className="mt-6">
                    <div className="px-2">Username</div>
                    <input
                      type="text"
                      placeholder={profile.username}
                      className="w-[300px] h-[50px] mt-1 py-1 px-2 border-2 bg-gray-200 rounded-[10px]"
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
                      className="w-[300px] h-[50px] mt-1 py-1 px-2 border-2 bg-gray-200 rounded-[10px]"
                    />
                  </div>
                </div>
                <div className="flex justify-between px-10">
                  <div className="mt-6">
                    <div className="px-2">First Name</div>
                    <input
                      type="text"
                      name="first_name"
                      placeholder={profile.first_name}
                      onChange={formik.handleChange}
                      className="w-[300px] h-[50px] mt-1 py-1 px-2 border-2 bg-gray-200 rounded-[10px]"
                    />
                  </div>
                  <div className="mt-6">
                    <div className="px-2">Last Name</div>
                    <input
                      type="text"
                      name="last_name"
                      placeholder={profile.last_name}
                      onChange={formik.handleChange}
                      className="w-[300px] h-[50px] mt-1 py-1 px-2 border-2 bg-gray-200 rounded-[10px]"
                    />
                  </div>
                </div>
                <div className="my-6 flex justify-around pb-10">
                  <button
                    type="submit"
                    className="bg-black py-2 w-[300px] text-white rounded-[10px]"
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
        </div>
      </div>
    </>
  );
};

export default page;
