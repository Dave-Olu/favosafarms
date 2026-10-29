import type { Metadata } from "next";
import PageBanner from "../../components/PageBanner";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Book a farm consultation",
  description:
    "Talk with Favosa Farms about poultry, fish farming, farm setup, training or farm audits.",
};

export default function ConsultationPage() {
  return (
    <main id="top">
      <PageBanner
        description="Get practical guidance for setting up a farm, improving operations or planning your next production cycle."
        eyebrow="Farm consultation"
        image="/Images/White-birds-optimized.jpg"
        title="Start your farm journey with a plan"
      />
      <section className="page-content">
        <div className="wrap consultation-layout">
          <div className="consultation-copy">
            <p className="eyebrow">Work with our team</p>
            <h2>Advice shaped around your goals</h2>
            <p>
              Whether you are planning your first poultry pen or working to
              improve an existing fish farm, tell us about your goals and
              where you are in the process. We will follow up to discuss
              possible next steps and arrange a suitable session.
            </p>
            <ul className="consultation-steps">
              <li>Share your farm plans and the questions you need answered.</li>
              <li>We will contact you to discuss timing, format and scope.</li>
              <li>Meet remotely or on-farm, depending on your location and needs.</li>
            </ul>
            <p>
              Have a quick question? Call{" "}
              <a href="tel:+2348073228022">+234 807 322 8022</a> or{" "}
              <a href="https://wa.me/2348073228022">message us on WhatsApp</a>.
            </p>
          </div>
          <div className="contact-form-panel">
            <p className="eyebrow">Request a session</p>
            <h2>Tell us what you are planning</h2>
            <ContactForm consultation />
          </div>
        </div>
      </section>
    </main>
  );
}
