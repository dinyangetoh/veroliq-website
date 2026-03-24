"use client";

import { VeroliqLogo } from "@/components/VeroliqLogo";
import {
  assistantName,
  assistantNameShort,
  marketingDomain,
  platformName,
} from "@/lib/branding";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  Clock,
  Layers,
  Play,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const loginUrl = process.env.NEXT_PUBLIC_VEROLIQ_LOGIN_URL ?? "/auth/login";
const onboardingUrl =
  process.env.NEXT_PUBLIC_VEROLIQ_ONBOARDING_URL ?? "/onboarding";

/* ─── constants ─── */
const FOUNDER_IMG =
  "https://images.unsplash.com/photo-1685806129609-4c526d184db4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900";
const TEAM_IMG =
  "https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";

/* ─── Shared fade-in wrapper ─── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ─── */
function AnimatedCount({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Floating notification card (hero overlay) ─── */
function FloatingLeadCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "6%",
        left: "-32px",
        zIndex: 10,
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)",
        padding: "14px 16px",
        minWidth: "240px",
        border: "1px solid rgba(255,255,255,0.9)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="relative flex w-2 h-2">
          <span
            className="absolute inline-flex w-full h-full rounded-full opacity-75"
            style={{
              background: "var(--color-success-500)",
              animation: "veroliq-pulse 2s infinite",
            }}
          />
          <span
            className="relative inline-flex rounded-full w-2 h-2"
            style={{ background: "var(--color-success-500)" }}
          />
        </span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--color-success-700)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          New lead captured
        </span>
      </div>
      <p
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--color-text-primary)",
          marginBottom: "4px",
        }}
      >
        sarah.k@techstartup.io
      </p>
      <div className="flex items-center gap-2">
        <span
          className="px-2 py-0.5 rounded text-xs font-semibold"
          style={{ background: "#EFF6FF", color: "#1D4ED8" }}
        >
          💰 Pricing
        </span>
        <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
          just now · /pricing
        </span>
      </div>
    </motion.div>
  );
}

function FloatingStatsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "38%",
        right: "-28px",
        zIndex: 10,
        background: "var(--color-slate-900)",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        padding: "16px 18px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "var(--color-slate-500)",
          marginBottom: "4px",
        }}
      >
        LEADS THIS MONTH
      </p>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "36px",
          fontWeight: 700,
          color: "white",
          lineHeight: 1,
        }}
      >
        41
      </p>
      <div className="flex items-center gap-1.5 mt-1.5">
        <TrendingUp size={12} style={{ color: "var(--color-success-400)" }} />
        <span
          style={{
            fontSize: "12px",
            color: "var(--color-success-400)",
            fontWeight: 500,
          }}
        >
          +22% vs last month
        </span>
      </div>
    </motion.div>
  );
}

function FloatingChatCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
      style={{
        position: "absolute",
        bottom: "8%",
        left: "-16px",
        zIndex: 10,
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        padding: "12px 14px",
        width: "230px",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "var(--color-brand-600)" }}
        >
          <Bot size={11} color="white" />
        </div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--color-brand-600)",
          }}
        >
          {platformName}
        </span>
        <span
          style={{
            fontSize: "10px",
            color: "var(--color-text-tertiary)",
            marginLeft: "auto",
          }}
        >
          2s
        </span>
      </div>
      <div
        className="rounded-xl rounded-tl-sm px-2.5 py-2 mb-1.5"
        style={{
          background: "var(--color-slate-100)",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
        }}
      >
        What are your pricing plans?
      </div>
      <div
        className="rounded-xl rounded-tl-sm px-2.5 py-2"
        style={{
          background: "var(--color-brand-600)",
          fontSize: "12px",
          color: "white",
        }}
      >
        We have 3 plans from Free to $15/mo — I can walk you through which fits
        best. What's your email so I can send the details?
      </div>
    </motion.div>
  );
}

/* ─── Gradient headline text ─── */
function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #93C5FD 55%, #60A5FA 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

