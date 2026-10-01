export const SITE = {
  name: 'Vertex Autograph',
  developer: 'Vertex Homes Pvt. Ltd.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vertexautograph.com').replace(/\/$/, ''),
  title: 'Vertex Autograph Gopanpally | Luxury 3 & 4 BHK High-Rise Apartments near Gachibowli',
  description:
    'Vertex Autograph by Vertex Homes — luxury 3 & 4 BHK high-rise apartments (2,235–3,140 sq.ft) in Gopanpally, Hyderabad. Beside the 2,300-acre HCU green sanctuary, facing a 150-ft road, 8 minutes from Wipro Circle, Gachibowli. GHMC approved. OTP from ₹6,499/sq.ft.',
  address: {
    locality: 'Gopanpally',
    city: 'Hyderabad',
    region: 'Telangana',
    regionCode: 'IN-TG',
    postalCode: '500046',
    country: 'IN',
  },
  // TODO: replace with the exact pin of the site (long-press the pin in Google Maps → copy coordinates)
  geo: { lat: 17.4526, lng: 78.3166 },
  mapUrl: 'https://maps.app.goo.gl/9h4DUBSjwcLra7hx9?g_st=awb',
  ogImage: '/assets/images/og.jpg',
  disclaimer:
    'Disclaimer: This website is meant only for information purposes. It should not be considered/ claimed as an official site. This website belongs to authorized channel partner.',
};

export const PRICES = { otp: 6499, eoi: 7999, launch: 8899, eoiBooking: 500000 };

export type Wing = 'A' | 'B';
export type Unit = { wing: Wing; no: number; bhk: string; sft: number; face: 'East' | 'West' | 'North' };

export const UNITS: Unit[] = [
  { wing: 'A', no: 1, bhk: '4 BHK', sft: 2670, face: 'West' },
  { wing: 'A', no: 2, bhk: '4 BHK + Powder Room', sft: 3030, face: 'East' },
  { wing: 'A', no: 3, bhk: '4 BHK', sft: 2660, face: 'West' },
  { wing: 'A', no: 4, bhk: '4 BHK', sft: 2660, face: 'East' },
  { wing: 'A', no: 5, bhk: '4 BHK + Powder Room', sft: 3140, face: 'East' },
  { wing: 'B', no: 1, bhk: '4 BHK + Powder Room', sft: 3140, face: 'West' },
  { wing: 'B', no: 2, bhk: '3 BHK', sft: 2480, face: 'East' },
  { wing: 'B', no: 3, bhk: '3 BHK', sft: 2235, face: 'North' },
  { wing: 'B', no: 4, bhk: '4 BHK', sft: 2670, face: 'East' },
  { wing: 'B', no: 5, bhk: '4 BHK', sft: 2950, face: 'North' },
];

export const unitId = (u: Unit) => `${u.wing}${u.no}`;
export const planImg = (u: Unit) => `/assets/images/plans/w${u.wing.toLowerCase()}-u${u.no}.png`;
export const unitType = (u: Unit) => (u.bhk.startsWith('3') ? '3' : u.bhk.includes('Powder') ? '4P' : '4');
export const wingPlan = (w: Wing) => (w === 'A' ? '/assets/images/wing-a-plan.png' : '/assets/images/wing-b-plan.png');

export const fmt = (n: number) => n.toLocaleString('en-IN');
export const cr = (n: number) => (n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : `₹${(n / 1e5).toFixed(2)} L`);
export const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

export const HIGHLIGHTS = [
  { title: 'GHMC approved', body: 'All approvals secured, with excavation works actively underway.' },
  { title: 'Iconic twin-wing tower', body: 'Wing A & Wing B, with exclusive lift access to every residence.' },
  { title: '3 & 4 BHK residences', body: 'A generous living scale of 2,235 – 3,140 sq.ft.' },
  { title: 'Corner residences', body: 'Every home is a corner — abundant light, ventilation and privacy.' },
  { title: 'Clubhouse above stilt', body: 'A privately positioned clubhouse, set above the stilt level.' },
  { title: '150-ft road facing', body: 'A commanding frontage on a 150-ft wide main road.' },
  { title: '8 min to Wipro Circle', body: 'Strategic proximity to Gachibowli and the IT corridor.' },
  { title: 'Built for appreciation', body: 'A rare green address positioned for strong long-term value.' },
];

