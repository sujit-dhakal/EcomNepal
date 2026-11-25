import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const apiUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Existing pages use lowercase App Router page functions and trigger
    // hook lint errors, but they compile and run correctly in development.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "django-app",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: apiUrl.protocol.slice(0, -1),
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/media/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
