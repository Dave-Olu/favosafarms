import Link from "next/link";
import Image from "next/image";
import { farmAddress } from "../lib/farmAddress";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Learn", href: "/knowledge-hub" },
  { label: "Contact Us", href: "/contact" },
];

const productLinks = [
  { label: "Broilers", href: "/products/broilers" },
  { label: "Catfish", href: "/products/catfish" },
  { label: "Dogs", href: "/products/dogs" },
  { label: "Layers", href: "/products/layers", soon: true },
  { label: "Catfish Hatchery", href: "/products", soon: true },
  { label: "Quail Eggs", href: "/products/quail", soon: true },
];

const serviceLinks = [
  { label: "Farm Setup", href: "/services" },
  { label: "Consultancy", href: "/services" },
  { label: "Training", href: "/services" },
  { label: "Farm Audit", href: "/services" },
];

type FooterIconName = "facebook" | "instagram" | "tiktok" | "phone" | "email" | "location";

function FooterIcon({ name }: { name: FooterIconName }) {
  const icons = {
    facebook: (
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4Z" fill="currentColor" stroke="none" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </>
    ),
    tiktok: (
      <path d="M14 4v9.2a4.2 4.2 0 1 1-3.2-4.1M14 4c.5 2.8 2.4 4.5 5 4.8" strokeWidth="2" />
    ),
    phone: (
      <path d="M7.2 3.5h2.5l1.2 4-1.8 1.8a15 15 0 0 0 5.6 5.6l1.8-1.8 4 1.2v2.5c0 1.2-1 2.2-2.2 2.2A16.3 16.3 0 0 1 5 5.7c0-1.2 1-2.2 2.2-2.2Z" />
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    location: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={`footer-icon footer-icon-${name}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {icons[name]}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <Image
                alt=""
                className="logo-b"
                height={50}
                src="/Images/Favosa-logo.jpeg"
                width={50}
              />
              Favosa Farms
            </Link>
            <p>
              Healthy protein. Ethical farming. A better tomorrow.
            </p>
            <div className="socials" aria-label="Social media">
              <a
                aria-label="Facebook"
                href="https://www.facebook.com/share/1BqQjKA3nL/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FooterIcon name="facebook" />
              </a>
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/favosafarms"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FooterIcon name="instagram" />
              </a>
              <a
                aria-label="TikTok"
                href="https://www.tiktok.com/@favosafarms"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FooterIcon name="tiktok" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h2>Quick links</h2>
            {quickLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h2>Products</h2>
            {productLinks.map((link) => (
              <Link href={link.href} key={link.label} className={link.soon ? "footer-link-soon" : ""}>
                {link.label}{link.soon && <span className="footer-soon-tag">Coming Soon</span>}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h2>Services</h2>
            {serviceLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer-col footer-contact footer-help">
            <h2>Contact</h2>
            <a className="footer-contact-link" href="tel:+2348134567890">
              <FooterIcon name="phone" />
              <span>+234 813 456 7890</span>
            </a>
            <a className="footer-contact-link" href="tel:+2348134567891">
              <FooterIcon name="phone" />
              <span>+234 813 456 7891</span>
            </a>
            <a className="footer-contact-link" href="mailto:info@favosafarms.com">
              <FooterIcon name="email" />
              <span>info@favosafarms.com</span>
            </a>
            <a
              className="footer-contact-link"
              href={`https://maps.google.com/?q=${encodeURIComponent(farmAddress.formatted)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FooterIcon name="location" />
              <span>{farmAddress.formatted}.</span>
            </a>
            <p>Questions about products or farm services? Our team is happy to help.</p>
            <Link className="footer-contact-cta" href="/contact">
              Contact the farm
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Favosa Farms. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
