import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const email = String(data.email || "").trim();
    const service = String(data.service || data.subject || "Farm consultation").trim();
    const message = String(data.message || "").trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone number, and message are required." },
        { status: 400 }
      );
    }

    // Ready for downstream calendar/booking/email integration
    return NextResponse.json({
      success: true,
      message: "Consultation request received. Our team will contact you to schedule a session.",
      data: { name, phone, email, service },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
