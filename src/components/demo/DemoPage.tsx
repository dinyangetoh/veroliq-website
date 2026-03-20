"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VeroliqLogo } from "@/components/VeroliqLogo";
import { platformName } from "@/lib/branding";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-bg-secondary, #f8fafc)" }}>
      <header
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ borderColor: "var(--color-border)", background: "white" }}
      >
        <VeroliqLogo variant="marketing" size="sm" />
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </header>
      <main className="flex-1 max-w-2xl mx-auto px-6 py-16 text-center">
        <h1
          className="mb-4"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,40px)", fontWeight: 700 }}
        >
          Live demo
        </h1>
        <p style={{ fontSize: "16px", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          Interactive product demo for {platformName} will appear here. For now, explore the full marketing site from the home page.
        </p>
      </main>
    </div>
  );
}
