import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import ConciergeProvider from "@/components/concierge/ConciergeProvider";
import LanguageProvider from "@/components/i18n/LanguageProvider";
import CookieConsentBanner from "@/components/cookies/CookieConsentBanner";
import CookieConsentProvider from "@/components/cookies/CookieConsentProvider";
import ScrollToTop from "@/components/layout/ScrollToTop";
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
  applicationName: "SicilyTrip",
  creator: "Euphoria Soc. Coop.",
  publisher: "Euphoria Soc. Coop.",
  category: "travel",
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
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
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "SicilyTrip",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-sicilytrip.svg`,
    email: "info@euphoriasolutions.it",
    telephone: "+39 328 146 8934",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C/da Berbarello 623/C",
      addressRegion: "Sicilia",
      addressCountry: "IT",
    },
    areaServed: { "@type": "AdministrativeArea", name: "Sicilia" },
    parentOrganization: {
      "@type": "Organization",
      name: "Euphoria Soc. Coop.",
    },
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <LanguageProvider>
          <CookieConsentProvider>
            <ScrollToTop />
            <ConciergeProvider>{children}</ConciergeProvider>
            <CookieConsentBanner />
          </CookieConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
