"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  consultation?: boolean;
};

export default function ContactForm({
  consultation = false,
}: ContactFormProps) {
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"error" | "success" | "">("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
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

    window.open(
      `https://wa.me/2348073228022?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setNotice("WhatsApp opened with your message. Send it there to complete your enquiry.");
    setNoticeType("success");
    event.currentTarget.reset();
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
      <button className="btn-solid form-submit" type="submit">
        {consultation ? "Request a consultation" : "Send message"}
      </button>
      <p aria-live="polite" className={`form-notice ${noticeType}`}>
        {notice}
      </p>
    </form>
  );
}
