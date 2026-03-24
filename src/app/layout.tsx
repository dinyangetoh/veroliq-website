import { Providers } from "@/components/Providers";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veroliq",
  description:
    "Veroliq — AI-powered site chat and lead capture. Your assistant is Vera AI.",
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
      {/* <Script src="https://cdn.jsdelivr.net/npm/veraliq-sdk@latest/dist/veraliq.min.js" /> */}

      <Script
        src="https://widget.veroliq.com/widget.js"
        data-site-id="cmn0e7ow10000xxugmvtd7s64"
        data-api-base-url="http://localhost:3001/api"
        async
        defer
      />
    </html>
  );
}
