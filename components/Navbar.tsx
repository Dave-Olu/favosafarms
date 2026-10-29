"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import OrderNowButton from "./OrderNowButton";

type NavItem = { label: string; href: string; soon?: boolean };
type NavLink = NavItem & { items?: NavItem[] };

const links: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    items: [
      { label: "All Products", href: "/products" },
      { label: "Poultry", href: "/products/broilers" },
      { label: "Catfish", href: "/products/catfish" },
      { label: "Dogs", href: "/products/dogs" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    items: [
      { label: "All Services", href: "/services" },
      { label: "Farm Setup", href: "/services" },
      { label: "Consultancy", href: "/services" },
      { label: "Training", href: "/services" },
      { label: "Farm Audit", href: "/services" },
      { label: "Book a Consultation", href: "/book-consultation" },
    ],
  },
  {
    label: "Learn",
    href: "/knowledge-hub",
    items: [
      { label: "Knowledge Hub", href: "/knowledge-hub" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

/* ── Icons ── */
function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" className="nav-wa-icon" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M8.4 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1.1.6-1.8.5-1-.1-2.3-.7-3.7-1.9-1.2-1-2.1-2.4-2.3-3.5-.2-.8 0-1.5.5-2.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" className="nav-chevron" viewBox="0 0 12 8" fill="none">
      <path d="m1 1.5 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcon({ name }: { name: "facebook" | "instagram" | "tiktok" }) {
  if (name === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v9.2a4.2 4.2 0 1 1-3.2-4.1M14 4c.5 2.8 2.4 4.5 5 4.8" />
    </svg>
  );
}

/* ── Dropdown item ── */
function DropdownItem({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  return (
    <li>
      <Link
        href={item.href}
        className={`nav-menu-link${item.soon ? " nav-menu-link--soon" : ""}`}
        onClick={onClick}
      >
        {item.label}
        {item.soon && <span className="nav-badge">Soon</span>}
      </Link>
    </li>
  );
}

/* ── Desktop dropdown wrapper ── */
function DesktopDropdown({ link, active }: { link: NavLink; active: boolean }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }
  function hide() {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  }

  // Close dropdown when anywhere on the page is clicked
  useEffect(() => {
    if (!open) return;
    const handleGlobalClick = () => {
      setOpen(false);
    };
    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [open]);

  return (
    <div
      className={`nav-item nav-item--dropdown${open ? " nav-item--open" : ""}`}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        className={`nav-link nav-link--trigger${active ? " nav-link--active" : ""}`}
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        {link.label}
        <ChevronIcon />
      </button>

      <div className="nav-dropdown-panel" role="menu" aria-hidden={!open}>
        <ul className="nav-menu">
          {link.items!.map((item) => (
            <DropdownItem
              key={item.href + item.label}
              item={item}
              onClick={() => setOpen(false)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  function closeMenu() {
    setMenuOpen(false);
    setMobileOpen(null);
  }

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <div className="nav-topbar">
        <div className="wrap nav-topbar-inner">
          <p>Welcome to Favosa Farms! We&apos;re glad you&apos;re here.</p>
          <nav aria-label="Social media links" className="nav-topbar-socials">
            <a
              aria-label="Favosa Farms on Facebook (opens in a new tab)"
              href="https://www.facebook.com/share/1BqQjKA3nL/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SocialIcon name="facebook" />
            </a>
            <a
              aria-label="Favosa Farms on Instagram (opens in a new tab)"
              href="https://www.instagram.com/favosafarms"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SocialIcon name="instagram" />
            </a>
            <a
              aria-label="Favosa Farms on TikTok (opens in a new tab)"
              href="https://www.tiktok.com/@favosafarms"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SocialIcon name="tiktok" />
            </a>
          </nav>
        </div>
      </div>
      <header className="site-header">
      <div className="wrap nav-row">
        {/* Logo */}
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          <Image
            src="/Images/Favosa-logo.jpeg"
            alt="Favosa Farms logo"
            width={44}
            height={44}
            className="nav-logo-img"
          />
          <span className="nav-logo-text">
            <span className="nav-logo-title">FAVOSA FARMS</span>
            <span className="nav-logo-sub">Healthy Protein. Ethical Farming.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="primary-nav" aria-label="Main navigation">
          {links.map((link) => {
            const active = isActive(link.href);

            if (link.items) {
              return <DesktopDropdown key={link.href} link={link} active={active} />;
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${active ? " nav-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ORDER NOW CTA */}
        <OrderNowButton
          className="nav-order-btn"
          aria-label="Order now on WhatsApp"
        >
          <WhatsAppIcon />
          ORDER NOW
        </OrderNowButton>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
          id="hamburgerBtn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
          type="button"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile nav */}
      <nav
        id="mobile-nav"
        className={`mobile-panel${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        inert={!menuOpen}
      >
        {links.map((link) => {
          const active = isActive(link.href);
          const mobOpen = mobileOpen === link.href;

          if (link.items) {
            return (
              <div key={link.href} className={`mob-group${mobOpen ? " mob-group--open" : ""}`}>
                <button
                  className={`mob-group-toggle${active ? " nav-link--active" : ""}`}
                  onClick={() => setMobileOpen(mobOpen ? null : link.href)}
                  type="button"
                  aria-expanded={mobOpen}
                >
                  {link.label}
                  <ChevronIcon />
                </button>
                <div className="mob-group-body">
                  <ul>
                    {link.items.map((item) => (
                      <DropdownItem key={item.href + item.label} item={item} onClick={closeMenu} />
                    ))}
                  </ul>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`mob-nav-link${active ? " nav-link--active" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          );
        })}

        <OrderNowButton
          className="mob-order-btn"
          onClick={closeMenu}
        >
          <WhatsAppIcon />
          ORDER NOW
        </OrderNowButton>
      </nav>
      </header>
    </>
  );
}
