"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "@/components/ui";
import { email, hero } from "@/lib/home-content";

/* The live hero's quick-quote form, with the live fields and labels, sitting open in the hero frame so a client can
   ask for a quote without another click. A demo must not post into the company's systems, so sending opens the
   visitor's email app addressed to the company's enquiries inbox with the details filled in. */
export default function QuickQuote() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = [`Name: ${form.get("name") ?? ""}`, `Phone: ${form.get("phone") ?? ""}`, `Email: ${form.get("email") ?? ""}`, "", String(form.get("message") ?? "")].join("\n");
    window.location.href = `${email.href}?subject=${encodeURIComponent(hero.quote.title)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return <form className="hero-quote" onSubmit={submit} aria-labelledby="quote-title">
    <div className="quote-head">
      <h2 id="quote-title">{hero.quote.title}</h2>
      <p>{hero.quote.text}</p>
    </div>
    <div className="quote-grid">
      <label className="field"><span>Your Name</span><input name="name" autoComplete="name" /></label>
      <label className="field"><span>Phone Number *</span><input name="phone" type="tel" autoComplete="tel" required /></label>
      <label className="field field-wide"><span>Email Address</span><input name="email" type="email" autoComplete="email" /></label>
      <label className="field field-wide"><span>Brief Message <em aria-hidden="true">{message.length}/500</em></span><textarea name="message" rows={2} maxLength={500} value={message} onChange={(e) => setMessage(e.target.value)} /></label>
    </div>
    <button type="submit" className="btn btn-navy btn-compact quote-send"><span className="btn-label">{hero.quote.cta}</span><span className="btn-disc" aria-hidden="true"><Arrow /></span></button>
    <p className="quote-note" aria-live="polite">{sent ? "Your email app should now be open with your details filled in." : ""}</p>
  </form>;
}
