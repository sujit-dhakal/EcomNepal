"use client";
import React from "react";
import Button from "@/components/Button";
import { useAppDispatch } from "@/lib/hooks";
import { addComment, getAverageRating } from "@/lib/store";
import { useFormik } from "formik";
import { commentSchema } from "@/app/[locale]/validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";

type ReviewFormProps = {
  productId: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
    },
    validationSchema: toFormikValidationSchema(commentSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(
          addComment({
            content: values.comment,
            rating: values.rating,
            product_id: productId,
          })
        );
        await dispatch(getAverageRating(productId));
        resetForm();
        console.log("Comment submitted successfully");
      } catch (error) {
        console.error("Failed to submit comment:", error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={formik.handleSubmit}
        className="w-[500px] mx-auto bg-white shadow-lg rounded-lg px-6 py-10 space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-700">Leave a Review</h2>

        {/* Comment Field */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-600">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your comment"
            rows={4}
          />
          {formik.touched.comment && formik.errors.comment && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.comment}</div>
          )}
        </div>

        {/* Rating Field */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-600">
            Rating
          </label>
          <div className="flex space-x-2 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star}>
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={formik.values.rating === star}
                  onChange={() => formik.setFieldValue("rating", star)}
                  className="hidden"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                />
                <span
                  className={`cursor-pointer text-2xl ${formik.values.rating >= star ? "text-yellow-400" : "text-gray-400"}`}
                >
                  ★
                </span>
              </label>
            ))}
          </div>
          {formik.touched.rating && formik.errors.rating && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.rating}</div>
          )}
        </div>

        {/* Submit Button */}
        <Button text="Submit Review" className="w-full !h-11 !text-base" disabled={formik.isSubmitting} />
      </form>
    </div>
  );
}

export default ReviewForm;
