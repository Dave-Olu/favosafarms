import type { Metadata } from "next";
import PageBanner from "../../components/PageBanner";
import { isSupabaseConfigured } from "../../lib/supabase/env";
import { createSupabasePublicClient } from "../../lib/supabase/server";

export const metadata: Metadata = {
  title: "Farm Gallery",
  description: "Photos and videos from Favosa Farms.",
};

export const dynamic = "force-dynamic";

const farmImages = [
  { section: "farm", src: "/Images/hero-farm-aerial.png", alt: "Aerial view of Favosa Farms", caption: "The Favosa Farms landscape" },
  { section: "farm", src: "/Images/hero-farm-aerial-no-text.png", alt: "Aerial view of the farm", caption: "" },
  { section: "farm", src: "/Images/vision-farm-sign.png", alt: "Favosa Farms vision sign", caption: "Our vision" },
  { section: "farm", src: "/Images/founder-portrait.png", alt: "Favosa Farms founder", caption: "Meet the founder" },
  { section: "farm", src: "/Images/man-doing-household-tasks-optimized.jpg", alt: "Life at Favosa Farms", caption: "" },
  { section: "poultry", src: "/Images/gallery-broiler-house.png", alt: "Broiler house at the farm", caption: "Broiler production" },
  { section: "poultry", src: "/Images/story-broiler-man.png", alt: "Farmer caring for broilers", caption: "Daily poultry care" },
  { section: "poultry", src: "/Images/broilers.png", alt: "Healthy broiler birds", caption: "Broilers" },
  { section: "poultry", src: "/Images/chicks.png", alt: "Farm chicks", caption: "Day-old chicks" },
  { section: "poultry", src: "/Images/feed-grain.png", alt: "Quality poultry feed grain", caption: "Quality feed" },
  { section: "poultry", src: "/Images/White-birds-optimized.jpg", alt: "Healthy farm birds", caption: "Healthy birds" },
  { section: "catfish", src: "/Images/catfish-farm-pond.png", alt: "Catfish production pond", caption: "Catfish ponds" },
  { section: "catfish", src: "/Images/gallery-ponds-aerial.png", alt: "Aerial view of farm ponds", caption: "Pond overview" },
  { section: "catfish", src: "/Images/story-fish-ponds.png", alt: "Fish ponds at Favosa Farms", caption: "Fish farming" },
  { section: "catfish", src: "/Images/catfish.png", alt: "Fresh catfish", caption: "Fresh catfish" },
  { section: "products", src: "/Images/eggs-optimized.jpg", alt: "Fresh Favosa Farms eggs", caption: "Fresh eggs" },
  { section: "products", src: "/Images/turkey.png", alt: "Farm turkey", caption: "Turkey" },
  { section: "dogs", src: "/Images/dog-sit-optimized.jpg", alt: "Favosa Farms dog", caption: "Dogs" },
  { section: "dogs", src: "/Images/dog-rottweiler.png", alt: "Rottweiler dog", caption: "Dog breeding" },
  { section: "dogs", src: "/Images/09-gallery-dogs-kennel.png", alt: "Dogs and kennel at the farm", caption: "Kennel" },
  { section: "dogs", src: "/Images/story-man-with-dog.png", alt: "Farmer with a dog", caption: "Farm companions" },
];

const farmImageSections = [
  { id: "farm", title: "Farm & People" },
  { id: "poultry", title: "Poultry" },
  { id: "catfish", title: "Catfish" },
  { id: "products", title: "Other Farm Products" },
  { id: "dogs", title: "Dogs" },
];

type GalleryDisplayItem = {
  id: string;
  media_type: "image" | "video";
  alt_text: string;
  caption: string;
  url: string;
};

export default async function GalleryPage() {
  const uploadedGallery: GalleryDisplayItem[] = [];
  if (isSupabaseConfigured()) {
    const supabase = createSupabasePublicClient();
    const { data: items, error } = await supabase
      .from("gallery_items")
      .select("id, storage_path, media_type, alt_text, caption")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Could not load the farm gallery: ${error.message}`);
    }

    uploadedGallery.push(
      ...items.map((item) => ({
        id: item.id,
        media_type: item.media_type,
        alt_text: item.alt_text,
        caption: item.caption,
        url: supabase.storage.from("gallery").getPublicUrl(item.storage_path).data.publicUrl,
      })),
    );
  }

  const gallerySections = [
    ...(uploadedGallery.length ? [{ title: "Recently Added", items: uploadedGallery }] : []),
    ...farmImageSections.map((section) => ({
      title: section.title,
      items: farmImages
        .filter((item) => item.section === section.id)
        .map((item, index): GalleryDisplayItem => ({
          id: `${section.id}-${index}`,
          media_type: "image",
          alt_text: item.alt,
          caption: item.caption,
          url: item.src,
        })),
    })),
  ];

  return (
    <main id="top">
      <PageBanner
        description="A closer look at life, work and care at Favosa Farms."
        eyebrow="Farm Gallery"
        image="/Images/gallery-broiler-house.png"
        title="Life at Favosa Farms"
      />
      <section className="farm-gallery-section">
        <div className="wrap">
          {gallerySections.length ? (
            gallerySections.map((section) => (
              <section aria-label={section.title} className="farm-gallery-group" key={section.title}>
                <h2 className="farm-gallery-heading">{section.title}</h2>
                <div className="farm-gallery-grid">
                  {section.items.map((item) => (
                    <figure className="farm-gallery-item" key={item.id}>
                      {item.media_type === "video" ? (
                        <video controls preload="metadata" src={item.url}>
                          Your browser does not support video playback.
                        </video>
                      ) : (
                        <div
                          aria-label={item.alt_text}
                          className="farm-gallery-image"
                          role="img"
                          style={{ backgroundImage: `url("${item.url}")` }}
                        />
                      )}
                      {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <p className="farm-gallery-empty">
              Our gallery is being updated. Please check back soon.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
