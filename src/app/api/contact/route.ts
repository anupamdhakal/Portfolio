import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, _honeypot } = body;

    // Bot detection via honeypot field
    if (_honeypot) {
      return NextResponse.json(
        { success: true, message: "Submission accepted" },
        { status: 200 }
      );
    }

    // Input validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please provide a message (at least 5 characters)." },
        { status: 400 }
      );
    }

    if (message.trim().length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message is too long (maximum 5000 characters)." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // Destination email from config or environment variable
    const destinationEmail =
      process.env.CONTACT_DESTINATION_EMAIL || siteConfig.contact.email;

    const resendApiKey = process.env.RESEND_API_KEY;

    // --------------------------------------------------------------------------
    // PRODUCTION EMAIL DELIVERY VIA RESEND
    // --------------------------------------------------------------------------
    if (resendApiKey) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
          to: [destinationEmail],
          reply_to: trimmedEmail,
          subject: `Portfolio Message from ${trimmedName}`,
          text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 8px;">
              <h2 style="color: #111; margin-bottom: 16px;">New Portfolio Contact Message</h2>
              <p><strong>From:</strong> ${trimmedName} (&lt;<a href="mailto:${trimmedEmail}">${trimmedEmail}</a>&gt;)</p>
              <div style="margin-top: 24px; padding: 16px; background-color: #f9f9f9; border-radius: 6px; border-left: 4px solid #111;">
                <p style="white-space: pre-wrap; margin: 0; color: #333; line-height: 1.6;">${trimmedMessage}</p>
              </div>
              <p style="margin-top: 24px; font-size: 12px; color: #888;">Delivered via Anupam Dhakal's Portfolio Contact Form to ${destinationEmail}</p>
            </div>
          `,
        }),
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.json();
        console.error("[Contact API] Resend error:", errorData);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to send email through provider. Please try again or use direct email.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your message was sent successfully.",
      });
    }

    // --------------------------------------------------------------------------
    // DEVELOPMENT / PREVIEW FALLBACK
    // --------------------------------------------------------------------------
    // If RESEND_API_KEY is not configured, we log the message details and return
    // a successful response with a notice so the contact form works seamlessly
    // during local development and preview deployments without crashing.
    console.log("------------------------------------------------------------");
    console.log("[Contact Form Submission (Local / Preview Mode)]");
    console.log(`To: ${destinationEmail}`);
    console.log(`From: ${trimmedName} <${trimmedEmail}>`);
    console.log(`Message: ${trimmedMessage}`);
    console.log("Tip: Add RESEND_API_KEY to your .env.local to send live emails.");
    console.log("------------------------------------------------------------");

    return NextResponse.json({
      success: true,
      simulated: true,
      message:
        "Your message was received! (In preview/dev mode: add RESEND_API_KEY to .env for production email delivery to info@anupam-dhakal.com.np).",
    });
  } catch (error) {
    console.error("[Contact API] Error handling submission:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
