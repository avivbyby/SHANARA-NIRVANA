import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "SHANARA Legacy | מעגל של אהבה";
  const description = "הפקה מחתרתית עם לב, חזון וקהילה מדויקת. הכירו את SHANARA Legacy והצטרפו למעגל.";

  return {
    title,
    description,
    icons: { icon: [{ url: "/nirvana-assets/favicon-nirvana-64.png", type: "image/png", sizes: "64x64" }], shortcut: "/nirvana-assets/favicon-nirvana-64.png", apple: "/nirvana-assets/favicon-nirvana-180.png" },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "he_IL",
      images: [{ url: `${origin}/event-desert-stage.jpg`, width: 2200, height: 1466, alt: "SHANARA Legacy — מרחב, מוזיקה וקהילה במדבר" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/event-desert-stage.jpg`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="icon" type="image/png" sizes="64x64" href="/nirvana-assets/favicon-nirvana-64.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/nirvana-assets/favicon-nirvana-180.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
