"use client";

import { useState, type FormEvent } from "react";

type ContactFormProps = {
  consultation?: boolean;
};

export default function ContactForm({
  consultation = false,
}: ContactFormProps) {
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"error" | "success" | "">("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !phone || !message) {
      setNotice("Please provide your name, phone number and message.");
      setNoticeType("error");
      return;
    }

    const text = [
      "Hi Favosa Farms,",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : "",
      `Enquiry: ${subject || (consultation ? "Farm consultation" : "General enquiry")}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    setIsSubmitting(true);
    setFallbackUrl("");

    try {
      const response = await fetch(consultation ? "/api/bookings" : "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          subject,
          service: subject,
          message,
        }),
      });
      const result: unknown = await response.json();
      const responseData =
        typeof result === "object" && result !== null
          ? (result as Record<string, unknown>)
          : {};

      if (!response.ok) {
        setNotice(
          typeof responseData.error === "string"
            ? responseData.error
            : "Could not send your enquiry. Please try again.",
        );
        setNoticeType("error");
        setFallbackUrl(`https://wa.me/2348073228022?text=${encodeURIComponent(text)}`);
        return;
      }

      setNotice(
        typeof responseData.message === "string"
          ? responseData.message
          : "Your enquiry has been received.",
      );
      setNoticeType("success");
      form.reset();
    } catch {
      setNotice("Could not send your enquiry. Please try again or contact us on WhatsApp.");
      setNoticeType("error");
      setFallbackUrl(`https://wa.me/2348073228022?text=${encodeURIComponent(text)}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-name">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            autoComplete="name"
            id="contact-name"
            name="name"
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email address</label>
          <input
            autoComplete="email"
            id="contact-email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="contact-phone">
          Phone / WhatsApp <span aria-hidden="true">*</span>
        </label>
        <input
          autoComplete="tel"
          id="contact-phone"
          name="phone"
          placeholder="+234..."
          required
          type="tel"
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-subject">What can we help with?</label>
        <select
          defaultValue={consultation ? "Farm consultation" : ""}
          id="contact-subject"
          name="subject"
        >
          <option value="">Select a topic</option>
          <option>Order - Poultry</option>
          <option>Order - Fish</option>
          <option>Order - Eggs</option>
          <option>Pet care</option>
          <option>Farm consultation</option>
          <option>Delivery enquiry</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell us what you need..."
          required
          rows={5}
        />
      </div>
      <button className="btn-solid form-submit" disabled={isSubmitting} type="submit">
        {isSubmitting
          ? "Sending…"
          : consultation
            ? "Request a consultation"
            : "Send message"}
      </button>
      <p aria-live="polite" className={`form-notice ${noticeType}`}>
        {notice}
        {fallbackUrl ? (
          <>
            {" "}
            <a href={fallbackUrl} rel="noopener noreferrer" target="_blank">
              Send via WhatsApp instead.
            </a>
          </>
        ) : null}
      </p>
    </form>
  );
}
