"use client";

import React, { useState } from "react";
import SentConfirmation from "./SentConfirmation";

type FormState = "idle" | "submitting" | "sent" | "error";

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label style={{
        fontSize: "9.5px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        color: "rgba(255, 255, 255, 0.45)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "10.5px",
          fontFamily: "'Poppins', sans-serif",
          color: "rgba(248, 113, 113, 0.9)",
        }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="6" cy="6" r="5.5" stroke="rgba(248,113,113,0.6)" />
            <path d="M6 3.5V6.5M6 8H6.01" stroke="rgba(248,113,113,0.9)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [apiError, setApiError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) { e.email = "Email is required"; }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { e.email = "Enter a valid email"; }
    if (!formData.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setFormState("submitting");
    setApiError("");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) { setFormState("sent"); }
      else { setApiError(data.error || "Something went wrong."); setFormState("error"); }
    } catch {
      setApiError("Connection failed. Please try again.");
      setFormState("error");
    }
  };

  const getInputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background: focused === name
      ? "rgba(255, 255, 255, 0.04)"
      : "rgba(0, 0, 0, 0.35)",
    border: errors[name]
      ? "1px solid rgba(248, 113, 113, 0.5)"
      : focused === name
        ? "1px solid rgba(255, 255, 255, 0.25)"
        : "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "14px",
    padding: "13px 16px",
    fontSize: "13.5px",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    color: "#ffffff",
    outline: "none",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    /* The key — box-shadow replaces the browser focus ring entirely */
    boxShadow: focused === name && !errors[name]
      ? "0 0 0 3px rgba(255, 255, 255, 0.08), 0 2px 8px rgba(0,0,0,0.4)"
      : "0 2px 8px rgba(0,0,0,0.15)",
    transition: "border-color 200ms ease, box-shadow 200ms ease, background 200ms ease",
    boxSizing: "border-box",
    WebkitAppearance: "none",
    MozAppearance: "none",
  } as React.CSSProperties);

  if (formState === "sent") return <SentConfirmation />;
  const isSubmitting = formState === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        padding: "22px 24px 26px",
        opacity: isSubmitting ? 0.7 : 1,
        transition: "opacity 300ms ease",
        pointerEvents: isSubmitting ? "none" : undefined,
      }}
    >
      {/* Name + Email */}
      <div className="c8-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <Field label="Name" error={errors.name}>
          <input
            type="text" name="name" value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
            placeholder="Linus Torvalds"
            style={getInputStyle("name")}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email" name="email" value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
            placeholder="linus@kernel.org"
            style={getInputStyle("email")}
            autoComplete="email"
          />
        </Field>
      </div>

      {/* Message */}
      <Field label="Message" error={errors.message}>
        <textarea
          name="message" value={formData.message} rows={5}
          onChange={handleChange}
          onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
          placeholder="Tell me about the opportunity..."
          style={{ ...getInputStyle("message"), resize: "none" }}
        />
      </Field>

      {/* API error */}
      {formState === "error" && apiError && (
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "10px 14px", borderRadius: "10px",
          background: "rgba(248,113,113,0.06)",
          border: "1px solid rgba(248,113,113,0.2)",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5.5" stroke="rgba(248,113,113,0.6)" />
            <path d="M6 3.5V6.5M6 8H6.01" stroke="rgba(248,113,113,0.9)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <p style={{ fontSize: "12px", fontFamily: "'Poppins', sans-serif", color: "rgba(248,113,113,0.9)", margin: 0 }}>{apiError}</p>
        </div>
      )}

      {/* Submit row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "2px" }}>
        <p style={{ fontSize: "11px", fontFamily: "'Poppins', sans-serif", color: "rgba(255,255,255,0.4)", margin: 0 }}>
          I read every message.
        </p>

        <button
          type="submit"
          className="c8-submit-btn"
          disabled={isSubmitting}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "11px 24px",
            borderRadius: "100px",
            border: "none",
            background: isSubmitting
              ? "rgba(255,255,255,0.45)"
              : "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
            color: "#0a0a0a",
            fontSize: "12.5px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.01em",
            cursor: isSubmitting ? "default" : "pointer",
            transition: "all 240ms cubic-bezier(0.16, 1, 0.3, 1)",
            outline: "none",
            boxShadow: "0 2px 20px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.15), 0 1px 0 rgba(255,255,255,0.5) inset",
          }}
        >
          {isSubmitting ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={{ animation: "c8-spin 0.85s linear infinite" }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send message
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="c8-submit-arrow" style={{ transition: "transform 240ms cubic-bezier(0.16,1,0.3,1)" }}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Scoped styles — override ALL browser defaults for focus */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes c8-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Kill browser default focus ring on ALL inputs/textareas in this form */
        form input, form textarea {
          outline: none !important;
          outline-offset: 0 !important;
          -webkit-tap-highlight-color: transparent;
        }
        form input:focus, form textarea:focus {
          outline: none !important;
          box-shadow: none; /* will be overridden by inline style */
        }
        /* Autofill override */
        form input:-webkit-autofill,
        form input:-webkit-autofill:focus,
        form input:-webkit-autofill:hover {
          -webkit-box-shadow: 0 0 0 1000px rgba(10, 10, 10, 0.95) inset !important;
          -webkit-text-fill-color: #ffffff !important;
          transition: background-color 5000s ease-in-out 0s;
          caret-color: #ffffff;
        }

        .c8-submit-btn:not(:disabled):hover {
          transform: scale(1.03) !important;
          box-shadow: 0 6px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.25), 0 1px 0 rgba(255,255,255,0.6) inset !important;
        }
        .c8-submit-btn:not(:disabled):hover .c8-submit-arrow {
          transform: translateX(4px) !important;
        }
        .c8-submit-btn:not(:disabled):active {
          transform: scale(0.97) !important;
        }
        @media (max-width: 520px) {
          .c8-form-row { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.42); font-weight: 400; }
        textarea { resize: none !important; }
        input, textarea { -webkit-font-smoothing: antialiased; }
      ` }} />
    </form>
  );
}
