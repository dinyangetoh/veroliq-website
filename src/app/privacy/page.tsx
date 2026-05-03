import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Veroliq",
  description: "How Veroliq collects, uses, and protects your data.",
};

const CONTACT_EMAIL = "hello@veroliq.com";
const LAST_UPDATED = "May 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--color-text-primary, #0f172a)",
          marginBottom: "12px",
          fontFamily: "var(--font-body, sans-serif)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontSize: "15px",
          color: "var(--color-text-secondary, #475569)",
          lineHeight: 1.75,
          fontFamily: "var(--font-body, sans-serif)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: "12px" }}>{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul style={{ paddingLeft: "20px", marginBottom: "12px", listStyleType: "disc" }}>
      {children}
    </ul>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return <li style={{ marginBottom: "6px" }}>{children}</li>;
}

export default function PrivacyPage() {
  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {/* Nav back */}
      <div
        style={{
          borderBottom: "1px solid var(--color-border, #e2e8f0)",
          padding: "16px 24px",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Link
            href="/"
            style={{
              fontSize: "13px",
              color: "var(--color-text-tertiary, #94a3b8)",
              textDecoration: "none",
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            ← veroliq.com
          </Link>
        </div>
      </div>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "60px 24px 80px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "var(--color-text-primary, #0f172a)",
            marginBottom: "8px",
            fontFamily: "var(--font-body, sans-serif)",
          }}
        >
          Privacy Policy
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-text-tertiary, #94a3b8)",
            marginBottom: "48px",
            fontFamily: "var(--font-mono, monospace)",
          }}
        >
          Last updated: {LAST_UPDATED}
        </p>

        <Section title="Overview">
          <P>
            Veroliq (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates an AI-powered chat widget that businesses
            embed on their websites. This policy explains what data we collect, why we collect it,
            how long we keep it, and your rights over it. It applies to:
          </P>
          <UL>
            <LI><strong>Dashboard users</strong> — founders and teams who sign up at app.veroliq.com to manage their sites.</LI>
            <LI><strong>Website visitors</strong> — people who interact with a Veroliq-powered chat widget embedded on a customer&rsquo;s website.</LI>
          </UL>
        </Section>

        <Section title="Data we collect">
          <P><strong>Dashboard users (account data)</strong></P>
          <UL>
            <LI>Email address and name (provided at signup)</LI>
            <LI>Hashed password (never stored in plain text)</LI>
            <LI>Account settings and plan information</LI>
            <LI>Usage statistics (number of chat sessions, leads captured)</LI>
          </UL>
          <P><strong>Website visitors (widget data)</strong></P>
          <UL>
            <LI>Chat messages exchanged with the AI assistant</LI>
            <LI>Page URL and referrer URL at the time of the chat</LI>
            <LI>IP address (see &ldquo;IP Addresses&rdquo; section below)</LI>
            <LI>Browser user agent string</LI>
            <LI>Browser locale and timezone</LI>
            <LI>Pages visited during the session (for page-aware responses)</LI>
            <LI>Lead contact information, if voluntarily submitted via the widget (name, email, phone)</LI>
          </UL>
          <P>We do not collect payment card details (handled by our payment processor), passwords from website visitors, or any data through cookies placed on visitor browsers.</P>
        </Section>

        <Section title="IP addresses">
          <P>
            We store the raw IP address of website visitors on each chat session record. We also
            maintain rate-limiting and block records keyed by IP address.
          </P>
          <P><strong>Why we store raw IPs (not hashed):</strong> Veroliq uses IP addresses for security and abuse
            prevention. This includes correlating sessions from the same source, detecting unusual
            traffic patterns, applying rate limits, and investigating abuse reports. Hashed IPs
            cannot be looked up across tables, which would make these security functions
            impossible.
          </P>
          <P><strong>Legal basis:</strong> Legitimate interest in security, fraud prevention, and service
            integrity under GDPR Article 6(1)(f).
          </P>
          <P><strong>Automated blocking:</strong> If a single IP address creates more than 20 chat sessions per
            hour, or exceeds other usage thresholds, it may be automatically and temporarily
            blocked for up to 7 days without manual review. This is a proportionate measure to
            prevent abuse and protect service availability for other users.
          </P>
          <P><strong>Manual blocking:</strong> Administrators may permanently block IP addresses that repeatedly
            violate our Terms of Service.
          </P>
        </Section>

        <Section title="AI processing">
          <P>
            Chat messages are processed by third-party AI providers (including OpenAI and/or
            Anthropic) to generate responses. Messages are transmitted to these providers&rsquo; APIs
            over encrypted connections. We configure these integrations to minimise data retention
            by the AI provider where possible. Please review OpenAI&rsquo;s and Anthropic&rsquo;s privacy
            policies for their data handling practices.
          </P>
          <P>
            Customers may optionally provide their own AI API keys (BYOK — Bring Your Own Key),
            in which case their chat data is sent directly to their own API account and subject to
            their own agreement with the AI provider.
          </P>
        </Section>

        <Section title="How we use data">
          <UL>
            <LI>To operate and deliver the chat widget service</LI>
            <LI>To capture and display leads to the website owner&rsquo;s dashboard</LI>
            <LI>To detect and prevent abuse and fraudulent activity</LI>
            <LI>To improve the quality of AI responses (aggregated, not linked to identifiable individuals)</LI>
            <LI>To send transactional emails (e.g. password reset, lead notifications) to dashboard users</LI>
            <LI>To calculate usage statistics for plan enforcement</LI>
          </UL>
          <P>We do not sell personal data. We do not use visitor chat data for advertising.</P>
        </Section>

        <Section title="Data retention">
          <UL>
            <LI><strong>Chat session records and messages:</strong> retained for the duration of the customer&rsquo;s active subscription, then deleted within 90 days of account closure.</LI>
            <LI><strong>Session IP addresses:</strong> retained for up to 1 year from the session date.</LI>
            <LI><strong>Rate-limit counters:</strong> retained for 90 days.</LI>
            <LI><strong>Active IP blocks:</strong> retained for the duration of the block (7-day auto-blocks expire automatically; permanent blocks remain until lifted by an administrator).</LI>
            <LI><strong>Lead contact information:</strong> retained until the customer deletes it from their dashboard, or their account is closed.</LI>
            <LI><strong>Dashboard account data:</strong> retained for the duration of the account, then deleted within 90 days of account closure.</LI>
          </UL>
        </Section>

        <Section title="Data sharing">
          <P>We share data only with the following categories of third parties:</P>
          <UL>
            <LI><strong>AI providers</strong> (OpenAI, Anthropic) — to process chat messages and generate responses.</LI>
            <LI><strong>Cloud infrastructure providers</strong> — to host the application and database.</LI>
            <LI><strong>Email service provider</strong> — to send transactional emails to dashboard users.</LI>
            <LI><strong>Payment processor</strong> — to handle subscription billing (they collect card data directly; we do not receive it).</LI>
          </UL>
          <P>We do not share data with advertisers, data brokers, or analytics platforms.</P>
        </Section>

        <Section title="Your rights">
          <P>
            If you are located in the European Economic Area, United Kingdom, or another jurisdiction
            with applicable data protection law, you have the right to:
          </P>
          <UL>
            <LI>Access the personal data we hold about you</LI>
            <LI>Request correction of inaccurate data</LI>
            <LI>Request deletion of your data, subject to our legitimate interest in security (we may retain IP block records where necessary)</LI>
            <LI>Object to processing based on legitimate interest</LI>
            <LI>Request a copy of your data in a portable format</LI>
          </UL>
          <P>
            To exercise any of these rights, email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--color-brand-600, #1d4ed8)" }}>
              {CONTACT_EMAIL}
            </a>
            . We will respond within 30 days.
          </P>
          <P>
            Website visitors who interacted with a Veroliq widget should contact the website owner
            in the first instance, as the website owner is the data controller for visitor data
            collected on their site. Veroliq acts as a data processor on their behalf.
          </P>
        </Section>

        <Section title="Cookies">
          <P>
            The Veroliq dashboard (app.veroliq.com) uses an httpOnly session cookie for
            authentication. No third-party tracking or advertising cookies are set.
          </P>
          <P>
            The Veroliq chat widget uses sessionStorage (not cookies) to persist the active chat
            session within a single browser tab. This data is not sent to any third party and is
            cleared when the tab is closed.
          </P>
        </Section>

        <Section title="Security">
          <P>
            We use industry-standard measures to protect data in transit (TLS) and at rest
            (encrypted database volumes). Access to production data is restricted to authorised
            personnel. We conduct periodic security reviews.
          </P>
          <P>
            Veroliq is currently in public beta. While we take security seriously, we recommend
            that you do not submit sensitive personal information (such as financial details or
            passwords) through the chat widget.
          </P>
        </Section>

        <Section title="Changes to this policy">
          <P>
            We may update this policy from time to time. When we make material changes, we will
            update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the service
            after changes are posted constitutes acceptance of the updated policy.
          </P>
        </Section>

        <Section title="Contact">
          <P>
            For privacy-related questions or requests, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--color-brand-600, #1d4ed8)" }}>
              {CONTACT_EMAIL}
            </a>
            .
          </P>
        </Section>
      </main>
    </div>
  );
}
