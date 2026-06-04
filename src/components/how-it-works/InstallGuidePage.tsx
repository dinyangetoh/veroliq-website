import Link from "next/link";
import { notFound } from "next/navigation";
import { VeroliqLogo } from "@/components/VeroliqLogo";
import { type InstallPlatform, installGuides, widgetScriptExample } from "@/lib/setupGuide";

const PLATFORMS = new Set<string>(["html", "wordpress", "webflow", "shopify"]);

export function InstallGuidePage({ platform }: { platform: string }) {
  if (!PLATFORMS.has(platform)) {
    notFound();
  }

  const guide = installGuides[platform as InstallPlatform];

  return (
    <div style={{ fontFamily: "var(--font-body)", minHeight: "100vh", background: "var(--color-bg)" }}>
      <header style={{ borderBottom: "1px solid var(--color-border)", background: "white" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <VeroliqLogo variant="marketing" size="md" />
          </Link>
          <Link href="/how-it-works" style={{ fontSize: "14px", color: "var(--color-brand-600)", textDecoration: "none" }}>
            ← Full guide
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
          Install on {guide.title}
        </h1>
        <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", marginBottom: "28px" }}>
          Paste your Veroliq script before the closing <code>&lt;/body&gt;</code> tag.
        </p>

        <pre
          style={{
            padding: "16px",
            borderRadius: "10px",
            background: "var(--color-slate-900)",
            color: "#93C5FD",
            fontSize: "12px",
            overflowX: "auto",
            marginBottom: "28px",
          }}
        >
          {widgetScriptExample}
        </pre>

        <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {guide.steps.map((step, i) => (
            <li key={i} style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
              {step}
            </li>
          ))}
        </ol>

        {guide.note && (
          <p
            style={{
              marginTop: "24px",
              fontSize: "14px",
              color: "var(--color-text-tertiary)",
              padding: "14px 16px",
              borderRadius: "8px",
              background: "var(--color-slate-50)",
            }}
          >
            {guide.note}
          </p>
        )}
      </main>
    </div>
  );
}
