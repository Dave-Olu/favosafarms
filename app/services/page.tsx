import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "../../components/PageBanner";

export const metadata: Metadata = {
  title: "Farm Services",
  description:
    "Farm setup, poultry and fish consultancy, training and farm audits from Favosa Farms.",
};

const services = [
  {
    slug: "farm-setup",
    title: "Farm Setup",
    description:
      "We help you set up a profitable and sustainable farm from start to finish. From site assessment to stocking, we guide every step.",
    icon: "tractor",
    details: [
      "Site selection and evaluation",
      "Farm design and planning",
      "Equipment and infrastructure guidance",
      "Stocking and startup support",
    ],
  },
  {
    slug: "consultancy",
    title: "Consultancy",
    description:
      "Expert advice to grow your farm the right way and avoid costly mistakes. We analyse your current situation and recommend improvements.",
    icon: "chat",
    details: [
      "Poultry management consulting",
      "Fish farming advisory",
      "Feed and nutrition planning",
      "Disease prevention strategies",
    ],
  },
  {
    slug: "training",
    title: "Training",
    description:
      "Practical training for individuals, students and aspiring farmers. Build your skills and confidence in modern farming practices.",
    icon: "graduation",
    details: [
      "On-farm practical sessions",
      "Group and individual programmes",
      "Poultry and fish farming courses",
      "Business and record-keeping skills",
    ],
  },
  {
    slug: "farm-audit",
    title: "Farm Audit",
    description:
      "We evaluate your farm operations and identify areas where better records, organisation or management can improve your results.",
    icon: "clipboard",
    details: [
      "Full operations review",
      "Record and data assessment",
      "Biosecurity evaluation",
      "Improvement report and roadmap",
    ],
  },
];

const processSteps = [
  { num: "01", title: "Contact Us", description: "Reach out via WhatsApp, phone or our contact form to describe your needs." },
  { num: "02", title: "Consultation Call", description: "We schedule a discovery call to understand your farm goals and challenges." },
  { num: "03", title: "Proposal & Plan", description: "We prepare a tailored plan and outline the scope of the engagement." },
  { num: "04", title: "Delivery & Support", description: "We deliver the service on-farm or remotely and provide follow-up support." },
];

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    tractor: (
      <><path d="M3 20h18M7 20V9l5-6h5l1 6h2v5H7ZM7 14h12M12 9v5" /></>
    ),
    chat: (
      <><path d="M4 10a9 9 0 0 1 9-9h4a9 9 0 0 1 0 18h-1l-7 4v-4A9 9 0 0 1 4 10Z" /><path d="M9 10h.01M13 10h.01M17 10h.01" /></>
    ),
    graduation: (
      <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></>
    ),
    clipboard: (
      <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></>
    ),
  };
  return (
    <svg aria-hidden="true" className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name] ?? null}
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <main id="top">
      {/* BANNER */}
      <PageBanner
        eyebrow="Our Services"
        title="We Help You and Your Farm Succeed"
        description="Practical farm guidance to help you plan, improve your operations and make informed decisions at every stage."
        image="/Images/hero-farm-aerial-no-text.png"
      />

      {/* SERVICES GRID */}
      <section className="svc-list-section">
        <div className="wrap">
          <div className="svc-section-label">WHAT WE OFFER</div>
          <p className="svc-intro">
            Our services are designed around your goals. Whether you are starting from scratch or improving an existing operation, we have a programme to support you.
          </p>
          <div className="svc-grid">
            {services.map((service) => (
              <article className="svc-card" key={service.slug}>
                <div className="svc-icon-circle">
                  <ServiceIcon name={service.icon} />
                </div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul className="svc-detail-list">
                  {service.details.map((d) => (
                    <li key={d}>
                      <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="svc-check">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.54 5.46-4.25 4.25-1.83-1.83a.75.75 0 0 0-1.06 1.06l2.36 2.36a.75.75 0 0 0 1.06 0l4.78-4.78a.75.75 0 1 0-1.06-1.06Z" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
                <Link href="/book-consultation" className="svc-card-cta">
                  Book This Service →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="svc-process-section">
        <div className="wrap">
          <div className="svc-section-label">HOW IT WORKS</div>
          <h2 className="svc-process-title">Simple Steps to Get Started</h2>
          <div className="svc-process-grid">
            {processSteps.map((step) => (
              <div className="svc-process-card" key={step.num}>
                <div className="svc-process-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="wrap">
          <h2>Ready to work on your farm plans?</h2>
          <p>
            Tell us what you are building or improving and we will discuss the right next step.
          </p>
          <div className="svc-cta-actions">
            <Link className="svc-btn-primary" href="/book-consultation">
              Book a Consultation
            </Link>
            <a className="svc-btn-wa" href="https://wa.me/2348073228022" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                <path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.4 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1.1.6-1.8.5-1-.1-2.3-.7-3.7-1.9-1.2-1-2.1-2.4-2.3-3.5-.2-.8 0-1.5.5-2.1Z" fill="currentColor" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
