import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../lib/content";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return product ? { title: product.name, description: product.summary } : {};
}

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

/* ── SVG Icons ── */
function IconShieldCheck() {
  return (
    <svg aria-hidden="true" className="pd-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconLeaf() {
  return (
    <svg aria-hidden="true" className="pd-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 17 4.5s-.5 1.5-1.6 7.2A7 7 0 0 1 11 20Z" />
      <path d="M11 20v-7" />
    </svg>
  );
}

function IconCleanBarn() {
  return (
    <svg aria-hidden="true" className="pd-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
    </svg>
  );
}

function IconFarmer() {
  return (
    <svg aria-hidden="true" className="pd-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
      <path d="m15 11 2 2 4-4" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg aria-hidden="true" className="pd-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function IconMedal() {
  return (
    <svg aria-hidden="true" className="pd-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="m8.2 13.8-3.2 7.2 7-3 7 3-3.2-7.2" />
    </svg>
  );
}

function IconFamily() {
  return (
    <svg aria-hidden="true" className="pd-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg aria-hidden="true" className="pd-btn-icon" viewBox="0 0 24 24" fill="none">
      <path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.4 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1.1.6-1.8.5-1-.1-2.3-.7-3.7-1.9-1.2-1-2.1-2.4-2.3-3.5-.2-.8 0-1.5.5-2.1Z" fill="currentColor" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg aria-hidden="true" className="pd-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.2 3.5h2.5l1.2 4-1.8 1.8a15 15 0 0 0 5.6 5.6l1.8-1.8 4 1.2v2.5c0 1.2-1 2.2-2.2 2.2A16.3 16.3 0 0 1 5 5.7c0-1.2 1-2.2 2.2-2.2Z" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg aria-hidden="true" className="pd-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function OrderOptionIcon({ index }: { index: number }) {
  if (index === 0) {
    // Clock / Bird
    return (
      <svg aria-hidden="true" className="pd-order-opt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (index === 1) {
    // Cutlery / Processed
    return (
      <svg aria-hidden="true" className="pd-order-opt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2v20M6 2v7a3 3 0 0 0 6 0V2M9 12v10" />
      </svg>
    );
  }
  // Delivery truck / bulk
  return (
    <svg aria-hidden="true" className="pd-order-opt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m-4 12H21l-3-6H8v6Zm0 0H6" />
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function getWhyIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("safe") || t.includes("healthy")) return <IconShieldCheck />;
  if (t.includes("feed") || t.includes("nutrition")) return <IconLeaf />;
  if (t.includes("clean") || t.includes("hygienic")) return <IconCleanBarn />;
  if (t.includes("care") || t.includes("expert") || t.includes("manage")) return <IconFarmer />;
  if (t.includes("quality") || t.includes("premium")) return <IconMedal />;
  if (t.includes("family") || t.includes("people")) return <IconFamily />;
  return <IconShieldCheck />;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const isSoon = product.availability.toLowerCase().includes("coming soon");
  const waText = encodeURIComponent(`Hello Favosa Farms, I would like to enquire about ${product.name}.`);
  const waHref = `https://wa.me/2348073228022?text=${waText}`;

  return (
    <main id="top" className="pd-page">

      {/* ── HERO SECTION ── */}
      <section className="pd-hero-split">
        <div className="wrap pd-hero-container">

          {/* Left: Breadcrumbs + Headline + Actions */}
          <div className="pd-hero-left">
            <nav className="pd-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/products">Products</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{product.name}</span>
            </nav>

            <h1 className="pd-hero-title">{product.name}</h1>
            <p className="pd-hero-tagline">{product.tagline}</p>
            <p className="pd-hero-desc">{product.description}</p>

            <div className="pd-hero-actions">
              {!isSoon ? (
                <>
                  <a href={waHref} className="pd-btn-wa" target="_blank" rel="noopener noreferrer">
                    <IconWhatsApp />
                    ORDER NOW
                  </a>
                  <a href="/products" className="pd-btn-outline">
                    <IconGrid />
                    VIEW PRICING
                  </a>
                </>
              ) : (
                <a href={waHref} className="pd-btn-wa" target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp />
                  Register Interest
                </a>
              )}
            </div>
          </div>

          {/* Right: Media + Trust Badges */}
          <div className="pd-hero-right">
            <div className="pd-hero-media-wrapper">
              {product.image && (
                <div className="pd-hero-img-box">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 540px"
                    className="pd-hero-main-img"
                  />
                </div>
              )}

              {/* Floating Dark Green Trust Card */}
              {!isSoon && (
                <div className="pd-trust-card">
                  <div className="pd-trust-item"><IconShieldCheck /> <span>No Harmful Drugs</span></div>
                  <div className="pd-trust-item"><IconLeaf /> <span>Balanced Nutrition</span></div>
                  <div className="pd-trust-item"><IconCleanBarn /> <span>Clean Environment</span></div>
                  <div className="pd-trust-item"><IconFarmer /> <span>Proper Management</span></div>
                  <div className="pd-trust-item"><IconHeart /> <span>Healthy Protein</span></div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── WHY CHOOSE OUR BROILERS? ── */}
      {product.whyChoose && product.whyChoose.length > 0 && (
        <section className="pd-why-section">
          <div className="wrap">
            <h2 className="pd-section-label">Why Choose Our {product.name}?</h2>
            <LeafAccent />
            <div className="pd-why-grid">
              {product.whyChoose.map((item) => (
                <div className="pd-why-card" key={item.title}>
                  <div className="pd-why-icon-circle" aria-hidden="true">
                    {getWhyIcon(item.title)}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OUR RAISING PROCESS ── */}
      {product.raisingProcess && product.raisingProcess.length > 0 && (
        <section className="pd-process-section">
          <div className="wrap">
            <h2 className="pd-section-label">Our Raising Process</h2>
            <LeafAccent />
            <div className="pd-process-track">
              {product.raisingProcess.map((step, i) => (
                <div className="pd-process-step" key={step.step}>
                  <div className="pd-process-img-wrap">
                    {step.image ? (
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="140px"
                        className="pd-process-img"
                      />
                    ) : (
                      <div className="pd-process-img-placeholder" aria-hidden="true" />
                    )}
                    <span className="pd-process-num">{step.step}</span>
                  </div>
                  {i < product.raisingProcess!.length - 1 && (
                    <div className="pd-process-arrow" aria-hidden="true">›</div>
                  )}
                  <div className="pd-process-copy">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── GALLERY & ORDER OUR BROILERS ── */}
      {((product.galleryImages && product.galleryImages.length > 0) || product.orderOptions) && (
        <section className="pd-gallery-order-section">
          <div className="wrap pd-gallery-order-grid">

            {/* Left: Gallery */}
            {product.galleryImages && product.galleryImages.length > 0 && (
              <div className="pd-gallery-block">
                <h2 className="pd-section-label">Gallery</h2>
                <LeafAccent />
                <div className="pd-gallery-grid">
                  {product.galleryImages.slice(0, 6).map((img) => (
                    <div className="pd-gallery-tile" key={img.src}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 760px) 45vw, 220px"
                        className="pd-gallery-img"
                      />
                    </div>
                  ))}
                </div>
                <a href={waHref} className="pd-gallery-cta" target="_blank" rel="noopener noreferrer">
                  VIEW MORE PHOTOS &amp; VIDEOS
                </a>
              </div>
            )}

            {/* Right: Order Panel */}
            {product.orderOptions && (
              <div className="pd-order-panel">
                <h2 className="pd-section-label">Order Our {product.name}</h2>
                <LeafAccent />
                <p className="pd-order-desc">
                  We are always ready to supply healthy {product.name.toLowerCase()} for your home, event, restaurant or business.
                </p>
                <ul className="pd-order-options">
                  {product.orderOptions.map((opt, idx) => (
                    <li key={opt}>
                      <OrderOptionIcon index={idx} />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
                <div className="pd-order-buttons">
                  <a href={waHref} className="pd-btn-wa pd-btn-wa--full" target="_blank" rel="noopener noreferrer">
                    <IconWhatsApp />
                    CHAT ON WHATSAPP
                  </a>
                  <a href="tel:+2348073228022" className="pd-btn-call">
                    <IconPhone />
                    CALL US NOW
                  </a>
                </div>
                <p className="pd-order-note">We respond quickly and are here to serve you.</p>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ── FAQ & OUR PROMISE ── */}
      {(product.faqs && product.faqs.length > 0) || product.promiseLine ? (
        <section className="pd-faq-promise-section">
          <div className="wrap pd-faq-promise-grid">

            {/* Left: FAQ Accordion */}
            {product.faqs && product.faqs.length > 0 && (
              <div className="pd-faq-block">
                <h2 className="pd-section-label">Frequently Asked Questions</h2>
                <LeafAccent />
                <div className="pd-faq-list">
                  {product.faqs.map((faq) => (
                    <details className="pd-faq-item" key={faq.question}>
                      <summary className="pd-faq-summary">
                        {faq.question}
                        <span className="pd-faq-chevron" aria-hidden="true">›</span>
                      </summary>
                      <p className="pd-faq-answer">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Right: Our Promise Box */}
            {product.promiseLine && (
              <div className="pd-promise-card">
                <div className="pd-promise-icon" aria-hidden="true">
                  <IconShieldCheck />
                </div>
                <h3>Our Promise</h3>
                <p className="pd-promise-text">{product.promiseLine}</p>
                <p className="pd-promise-author">— Favosa Farms</p>
              </div>
            )}

          </div>
        </section>
      ) : null}

      {/* ── Back to products ── */}
      <section className="pd-back-section">
        <div className="wrap">
          <Link href="/products" className="pd-back-link">
            ← Back to all products
          </Link>
        </div>
      </section>

    </main>
  );
}
