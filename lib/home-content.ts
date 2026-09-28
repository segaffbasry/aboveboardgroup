// Homepage copy, verbatim from aboveboardgroup.co.uk (captured 25 September 2026). Nothing here is invented:
// sections are reordered and merged, never rewritten. Data arrays that live in the site's JS bundle (team, stats,
// projects, gallery, tips, reviews, LinkedIn posts) come from content/home.json, made by scripts/fetch_content.py.
import home from "@/content/home.json";

export const SITE = "https://aboveboardgroup.co.uk";
/** Absolute URL on the live site. */
export const url = (path: string) => `${SITE}${path}`;
export const data = home;

export const phone = { label: "0203 3930 855", href: "tel:02033930855" };
export const email = { label: "Enquiries@aboveboardgroup.co.uk", href: "mailto:Enquiries@aboveboardgroup.co.uk" };
export const office = { label: "41 Oldfields Road, Sutton, Surrey SM1 2NB", lines: ["41 Oldfields Road", "Sutton, Surrey SM1 2NB"] };

// The live announcement strip (desktop and mobile wording), linking to the engineers' WhatsApp group.
export const strip = {
  href: "https://chat.whatsapp.com/Gf6eqvtosuS6mgTcnkkX0C?mode=gi_t",
  items: ["Looking for Air Conditioning Work? Join our WhatsApp group for live contract roles.", "AC engineers needed across London & Surrey. Get instant job alerts on your phone."],
  cta: "Join Group",
};

export const hero = {
  eyebrow: "Above Board Group",
  title: ["Air Conditioning Contractors", "London, Surrey & Surrounding Areas"],
  text: "Combining commercial air conditioning expertise with nationwide flexible workforce solutions.",
  call: { label: `Call ${phone.label}`, href: phone.href },
  contact: { label: "Contact Us", href: url("/contact") },
  quote: { title: "Get a Quick Commercial Quote", text: "Fill in your details and we'll get back to you — usually within a few hours.", cta: "Request a Quote" },
};

// "What Do You Need?" The live cards open an enquiry modal; here they lead to the enquiry section. Photos are the
// site's own "Latest Work" shots, chosen to match each service.
export const services = {
  label: "Our Services",
  title: "What Do You Need?",
  text: "Select a service below and we’ll get you sorted — fast, simple, no messing about.",
  items: [
    { title: "Commercial Air Conditioning", text: "Full commercial AC design, supply and installation. From single splits to VRF systems for offices, retail and hospitality.", cta: "Get a Quote", href: "#contact", photo: 6 },
    { title: "Day Rate", text: "Day rate AC labour nationwide. Individual installers, pairs or full teams — often filling jobs within the hour.", cta: "Request Labour", href: "#contact", photo: 4 },
    { title: "Build Your Team", text: "Permanent recruitment for HVAC & M&E roles. Experienced engineers and technicians ready to join your business.", cta: "Build Your Team", href: "#contact", photo: 3 },
    { title: "Domestic Air Conditioning", text: "Need AC at home? Our sister company Eco Fix handles all domestic installations, servicing and repairs across the South East.", cta: "Visit Eco Fix", href: "https://eco-fix.uk", photo: 9, external: true },
  ],
};

export const tip = { label: "Tip of the Day", count: "30 tips in rotation", cta: "Read more" };

export const howItWorks = {
  label: "Our Process",
  title: "How It Works",
  text: "From first contact to project handover, we keep things simple, transparent, and fast. Four straightforward steps to get your AC project moving.",
  steps: [
    { when: "Same Day", title: "Share Your Requirements", text: "Call us, send a WhatsApp, or submit your project brief. Tell us the site location, system type, timeline, and whether you need price work, day rate labour, or permanent hires." },
    { when: "Within 24 Hours", title: "Get a Quote", text: "We assess scope, review drawings if available, and provide a clear competitive quote. For labour supply, we confirm engineer availability and rates within the hour." },
    { when: "As Scheduled", title: "Deploy the Team", text: "Our F-Gas certified engineers arrive on site fully tooled, briefed, and ready. For installations, we handle RAMS, method statements, and project coordination." },
    { when: "On Completion", title: "Deliver & Handover", text: "Complete install, commissioning, testing, and full handover documentation. We sign off only when the system is running perfectly and you are fully satisfied." },
  ],
  cta: { label: "Call Now — Start Your Project", href: phone.href },
  after: "Or send us a message and we will respond within the hour",
};

