"use client";

import { createPortal } from "react-dom";
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";

type OrderNowButtonProps = {
  "aria-label"?: string;
  children: ReactNode;
  className: string;
  onClick?: () => void;
  whatsappPhone: string;
};

export default function OrderNowButton({
  "aria-label": ariaLabel,
  children,
  className,
  onClick,
  whatsappPhone,
}: OrderNowButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [formError, setFormError] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isBoarding = product === "Dog boarding";

  function closeDialog() {
    setIsOpen(false);
    setProduct("");
    setCheckIn("");
    setFormError("");
  }

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLInputElement>("#order-name")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      product: String(formData.get("product") ?? "").trim(),
      quantity: String(formData.get("quantity") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      details: String(formData.get("details") ?? "").trim(),
      dogName: String(formData.get("dogName") ?? "").trim(),
      breed: String(formData.get("breed") ?? "").trim(),
      dogAge: String(formData.get("dogAge") ?? "").trim(),
      checkIn: String(formData.get("checkIn") ?? "").trim(),
      checkOut: String(formData.get("checkOut") ?? "").trim(),
      vaccination: String(formData.get("vaccination") ?? "").trim(),
    };

    if (
      isBoarding &&
      fields.checkIn &&
      fields.checkOut &&
      fields.checkOut <= fields.checkIn
    ) {
      setFormError("Check-out date must be after the check-in date.");
      return;
    }

    const message = [
      `Hello Favosa Farms, I would like to ${isBoarding ? "enquire about dog boarding" : "place an order"}.`,
      "",
      `Name: ${fields.name}`,
      `Phone: ${fields.phone}`,
      `Product: ${fields.product}`,
      isBoarding ? `Number of dogs: ${fields.quantity}` : `Quantity: ${fields.quantity}`,
      isBoarding ? `Dog's name: ${fields.dogName}` : "",
      isBoarding && fields.breed ? `Breed: ${fields.breed}` : "",
      isBoarding && fields.dogAge ? `Dog's age: ${fields.dogAge}` : "",
      isBoarding ? `Check-in: ${fields.checkIn}` : "",
      isBoarding ? `Check-out: ${fields.checkOut}` : "",
      isBoarding && fields.vaccination
        ? `Vaccination status: ${fields.vaccination}`
        : "",
      !isBoarding && fields.location ? `Delivery location: ${fields.location}` : "",
      fields.details ? `Additional details: ${fields.details}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${whatsappPhone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setIsOpen(false);
  }

  return (
    <>
      <button
        aria-label={ariaLabel}
        className={className}
        onClick={() => {
          onClick?.();
          setProduct("");
          setCheckIn("");
          setFormError("");
          setIsOpen(true);
        }}
        ref={triggerRef}
        type="button"
      >
        {children}
      </button>
      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <dialog
            aria-labelledby="order-dialog-title"
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
                <h2 id="order-dialog-title">Place an order</h2>
                <p className="order-dialog-intro">
                  Share a few details and continue your order with us on WhatsApp.
                </p>
              </div>
              <button
                aria-label="Close order form"
                className="order-dialog-close"
                  onClick={closeDialog}
                type="button"
              >
                ×
              </button>
            </div>
            <form
              className="order-dialog-form"
              onChange={() => setFormError("")}
              onSubmit={handleSubmit}
            >
              <label>
                Your name <span aria-hidden="true">*</span>
                <input autoComplete="name" id="order-name" name="name" required />
              </label>
              <label>
                Phone / WhatsApp <span aria-hidden="true">*</span>
                <input autoComplete="tel" name="phone" required type="tel" />
              </label>
              <label>
                Product or service <span aria-hidden="true">*</span>
                <select
                  name="product"
                  onChange={(event) => setProduct(event.currentTarget.value)}
                  required
                  value={product}
                >
                  <option disabled value="">Choose a product or service</option>
                  <optgroup label="Poultry">
                    <option value="Broilers">Broilers</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Fresh eggs">Fresh eggs</option>
                  </optgroup>
                  <optgroup label="Fish">
                    <option value="Catfish - live">Catfish - live</option>
                    <option value="Catfish - processed">Catfish - processed</option>
                  </optgroup>
                  <optgroup label="Dogs">
                    <option value="Dogs">Dogs</option>
                    <option value="Dog boarding">Dog boarding</option>
                  </optgroup>
                </select>
              </label>
              <div className="order-dialog-row">
                <label>
                  {isBoarding ? "Number of dogs" : "Quantity"}{" "}
                  <span aria-hidden="true">*</span>
                  <input
                    min="1"
                    name="quantity"
                    placeholder={
                      product.startsWith("Catfish")
                        ? "Enter kg"
                        : isBoarding
                          ? "Number of dogs"
                          : "Enter quantity"
                    }
                    required
                    type="number"
                  />
                </label>
                {!isBoarding && (
                  <label>
                    Delivery location
                    <input autoComplete="street-address" name="location" />
                  </label>
                )}
              </div>
              {isBoarding && (
                <fieldset className="order-boarding-fields">
                  <legend>Dog boarding details</legend>
                  <label>
                    Dog&apos;s name <span aria-hidden="true">*</span>
                    <input name="dogName" required />
                  </label>
                  <div className="order-dialog-row">
                    <label>
                      Breed
                      <input name="breed" />
                    </label>
                    <label>
                      Dog&apos;s age
                      <input name="dogAge" placeholder="e.g. 2 years" />
                    </label>
                  </div>
                  <div className="order-dialog-row">
                    <label>
                      Check-in date <span aria-hidden="true">*</span>
                      <input
                        min={new Date().toISOString().slice(0, 10)}
                        name="checkIn"
                        onChange={(event) => setCheckIn(event.currentTarget.value)}
                        required
                        type="date"
                        value={checkIn}
                      />
                    </label>
                    <label>
                      Check-out date <span aria-hidden="true">*</span>
                      <input
                        min={checkIn || new Date().toISOString().slice(0, 10)}
                        name="checkOut"
                        required
                        type="date"
                      />
                    </label>
                  </div>
                  <label>
                    Vaccination status
                    <select defaultValue="" name="vaccination">
                      <option value="">Select if known</option>
                      <option value="Up to date">Up to date</option>
                      <option value="Not up to date">Not up to date</option>
                      <option value="Not sure">Not sure</option>
                    </select>
                  </label>
                </fieldset>
              )}
              <label>
                {isBoarding ? "Care, feeding or other instructions" : "Additional product or delivery details"}
                <textarea name="details" rows={3} />
              </label>
              {formError && (
                <p className="order-dialog-error" role="alert">
                  {formError}
                </p>
              )}
              <button className="order-dialog-submit" type="submit">
                {isBoarding ? "Enquire about boarding on WhatsApp" : "Continue to WhatsApp"}
              </button>
              <p className="order-dialog-note">
                {isBoarding
                  ? "Boarding is confirmed after our team checks availability and care requirements."
                  : "Your order is confirmed after our team checks availability with you."}
              </p>
            </form>
          </dialog>,
          document.body,
        )}
    </>
  );
}
