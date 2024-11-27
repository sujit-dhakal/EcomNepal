"use client";
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getUserComments, RootState } from '@/lib/store';
import Link from "next/link";
import { useLocale } from "next-intl";

const Reviews: React.FC = () => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const { comments, isLoading, isError } = useAppSelector((state: RootState) => state.product.commentState);

  useEffect(() => {
    dispatch(getUserComments());
  }, [dispatch]);

  if (isLoading) {
    return <p className="p-6">Loading reviews...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load reviews. Please try again later.</p>;
  }

  const commentList = Array.isArray(comments) ? comments : [];

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {commentList.length > 0 ? (
        <ul className="space-y-4">
          {commentList.map(comment => (
            <li
              key={comment.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <p className="text-xl font-semibold">
                <Link href={`/${locale}/product/${comment.product_id}`}>
                  {comment.product}
                </Link>
              </p>
              <p>{Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`text-lg ${index < Math.round(comment.rating) ? "text-yellow-500" : "text-gray-300"
                    }`}
                >
                  ★
                </span>
              ))}</p>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-lg text-center text-red-600 pt-[80px]">No Review Found.</h2>
      )}
    </section>
  );
};

export default Reviews;
