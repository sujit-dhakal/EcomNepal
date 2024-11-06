"use client";
import { useAppDispatch } from "@/lib/hooks";
import { userProfile, RootState } from "@/lib/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const page = () => {
  const dispatch = useAppDispatch();
  const profile = useSelector((state: RootState) => state.user.user);
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
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="h-[calc(100vh-265px)] w-[90%] md:w-[700px] text-center m-auto mt-[25px]">
      <form onSubmit={formik.handleSubmit}>
        <h1>
          <span>UserName: </span>
          {profile.username}
        </h1>
        <input
          type="text"
          name="first_name"
          placeholder={profile.first_name}
          value={formik.values.first_name}
          onChange={formik.handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder={profile.last_name}
          value={formik.values.last_name}
          onChange={formik.handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder={profile.email}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default page;
