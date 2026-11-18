"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Database } from "../../../lib/supabase/database.types";
import { createSupabaseBrowserClient } from "../../../lib/supabase/client";

type GalleryItem = Database["public"]["Tables"]["gallery_items"]["Row"];

const maxFileSize = 100 * 1024 * 1024;
const mediaTypes: Record<string, { kind: "image" | "video"; extension: string }> = {
  "image/jpeg": { kind: "image", extension: ".jpg" },
  "image/png": { kind: "image", extension: ".png" },
  "image/webp": { kind: "image", extension: ".webp" },
  "image/gif": { kind: "image", extension: ".gif" },
  "video/mp4": { kind: "video", extension: ".mp4" },
  "video/webm": { kind: "video", extension: ".webm" },
};

function MediaPreview({ item }: { item: GalleryItem }) {
  const supabase = createSupabaseBrowserClient();
  const url = supabase.storage.from("gallery").getPublicUrl(item.storage_path).data.publicUrl;

  return item.media_type === "video" ? (
    <video controls preload="metadata" src={url}>
      Your browser does not support video playback.
    </video>
  ) : (
    <div
      aria-label={item.alt_text}
      className="cms-gallery-image"
      role="img"
      style={{ backgroundImage: `url("${url}")` }}
    />
  );
}

export default function GalleryManager({ items }: { items: GalleryItem[] }) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleDelete(item: GalleryItem) {
    setDeletingId(item.id);
    setMessage("");
    setIsError(false);
    const supabase = createSupabaseBrowserClient();

    const { error: recordError } = await supabase
      .from("gallery_items")
      .delete()
      .eq("id", item.id);

    if (recordError) {
      setDeletingId(null);
      setIsError(true);
      setMessage(`Could not remove gallery item: ${recordError.message}`);
      return;
    }

    const { error: storageError } = await supabase.storage
      .from("gallery")
      .remove([item.storage_path]);

    setDeletingId(null);
    if (storageError) {
      setIsError(true);
      setMessage(`The gallery entry was removed, but the media file could not be deleted: ${storageError.message}`);
    } else {
      setMessage("Gallery item removed.");
    }
    router.refresh();
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsError(false);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("media");
    const altText = String(formData.get("alt_text") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim();

    if (!(file instanceof File) || file.size === 0) {
      setIsError(true);
      setMessage("Choose an image or video to upload.");
      return;
    }

    const mediaType = mediaTypes[file.type];
    if (!mediaType) {
      setIsError(true);
      setMessage("Use a JPG, PNG, WebP, GIF, MP4 or WebM file.");
      return;
    }
    if (file.size > maxFileSize) {
      setIsError(true);
      setMessage("Files must be 100 MB or smaller.");
      return;
    }
    if (altText.length < 3 || altText.length > 240 || caption.length > 500) {
      setIsError(true);
      setMessage("Add image description of 3–240 characters and a caption under 500 characters.");
      return;
    }

    setIsUploading(true);
    const supabase = createSupabaseBrowserClient();
    const storagePath = `${crypto.randomUUID()}${mediaType.extension}`;
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(storagePath, file, { cacheControl: "3600", contentType: file.type });

    if (uploadError) {
      setIsUploading(false);
      setIsError(true);
      setMessage(`Could not upload media: ${uploadError.message}`);
      return;
    }

    const { error: recordError } = await supabase.from("gallery_items").insert({
      storage_path: storagePath,
      media_type: mediaType.kind,
      alt_text: altText,
      caption,
      display_order: 0,
    });

    if (recordError) {
      const { error: cleanupError } = await supabase.storage.from("gallery").remove([storagePath]);
      setIsUploading(false);
      setIsError(true);
      setMessage(
        cleanupError
          ? `Could not save gallery details: ${recordError.message}. The uploaded file also needs cleanup: ${cleanupError.message}`
          : `Could not save gallery details: ${recordError.message}`,
      );
      return;
    }

    form.reset();
    setIsUploading(false);
    setMessage("Media uploaded and added to the public gallery.");
    router.refresh();
  }

  return (
    <div className="cms-gallery">
      <section className="cms-card">
        <div className="cms-section-heading">
          <div>
            <p className="cms-eyebrow">Public gallery</p>
            <h2>Upload photos and videos</h2>
          </div>
          <p>Supported: JPG, PNG, WebP, GIF, MP4 and WebM. Maximum file size: 100 MB.</p>
        </div>
        <form className="cms-record-form" onSubmit={handleUpload}>
          <label className="cms-field-wide">
            Image or video <span aria-hidden="true">*</span>
            <input accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm" name="media" required type="file" />
          </label>
          <label>
            Accessible description <span aria-hidden="true">*</span>
            <input maxLength={240} name="alt_text" required />
          </label>
          <label>
            Caption
            <input maxLength={500} name="caption" />
          </label>
          <div className="cms-form-footer cms-field-wide">
            {message ? (
              <p aria-live={isError ? "assertive" : "polite"} className={`cms-action-message${isError ? " is-error" : " is-success"}`} role={isError ? "alert" : "status"}>
                {message}
              </p>
            ) : null}
            <button className="cms-primary-button" disabled={isUploading} type="submit">
              {isUploading ? "Uploading…" : "Upload to gallery"}
            </button>
          </div>
        </form>
      </section>

      <section className="cms-card">
        <div className="cms-section-heading">
          <div>
            <p className="cms-eyebrow">Published media</p>
            <h2>Gallery items</h2>
          </div>
          <p>{items.length} {items.length === 1 ? "item" : "items"} on the public gallery page.</p>
        </div>
        {items.length ? (
          <div className="cms-gallery-grid">
            {items.map((item) => (
              <article className="cms-gallery-item" key={item.id}>
                <MediaPreview item={item} />
                <div>
                  <p>{item.caption || item.alt_text}</p>
                  <span>{item.media_type}</span>
                  <button
                    className="cms-danger-button"
                    disabled={deletingId === item.id}
                    onClick={() => handleDelete(item)}
                    type="button"
                  >
                    {deletingId === item.id ? "Removing…" : "Remove"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="cms-empty">No gallery items yet. Upload your first image or video above.</p>
        )}
      </section>
    </div>
  );
}
