import { assistantNameShort, platformName } from "./branding";

const appBase = process.env.NEXT_PUBLIC_VEROLIQ_BASE_URL ?? "https://app.veroliq.com";

export const setupGuideSteps = [
  {
    number: 1,
    title: "Create your account",
    summary: "Sign up free — no credit card required.",
    detail: `Create your ${platformName} account in under a minute. You'll land on your dashboard with a setup checklist guiding you through the rest.`,
    cta: { label: "Sign up free", href: `${appBase}/auth/signup` },
    time: "1 min",
  },
  {
    number: 2,
    title: "Add your site",
    summary: "Enter your website URL and site name.",
    detail: `Add your domain from the dashboard checklist or Sites page. ${platformName} validates the URL and prepares your workspace.`,
    cta: { label: "Open dashboard", href: `${appBase}/auth/signup` },
    time: "1 min",
  },
  {
    number: 3,
    title: "Index your pages",
    summary: "We crawl your site and build Vera's knowledge base.",
    detail: `A crawl starts automatically when you add a site. For most sites under 100 pages, indexing finishes in 2–5 minutes. Track progress on the Crawl tab.`,
    cta: { label: "Learn about crawling", href: "/how-it-works#index" },
    time: "2–5 min",
  },
  {
    number: 4,
    title: "Customise Vera",
    summary: "Brand colour, greeting, and conversation starters.",
    detail: `Open Widget settings to match ${assistantNameShort} to your brand. Set the greeting visitors see first and up to three starter chips.`,
    cta: { label: "Widget settings", href: `${appBase}/settings/widget` },
    time: "2 min",
  },
  {
    number: 5,
    title: "Install the widget",
    summary: "Paste one script tag before </body>.",
    detail: "Copy your embed code from the dashboard and add it to your site. We detect the script automatically when your site loads the widget.",
    cta: { label: "Install guides", href: "/how-it-works/install/html" },
    time: "2 min",
  },
  {
    number: 6,
    title: "Test your chatbot",
    summary: "Visit your live site and send a test message.",
    detail: `Open your website, click the ${assistantNameShort} widget, and ask a question about your product or pricing. Confirm answers look accurate.`,
    cta: { label: "Setup checklist", href: `${appBase}/` },
    time: "1 min",
  },
  {
    number: 7,
    title: "Explore your insights",
    summary: "Conversations, leads, and AI performance in one place.",
    detail: "Your dashboard shows chat volume, conversion funnel, and lead capture as visitors engage. Analytics goes deeper on trends and page performance.",
    cta: { label: "View analytics", href: `${appBase}/analytics` },
    time: "Ongoing",
  },
] as const;

export type InstallPlatform = "html" | "wordpress" | "webflow" | "shopify";

export const installGuides: Record<
  InstallPlatform,
  { title: string; steps: string[]; note?: string }
> = {
  html: {
    title: "Standard HTML",
    steps: [
      "Sign in to app.veroliq.com and open your site from the dashboard checklist.",
      "Copy the script tag from the Install step (or site Overview).",
      "Paste it immediately before the closing </body> tag on every page.",
      "Deploy or save your changes, then visit your site to confirm the widget appears.",
    ],
  },
  wordpress: {
    title: "WordPress",
    steps: [
      "Sign in to app.veroliq.com and copy your embed script.",
      "In WordPress admin, go to Appearance → Theme File Editor (or use a header/footer plugin).",
      "Open footer.php and paste the script before </body>.",
      "Alternatively, use a custom HTML widget or plugin that injects footer scripts site-wide.",
      "Save and visit your site — the checklist will mark install complete when detected.",
    ],
    note: "Child themes are recommended so theme updates don't remove your script.",
  },
  webflow: {
    title: "Webflow",
    steps: [
      "Sign in to app.veroliq.com and copy your embed script.",
      "In Webflow, open Project Settings → Custom Code.",
      "Paste the script in Footer Code (before </body>).",
      "Publish the site and open the live URL to verify the widget loads.",
    ],
  },
  shopify: {
    title: "Shopify",
    steps: [
      "Sign in to app.veroliq.com and copy your embed script.",
      "In Shopify admin, go to Online Store → Themes → Edit code.",
      "Open theme.liquid and paste the script before </body>.",
      "Save and preview your storefront.",
    ],
    note: "For Online Store 2.0, you can also use a custom liquid block in the theme editor.",
  },
};

export const widgetScriptExample = `<script src="https://cdn.veroliq.com/widget.js" data-site-id="YOUR_SITE_ID" async defer></script>`;
