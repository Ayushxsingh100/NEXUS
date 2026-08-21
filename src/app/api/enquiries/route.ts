import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Basic server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 1) {
      return NextResponse.json({ ok: false, error: "Message is required." }, { status: 400 });
    }

    // Log enquiry (replace with DB write / email send in production)
    console.log("[NEXUS ENQUIRY]", {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
