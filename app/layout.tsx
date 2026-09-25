import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// The two families aboveboardgroup.co.uk loads from Google Fonts: Outfit for headings ("font-heading"), Inter for
// everything else. Self-hosted here as variable fonts from @fontsource-variable (both OFL).
const outfit = localFont({ src: "./fonts/Outfit-Variable.woff2", weight: "100 900", variable: "--font-outfit", display: "swap" });
const inter = localFont({ src: "./fonts/Inter-Variable.woff2", weight: "100 900", variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Air Conditioning Contractors London & Surrey | AC Install, Labour & Maintenance",
  description: "Aboveboard Group - Delivering Air Conditioning Projects & People across Surrey, London and the South East. Commercial AC installation, project delivery and workforce solutions.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#f6f7f9" };

// Runs before first paint: holds the page for the preloader unless reduced motion is on. A safety net hands
// the page over after 4.5 s whatever happens, so a stalled script can never leave it locked.
const intro = `(function(){var d=document.documentElement;function done(){d.classList.remove("is-loading");d.dataset.intro="done";d.dataset.logo="landed"}if(matchMedia("(prefers-reduced-motion: reduce)").matches){done();return}d.classList.add("is-loading");setTimeout(function(){if(d.dataset.intro!=="done"){done();document.dispatchEvent(new Event("intro:done"))}else{d.dataset.logo="landed"}},4500)})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB" className={`${outfit.variable} ${inter.variable}`} data-htone="base" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: intro }} />
      <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
      <noscript><style>{".loader{display:none!important}[data-rise],[data-words],[data-appear],[data-card],[data-image],[data-hero-appear],.hero-frame,.hero-quote{opacity:1!important;transform:none!important;clip-path:none!important}.strip-track{animation:none!important}"}</style></noscript>
    </head>
    <body>{children}</body>
  </html>;
}
