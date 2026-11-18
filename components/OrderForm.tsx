"use client";

import Image from "next/image";
import { useState, useEffect, type FormEvent } from "react";

/* ─────────────────────────────────────────
   Product catalogue
───────────────────────────────────────── */
type ProductType = { value: string; label: string; emoji: string };

type ProductOption = {
  id: string;
  label: string;
  unit: string;
  minQty: number;
  image: string;
  /** If defined, user can pick one OR both */
  types?: ProductType[];
};

const PRODUCTS: ProductOption[] = [
  {
    id: "broilers",
    label: "Broilers (Chicken)",
    unit: "birds",
    minQty: 1,
    image: "/Images/broilers.png",
    types: [
      { value: "live", label: "Live birds", emoji: "🐓" },
      { value: "processed", label: "Processed / dressed", emoji: "🍗" },
    ],
  },
  {
    id: "turkey",
    label: "Turkey",
    unit: "birds",
    minQty: 1,
    image: "/Images/turkey.png",
    types: [
      { value: "live", label: "Live birds", emoji: "🦃" },
      { value: "processed", label: "Processed / dressed", emoji: "🍗" },
    ],
  },
  {
    id: "catfish",
    label: "Catfish",
    unit: "kg",
    minQty: 5,
    image: "/Images/catfish.png",
    types: [
      { value: "live", label: "Live fish", emoji: "🐟" },
      { value: "processed", label: "Cleaned & dressed", emoji: "🍽️" },
    ],
  },
  {
    id: "eggs",
    label: "Eggs",
    unit: "crates (30 eggs)",
    minQty: 1,
    image: "/Images/eggs-optimized.jpg",
  },
  {
    id: "dogs",
    label: "Dogs",
    unit: "dogs",
    minQty: 1,
    image: "/Images/dog-rottweiler.png",
  },
];

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type OrderLine = {
  id: string;
  productId: string;
  /** Array so user can tick Live, Processed, or both */
  types: string[];
  qty: string;
};

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

function emptyLine(): OrderLine {
  return { id: makeId(), productId: "", types: [], qty: "" };
}

function buildOrderSummary(lines: OrderLine[]): string {
  const valid = lines.filter((l) => l.productId && l.qty);
  if (!valid.length) return "";
  return valid
    .map((l) => {
      const product = PRODUCTS.find((p) => p.id === l.productId)!;
      const typeLabels =
        l.types.length > 0
          ? product.types
              ?.filter((t) => l.types.includes(t.value))
              .map((t) => t.label)
              .join(" & ")
          : null;
      const typePart = typeLabels ? ` (${typeLabels})` : "";
      return `• ${product.label}${typePart} — ${l.qty} ${product.unit}`;
    })
    .join("\n");
}

