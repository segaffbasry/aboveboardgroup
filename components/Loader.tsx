"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { registerMotion } from "@/components/motion";
import { Logo, reducedMotion } from "@/components/ui";
import { reveal } from "@/lib/ease";

// Budget: the page must be usable within ~2 s of navigation even if hydration is slow.
const BUDGET = 2400;

/* The company signing its name, built from the traced logo on one GSAP timeline. The mark is a flame over a wave
   in a bowl, so it is lit rather than tiled:
   build  (0.10–0.95 s) the bowl rises into place, the wave wipes across it left to right, the flame grows up out of
                        the bowl from its base and the small hook flicks on; then ABOVEBOARD rises letter by letter
                        and GROUP wipes in beneath it
   hold   (0.95–1.20 s)
   exit   (1.20–1.85 s) the handover fires, the wordmark lifts away, the mark flies into the header logo's position
                        and scale while the ground fades, so the loader lands as the header logo. */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const root = document.documentElement;
    let handed = false;
    const handover = () => {
      if (handed) return; handed = true;
      root.classList.remove("is-loading");
      root.dataset.intro = "done";
      document.dispatchEvent(new Event("intro:done"));
    };
    const finish = () => { handover(); root.dataset.logo = "landed"; el.style.display = "none"; };
    el.style.animation = "none"; // JS is running, so the CSS fallback exit is not needed.

    const late = performance.now() > BUDGET - 1300;
    if (reducedMotion() || late || !root.classList.contains("is-loading")) { finish(); return; }

    registerMotion();
    const part = (id: string) => el.querySelector<SVGPathElement>(`[data-part="${id}"]`);
    const parts = (group: string) => el.querySelectorAll<SVGPathElement>(`[data-group="${group}"]`);
    const markSet = el.querySelector<SVGGElement>('[data-set="mark"]')!;
    const wordSet = el.querySelector<SVGGElement>('[data-set="word"]')!;

    // Where the mark has to land: the mark inside the header logo. Its own box is measured once, before any tween
    // moves a part; the target is re-measured every frame, so the flight follows the header if it shifts while the
    // page settles. GSAP moves an SVG group in viewBox units, so screen px are divided by the logo's px-per-unit.
    const svg = el.querySelector<SVGSVGElement>("svg")!;
    const from = markSet.getBoundingClientRect();
    const fly = { p: 0 };
    const land = () => {
      const target = document.querySelector<SVGGElement>('.site-header .brand [data-set="mark"]');
      const unit = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
      const box = target?.getBoundingClientRect();
      const to = box && box.width > 0 && from.width > 0 ? box : undefined; // a hidden header or loader has no box to fly to
      const x = to ? (to.left + to.width / 2 - (from.left + from.width / 2)) / unit : 0;
      const y = to ? (to.top + to.height / 2 - (from.top + from.height / 2)) / unit : -40 / unit;
      const scale = to ? to.width / from.width : .6;
      gsap.set(markSet, { x: x * fly.p, y: y * fly.p, scale: 1 + (scale - 1) * fly.p, transformOrigin: "50% 50%" });
    };

    const tl = gsap.timeline({ onComplete: finish });
    tl.set(el.querySelectorAll(".lp"), { opacity: 1 }, 0)
      .fromTo(part("bowl"), { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: reveal.duration * .8, ease: reveal.ease }, .1)
      .fromTo(part("wave"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .45, ease: "power2.inOut" }, .22)
      .fromTo(part("flame"), { scale: .2, opacity: 0, transformOrigin: "40% 100%" }, { scale: 1, opacity: 1, duration: reveal.duration * .8, ease: reveal.ease }, .3)
      .fromTo(part("hook"), { scale: 0, opacity: 0, transformOrigin: "0% 100%" }, { scale: 1, opacity: 1, duration: .35, ease: "back.out(2.4)" }, .5)
      .fromTo(parts("word"), { y: 110, opacity: 0 }, { y: 0, opacity: 1, duration: reveal.duration * .6, ease: reveal.ease, stagger: .03 }, .42)
      .fromTo(parts("group"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .4, ease: "power2.inOut", stagger: .04 }, .62)
      .call(handover, [], 1.2)
      .to(wordSet, { y: -24, opacity: 0, duration: .35, ease: "power2.in" }, 1.2)
      .to(fly, { p: 1, duration: .6, ease: "power3.inOut", onUpdate: land }, 1.22)
      .to(el, { backgroundColor: "rgba(246, 247, 249, 0)", duration: .45, ease: "power2.inOut" }, 1.38)
      .to({}, { duration: .47 }, 1.38);

    // Dev only: lets the verification step seek the timeline and capture each stage.
    if (process.env.NODE_ENV !== "production") (window as unknown as { __intro?: gsap.core.Timeline }).__intro = tl;

    return () => { tl.kill(); gsap.killTweensOf(markSet); if (!handed) finish(); };
  }, []);

  return <div className="loader" ref={ref} aria-hidden="true">
    <Logo className="loader-logo" />
  </div>;
}
