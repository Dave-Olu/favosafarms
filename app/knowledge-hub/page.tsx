import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "../../components/PageBanner";
import { articles } from "../../lib/content";

export const metadata: Metadata = {
  title: "Knowledge hub",
  description:
    "Practical reading on poultry, fish farming and food safety from Favosa Farms.",
};

export default function KnowledgeHubPage() {
  return (
    <main id="top">
      <PageBanner
        description="Useful ideas and practical reading for farmers, food businesses and families."
        eyebrow="Knowledge hub"
        image="/Images/eggs-optimized.jpg"
        title="Learn, apply and grow"
      />
      <section className="page-content">
        <div className="wrap">
          <div className="page-intro">
            <p className="eyebrow">Articles and guides</p>
            <h2>Knowledge for healthier farms and food</h2>
            <p>
              Explore introductory resources from Favosa Farms. For advice
              specific to your farm, conditions or food business, speak with a
              qualified local professional.
            </p>
          </div>
          <div className="article-grid">
            {articles.map((article) => (
              <article className="article-card" key={article.slug}>
                <div className="article-card-copy">
                  <p className="eyebrow">{article.category}</p>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <Link
                    className="text-link"
                    href={`/knowledge-hub/${article.slug}`}
                  >
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
