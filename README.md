# Veroliq website

Marketing site for [Veroliq](https://www.veroliq.com): landing page at `/`, optional demo shell at `/demo`, and `/landing` redirecting to `/`.

## Stack

Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS v4, Motion, Lucide icons, Sonner toasts.

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
| `NEXT_PUBLIC_VEROLIQ_API_URL` | API base URL if the site calls your backend |
| `NEXT_PUBLIC_VEROLIQ_LOGIN_URL` | Sign-in link (nav) |
| `NEXT_PUBLIC_VEROLIQ_ONBOARDING_URL` | Get-started / onboarding CTAs |

Unset login/onboarding URLs fall back to relative paths in the app.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development |
| `npm run build` | Production build |
| `npm start` | Serve production build |

## Assets

Brand images live under `public/` (see `src/lib/branding.ts` for filenames).
