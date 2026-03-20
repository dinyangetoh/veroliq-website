"use client";

import { assistantName, platformName } from "@/lib/branding";
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Globe,
  Heart,
  MessageCircle,
  Minimize2,
  Package,
  Palette,
  Send,
  ShoppingBag,
  Star,
  Truck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── Types ─── */
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  typing?: boolean;
  isLeadCapture?: boolean;
}

/* ─── AI Response logic ─── */
const BOT_RESPONSES: {
  patterns: RegExp[];
  response: string;
  isLeadCapture?: boolean;
}[] = [
  {
    patterns: [/pric/i, /cost/i, /how much/i, /fee/i, /expensive/i],
    response:
      "Our collections start at ₦15,000 for ready-to-wear pieces. Custom Kente orders start from ₦45,000 depending on complexity and fabric choice. We also have an exclusive Ankara line from ₦22,000. All prices include quality certification. Would you like me to send you a full price list?",
  },
  {
    patterns: [
      /custom/i,
      /bespoke/i,
      /made to order/i,
      /wedding/i,
      /event/i,
      /design/i,
    ],
    response:
      "Absolutely! Our custom order service is one of our most popular offerings. Here's how it works:\n\n1. Share your design inspiration or sketch\n2. Choose your fabric from our premium collection\n3. We confirm measurements and provide a quote\n4. Production takes 2–4 weeks\n5. Final fitting before delivery\n\nCustom orders start from ₦45,000. Would you like to get started with a consultation?",
    isLeadCapture: true,
  },
  {
    patterns: [
      /ship/i,
      /deliver/i,
      /lagos/i,
      /abuja/i,
      /ghana/i,
      /abroad/i,
      /international/i,
      /uk/i,
      /us/i,
    ],
    response:
      "We ship across Nigeria (2–4 business days) and internationally to the UK, US, Canada, and across West Africa (5–10 business days).\n\n• Lagos & Abuja: Free delivery on orders over ₦30,000\n• Other Nigerian states: Flat rate ₦2,500\n• International: From $25 depending on destination\n\nAll orders are tracked and insured.",
  },
  {
    patterns: [/return/i, /refund/i, /exchange/i, /cancel/i],
    response:
      "We have a 14-day return and exchange policy for ready-to-wear items in original condition. Custom orders are non-refundable once production begins, but we offer one free adjustment if the fit isn't perfect.\n\nFor returns, simply email returns@kenteandco.com with your order number and we'll arrange a pickup within Lagos, or a prepaid return label for other locations.",
  },
  {
    patterns: [
      /collec/i,
      /product/i,
      /available/i,
      /stock/i,
      /new/i,
      /latest/i,
    ],
    response:
      "Our current collections include:\n\n👗 **Ready-to-Wear** — classic Kente and Ankara dresses, tops, and trousers for women\n👔 **Men's Line** — Kente shirts, agbada sets, and formal wear\n🧣 **Accessories** — headwraps, bags, and jewellery\n🎨 **Fabric Store** — authentic Kente and Ankara fabric by the yard\n\nNew pieces drop every Friday. Would you like to be notified?",
  },
  {
    patterns: [/book/i, /appointment/i, /consult/i, /meet/i, /visit/i],
    response:
      "We'd love to meet you! Our Lagos showroom is open Monday–Saturday, 10am–6pm.\n\n📍 **Address:** 14 Balogun Street, Lagos Island, Lagos\n📞 **Phone:** +234 803 000 0000\n📧 **Email:** hello@kenteandco.com\n\nYou can also book a virtual consultation — perfect if you're ordering internationally. What's the best email to send your appointment confirmation to?",
    isLeadCapture: true,
  },
  {
    patterns: [
      /fabric/i,
      /kente/i,
      /ankara/i,
      /material/i,
      /cloth/i,
      /textile/i,
    ],
    response:
      "We source our fabrics directly from master weavers in Ghana (for Kente) and premium mills across West Africa (for Ankara). Every piece comes with a certificate of authenticity.\n\nWe also sell raw fabric by the yard:\n• Hand-woven Kente: from ₦8,000/yard\n• Premium Ankara: from ₦3,500/yard\n• Aso-Oke: from ₦6,500/yard\n\nVisit our online fabric store or come in person to feel the quality.",
  },
  {
    patterns: [/email|contact|reach|hello|hi|hey|help/i],
    response:
      "Hello! 👋 I'm here to help with any questions about Kente & Co — our collections, custom orders, shipping, or anything else.\n\nYou can also reach our team directly:\n📧 hello@kenteandco.com\n📱 WhatsApp: +234 803 000 0000\n\nWhat can I help you with today?",
  },
];