export const about = {
  label: "About Us",
  title: ["Built By Engineers,", "For Engineers"],
  paragraphs: [
    "Whether you need a full project taken on price, temporary labour for ongoing works, or permanent hires to strengthen your team, Aboveboard Group makes it simple.",
    "We operate with one focus, to make sure your project is fully staffed, delivered on time, and completed to the highest standard. That's why contractors across Surrey choose us as their air conditioning contractor for projects ranging from small residential builds to large commercial developments.",
  ],
  ctas: [{ label: "View Our Work", href: "#projects" }],
  photo: 2,
};

export const why = {
  label: "Why Aboveboard",
  title: "Built On Site, Not In An Office",
  paragraphs: [
    "Aboveboard started as an air conditioning subcontractor and that remains the core of the business today. We work with air conditioning and mechanical companies across London and the South East, supplying everything from day rate labour to full subcontract installation packages.",
    "Whether you need extra engineers quickly or a team to take on an entire package, we understand what's required on site because we do it ourselves every day.",
  ],
  cta: { label: "Start Your Project", href: "#contact" },
  points: [
    "In-house AC installation teams with real site experience",
    "Labour only or labour & material subcontract packages",
    "Fast nationwide day rate labour supply",
    "Experienced with VRF, split, ducted and large commercial systems",
    "Trusted by mechanical and air conditioning contractors across London & South East",
    "Flexible support from single engineers to full install teams",
    "Projects delivered across fit-outs, refurbishments, hospitals, retail and commercial spaces",
    "Quick mobilisation for urgent labour requirements",
    "Long-standing relationships with repeat contractors and clients",
    "Straightforward communication and transparent pricing",
  ],
};

export const projects = {
  label: "Portfolio",
  title: "Recent Projects",
  text: "A selection of our commercial air conditioning and labour supply work across the South East.",
  enquire: "Enquire About This",
  // One row of three: the two Lidl jobs are the same client, so Fulham (23 FCUs) stands for both. The live card shows
  // the Lidl logo; this shows a UK Lidl store interior instead, from Wikimedia Commons, credited on the card.
  hide: [3],
  lidl: {
    image: { src: "/images/project-lidl-interior.webp", width: 1400, height: 1050 },
    alt: "Inside a Lidl store",
    credit: { label: "Photo: Eric Jones, CC BY-SA 2.0", href: "https://commons.wikimedia.org/wiki/File:Interior_view_of_Newcastle_(NI)_brand_new_Lidl_Store_-_geograph.org.uk_-_8190299.jpg" },
  },
  all: { label: "View Commercial AC Projects", href: url("/portfolio") },
};

export const commercial = {
  label: "Commercial Air Conditioning",
  title: "Commercial Air Conditioning Contractors Across London & Surrey",
  paragraphs: [
    "Aboveboard Group is a Sutton-based commercial air conditioning contractor working with facilities managers, businesses, main contractors, M&E contractors and construction companies across London, Surrey and the wider South East. From single split systems to multi-floor VRF projects, we handle commercial installation, planned maintenance, project delivery and the supply of qualified labour.",
    "Based in Sutton, we can reach most Surrey and South London locations efficiently, with coverage extending across Greater London, Central London and the M25 corridor. If you need experienced air conditioning contractors in London or Surrey, our team provides honest advice and a clear plan from survey through to commissioning.",
  ],
  systems: {
    title: "Air Conditioning Systems We Install and Support",
    items: [
      { title: "VRF & VRV Systems", text: "Multi-zone variable refrigerant flow for larger commercial buildings.", href: url("/industry/air-conditioning-contractors") },
      { title: "Split & Multi-Split Systems", text: "Flexible, cost-effective cooling for smaller spaces and individual rooms.", href: url("/industry/air-conditioning-contractors") },
      { title: "Cassette Systems", text: "Ceiling-mounted units for even air distribution in offices and retail.", href: url("/industry/air-conditioning-contractors") },
      { title: "Ducted Air Conditioning", text: "Discreet, integrated cooling for a clean interior finish.", href: url("/industry/office-fit-out-ac") },
      { title: "Close-Control & Server-Room Cooling", text: "Precision cooling for critical IT and comms environments.", href: url("/industry/data-centre-cooling") },
      { title: "Commercial Ventilation", text: "Mechanical ventilation for air quality and industrial environments.", href: url("/industry/warehouse-hvac") },
      { title: "Replacement & Upgrade Projects", text: "Modern, efficient replacements for ageing or end-of-life systems.", href: url("/industry/commercial-ac-maintenance") },
    ],
  },
  clients: {
    title: "Who We Work With",
    items: [
      { title: "Facilities & Property Managers", text: "Planned maintenance and multi-site support.", href: url("/industry/commercial-ac-maintenance") },
      { title: "Main Contractors", text: "Reliable AC subcontract packages.", href: url("/industry/main-contractors") },
      { title: "M&E Contractors", text: "Skilled AC labour and project support.", href: url("/industry/m-e-contractors") },
      { title: "Construction Companies", text: "AC packages for commercial builds.", href: url("/industry/construction-companies") },
      { title: "Offices & Commercial Premises", text: "CAT A and CAT B fit-out air conditioning.", href: url("/industry/office-fit-out-ac") },
      { title: "Retail Businesses", text: "Shop and retail park climate control.", href: url("/industry/retail-ac-installation") },
      { title: "Warehouses & Industrial Premises", text: "Heating, cooling and ventilation.", href: url("/industry/warehouse-hvac") },
      { title: "Schools & Education Facilities", text: "Safe, quiet, term-time-aware installation.", href: url("/industry/school-ac-contractors") },
      { title: "Hotels & Hospitality", text: "Guest-focused climate control.", href: url("/industry/hotel-ac-installation") },
      { title: "Healthcare Facilities", text: "Hygiene-grade HVAC and filtration.", href: url("/industry/hospital-hvac") },
      { title: "Data Centres & Server Rooms", text: "Precision, redundant cooling.", href: url("/industry/data-centre-cooling") },
    ],
  },
};

