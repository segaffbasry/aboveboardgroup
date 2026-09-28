import { Label, More, Social } from "@/components/ui";
import { data, reviews } from "@/lib/home-content";

const Stars = () => <span className="stars" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24"><path d="m12 2.5 2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.5l-6 3.3 1.3-6.7-5-4.6 6.8-.8z" fill="currentColor" /></svg>)}</span>;

/* The live Google reviews as one testimonial section: the score panel stays in view on the left while the five
   written reviews run in two columns beside it. Relative dates ("2 months ago") are left out because they go stale
   in a snapshot. */
export default function Voices() {
  const written = data.reviews.filter((review) => review.text);
  return <section className="section voices" data-tone="base" id="reviews" aria-labelledby="reviews-title" data-soft>
    <div className="wrap voices-grid">
      <div className="score card" data-card>
        <Label>{reviews.label}</Label>
        <h2 id="reviews-title"><span className="score-num">{reviews.rating}</span><span className="sr-only"> out of 5 stars</span></h2>
        <Stars />
        <p className="score-basis"><Social icon="google" size={16} />{reviews.basis}</p>
        <More href={reviews.all.href} external>{reviews.all.label}</More>
      </div>
      <ul className="reviews">
        {written.map((review) => <li key={review.name} className="card review" data-card>
          <Stars />
          <p>{review.text}</p>
          <p className="who"><span className="initial" aria-hidden="true">{review.avatar}</span><span><b>{review.name}</b><span>{review.reviewCount} {review.reviewCount === 1 ? "review" : "reviews"}{review.isLocalGuide ? " · Local Guide" : ""}</span></span></p>
        </li>)}
      </ul>
    </div>
  </section>;
}
