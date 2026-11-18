import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "../../components/PageBanner";
import { customerReviews } from "../../lib/content";

export const metadata: Metadata = {
  title: "Success stories",
  description:
    "Feedback from households and farmers who have worked with Favosa Farms.",
};

export default function SuccessStoriesPage() {
  return (
    <main id="top">
      <PageBanner
        description="We value the relationships we build with households, restaurants and farmers in our community."
        eyebrow="Growing together"
        image="/Images/man-doing-household-tasks-optimized.jpg"
        title="Trusted by our community"
      />
      <section className="page-content">
        <div className="wrap">
          <div className="page-intro">
            <p className="eyebrow">Customer feedback</p>
            <h2>What customers have shared</h2>
            <p>
              The feedback below reflects customers&apos; experiences with our
              products and consultation services.
            </p>
          </div>
          <div className="story-grid">
            {customerReviews.map((item) => (
              <article className="story-card" key={item.name}>
                <blockquote>{item.quote}</blockquote>
                <cite>
                  <strong>{item.name}</strong>
                  <br />
                  {item.context}
                </cite>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about">
        <div className="wrap split-section">
          <div className="content-copy">
            <p className="eyebrow">Farm projects and case studies</p>
            <h2>Every farm has its own story</h2>
            <p>
              Farm results depend on local conditions, resources and decisions.
              We do not publish project details without permission. If you are
              planning or improving a farm, our team can discuss your goals and
              the kind of support available.
            </p>
            <Link className="text-link" href="/book-consultation">
              Talk with our team
            </Link>
          </div>
          <div className="info-panel">
            <h2>Have a Favosa Farms experience to share?</h2>
            <p>
              We welcome feedback from customers and farmers. Send us a message
              and let us know if we may share your story.
            </p>
            <Link className="text-link" href="/contact">
              Share your feedback
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