export const coverage = {
  title: "Air Conditioning Coverage Across London, Surrey & Surrounding Areas",
  text: "From our Sutton headquarters we serve commercial clients across the South East, from the Surrey towns and London boroughs to the wider M25 corridor and surrounding areas. Here are some of the locations we cover most regularly.",
  groups: [
    { name: "Surrey", areas: [["Sutton", "sutton"], ["Guildford", "guildford"], ["Woking", "woking"], ["Epsom", "epsom"], ["Reigate", "reigate"], ["Redhill", "redhill"]] },
    { name: "London", areas: [["Croydon", "croydon"], ["Kingston", "kingston-upon-thames"], ["Richmond", "richmond-upon-thames"], ["Wandsworth", "wandsworth"], ["Westminster", "westminster"], ["City of London", "city-of-london"]] },
  ].map((group) => ({ name: group.name, areas: group.areas.map(([name, slug]) => ({ name, href: url(`/areas/${slug}`) })) })),
  all: { label: "View All Areas Covered", href: url("/areas") },
};

export const guides = {
  title: "Latest Commercial Air Conditioning Guidance",
  items: [
    { title: "The Air Conditioning Installation Process", text: "What to expect from site survey through to final commissioning.", href: url("/blog/air-conditioning-installation-process-survey-to-commissioning") },
    { title: "AC Maintenance: What Facilities Managers Need to Know", text: "A practical guide to keeping systems efficient and compliant.", href: url("/blog/air-conditioning-maintenance-what-facilities-managers-need-to-know") },
    { title: "What Is VRF and Why Every Contractor Needs to Know It", text: "The dominant technology for larger commercial installations.", href: url("/blog/what-is-vrf-and-why-every-contractor-needs-to-know-it") },
    { title: "Server Room and Critical Cooling", text: "Protecting your business IT infrastructure from overheating.", href: url("/blog/server-room-critical-cooling-commercial-buildings") },
  ],
  all: { label: "View All Commercial AC Guides", href: url("/blog") },
};

export const trust = {
  label: "Trusted & Certified",
  title: "Why Businesses Trust Aboveboard Group",
  cards: [
    { title: "F-Gas Certified", text: "All engineers hold current F-Gas Category 1 certification. Full refrigerant handling compliance across every project." },
    { title: "£10m Public Liability", text: "Comprehensive insurance coverage for commercial projects of any scale — from single-unit installs to multi-building rollouts." },
    { title: "CSCS & CHAS Accredited", text: "Every operative holds CSCS cards. CHAS accredited for health and safety — meeting main contractor and site requirements." },
    { title: "Vetted Engineers Only", text: "We deploy engineers we have personally vetted and know, rather than unknown freelancers from a generalist agency." },
  ],
  badges: ["F-Gas Category 1", "CSCS Gold Card", "CHAS Accredited", "IPAF Licensed", "PASMA Certified", "DBS Checked"],

};

export const reviews = {
  label: "Google Reviews",
  rating: "5.0",
  basis: "Based on 6 Google reviews",
  all: { label: "View all reviews on Google", href: "https://www.google.com/maps?sca_esv=fca2f2dc8033dce8&output=search&q=above+board+group&source=lnms&entry=mc&ved=1t:200715&ictx=111" },
};

