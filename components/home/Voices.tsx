import { Label, More, Photo, Social } from "@/components/ui";
import { data, linkedin, reviews } from "@/lib/home-content";

const Stars = () => <span className="stars" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24"><path d="m12 2.5 2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.5l-6 3.3 1.3-6.7-5-4.6 6.8-.8z" fill="currentColor" /></svg>)}</span>;

/* Google reviews and the LinkedIn feed from the live homepage, in the reference's testimonial layout: a score
   card, then the written reviews as a masonry of white cards; then the directors' posts about the work. Relative
   dates ("2 months ago", "3w") are left out because they go stale in a snapshot. */
export default function Voices() {
  const written = data.reviews.filter((review) => review.text);
  const avatars = data.avatars as Record<string, { src: string; width: number; height: number }>;
  return <section className="section voices" data-tone="base" id="reviews" aria-labelledby="reviews-title" data-soft>
    <div className="wrap">
      <header className="section-head split-head">
        <div>
          <Label>{reviews.label}</Label>
          <h2 className="section-title" id="reviews-title" data-rise><span className="score">{reviews.rating}</span> <Stars /><span className="sr-only">out of 5 stars</span></h2>
          <p className="section-text" data-appear>{reviews.basis}</p>
        </div>
        <div data-appear><More href={reviews.all.href} external>{reviews.all.label}</More></div>
      </header>
      <ul className="reviews">
        {written.map((review) => <li key={review.name} className="card review" data-card>
          <Stars />
          <p>{review.text}</p>
          <p className="who"><span className="initial" aria-hidden="true">{review.avatar}</span><span><b>{review.name}</b><span>{review.reviewCount} {review.reviewCount === 1 ? "review" : "reviews"}{review.isLocalGuide ? " · Local Guide" : ""}</span></span></p>
        </li>)}
      </ul>

      <div className="feed">
        <header className="split-head feed-head">
          <div>
            <Label>{linkedin.label}</Label>
            <h3 className="sub-title" data-rise>{linkedin.title}</h3>
          </div>
          <div data-appear><More href={linkedin.href} external>{linkedin.cta}</More></div>
        </header>
        <ul className="posts">
          {data.posts.map((post) => <li key={post.id} data-card>
            <a className="card post" href={linkedin.href} target="_blank" rel="noopener noreferrer">
              <span className="post-who">
                <Photo src={avatars[post.profileId].src} width={avatars[post.profileId].width} height={avatars[post.profileId].height} className="avatar" />
                <span><b>{post.author}</b><span>{post.title.split(" | ")[0]}</span></span>
                <span className="post-in"><Social icon="linkedin" size={16} /></span>
              </span>
              <span className="post-text">{post.text}</span>
              <span className="post-more">…more<span className="sr-only"> on LinkedIn (opens in a new tab)</span></span>
            </a>
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}
