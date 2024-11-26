import Sidebar from "@/components/profile/Sidebar";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row">
      <Sidebar />
      <main className="w-rull md:w-3/4 pt-6 sm:p-6">{children}</main>
    </div>
  );
}
