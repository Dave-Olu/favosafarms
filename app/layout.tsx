import type { Metadata } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SiteChrome from "../components/SiteChrome";
import StickyMobileCTA from "../components/StickyMobileCTA";
import {
  formatBusinessAddress,
  formatPhoneForLink,
  formatWhatsappNumber,
  getBusinessSettings,
} from "../lib/cms";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const business = await getBusinessSettings();
  const whatsappPhone = formatWhatsappNumber(business.whatsapp_phone);

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
              telephone: formatPhoneForLink(business.phone_primary),
              email: business.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: business.street_address,
                addressLocality: business.address_locality,
                postalCode: business.postal_code,
                addressRegion: business.address_region,
                addressCountry: business.address_country,
              },
              sameAs: [
                "https://www.facebook.com/share/1BqQjKA3nL/",
                "https://www.instagram.com/favosafarms",
              ],
            }),
          }}
        />
        <SiteChrome
          footer={<Footer business={business} />}
          mobileCta={<StickyMobileCTA whatsappPhone={whatsappPhone} />}
          navbar={<Navbar whatsappPhone={whatsappPhone} />}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
