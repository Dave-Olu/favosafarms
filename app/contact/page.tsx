import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import { farmAddress } from "../../lib/farmAddress";
import { faqs } from "../../lib/faqs";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Favosa Farms about products, deliveries, pet care or farm services in Yenagoa, Bayelsa State.",
};

/* ── Leaf Accent Motif ── */
function LeafAccent() {
  return (
    <div className="section-leaf-accent" aria-hidden="true">
      <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
        <path d="M12 2C6.5 2 2 6.5 2 12c3.5 0 7-1.5 9-4.5 2 3 5.5 4.5 9 4.5 0-5.5-4.5-10-10-10Z" fill="#16964F" />
        <path d="M12 2v10" stroke="#0B3D28" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const contactCards = [
  {
    icon: "whatsapp",
    title: "Chat on WhatsApp",
    lines: ["Quickest way to reach us.", "We respond fast!"],
    action: { label: "CHAT NOW", href: "https://wa.me/2348073228022", external: true },
  },
  {
    icon: "phone",
    title: "Call Us",
    lines: ["+234 813 456 7890", "+234 813 456 7891"],
    action: { label: "CALL NOW", href: "tel:+2348134567890", external: false },
  },
  {
    icon: "email",
    title: "Email Us",
    lines: ["info@favosafarms.com"],
    action: { label: "SEND EMAIL", href: "mailto:info@favosafarms.com", external: false },
  },
  {
    icon: "location",
    title: "Visit Our Farm",
    lines: [
      "15 FINAPS Extension, off Alameiyeseigha Road,",
      "Okutuktu 569101, Bayelsa.",
    ],
    action: {
      label: "GET DIRECTIONS",
      href: `https://maps.google.com/?q=${encodeURIComponent(farmAddress.formatted)}`,
      external: true,
    },
  },
  {
    icon: "clock",
    title: "Business Hours",
    lines: ["Mon – Sat: 8:00am – 6:00pm", "Sunday: Closed"],
    action: { label: "VIEW HOURS", href: "#hours", external: false },
  },
];

const socialLinks = [
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/share/1BqQjKA3nL/", handle: "@favosafarms" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/favosafarms", handle: "@favosafarms" },
  { name: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@favosafarms", handle: "@favosafarms" },
  { name: "YouTube", icon: "youtube", href: "https://www.youtube.com/@favosafarms", handle: "Favosa Farms" },
];

function ContactIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    whatsapp: <><path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3.5 20l1.2-4.5a8.2 8.2 0 1 1 15.5-3.8Z" /><path d="M9 8.2c.3-.6.6-.6 1-.6h.5c.2 0 .4.1.5.5l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .6.4.7 1.2 1.5 2 1.9.3.2.5.2.7-.1l.7-.8c.2-.2.4-.3.7-.2l1.7.8c.3.2.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1 .6-1.6.5-1-.2-2.4-.8-3.8-2.1-1.2-1.1-2-2.5-2.2-3.4-.2-.8 0-1.6.3-2.1Z" fill="currentColor" stroke="none" /></>,
    phone: <path d="M7.2 3.5h2.5l1.2 4-1.8 1.8a15 15 0 0 0 5.6 5.6l1.8-1.8 4 1.2v2.5c0 1.2-1 2.2-2.2 2.2A16.3 16.3 0 0 1 5 5.7c0-1.2 1-2.2 2.2-2.2Z" />,
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    location: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 3.5" /></>,
    facebook: <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4Z" fill="currentColor" stroke="none" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /></>,
    tiktok: <><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
    youtube: <><rect x="2" y="7" width="20" height="14" rx="3" /><path d="m10 10 5 4-5 4V10Z" fill="currentColor" stroke="none" /></>,
  };

  return (
    <svg aria-hidden="true" className="contact-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main id="top" className="contact-page">

      {/* ── HERO BANNER: SPLIT LAYOUT MATCHING UI04 ── */}
      <section className="contact-hero-split">
        <div className="wrap contact-hero-grid">
          <div className="contact-hero-copy">
            <span className="contact-hero-eyebrow">CONTACT US</span>
            <h1 className="contact-hero-title">
              We&apos;re Here<br />To Help You
            </h1>
            <p className="contact-hero-desc">
              Have questions about our products or services? Want to book a consultation or visit the farm? We&apos;d love to hear from you.
            </p>
            <p className="contact-hero-script">
              Let&apos;s build a healthier future together.
            </p>
          </div>

          <div className="contact-hero-media">
            <div className="contact-hero-img-box">
              <Image
                src="/Images/vision-farm-sign.png"
                alt="Favosa Farms signpost and entrance"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 560px"
                className="contact-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── GET IN TOUCH CARDS (5 COLUMNS MATCHING UI04) ── */}
      <section className="contact-touch-section">
        <div className="wrap">
          <h2 className="contact-section-label">GET IN TOUCH</h2>
          <LeafAccent />
          <div className="contact-touch-grid">
            {contactCards.map((card) => (
              <div className="contact-touch-card" key={card.title}>
                <div className="contact-touch-icon">
                  <ContactIcon name={card.icon} />
                </div>
                <h3>{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <a
                  href={card.action.href}
                  className="contact-touch-btn"
                  {...(card.action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {card.action.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEND US A MESSAGE & FIND US ── */}
      <section className="contact-main-section">
        <div className="wrap contact-main-grid">

          {/* Left: Message Form */}
          <div className="contact-form-block">
            <h2 className="contact-section-label">SEND US A MESSAGE</h2>
            <LeafAccent />
            <p className="contact-form-intro">Fill out the form and we&apos;ll get back to you as soon as possible.</p>
            <ContactForm />
          </div>

          {/* Right: Map & Directions */}
          <div className="contact-map-block">
            <h2 className="contact-section-label">FIND US</h2>
            <LeafAccent />
            <div className="contact-map-frame">
              <iframe
                title="Favosa Farms location map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(farmAddress.formatted)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: 8 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="contact-map-note">
              {farmAddress.formatted}.
            </p>
            <div className="contact-map-hints">
              <div className="contact-map-hint">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m-4 12H21l-3-6H8v6Zm0 0H6" />
                </svg>
                <span>About 30 mins drive from Ogbia Town</span>
              </div>
              <div className="contact-map-hint">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a3 3 0 0 0-3-3H3l3 3-3 3h12a3 3 0 0 0 3-3Zm-4 8a3 3 0 0 1-3 3H4l3-3-3-3h11a3 3 0 0 1 3 3Z" />
                </svg>
                <span>Accessible by road and waterways</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ & CONNECT WITH US ── */}
      <section className="contact-faq-section" id="faq">
        <div className="wrap contact-faq-grid">

          {/* Left: FAQ Accordion */}
          <div className="contact-faq-block">
            <h2 className="contact-section-label">FREQUENTLY ASKED QUESTIONS</h2>
            <LeafAccent />
            <div className="contact-faq-list">
              {faqs.slice(0, 5).map((faq) => (
                <details className="contact-faq-item" key={faq.question}>
                  <summary className="contact-faq-summary">
                    {faq.question}
                    <span aria-hidden="true" className="contact-faq-chevron">›</span>
                  </summary>
                  <p className="contact-faq-answer">{faq.answer}</p>
                </details>
              ))}
            </div>
            <Link href="/faq" className="contact-faq-all">VIEW ALL FAQs</Link>
          </div>

          {/* Right: Connect With Us & Let's Work Together */}
          <div className="contact-social-block">
            <h2 className="contact-section-label">CONNECT WITH US</h2>
            <LeafAccent />
            <p className="contact-social-intro">Follow us on social media for farm updates, educational content and more!</p>
            <div className="contact-social-grid">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="contact-social-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                >
                  <div className="contact-social-icon">
                    <ContactIcon name={s.icon} />
                  </div>
                  <span>{s.handle}</span>
                </a>
              ))}
            </div>

            {/* Founder Let's Work Together Card matching UI04 */}
            <div className="contact-founder-card">
              <div className="contact-founder-inner">
                <div className="contact-founder-avatar-wrap">
                  <Image
                    src="/Images/founder-portrait.png"
                    alt="King Enienimfon Etuk - Founder Favosa Farms"
                    fill
                    sizes="90px"
                    className="contact-founder-avatar"
                  />
                </div>
                <div className="contact-founder-content">
                  <h3>Let&apos;s Work Together</h3>
                  <p>Whether you&apos;re a home buyer, aspiring farmer, or business partner, we are ready to partner with you for a better tomorrow.</p>
                  <Link href="/book-consultation" className="contact-founder-btn">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                      <rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M7.5 3v4M16.5 3v4M3.5 10h17M8 14h3v3H8z" />
                    </svg>
                    BOOK A CONSULTATION
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
