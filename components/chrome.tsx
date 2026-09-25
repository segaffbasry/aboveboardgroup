"use client";

import gsap from "gsap";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { focusOverlay, usePageMotion } from "@/components/motion";
import { Arrow, Button, Logo, Social, reducedMotion } from "@/components/ui";
import { reveal } from "@/lib/ease";
import { phone, strip } from "@/lib/home-content";
import { account, footer, type MenuTabId, menuTabs, nav, socials } from "@/lib/menu";

/* Full-screen menu. A navy sheet wipes down from the top edge, then the tabs and their links rise into place.
   The same timeline plays in reverse (faster) on close. */
function Menu({ open, tab, setTab, close }: { open: boolean; tab: number; setTab: (tab: number) => void; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const opened = useRef(false);
  const item = menuTabs[tab];

  useEffect(() => {
    const el = root.current; if (!el) return;
    const q = (s: string) => el.querySelectorAll(s);
    const tl = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    tl.fromTo(el, { clipPath: "inset(0% 0% 100% 0% round 0 0 24px 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 0 0 0 0)", duration: .7, ease: "power4.inOut" }, 0)
      .fromTo(q(".menu-top > *"), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: reveal.duration, ease: reveal.ease, stagger: .06 }, .4)
      .fromTo(q(".menu-tab, .menu-direct a, .menu-account > *"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: reveal.duration, ease: reveal.ease, stagger: .04 }, .45);
    timeline.current = tl;
    return () => { tl.kill(); timeline.current = null; };
  }, []);

  useEffect(() => {
    const el = root.current, tl = timeline.current; if (!el || !tl) return;
    if (open) {
      el.style.visibility = "visible";
      tl.timeScale(reducedMotion() ? 50 : 1).play();
      return focusOverlay(el, close, el.querySelector<HTMLElement>(`.menu-tab[aria-selected="true"]`));
    }
    if (opened.current) tl.timeScale(reducedMotion() ? 50 : 1.6).reverse();
  }, [open, close]);

  // Links of the chosen tab rise in; a fresh open waits for the sheet.
  useEffect(() => {
    const el = root.current; if (!el || !open) return;
    const fresh = !opened.current; opened.current = true;
    const items = el.querySelectorAll("[data-m]");
    if (reducedMotion()) { gsap.set(items, { opacity: 1, y: 0 }); return; }
    gsap.fromTo(items, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: reveal.duration * .8, ease: reveal.ease, stagger: .018, delay: fresh ? .55 : 0, overwrite: true });
  }, [open, tab]);
  useEffect(() => { if (!open) opened.current = false; }, [open]);

  const direct = nav.filter((entry) => "href" in entry) as { label: string; href: string; external?: boolean }[];
  return <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open} data-lenis-prevent>
    <div className="menu-top">
      <a href="#top" className="menu-logo" onClick={close} aria-label="Aboveboard Group, back to top"><Logo layout="row" /></a>
      <button className="menu-close" onClick={close}>Close<span aria-hidden="true" /></button>
    </div>
    <div className="menu-body">
      <div className="menu-side">
        <div className="menu-tabs" role="tablist" aria-label="Browse">
          {menuTabs.map((entry, index) => <button key={entry.id} id={`tab-${entry.id}`} className="menu-tab" role="tab" aria-selected={tab === index} aria-controls="menu-panel" onClick={() => setTab(index)}><span>0{index + 1}</span>{entry.label}</button>)}
        </div>
        <ul className="menu-direct">{direct.map((entry) => <li key={entry.label}><a href={entry.href} {...(entry.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{entry.label}<Arrow />{entry.external && <span className="sr-only"> (opens in a new tab)</span>}</a></li>)}</ul>
        <div className="menu-account">
          <Button href={phone.href} variant="white" compact>Call {phone.label}</Button>
          <a className="menu-login" href={account.register.href}>{account.register.label}</a>
          <a className="menu-login" href={account.login.href}>{account.login.label}</a>
        </div>
      </div>
      <div className="menu-panel" id="menu-panel" role="tabpanel" aria-labelledby={`tab-${item.id}`} key={item.id}>
        <div className="menu-intro">
          <p data-m>{item.blurb}</p>
          <div data-m><Button href={item.all.href} variant="white" compact>{item.all.label}</Button></div>
        </div>
        <ul className={`menu-links ${item.id === "guides" ? "is-long" : ""}`}>{item.links.map((link) => <li key={link.href} data-m><a href={link.href}>{link.name}</a></li>)}</ul>
      </div>
    </div>
  </div>;
}

/* The live site's announcement strip, run as the reference's ticker: both live wordings on a masked marquee
   (CSS animation, paused on hover and under reduced motion), linking to the engineers' WhatsApp group. */
function Strip() {
  const row = [...strip.items, ...strip.items];
  return <a className="strip" href={strip.href} target="_blank" rel="noopener noreferrer">
    <span className="sr-only">{strip.items[0]} {strip.cta} (opens WhatsApp in a new tab)</span>
    <span className="strip-track" aria-hidden="true">
      {[0, 1].map((copy) => <span className="strip-run" key={copy}>{row.map((text, i) => <span className="strip-item" key={i}><Social icon="whatsapp" size={13} />{text}<b>{strip.cta}</b></span>)}</span>)}
    </span>
  </a>;
}

/* Frameless header. Its colour follows the section beneath it (data-tone), it hides on the way down and returns on the way up. */
function Header() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const bar = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    const el = bar.current; if (!el) return;
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY, delta = y - last;
      document.documentElement.classList.toggle("at-top", y < 40);
      if (y < 120) { el.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(delta) < 6) return;
      el.classList.toggle("is-hidden", delta > 0); last = y;
    };
    const show = () => el.classList.remove("is-hidden");
    el.addEventListener("focusin", show);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { el.removeEventListener("focusin", show); window.removeEventListener("scroll", onScroll); };
  }, []);
  const show = (id: MenuTabId) => { setTab(menuTabs.findIndex((entry) => entry.id === id)); setOpen(true); };
  return <>
    <header className="site-header" ref={bar}>
      <Strip />
      <div className="header-row">
        <a href="#top" className="brand" aria-label="Aboveboard Group, back to top"><Logo layout="row" /></a>
        <nav className="nav" aria-label="Main">
          {nav.map((entry) => "tab" in entry
            ? <button key={entry.label} aria-haspopup="dialog" aria-expanded={open && menuTabs[tab].id === entry.tab} aria-controls="site-menu" onClick={() => show(entry.tab)}>{entry.label}<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="m2 3.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg></button>
            : <a key={entry.label} href={entry.href} {...(entry.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{entry.label}{entry.external && <span className="sr-only"> (opens in a new tab)</span>}</a>)}
        </nav>
        <div className="header-end">
          <Button href={phone.href} compact className="header-call" ariaLabel={`Call now on ${phone.label}`}>Call Now</Button>
          <button className="menu-toggle" aria-label="Open menu" aria-expanded={open} aria-controls="site-menu" onClick={() => show("industries")}><span /><span /></button>
        </div>
      </div>
    </header>
    <Menu open={open} tab={tab} setTab={setTab} close={close} />
  </>;
}

/* The reference's footer: a dark card with rounded corners, inset from the page edge. Here it is navy and carries
   the live footer: the three service blurbs, the tagline, quick links, the office, and the legal line. */
function Footer() {
  return <footer className="site-footer" data-tone="base">
    <div className="footer-card" data-tone="navy" data-soft>
      <div className="footer-top">
        <div className="footer-intro">
          <a href="#top" className="footer-brand" aria-label="Aboveboard Group, back to top"><Logo /></a>
          <p data-appear>{footer.tagline}</p>
          <div className="footer-ctas" data-appear>
            <Button href={footer.phone.href} variant="white" compact>Call Now</Button>
            <Button href={footer.email.href} variant="line" compact>Email</Button>
          </div>
        </div>
        <div className="footer-services">
          {footer.services.map((service) => <div key={service.title} data-appear><h2>{service.title}</h2><p>{service.text}</p></div>)}
        </div>
      </div>
      <div className="footer-mid">
        <nav className="footer-group" aria-label="Quick Links" data-appear>
          <h2>Quick Links</h2>
          <ul>{footer.links.map(([name, href]) => <li key={name}><a href={href}>{name}</a></li>)}</ul>
        </nav>
        <div className="footer-group" data-appear>
          <h2>{footer.company}</h2>
          <address>{footer.office.map((line) => <span key={line}>{line}</span>)}<a href={footer.phone.href}>{footer.phone.label}</a><a href={footer.email.href}>{footer.email.label}</a></address>
        </div>
        <div className="footer-group" data-appear>
          <h2>Follow</h2>
          <ul className="footer-social">{socials.map((s) => <li key={s.name}><a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Aboveboard Group on ${s.name} (opens in a new tab)`}><Social icon={s.icon} /></a></li>)}</ul>
        </div>
      </div>
      <div className="footer-legal">
        <p>{footer.legal}</p>
        <p className="footer-keys">{footer.keywords.join(" | ")}</p>
        <a href="#top">Back to top <Arrow className="up" /></a>
      </div>
    </div>
  </footer>;
}

/* Everything around the homepage: header and menu, footer, smooth scroll and reveals. */
export function Shell({ children }: { children: ReactNode }) {
  usePageMotion();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" />
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </>;
}