const FALLBACK_RESPONSES = [
  "That's a great question! I want to make sure I give you the right answer. Let me connect you with our team — what's your email address so we can follow up?",
  "I don't have complete information on that, but our team definitely can help. Can I take your email so someone gets back to you within a few hours?",
  "Hmm, I'm not 100% sure about that specific detail. Rather than guess, I'd prefer to connect you with the right person. What's your email?",
];

function getBotResponse(input: string): {
  response: string;
  isLeadCapture?: boolean;
} {
  const lower = input.toLowerCase();
  for (const entry of BOT_RESPONSES) {
    if (entry.patterns.some((p) => p.test(lower))) {
      return { response: entry.response, isLeadCapture: entry.isLeadCapture };
    }
  }
  const fallback =
    FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  return { response: fallback, isLeadCapture: true };
}

/* ─── Chat Widget ─── */
function VeraChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! 👋 Welcome to Kente & Co. I can help with collections, custom orders, pricing, shipping — or anything else on your mind.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const CHIPS = [
    "What's the pricing?",
    "Custom orders",
    "Shipping info",
    "View collections",
  ];

  useEffect(() => {
    if (open && !minimised) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, open, minimised]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 900 + Math.random() * 700));
    setIsTyping(false);

    const { response, isLeadCapture } = getBotResponse(text);
    const botMsg: ChatMessage = {
      id: `b${Date.now()}`,
      role: "assistant",
      content: response,
      isLeadCapture,
    };
    setMessages((prev) => [...prev, botMsg]);

    if (isLeadCapture && !leadCaptured) {
      await new Promise((r) => setTimeout(r, 300));
      setShowLeadForm(true);
    }
  };

  const submitEmail = () => {
    if (!leadEmail.includes("@")) return;
    setLeadCaptured(true);
    setShowLeadForm(false);
    const confirmMsg: ChatMessage = {
      id: `confirm${Date.now()}`,
      role: "assistant",
      content: `✅ Perfect! I've saved your email (${leadEmail}). Our team will be in touch within a few hours. Is there anything else I can help you with in the meantime?`,
    };
    setMessages((prev) => [...prev, confirmMsg]);
    setLeadEmail("");
  };

  const brandColor = "#D4A017";

  return (
    <>
      {/* Widget button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50 transition-transform hover:scale-105"
          style={{ background: brandColor, border: "none", cursor: "pointer" }}
          aria-label="Open chat"
        >
          <MessageCircle size={24} color="white" />
          {/* Unread dot */}
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold"
            style={{ background: "#EF4444", fontSize: "10px" }}
          >
            1
          </span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          style={{
            width: "360px",
            height: minimised ? "auto" : "520px",
            background: "white",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ background: brandColor }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
              >
                K
              </div>
              <div>
                <p
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Kente & Co
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
                  <p
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "11px",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {assistantName} · replies instantly
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMinimised(!minimised)}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!minimised && (
            <>
              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-3"
                style={{ background: "#FAFAFA" }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5"
                        style={{ background: brandColor, color: "white" }}
                      >
                        K
                      </div>
                    )}
                    <div
                      className="rounded-2xl px-3.5 py-2.5 max-w-[78%]"
                      style={{
                        background: msg.role === "user" ? brandColor : "white",
                        color: msg.role === "user" ? "white" : "#1E293B",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        fontFamily: "var(--font-body)",
                        borderBottomRightRadius:
                          msg.role === "user" ? "4px" : "16px",
                        borderBottomLeftRadius:
                          msg.role === "assistant" ? "4px" : "16px",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: brandColor, color: "white" }}
                    >
                      K
                    </div>
                    <div
                      className="flex items-center gap-1 px-3 py-2 rounded-2xl"
                      style={{
                        background: "white",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: "#CBD5E1",
                            animation: `veroliq-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Lead email form */}
                {showLeadForm && !leadCaptured && (
                  <div
                    className="rounded-xl p-3 border"
                    style={{
                      background: "white",
                      borderColor: "#E2E8F0",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#64748B",
                        marginBottom: "8px",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Enter your email so we can follow up:
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submitEmail()}
                        placeholder="your@email.com"
                        className="flex-1 px-2.5 py-1.5 rounded-lg text-sm border"
                        style={{
                          fontSize: "12px",
                          fontFamily: "var(--font-body)",
                          borderColor: "#E2E8F0",
                          outline: "none",
                          background: "#F8FAFC",
                        }}
                      />
                      <button
                        onClick={submitEmail}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{
                          background: brandColor,
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Quick chips */}
              {messages.length <= 1 && (
                <div
                  className="px-3 pb-2 flex flex-wrap gap-1.5"
                  style={{ background: "#FAFAFA" }}
                >
                  {CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      className="px-2.5 py-1 rounded-full text-xs border transition-colors"
                      style={{
                        fontSize: "11px",
                        color: "#475569",
                        background: "white",
                        borderColor: "#E2E8F0",
                        cursor: "pointer",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div
                className="px-3 py-3 flex items-center gap-2 border-t"
                style={{ borderColor: "#E2E8F0", background: "white" }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && sendMessage(input)
                  }
                  placeholder="Type a message..."
                  className="flex-1 text-sm outline-none"
                  style={{
                    fontSize: "13px",
                    color: "#1E293B",
                    fontFamily: "var(--font-body)",
                    background: "transparent",
                    border: "none",
                  }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity"
                  style={{
                    background: input.trim() ? brandColor : "#E2E8F0",
                    border: "none",
                    cursor: input.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  <Send size={13} color={input.trim() ? "white" : "#94A3B8"} />
                </button>
              </div>

              {/* Powered by */}
              <div
                className="py-1.5 flex items-center justify-center gap-1 border-t"
                style={{ background: "white", borderColor: "#F1F5F9" }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "#94A3B8",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Powered by
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#D4A017",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {platformName}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

/* ─── Kente & Co website ─── */
const products = [
  {
    id: 1,
    name: "Adire Indigo Kaftan",
    category: "Women's Ready-to-Wear",
    price: "₦28,500",
    rating: 4.9,
    reviews: 47,
    badge: "Bestseller",
    color: "#1A3A5C",
  },
  {
    id: 2,
    name: "Hand-woven Kente Shirt",
    category: "Men's Line",
    price: "₦35,000",
    rating: 4.8,
    reviews: 32,
    badge: "New",
    color: "#8B1A1A",
  },
  {
    id: 3,
    name: "Ankara Wrap Dress",
    category: "Women's Ready-to-Wear",
    price: "₦22,000",
    rating: 4.7,
    reviews: 68,
    badge: null,
    color: "#1A5C3A",
  },
  {
    id: 4,
    name: "Kente Agbada Set",
    category: "Men's Formal",
    price: "₦85,000",
    rating: 5.0,
    reviews: 14,
    badge: "Premium",
    color: "#5C4A1A",
  },
];

/* ─── Demo Page (the simulated business website) ─── */
export default function DemoPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: "white",
        minHeight: "100vh",
      }}
    >
      {/* ── Veroliq demo banner ── */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-2.5"
        style={{
          background: "var(--color-slate-900)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="px-2 py-0.5 rounded text-xs font-semibold"
            style={{ background: "var(--color-brand-600)", color: "white" }}
          >
            DEMO
          </div>
          <p style={{ color: "var(--color-slate-300)", fontSize: "13px" }}>
            This is a live demo of{" "}
            <span style={{ color: "var(--color-brand-300)", fontWeight: 500 }}>
              {platformName}
            </span>{" "}
            — {assistantName} answers in the chat widget in the bottom-right
            corner ↘
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/landing"
            className="hidden sm:flex items-center gap-1 text-xs"
            style={{ color: "var(--color-slate-400)", textDecoration: "none" }}
          >
            Learn more <ExternalLink size={11} />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "var(--color-slate-200)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={12} />
            Dashboard
          </Link>
        </div>
      </div>

      {/* ── KENTE & CO WEBSITE ── */}

      {/* Nav */}
      <nav style={{ background: "white", borderBottom: "1px solid #E2E8F0" }}>
        <div
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
          style={{ height: "64px" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#D4A017" }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L18 6V14L10 18L2 14V6L10 2Z"
                  fill="white"
                  opacity="0.9"
                />
                <path
                  d="M10 6L15 8.5V11.5L10 14L5 11.5V8.5L10 6Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#1E293B",
                  letterSpacing: "-0.01em",
                }}
              >
                Kente & Co
              </p>
              <p
                style={{
                  fontSize: "10px",
                  color: "#94A3B8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Authentic African Fashion
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6">
            {[
              "Collections",
              "Custom Orders",
              "Our Story",
              "Fabric Store",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#1E293B")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#475569")
                }
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full relative"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#475569",
              }}
            >
              <ShoppingBag size={20} />
              <span
                className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white"
                style={{
                  background: "#D4A017",
                  fontSize: "9px",
                  fontWeight: 700,
                }}
              >
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#0F172A",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden
        >
          {/* Kente-inspired geometric background */}
          <svg
            className="absolute right-0 top-0 h-full opacity-10"
            viewBox="0 0 400 600"
            preserveAspectRatio="xMaxYMid slice"
          >
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 80}
                  y={row * 80}
                  width={40}
                  height={40}
                  fill={row % 2 === col % 2 ? "#D4A017" : "#1D4ED8"}
                  transform={`rotate(45, ${col * 80 + 20}, ${row * 80 + 20})`}
                />
              )),
            )}
          </svg>
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
              style={{
                background: "rgba(212,160,23,0.15)",
                border: "1px solid rgba(212,160,23,0.25)",
              }}
            >
              <span style={{ color: "#D4A017", fontSize: "12px" }}>
                ✨ New: 2026 Harmattan Collection now available
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Wear the story of{" "}
              <span style={{ color: "#D4A017" }}>West Africa</span>
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#94A3B8",
                lineHeight: 1.7,
                marginBottom: "32px",
                maxWidth: "480px",
              }}
            >
              Authentic Kente and Ankara fashion, hand-crafted by master
              artisans across Ghana and Nigeria. Bespoke and ready-to-wear
              collections available.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: "#D4A017",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Shop Collections <ChevronRight size={16} />
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                }}
              >
                Custom Orders
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div
        className="py-6 border-b"
        style={{ background: "#FAFAFA", borderColor: "#E2E8F0" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-3">
          {[
            { icon: Truck, text: "Free delivery in Lagos & Abuja" },
            { icon: Package, text: "2–4 week custom delivery" },
            { icon: Palette, text: "Authentic hand-woven fabrics" },
            { icon: Globe, text: "Ships worldwide" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={16} style={{ color: "#D4A017" }} />
              <span style={{ fontSize: "13px", color: "#475569" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#D4A017",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                Featured
              </p>
              <h2
                style={{ fontSize: "28px", fontWeight: 700, color: "#1E293B" }}
              >
                This season's picks
              </h2>
            </div>
            <a
              href="#"
              style={{
                fontSize: "14px",
                color: "#D4A017",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View all collections →
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden border cursor-pointer group"
                style={{ background: "white", borderColor: "#E2E8F0" }}
              >
                {/* Product image placeholder */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: "220px", background: `${product.color}18` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Kente pattern placeholder */}
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      opacity="0.4"
                    >
                      <polygon
                        points="40,5 75,22.5 75,57.5 40,75 5,57.5 5,22.5"
                        fill={product.color}
                      />
                      <polygon
                        points="40,18 62,30 62,50 40,62 18,50 18,30"
                        fill="none"
                        stroke={product.color}
                        strokeWidth="3"
                      />
                      <polygon
                        points="40,31 52.5,37.5 52.5,42.5 40,49 27.5,42.5 27.5,37.5"
                        fill={product.color}
                      />
                    </svg>
                  </div>
                  {product.badge && (
                    <div
                      className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs font-semibold"
                      style={{
                        background:
                          product.badge === "Bestseller"
                            ? "#D4A017"
                            : product.badge === "New"
                              ? "#1D4ED8"
                              : "#7C3AED",
                        color: "white",
                      }}
                    >
                      {product.badge}
                    </div>
                  )}
                  <button
                    className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Heart size={14} style={{ color: "#94A3B8" }} />
                  </button>
                </div>
                <div className="p-4">
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "2px",
                    }}
                  >
                    {product.category}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1E293B",
                      marginBottom: "6px",
                    }}
                  >
                    {product.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#D4A017",
                      }}
                    >
                      {product.price}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        style={{ color: "#D4A017", fill: "#D4A017" }}
                      />
                      <span style={{ fontSize: "12px", color: "#64748B" }}>
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom order CTA */}
      <section
        className="py-16 mx-6 mb-8 rounded-3xl overflow-hidden"
        style={{ background: "#0F172A" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "white",
                marginBottom: "8px",
              }}
            >
              Your vision, our craft
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "#94A3B8",
                maxWidth: "440px",
                lineHeight: 1.7,
              }}
            >
              Commission a truly unique piece for your special occasion. From
              aso-ebi sets to corporate gifting, our artisans bring your ideas
              to life in 2–4 weeks.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <button
              className="px-8 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap"
              style={{
                background: "#D4A017",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Start custom order
            </button>
            <p style={{ fontSize: "12px", color: "#64748B" }}>
              From ₦45,000 · Free consultation
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16" style={{ background: "#FAFAFA" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#D4A017",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Our story
          </p>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#1E293B",
              marginBottom: "16px",
            }}
          >
            Three generations of craft
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#64748B",
              maxWidth: "640px",
              margin: "0 auto 32px",
              lineHeight: 1.8,
            }}
          >
            Kente & Co was founded in 2010 by Adaeze Nwachukwu, continuing her
            grandmother's tradition of weaving authentic Kente fabric in Kumasi,
            Ghana. Today we ship to over 40 countries, bringing the beauty of
            West African textiles to the world.
          </p>
          <div className="flex justify-center gap-12 flex-wrap">
            {[
              { value: "4,000+", label: "Happy customers" },
              { value: "40+", label: "Countries served" },
              { value: "15", label: "Master artisans" },
              { value: "2010", label: "Founded" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#D4A017",
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#94A3B8",
                    marginTop: "2px",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t" style={{ borderColor: "#E2E8F0" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: "13px", color: "#94A3B8" }}>
            © 2026 Kente & Co. All rights reserved. Lagos, Nigeria.
          </p>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: "11px", color: "#CBD5E1" }}>
              Chat powered by
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#D4A017",
                fontWeight: 700,
                fontFamily: "var(--font-display)",
              }}
            >
              {platformName}
            </span>
          </div>
        </div>
      </footer>

      {/* ── Vera chat widget ── */}
      <VeraChatWidget />
    </div>
  );
}
