"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCmsAdmin } from "./auth";
import { createSupabaseActionClient } from "../../lib/supabase/server";

export type CmsActionState = {
  message: string;
  success: boolean;
};

const initialError: CmsActionState = {
  message: "Please review the form and try again.",
  success: false,
};

function readText(formData: FormData, key: string, maximum: number) {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maximum);
}

function revalidatePublicPages() {
  revalidatePath("/", "layout");
  revalidatePath("/faq");
  revalidatePath("/contact");
  revalidatePath("/about");
}

async function getAdminClient() {
  await requireCmsAdmin();
  return createSupabaseActionClient();
}

export async function saveBusinessSettings(
  _previousState: CmsActionState,
  formData: FormData,
): Promise<CmsActionState> {
  const phonePrimary = readText(formData, "phone_primary", 40);
  const phoneSecondary = readText(formData, "phone_secondary", 40);
  const whatsappPhone = readText(formData, "whatsapp_phone", 24).replace(/\D/g, "");
  const email = readText(formData, "email", 254);
  const streetAddress = readText(formData, "street_address", 200);
  const addressLocality = readText(formData, "address_locality", 100);
  const postalCode = readText(formData, "postal_code", 20);
  const addressRegion = readText(formData, "address_region", 100);
  const weekdayHours = readText(formData, "weekday_hours", 100);
  const saturdayHours = readText(formData, "saturday_hours", 100);
  const sundayHours = readText(formData, "sunday_hours", 100);

  if (
    !phonePrimary ||
    whatsappPhone.length < 10 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !streetAddress ||
    !addressLocality ||
    !postalCode ||
    !addressRegion ||
    !weekdayHours ||
    !saturdayHours ||
    !sundayHours
  ) {
    return { ...initialError, message: "Complete the required fields with valid contact details." };
  }

  const supabase = await getAdminClient();
  const { error } = await supabase
    .from("business_settings")
    .update({
      phone_primary: phonePrimary,
      phone_secondary: phoneSecondary,
      whatsapp_phone: whatsappPhone,
      email,
      street_address: streetAddress,
      address_locality: addressLocality,
      postal_code: postalCode,
      address_region: addressRegion,
      weekday_hours: weekdayHours,
      saturday_hours: saturdayHours,
      sunday_hours: sundayHours,
    })
    .eq("id", true);

  if (error) return { ...initialError, message: `Could not save settings: ${error.message}` };
  revalidatePublicPages();
  return { message: "Business details saved.", success: true };
}

export async function createFaq(
  _previousState: CmsActionState,
  formData: FormData,
): Promise<CmsActionState> {
  const question = readText(formData, "question", 240);
  const answer = readText(formData, "answer", 5000);
  if (question.length < 3 || answer.length < 3) {
    return { ...initialError, message: "Enter a question and answer before adding the FAQ." };
  }

  const supabase = await getAdminClient();
  const { data: lastFaq } = await supabase
    .from("faqs")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const { error } = await supabase.from("faqs").insert({
    question,
    answer,
    display_order: (lastFaq?.display_order ?? -1) + 1,
  });

  if (error) return { ...initialError, message: `Could not add FAQ: ${error.message}` };
  revalidatePublicPages();
  return { message: "FAQ added.", success: true };
}

export async function updateFaq(
  _previousState: CmsActionState,
  formData: FormData,
): Promise<CmsActionState> {
  const id = readText(formData, "id", 64);
  const question = readText(formData, "question", 240);
  const answer = readText(formData, "answer", 5000);
  if (!id || question.length < 3 || answer.length < 3) {
    return { ...initialError, message: "Enter a question and answer before saving." };
  }

  const supabase = await getAdminClient();
  const { error } = await supabase.from("faqs").update({ question, answer }).eq("id", id);
  if (error) return { ...initialError, message: `Could not save FAQ: ${error.message}` };
  revalidatePublicPages();
  return { message: "FAQ updated.", success: true };
}

export async function deleteFaq(
  _previousState: CmsActionState,
  formData: FormData,
): Promise<CmsActionState> {
  const id = readText(formData, "id", 64);
  if (!id) return initialError;

  const supabase = await getAdminClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) return { ...initialError, message: `Could not delete FAQ: ${error.message}` };
  revalidatePublicPages();
  return { message: "FAQ removed.", success: true };
}

export async function createMetric(
  _previousState: CmsActionState,
  formData: FormData,
): Promise<CmsActionState> {
  const icon = readText(formData, "icon", 20);
  const value = readText(formData, "value", 80);
  const label = readText(formData, "label", 120);
  if (!["chicken", "fish", "graduation", "farm", "heart"].includes(icon) || !value || label.length < 2) {
    return { ...initialError, message: "Choose an icon and enter a metric and label." };
  }

  const supabase = await getAdminClient();
  const { data: lastMetric } = await supabase
    .from("about_metrics")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const { error } = await supabase.from("about_metrics").insert({
    icon: icon as "chicken" | "fish" | "graduation" | "farm" | "heart",
    value,
    label,
    display_order: (lastMetric?.display_order ?? -1) + 1,
  });

  if (error) return { ...initialError, message: `Could not add metric: ${error.message}` };
  revalidatePublicPages();
  return { message: "Metric added.", success: true };
}

export async function updateMetric(
  _previousState: CmsActionState,
  formData: FormData,
): Promise<CmsActionState> {
  const id = readText(formData, "id", 64);
  const value = readText(formData, "value", 80);
  const label = readText(formData, "label", 120);
  if (!id || !value || label.length < 2) {
    return { ...initialError, message: "Enter both a metric value and label." };
  }

  const supabase = await getAdminClient();
  const { error } = await supabase.from("about_metrics").update({ value, label }).eq("id", id);
  if (error) return { ...initialError, message: `Could not save metric: ${error.message}` };
  revalidatePublicPages();
  return { message: "Metric updated.", success: true };
}

export async function deleteMetric(
  _previousState: CmsActionState,
  formData: FormData,
): Promise<CmsActionState> {
  const id = readText(formData, "id", 64);
  if (!id) return initialError;

  const supabase = await getAdminClient();
  const { error } = await supabase.from("about_metrics").delete().eq("id", id);
  if (error) return { ...initialError, message: `Could not delete metric: ${error.message}` };
  revalidatePublicPages();
  return { message: "Metric removed.", success: true };
}

export async function updateInquiryStatus(formData: FormData) {
  const id = readText(formData, "id", 64);
  const status = readText(formData, "status", 20);
  if (!id || !["new", "contacted", "closed"].includes(status)) {
    throw new Error("Invalid enquiry status.");
  }

  const supabase = await getAdminClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ status: status as "new" | "contacted" | "closed" })
    .eq("id", id);
  if (error) throw new Error(`Could not update enquiry: ${error.message}`);
  revalidatePath("/admin");
}

export async function signOutCms() {
  const supabase = await createSupabaseActionClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`Could not sign out: ${error.message}`);
  redirect("/admin/login");
}
