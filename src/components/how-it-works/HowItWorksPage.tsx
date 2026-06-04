import Link from "next/link";
import { VeroliqLogo } from "@/components/VeroliqLogo";
import { assistantNameShort, platformName } from "@/lib/branding";
import { installGuides, setupGuideSteps, widgetScriptExample } from "@/lib/setupGuide";

const appBase = process.env.NEXT_PUBLIC_VEROLIQ_BASE_URL ?? "https://app.veroliq.com";

export function HowItWorksPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", minHeight: "100vh", background: "var(--color-bg)" }}>
      <header
        style={{
          borderBottom: "1px solid var(--color-border)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <VeroliqLogo variant="marketing" size="md" />
          </Link>
          <Link
            href={`${appBase}/auth/signup`}
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "white",
              background: "var(--color-brand-600)",
              padding: "8px 16px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Get started free
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-brand-600)" }}>
          Setup guide
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px,5vw,44px)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginTop: "8px",
            marginBottom: "12px",
          }}
        >
          How {platformName} works
        </h1>
        <p style={{ fontSize: "16px", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "40px" }}>
          Go from signup to a live AI widget in under 15 minutes. Your dashboard includes a setup checklist that tracks
          progress automatically — same steps as below.
        </p>

        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "24px" }}>
          {setupGuideSteps.map((step) => (
            <li
              key={step.number}
              id={step.number === 3 ? "index" : undefined}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                padding: "20px 22px",
                background: "white",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--color-brand-50)",
                    color: "var(--color-brand-700)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: "18px", fontWeight: 600, margin: 0, color: "var(--color-text-primary)" }}>
                    {step.title}
                  </h2>
                  <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)", margin: "2px 0 0" }}>{step.time}</p>
                </div>
              </div>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: "0 0 8px" }}>{step.summary}</p>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.55, margin: "0 0 14px" }}>
                {step.detail}
              </p>
              <Link
                href={step.cta.href}
                style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-brand-600)", textDecoration: "none" }}
              >
                {step.cta.label} →
              </Link>
            </li>
          ))}
        </ol>

        <section style={{ marginTop: "48px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "12px" }}>Install by platform</h2>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
            Choose your CMS for step-by-step install instructions.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {(Object.keys(installGuides) as Array<keyof typeof installGuides>).map((platform) => (
              <Link
                key={platform}
                href={`/how-it-works/install/${platform}`}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "1px solid var(--color-border)",
                  background: "white",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "var(--color-text-primary)",
                }}
              >
                {installGuides[platform].title}
              </Link>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: "40px",
            padding: "20px",
            borderRadius: "12px",
            background: "var(--color-slate-900)",
          }}
        >
          <p style={{ fontSize: "13px", color: "var(--color-slate-400)", marginBottom: "8px" }}>Embed snippet</p>
          <pre
            style={{
              margin: 0,
              fontSize: "12px",
              fontFamily: "ui-monospace, monospace",
              color: "#93C5FD",
              overflowX: "auto",
            }}
          >
            {widgetScriptExample}
          </pre>
          <p style={{ fontSize: "12px", color: "var(--color-slate-500)", marginTop: "10px" }}>
            Replace YOUR_SITE_ID with the id from your {platformName} dashboard. {assistantNameShort} loads from our CDN.
          </p>
        </section>
      </main>
    </div>
  );
}
