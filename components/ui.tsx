import type { CSSProperties, ReactNode } from "react";
import { brandIcons } from "@/lib/brand-icons";
import { LOGO_VIEWBOX, MARK_VIEWBOX, logoParts, type LogoPart } from "@/lib/logo-parts";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Each traced part sits in its own positioned group, so the path itself can be animated from an untransformed state. */
const Part = ({ part }: { part: LogoPart }) => <g transform={`translate(${part.x} ${part.y})`}><path className={`lp lp-${part.tone}`} data-part={part.id} data-group={part.group} d={part.d} /></g>;
const mark = logoParts.filter((part) => part.group === "mark");
const word = logoParts.filter((part) => part.group !== "mark");

/* The official logo as live vector parts: the flame, hook and bowl stay amber and the wave stays blue in every
   context; the wordmark takes currentColor (navy on light scenes, white on navy), exactly as the site uses it.
   "stack" is the official lockup (mark above wordmark). "row" places the same mark beside the same wordmark for
   the header, where the stacked lockup would make the letters too small to read. */
export function Logo({ className = "", title, layout = "stack" }: { className?: string; title?: string; layout?: "stack" | "row" }) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
  if (layout === "stack") return <svg className={`logo ${className}`} viewBox={LOGO_VIEWBOX} focusable="false" {...a11y}>
    <g data-set="mark">{mark.map((part) => <Part key={part.id} part={part} />)}</g>
    <g data-set="word">{word.map((part) => <Part key={part.id} part={part} />)}</g>
  </svg>;
  // Row: mark scaled to 0.62 and pinned at the origin, wordmark centred on it with a 70-unit gap.
  const [mx, my, mw, mh] = MARK_VIEWBOX.split(" ").map(Number);
  const [wx, , ww] = LOGO_VIEWBOX.split(" ").map(Number);
  const s = .62, height = mh * s, wordTop = 1191, wordHeight = 418, gap = 70;
  return <svg className={`logo logo-row ${className}`} viewBox={`0 0 ${Math.round(mw * s + gap + ww)} ${Math.round(height)}`} focusable="false" {...a11y}>
    <g data-set="mark" transform={`translate(${-mx * s} ${-my * s}) scale(${s})`}>{mark.map((part) => <Part key={part.id} part={part} />)}</g>
    <g data-set="word" transform={`translate(${mw * s + gap - wx} ${(height - wordHeight) / 2 - wordTop})`}>{word.map((part) => <Part key={part.id} part={part} />)}</g>
  </svg>;
}

export function Arrow({ className = "" }: { className?: string }) {
  return <svg className={`arrow ${className}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}

/* The copied interaction: airmastersolutions.com's "Get Started Now" pill (Framer component "White Button").
   Measured: flex, gap 48px (24px here when compact), padding 8px 8px 8px 24px, radius 50px, 56px tall; label
   Figtree 16px / 600 (Inter here); a 40px disc with 12px padding holds a 16px arrow turned -45°.
   Hover, all on one .4 s tween, cubic-bezier(.44,0,.56,1): the pill fills orange, the disc turns dark and the arrow
   turns level (-45° → 0°); the same tween runs back on leave. Colours map to the brand palette (see globals.css). */
export function Button({ href, children, variant = "navy", compact = false, external = false, className = "", ariaLabel }: { href: string; children: ReactNode; variant?: "navy" | "white" | "line"; compact?: boolean; external?: boolean; className?: string; ariaLabel?: string }) {
  return <a href={href} className={`btn btn-${variant} ${compact ? "btn-compact" : ""} ${className}`} aria-label={ariaLabel} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
    <span className="btn-label">{children}</span>
    <span className="btn-disc" aria-hidden="true"><Arrow /></span>
    {external && <span className="sr-only"> (opens in a new tab)</span>}
  </a>;
}

/* Text link with a trailing arrow, for "View all" style links. */
export function More({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return <a className="more" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}<Arrow />{external && <span className="sr-only"> (opens in a new tab)</span>}</a>;
}

/* The reference's eyebrow, "— WHO WE ARE": an orange rule, then the label. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`label ${className}`} data-appear><span className="label-rule" aria-hidden="true" />{children}</p>;
}

export function Social({ icon, size = 18 }: { icon: keyof typeof brandIcons; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={brandIcons[icon]} /></svg>;
}

/** Local photography, always in its own colour. */
export function Photo({ src, alt = "", width, height, className = "", style, sizes, priority = false, fit = "cover" }: { src: string; alt?: string; width?: number; height?: number; className?: string; style?: CSSProperties; sizes?: string; priority?: boolean; fit?: "cover" | "contain" }) {
  return <span className={`photo photo-${fit} ${className}`} style={style}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} width={width} height={height} sizes={sizes} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : undefined} />
  </span>;
}

export function Check() {
  return <svg className="check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
}
