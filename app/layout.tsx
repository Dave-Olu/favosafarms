import type { Metadata } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StickyMobileCTA from "../components/StickyMobileCTA";
import { farmAddress } from "../lib/farmAddress";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://favosafarms.com"),
  title: {
    default: "Favosa Farms | Healthy protein, ethically farmed",
    template: "%s | Favosa Farms",
  },
  description:
    "Healthy poultry, fresh fish and trusted farm services in Yenagoa, Bayelsa State. Raised with care, delivered with trust.",
  openGraph: {
    type: "website",
    title: "Favosa Farms | Healthy protein, ethically farmed",
    description:
      "Healthy poultry, fresh fish and trusted farm services in Yenagoa, Bayelsa State.",
    images: ["/Images/White-birds-optimized.jpg"],
  },
  icons: {
    icon: "/Images/Favosa-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Favosa Farms",
              description:
                "Healthy poultry, fresh fish, premium eggs and pet care services in Yenagoa, Bayelsa State.",
              url: "https://favosafarms.com",
              telephone: "+2348073228022",
              email: "favosa91@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: farmAddress.streetAddress,
                addressLocality: farmAddress.addressLocality,
                postalCode: farmAddress.postalCode,
                addressRegion: farmAddress.addressRegion,
                addressCountry: farmAddress.addressCountry,
              },
              sameAs: [
                "https://www.facebook.com/share/1BqQjKA3nL/",
                "https://www.instagram.com/favosafarms",
              ],
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
