import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Favosa Farms, our commitment to healthy food, ethical farming practices, farmer education and our founder King Enienimfon Etuk.",
};

const missionPoints = [
  "We are committed to ethical farming practices.",
  "We prioritize animal health and welfare.",
  "We promote education, training and innovation.",
  "We build long-term relationships based on trust.",
];

const values = [
  {
    icon: "shield",
    title: "Integrity",
    description: "We do what is right, always.",
  },
  {
    icon: "rosette",
    title: "Quality",
    description: "We never compromise on quality.",
  },
  {
    icon: "graduation",
    title: "Education",
    description: "We teach, learn and empower.",
  },
  {
    icon: "leaf",
    title: "Sustainability",
    description: "We care for our land, animals and future.",
  },
];

const impactStats = [
  {
    icon: "chicken",
    metric: "50,000+",
    label: "Broilers Raised",
  },
  {
    icon: "fish",
    metric: "20,000+",
    label: "Catfish Produced",
  },
  {
    icon: "graduation",
    metric: "300+",
    label: "Farmers Trained",
  },
  {
    icon: "farm",
    metric: "150+",
    label: "Farms Supported",
  },
  {
    icon: "heart",
    metric: "Thousands",
    label: "Families Served",
  },
];

const farmPhotos = [
  {
    src: "/Images/gallery-broiler-house.png",
    alt: "Modern ventilated broiler poultry house with clean automated feeding line",
  },
  {
    src: "/Images/gallery-ponds-aerial.png",
    alt: "Aerial layout of freshwater catfish production ponds",
  },
  {
    src: "/Images/09-gallery-dogs-kennel.png",
    alt: "Healthy Rottweilers in well-ventilated farm kennel section",
  },
  {
    src: "/Images/chicks.png",
    alt: "Vibrant day-old broiler chicks under brooding warmth",
  },
  {
    src: "/Images/hero-farm-aerial-no-text.png",
    alt: "Panoramic aerial perspective of Favosa Farms facilities and vegetation",
  },
];

