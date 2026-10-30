"use client";

import { useActionState } from "react";
import type { AboutMetric, BusinessSettings, Faq } from "../../lib/cms";
import type { Database } from "../../lib/supabase/database.types";
import {
  createFaq,
  createMetric,
  deleteFaq,
  deleteMetric,
  saveBusinessSettings,
  signOutCms,
  updateFaq,
  updateInquiryStatus,
  updateMetric,
  type CmsActionState,
} from "./actions";

type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];

const initialState: CmsActionState = { message: "", success: true };

function ActionMessage({ state }: { state: CmsActionState }) {
  if (!state.message) return null;
  return (
    <p
      aria-live="polite"
      className={`cms-action-message${state.success ? " is-success" : " is-error"}`}
      role={state.success ? "status" : "alert"}
    >
      {state.message}
    </p>
  );
}

function SettingsEditor({ settings }: { settings: BusinessSettings }) {
  const [state, action, isPending] = useActionState(saveBusinessSettings, initialState);

  return (
    <section className="cms-card" id="business-details">
      <div className="cms-section-heading">
        <div>
          <p className="cms-eyebrow">Site information</p>
          <h2>Business details</h2>
        </div>
        <p>These details appear on the Contact page, footer and business listing.</p>
      </div>
      <form action={action} className="cms-form-grid">
        <label>
          Primary phone
          <input defaultValue={settings.phone_primary} maxLength={40} name="phone_primary" required />
        </label>
        <label>
          Secondary phone
          <input defaultValue={settings.phone_secondary} maxLength={40} name="phone_secondary" />
        </label>
        <label>
          WhatsApp number (country code and digits)
          <input defaultValue={settings.whatsapp_phone} maxLength={24} name="whatsapp_phone" required />
        </label>
        <label>
          Public email
          <input defaultValue={settings.email} maxLength={254} name="email" required type="email" />
        </label>
        <label className="cms-field-wide">
          Street address
          <input defaultValue={settings.street_address} maxLength={200} name="street_address" required />
        </label>
        <label>
          City / locality
          <input defaultValue={settings.address_locality} maxLength={100} name="address_locality" required />
        </label>
        <label>
          Postal code
          <input defaultValue={settings.postal_code} maxLength={20} name="postal_code" required />
        </label>
        <label>
          State / region
          <input defaultValue={settings.address_region} maxLength={100} name="address_region" required />
        </label>
        <label>
          Weekday hours
          <input defaultValue={settings.weekday_hours} maxLength={100} name="weekday_hours" required />
        </label>
        <label>
          Saturday hours
          <input defaultValue={settings.saturday_hours} maxLength={100} name="saturday_hours" required />
        </label>
        <label>
          Sunday hours
          <input defaultValue={settings.sunday_hours} maxLength={100} name="sunday_hours" required />
        </label>
        <div className="cms-form-footer cms-field-wide">
          <ActionMessage state={state} />
          <button className="cms-primary-button" disabled={isPending} type="submit">
            {isPending ? "Saving…" : "Save business details"}
          </button>
        </div>
      </form>
    </section>
  );
}

function FaqEditor({ faqs }: { faqs: Faq[] }) {
  const [createState, createAction, isCreating] = useActionState(createFaq, initialState);

  return (
    <section className="cms-card" id="faqs">
      <div className="cms-section-heading">
        <div>
          <p className="cms-eyebrow">Public content</p>
          <h2>Frequently asked questions</h2>
        </div>
        <p>Changes are published immediately on the FAQ and Contact pages.</p>
      </div>
      <div className="cms-record-list">
        {faqs.map((faq) => (
          <FaqRow faq={faq} key={faq.id} />
        ))}
        {faqs.length === 0 ? <p className="cms-empty">No FAQs have been added yet.</p> : null}
      </div>
      <form action={createAction} className="cms-record-form">
        <h3>Add a question</h3>
        <label>
          Question
          <input maxLength={240} name="question" required />
        </label>
        <label>
          Answer
          <textarea maxLength={5000} name="answer" required rows={3} />
        </label>
        <div className="cms-form-footer">
          <ActionMessage state={createState} />
          <button className="cms-primary-button" disabled={isCreating} type="submit">
            {isCreating ? "Adding…" : "Add FAQ"}
          </button>
        </div>
      </form>
    </section>
  );
}

function FaqRow({ faq }: { faq: Faq }) {
  const [editState, editAction, isSaving] = useActionState(updateFaq, initialState);
  const [deleteState, deleteAction, isDeleting] = useActionState(deleteFaq, initialState);

  return (
    <article className="cms-record">
      <form action={editAction} className="cms-record-form">
        <input name="id" type="hidden" value={faq.id} />
        <label>
          Question
          <input defaultValue={faq.question} maxLength={240} name="question" required />
        </label>
        <label>
          Answer
          <textarea defaultValue={faq.answer} maxLength={5000} name="answer" required rows={3} />
        </label>
        <div className="cms-form-footer">
          <ActionMessage state={editState} />
          <button className="cms-secondary-button" disabled={isSaving} type="submit">
            {isSaving ? "Saving…" : "Save FAQ"}
          </button>
        </div>
      </form>
      <form action={deleteAction} className="cms-delete-form">
        <input name="id" type="hidden" value={faq.id} />
        <ActionMessage state={deleteState} />
        <button className="cms-danger-button" disabled={isDeleting} type="submit">
          {isDeleting ? "Removing…" : "Remove"}
        </button>
      </form>
    </article>
  );
}

