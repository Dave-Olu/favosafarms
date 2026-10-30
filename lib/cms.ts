import { faqs as fallbackFaqs } from "./faqs";
import { farmAddress } from "./farmAddress";
import { isSupabaseConfigured } from "./supabase/env";
import { createSupabasePublicClient } from "./supabase/server";

export type Faq = {
  id: string;
  question: string;
  answer: string;
  display_order: number;
};

export type AboutMetric = {
  id: string;
  icon: string;
  value: string;
  label: string;
  display_order: number;
};

export type BusinessSettings = {
  phone_primary: string;
  phone_secondary: string;
  whatsapp_phone: string;
  email: string;
  street_address: string;
  address_locality: string;
  postal_code: string;
  address_region: string;
  address_country: string;
  weekday_hours: string;
  saturday_hours: string;
  sunday_hours: string;
};

const defaultSettings: BusinessSettings = {
  phone_primary: "+234 813 456 7890",
  phone_secondary: "+234 813 456 7891",
  whatsapp_phone: "2348073228022",
  email: "info@favosafarms.com",
  street_address: farmAddress.streetAddress,
  address_locality: farmAddress.addressLocality,
  postal_code: farmAddress.postalCode,
  address_region: farmAddress.addressRegion,
  address_country: farmAddress.addressCountry,
  weekday_hours: "8:00 am – 6:00 pm",
  saturday_hours: "8:00 am – 6:00 pm",
  sunday_hours: "Closed",
};

const defaultMetrics: AboutMetric[] = [
  { id: "broilers", icon: "chicken", value: "50,000+", label: "Broilers Raised", display_order: 0 },
  { id: "catfish", icon: "fish", value: "20,000+", label: "Catfish Produced", display_order: 1 },
  { id: "farmers", icon: "graduation", value: "300+", label: "Farmers Trained", display_order: 2 },
  { id: "farms", icon: "farm", value: "150+", label: "Farms Supported", display_order: 3 },
  { id: "families", icon: "heart", value: "Thousands", label: "Families Served", display_order: 4 },
];

export function formatPhoneForLink(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export function formatWhatsappNumber(phone: string) {
  return phone.replace(/\D/g, "");
}

export function formatBusinessAddress(settings: BusinessSettings) {
  return [
    settings.street_address,
    `${settings.address_locality} ${settings.postal_code}`,
    settings.address_region,
  ]
    .filter(Boolean)
    .join(", ");
}

export async function getBusinessSettings(): Promise<BusinessSettings> {
  if (!isSupabaseConfigured()) return defaultSettings;

  const { data, error } = await createSupabasePublicClient()
    .from("business_settings")
    .select("*")
    .eq("id", true)
    .single();

  if (error) throw new Error(`Could not load business settings: ${error.message}`);
  return data;
}

export async function getPublicFaqs(): Promise<Faq[]> {
  if (!isSupabaseConfigured()) {
    return fallbackFaqs.map((faq, display_order) => ({
      ...faq,
      id: `fallback-${display_order}`,
      display_order,
    }));
  }

  const { data, error } = await createSupabasePublicClient()
    .from("faqs")
    .select("id, question, answer, display_order")
    .order("display_order", { ascending: true });

  if (error) throw new Error(`Could not load FAQs: ${error.message}`);
  return data;
}

export async function getAboutMetrics(): Promise<AboutMetric[]> {
  if (!isSupabaseConfigured()) return defaultMetrics;

  const { data, error } = await createSupabasePublicClient()
    .from("about_metrics")
    .select("id, icon, value, label, display_order")
    .order("display_order", { ascending: true });

  if (error) throw new Error(`Could not load About metrics: ${error.message}`);
  return data;
}
