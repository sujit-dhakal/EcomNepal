"use client";
import React, { useState } from "react";
import Button from "@/components/Button";

type FormValues = {
  comment: string;
  rating: number;
};

const ReviewForm: React.FC = () => {
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
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] mx-auto shadow-md rounded-lg p-6 space-y-4"
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
        <Button text="Submit Review" className="w-full h-11" />
      </form>
    </div>
  );
}

export default ReviewForm;
