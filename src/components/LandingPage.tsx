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
  Bell,
  Bot,
  Check,
  ChevronDown,
  Clock,
  Layers,
  MapPin,
  Menu,
  MessageSquare,
  Monitor,
  Play,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_VEROLIQ_BASE_URL ?? "https://app.veroliq.com";
const loginUrl = `${baseUrl}/auth/login`;
const signupUrl = `${baseUrl}/auth/signup`;

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
function AnimatedCount({ target, suffix = "" }: { target: number; suffix?: string }) {
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

/* ─── Gradient headline text ─── */
function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #93C5FD 55%, #60A5FA 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

/* ─── Hero visual: chat widget + floating cards ─── */
function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto"
      style={{ maxWidth: "400px" }}
    >
      {/* Main chat widget */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--color-slate-900)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
          marginTop: "48px",
        }}
      >
        {/* Widget header */}
        <div
          style={{
            background: "var(--color-brand-600)",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <Bot size={16} color="white" />
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "white", lineHeight: 1 }}>
              Vera AI
            </p>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>
              ✦ You can ask me anything
            </p>
          </div>
        </div>
        {/* Widget body */}
        <div style={{ padding: "16px" }}>
          <div
            className="rounded-xl rounded-tl-sm px-3 py-2.5 mb-3"
            style={{
              background: "rgba(255,255,255,0.06)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.6,
            }}
          >
            Welcome! I can answer questions about pricing, features, or walk you through a free setup. What would you like to know?
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {["What&apos;s the pricing?", "Book a demo", "How does it work?"].map((chip, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(29,78,216,0.2)",
                  border: "1px solid rgba(96,165,250,0.25)",
                  color: "var(--color-brand-300)",
                }}
              >
                {i === 0 ? "What's the pricing?" : chip}
              </span>
            ))}
          </div>
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ flex: 1, fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
              Ask anything...
            </span>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--color-brand-600)" }}
            >
              <Send size={10} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Lead notification — top left */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "16px",
          left: "-24px",
          background: "white",
          borderRadius: "14px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)",
          padding: "12px 14px",
          minWidth: "210px",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <p
          style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "var(--color-success-600)",
            textTransform: "uppercase",
            marginBottom: "5px",
          }}
        >
          New lead captured
        </p>
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
          <span style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>
            Just now · /pricing
          </span>
        </div>
      </motion.div>

      {/* Stats pill — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: "28px",
          right: "-24px",
          background: "var(--color-slate-900)",
          borderRadius: "14px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          padding: "14px 18px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p
          style={{
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            color: "var(--color-slate-500)",
            marginBottom: "3px",
          }}
        >
          LEADS THIS WEEK
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "34px",
            fontWeight: 700,
            color: "white",
            lineHeight: 1,
          }}
        >
          47
        </p>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp size={11} style={{ color: "var(--color-success-400)" }} />
          <span style={{ fontSize: "11px", color: "var(--color-success-400)", fontWeight: 500 }}>
            ↑ 23% vs last week
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Dashboard analytics mockup ─── */
function DashboardMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#111827",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
      }}
    >
      {/* Topbar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0F172A" }}
      >
        <div className="flex gap-1.5">
          {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex-1 text-center">
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Veroliq · Overview
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className="hidden sm:flex flex-col"
          style={{
            width: "110px",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            padding: "14px 10px",
            flexShrink: 0,
          }}
        >
          {[
            { label: "Overview", active: true },
            { label: "Leads", active: false },
            { label: "Analytics", active: false },
            { label: "Settings", active: false },
          ].map(({ label, active }) => (
            <div
              key={label}
              className="px-2.5 py-1.5 rounded-lg mb-0.5 text-xs"
              style={{
                background: active ? "rgba(29,78,216,0.2)" : "transparent",
                color: active ? "var(--color-brand-300)" : "rgba(255,255,255,0.3)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        {/* Main area */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: "PAGE VIEWS", val: "54", sub: "↑ 100%", accent: false },
              { label: "TOTAL CHATS", val: "6", sub: "↑ 100%", accent: false },
              { label: "LEADS CAPTURED", val: "1", sub: "↑ 100%", accent: true },
              { label: "CONV. RATE", val: "16.7%", sub: "chat-to-lead", accent: false },
            ].map(({ label, val, sub, accent }) => (
              <div
                key={label}
                className="rounded-xl p-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "3px",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: accent ? "var(--color-brand-400)" : "white",
                    lineHeight: 1,
                  }}
                >
                  {val}
                </p>
                <p style={{ fontSize: "9px", color: "var(--color-success-400)", marginTop: "2px" }}>
                  {sub}
                </p>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: "8px",
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "8px",
            }}
          >
            CONVERSION PIPELINE
          </p>
          {[
            { label: "Page views", pct: "100%", color: "var(--color-brand-600)", count: 54 },
            { label: "Widget opened", pct: "30%", color: "var(--color-brand-400)", count: 16 },
            { label: "Chat started", pct: "13%", color: "#60A5FA", count: 7 },
            { label: "Lead captured", pct: "2%", color: "var(--color-success-500)", count: 1 },
          ].map(({ label, pct, color, count }) => (
            <div key={label} className="flex items-center gap-2 mb-1.5">
              <span
                style={{
                  width: "80px",
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.35)",
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "4px",
                  height: "5px",
                }}
              >
                <div
                  style={{
                    width: pct,
                    height: "5px",
                    borderRadius: "4px",
                    background: color,
                    minWidth: "6px",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.35)",
                  width: "14px",
                  flexShrink: 0,
                }}
              >
                {count}
              </span>
            </div>
          ))}
        </div>
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
        <p style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-text-primary)" }}>{q}</p>
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
  comingSoon,
  href,
}: {
  name: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  badge?: string;
  comingSoon?: boolean;
  href?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-8 flex flex-col relative${!comingSoon ? " transition-transform duration-200 hover:-translate-y-1" : ""}`}
      style={{
        background: highlight ? "var(--color-slate-900)" : "var(--color-surface)",
        border: highlight
          ? "2px solid var(--color-brand-400)"
          : "1px solid var(--color-border)",
        boxShadow: highlight
          ? "0 0 0 4px rgba(29,78,216,0.08), 0 24px 64px rgba(29,78,216,0.15)"
          : "none",
        opacity: comingSoon ? 0.7 : 1,
      }}
    >
      {(badge || comingSoon) && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
          style={{
            background: comingSoon ? "var(--color-slate-500)" : "var(--color-brand-600)",
            color: "white",
          }}
        >
          {comingSoon ? "Coming soon" : badge}
        </div>
      )}
      <p
        className="text-sm font-semibold mb-2"
        style={{
          color: highlight ? "var(--color-brand-300)" : "var(--color-text-secondary)",
        }}
      >
        {name}
      </p>
      {/* Price */}
      <div className="flex items-baseline gap-1 mb-1.5">
        {price !== "Free" && (
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: highlight ? "rgba(255,255,255,0.6)" : "var(--color-text-secondary)",
              lineHeight: 1,
            }}
          >
            $
          </span>
        )}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: price === "Free" ? "38px" : "52px",
            fontWeight: 800,
            color: highlight ? "white" : "var(--color-text-primary)",
            lineHeight: 1,
          }}
        >
          {price === "Free" ? "Free" : price.replace("$", "")}
        </span>
        {price !== "Free" && (
          <span
            style={{
              fontSize: "13px",
              color: highlight ? "var(--color-slate-400)" : "var(--color-text-tertiary)",
            }}
          >
            {period}
          </span>
        )}
      </div>
      <p
        style={{
          fontSize: "13px",
          color: highlight ? "var(--color-slate-400)" : "var(--color-text-secondary)",
          marginBottom: "20px",
        }}
      >
        {desc}
      </p>
      {/* Divider */}
      <div
        style={{
          borderTop: `1px solid ${highlight ? "rgba(255,255,255,0.1)" : "var(--color-border)"}`,
          marginBottom: "20px",
        }}
      />
      <ul className="space-y-2.5 flex-1 mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check
              size={13}
              className="mt-0.5 flex-shrink-0"
              style={{
                color: highlight ? "var(--color-brand-300)" : "var(--color-success-600)",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                color: highlight ? "var(--color-slate-300)" : "var(--color-text-secondary)",
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>
      {comingSoon ? (
        <div
          className="w-full py-3 rounded-xl text-sm font-semibold text-center"
          style={{
            background: "var(--color-slate-100)",
            color: "var(--color-slate-400)",
            border: "1.5px solid var(--color-slate-200)",
          }}
        >
          Coming soon
        </div>
      ) : href ? (
        <Link
          href={href}
          className="w-full py-3 rounded-xl text-sm font-semibold text-center block"
          style={{
            background: highlight ? "var(--color-brand-600)" : "transparent",
            color: highlight ? "white" : "var(--color-brand-600)",
            border: highlight ? "none" : "1.5px solid var(--color-brand-300)",
            textDecoration: "none",
          }}
        >
          {cta}
        </Link>
      ) : (
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
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── NAV ── */}
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
                  ((e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)")
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
              className="hidden sm:block"
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
            <Link
              href={signupUrl}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold"
              style={{
                background: "var(--color-brand-600)",
                color: "white",
                textDecoration: "none",
              }}
            >
              <Play size={12} fill="white" />
              Get started - free
            </Link>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={22} style={{ color: "var(--color-text-primary)" }} />
              ) : (
                <Menu size={22} style={{ color: "var(--color-text-primary)" }} />
              )}
            </button>
          </div>
        </div>
        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div
            className="md:hidden border-t"
            style={{
              borderColor: "var(--color-border)",
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {[
                ["Features", "#features"],
                ["How it works", "#how-it-works"],
                ["Pricing", "#pricing"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="py-2.5 text-sm font-medium"
                  style={{
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ))}
              <div className="flex gap-3 pt-3">
                <Link
                  href={loginUrl}
                  className="flex-1 py-2.5 text-sm font-semibold text-center rounded-lg"
                  style={{
                    background: "transparent",
                    color: "var(--color-text-secondary)",
                    border: "1.5px solid var(--color-border)",
                    textDecoration: "none",
                  }}
                >
                  Sign in
                </Link>
                <Link
                  href={signupUrl}
                  className="flex-1 py-2.5 text-sm font-semibold text-center rounded-lg"
                  style={{
                    background: "var(--color-brand-600)",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Get started free
                </Link>
              </div>
            </div>
          </div>
        )}
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
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
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
              {/* Left: Copy */}
              <div className="flex-1 lg:max-w-[52%] pb-16 lg:pb-24 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7"
                    style={{
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(96,165,250,0.15)",
                    }}
                  >
                    <Sparkles size={12} style={{ color: "var(--color-brand-400)" }} />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--color-brand-300)",
                        fontWeight: 500,
                      }}
                    >
                      Now in public beta · free to get started
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
                    Your visitors ask.
                    <br />
                    <GradientText>Vera AI answers.</GradientText>
                    <br />
                    You get the lead.
                  </h1>

                  <p
                    className="mx-auto lg:mx-0"
                    style={{
                      fontSize: "17px",
                      color: "var(--color-slate-400)",
                      lineHeight: 1.7,
                      marginBottom: "36px",
                      maxWidth: "520px",
                    }}
                  >
                    {platformName} reads your website and trains {assistantName} to
                    handle questions and capture contact details — automatically, 24/7,
                    the moment a visitor shows buying intent.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 mb-8 justify-center lg:justify-start">
                    <Link
                      href={signupUrl}
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
                    <a
                      href="#how-it-works"
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        color: "white",
                        textDecoration: "none",
                        fontSize: "15px",
                        border: "1.5px solid rgba(255,255,255,0.2)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      See how it works
                    </a>
                  </div>

                  {/* Trust */}
                  <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start">
                    {[
                      "✓  Free plan forever",
                      "✓  Works on any CMS",
                      "✓  GDPR compliant",
                      "✓  No training needed",
                    ].map((t) => (
                      <span key={t} style={{ fontSize: "12px", color: "var(--color-slate-500)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: Hero visual — desktop only */}
              <div className="flex-1 w-full lg:max-w-[48%] lg:min-h-[440px]">
                <div className="hidden lg:block">
                  <HeroVisual />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom fade into white */}
          <div
            style={{
              height: "60px",
              background: "linear-gradient(to bottom, transparent, white)",
              marginTop: "-1px",
            }}
          />
        </section>

        {/* ══ STATS BAR ══ */}
        <FadeIn>
          <section className="py-16" style={{ background: "var(--color-slate-900)" }}>
            <div className="max-w-5xl mx-auto px-6">
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {[
                  {
                    display: <AnimatedCount target={98} suffix="%" />,
                    label: "Questions answered accurately",
                    sub: "Industry-leading accuracy",
                  },
                  {
                    display: <AnimatedCount target={4} suffix="min" />,
                    label: "Average setup time",
                    sub: "No developer needed",
                  },
                  {
                    display: <span>24/7</span>,
                    label: "Lead capture, zero downtime",
                    sub: "Always on",
                  },
                  {
                    display: <AnimatedCount target={3} suffix="×" />,
                    label: "More leads vs static form",
                    sub: "Across all customers",
                  },
                ].map(({ display, label, sub }, i) => (
                  <div
                    key={i}
                    className="py-8 px-6 text-center"
                    style={{ background: "var(--color-slate-900)" }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(36px,4vw,52px)",
                        fontWeight: 700,
                        color: "var(--color-brand-400)",
                        lineHeight: 1,
                      }}
                    >
                      {display}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "white",
                        fontWeight: 500,
                        marginTop: "6px",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--color-slate-500)",
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

        {/* ══ THE PROBLEM ══ */}
        <FadeIn>
          <section className="py-20" style={{ background: "var(--color-slate-50)" }}>
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
                  The problem
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px,4vw,42px)",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  The people who can&apos;t afford to miss a lead
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "var(--color-text-secondary)",
                    maxWidth: "560px",
                    margin: "0 auto",
                    lineHeight: 1.6,
                  }}
                >
                  Your best leads come from people who visited your site, had a
                  question, and left because no one answered. That stops today.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    num: "01",
                    Icon: Users,
                    color: "var(--color-brand-600)",
                    bg: "var(--color-brand-50)",
                    title: "Solo founders & small teams",
                    desc: `You can't be online around the clock. ${assistantName} handles visitor questions while you sleep, ship, and grow.`,
                  },
                  {
                    num: "02",
                    Icon: Monitor,
                    color: "var(--color-info-600)",
                    bg: "var(--color-info-100)",
                    title: "Agencies with multiple client sites",
                    desc: `Deploy ${assistantNameShort} across every client site from one dashboard. One embed, unlimited conversations.`,
                  },
                  {
                    num: "03",
                    Icon: TrendingUp,
                    color: "var(--color-success-600)",
                    bg: "var(--color-success-50)",
                    title: "SaaS & product companies",
                    desc: `Turn product page visits into qualified leads. ${assistantNameShort} qualifies intent, collects emails, and routes hot prospects.`,
                  },
                ].map(({ num, Icon, color, bg, title, desc }) => (
                  <div
                    key={num}
                    className="rounded-2xl p-6 border"
                    style={{ background: "white", borderColor: "var(--color-border)" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "var(--color-text-tertiary)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {num}
                      </span>
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: bg }}
                      >
                        <Icon size={16} style={{ color }} />
                      </div>
                    </div>
                    <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "10px" }}>
                      {title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ══ FEATURES ══ */}
        <section id="features" className="py-24" style={{ background: "white" }}>
          <div className="max-w-6xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-16">
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
                  How Veroliq works
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px,4vw,42px)",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  One script tag. A trained AI. Leads that never sleep.
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
                  No FAQ writing. No chatbot logic to design. {platformName} reads
                  everything on your website and builds the knowledge base{" "}
                  {assistantNameShort} uses automatically.
                </p>
              </div>
            </FadeIn>

            {/* Alternating feature rows */}
            <div className="space-y-20 mb-20">
              {/* Row 1 — Connect */}
              <FadeIn>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <p
                      className="text-xs font-bold tracking-widest mb-3"
                      style={{ color: "var(--color-brand-600)" }}
                    >
                      STEP 01 — CONNECT
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(22px,3vw,30px)",
                        fontWeight: 700,
                        marginBottom: "14px",
                        lineHeight: 1.2,
                      }}
                    >
                      Paste a URL. {assistantNameShort} learns your business.
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                        marginBottom: "20px",
                      }}
                    >
                      {platformName} crawls your website and builds a knowledge base
                      automatically. No spreadsheets, no FAQs to upload, no training
                      sessions. It just works.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Crawls all public pages including blog, docs, and landing pages",
                        "Keeps itself fresh by re-indexing when your content changes",
                        "Works on Webflow, WordPress, Framer, Squarespace, and any custom stack",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check
                            size={13}
                            className="mt-1 flex-shrink-0"
                            style={{ color: "var(--color-success-600)" }}
                          />
                          <span
                            style={{
                              fontSize: "14px",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Crawl mock */}
                  <div
                    className="rounded-2xl p-7 border"
                    style={{
                      background: "var(--color-slate-900)",
                      borderColor: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="w-2 h-2 rounded-full"
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
                      className="mt-4 pt-4"
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

              {/* Row 2 — Engage (reversed) */}
              <FadeIn>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Lead list mock */}
                  <div
                    className="rounded-2xl p-7 border order-2 md:order-1"
                    style={{ background: "#F0FDF4", borderColor: "#DCFCE7" }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Target size={16} style={{ color: "var(--color-success-600)" }} />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--color-success-700)",
                        }}
                      >
                        Live lead capture
                      </span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { email: "sarah@techcorp.io", intent: "💰 Pricing", score: 92 },
                        { email: "james@startup.com", intent: "🎯 Demo", score: 87 },
                        { email: "priya@venture.co", intent: "💰 Pricing", score: 79 },
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
                  <div className="order-1 md:order-2">
                    <p
                      className="text-xs font-bold tracking-widest mb-3"
                      style={{ color: "var(--color-success-600)" }}
                    >
                      STEP 02 — ENGAGE
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(22px,3vw,30px)",
                        fontWeight: 700,
                        marginBottom: "14px",
                        lineHeight: 1.2,
                      }}
                    >
                      Captures lead emails in conversation.
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                        marginBottom: "20px",
                      }}
                    >
                      When {assistantNameShort} detects buying intent, the email is
                      captured naturally inside the chat — no pop-up, no form. Lead lands
                      in your dashboard instantly.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Detects buying intent signals in real time",
                        "Captures email naturally — no interruptive pop-ups",
                        "Lead score, page visited, and conversation context all saved",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check
                            size={13}
                            className="mt-1 flex-shrink-0"
                            style={{ color: "var(--color-success-600)" }}
                          />
                          <span
                            style={{
                              fontSize: "14px",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>

              {/* Row 3 — Analyse */}
              <FadeIn>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <p
                      className="text-xs font-bold tracking-widest mb-3"
                      style={{ color: "var(--color-veroliq-gold)" }}
                    >
                      STEP 03 — ANALYSE
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(22px,3vw,30px)",
                        fontWeight: 700,
                        marginBottom: "14px",
                        lineHeight: 1.2,
                      }}
                    >
                      Know exactly what&apos;s working — and why.
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                        marginBottom: "20px",
                      }}
                    >
                      Which pages drive the most chats, which questions the AI can&apos;t
                      answer, and exactly how many leads you captured this week — all in
                      one dashboard.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Conversion pipeline from first visit to captured email",
                        "AI health metrics — answer rate and confidence scores",
                        "Export leads to CSV or connect your CRM via webhook",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check
                            size={13}
                            className="mt-1 flex-shrink-0"
                            style={{ color: "var(--color-success-600)" }}
                          />
                          <span
                            style={{
                              fontSize: "14px",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Analytics bar chart mock */}
                  <div
                    className="rounded-2xl p-7 border"
                    style={{
                      background: "var(--color-brand-50)",
                      borderColor: "var(--color-brand-100)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <BarChart3 size={16} style={{ color: "var(--color-brand-600)" }} />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--color-brand-700)",
                        }}
                      >
                        This week&apos;s performance
                      </span>
                    </div>
                    {[
                      {
                        label: "Page views",
                        value: 1420,
                        max: 1420,
                        color: "var(--color-brand-600)",
                      },
                      {
                        label: "Widget opens",
                        value: 312,
                        max: 1420,
                        color: "var(--color-brand-400)",
                      },
                      {
                        label: "Leads captured",
                        value: 47,
                        max: 1420,
                        color: "var(--color-success-500)",
                      },
                    ].map(({ label, value, max, color }) => (
                      <div key={label} className="mb-4">
                        <div className="flex justify-between mb-1.5">
                          <span
                            style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}
                          >
                            {label}
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "var(--color-text-primary)",
                            }}
                          >
                            {value.toLocaleString()}
                          </span>
                        </div>
                        <div
                          className="rounded-full overflow-hidden"
                          style={{
                            height: "6px",
                            background: "var(--color-brand-100)",
                          }}
                        >
                          <div
                            style={{
                              width: `${(value / max) * 100}%`,
                              height: "6px",
                              background: color,
                              borderRadius: "9999px",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <div
                      className="flex items-center gap-2 mt-2 pt-4"
                      style={{ borderTop: "1px solid var(--color-brand-100)" }}
                    >
                      <TrendingUp size={14} style={{ color: "var(--color-success-600)" }} />
                      <span
                        style={{
                          fontSize: "13px",
                          color: "var(--color-success-700)",
                          fontWeight: 500,
                        }}
                      >
                        +22% leads vs last week
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* 6-card grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                {
                  Icon: Bell,
                  color: "var(--color-brand-600)",
                  bg: "var(--color-brand-50)",
                  title: "Reaches out before they click",
                  desc: `${assistantNameShort} shows a proactive callout after a configurable delay — greeting visitors who haven't clicked the widget yet. Returning users see a "welcome back" prompt.`,
                },
                {
                  Icon: MapPin,
                  color: "var(--color-success-600)",
                  bg: "var(--color-success-50)",
                  title: "Follows their journey, page by page",
                  desc: `Every page a visitor visits — even on React and Next.js SPAs — is tracked in real time. ${platformName} builds a full picture of where leads came from.`,
                },
                {
                  Icon: MessageSquare,
                  color: "#7C3AED",
                  bg: "#EDE9FE",
                  title: "Adapts its greeting per page",
                  desc: `The welcome message and quick-reply chips update automatically as visitors navigate. Set a custom greeting for /pricing, /features, and /contact — ${assistantNameShort} always speaks to the right page.`,
                },
              ].map(({ Icon, color, bg, title, desc }, i) => (
                <FadeIn key={title} delay={0.05 * (i % 3)}>
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
                    <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "8px" }}>
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
                  The process
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
                  Live in under 4 minutes. Seriously.
                </h2>
                <p style={{ fontSize: "15px", color: "var(--color-slate-400)" }}>
                  No developers, no training data, no contracts. If you can paste a line
                  of code, you&apos;re set.
                </p>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  icon: "🚀",
                  title: "Sign up free",
                  desc: "Create your account in 30 seconds. No credit card required, no sales call needed.",
                  color: "var(--color-brand-400)",
                },
                {
                  step: "02",
                  icon: "🧠",
                  title: "Enter your website URL",
                  desc: `${platformName} crawls your site and builds ${assistantNameShort}'s knowledge base. Done in under a minute.`,
                  color: "#A78BFA",
                },
                {
                  step: "03",
                  icon: "🎨",
                  title: "Customise & embed",
                  desc: "Match your brand colours, set your greeting, then paste one script tag. That's it.",
                  color: "#F59E0B",
                },
                {
                  step: "04",
                  icon: "🎯",
                  title: "Watch leads arrive",
                  desc: `${assistantNameShort} starts conversations, captures intent, and drops qualified leads into your dashboard.`,
                  color: "var(--color-success-400)",
                },
              ].map(({ step, icon, title, desc, color }, i) => (
                <FadeIn key={step} delay={i * 0.1}>
                  <div
                    className="rounded-2xl p-7 h-full"
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
                        fontSize: "17px",
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

        {/* ══ DASHBOARD ══ */}
        <FadeIn>
          <section className="py-24" style={{ background: "white" }}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
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
                    Analytics &amp; insights
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(26px,3.5vw,38px)",
                      fontWeight: 700,
                      marginBottom: "16px",
                      lineHeight: 1.15,
                    }}
                  >
                    Know exactly where leads come from — and why.
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.7,
                      marginBottom: "24px",
                    }}
                  >
                    The {platformName} dashboard shows your full conversion pipeline:
                    page views to widget opens, chat starts to captured leads. Spot
                    what&apos;s working and double down.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Conversion pipeline from first visit to captured email",
                      "AI health metrics — answer rate and average confidence",
                      "Real-time active sessions and live lead alerts",
                      "Export leads to CSV or connect your CRM",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          size={14}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: "var(--color-success-600)" }}
                        />
                        <span
                          style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={signupUrl}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                    style={{
                      background: "var(--color-brand-600)",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    Start for free
                    <ArrowRight size={14} />
                  </Link>
                </div>
                <DashboardMockup />
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ══ TESTIMONIALS ══ */}
        <FadeIn>
          <section className="py-24" style={{ background: "var(--color-slate-50)" }}>
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
                  Real customers
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(26px,4vw,38px)",
                    fontWeight: 700,
                  }}
                >
                  The results speak for themselves.
                </h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  {
                    quote:
                      "We set it up during a lunch break. By end of day we had 3 new leads. I honestly didn't expect it to work that fast.",
                    name: "Alex M.",
                    role: "Founder, B2B SaaS startup",
                    gradient: "linear-gradient(135deg,#667eea,#764ba2)",
                  },
                  {
                    quote: `Our agency runs 12 client sites. ${platformName} is now standard on every one. The multi-site dashboard alone is worth it.`,
                    name: "Priya K.",
                    role: "Director, Digital Growth Agency",
                    gradient: "linear-gradient(135deg,#f093fb,#f5576c)",
                  },
                  {
                    quote:
                      "The AI actually answers questions correctly. My previous chatbot was an embarrassment. This one feels like a knowledgeable team member.",
                    name: "Tom R.",
                    role: "Head of Marketing, E-commerce brand",
                    gradient: "linear-gradient(135deg,#4facfe,#00f2fe)",
                  },
                ].map(({ quote, name, role, gradient }) => (
                  <div
                    key={name}
                    className="rounded-2xl p-6 border"
                    style={{ background: "white", borderColor: "var(--color-border)" }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                        marginBottom: "20px",
                      }}
                    >
                      &ldquo;{quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: gradient }}
                      >
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 600 }}>{name}</p>
                        <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                          {role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
                <p style={{ fontSize: "15px", color: "var(--color-text-secondary)" }}>
                  No contracts. No setup fees. Cancel any time.
                </p>
              </div>

              {/* Beta note */}
              <p
                className="text-center mb-8 px-4 py-3 rounded-xl max-w-xl mx-auto"
                style={{
                  fontSize: "13px",
                  color: "var(--color-text-secondary)",
                  background: "var(--color-brand-50)",
                  border: "1px solid var(--color-brand-100)",
                }}
              >
                ⭐ We&apos;re in public beta. The free plan is live now. Paid plans
                launch soon — early adopters get{" "}
                <strong style={{ color: "var(--color-brand-700)" }}>
                  founding customer pricing locked in forever
                </strong>
                .
              </p>
            </FadeIn>

            <div className="grid lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
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
                  href: signupUrl,
                  comingSoon: false,
                },
                {
                  name: "Starter",
                  price: "$5",
                  period: "/mo",
                  desc: "For founders ready to capture every lead",
                  features: [
                    "3 websites",
                    "5,000 chats / month",
                    "Unlimited leads",
                    "3 AI actions",
                    `Remove ${platformName} branding`,
                    "Email notifications",
                    "LaunchPad support ops",
                  ],
                  cta: "Coming soon",
                  highlight: true,
                  comingSoon: true,
                },
                {
                  name: "Growth",
                  price: "$15",
                  period: "/mo",
                  desc: "For teams with multiple sites",
                  features: [
                    "10 websites",
                    "20,000 chats / month",
                    "Unlimited leads",
                    "5 AI actions",
                    "Advanced analytics",
                    "Escalation alerts",
                    "BYOK (your own API key)",
                    "Priority support",
                  ],
                  cta: "Coming soon",
                  comingSoon: true,
                },
              ].map((p) => (
                <PlanCard key={p.name} {...p} />
              ))}
            </div>

            <p
              className="text-center mt-8"
              style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}
            >
              All plans include SSL, 99.9% uptime SLA, and GDPR-compliant data handling
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
                a: `You set a confidence threshold. When the AI isn't confident enough, it falls back to a message you write — something like "I don't have that info yet — can I connect you with the team?" — and captures the visitor's email for follow-up. You can also correct specific answers in Knowledge settings.`,
              },
              {
                q: "Does it work with WordPress, Webflow, or Shopify?",
                a: `Yes. ${platformName} works on any website that allows custom HTML. Step-by-step guides for WordPress (plugin available), Webflow (custom code embed), Shopify (theme.liquid), and standard HTML. Our support team will help if you're unsure.`,
              },
              {
                q: "What is an AI Action?",
                a: `An AI Action is a workflow ${platformName} triggers when it detects specific visitor intent. For example: "When a visitor asks to book a demo, send their details to a Calendly webhook and confirm in chat." Actions connect to Zapier, Make.com, or any custom webhook URL.`,
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
                "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
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
                Stop letting leads slip into the silence.
              </h2>
              <p
                style={{
                  fontSize: "17px",
                  color: "var(--color-slate-400)",
                  lineHeight: 1.7,
                  marginBottom: "36px",
                }}
              >
                Vera AI is live on your site in under 4 minutes.
                <br />
                No card needed. No developer required.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <Link
                  href={signupUrl}
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
                <a
                  href="#pricing"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  View pricing
                </a>
              </div>
              <p style={{ fontSize: "13px", color: "var(--color-slate-500)" }}>
                Free plan forever · Works on any CMS · GDPR compliant
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer
          className="border-t py-12"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: "var(--color-slate-900)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <div className="col-span-2 md:col-span-1">
                <VeroliqLogo variant="marketing" size="sm" />
                <p
                  className="mt-3"
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.6,
                    maxWidth: "240px",
                  }}
                >
                  AI website assistant for founders and agencies. Answer every visitor
                  question and capture leads — automatically.
                </p>
                <p
                  className="mt-3"
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}
                >
                  🌍 {marketingDomain}
                </p>
              </div>
              {(
                [
                  {
                    heading: "Product",
                    links: [
                      { label: "Features", href: "/#features" },
                      { label: "How it works", href: "/#how-it-works" },
                      { label: "Pricing", href: "/#pricing" },
                    ],
                  },
                  {
                    heading: "Legal",
                    links: [
                      { label: "Privacy Policy", href: "/privacy" },
                      { label: "Terms of Service", href: "/terms" },
                    ],
                  },
                  {
                    heading: "Connect",
                    links: [{ label: "Contact", href: "mailto:hello@veroliq.com" }],
                  },
                ] as { heading: string; links: { label: string; href: string }[] }[]
              ).map((col) => (
                <div key={col.heading}>
                  <p
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: 700,
                      marginBottom: "12px",
                    }}
                  >
                    {col.heading}
                  </p>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          style={{
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.4)",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color =
                              "rgba(255,255,255,0.85)")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.color =
                              "rgba(255,255,255,0.4)")
                          }
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div
              className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                © 2026 {platformName}. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {["Twitter / X", "LinkedIn"].map((label) => (
                  <a
                    key={label}
                    href="#"
                    style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.6)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.3)")
                    }
                  >
                    {label}
                  </a>
                ))}
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
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
