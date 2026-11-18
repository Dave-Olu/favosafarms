"use client";

import { createPortal } from "react-dom";
import { type FormEvent, useEffect, useRef, useState } from "react";

const puppyBreeds = [
  "German Shepherd - Long coat",
  "German Shepherd - Short coat",
  "Rottweiler",
  "Boerboel",
];

export default function PuppyOrderButton() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLSelectElement>("#puppy-breed")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const breed = String(formData.get("breed") ?? "").trim();
    const quantity = String(formData.get("quantity") ?? "").trim();
    const details = String(formData.get("details") ?? "").trim();
    const message = [
      "Hello Favosa Farms, I would like to enquire about ordering a puppy.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Preferred breed: ${breed}`,
      `Number of puppies: ${quantity}`,
      details ? `Additional details: ${details}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/2348073228022?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="pd-gallery-cta pd-gallery-cta--button"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        ORDER YOUR PUPPY NOW
      </button>
      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <dialog
            aria-labelledby="puppy-order-dialog-title"
            className="order-dialog"
            onCancel={(event) => {
              event.preventDefault();
              setIsOpen(false);
            }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setIsOpen(false);
            }}
            ref={dialogRef}
          >
            <div className="order-dialog-header">
              <div>
                <p className="order-dialog-eyebrow">Favosa Farms</p>
                <h2 id="puppy-order-dialog-title">Enquire about a puppy</h2>
                <p className="order-dialog-intro">
                  Choose your preferred breed and share your contact details. Our team will confirm availability with you.
                </p>
              </div>
              <button
                aria-label="Close puppy enquiry form"
                className="order-dialog-close"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>
            <form className="order-dialog-form" onSubmit={handleSubmit}>
              <label>
                Preferred breed <span aria-hidden="true">*</span>
                <select autoComplete="off" id="puppy-breed" name="breed" required defaultValue="">
                  <option disabled value="">Select a breed</option>
                  {puppyBreeds.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </label>
              <label>
                Your name <span aria-hidden="true">*</span>
                <input autoComplete="name" name="name" required />
              </label>
              <div className="order-dialog-row">
                <label>
                  Phone / WhatsApp <span aria-hidden="true">*</span>
                  <input autoComplete="tel" name="phone" required type="tel" />
                </label>
                <label>
                  Number of puppies <span aria-hidden="true">*</span>
                  <input min="1" name="quantity" required type="number" />
                </label>
              </div>
              <label>
                Questions or preferences
                <textarea name="details" rows={3} />
              </label>
              <button className="order-dialog-submit" type="submit">
                Continue on WhatsApp
              </button>
              <p className="order-dialog-note">
                Puppy availability is confirmed by our team before an order is finalised.
              </p>
            </form>
          </dialog>,
          document.body,
        )}
    </>
  );
}
