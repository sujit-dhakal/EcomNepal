import Navbar from "@/components/Navbar";
import Top from "@/components/Top";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Footer from "@/components/Footer";
import Loading from "./loading";
export const metadata = {
  title: "EcomNepal",
  description: "A ecommerce website.",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <body className="h-full flex flex-col">
        <Loading />
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <Top />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
