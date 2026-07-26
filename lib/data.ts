/**
 * Every dataset declared in the four design components' `renderVals()`,
 * extracted verbatim and strongly typed. Copy is never rewritten.
 *
 * Image `alt` text describes the photograph actually shipped in
 * `public/images/` (see `public/images/CREDITS.md`), not the design's
 * placeholder caption — alt text has to match what a sighted user sees.
 */
import type {
  Brand,
  BusinessHour,
  CatalogService,
  ComparisonRow,
  Faq,
  FeaturedPost,
  FinanceBenefit,
  FinanceExample,
  InfoCard,
  MaintenancePlan,
  MethodStep,
  Perk,
  Post,
  ProcessStep,
  Project,
  ProjectFilter,
  Service,
  SpecRow,
  Statistic,
  Testimonial,
  TimingOption,
  WhyCard,
} from '@/types';

/* -- Home / services ------------------------------------------------------ */

export const services: readonly Service[] = [
  {
    icon: 'wind',
    title: 'Air Conditioning',
    body: 'Right-sized installs, precision repairs and refrigerant work on every major split, mini-split and package unit.',
    popular: true,
  },
  {
    icon: 'flame',
    title: 'Heating',
    body: 'Furnaces, boilers and hydronics — diagnosed by combustion analysis, not a coin-flip parts swap.',
    popular: false,
  },
  {
    icon: 'thermometer-sun',
    title: 'Heat Pumps',
    body: 'Cold-climate and dual-fuel heat pumps that heat and cool on one efficient system. Rebate paperwork included.',
    popular: true,
  },
  {
    icon: 'leaf',
    title: 'Indoor Air Quality',
    body: 'Filtration, whole-home ventilation, humidity control and UV — measured against real particulate readings.',
    popular: false,
  },
  {
    icon: 'building-2',
    title: 'Commercial HVAC',
    body: 'RTUs, VRF and building controls for offices, retail and light industrial. Planned-maintenance contracts.',
    popular: false,
  },
  {
    icon: 'siren',
    title: 'Emergency Repairs',
    body: 'No heat, no cool, no problem. Live dispatch 24/7/365 with a technician at your door, fast.',
    popular: false,
  },
];

export const moreServices: readonly string[] = [
  'Smart Thermostats',
  'Preventive Maintenance',
  'System Installation',
  'Full Replacement',
  'Residential HVAC',
  'Duct Sealing',
];

/* -- Brand marquee -------------------------------------------------------- */

export const brands: readonly Brand[] = [
  { name: 'Carrier' },
  { name: 'Trane' },
  { name: 'Daikin' },
  { name: 'Lennox' },
  { name: 'Goodman' },
  { name: 'Bryant' },
  { name: 'York' },
  { name: 'Mitsubishi Electric' },
  { name: 'Bosch' },
  { name: 'Rheem' },
];

/* -- Home / why choose us ------------------------------------------------- */

export const whyCards: readonly WhyCard[] = [
  {
    icon: 'ruler',
    title: 'Load-calc first',
    body: 'Manual J on every install. We size to the building, not the old box.',
  },
  {
    icon: 'gauge',
    title: 'Commissioned',
    body: 'Airflow, static pressure and charge verified and handed to you in writing.',
  },
  {
    icon: 'shield-check',
    title: 'Warranty-backed',
    body: '10-yr parts, 2-yr labor, and a comfort guarantee on new systems.',
  },
  {
    icon: 'users',
    title: 'Own crews',
    body: 'W-2 EPA-certified technicians. No day-labor subs on your property.',
  },
];

export const stats: readonly Statistic[] = [
  { n: 18400, suffix: '+', display: '18,400+', label: 'Systems commissioned' },
  { n: 4.9, suffix: '', display: '4.9', label: 'Google rating' },
  { n: 27, suffix: '', display: '27', label: 'Years in business' },
  { n: 60, suffix: 'm', display: '60m', label: 'Avg. response' },
];

/* -- Home / hero variants ------------------------------------------------- */

export const heroStats: readonly Statistic[] = [
  { n: 18400, suffix: '+', display: '18,400+', label: 'Installs' },
  { n: 4.9, suffix: '', display: '4.9', label: 'Google score' },
  { n: 27, suffix: '', display: '27', label: 'Years' },
  { n: 60, suffix: 'm', display: '60m', label: 'Response' },
];