function AboutIcon({ name }: { name: string }) {
  if (name === "shield") {
    return (
      <svg aria-hidden="true" className="about-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (name === "rosette") {
    return (
      <svg aria-hidden="true" className="about-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    );
  }
  if (name === "graduation") {
    return (
      <svg aria-hidden="true" className="about-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    );
  }
  if (name === "leaf") {
    return (
      <svg aria-hidden="true" className="about-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    );
  }
  if (name === "chicken") {
    return (
      <svg aria-hidden="true" className="about-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.2 13.2a5.1 5.1 0 0 1 9.6 2.4c0 2.1-1.7 3.8-3.8 3.8H9.4a3.4 3.4 0 0 1-2.2-6.2Z" />
        <circle cx="15.3" cy="9.4" r="2.8" />
        <path d="m18 9.1 3 .9-2.8 1.3M14.1 6.7l-.8-2.2 2.2.8M10 19.4v1.8m4.4-1.8v1.8" />
      </svg>
    );
  }
  if (name === "fish") {
    return (
      <svg aria-hidden="true" className="about-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12s4-5.5 10-5.5S21 12 21 12s-2 5.5-8 5.5S3 12 3 12Z" />
        <path d="m3 12-2.2-3v6L3 12Zm7-2h.1m4.8 0c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4Z" />
      </svg>
    );
  }
  if (name === "farm") {
    return (
      <svg aria-hidden="true" className="about-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20 12 4l9 16v2H3v-2Z" />
        <path d="M8 22v-9h8v9" />
        <path d="M10 16h4" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg aria-hidden="true" className="about-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  }
  return null;
}

export default function AboutPage() {
  return (
    <main id="top">
      {/* 1. HERO SECTION */}
      <section aria-labelledby="about-hero-title" className="about-hero">
        <Image
          alt=""
          className="about-hero-image"
          fill
          priority
          sizes="100vw"
          src="/Images/hero-farm-aerial-no-text.png"
        />
        <div aria-hidden="true" className="about-hero-shade" />
        <div className="wrap about-hero-inner">
          <nav aria-label="Breadcrumb" className="about-breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">About Us</span>
          </nav>
          <div className="about-hero-copy">
            <h1 id="about-hero-title">About Favosa Farms</h1>
            <span aria-hidden="true" className="about-leaf-divider">◆</span>
            <h2>
              Our story. Our mission.<br />
              Our commitment to healthy living.
            </h2>
            <p>
              Favosa Farms was born out of a passion for producing healthy
              protein, building knowledge and raising a new generation of
              responsible farmers.
            </p>
            <Link className="about-hero-cta" href="#our-story">
              Our story <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section aria-labelledby="our-story-title" className="about-story-section" id="our-story">
        <div className="wrap about-story">
          <div className="about-story-copy">
            <p className="about-section-label">
              <span aria-hidden="true">◆</span> Our story
            </p>
            <h2 id="our-story-title">From a passion to a purpose</h2>
            <p>
              Our journey started with a simple belief - families deserve
              access to healthy, safe and responsibly produced protein.
            </p>
            <p>
              After years of experience in agriculture, and seeing the gaps in
              our food system, we made a decision to raise the standard.
            </p>
            <p>
              Today, Favosa Farms is more than a farm. It is a movement for
              healthier food, empowered farmers and a stronger future.
            </p>
          </div>
          <div aria-label="Life and work at Favosa Farms" className="about-story-gallery">
            <figure className="about-story-photo">
              <Image
                alt="Favosa Farms team member holding a healthy broiler in the poultry house"
                fill
                sizes="(max-width: 760px) 100vw, 24vw"
                src="/Images/story-broiler-man.png"
              />
            </figure>
            <figure className="about-story-photo">
              <Image
                alt="Catfish production ponds at the farm"
                fill
                sizes="(max-width: 760px) 100vw, 24vw"
                src="/Images/story-fish-ponds.png"
              />
            </figure>
            <figure className="about-story-photo">
              <Image
                alt="Favosa Farms team member caring for a trained dog"
                fill
                sizes="(max-width: 760px) 100vw, 24vw"
                src="/Images/story-man-with-dog.png"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 3. OUR MISSION & OUR VALUES SECTION */}
      <section aria-label="Our Mission and Values" className="about-mv-section">
        <div className="wrap about-mv-grid">
          {/* Left: Our Mission */}
          <div className="about-mission-card">
            <p className="about-section-label">
              <span aria-hidden="true">◆</span> Our mission
            </p>
            <h2 className="about-block-title">
              To produce healthy protein and empower people through agriculture.
            </h2>
            <ul className="about-mission-list">
              {missionPoints.map((point) => (
                <li key={point}>
                  <span aria-hidden="true" className="about-check-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Our Values */}
          <div className="about-values-card">
            <p className="about-section-label">
              <span aria-hidden="true">◆</span> Our values
            </p>
            <div className="about-values-grid">
              {values.map((v) => (
                <article className="about-value-item" key={v.title}>
                  <div className="about-value-icon-circle">
                    <AboutIcon name={v.icon} />
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR VISION & MEET THE FOUNDER SECTION */}
      <section aria-label="Our Vision and Leadership" className="about-vf-section">
        <div className="wrap about-vf-grid">
          {/* Left: Our Vision */}
          <div className="about-vision-card">
            <p className="about-section-label">
              <span aria-hidden="true">◆</span> Our vision
            </p>
            <h2 className="about-block-title">
              A future where every family has access to healthy protein and every farmer thrives.
            </h2>
            <div className="about-vision-photo">
              <Image
                alt="Favosa Farms entrance signboard set amidst lush green trees"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                src="/Images/vision-farm-sign.png"
              />
            </div>
          </div>

          {/* Right: Meet The Founder */}
          <div className="about-founder-card">
            <p className="about-section-label">
              <span aria-hidden="true">◆</span> Meet the founder
            </p>
            <h2 className="about-block-title">King Enienimfon Etuk</h2>
            <div className="about-founder-inner">
              <div className="about-founder-copy">
                <p>
                  A farmer, educator and animal lover with a deep passion for
                  agriculture and rural development.
                </p>
                <p>
                  He believes that the transformation of our food system begins
                  with healthy practices, continuous learning and a heart for impact.
                </p>
                <p>
                  Through Favosa Farms, he is committed to raising healthy
                  animals, empowering farmers and building a legacy of excellence.
                </p>
              </div>
              <div className="about-founder-photo">
                <Image
                  alt="King Enienimfon Etuk, Founder of Favosa Farms"
                  fill
                  sizes="(max-width: 760px) 100vw, 240px"
                  src="/Images/founder-portrait.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR IMPACT SO FAR SECTION */}
      <section aria-label="Our Impact Metrics" className="about-impact-section">
        <div className="wrap">
          <div className="about-impact-header">
            <p className="about-impact-label">
              <span aria-hidden="true">◆</span> Our impact so far <span aria-hidden="true">◆</span>
            </p>
          </div>
          <div className="about-impact-grid">
            {impactStats.map((item) => (
              <div className="about-impact-item" key={item.label}>
                <div className="about-impact-icon-circle">
                  <AboutIcon name={item.icon} />
                </div>
                <div className="about-impact-stat">{item.metric}</div>
                <div className="about-impact-text">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR FARM GALLERY SECTION */}
      <section aria-labelledby="our-farm-title" className="about-farm-section">
        <div className="wrap">
          <div className="about-farm-header">
            <h2 id="our-farm-title">Our Farm</h2>
            <span aria-hidden="true" className="about-farm-leaf">🍃</span>
          </div>

          <div aria-label="Farm photo gallery" className="about-farm-grid">
            {farmPhotos.map((photo, index) => (
              <figure className="about-farm-tile" key={index}>
                <Image
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 20vw"
                  src={photo.src}
                />
              </figure>
            ))}
          </div>

          <div className="about-farm-cta-wrap">
            <Link className="about-farm-cta" href="/products">
              View more photos &amp; videos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
