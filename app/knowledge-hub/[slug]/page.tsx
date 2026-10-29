import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "../../../components/PageBanner";
import { articles } from "../../../lib/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  return article
    ? {
        title: article.title,
        description: article.excerpt,
      }
    : {};
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main id="top">
      <PageBanner
        description={article.excerpt}
        eyebrow={`Knowledge hub / ${article.category}`}
        image="/Images/eggs-optimized.jpg"
        title={article.title}
      />
      <article className="page-content">
        <div className="wrap article-body">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="article-back">
            <Link className="text-link" href="/knowledge-hub">
              Back to the knowledge hub
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