export const specRows: readonly SpecRow[] = [
  { no: '01', prop: 'Systems commissioned', n: 18400, suffix: '+', val: '18,400+' },
  { no: '02', prop: 'Average response time', n: 60, suffix: ' min', val: '60 min' },
  { no: '03', prop: 'First-visit fix rate', n: 96, suffix: '%', val: '96%' },
  { no: '04', prop: 'Years in the field', n: 27, suffix: '', val: '27' },
];

/* -- Home / process ------------------------------------------------------- */

export const processSteps: readonly ProcessStep[] = [
  {
    no: '01',
    icon: 'calendar-check',
    title: 'Book',
    body: 'Call or book online. We confirm a two-hour arrival window by text.',
    delay: 0,
  },
  {
    no: '02',
    icon: 'search',
    title: 'Inspect',
    body: 'A certified tech diagnoses with instruments — combustion, airflow, charge.',
    delay: 80,
  },
  {
    no: '03',
    icon: 'file-text',
    title: 'Quote',
    body: 'A written, fixed-price options sheet. You approve before we touch a wrench.',
    delay: 160,
  },
  {
    no: '04',
    icon: 'wrench',
    title: 'Repair',
    body: 'Clean, labeled workmanship. We protect your floors and haul the old gear.',
    delay: 240,
  },
  {
    no: '05',
    icon: 'smile',
    title: 'Comfort',
    body: 'System commissioned, numbers verified, and a follow-up to make sure.',
    delay: 320,
  },
];

/* -- Home / projects ------------------------------------------------------ */

export const projectFilters: readonly ProjectFilter[] = [
  'All',
  'Commercial',
  'Residential',
  'Heating',
  'Cooling',
];

export const projects: readonly Project[] = [
  {
    id: 'pr1',
    title: 'Mission District triplex',
    type: 'Residential',
    mode: 'Cooling',
    body: 'Three ductless mini-split zones, one condenser. Quiet, and no ductwork demo.',
    image: {
      src: '/images/project-mission-district-triplex.jpg',
      alt: 'Ductless mini-split indoor head mounted high on an interior wall',
    },
  },
  {
    id: 'pr2',
    title: 'SoMa creative office',
    type: 'Commercial',
    mode: 'Cooling',
    body: '12-ton VRF retrofit with per-room controls across two floors.',
    image: {
      src: '/images/project-soma-creative-office.jpg',
      alt: 'Chiller plant serving a multi-storey commercial office building',
    },
  },
  {
    id: 'pr3',
    title: 'Noe Valley Victorian',
    type: 'Residential',
    mode: 'Heating',
    body: 'High-efficiency modulating furnace replacing a 1970s gravity unit.',
    image: {
      src: '/images/project-noe-valley-victorian.jpg',
      alt: 'Air-handling unit installed in a clean mechanical room',
    },
  },
  {
    id: 'pr4',
    title: 'Peninsula medical suite',
    type: 'Commercial',
    mode: 'Cooling',
    body: 'Redundant package units with BMS integration for a 24/7 clinic.',
    image: {
      src: '/images/project-peninsula-medical-suite.jpg',
      alt: 'Redundant packaged cooling plant on a facility roof',
    },
  },
  {
    id: 'pr5',
    title: 'Berkeley bungalow',
    type: 'Residential',
    mode: 'Heating',
    body: 'Cold-climate heat pump + backup, fully electrified off gas.',
    image: {
      src: '/images/project-berkeley-bungalow.jpg',
      alt: 'Outdoor condensing unit installed in a residential garden beside a house',
    },
  },
  {
    id: 'pr6',
    title: 'Oakland warehouse',
    type: 'Commercial',
    mode: 'Heating',
    body: 'High-bay radiant + destratification fans for an events space.',
    image: {
      src: '/images/project-oakland-warehouse.jpg',
      alt: 'High-bay warehouse interior with mechanical services running along the ceiling',
    },
  },
];

export const beforeAfter = {
  title: 'Before / after — attic retrofit, 1962 colonial',
  caption: 'Drag the handle. Same footprint, +38% measured efficiency, −$1,180 / yr in energy.',
  before: {
    src: '/images/before-attic-retrofit.jpg',
    alt: 'Before: an aged furnace surrounded by tangled, unlabelled pipework',
  },
  after: {
    src: '/images/after-attic-retrofit.jpg',
    alt: 'After: a tidy plant room with clean, labelled pipe runs and modern equipment',
  },
} as const;

