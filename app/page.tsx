import Link from "next/link";
import ProductCarousel from "../components/ProductCarousel";
import OrderNowButton from "../components/OrderNowButton";
import { formatWhatsappNumber, getBusinessSettings } from "../lib/cms";
import { articles } from "../lib/content";

const perks = [
  {
    icon: "shield",
    title: "Healthy & Safe",
    description: "We don't cut corners on what matters most.",
  },
  {
    icon: "leaf",
    title: "Ethical Farming",
    description: "Responsible practices from start to finish.",
  },
  {
    icon: "farmer",
    title: "Farmer Education",
    description: "We train and empower willing farmers.",
  },
  {
    icon: "heart",
    title: "Family Focused",
    description: "Producing what we are proud to feed our families.",
  },
] as const;

type PromoIconName = (typeof perks)[number]["icon"];

function PromoIcon({ name }: { name: PromoIconName }) {
  const paths = {
    shield: (
      <>
        <path d="M12 2.5 20 5v6.1c0 5.1-3.4 8.7-8 10.4-4.6-1.7-8-5.3-8-10.4V5l8-2.5Z" />
        <path d="m8.5 11.8 2.3 2.3 4.8-5" />
      </>
    ),
    leaf: (
      <>
        <path d="M20.5 3.5C11 3.3 5.1 5.4 4 11.1c-.8 4 2.7 6.8 6.2 5.3 5-2.1 7-7.7 10.3-12.9Z" />
        <path d="M3.5 21c2.7-5.3 6.2-8.1 11.2-10.7" />
      </>
    ),
    farmer: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M6.5 20v-2.1a5.5 5.5 0 0 1 11 0V20M4 20h16M7.2 3.5 12 2l4.8 1.5" />
      </>
    ),
    heart: (
      <path d="M20.8 8.8c0 5.3-8.8 10.4-8.8 10.4S3.2 14.1 3.2 8.8a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z" />
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="promo-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}

const services = [
  {
    name: "Farm Setup",
    description: "Complete guidance in setting up your poultry, fish or integrated farm.",
    icon: "farm",
  },
  {
    name: "Consultancy",
    description: "Expert advice to grow your farm the right way and avoid costly mistakes.",
    icon: "consultancy",
  },
  {
    name: "Training",
    description: "Practical training for individuals, students and aspiring farmers.",
    icon: "training",
  },
  {
    name: "Farm Audit",
    description: "We evaluate your farm operations and help improve better results.",
    icon: "audit",
  },
] as const;

type ServiceIconName = (typeof services)[number]["icon"];

function ServiceIcon({ name }: { name: ServiceIconName }) {
  const paths: Record<ServiceIconName, React.ReactNode> = {
    farm: <><path d="M3 20 12 4l9 16v2H3v-2Z" /><path d="M8 22v-9h8v9" /><path d="M10 16h4" /></>,
    consultancy: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 9h.01M12 9h.01M16 9h.01" /></>,
    training: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></>,
    audit: <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      className="service-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const articleImages: Record<string, string> = {
  "poultry-feed-and-growth": "/Images/feed-grain.png",
  "planning-a-catfish-farm": "/Images/catfish-farm-pond.png",
  "safe-food-handling": "/Images/chicks.png",
};

const articleTeasers: Record<string, string> = {
  "poultry-feed-and-growth": "Better feed supports healthy birds and stronger returns.",
  "planning-a-catfish-farm": "Plan ahead for healthy fish and reliable harvests.",
  "safe-food-handling": "Simple habits help keep food safe from farm to kitchen.",
};

export default async function HomePage() {
  const business = await getBusinessSettings();
  const whatsappPhone = formatWhatsappNumber(business.whatsapp_phone);

  return (
    <main className="page-home">
      <section className="home-hero-shell">
        <div className="hero-content wrap">
          <div className="hero-copy">
            <p className="hero-kicker">Healthy Protein</p>
            <h1>You Can <span>Trust</span></h1>
            <p className="hero-subtitle">
              Ethically raised broilers, premium catfish and quality dogs – for healthy families and a better tomorrow.
            </p>
            <div className="hero-actions">
              <OrderNowButton
                className="hero-btn-primary"
                whatsappPhone={whatsappPhone}
              >
                <svg aria-hidden="true" className="hero-button-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.4 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1.1.6-1.8.5-1-.1-2.3-.7-3.7-1.9-1.2-1-2.1-2.4-2.3-3.5-.2-.8 0-1.5.5-2.1Z" fill="currentColor" />
                </svg>
                ORDER NOW
              </OrderNowButton>
              <a className="hero-btn-outline" href="/book-consultation">
                <svg aria-hidden="true" className="hero-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="5" width="17" height="16" rx="2" />
                  <path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17M8 13h2m4 0h2m-8 4h2m4 0h2" />
                </svg>
                BOOK CONSULTATION
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="promo-strip-wrap">
        <div className="promo-strip wrap">
          {perks.map((perk) => (
            <div className="promo-item" key={perk.title}>
              <div className="promo-icon-circle">
                <PromoIcon name={perk.icon} />
              </div>
              <div className="promo-copy">
                <h3>{perk.title}</h3>
                <p>{perk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="products-section wrap">
        <div className="section-heading centered">
          <p>Our products</p>
          <h2>Premium Quality. Always.</h2>
        </div>

        <ProductCarousel />
      </section>

      <section className="services-section">
        <div className="services-inner wrap">
          <div className="section-heading centered">
            <p>Our services</p>
            <h2>We Help You Succeed</h2>
            <span className="section-leaf" aria-hidden="true">🌿</span>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.name}>
                <div className="service-icon-circle">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </article>
            ))}          </div>

          <div className="cta-inline-wrap">
            <a className="home-explore-btn" href="/services">
              EXPLORE ALL SERVICES
            </a>
          </div>
        </div>
      </section>

      <section className="knowledge-section wrap">
        <div className="section-heading centered">
          <p>Knowledge hub</p>
          <h2>Learn. Apply. Grow.</h2>
        </div>

        <div className="knowledge-grid">
          {articles.map((article) => (
            <article className="knowledge-card" key={article.slug}>
              <div className="knowledge-image-wrap">
                <img
                  alt=""
                  className="knowledge-image"
                  src={articleImages[article.slug]}
                />
                <span className="knowledge-tag">{article.category}</span>
              </div>
              <div className="knowledge-body">
                <h3>{article.title}</h3>
                <p>{articleTeasers[article.slug]}</p>
                <Link className="read-more" href={`/knowledge-hub/${article.slug}`}>
                  Read More →
                </Link>
              </div>
            </article>
          ))}
          <article className="knowledge-card hub-card">
            <div className="hub-content">
              <svg
                aria-hidden="true"
                className="hub-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
              >
                <path d="M12 7v14m0-14C9.8 5.1 6.6 4.4 3 5v14c3.6-.6 6.8.1 9 2m0-14c2.2-1.9 5.4-2.6 9-2v14c-3.6-.6-6.8.1-9 2" />
              </svg>
              <p>More articles, videos and farm tips waiting for you.</p>
              <Link className="hub-link" href="/knowledge-hub">
                Visit hub
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="work-together-wrap">
        <div className="work-together wrap">
          <div className="work-copy">
            <div className="work-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="15" r="7" />
                <path d="M10 40v-4a14 14 0 0 1 28 0v4H10Z" />
                <path d="M9 16a6 6 0 0 0 0 12m30-12a6 6 0 0 1 0 12M4 39v-3a9 9 0 0 1 4-7m36 10v-3a9 9 0 0 0-4-7" />
              </svg>
            </div>
            <div>
              <h2>Let&apos;s Work Together</h2>
              <p>Whether you want healthy protein, expert advice, or practical farm training, we are here for you.</p>
            </div>
          </div>

          <div className="work-actions">
            <a className="work-btn-outline" href="/book-consultation">
              <svg aria-hidden="true" className="hero-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3.5" y="5" width="17" height="16" rx="2" />
                <path d="M7.5 3v4M16.5 3v4M3.5 10h17M8 14h3v3H8z" />
              </svg>
              BOOK CONSULTATION
            </a>
            <a className="work-btn-wa" href="https://wa.me/2348073228022" rel="noopener noreferrer" target="_blank">
              <svg aria-hidden="true" className="hero-button-icon" viewBox="0 0 24 24" fill="none">
                <path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.4 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1.1.6-1.8.5-1-.1-2.3-.7-3.7-1.9-1.2-1-2.1-2.4-2.3-3.5-.2-.8 0-1.5.5-2.1Z" fill="currentColor" />
              </svg>
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
