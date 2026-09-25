import { Button, Check, Label, Photo } from "@/components/ui";
import { data, why } from "@/lib/home-content";

/* "Built On Site, Not In An Office". The reference's "Why choose" block: title, copy and a ruled list on the left,
   one tall site photo on the right. All ten live points are kept. */
export default function Why() {
  const photo = data.gallery[why.photo - 1].image;
  return <section className="section why" data-tone="white" id="why" aria-labelledby="why-title">
    <div className="wrap split why-split">
      <div>
        <header className="section-head">
          <Label>{why.label}</Label>
          <h2 className="section-title" id="why-title" data-rise>{why.title}</h2>
          {why.paragraphs.map((text) => <p className="section-text" key={text.slice(0, 20)} data-words>{text}</p>)}
        </header>
        <ul className="points">{why.points.map((point) => <li key={point} data-appear><Check />{point}</li>)}</ul>
        <div className="button-row" data-appear><Button href={why.cta.href}>{why.cta.label}</Button></div>
      </div>
      <div className="why-photo" data-image data-parallax><Photo src={photo.src} width={photo.width} height={photo.height} alt="Aboveboard Group site work" sizes="(max-width: 960px) 100vw, 44vw" /></div>
    </div>
  </section>;
}
