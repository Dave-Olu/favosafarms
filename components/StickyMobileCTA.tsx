"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import OrderNowButton from "./OrderNowButton";

export default function StickyMobileCTA() {
  const pathname = usePathname();

  // If inside an admin route, don't show the customer mobile bar
  if (pathname.startsWith("/admin") || pathname.startsWith("/about/admin")) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="mobile-sticky-wrapper" aria-label="Mobile Navigation and Order Bar">
      <div className="mobile-sticky-cta-pill">
        <OrderNowButton
          className="mobile-sticky-wa-btn"
          aria-label="Order now on WhatsApp"
        >
          <svg
            aria-hidden="true"
            className="mobile-sticky-wa-icon"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.4 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1.1.6-1.8.5-1-.1-2.3-.7-3.7-1.9-1.2-1-2.1-2.4-2.3-3.5-.2-.8 0-1.5.5-2.1Z"
              fill="currentColor"
            />
          </svg>
          <span className="mobile-sticky-wa-text">
            <span className="mobile-sticky-wa-title">ORDER NOW</span>
            <span className="mobile-sticky-wa-sub">Chat on WhatsApp</span>
          </span>
        </OrderNowButton>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="mobile-bottom-nav" aria-label="Quick Mobile Navigation">
        {/* 1. Home */}
        <Link
          href="/"
          className={`mobile-nav-tab${isActive("/") ? " mobile-nav-tab--active" : ""}`}
        >
          <svg aria-hidden="true" className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5Z" />
          </svg>
          <span className="mobile-nav-label">Home</span>
        </Link>

        {/* 2. Products */}
        <Link
          href="/products"
          className={`mobile-nav-tab${isActive("/products") ? " mobile-nav-tab--active" : ""}`}
        >
          <svg aria-hidden="true" className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span className="mobile-nav-label">Products</span>
        </Link>

        {/* 3. Center Order Button (Raised Circle) */}
        <OrderNowButton
          className="mobile-nav-order-bubble"
          aria-label="Open order form"
        >
          <div className="mobile-nav-bubble-circle">
            <svg aria-hidden="true" className="mobile-nav-bubble-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <span className="mobile-nav-label mobile-nav-label--bubble">Order</span>
        </OrderNowButton>

        {/* 4. Services */}
        <Link
          href="/services"
          className={`mobile-nav-tab${isActive("/services") ? " mobile-nav-tab--active" : ""}`}
        >
          <svg aria-hidden="true" className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 17 4.5s-.5 1.5-1.6 7.2A7 7 0 0 1 11 20Z" />
            <path d="M11 20v-7" />
          </svg>
          <span className="mobile-nav-label">Services</span>
        </Link>

        {/* 5. Contact */}
        <Link
          href="/contact"
          className={`mobile-nav-tab${isActive("/contact") ? " mobile-nav-tab--active" : ""}`}
        >
          <svg aria-hidden="true" className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
          </svg>
          <span className="mobile-nav-label">Contact</span>
        </Link>
      </nav>
    </aside>
  );
}