/* -- Home / testimonials -------------------------------------------------- */

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      '"They ran a load calc and told me my last contractor sold me a unit two tons too big. The new system is quieter, cheaper, and actually keeps the second floor cool."',
    name: 'Danielle Okafor',
    role: 'Homeowner',
    location: 'Noe Valley, SF',
    system: '2.5-ton heat pump + air handler',
    image: {
      src: '/images/testimonial-danielle-okafor.png',
      alt: 'Placeholder portrait frame for Danielle Okafor',
    },
  },
  {
    quote:
      '"Our clinic can’t lose cooling for a minute. AeroCore designed redundancy in, integrated it with our BMS, and their maintenance contract has kept us at zero downtime for three years."',
    name: 'Marcus Bell',
    role: 'Facilities Director',
    location: 'Peninsula',
    system: 'Redundant 20-ton package units',
    image: {
      src: '/images/testimonial-marcus-bell.png',
      alt: 'Placeholder portrait frame for Marcus Bell',
    },
  },
  {
    quote:
      '"Fixed-price quote, no surprises, and the tech labeled every wire and duct before he left. It looks like a diagram in there now. Worth every dollar."',
    name: 'Priya Nair',
    role: 'Homeowner',
    location: 'Berkeley',
    system: 'Cold-climate heat pump conversion',
    image: {
      src: '/images/testimonial-priya-nair.png',
      alt: 'Placeholder portrait frame for Priya Nair',
    },
  },
];

/* -- Maintenance plans (home teaser + plans page) ------------------------- */

export const maintenancePlans: readonly MaintenancePlan[] = [
  {
    name: 'Essential',
    tagline: 'Keep the warranty valid.',
    price: '$14',
    period: 'mo',
    annual: 'or $149 / year',
    popular: false,
    cta: 'Choose Essential',
    theme: {
      bg: 'var(--color-bg)',
      fg: 'var(--color-text)',
      corner: 'color-mix(in srgb, var(--color-text) 55%, transparent)',
      rule: 'var(--color-divider)',
      check: 'var(--color-accent-700)',
      btnClass: 'btn-secondary',
    },
    homeFeatures: [
      '1 precision tune-up / year',
      '15% off all repairs',
      'Priority scheduling',
      'No dispatch fee',
    ],
    features: [
      '1 precision tune-up / year',
      '15% off all repairs',
      'Priority scheduling',
      'No dispatch fee',
      'Warranty compliance report',
    ],
  },
  {
    name: 'Comfort',
    tagline: 'The one most homes pick.',
    price: '$29',
    period: 'mo',
    annual: 'or $299 / year',
    popular: true,
    cta: 'Choose Comfort',
    theme: {
      bg: 'var(--color-accent-900)',
      fg: 'var(--color-bg)',
      corner: 'var(--color-accent-300)',
      rule: 'color-mix(in srgb, var(--color-bg) 22%, transparent)',
      check: 'var(--color-accent-300)',
      btnClass: 'btn-primary',
    },
    homeFeatures: [
      '2 tune-ups / year (heat + cool)',
      '20% off all repairs',
      'Same-day priority dispatch',
      'No overtime charges, ever',
      'Filters delivered to your door',
    ],
    features: [
      '2 tune-ups / year (heat + cool)',
      '20% off all repairs',
      'Same-day priority dispatch',
      'No overtime charges, ever',
      'Filters delivered to your door',
      'Annual efficiency report',
    ],
  },
  {
    name: 'Total Care',
    tagline: 'Whole-home peace of mind.',
    price: '$49',
    period: 'mo',
    annual: 'or $499 / year',
    popular: false,
    cta: 'Choose Total Care',
    theme: {
      bg: 'var(--color-bg)',
      fg: 'var(--color-text)',
      corner: 'color-mix(in srgb, var(--color-text) 55%, transparent)',
      rule: 'var(--color-divider)',
      check: 'var(--color-accent-700)',
      btnClass: 'btn-secondary',
    },
    homeFeatures: [
      'Everything in Comfort',
      '25% off repairs + parts',
      'Annual IAQ + duct inspection',
      '1 free emergency call / year',
      'Transferable if you sell',
    ],
    features: [
      'Everything in Comfort',
      '25% off repairs + parts',
      'Annual IAQ + duct inspection',
      '1 free emergency call / year',
      'Transferable if you sell',
      'Locked repair pricing',
    ],
  },
];

