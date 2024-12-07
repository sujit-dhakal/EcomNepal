"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addComment, getAverageRating, getComments } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { RootState } from "@/lib/store";

type FormValues = {
  comment: string;
  rating: number;
};

type ReviewFormProps = {
  productId: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormValues>({
    comment: "",
    rating: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "rating" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const commentData = {
      content: formData.comment,
      rating: formData.rating,
      product_id: productId,
    };
    try {
      await dispatch(addComment(commentData));
      await dispatch(getAverageRating(productId));
      setFormData({ comment: "", rating: 0 });
      console.log("Comment submitted successfully");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
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
            value={formData.comment}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your comment"
            rows={4}
            required
          />
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
                  checked={formData.rating === star}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <span
                  className={`cursor-pointer text-2xl ${formData.rating >= star ? "text-yellow-400" : "text-gray-400"}`}
                >
                  ★
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button text="Submit Review" className="w-full !h-11 !text-base" />
      </form>
    </div>
  );
}

export default ReviewForm;
