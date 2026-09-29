import { coverage } from "@/lib/home-content";

// Town centres (WGS84), placed in Web Mercator on the same box as the base map (lon -0.68…0.04, lat 51.18…51.56),
// the Esri World Light Gray Base built by scripts/fetch_map.py (2098 × 1773 px, scaled to a 1000 × 845 viewBox).
const BOX = { lon0: -0.68, lon1: .04, lat0: 51.18, lat1: 51.56, w: 1000, h: 845 };
const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
const towns: Record<string, [number, number, "l" | "r"]> = {
  Sutton: [51.3618, -.1945, "r"], Guildford: [51.2362, -.5704, "r"], Woking: [51.319, -.558, "r"], Epsom: [51.336, -.267, "l"],
  Reigate: [51.237, -.206, "l"], Redhill: [51.24, -.17, "r"], Croydon: [51.3762, -.0982, "r"], Kingston: [51.4123, -.3007, "l"],
  Richmond: [51.4613, -.3037, "l"], Wandsworth: [51.4571, -.191, "r"], Westminster: [51.4975, -.1357, "l"], "City of London": [51.5155, -.0922, "r"],
};
const at = (name: string) => {
  const [lat, lon] = towns[name];
  // Rounded so the server and the browser print identical numbers (their Math.log/tan can differ in the last digits).
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round((lon - BOX.lon0) / (BOX.lon1 - BOX.lon0) * BOX.w), y: round((mercY(BOX.lat1) - mercY(lat)) / (mercY(BOX.lat1) - mercY(BOX.lat0)) * BOX.h) };
};
// Mercator is locally true to scale: at Sutton's latitude one degree of longitude is 111.32 × cos(lat) km.
const MILE = Math.round(1.609 * BOX.w / ((BOX.lon1 - BOX.lon0) * 111.32 * Math.cos(51.3618 * Math.PI / 180)) * 100) / 100; // viewBox units per mile (rounded, as above)

/* The coverage block as a heatmap on a real map: each area the live homepage lists glows orange where it sits, the
   Sutton HQ glows strongest, and dashed rings mark 5, 10 and 15 miles from it. Every town links to its live area page. */
export default function CoverageMap() {
  const hq = at("Sutton");
  const areas = coverage.groups.flatMap((group) => group.areas.map((area) => ({ ...area, county: group.name, ...at(area.name) })));
  return <figure className="heatmap" data-image>
    <svg viewBox={`0 0 ${BOX.w} ${BOX.h}`} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="heat"><stop offset="0" className="hm-hot" stopOpacity=".5" /><stop offset=".45" className="hm-hot" stopOpacity=".2" /><stop offset="1" className="hm-hot" stopOpacity="0" /></radialGradient>
      </defs>
      <image href="/images/coverage-map.webp" width={BOX.w} height={BOX.h} preserveAspectRatio="none" className="hm-base" />
      <g className="hm-heat">
        {areas.map((area) => <circle key={area.name} cx={area.x} cy={area.y} r={area.name === "Sutton" ? 230 : 150} fill="url(#heat)" />)}
      </g>
      <g className="hm-rings">
        {[5, 10, 15].map((miles) => <g key={miles}>
          <circle cx={hq.x} cy={hq.y} r={miles * MILE} />
          <text x={hq.x + 8} y={hq.y - miles * MILE - 8}>{miles} mi</text>
        </g>)}
      </g>
      <text className="hm-county" x="905" y="70" textAnchor="end">LONDON</text>
      <text className="hm-county" x="60" y="800">SURREY</text>
      <text className="hm-credit" x={BOX.w - 12} y={BOX.h - 12} textAnchor="end">Map: Esri, HERE, Garmin, © OpenStreetMap contributors</text>
    </svg>
    <ul className="hm-pins">
      {areas.map((area) => <li key={area.name} className={`hm-pin hm-${towns[area.name][2]} ${area.name === "Sutton" ? "is-hq" : ""} ${area.county === "London" ? "is-london" : ""}`} style={{ left: `${(area.x / BOX.w * 100).toFixed(3)}%`, top: `${(area.y / BOX.h * 100).toFixed(3)}%` }}>
        <a href={area.href}><i aria-hidden="true" />{area.name}{area.name === "Sutton" && <b> HQ</b>}<span className="sr-only">, {area.county}</span></a>
      </li>)}
    </ul>
    {/* Phones: the pins shrink to dots, so the same areas are listed as links under the map. */}
    <div className="hm-list">{coverage.groups.map((group) => <p key={group.name}><b>{group.name}</b>{group.areas.map((area) => <a key={area.href} href={area.href}>{area.name}</a>)}</p>)}</div>
    <figcaption className="hm-legend"><span><i className="is-surrey" />Surrey</span><span><i className="is-london" />London</span><span><i className="is-ring" />Miles from our Sutton headquarters</span></figcaption>
  </figure>;
}
