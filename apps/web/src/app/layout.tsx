import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import ConciergeProvider from "@/components/concierge/ConciergeProvider";
import LanguageProvider from "@/components/i18n/LanguageProvider";
import CookieConsentBanner from "@/components/cookies/CookieConsentBanner";
import CookieConsentProvider from "@/components/cookies/CookieConsentProvider";
import { SITE_URL } from "@/lib/site";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SicilyTrip | Vivi la Sicilia",
    template: "%s | SicilyTrip",
  },
  description:
    "Scopri hotel, destinazioni ed esperienze autentiche per organizzare il tuo viaggio in Sicilia.",
  keywords: [
    "Sicilia",
    "hotel Sicilia",
    "viaggi Sicilia",
    "esperienze Sicilia",
    "vacanze Sicilia",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "SicilyTrip",
    url: SITE_URL,
    title: "SicilyTrip | Vivi la Sicilia",
    description:
      "Scopri hotel, destinazioni ed esperienze autentiche per il tuo viaggio in Sicilia.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Viaggio in Sicilia con SicilyTrip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SicilyTrip | Vivi la Sicilia",
    description:
      "Scopri hotel, destinazioni ed esperienze autentiche per il tuo viaggio in Sicilia.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={poppins.variable}
    >
      <body
        className="
          min-h-screen
          bg-background
          font-sans
          antialiased
        "
      >
        <LanguageProvider>
          <CookieConsentProvider>
            <ConciergeProvider>{children}</ConciergeProvider>
            <CookieConsentBanner />
          </CookieConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
