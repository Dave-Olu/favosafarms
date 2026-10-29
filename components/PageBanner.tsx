import Image from "next/image";

type PageBannerProps = {
  description: string;
  eyebrow: string;
  image?: string;
  title: string;
};

export default function PageBanner({
  description,
  eyebrow,
  image,
  title,
}: PageBannerProps) {
  return (
    <header className="page-banner">
      {image ? (
        <Image
          alt=""
          className="page-banner-image"
          fill
          priority
          sizes="100vw"
          src={image}
        />
      ) : null}
      <div className="page-banner-shade" />
      <div className="wrap page-banner-content">
        <p className="page-banner-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-banner-description">{description}</p>
      </div>
    </header>
  );
}
