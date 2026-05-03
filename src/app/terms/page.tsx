import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Veroliq",
  description: "Terms governing your use of the Veroliq platform and widget.",
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

export default function TermsPage() {
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
          Terms of Service
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

        <Section title="Agreement">
          <P>
            By creating an account or using the Veroliq platform (including the dashboard at
            app.veroliq.com and the embeddable chat widget), you agree to these Terms of Service.
            If you do not agree, do not use the service.
          </P>
          <P>
            &ldquo;Veroliq&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to the Veroliq platform and its operators.
            &ldquo;You&rdquo; refers to the person or entity that has created an account (&ldquo;Customer&rdquo;) or is
            accessing a Veroliq-powered widget as a website visitor.
          </P>
        </Section>

        <Section title="Beta service">
          <P>
            Veroliq is currently in public beta. This means:
          </P>
          <UL>
            <LI>Features may change, be added, or be removed without notice.</LI>
            <LI>We do not guarantee any specific level of uptime or availability.</LI>
            <LI>Data may be migrated or restructured as the platform evolves. We will give reasonable notice of any changes that affect data access.</LI>
            <LI>The free tier is provided as-is. Paid tiers, when introduced, will be governed by additional terms.</LI>
          </UL>
        </Section>

        <Section title="Acceptable use">
          <P>You may use Veroliq only for lawful purposes and in accordance with these Terms. You must not:</P>
          <UL>
            <LI>Use the widget or API to generate automated or scripted chat sessions</LI>
            <LI>Attempt to scrape, crawl, or extract data from the Veroliq API or dashboard at a rate that places unreasonable load on our systems</LI>
            <LI>Launch denial-of-service attacks or attempts to degrade the availability of the service</LI>
            <LI>Attempt to bypass rate limits, IP restrictions, or authentication controls</LI>
            <LI>Use the service to send spam, phishing content, or other harmful material through the widget</LI>
            <LI>Embed the widget on websites that violate applicable law, or that promote illegal activity, hate speech, or harassment</LI>
            <LI>Reverse-engineer, decompile, or attempt to extract source code from the Veroliq widget or API</LI>
          </UL>
        </Section>

        <Section title="Rate limits and automated enforcement">
          <P>
            To maintain fair access for all customers, the following limits apply to widget interactions:
          </P>
          <UL>
            <LI><strong>Session creation:</strong> a maximum of 20 new chat sessions per hour per IP address.</LI>
            <LI><strong>Event reporting:</strong> a maximum of 300 widget events per minute per IP address.</LI>
          </UL>
          <P>
            IP addresses that exceed these limits may be automatically and temporarily blocked from
            accessing the widget API for up to 7 days without prior notice. Sustained or
            deliberate abuse may result in a permanent block.
          </P>
          <P>
            We reserve the right to adjust rate limits at any time. Customers whose legitimate
            traffic is affected by automated blocks may contact us to request a review.
          </P>
        </Section>

        <Section title="Account responsibilities">
          <P>You are responsible for:</P>
          <UL>
            <LI>Keeping your account credentials secure and not sharing them with unauthorised parties</LI>
            <LI>All activity that occurs under your account</LI>
            <LI>Ensuring that your use of the widget on your website complies with applicable privacy laws, including providing a privacy notice to your website visitors that discloses the use of the Veroliq chat widget</LI>
            <LI>Obtaining any consent required by law from your website visitors before processing their data through the widget</LI>
          </UL>
        </Section>

        <Section title="Data and privacy">
          <P>
            Your use of the service is also governed by our{" "}
            <Link href="/privacy" style={{ color: "var(--color-brand-600, #1d4ed8)" }}>
              Privacy Policy
            </Link>
            , which is incorporated into these Terms by reference. As a Customer, you act as the
            data controller for data collected from your website visitors through the widget.
            Veroliq acts as a data processor on your behalf.
          </P>
        </Section>

        <Section title="Intellectual property">
          <P>
            Veroliq and its licensors own all intellectual property rights in the platform,
            including the widget script, dashboard, and any AI-generated content produced by
            Veroliq&rsquo;s own systems.
          </P>
          <P>
            You retain ownership of the content you provide (such as your site&rsquo;s knowledge base,
            FAQs, and configuration). By providing this content you grant Veroliq a licence to
            use it solely to operate the service for you.
          </P>
        </Section>

        <Section title="Disclaimer of warranties">
          <P>
            The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind,
            express or implied, including but not limited to warranties of merchantability, fitness
            for a particular purpose, or non-infringement. We do not warrant that the service will
            be uninterrupted, error-free, or that AI-generated responses will be accurate or
            complete.
          </P>
        </Section>

        <Section title="Limitation of liability">
          <P>
            To the fullest extent permitted by applicable law, Veroliq and its operators shall not
            be liable for any indirect, incidental, special, consequential, or punitive damages,
            including loss of profits, data, or goodwill, arising out of or in connection with
            your use of the service, even if advised of the possibility of such damages.
          </P>
          <P>
            Our total liability for any claim arising out of these Terms or the service shall not
            exceed the amount you paid to us in the 12 months preceding the claim, or £100,
            whichever is greater.
          </P>
        </Section>

        <Section title="Termination">
          <P>
            You may terminate your account at any time by contacting us. We may suspend or
            terminate your access if you breach these Terms, if your account is used for abuse,
            or if we discontinue the service (with reasonable notice where possible).
          </P>
          <P>
            On termination, your data will be retained for up to 90 days before deletion, unless
            you request earlier deletion.
          </P>
        </Section>

        <Section title="Governing law">
          <P>
            These Terms are governed by the laws of England and Wales. Any disputes arising under
            these Terms shall be subject to the exclusive jurisdiction of the courts of England
            and Wales.
          </P>
          <P>
            <em>Note: confirm jurisdiction with legal counsel before final publication.</em>
          </P>
        </Section>

        <Section title="Changes to these terms">
          <P>
            We may update these Terms from time to time. When we make material changes, we will
            update the &ldquo;Last updated&rdquo; date above. Continued use of the service after changes
            are posted constitutes acceptance of the updated Terms.
          </P>
        </Section>

        <Section title="Contact">
          <P>
            Questions about these Terms? Contact us at{" "}
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
