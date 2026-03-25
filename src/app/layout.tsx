import { Providers } from "@/components/Providers";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veroliq",
  description:
    "Veroliq — AI-powered site chat and lead capture. Your assistant is Vera AI.",
  icons: {
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>

      <Script
        src="https://widget.veroliq.com/widget.js"
        data-site-id={process.env.NEXT_PUBLIC_VEROLIQ_WIDGET_SITE_ID}
        data-api-base-url={process.env.NEXT_PUBLIC_VEROLIQ_WIDGET_API_BASE_URL}
        async
        defer
      />
    </html>
  );
}
