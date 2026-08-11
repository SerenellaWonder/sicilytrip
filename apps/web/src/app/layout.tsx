import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import ConciergeProvider from "@/components/concierge/ConciergeProvider";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SicilyTrip",
  description: "Scopri. Vivi. Ricorda.",
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
        <ConciergeProvider>
          {children}
        </ConciergeProvider>
      </body>
    </html>
  );
}