export const planComparison: readonly ComparisonRow[] = [
  { feature: 'Precision tune-ups per year', essential: '1', comfort: '2', totalCare: '2' },
  { feature: 'Repair discount', essential: '15%', comfort: '20%', totalCare: '25%' },
  { feature: 'Priority scheduling', essential: '✓', comfort: 'Same-day', totalCare: 'Same-day' },
  { feature: 'No dispatch fee', essential: '✓', comfort: '✓', totalCare: '✓' },
  { feature: 'No overtime charges', essential: '—', comfort: '✓', totalCare: '✓' },
  { feature: 'Filters delivered', essential: '—', comfort: '✓', totalCare: '✓' },
  { feature: 'IAQ + duct inspection', essential: '—', comfort: '—', totalCare: '✓' },
  { feature: 'Free emergency call / yr', essential: '—', comfort: '—', totalCare: '1' },
  { feature: 'Transferable on sale', essential: '—', comfort: '—', totalCare: '✓' },
];

export const planPerks: readonly Perk[] = [
  {
    icon: 'trending-down',
    title: 'Lower bills',
    body: 'A tuned system runs up to 15% cheaper. The plan often pays for itself by spring.',
  },
  {
    icon: 'shield-check',
    title: 'Warranty kept valid',
    body: 'Manufacturers require documented annual service. We keep the paperwork current.',
  },
  {
    icon: 'zap',
    title: 'Skip the queue',
    body: 'Members get same-day priority dispatch, even in the summer and winter rush.',
  },
  {
    icon: 'clock',
    title: 'Fewer surprises',
    body: 'We catch worn parts on the bench, not at 2am on the coldest night of the year.',
  },
];

export const planFaqs: readonly Faq[] = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Monthly plans can be cancelled at any time with no penalty. Annual plans are pro-rated if you cancel mid-term.',
  },
  {
    q: 'Does the discount stack with financing?',
    a: 'The repair discount applies to labor and parts on service calls. New-system installs are handled separately and pair with our 0% financing and rebate filing.',
  },
  {
    q: 'What does a precision tune-up include?',
    a: 'A 26-point inspection: refrigerant charge, static pressure, airflow, electrical draw, combustion safety (for gas), condensate, and a full efficiency reading — documented and emailed to you.',
  },
  {
    q: 'I have two systems. How does that work?',
    a: 'Each plan covers one system. Add additional systems for $9/mo each, and every system gets its own tune-ups and reporting.',
  },
];

/* -- Home / financing ----------------------------------------------------- */

export const financeBenefits: readonly FinanceBenefit[] = [
  {
    icon: 'percent',
    title: '0% APR up to 18 months',
    body: 'On qualifying system installations, on approved credit.',
  },
  {
    icon: 'shield-check',
    title: 'Soft-pull pre-qualification',
    body: 'See your rate in 60 seconds with no impact to your credit score.',
  },
  {
    icon: 'calendar-clock',
    title: 'Terms up to 120 months',
    body: 'Fixed low rates spread the cost of a new system into a small monthly.',
  },
  {
    icon: 'badge-check',
    title: 'Rebates handled for you',
    body: 'We file the utility and federal rebate paperwork on your behalf.',
  },
];

export const financeExamples: readonly FinanceExample[] = [
  { label: 'Ductless single-zone', total: '$4,900', month: '$104' },
  { label: 'Full central AC + coil', total: '$8,600', month: '$183' },
  { label: 'Heat pump whole-home', total: '$14,200', month: '$301' },
];

/* -- Home / service areas ------------------------------------------------- */

export const serviceAreas: readonly string[] = [
  'San Francisco',
  'Oakland',
  'Berkeley',
  'Daly City',
  'San Mateo',
  'Fremont',
  'Walnut Creek',
  'San Jose',
];

/* -- Home / blog ---------------------------------------------------------- */

