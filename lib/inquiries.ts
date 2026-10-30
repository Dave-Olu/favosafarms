import { NextResponse } from "next/server";
import { createSupabasePublicClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/env";

type InquirySource = "contact" | "consultation";

function readText(data: Record<string, unknown>, key: string) {
  const value = data[key];
  if (typeof value !== "string") return "";
  return value.trim();
}

export async function submitPublicInquiry(
  request: Request,
  source: InquirySource,
) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const data = payload as Record<string, unknown>;
  const name = readText(data, "name");
  const phone = readText(data, "phone");
  const email = readText(data, "email");
  const subject = readText(data, source === "consultation" ? "service" : "subject")
    || readText(data, "subject")
    || (source === "consultation" ? "Farm consultation" : "General enquiry");
  const message = readText(data, "message");

  if (
    name.length < 2 || name.length > 120 ||
    phone.length < 7 || phone.length > 40 ||
    subject.length > 160 ||
    message.length < 5 || message.length > 5000 ||
    email.length > 254 ||
    (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return NextResponse.json(
      { error: "Enter a valid name, phone number, email address and message." },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Enquiry submissions are unavailable because the CMS is not configured." },
      { status: 503 },
    );
  }

  const supabase = createSupabasePublicClient();
  const { error } = await supabase.from("inquiries").insert({
    name,
    phone,
    email: email || null,
    subject,
    message,
    source,
  });

  if (error) {
    console.error("Could not save public enquiry:", error.message);
    return NextResponse.json(
      { error: "Could not save your enquiry. Please try again or contact us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message:
      source === "consultation"
        ? "Your consultation request has been received. Our team will contact you to arrange a session."
        : "Your message has been received. Our team will get back to you soon.",
  });
}
