import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const email = String(data.email || "").trim();
    const subject = String(data.subject || "").trim();
    const message = String(data.message || "").trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone number, and message are required." },
        { status: 400 }
      );
    }

    // Ready for downstream email dispatch or database storage
    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. We have received your message and will respond shortly.",
      data: { name, phone, email, subject },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
