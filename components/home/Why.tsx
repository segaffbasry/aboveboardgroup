import { Button, Check, Label } from "@/components/ui";
import { why } from "@/lib/home-content";

/* "Built On Site, Not In An Office" as a bento instead of a list beside a photo: a navy card holds the story and
   the CTA, and the ten live points sit beside it as numbered tiles. */
export default function Why() {
  return <section className="section why" data-tone="white" id="why" aria-labelledby="why-title">
    <div className="wrap why-bento">
      <div className="why-card" data-tone="navy" data-card>
        <Label>{why.label}</Label>
        <h2 className="section-title" id="why-title">{why.title}</h2>
        {why.paragraphs.map((text) => <p key={text.slice(0, 20)}>{text}</p>)}
        <div className="button-row"><Button href={why.cta.href} variant="white">{why.cta.label}</Button></div>
      </div>
      <ul className="why-tiles">
        {why.points.map((point, i) => <li key={point} data-card>
          <span className="why-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <Check />
          <p>{point}</p>
        </li>)}
      </ul>
    </div>
  </section>;
}
