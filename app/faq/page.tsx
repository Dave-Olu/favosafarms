import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "../../components/PageBanner";
import { faqs } from "../../lib/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers about Favosa Farms products, orders, delivery, farm visits and agricultural services.",
};

export default function FaqPage() {
  return (
    <main id="top">
      <PageBanner
        eyebrow="FAQs"
        title="Answers to Your Questions"
        description="Find helpful information about our products, orders, farm visits and services. If you need more help, our team is happy to talk."
        image="/Images/hero-farm-aerial-no-text.png"
      />

      <section className="faq-page-section">
        <div className="wrap faq-page-content">
          <div className="faq-page-intro">
            <p className="eyebrow">How can we help?</p>
            <h2>Frequently asked questions</h2>
            <p>
              Select a question to see more. For current product availability
              and delivery arrangements, please contact us directly.
            </p>
          </div>

          <div className="contact-faq-list">
            {faqs.map((faq) => (
              <details className="contact-faq-item" key={faq.question}>
                <summary className="contact-faq-summary">
                  {faq.question}
                  <span aria-hidden="true" className="contact-faq-chevron">
                    ›
                  </span>
                </summary>
                <p className="contact-faq-answer">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="faq-page-cta">
            <h2>Still have a question?</h2>
            <p>Get in touch and we&apos;ll be glad to help.</p>
            <div className="svc-cta-actions">
              <Link className="svc-btn-primary" href="/contact">
                Contact Us
              </Link>
              <Link className="svc-btn-wa" href="/book-consultation">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