/* ─────────────────────────────────────────
   Icons
───────────────────────────────────────── */
function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h12M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M6 7v5M10 7v5M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7 6 10.5l5.5-7" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Product image badge shown per order line
───────────────────────────────────────── */
function ProductBadge({ product }: { product: ProductOption }) {
  return (
    <div className="order-product-badge">
      <div className="order-product-badge-img">
        <Image
          src={product.image}
          alt={product.label}
          fill
          sizes="64px"
          className="order-product-badge-photo"
        />
      </div>
      <span className="order-product-badge-name">{product.label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function OrderForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lines, setLines] = useState<OrderLine[]>([emptyLine()]);
  const [notes, setNotes] = useState("");
  const [notesManual, setNotesManual] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"error" | "success" | "">("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Auto-fill notes textarea from order lines */
  useEffect(() => {
    if (notesManual) return;
    const summary = buildOrderSummary(lines);
    setNotes(summary ? `ORDER:\n${summary}` : "");
  }, [lines, notesManual]);

  /* ── Line helpers ── */
  function updateLine(id: string, patch: Partial<OrderLine>) {
    setLines((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const updated = { ...l, ...patch };
        // Reset types when product changes
        if (patch.productId !== undefined && patch.productId !== l.productId) {
          updated.types = [];
        }
        return updated;
      })
    );
  }

  function toggleType(lineId: string, typeValue: string) {
    setLines((prev) =>
      prev.map((l) => {
        if (l.id !== lineId) return l;
        const has = l.types.includes(typeValue);
        return {
          ...l,
          types: has
            ? l.types.filter((t) => t !== typeValue)
            : [...l.types, typeValue],
        };
      })
    );
  }

  function addLine() {
    setLines((prev) => [...prev, emptyLine()]);
  }

  function removeLine(id: string) {
    setLines((prev) => {
      const next = prev.filter((l) => l.id !== id);
      return next.length === 0 ? [emptyLine()] : next;
    });
  }

  /* ── Submit ── */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setNotice("Please provide your name and phone number.");
      setNoticeType("error");
      return;
    }

    const validLines = lines.filter((l) => l.productId && l.qty);
    if (!validLines.length) {
      setNotice("Please add at least one product to your order.");
      setNoticeType("error");
      return;
    }

    // Require at least one type selection for products that have types
    const missingType = validLines.find((l) => {
      const product = PRODUCTS.find((p) => p.id === l.productId);
      return product?.types && l.types.length === 0;
    });
    if (missingType) {
      const product = PRODUCTS.find((p) => p.id === missingType.productId)!;
      setNotice(`Please select at least one type (Live or Processed) for ${product.label}.`);
      setNoticeType("error");
      return;
    }

    const orderSummary = buildOrderSummary(validLines);
    const userNotes = notesManual
      ? notes.replace(/^ORDER:[\s\S]*?(\n\n|$)/, "").trim()
      : "";
    const fullMessage = `ORDER SUMMARY:\n${orderSummary}${userNotes ? `\n\nAdditional notes:\n${userNotes}` : ""}`;

    const waText = encodeURIComponent(
      `Hi Favosa Farms,\n\nName: ${name.trim()}\nPhone: ${phone.trim()}${email.trim() ? `\nEmail: ${email.trim()}` : ""}\n\n${fullMessage}`
    );
    const waFallback = `https://wa.me/2348073228022?text=${waText}`;

    setIsSubmitting(true);
    setFallbackUrl("");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          subject: `Order — ${validLines.map((l) => PRODUCTS.find((p) => p.id === l.productId)?.label).join(", ")}`,
          message: fullMessage,
        }),
      });

      const result = (await response.json()) as Record<string, unknown>;

      if (!response.ok) {
        setNotice(typeof result.error === "string" ? result.error : "Could not send your order. Please try again.");
        setNoticeType("error");
        setFallbackUrl(waFallback);
        return;
      }

      setNotice("Your order has been received! Our team will contact you to confirm.");
      setNoticeType("success");
      setName(""); setPhone(""); setEmail("");
      setLines([emptyLine()]);
      setNotes(""); setNotesManual(false);
      onSuccess?.();
    } catch {
      setNotice("Could not send your order. Please try again or contact us on WhatsApp.");
      setNoticeType("error");
      setFallbackUrl(waFallback);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>

      {/* ── Personal details ── */}
      <fieldset className="order-fieldset">
        <legend className="order-legend">Your Details</legend>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="order-name">
              Full name <span className="order-required" aria-hidden="true">*</span>
            </label>
            <input
              id="order-name"
              name="name"
              autoComplete="name"
              placeholder="e.g. Amaka Johnson"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="order-phone">
              Phone / WhatsApp <span className="order-required" aria-hidden="true">*</span>
            </label>
            <input
              id="order-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+234…"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="order-email">
            Email address <span className="form-optional">(optional)</span>
          </label>
          <input
            id="order-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </fieldset>

      {/* ── Order lines ── */}
      <fieldset className="order-fieldset">
        <legend className="order-legend">Products</legend>
        <p className="order-legend-hint">
          Select each product you want. For poultry and fish you can pick live, processed, or both.
        </p>

        <div className="order-lines">
          {lines.map((line, idx) => {
            const product = PRODUCTS.find((p) => p.id === line.productId);
            return (
              <div key={line.id} className="order-line">
                {/* Line header */}
                <div className="order-line-header">
                  <span className="order-line-num">Item {idx + 1}</span>
                  {lines.length > 1 && (
                    <button
                      type="button"
                      className="order-line-remove"
                      onClick={() => removeLine(line.id)}
                      aria-label={`Remove item ${idx + 1}`}
                    >
                      <TrashIcon /> Remove
                    </button>
                  )}
                </div>

                {/* Product selector + image badge */}
                <div className="order-line-product-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label htmlFor={`order-product-${line.id}`}>Product</label>
                    <select
                      id={`order-product-${line.id}`}
                      value={line.productId}
                      onChange={(e) => updateLine(line.id, { productId: e.target.value })}
                    >
                      <option value="">— Select a product —</option>
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Product image — updates when product is selected */}
                  {product && <ProductBadge product={product} />}
                </div>

                {/* Type checkboxes — live and/or processed */}
                {product?.types && (
                  <div className="form-group">
                    <span className="order-type-label">
                      Type <span className="order-required" aria-hidden="true">*</span>
                      <span className="form-optional"> (select one or both)</span>
                    </span>
                    <div className="order-type-grid" role="group" aria-label={`Type for ${product.label}`}>
                      {product.types.map((t) => {
                        const checked = line.types.includes(t.value);
                        return (
                          <label
                            key={t.value}
                            className={`order-type-chip${checked ? " order-type-chip--on" : ""}`}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => toggleType(line.id, t.value)}
                              aria-label={t.label}
                            />
                            {/* Custom checkbox box */}
                            <span className="order-type-box" aria-hidden="true">
                              {checked && <CheckIcon />}
                            </span>
                            <span className="order-type-emoji" aria-hidden="true">{t.emoji}</span>
                            <span className="order-type-text">{t.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="form-group">
                  <label htmlFor={`order-qty-${line.id}`}>
                    Quantity
                    {product && (
                      <>
                        {" "}
                        <span className="order-unit">({product.unit})</span>
                        <span className="form-optional"> min. {product.minQty}</span>
                      </>
                    )}
                  </label>
                  <input
                    id={`order-qty-${line.id}`}
                    type="number"
                    min={product?.minQty ?? 1}
                    step={1}
                    placeholder={product ? `e.g. ${product.minQty}` : "0"}
                    value={line.qty}
                    onChange={(e) => updateLine(line.id, { qty: e.target.value })}
                    className="order-qty-input"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button type="button" className="order-add-line" onClick={addLine}>
          <PlusIcon />
          Add another product
        </button>
      </fieldset>

      {/* ── Notes (auto-filled, editable) ── */}
      <div className="form-group">
        <label htmlFor="order-notes">
          Additional notes
          <span className="form-optional"> (delivery address, special requests, etc.)</span>
        </label>
        <textarea
          id="order-notes"
          rows={4}
          placeholder="e.g. delivery address, preferred collection date…"
          value={notes}
          onChange={(e) => { setNotes(e.target.value); setNotesManual(true); }}
        />
      </div>

      {/* ── Submit ── */}
      <button type="submit" className="order-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : (
          <>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}>
              <path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.4 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1.1.6-1.8.5-1-.1-2.3-.7-3.7-1.9-1.2-1-2.1-2.4-2.3-3.5-.2-.8 0-1.5.5-2.1Z"
                fill="currentColor" />
            </svg>
            Send Order
          </>
        )}
      </button>

      <p aria-live="polite" className={`form-notice ${noticeType}`}>
        {notice}
        {fallbackUrl && (
          <> <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">Send on WhatsApp instead.</a></>
        )}
      </p>
    </form>
  );
}
