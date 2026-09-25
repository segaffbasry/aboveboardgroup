// Motion tokens measured on the reference, airmastersolutions.com (Framer). One easing family for the whole page.
//
// Source: the page's <script type="framer/appear"> config and a requestAnimationFrame probe on the live buttons.
//   Reveal spring   {type:"spring", stiffness:400, damping:60, mass:1}, from y:40 and opacity .001 (every section
//                   block on the page uses it; delays .6 in the hero)
//   Appear tween    {type:"tween", duration:.4, ease:[.44,0,.56,1]} (the hero fade, delay 1.5)
//   Button hover    the same .4 s tween [.44,0,.56,1] (fill, arrow disc and the arrow's -45° → 0° turn). Sampled on
//                   "Get Started Now": rotation -40.02° at 99 ms, -23.5° at 199 ms, -6.15° at 299 ms, 0 at 415 ms,
//                   which fits cubic-bezier(.45,0,.55,.95) with an rms error of .003, i.e. Framer's default ease.

type Spring = { stiffness: number; damping: number; mass?: number };

/** Position (0 → 1) of a spring released from rest at time t, in seconds. */
function position({ stiffness, damping, mass = 1 }: Spring, t: number) {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + (zeta * w0 / wd) * Math.sin(wd * t));
  }
  if (zeta === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  const root = Math.sqrt(zeta * zeta - 1);
  const r1 = -w0 * (zeta - root), r2 = -w0 * (zeta + root);
  return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
}

/** Time for the spring to stay within 0.2% of rest, which becomes the tween duration. */
function settle(spring: Spring) {
  let last = 0;
  for (let t = 0; t < 3; t += .002) if (Math.abs(1 - position(spring, t)) > .002) last = t;
  return last;
}

/** Turns a physical spring into a GSAP ease plus the duration it needs. */
function springEase(spring: Spring) {
  const duration = settle(spring);
  return { duration, ease: (p: number) => (p >= 1 ? 1 : position(spring, p * duration)) };
}

/** The reveal spring: overdamped (ζ = 1.5), so it glides in without overshoot. Settles in ≈ .83 s. */
export const reveal = springEase({ stiffness: 400, damping: 60 });
/** Rise distance of the reference's appear effect, in px. */
export const RISE = 40;

/** Framer's default tween, used for labels, buttons and small fades. */
export const appear = { duration: .4, ease: "appear", step: .1, bezier: [.44, 0, .56, 1] as const };