export const featuredPost: FeaturedPost = {
  cat: 'Efficiency',
  read: '6 min read',
  title: 'How to read a SEER2 rating without getting upsold',
  excerpt:
    'The single number on the yellow sticker hides three things your contractor hopes you won’t ask about. Here’s how to size, spec and compare systems like an engineer would — and where the real savings actually come from.',
  image: {
    src: '/images/blog-seer2-rating.jpg',
    alt: 'Smart thermostat mounted on a wall showing a temperature and efficiency readout',
  },
};

export const posts: readonly Post[] = [
  {
    id: 'bp1',
    cat: 'Maintenance',
    read: '4 min',
    title: 'The 5-minute filter check that saves $400 a year',
    image: {
      src: '/images/blog-filter-check.png',
      alt: 'Pleated HVAC air filter removed from its housing',
    },
  },
  {
    id: 'bp2',
    cat: 'Heat Pumps',
    read: '7 min',
    title: 'Do heat pumps actually work in cold weather?',
    image: {
      src: '/images/blog-cold-weather-heat-pumps.jpg',
      alt: 'Outdoor heat pump unit running in snow',
    },
  },
  {
    id: 'bp3',
    cat: 'Buying Guide',
    read: '5 min',
    title: 'Repair or replace? The 5,000-rule, explained',
    image: {
      src: '/images/blog-repair-or-replace.jpg',
      alt: 'Technician inspecting an outdoor condensing unit',
    },
  },
];

/* -- Home / FAQ ----------------------------------------------------------- */

export const homeFaqs: readonly Faq[] = [
  {
    q: 'How fast can you get here for an emergency?',
    a: 'Our 24/7 line is answered live — never a machine. Average on-site response is under 60 minutes in our core metros, and we confirm a two-hour arrival window by text the moment you book.',
  },
  {
    q: 'Do you charge for estimates?',
    a: 'Replacement and new-system estimates are always free, including a full load calculation and a written, fixed-price options sheet. Diagnostic visits for repairs carry a flat dispatch fee that we waive if you proceed with the work.',
  },
  {
    q: 'Are your technicians licensed and insured?',
    a: 'Every technician is EPA 608 certified and works under our C-20 contractor license (#984120). We are fully bonded and insured, and we never use day-labor subcontractors on your property.',
  },
  {
    q: 'What brands do you install and service?',
    a: 'We are factory-authorized on Carrier, Trane, Daikin, Lennox, Bryant, Mitsubishi Electric, Bosch and more — and we service every major brand regardless of who installed it.',
  },
  {
    q: 'Do you offer financing?',
    a: 'Yes — 0% APR for up to 18 months on approved credit, plus fixed low-rate terms up to 120 months. A soft-pull pre-qualification takes about a minute and won’t affect your credit score.',
  },
  {
    q: 'What’s included in a maintenance plan?',
    a: 'Plans start at two precision tune-ups a year, priority dispatch, discounted repairs and no overtime charges. Higher tiers add air-quality inspections, filter delivery and a free annual emergency call.',
  },
];

/* -- Home / imagery ------------------------------------------------------- */

export const homeImages = {
  heroSplit: {
    src: '/images/hero-technician.jpg',
    alt: 'HVAC technician servicing a rooftop air-conditioning unit',
  },
  heroWide: {
    src: '/images/hero-rooftop-array.jpg',
    alt: 'Rooftop packaged air-conditioning units on a commercial building',
  },
  heroSpec: {
    src: '/images/hero-technician-gauge.jpg',
    alt: 'Technician taking instrument readings while commissioning a cooling system',
  },
  whyTeam: {
    src: '/images/why-choose-us-team.jpg',
    alt: 'AeroCore technicians working together on mechanical plant',
  },
} as const;

/* -- Services page -------------------------------------------------------- */

