// Header, full-screen menu and footer data. Every link points at a real page on aboveboardgroup.co.uk: all of them
// are in its sitemap.xml except /register and /login, which are the account routes of the live app (see README).
import { coverage, email, office, phone, url } from "@/lib/home-content";

/** Main navigation, in the live header's order. Tabbed items open the full-screen menu on that tab. */
export const nav: ({ label: string; tab: MenuTabId } | { label: string; href: string; external?: boolean })[] = [
  { label: "Areas Covered", tab: "areas" },
  { label: "Blog", tab: "guides" },
  { label: "Industries", tab: "industries" },
  { label: "Portfolio", href: url("/portfolio") },
  { label: "Tenders", href: url("/tenders") },
  { label: "Domestic AC", href: "https://eco-fix.uk", external: true },
  { label: "Contact", href: url("/contact") },
];

export type MenuTabId = "industries" | "areas" | "guides";

// Titles are the headings of the cards on the live /industry page; the blurb is that page's introduction.
const industries = [
  ["Commercial Air Conditioning Contractors", "air-conditioning-contractors"],
  ["M&E Air Conditioning Contractors", "m-e-contractors"],
  ["Main Contractor Air Conditioning Support", "main-contractors"],
  ["Construction Air Conditioning Contractors", "construction-companies"],
  ["Office Fit-Out Air Conditioning", "office-fit-out-ac"],
  ["Retail Air Conditioning", "retail-ac-installation"],
  ["Warehouse and Industrial Air Conditioning", "warehouse-hvac"],
  ["School and Education Air Conditioning", "school-ac-contractors"],
  ["Healthcare Air Conditioning", "hospital-hvac"],
  ["Hotel and Hospitality Air Conditioning", "hotel-ac-installation"],
  ["Data Centre and Server Room Cooling", "data-centre-cooling"],
  ["Commercial Air Conditioning Maintenance", "commercial-ac-maintenance"],
].map(([name, slug]) => ({ name, href: url(`/industry/${slug}`) }));

// Guide titles as the live blog data lists them: the four the homepage features, then the four newest.
const guides = [
  ["The Air Conditioning Installation Process: What to Expect from Site Survey to Final Commissioning", "air-conditioning-installation-process-survey-to-commissioning"],
  ["Air Conditioning Maintenance: What Facilities Managers Need to Know", "air-conditioning-maintenance-what-facilities-managers-need-to-know"],
  ["What Is VRF and Why Every Contractor Needs to Know It", "what-is-vrf-and-why-every-contractor-needs-to-know-it"],
  ["Server Room and Critical Cooling for Commercial Buildings: Protecting Your Business Infrastructure", "server-room-critical-cooling-commercial-buildings"],
  ["Commercial Refrigeration: Cold Rooms, Cellar Cooling and Walk-In Freezers for Hospitality and Retail", "commercial-refrigeration-cold-rooms-cellar-cooling-retail-hospitality"],
  ["CAT A vs CAT B Fit-Outs: Specifying Commercial Air Conditioning Correctly", "cat-a-vs-cat-b-fit-outs-commercial-air-conditioning"],
  ["Nationwide AC Labour Supply: When to Use Day-Rate Teams vs Price-Work Packages", "nationwide-ac-labour-supply-when-to-use-day-rate-teams-vs-price-work-packages"],
  ["Commercial AC for Care Homes and Sheltered Housing: A Facilities Manager's Guide", "commercial-ac-for-care-homes-sheltered-housing"],
].map(([name, slug]) => ({ name, href: url(`/blog/${slug}`) }));

export const menuTabs: { id: MenuTabId; label: string; blurb: string; links: { name: string; href: string }[]; all: { label: string; href: string } }[] = [
  { id: "industries", label: "Industries", blurb: "Aboveboard Group delivers commercial air conditioning installation, maintenance, HVAC project support and specialist labour across London, Surrey and the South East. We support businesses, M&E contractors, main contractors and commercial construction projects across a wide range of industries.", links: industries, all: { label: "All industries", href: url("/industry") } },
  { id: "areas", label: "Areas Covered", blurb: coverage.text, links: coverage.groups.flatMap((group) => group.areas), all: { label: coverage.all.label, href: coverage.all.href } },
  { id: "guides", label: "Blog", blurb: "Latest Commercial Air Conditioning Guidance", links: guides, all: { label: "View All Commercial AC Guides", href: url("/blog") } },
];

// Engineer accounts for the live tenders board ("Register to Bid", "Already Registered? Sign In" on /tenders).
export const account = {
  register: { label: "Register to Bid", href: url("/register") },
  login: { label: "Sign In", href: url("/login") },
};

// The live footer: three service blurbs, a tagline, quick links and the office.
export const footer = {
  services: [
    { title: "Project Delivery", text: "Complete commercial air conditioning packages delivered from drawings and specification through to installation and commissioning across London and Surrey." },
    { title: "Skilled Labour Support", text: "Experienced air conditioning engineers and operatives available for commercial projects, M&E contractors and construction programmes." },
    { title: "Build Your Team", text: "Our recruitment process is run by people who’ve spent years in the trade, so we understand exactly what makes a good fit." },
  ],
  tagline: "Air Conditioning Contractor Surrey. Delivering AC Projects & People across the South East.",
  links: [["Areas Covered", url("/areas")], ["Blog", url("/blog")], ["Industries", url("/industry")], ["Portfolio", url("/portfolio")], ["Tenders", url("/tenders")], ["Contact", url("/contact")]],
  company: "AboveBoard Group",
  office: office.lines,
  phone,
  email,
  legal: "© 2026 AboveBoard Group. All rights reserved.",
  keywords: ["Air Conditioning Contractor Surrey", "AC Labour London", "Commercial AC South East"],
};

export const socials = [
  { name: "LinkedIn", icon: "linkedin", href: "https://uk.linkedin.com/company/aboveboardgroup" },
  { name: "Google", icon: "google", href: "https://share.google/tGbo7RgvwlKxPrW62" },
] as const;
