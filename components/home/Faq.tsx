import { Label } from "@/components/ui";
import { faq } from "@/lib/home-content";

/* The ten live questions as native disclosure widgets: they open without JavaScript and by keyboard, and the
   open/close height runs on the reveal curve where the browser supports animating to auto. */
export default function Faq() {
  return <section className="section faq" data-tone="white" id="faq" aria-labelledby="faq-title" data-soft>
    <div className="wrap split faq-split">
      <header className="section-head">
        <Label>{faq.label}</Label>
        <h2 className="section-title" id="faq-title" data-rise>{faq.title}</h2>
        <p className="section-text" data-words>{faq.text}</p>
      </header>
      <div className="qa">
        {faq.items.map((item) => <details key={item.q} data-appear>
          <summary><h3>{item.q}</h3><span className="qa-icon" aria-hidden="true" /></summary>
          <p>{item.a}</p>
        </details>)}
      </div>
    </div>
  </section>;
}
