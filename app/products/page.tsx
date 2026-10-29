import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "../../components/PageBanner";
import { products } from "../../lib/content";

export const metadata: Metadata = {
  title: "Farm Products",
  description:
    "Explore Favosa Farms products — broilers, catfish, fresh eggs and quality dogs. Contact us to confirm current availability.",
};

export default function ProductsPage() {
  const available = products.filter(
    (p) => !p.availability.toLowerCase().includes("coming soon")
  );
  const coming = products.filter(
    (p) => p.availability.toLowerCase().includes("coming soon")
  );

  return (
    <main id="top">
      <PageBanner
        eyebrow="Our Products"
        title="Healthy Choices, Raised With Care"
        description="Explore our range of farm-fresh products. Availability changes — contact us to confirm before ordering."
        image="/Images/White-birds-optimized.jpg"
      />

      {/* Available products */}
      <section className="plist-section">
        <div className="wrap">
          <div className="plist-label">OUR PRODUCTS</div>
          <p className="plist-intro">
            We serve households, restaurants and food businesses across Yenagoa and surrounding communities. Reach out to confirm stock, quantities and delivery.
          </p>
          <div className="plist-grid">
            {available.map((product) => (
              <article className="plist-card" key={product.slug}>
                <div className="plist-card-image">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className="plist-img"
                    />
                  ) : (
                    <div className="plist-img-placeholder" aria-hidden="true">
                      {product.name}
                    </div>
                  )}
                </div>
                <div className="plist-card-body">
                  <h2>{product.name}</h2>
                  <p className="plist-tagline">{product.tagline}</p>
                  <p className="plist-summary">{product.summary}</p>
                  <p className="plist-availability">{product.availability}</p>
                  <div className="plist-card-actions">
                    <a
                      href={`https://wa.me/2348073228022?text=${encodeURIComponent(
                        `Hello Favosa Farms, I'd like to order ${product.name}.`
                      )}`}
                      className="plist-btn-order"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }}>
                        <path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.4 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1.1.6-1.8.5-1-.1-2.3-.7-3.7-1.9-1.2-1-2.1-2.4-2.3-3.5-.2-.8 0-1.5.5-2.1Z" fill="currentColor" />
                      </svg>
                      ORDER NOW
                    </a>
                    <Link href={`/products/${product.slug}`} className="plist-btn-details">
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      {coming.length > 0 && (
        <section className="plist-coming-section">
          <div className="wrap">
            <div className="plist-label">COMING SOON</div>
            <div className="plist-coming-grid">
              {coming.map((product) => (
                <article className="plist-coming-card" key={product.slug}>
                  <div className="plist-coming-badge">Coming Soon</div>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                  <a
                    href={`https://wa.me/2348073228022?text=${encodeURIComponent(
                      `Hello, I'd like to register interest in ${product.name} from Favosa Farms.`
                    )}`}
                    className="plist-coming-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Interest
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-band">
        <div className="wrap">
          <h2>Not sure what you need?</h2>
          <p>Talk to our team and we will help you choose the right product and quantity for your needs.</p>
          <div className="svc-cta-actions">
            <a
              href="https://wa.me/2348073228022"
              className="svc-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
            <Link href="/book-consultation" className="svc-btn-wa">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
