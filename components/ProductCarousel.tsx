"use client";

import { useRef } from "react";
import Link from "next/link";

const productCards = [
  {
    slug: "broilers",
    name: "Broilers",
    description: "Raised with wholesome feed, proper management and zero compromise on bird health.",
    image: "/Images/broilers.png",
    label: "VIEW BROILERS",
    icon: "chicken",
  },
  {
    slug: "catfish",
    name: "Catfish",
    description: "Fresh, clean and farmed with the right nutrition and water quality.",
    image: "/Images/catfish.png",
    label: "VIEW CATFISH",
    icon: "fish",
  },
  {
    slug: "dogs",
    name: "Dogs",
    description: "Healthy, well-bred and socialized dogs from trusted bloodlines.",
    image: "/Images/dog-rottweiler.png",
    label: "VIEW DOGS",
    icon: "dog",
  },
] as const;

type ProductIconName = (typeof productCards)[number]["icon"];

function ProductIcon({ name }: { name: ProductIconName }) {
  const paths = {
    chicken: (
      <>
        <path d="M7.2 13.2a5.1 5.1 0 0 1 9.6 2.4c0 2.1-1.7 3.8-3.8 3.8H9.4a3.4 3.4 0 0 1-2.2-6.2Z" />
        <circle cx="15.3" cy="9.4" r="2.8" />
        <path d="m18 9.1 3 .9-2.8 1.3M14.1 6.7l-.8-2.2 2.2.8M10 19.4v1.8m4.4-1.8v1.8" />
      </>
    ),
    fish: (
      <>
        <path d="M3 12s4-5.5 10-5.5S21 12 21 12s-2 5.5-8 5.5S3 12 3 12Z" />
        <path d="m3 12-2.2-3v6L3 12Zm7-2h.1m4.8 0c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4Z" />
      </>
    ),
    dog: (
      <>
        <path d="M8.1 8.4 5 5.8l-.8 5.1a7.8 7.8 0 0 0 15.6 0L19 5.8l-3.1 2.6" />
        <path d="M9 13h.1m5.8 0h.1M10 16c1.2 1 2.8 1 4 0" />
        <path d="M9 8.5c.8-1 1.8-1.5 3-1.5s2.2.5 3 1.5" />
      </>
    ),
    turkey: (
      <>
        <path d="M12 12.5c-3.4 0-5.8 2.1-5.8 4.6 0 2.1 2.5 3.4 5.8 3.4s5.8-1.3 5.8-3.4c0-2.5-2.4-4.6-5.8-4.6Z" />
        <path d="M12 12.5c-1.4-2.6-.1-5.2 2-5.2 1.3 0 2 1.2 1.7 2.4 1.9-2.2 4.4-1.4 4.4.5 0 1.3-1.4 2.1-3 2.1M10.4 20.3v1.5m3.2-1.5v1.5M7 14.2c-2.5-.4-4.5-2.2-4.5-4.2 0-1.3.8-2.2 1.8-2.2 1.4 0 1.8 1.5 1.4 2.5" />
        <path d="M15.9 16.5h.1" />
      </>
    ),
  };

  return (
    <span aria-hidden="true" className="product-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
    </span>
  );
}

export default function ProductCarousel() {
  const productGridRef = useRef<HTMLDivElement>(null);

  function scrollProducts(direction: -1 | 1) {
    const grid = productGridRef.current;
    const firstCard = grid?.querySelector<HTMLElement>(".product-card");

    if (!grid || !firstCard) {
      return;
    }

    const gap = Number.parseFloat(window.getComputedStyle(grid).columnGap) || 0;
    grid.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: "smooth",
    });
  }

  return (
    <div className="product-showcase">
      <button
        aria-label="Previous products"
        className="gallery-arrow"
        onClick={() => scrollProducts(-1)}
        type="button"
      >
        ‹
      </button>

      <div aria-label="Featured products" className="product-grid" ref={productGridRef}>
        {productCards.map((product) => (
          <article className="product-card" key={product.slug}>
            <div className={`product-image${product.image ? "" : " product-image-placeholder"}`}>
              {product.image ? (
                <img alt={product.name} src={product.image} />
              ) : (
                <span className="product-placeholder-label">Turkey</span>
              )}
              <ProductIcon name={product.icon} />
            </div>
            <div className="product-body">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Link className="product-link" href={`/products/${product.slug}`}>
                {product.label}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <button
        aria-label="Next products"
        className="gallery-arrow"
        onClick={() => scrollProducts(1)}
        type="button"
      >
        ›
      </button>
    </div>
  );
}
