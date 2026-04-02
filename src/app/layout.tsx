import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexander & Victoria — Wedding Invitation",
  description:
    "You are cordially invited to celebrate the wedding of Alexander & Victoria.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    lang="en"
    className={`${playfair.variable} ${cormorant.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col bg-cream text-charcoal font-body">
      {children}
      <SpeedInsights />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