export const RENDERS = [
  { img: '/assets/images/dining.jpg', label: 'Contemporary façade at dusk', alt: 'Contemporary luxury residence façade at dusk' },
  { img: '/assets/images/living2.jpg', label: 'Expansive living spaces', alt: 'Expansive living room in a luxury apartment' },
  { img: '/assets/images/bedroom.jpg', label: 'Master suite with a view', alt: 'Master bedroom suite with large windows' },
];

export const WHY = [
  { title: '150-ft road facing', body: 'A commanding frontage on a wide main road — effortless access, lasting visibility.' },
  { title: 'Close to the IT corridor', body: '8 minutes to Wipro Circle, Gachibowli — work is a short drive, not a commute.' },
  { title: 'Uninterrupted green views', body: 'Open vistas across the HCU sanctuary from high-rise corner residences.' },
  { title: 'Long-term appreciation', body: 'A scarce green address on a growth corridor, positioned for strong value.' },
];

export const HOTSPOTS = [
  { title: '150-ft wide road frontage', text: 'The tower fronts a proposed 150′-0″ wide road, with a dedicated road-widening setback for a broad, commanding approach.', x: 19.5, y: 72.7 },
  { title: 'Separate entry & exit', text: 'Dedicated entry and exit gates open onto a landscaped arrival court with a central green island.', x: 33.2, y: 75.3 },
  { title: 'Wing A', text: 'Five 4 BHK residences per floor, 2,660 – 3,140 sq.ft, each with exclusive lift access.', x: 36.7, y: 46.8 },
  { title: 'Central green courts', text: '10 m landscaped courts separate the residences. A 6′6″ connecting bridge links both wings every 5 floors.', x: 45.3, y: 39 },
  { title: 'Wing B', text: 'Two 3 BHK and three 4 BHK residences per floor, 2,235 – 3,140 sq.ft.', x: 54.7, y: 44 },
  { title: '11 m wide driveway', text: 'A continuous 11 m driveway loops the entire tower for effortless circulation.', x: 52.3, y: 27.3 },
  { title: 'Green buffer & tot-lot', text: '1,231.84 sq.yds of landscaped green along the northern edge — a quiet, open outlook.', x: 36.7, y: 18.2 },
];

export const PROGRESS = [
  { state: 'done', label: 'Completed', title: 'GHMC approvals secured', body: 'All statutory approvals in place for the tower.' },
  { state: 'live', label: 'In progress', title: 'Excavation works underway', body: 'Construction has actively begun on site.' },
  { state: 'live', label: 'Open now', title: 'OTP & EOI window', body: 'Limited-period OTP pricing and EOI benefits.' },
  { state: 'next', label: 'Next', title: 'Official launch', body: 'Prices move to ₹8,899 / sq.ft (PLC) at launch.' },
] as const;

// Floor-plate hotspot rectangles (% of the typical-floor drawing): [x, y, w, h]
export const FLOOR_RECTS: Record<Wing, [number, number, number, number][]> = {
  A: [[59.8, 3, 31.7, 28.8], [19.8, 3, 34.7, 28.8], [61.7, 57.8, 30, 32], [28.8, 57.8, 30, 32], [0.4, 31.8, 37.6, 28.2]],
  B: [[60.6, 0, 30.6, 36], [34.6, 0.5, 23.9, 35], [34.6, 45.5, 22.9, 34], [7.8, 0, 24.7, 36.8], [7.8, 62.5, 24.9, 37.3]],
};