export const faq = {
  label: "Frequently Asked Questions",
  title: "Air Conditioning Questions Answered",
  text: "Everything you need to know about our commercial AC installation, labour supply, and maintenance services across London and Surrey.",
  items: [
    { q: "What areas do you cover for air conditioning services?", a: "Aboveboard Group covers all of London, Surrey, and the South East. We are based in Sutton, Surrey, which gives us excellent access to Central London, the Home Counties, and the wider South East region. We regularly work in Sutton, Croydon, Kingston, Guildford, Woking, Epsom, Reigate, Redhill, and all surrounding towns. Our day-rate labour service extends nationwide for larger projects." },
    { q: "Do you offer air conditioning installation near me in Surrey?", a: "Yes, if you are anywhere in Surrey — including Sutton, Guildford, Woking, Epsom, Reigate, Redhill, Dorking, Leatherhead, Cobham, Esher, or any surrounding town — we are your local air conditioning installation contractor. Being Sutton-based means we can respond faster than London-based contractors and offer competitive rates without travel surcharges across most of Surrey." },
    { q: "Can you supply temporary AC labour for my project in London?", a: "Yes, temporary AC labour supply is one of our core services across London. We provide individual engineers, pairs, and full installation teams on a day-rate basis. Our engineers are F-Gas certified, CSCS-registered, and experienced in commercial environments. We have placed engineers on projects in Central London, the City, Canary Wharf, and Greater London boroughs within 24 hours." },
    { q: "What types of air conditioning systems do you install?", a: "We install all major types of commercial air conditioning systems including VRF (Variable Refrigerant Flow), VRV (Variable Refrigerant Volume), multi-split systems, cassette units, wall-mounted splits, ducted systems, and close control units for server rooms. We work with leading manufacturers including Daikin, Mitsubishi Electric, Toshiba, Hitachi, and Samsung." },
    { q: "Do you provide air conditioning maintenance contracts?", a: "Yes, we offer tailored maintenance contracts for commercial air conditioning systems across London and Surrey. Our maintenance programmes include filter cleaning and replacement, coil cleaning, refrigerant level checks, electrical connection inspection, control system testing, and detailed performance reports. We offer annual, bi-annual, and quarterly servicing with 24-hour emergency breakdown cover." },
    { q: "How quickly can you respond to emergency AC breakdowns?", a: "For our maintenance contract customers, we offer 24-hour emergency breakdown response across London and Surrey. Our Sutton base gives us rapid access to most areas within the M25. For non-contract customers, we aim to respond within 48 hours. Our engineers carry common spare parts to maximise first-visit resolution rates." },
    { q: "Are your AC engineers F-Gas certified and insured?", a: "Every Aboveboard Group engineer holds current F-Gas certification (Category 1 or equivalent), CSCS registration, and relevant health and safety qualifications. We carry full public liability insurance (£10m+) and employer's liability insurance. All work is carried out in compliance with F-Gas regulations, Building Regulations Part L, and industry best practices." },
    { q: "Do you work with construction companies and main contractors?", a: "Yes, we regularly act as a specialist subcontractor for main contractors and construction companies on commercial builds, fit-outs, and refurbishments. We provide full design-and-build AC packages, labour-only packages, or day-rate engineer supply. We produce full RAMS, method statements, quality packs, and commissioning documentation to meet main contractor standards." },
    { q: "What is the difference between price work and day rate labour?", a: "Price work means we quote a fixed price for a defined scope of AC installation work — ideal when you have clear specifications and want cost certainty. Day rate labour means you hire our engineers by the day, giving you flexibility to scale labour up or down as your programme demands. Many clients use both: price work for defined packages and day rate for variable labour needs." },
    { q: "How do I get a quote for air conditioning installation?", a: "Getting a quote is simple. Call us on 0203 3930 855 or use our online enquiry form. We will arrange a free site survey at your convenience, assess your building's cooling requirements, discuss system options, and provide a detailed written quotation within 3-5 business days. Our quotations include full specifications, equipment schedules, and installation timelines with no hidden costs." },
  ],
};

export const contactSection = {
  label: "Get In Touch",
  title: ["Need AC Labour or", "Project Support?"],
  text: "Whether you need a full installation team, day-rate engineers, or permanent hires, we are here to help. Reach out and we will get back to you within 24 hours.",
  methods: [
    { label: "Call Us", value: phone.label, href: phone.href },
    { label: "Email Us", value: email.label, href: email.href },
    { label: "Office", value: office.label },
  ],
  quote: { title: "Get a Quick Commercial Quote", text: "Fill in your details and we'll get back to you — usually within a few hours.", cta: { label: "Request a Quote", href: url("/contact") } },
};
