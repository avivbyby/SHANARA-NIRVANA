import type { Metadata } from "next";
import "./globals.css";
import site from "./content/site-metadata.json";

const origin = site.origin;
const title = site.pages[0].name;
const description = site.pages[0].description;
export const metadata: Metadata = { title };

// Accessibility preferences set root classes before hydration to avoid flashing motion.
// Explicit head elements stay in the initial HTML even when the runtime streams metadata.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl" suppressHydrationWarning><head>
    <link rel="stylesheet" href="/site-modules/shared/accessibility.css?v=889c1b51e4ed" />
    <script src="/site-modules/shared/accessibility-tools.js?v=6a8469e138c9" />
    <link rel="stylesheet" href="/site-modules/shared/mobile-layout.css?v=c7e080ae2f0d" />
    <link rel="canonical" href={`${origin}/`} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "WebSite", "@id": `${origin}/#website`, name: site.name, url: `${origin}/`, inLanguage: "he", publisher: { "@id": `${origin}/#organization` } }, { "@type": "Organization", "@id": `${origin}/#organization`, name: site.name, url: `${origin}/`, logo: `${origin}${site.logo}`, sameAs: site.social }] }).replace(/</g, "\\u003c") }} />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="he_IL" />
    <meta property="og:image" content={`${origin}/event-desert-stage.jpg`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`${origin}/event-desert-stage.jpg`} />
    <link rel="icon" type="image/png" sizes="64x64" href="/nirvana-assets/favicon-nirvana-64.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/nirvana-assets/favicon-nirvana-180.png" />
    <link rel="preload" href="/fonts/rubik-variable-hebrew-v1.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <link rel="stylesheet" href="/fonts/fonts-v1.css?v=1da0c8de06de" />
  </head><body>{children}</body></html>;
}