/* ─── Platform logos strip ─── */
const PLATFORMS = [
  "WordPress",
  "Webflow",
  "Shopify",
  "Squarespace",
  "Framer",
  "Wix",
  "Next.js",
  "HTML",
];
function PlatformStrip() {
  return (
    <div
      style={{
        background: "var(--color-slate-50)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        overflow: "hidden",
        padding: "16px 0",
      }}
    >
      <div style={{ display: "flex", gap: "0", alignItems: "center" }}>
        {/* Duplicate for infinite loop feel */}
        {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
          <span
            key={i}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--color-slate-400)",
              padding: "0 28px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              borderRight: "1px solid var(--color-border)",
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── FAQ ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "var(--color-border)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-4 gap-4">
        <p
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--color-text-primary)",
          }}
        >
          {q}
        </p>
        <ChevronDown
          size={18}
          style={{
            color: "var(--color-text-tertiary)",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 200ms",
          }}
        />
      </div>
      {open && (
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            paddingBottom: "16px",
            lineHeight: 1.7,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

/* ─── Plan card ─── */
function PlanCard({
  name,
  price,
  period = "/mo",
  desc,
  features,
  cta,
  highlight,
  badge,
}: {
  name: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  badge?: string;
}) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col relative"
      style={{
        background: highlight
          ? "var(--color-slate-900)"
          : "var(--color-surface)",
        border: highlight
          ? "2px solid var(--color-brand-400)"
          : "1px solid var(--color-border)",
        boxShadow: highlight
          ? "0 0 0 4px rgba(29,78,216,0.08), 0 24px 64px rgba(29,78,216,0.15)"
          : "none",
      }}
    >
      {badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
          style={{ background: "var(--color-brand-600)", color: "white" }}
        >
          {badge}
        </div>
      )}
      <p
        className="text-sm font-semibold mb-1"
        style={{
          color: highlight
            ? "var(--color-brand-300)"
            : "var(--color-text-secondary)",
        }}
      >
        {name}
      </p>
      <div className="flex items-baseline gap-1 mb-1.5">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "38px",
            fontWeight: 700,
            color: highlight ? "white" : "var(--color-text-primary)",
            lineHeight: 1,
          }}
        >
          {price}
        </span>
        {price !== "Free" && (
          <span
            style={{
              fontSize: "13px",
              color: highlight
                ? "var(--color-slate-400)"
                : "var(--color-text-tertiary)",
            }}
          >
            {period}
          </span>
        )}
      </div>
      <p
        style={{
          fontSize: "13px",
          color: highlight
            ? "var(--color-slate-400)"
            : "var(--color-text-secondary)",
          marginBottom: "20px",
        }}
      >
        {desc}
      </p>
      <ul className="space-y-2.5 flex-1 mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check
              size={13}
              className="mt-0.5 flex-shrink-0"
              style={{
                color: highlight
                  ? "var(--color-brand-300)"
                  : "var(--color-success-600)",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                color: highlight
                  ? "var(--color-slate-300)"
                  : "var(--color-text-secondary)",
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>
      <button
        className="w-full py-3 rounded-xl text-sm font-semibold"
        style={{
          background: highlight ? "var(--color-brand-600)" : "transparent",
          color: highlight ? "white" : "var(--color-brand-600)",
          border: highlight ? "none" : "1.5px solid var(--color-brand-300)",
          cursor: "pointer",
        }}
      >
        {cta}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function LandingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      {/* Outside overflow wrapper so position:sticky sticks to the viewport (overflow-x breaks sticky). */}
      <nav
        className="sticky top-0 z-50 w-full border-b border-white/40"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(20px) saturate(1.2)",
          WebkitBackdropFilter: "blur(20px) saturate(1.2)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.65) inset, 0 8px 24px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
          style={{ height: "60px" }}
        >
          <VeroliqLogo variant="marketing" size="lg" />
          <div className="hidden md:flex items-center gap-6">
            {[
              ["Features", "#features"],
              ["How it works", "#how-it-works"],
              ["Pricing", "#pricing"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--color-text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--color-text-secondary)")
                }
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={loginUrl}
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
            <Link
              href="/demo"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold"
              style={{
                background: "var(--color-brand-600)",
                color: "white",
                textDecoration: "none",
              }}
            >
              <Play size={12} fill="white" />
              Live demo
            </Link>
          </div>
        </div>
      </nav>

      <div
        style={{
          fontFamily: "var(--font-body)",
          background: "white",
          color: "var(--color-text-primary)",
          overflowX: "hidden",
        }}
      >
        {/* ══ HERO ══ */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #0F172A 0%, #0F172A 55%, #162035 100%)",
            paddingTop: "72px",
            paddingBottom: "0",
            minHeight: "640px",
          }}
        >
          {/* Background grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden
          />
          {/* Radial glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-20%",
              left: "-10%",
              width: "700px",
              height: "700px",
              background:
                "radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 65%)",
              borderRadius: "50%",
            }}
            aria-hidden
          />

          <div className="relative max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
              {/* ── Left: Copy ── */}
              <div className="flex-1 lg:max-w-[52%] pb-16 lg:pb-24">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Pre-headline badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7"
                    style={{
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(96,165,250,0.15)",
                    }}
                  >
                    <Sparkles
                      size={12}
                      style={{ color: "var(--color-brand-400)" }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--color-brand-300)",
                        fontWeight: 500,
                      }}
                    >
                      AI website assistant · live in 5 minutes
                    </span>
                  </div>

                  {/* Headline */}
                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(38px, 4.8vw, 60px)",
                      fontWeight: 700,
                      lineHeight: 1.06,
                      letterSpacing: "-0.025em",
                      marginBottom: "20px",
                      color: "white",
                    }}
                  >
                    Your visitors ask questions.
                    <br />
                    <GradientText>Most leave without an answer.</GradientText>
                  </h1>

                  <p
                    style={{
                      fontSize: "17px",
                      color: "var(--color-slate-400)",
                      lineHeight: 1.7,
                      marginBottom: "36px",
                      maxWidth: "520px",
                    }}
                  >
                    {platformName} reads your website and trains {assistantName}{" "}
                    to answer questions and capture lead emails — 24/7, the
                    moment a visitor shows buying intent.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <Link
                      href={onboardingUrl}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold"
                      style={{
                        background: "var(--color-brand-600)",
                        color: "white",
                        textDecoration: "none",
                        fontSize: "15px",
                        boxShadow: "0 0 32px rgba(29,78,216,0.4)",
                      }}
                    >
                      Start free — no card needed
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {[
                      "✓  Free plan forever",
                      "✓  Works on any CMS",
                      "✓  GDPR compliant",
                      "✓  No training needed",
                    ].map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "12px",
                          color: "var(--color-slate-500)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ── Right: Person + floating cards ── */}
              <div
                className="flex-1 relative self-end lg:self-auto w-full lg:max-w-[48%]"
                style={{ minHeight: "440px", paddingBottom: "0" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                  className="relative mx-auto"
                  style={{ maxWidth: "480px" }}
                >
                  {/* Person image */}
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                      boxShadow:
                        "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
                    }}
                  >
                    <Image
                      src={FOUNDER_IMG}
                      alt="Founder reviewing leads on their dashboard"
                      width={900}
                      height={420}
                      className="w-full object-cover"
                      style={{
                        height: "420px",
                        objectPosition: "top center",
                        display: "block",
                      }}
                      sizes="(max-width: 1024px) 100vw, 480px"
                    />
                    {/* Bottom gradient fade into dark background */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0) 40%, rgba(15,23,42,0.15) 100%)",
                      }}
                    />
                  </div>

                  {/* Floating card: New lead */}
                  <FloatingLeadCard />

                  {/* Floating card: Stats */}
                  <FloatingStatsCard />

                  {/* Floating card: Chat snippet */}
                  <FloatingChatCard />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom wave into white */}
          <div
            style={{
              height: "60px",
              background: "linear-gradient(to bottom, transparent, white)",
              marginTop: "-1px",
            }}
          />
        </section>

        {/* ══ PLATFORM STRIP ══ */}
        <div style={{ background: "white", paddingBottom: "8px" }}>
          <p
            className="text-center py-4"
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-tertiary)",
            }}
          >
            Works on every platform
          </p>
          <PlatformStrip />
        </div>

        {/* ══ STAT BANNER ══ */}
        <FadeIn>
          <section className="py-16" style={{ background: "white" }}>
            <div className="max-w-5xl mx-auto px-6">
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid var(--color-border)",
                  background: "var(--color-border)",
                }}
              >
                {[
                  {
                    n: 96,
                    suffix: "%",
                    label: "of visitors leave without converting",
                    sub: "The silent majority",
                  },
                  {
                    n: 5,
                    suffix: "min",
                    label: "average setup time",
                    sub: "No developer needed",
                  },
                  {
                    n: 22,
                    suffix: "%",
                    label: "average lift in leads captured",
                    sub: "Across all customers",
                  },
                  {
                    n: 5,
                    suffix: "/mo",
                    label: "Starter plan",
                    sub: "Less than a coffee",
                  },
                ].map(({ n, suffix, label, sub }) => (
                  <div
                    key={label}
                    className="py-8 px-6 text-center"
                    style={{ background: "white" }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(36px,4vw,52px)",
                        fontWeight: 700,
                        color: "var(--color-brand-700)",
                        lineHeight: 1,
                      }}
                    >
                      <AnimatedCount target={n} suffix={suffix} />
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--color-text-primary)",
                        fontWeight: 500,
                        marginTop: "6px",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--color-text-tertiary)",
                        marginTop: "3px",
                      }}
                    >
                      {sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ══ WHO IT'S FOR ══ */}
        <FadeIn>
          <section
            className="py-20"
            style={{ background: "var(--color-slate-50)" }}
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <p
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-brand-600)",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  Built for
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px,4vw,42px)",
                    fontWeight: 700,
                  }}
                >
                  The people who can't afford to miss a lead
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    icon: "🚀",
                    label: "Startup founders",
                    title: "Sell while you build",
                    desc: `You're coding, fundraising, and wearing every hat. ${assistantNameShort} handles every pricing question, demo request, and \"how does this work?\" — capturing lead emails before the visitor bounces.`,
                    tags: ["SaaS", "B2B", "Early-stage"],
                  },
                  {
                    icon: "🛍️",
                    label: "Small businesses",
                    title: "No live chat team? No problem.",
                    desc: `Visitors browse at 11pm when your team is offline. ${assistantNameShort} answers product questions, shipping queries, and booking requests — and sends you a warm lead list every morning.`,
                    tags: ["E-commerce", "Services", "Local biz"],
                  },
                  {
                    icon: "🏢",
                    label: "Digital agencies",
                    title: "AI on every client site",
                    desc: "Manage all client websites from one dashboard. Per-site analytics, individual knowledge bases, and custom widget styling. Add a new revenue line to your agency.",
                    tags: ["Multi-site", "White-label", "Reporting"],
                  },
                ].map(({ icon, label, title, desc, tags }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-6 border"
                    style={{
                      background: "white",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <div className="text-3xl mb-4">{icon}</div>
                    <p
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        color: "var(--color-brand-600)",
                        fontWeight: 600,
                        marginBottom: "6px",
                      }}
                    >
                      {label}
                    </p>
                    <h3
                      style={{
                        fontSize: "17px",
                        fontWeight: 600,
                        marginBottom: "10px",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                        marginBottom: "14px",
                      }}
                    >
                      {desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-xs"
                          style={{
                            background: "var(--color-slate-100)",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ══ FEATURES BENTO GRID ══ */}
        <section
          id="features"
          className="py-24"
          style={{ background: "white" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-14">
                <p
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-brand-600)",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  What Veroliq + Vera do
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px,4vw,42px)",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  One script tag. A lead machine that never sleeps.
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "var(--color-text-secondary)",
                    maxWidth: "520px",
                    margin: "0 auto",
                    lineHeight: 1.6,
                  }}
                >
                  No FAQ writing. No chatbot logic to design. {platformName}{" "}
                  reads everything on your website and builds the knowledge base{" "}
                  {assistantNameShort} uses automatically.
                </p>
              </div>
            </FadeIn>

            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Big card — left top */}
              <FadeIn delay={0.05} className="md:col-span-7">
                <div
                  className="rounded-2xl p-7 border h-full"
                  style={{
                    background: "var(--color-slate-900)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(29,78,216,0.2)" }}
                  >
                    <Zap
                      size={18}
                      style={{ color: "var(--color-brand-400)" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "white",
                      marginBottom: "10px",
                    }}
                  >
                    Reads your website. Answers questions instantly.
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--color-slate-400)",
                      lineHeight: 1.7,
                      marginBottom: "20px",
                    }}
                  >
                    Paste one script tag. {platformName} crawls your pricing
                    pages, FAQs, docs, and product pages — then{" "}
                    {assistantNameShort} answers visitor questions with that
                    exact content. No setup beyond the script tag.
                  </p>
                  {/* Mini crawl visual */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--color-success-500)" }}
                      />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--color-slate-400)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        Crawling example.com...
                      </span>
                    </div>
                    {[
                      "/pricing — 47 chunks",
                      "/faq — 28 chunks",
                      "/features — 22 chunks",
                      "/about — 8 chunks",
                    ].map((page, i) => (
                      <div key={i} className="flex items-center gap-2 mb-1.5">
                        <Check
                          size={11}
                          style={{
                            color: "var(--color-success-400)",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "var(--color-slate-500)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {page}
                        </span>
                      </div>
                    ))}
                    <div
                      className="mt-3 pt-3"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--color-brand-400)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        ✓ 312 knowledge chunks · ready in 4m 12s
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Tall card — right top */}
              <FadeIn delay={0.1} className="md:col-span-5">
                <div
                  className="rounded-2xl p-7 border h-full"
                  style={{ background: "#F0FDF4", borderColor: "#DCFCE7" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "var(--color-success-100)" }}
                  >
                    <Target
                      size={18}
                      style={{ color: "var(--color-success-600)" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      marginBottom: "10px",
                    }}
                  >
                    Captures lead emails in conversation
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.7,
                      marginBottom: "20px",
                    }}
                  >
                    When {assistantNameShort} detects buying intent, the email
                    is captured naturally inside the chat — no pop-up, no form.
                    Lead lands in your dashboard instantly.
                  </p>
                  {/* Mini lead list */}
                  <div className="space-y-2">
                    {[
                      {
                        email: "sarah@techcorp.io",
                        intent: "💰 Pricing",
                        score: 92,
                      },
                      {
                        email: "james@startup.com",
                        intent: "🎯 Demo",
                        score: 87,
                      },
                      {
                        email: "priya@venture.co",
                        intent: "💰 Pricing",
                        score: 79,
                      },
                    ].map((lead, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2.5 rounded-xl"
                        style={{
                          background: "white",
                          border: "1px solid var(--color-success-100)",
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{
                            background: "var(--color-success-100)",
                            color: "var(--color-success-700)",
                          }}
                        >
                          {lead.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            style={{
                              fontSize: "12px",
                              color: "var(--color-text-primary)",
                              fontWeight: 500,
                            }}
                            className="truncate"
                          >
                            {lead.email}
                          </p>
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 600,
                              color: "#15803D",
                            }}
                          >
                            {lead.intent}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--color-success-600)",
                            fontWeight: 600,
                            flexShrink: 0,
                          }}
                        >
                          {lead.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Bottom row — 3 smaller cards */}
              {[
                {
                  Icon: Clock,
                  color: "var(--color-info-600)",
                  bg: "var(--color-info-100)",
                  title: "Answers at 3am on a Sunday",
                  desc: `Time zones and bank holidays don't stop ${assistantNameShort}. Visitors get a real answer immediately — and you wake up to warm leads.`,
                },
                {
                  Icon: BarChart3,
                  color: "var(--color-veroliq-gold)",
                  bg: "var(--color-veroliq-gold-light)",
                  title: "Tells you what's working",
                  desc: "Which pages drive the most chats, which questions the AI can't answer, and exactly how many leads you captured this week.",
                },
                {
                  Icon: Layers,
                  color: "var(--color-warning-600)",
                  bg: "var(--color-warning-50)",
                  title: "One dashboard, every client site",
                  desc: "Agencies manage all client websites in one place — per-site analytics, knowledge bases, and widget configs.",
                },
              ].map(({ Icon, color, bg, title, desc }, i) => (
                <FadeIn key={title} delay={0.05 * i} className="md:col-span-4">
                  <div
                    className="rounded-2xl p-6 border h-full"
                    style={{
                      background: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: bg }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        marginBottom: "8px",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section
          id="how-it-works"
          className="py-24"
          style={{ background: "var(--color-slate-900)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-16">
                <p
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-brand-400)",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  How it works
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px,4vw,42px)",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "10px",
                  }}
                >
                  From sign-up to first lead in one afternoon
                </h2>
                <p
                  style={{ fontSize: "15px", color: "var(--color-slate-400)" }}
                >
                  No developer. No training data. No chatbot logic to design.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  icon: "⚡",
                  title: "Paste one script tag",
                  desc: "Copy the snippet and paste it before </body>. Works with WordPress, Webflow, Shopify, Squarespace, Next.js — anything with a </body> tag.",
                  color: "var(--color-brand-400)",
                },
                {
                  step: "02",
                  icon: "🧠",
                  title: "Veroliq indexes your site",
                  desc: `The crawler indexes every page — pricing, FAQs, product details, blog posts. ${assistantNameShort} is ready to answer questions within minutes, with your exact content.`,
                  color: "#A78BFA",
                },
                {
                  step: "03",
                  icon: "🎯",
                  title: "Leads come to you",
                  desc: `Visitors get instant answers. When they're ready, ${assistantNameShort} captures their email naturally. You wake up to a lead list — warm contacts, with conversation context.`,
                  color: "var(--color-success-400)",
                },
              ].map(({ step, icon, title, desc, color }, i) => (
                <FadeIn key={step} delay={i * 0.1}>
                  <div
                    className="rounded-2xl p-7 relative"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="text-3xl mb-5">{icon}</div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Step {step}
                    </span>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "white",
                        marginTop: "6px",
                        marginBottom: "10px",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--color-slate-400)",
                        lineHeight: 1.7,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SOCIAL PROOF w/ TEAM IMAGE ══ */}
        <FadeIn>
          <section className="py-24" style={{ background: "white" }}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image side */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.12)" }}
                >
                  <Image
                    src={TEAM_IMG}
                    alt={`Team using ${platformName} dashboard`}
                    width={800}
                    height={400}
                    className="w-full object-cover"
                    style={{ height: "400px" }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Overlay stats card */}
                  <div
                    className="absolute bottom-6 left-6 right-6 rounded-2xl p-4"
                    style={{
                      background: "rgba(15,23,42,0.88)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "32px",
                            fontWeight: 700,
                            color: "white",
                            lineHeight: 1,
                          }}
                        >
                          79
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "var(--color-slate-400)",
                            marginTop: "3px",
                          }}
                        >
                          leads captured this month
                        </p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "40px",
                          background: "rgba(255,255,255,0.1)",
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "32px",
                            fontWeight: 700,
                            color: "var(--color-success-400)",
                            lineHeight: 1,
                          }}
                        >
                          +22%
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "var(--color-slate-400)",
                            marginTop: "3px",
                          }}
                        >
                          vs last month
                        </p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "40px",
                          background: "rgba(255,255,255,0.1)",
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "32px",
                            fontWeight: 700,
                            color: "var(--color-brand-300)",
                            lineHeight: 1,
                          }}
                        >
                          84%
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "var(--color-slate-400)",
                            marginTop: "3px",
                          }}
                        >
                          AI answer rate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonials side */}
                <div className="space-y-4">
                  <p
                    style={{
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--color-brand-600)",
                      fontWeight: 600,
                      marginBottom: "12px",
                    }}
                  >
                    What founders say
                  </p>
                  {[
                    {
                      metric: "↑ 34% more leads · Month 1",
                      quote: `I was losing leads every night — visitors hit the pricing page at 11pm and left without a word. ${assistantNameShort} captures them now. Last month we closed 22 email signups while I was asleep.`,
                      name: "Marcus Webb",
                      role: "Founder",
                      co: "Stackwell (B2B SaaS)",
                    },
                    {
                      metric: "↑ 3 hours saved per week",
                      quote: `I was copy-pasting replies to the same 8 questions every week. ${assistantNameShort} handles them instantly — and more accurately than my tired late-night replies were.`,
                      name: "Priya Nair",
                      role: "CEO",
                      co: "Bloom Studio",
                    },
                    {
                      metric: "↑ 41% booking conversion",
                      quote: `Our clinic's booking rate jumped in the first month. ${assistantNameShort} answers service questions at the exact moment visitors are considering booking — before they leave.`,
                      name: "Tom Eriksson",
                      role: "Director",
                      co: "Coastal Wellness",
                    },
                  ].map(({ metric, quote, name, role, co }) => (
                    <div
                      key={name}
                      className="rounded-2xl p-5 border"
                      style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
                        style={{
                          background: "var(--color-success-50)",
                          color: "var(--color-success-700)",
                        }}
                      >
                        {metric}
                      </span>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.7,
                          marginBottom: "12px",
                        }}
                      >
                        "{quote}"
                      </p>
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{
                            background: "var(--color-brand-100)",
                            color: "var(--color-brand-700)",
                          }}
                        >
                          {name.charAt(0)}
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 600 }}>
                            {name}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "var(--color-text-tertiary)",
                            }}
                          >
                            {role} · {co}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ══ VS COMPARISON ══ */}
        <FadeIn>
          <section
            className="py-24"
            style={{ background: "var(--color-slate-50)" }}
          >
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(26px,4vw,38px)",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  Not another live chat. Not a chatbot builder.
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Purpose-built to answer questions and capture leads — without
                  the complexity or the $100/month price tag.
                </p>
              </div>
              <div
                className="overflow-x-auto rounded-2xl border"
                style={{ borderColor: "var(--color-border)" }}
              >
                <table
                  className="w-full"
                  style={{ borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr
                      style={{ borderBottom: "1px solid var(--color-border)" }}
                    >
                      <th
                        className="text-left py-4 px-5"
                        style={{
                          fontSize: "13px",
                          color: "var(--color-text-tertiary)",
                          background: "var(--color-surface)",
                          fontWeight: 500,
                        }}
                      >
                        Feature
                      </th>
                      {[platformName, "Intercom / Drift", "Basic chatbot"].map(
                        (h) => (
                          <th
                            key={h}
                            className="py-4 px-5 text-center"
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color:
                                h === platformName
                                  ? "var(--color-brand-600)"
                                  : "var(--color-text-secondary)",
                              background:
                                h === platformName
                                  ? "var(--color-brand-50)"
                                  : "var(--color-surface)",
                            }}
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["5-min setup, no developer", true, false, "partial"],
                      [
                        "Learns from your website automatically",
                        true,
                        false,
                        false,
                      ],
                      [
                        "Captures lead emails in conversation",
                        true,
                        true,
                        "partial",
                      ],
                      [
                        "Zero ongoing training or FAQ writing",
                        true,
                        false,
                        false,
                      ],
                      ["Multi-site management", true, true, false],
                      ["AI answer quality analytics", true, false, false],
                      ["Starts at $5/month", true, false, true],
                    ].map(([feature, veroliq, intercom, chatbot], i) => {
                      const cell = (v: unknown) =>
                        v === true ? (
                          <span
                            style={{
                              color: "var(--color-success-600)",
                              fontSize: "18px",
                            }}
                          >
                            ✓
                          </span>
                        ) : v === "partial" ? (
                          <span
                            style={{
                              fontSize: "12px",
                              color: "var(--color-warning-600)",
                              fontWeight: 500,
                            }}
                          >
                            Partial
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "var(--color-slate-200)",
                              fontSize: "18px",
                            }}
                          >
                            ✕
                          </span>
                        );
                      return (
                        <tr
                          key={String(feature)}
                          style={{
                            borderBottom: "1px solid var(--color-border)",
                            background:
                              i % 2 === 0 ? "white" : "var(--color-slate-50)",
                          }}
                        >
                          <td
                            className="py-3.5 px-5"
                            style={{
                              fontSize: "14px",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {feature as string}
                          </td>
                          <td
                            className="py-3.5 px-5 text-center"
                            style={{ background: "var(--color-brand-50)" }}
                          >
                            {cell(veroliq)}
                          </td>
                          <td className="py-3.5 px-5 text-center">
                            {cell(intercom)}
                          </td>
                          <td className="py-3.5 px-5 text-center">
                            {cell(chatbot)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ══ PRICING ══ */}
        <section id="pricing" className="py-24" style={{ background: "white" }}>
          <div className="max-w-6xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-10">
                <p
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-brand-600)",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  Pricing
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px,4vw,42px)",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  Start free. Pay only when you grow.
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  No contracts. No setup fees. Cancel any time.
                </p>
              </div>

              {/* Toggle */}
              <div className="flex items-center justify-center gap-3 mb-12">
                <span
                  style={{
                    fontSize: "14px",
                    color: annual
                      ? "var(--color-text-tertiary)"
                      : "var(--color-text-primary)",
                    fontWeight: annual ? 400 : 500,
                  }}
                >
                  Monthly
                </span>
                <button
                  onClick={() => setAnnual(!annual)}
                  className="relative w-12 h-6 rounded-full"
                  style={{
                    background: annual
                      ? "var(--color-brand-600)"
                      : "var(--color-slate-300)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                    style={{
                      transform: annual
                        ? "translateX(28px)"
                        : "translateX(4px)",
                    }}
                  />
                </button>
                <span
                  style={{
                    fontSize: "14px",
                    color: annual
                      ? "var(--color-text-primary)"
                      : "var(--color-text-tertiary)",
                    fontWeight: annual ? 500 : 400,
                  }}
                >
                  Annual
                  <span
                    className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "var(--color-success-100)",
                      color: "var(--color-success-700)",
                    }}
                  >
                    Save 18%
                  </span>
                </span>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                {
                  name: "Free",
                  price: "Free",
                  period: "",
                  desc: "For solo founders testing the waters",
                  features: [
                    "1 website",
                    "350 chats / month",
                    "Unlimited leads",
                    "Basic analytics",
                    `${platformName} branding`,
                  ],
                  cta: "Get started free",
                },
                {
                  name: "Starter",
                  price: annual ? "$79" : "$8",
                  period: annual ? "/yr" : "/mo",
                  desc: "For founders ready to capture every lead",
                  features: [
                    "3 websites",
                    "5,000 chats / month",
                    "Unlimited leads",
                    "3 AI actions",
                    `Remove ${platformName} branding`,
                    "Email notifications",
                  ],
                  cta: "Start Starter",
                  highlight: true,
                  badge: "Most popular",
                },
                {
                  name: "Growth",
                  price: annual ? "$148" : "$15",
                  period: annual ? "/yr" : "/mo",
                  desc: "For teams with multiple sites",
                  features: [
                    "10 websites",
                    "20,000 chats / month",
                    "Unlimited leads",
                    "5 AI actions",
                    "Advanced analytics",
                    "Escalation alerts",
                    "Priority support",
                  ],
                  cta: "Start Growth",
                },
              ].map((p) => (
                <PlanCard
                  key={p.name}
                  name={p.name}
                  price={p.price}
                  period={p.period}
                  desc={p.desc}
                  features={p.features}
                  cta={p.cta}
                  highlight={p.highlight}
                  badge={p.badge}
                />
              ))}
            </div>

            <p
              className="text-center mt-8"
              style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}
            >
              All plans include SSL, 99.9% uptime SLA, and GDPR-compliant data
              handling
            </p>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section
          id="faq"
          className="py-24"
          style={{ background: "var(--color-slate-50)" }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-12">
                <p
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-brand-600)",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  FAQ
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(26px,4vw,38px)",
                    fontWeight: 700,
                  }}
                >
                  Questions about {platformName}
                </h2>
              </div>
            </FadeIn>
            {[
              {
                q: "How long does setup actually take?",
                a: `Most websites are live in under 5 minutes. You paste the script tag, ${platformName} crawls your site (2–5 minutes for sites up to 100 pages), and your widget is live automatically. No developer required.`,
              },
              {
                q: `What if ${assistantNameShort} gives a wrong or incomplete answer?`,
                a: "You set a confidence threshold. When the AI isn't confident enough, it falls back to a message you write — something like \"I don't have that info yet — can I connect you with the team?\" — and captures the visitor's email for follow-up. You can also correct specific answers in Knowledge settings.",
              },
              {
                q: "Does it work with WordPress, Webflow, or Shopify?",
                a: `Yes. ${platformName} works on any website that allows custom HTML. Step-by-step guides for WordPress (plugin available), Webflow (custom code embed), Shopify (theme.liquid), and standard HTML. Our support team will help if you're unsure.`,
              },
              {
                q: "What is an AI Action?",
                a: `An AI Action is a workflow ${platformName} triggers when it detects specific visitor intent. For example: \"When a visitor asks to book a demo, send their details to a Calendly webhook and confirm in chat.\" Actions connect to Zapier, Make.com, or any custom webhook URL.`,
              },
              {
                q: "Is visitor data safe and GDPR-compliant?",
                a: "All data is encrypted in transit and at rest. We are fully GDPR-compliant. Visitor conversation data is stored securely by default. We never sell or share your data.",
              },
              {
                q: "Can I use my own OpenAI or Google AI key?",
                a: "Yes — BYOK (Bring Your Own Key) is available on Growth plan. Connect your OpenAI or Google Gemini key and all AI calls route through your account, giving you full billing transparency and model control.",
              },
            ].map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section
          className="py-24 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #0F172A 0%, #0F172A 60%, #162240 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden
          />
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "800px",
              height: "800px",
              background:
                "radial-gradient(circle, rgba(29,78,216,0.14) 0%, transparent 60%)",
              borderRadius: "50%",
            }}
            aria-hidden
          />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <FadeIn>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7"
                style={{
                  background: "rgba(212,160,23,0.1)",
                  border: "1px solid rgba(212,160,23,0.18)",
                }}
              >
                <span
                  style={{
                    color: "var(--color-veroliq-gold)",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  ⭐ Founding customer pricing locked in forever
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(34px,5vw,56px)",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                Stop losing leads to the silence.
              </h2>
              <p
                style={{
                  fontSize: "17px",
                  color: "var(--color-slate-400)",
                  lineHeight: 1.7,
                  marginBottom: "36px",
                }}
              >
                Every visitor who leaves without an answer is a lead you
                didn&apos;t capture.
                <br />
                {platformName} fixes that — in one afternoon, for $5 a month.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <Link
                  href={onboardingUrl}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
                  style={{
                    background: "var(--color-brand-600)",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                    boxShadow: "0 0 40px rgba(29,78,216,0.5)",
                  }}
                >
                  Start for free — no card needed
                  <ArrowRight size={18} />
                </Link>
              </div>
              <p style={{ fontSize: "13px", color: "var(--color-slate-500)" }}>
                Free plan available · No credit card · Live in 5 minutes
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer
          className="border-t py-12"
          style={{ borderColor: "var(--color-border)", background: "white" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-10">
              <div>
                <VeroliqLogo variant="marketing" size="sm" />
                <p
                  className="mt-3"
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-tertiary)",
                    lineHeight: 1.6,
                  }}
                >
                  AI website assistant for founders and agencies. Answer every
                  visitor question and capture leads — automatically.
                </p>
                <p
                  className="mt-3"
                  style={{
                    fontSize: "12px",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  🌍 {marketingDomain}
                </p>
              </div>
              {[
                {
                  heading: "Product",
                  links: ["Features", "Pricing", "Changelog", "Roadmap"],
                },
                {
                  heading: "Resources",
                  links: [
                    "Documentation",
                    "API Reference",
                    "Integrations",
                    "Blog",
                  ],
                },
                {
                  heading: "Company",
                  links: [
                    "About",
                    "Privacy Policy",
                    "Terms of Service",
                    "Contact",
                  ],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <p
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--color-text-tertiary)",
                      fontWeight: 600,
                      marginBottom: "12px",
                    }}
                  >
                    {col.heading}
                  </p>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          style={{
                            fontSize: "13px",
                            color: "var(--color-text-secondary)",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color =
                              "var(--color-text-primary)")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.color =
                              "var(--color-text-secondary)")
                          }
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div
              className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-tertiary)",
                }}
              >
                © 2026 {platformName}. All rights reserved.
              </p>
              <div className="flex items-center gap-1.5">
                <Bot
                  size={12}
                  style={{ color: "var(--color-text-tertiary)" }}
                />
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  Built by founders, for founders ·{" "}
                  <span style={{ color: "var(--color-veroliq-gold)" }}>
                    {marketingDomain}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
