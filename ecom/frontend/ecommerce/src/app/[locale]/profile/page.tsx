"use client";
import { redirect } from 'next/navigation';
import { useLocale } from "next-intl";

const ProfilePage = () => {
  const locale = useLocale();

  redirect(`/${locale}/profile/personal-info`);
};

export default ProfilePage;