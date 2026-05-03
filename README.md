# Veroliq website

> **Status:** Public beta, May 2026. Paid plan upgrade buttons are disabled in the current beta — self-serve billing (Stripe / Flutterwave) ships in Month 2.

Marketing site for [Veroliq](https://www.veroliq.com): landing page at `/`, optional demo shell at `/demo`, and `/landing` redirecting to `/`.

## Stack

Next.js (App Router), React 18, TypeScript, Tailwind CSS v4, Motion, Lucide icons, Sonner toasts.

## Setup

```bash
npm install
cp .env.example .env   # adjust values for your environment
npm run dev
```

Dev server runs on **port 2999** (see `package.json` scripts and `PORT` in `.env.example`).

## Environment

| Variable | Purpose |
|----------|---------|
| `PORT` | Local dev port (optional; aligns with `next dev --port`) |
| `NEXT_PUBLIC_VEROLIQ_API_URL` | API base URL if the site calls **veroliq-api** (routes use domain prefixes such as `account/auth`, `workspace/sites`, `engagement/…`; append your gateway segment if you use one, e.g. `/api`) |
| `NEXT_PUBLIC_VEROLIQ_LOGIN_URL` | Sign-in link (nav, header CTA). Points to `app.veroliq.com/auth/login` in production. Falls back to a relative path if unset. |
| `NEXT_PUBLIC_VEROLIQ_ONBOARDING_URL` | Get-started / onboarding CTAs on the landing page and pricing section. Points to `app.veroliq.com/onboarding` in production. Falls back to a relative path if unset. |

Both `NEXT_PUBLIC_VEROLIQ_LOGIN_URL` and `NEXT_PUBLIC_VEROLIQ_ONBOARDING_URL` must be set to route visitors to `app.veroliq.com` from the marketing site. Without them, CTAs resolve to relative paths and the navigation between the marketing site and the dashboard will not work correctly.

**Beta note:** Pricing plan upgrade buttons on the pricing page are currently disabled. Self-serve billing (Stripe USD + Flutterwave NGN) is a Month 2 roadmap item. Paid plan inquiries during beta use a manual upgrade flow.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development |
| `npm run build` | Production build |
| `npm start` | Serve production build |

## Assets

Brand images live under `public/` (see `src/lib/branding.ts` for filenames).

---

*See also: [Root README](../README.md) · [FEATURES.md](../FEATURES.md)*