function MetricsEditor({ metrics }: { metrics: AboutMetric[] }) {
  const [createState, createAction, isCreating] = useActionState(createMetric, initialState);

  return (
    <section className="cms-card" id="about-metrics">
      <div className="cms-section-heading">
        <div>
          <p className="cms-eyebrow">About page</p>
          <h2>Impact metrics</h2>
        </div>
        <p>Keep public figures accurate and use values that you can substantiate.</p>
      </div>
      <div className="cms-record-list">
        {metrics.map((metric) => (
          <MetricRow key={metric.id} metric={metric} />
        ))}
        {metrics.length === 0 ? <p className="cms-empty">No impact metrics have been added yet.</p> : null}
      </div>
      <form action={createAction} className="cms-record-form cms-metric-create">
        <h3>Add a metric</h3>
        <label>
          Icon
          <select defaultValue="chicken" name="icon">
            <option value="chicken">Broiler</option>
            <option value="fish">Catfish</option>
            <option value="graduation">Training</option>
            <option value="farm">Farm</option>
            <option value="heart">Families</option>
          </select>
        </label>
        <label>
          Value
          <input maxLength={80} name="value" required />
        </label>
        <label>
          Label
          <input maxLength={120} name="label" required />
        </label>
        <div className="cms-form-footer cms-field-wide">
          <ActionMessage state={createState} />
          <button className="cms-primary-button" disabled={isCreating} type="submit">
            {isCreating ? "Adding…" : "Add metric"}
          </button>
        </div>
      </form>
    </section>
  );
}

function MetricRow({ metric }: { metric: AboutMetric }) {
  const [editState, editAction, isSaving] = useActionState(updateMetric, initialState);
  const [deleteState, deleteAction, isDeleting] = useActionState(deleteMetric, initialState);

  return (
    <article className="cms-record">
      <form action={editAction} className="cms-metric-row">
        <input name="id" type="hidden" value={metric.id} />
        <label>
          Value
          <input defaultValue={metric.value} maxLength={80} name="value" required />
        </label>
        <label>
          Label
          <input defaultValue={metric.label} maxLength={120} name="label" required />
        </label>
        <button className="cms-secondary-button" disabled={isSaving} type="submit">
          {isSaving ? "Saving…" : "Save"}
        </button>
        <ActionMessage state={editState} />
      </form>
      <form action={deleteAction} className="cms-delete-form">
        <input name="id" type="hidden" value={metric.id} />
        <ActionMessage state={deleteState} />
        <button className="cms-danger-button" disabled={isDeleting} type="submit">
          {isDeleting ? "Removing…" : "Remove"}
        </button>
      </form>
    </article>
  );
}

function InquiryList({ inquiries }: { inquiries: Inquiry[] }) {
  return (
    <section className="cms-card" id="enquiries">
      <div className="cms-section-heading">
        <div>
          <p className="cms-eyebrow">Customer messages</p>
          <h2>Enquiries</h2>
        </div>
        <p>Showing the latest 100. Only authorized CMS users can access these messages.</p>
      </div>
      <div className="cms-inquiry-list">
        {inquiries.map((inquiry) => (
          <article className="cms-inquiry" key={inquiry.id}>
            <div className="cms-inquiry-heading">
              <div>
                <span className={`cms-status cms-status-${inquiry.status}`}>{inquiry.status}</span>
                <span className="cms-inquiry-source">
                  {inquiry.source === "consultation" ? "Consultation" : "Contact form"}
                </span>
              </div>
              <time dateTime={inquiry.created_at}>
                {new Date(inquiry.created_at).toLocaleString()}
              </time>
            </div>
            <h3>{inquiry.subject}</h3>
            <p className="cms-inquiry-contact">
              {inquiry.name} · <a href={`tel:${inquiry.phone}`}>{inquiry.phone}</a>
              {inquiry.email ? <> · <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a></> : null}
            </p>
            <p className="cms-inquiry-message">{inquiry.message}</p>
            <form action={updateInquiryStatus} className="cms-status-form">
              <input name="id" type="hidden" value={inquiry.id} />
              <label>
                Status
                <select defaultValue={inquiry.status} name="status">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </label>
              <button className="cms-secondary-button" type="submit">Update status</button>
            </form>
          </article>
        ))}
        {inquiries.length === 0 ? (
          <p className="cms-empty">No enquiries received yet.</p>
        ) : null}
      </div>
    </section>
  );
}

export default function CmsDashboard({
  faqs,
  inquiries,
  metrics,
  settings,
}: {
  faqs: Faq[];
  inquiries: Inquiry[];
  metrics: AboutMetric[];
  settings: BusinessSettings;
}) {
  return (
    <>
      <nav aria-label="CMS sections" className="cms-section-nav">
        <a href="#business-details">Business details</a>
        <a href="#faqs">FAQs</a>
        <a href="#about-metrics">About metrics</a>
        <a href="#enquiries">Enquiries</a>
        <form action={signOutCms}>
          <button className="cms-signout-button" type="submit">Sign out</button>
        </form>
      </nav>
      <div className="cms-content-grid">
        <SettingsEditor settings={settings} />
        <FaqEditor faqs={faqs} />
        <MetricsEditor metrics={metrics} />
        <InquiryList inquiries={inquiries} />
      </div>
    </>
  );
}