export const AMENITIES = [
  { img: '/assets/images/club.jpg', tag: 'Clubhouse · Above stilt', name: 'The Private Clubhouse', body: 'Privately positioned above the stilt level — a residents-only retreat for leisure, wellness and gatherings.' },
  { img: '/assets/images/pool.jpg', tag: 'Clubhouse · Leisure', name: 'Swimming Pool', body: 'A landscaped pool deck framed by greenery, for morning laps and slow evenings.' },
  { img: '/assets/images/gym.jpg', tag: 'Clubhouse · Fitness', name: 'Gymnasium', body: 'A fully equipped fitness studio with strength and cardio zones.' },
  { img: '/assets/images/yoga.jpg', tag: 'Wellness', name: 'Yoga & Meditation Deck', body: 'A calm open deck for sunrise yoga, breathwork and meditation.' },
  { img: '/assets/images/theatre.jpg', tag: 'Clubhouse · Leisure', name: 'Preview Theatre', body: 'A private screening room for films, matches and family nights.' },
  { img: '/assets/images/banquet.jpg', tag: 'Clubhouse · Gatherings', name: 'Banquet & Party Hall', body: 'An elegant hall for celebrations, festivals and community events.' },
  { img: '/assets/images/kids.jpg', tag: 'Outdoors', name: "Kids' Play Area", body: 'A safe, shaded play zone within the landscaped courts.' },
  { img: '/assets/images/garden.jpg', tag: 'Outdoors · Landscape', name: 'Landscaped Gardens', body: 'Green courts and walking paths between the residences, looking out to HCU.' },
];

export const AMENITY_TAGS = ['Private clubhouse', 'Swimming pool', 'Gymnasium', 'Yoga deck', 'Meditation zone', 'Spa & steam', 'Preview theatre', 'Banquet hall', 'Co-working lounge', 'Indoor games', "Kids' play area", 'Landscaped courts', 'Jogging track', 'Multipurpose court', "Senior citizens' seating", 'Power backup', '24×7 security', 'CCTV surveillance', 'EV charging', 'Visitor parking'];

export const LOCATION_FACTS = [
  { k: 'HCU green sanctuary', v: 'Adjacent · 2,300 acres' },
  { k: 'Main road', v: '150-ft wide' },
  { k: 'Wipro Circle, Gachibowli', v: '8 mins' },
  { k: 'Financial District', v: '10 mins' },
  { k: 'ORR · Gachibowli', v: '12 mins' },
  { k: 'Lingampally station', v: '15 mins' },
  { k: 'HITEC City', v: '20 mins' },
  { k: 'RGIA airport', v: '40 mins' },
];

export const STAGES = [
  { key: 'OTP', label: 'OTP', rate: PRICES.otp, note: '+ Floor charges & East-facing charges', flag: 'Best value' },
  { key: 'EOI', label: 'EOI', rate: PRICES.eoi, note: 'PLC · ₹5 Lakh booking · Preferred allotment', flag: '' },
  { key: 'Launch', label: 'Launch price', rate: PRICES.launch, note: 'PLC · Public launch price', flag: '' },
] as const;

export const FAQS = [
  { q: 'What configurations are available at Vertex Autograph?', a: 'Luxury 3 & 4 BHK residences from 2,235 to 3,140 sq.ft across Wing A and Wing B. Wing A has five 4 BHK homes per floor; Wing B has two 3 BHK and three 4 BHK homes per floor.' },
  { q: 'Is Vertex Autograph GHMC approved?', a: 'Yes — GHMC approvals are secured and excavation works are actively underway on site.' },
  { q: 'What is the price of Vertex Autograph, and what is the difference between OTP and EOI?', a: 'OTP (One-Time Payment) is a limited-period price of ₹6,499 / sq.ft plus floor and East-facing charges. EOI is ₹7,999 / sq.ft (PLC) with a ₹5 Lakh booking amount, exclusive EOI benefits and preferred unit allotment. The launch price will be ₹8,899 / sq.ft (PLC).' },
  { q: 'Where exactly is Vertex Autograph located?', a: 'In Gopanpally, Hyderabad — beside the 2,300-acre green sanctuary of HCU (University of Hyderabad), fronting a 150-ft wide main road and about 8 minutes from Wipro Circle, Gachibowli.' },
  { q: 'Does every home get private lift access?', a: 'Yes. Each residence has exclusive lift access, and the corner layouts bring abundant light, ventilation and privacy.' },
  { q: 'How do I secure the early advantage?', a: 'Submit an enquiry and the relationship team will share live availability, a cost sheet and a site-visit slot before the launch window closes.' },
];
