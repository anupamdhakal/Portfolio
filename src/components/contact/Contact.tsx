"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _honeypot: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Copy email to clipboard
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback for older browsers or restricted environments
      const textArea = document.createElement("textarea");
      textArea.value = siteConfig.contact.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setStatusMessage(data.message || "Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "", _honeypot: "" });
      setErrors({});
    } catch (err: unknown) {
      setStatus("error");
      setStatusMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full"
    >
      <div className="border-t border-neutral-800/80 pt-12 sm:pt-16 mb-12 sm:mb-16">
        <h2
          id="contact-heading"
          className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-medium"
        >
          {siteConfig.contact.heading}
        </h2>
        <p className="mt-2 text-xl sm:text-2xl text-neutral-200 font-light">
          {siteConfig.contact.subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Direct Contact & Email Copy */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium text-neutral-100 mb-2">
              Direct Communication
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              Messages submitted here route directly to my inbox. You can also copy the email
              address or write directly from your email client.
            </p>

            {/* Email Copy Card */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 sm:p-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                Primary Inbox
              </span>
              <div className="flex items-center justify-between gap-3 bg-neutral-950/70 border border-neutral-800/80 rounded-lg p-2.5 sm:p-3">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-xs sm:text-sm font-mono text-neutral-200 hover:text-white truncate transition-colors"
                  title="Send email"
                >
                  {siteConfig.contact.email}
                </a>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 shrink-0
                    ${
                      copied
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 border border-neutral-700/50"
                    }
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400`}
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <svg
                        className="w-3.5 h-3.5 text-emerald-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="mt-3 text-[12px] text-neutral-500 font-mono">
                {siteConfig.contact.formNote}
              </p>
            </div>
          </div>

          <div className="hidden lg:block pt-8 text-xs text-neutral-500 font-mono">
            <span>Location: {siteConfig.personal.location || "Available globally"}</span>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8 backdrop-blur-sm">
            {status === "success" ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="text-xl font-medium text-white mb-2">Message Sent</h4>
                <p className="text-sm text-neutral-400 max-w-md mb-6 leading-relaxed">
                  {statusMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot field for bot suppression */}
                <input
                  type="text"
                  name="_honeypot"
                  value={formData._honeypot}
                  onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Name <span className="text-neutral-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950/80 border text-sm text-neutral-100 placeholder-neutral-600 transition-colors focus:outline-none focus:ring-1
                      ${
                        errors.name
                          ? "border-rose-500/80 focus:ring-rose-500"
                          : "border-neutral-800 focus:border-neutral-600 focus:ring-neutral-600"
                      }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Email <span className="text-neutral-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950/80 border text-sm text-neutral-100 placeholder-neutral-600 transition-colors focus:outline-none focus:ring-1
                      ${
                        errors.email
                          ? "border-rose-500/80 focus:ring-rose-500"
                          : "border-neutral-800 focus:border-neutral-600 focus:ring-neutral-600"
                      }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Message <span className="text-neutral-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell me about your inquiry..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950/80 border text-sm text-neutral-100 placeholder-neutral-600 transition-colors resize-y focus:outline-none focus:ring-1
                      ${
                        errors.message
                          ? "border-rose-500/80 focus:ring-rose-500"
                          : "border-neutral-800 focus:border-neutral-600 focus:ring-neutral-600"
                      }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
                  )}
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                    {statusMessage}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 text-sm font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-neutral-950" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