export const serviceCatalog: readonly CatalogService[] = [
  {
    icon: 'wind',
    title: 'Air Conditioning',
    tag: 'Most requested',
    body: 'Central, ductless and package cooling — sized by Manual J, not the last guy’s box.',
    points: [
      'Load-calc-based sizing',
      'Refrigerant + charge verification',
      'SEER2 efficiency reporting',
    ],
  },
  {
    icon: 'flame',
    title: 'Heating',
    body: 'Furnaces, boilers and hydronic systems diagnosed by combustion analysis.',
    points: ['Gas + electric furnaces', 'Boiler & radiant service', 'Combustion safety testing'],
  },
  {
    icon: 'thermometer-sun',
    title: 'Heat Pumps',
    tag: 'Rebate-eligible',
    body: 'Cold-climate and dual-fuel heat pumps that heat and cool on one system.',
    points: ['Cold-climate models', 'Dual-fuel changeover setup', 'Rebate paperwork filed for you'],
  },
  {
    icon: 'leaf',
    title: 'Indoor Air Quality',
    body: 'Filtration, ventilation, humidity and UV — tuned to real particulate readings.',
    points: ['MERV + HEPA filtration', 'Whole-home ventilation', 'Humidity & UV control'],
  },
  {
    icon: 'building-2',
    title: 'Commercial HVAC',
    body: 'RTUs, VRF and building controls for offices, retail and light industrial.',
    points: ['VRF & rooftop units', 'BMS / controls integration', 'Planned-maintenance contracts'],
  },
  {
    icon: 'home',
    title: 'Residential HVAC',
    body: 'Whole-home comfort design for houses, condos and multi-family.',
    points: ['Zoning & duct design', 'Multi-family systems', 'Comfort guarantee'],
  },
  {
    icon: 'gauge',
    title: 'Smart Thermostats',
    body: 'Learning thermostats and zoning, configured and commissioned properly.',
    points: ['Ecobee / Nest / Honeywell', 'Multi-zone setup', 'Utility demand-response'],
  },
  {
    icon: 'wrench',
    title: 'Maintenance',
    body: 'Precision tune-ups that keep efficiency high and warranties valid.',
    points: ['Two-visit seasonal plans', 'Priority dispatch', 'Filter delivery'],
  },
  {
    icon: 'siren',
    title: 'Emergency Repairs',
    tag: '24/7',
    body: 'No heat, no cool, no problem. Live dispatch 24/7/365, fast on-site.',
    points: ['Answered live, never a machine', 'Sub-60-min core response', 'Upfront flat pricing'],
  },
  {
    icon: 'package',
    title: 'Installation',
    body: 'Clean, labeled, permit-pulled installs commissioned to spec.',
    points: ['Permitted & inspected', 'Labeled ducts & wiring', 'Old equipment hauled away'],
  },
  {
    icon: 'refresh-cw',
    title: 'Replacement',
    body: 'Right-sized system replacement with financing and rebates built in.',
    points: ['Fixed-price options sheet', '0% financing available', 'Federal + utility rebates'],
  },
];

export const methodSteps: readonly MethodStep[] = [
  {
    no: '01',
    title: 'Measure',
    body: 'Manual J load calc, static pressure and airflow before a single recommendation.',
  },
  {
    no: '02',
    title: 'Design',
    body: 'Equipment matched to the building — efficiency, comfort and budget on paper.',
  },
  {
    no: '03',
    title: 'Install',
    body: 'Own W-2 crews, permits pulled, floors protected, everything labeled.',
  },
  {
    no: '04',
    title: 'Commission',
    body: 'Charge, airflow and combustion verified and handed to you in writing.',
  },
];

/* -- Contact page --------------------------------------------------------- */

export const contactInfoCards: readonly InfoCard[] = [
  { icon: 'phone', label: 'Phone', value: '(415) 555-0142 · answered live, 24/7' },
  { icon: 'mail', label: 'Email', value: 'service@aerocorehvac.com' },
  {
    icon: 'map-pin',
    label: 'Office & warehouse',
    value: '1420 Industrial Way, San Francisco, CA 94124',
  },
];

export const businessHours: readonly BusinessHour[] = [
  { day: 'Monday – Friday', time: '7:00am – 8:00pm' },
  { day: 'Saturday', time: '8:00am – 5:00pm' },
  { day: 'Sunday', time: 'Emergency only' },
];

export const timingOptions: readonly TimingOption[] = [
  { value: 'asap', label: 'ASAP / emergency' },
  { value: 'this-week', label: 'This week' },
  { value: 'next-week', label: 'Next week' },
  { value: 'flexible', label: 'Flexible' },
];

export const serviceTypeOptions: readonly string[] = [
  'AC repair',
  'Heating repair',
  'New system estimate',
  'Maintenance plan',
  'Indoor air quality',
  'Commercial / facility',
  'Emergency — no heat / no cool',
];

export const propertyTypeOptions: readonly string[] = [
  'Single-family home',
  'Condo / townhome',
  'Multi-family',
  'Commercial',
];
