import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "ayushxsingh.work@gmail.com";

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

    const timestamp = new Date().toISOString();

    // Log enquiry to console
    console.log("[NEXUS ENQUIRY RECEIVED]", {
      timestamp,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (!resend) {
      // If RESEND_API_KEY is not configured, fall back gracefully and mock success in development
      console.warn("[NEXUS API WARNING] RESEND_API_KEY is not configured. Email delivery mocked successfully.");
      return NextResponse.json({ ok: true, mocked: true }, { status: 200 });
    }

    // Attempt to send email via Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: receiverEmail,
      subject: `New Portfolio Enquiry from ${name.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Enquiry Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 100px;">Sender:</td>
              <td style="padding: 8px 0; color: #1f2937;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email:</td>
              <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${email.trim()}" style="color: #3b82f6; text-decoration: none;">${email.trim()}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Date:</td>
              <td style="padding: 8px 0; color: #1f2937;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
            <p style="margin: 0; font-weight: bold; color: #4b5563; margin-bottom: 8px;">Message:</p>
            <p style="margin: 0; color: #1f2937; white-space: pre-wrap; line-height: 1.6;">${message.trim()}</p>
          </div>
          <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">This email was sent automatically from your portfolio website's contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error("[NEXUS RESEND ERROR] Failed to send email:", error);
      return NextResponse.json({ ok: false, error: "Failed to send email." }, { status: 500 });
    }

    console.log("[NEXUS RESEND SUCCESS] Email dispatched successfully:", data);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[NEXUS API ERROR] Server error processing enquiry:", error);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
