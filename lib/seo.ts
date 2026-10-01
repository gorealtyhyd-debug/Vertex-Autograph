import { SITE, PRICES, UNITS, FAQS, AMENITY_TAGS, unitId } from './data';

const abs = (p: string) => `${SITE.url}${p}`;

export function jsonLd() {
  const address = {
    '@type': 'PostalAddress',
    addressLocality: `${SITE.address.locality}, ${SITE.address.city}`,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  };
  const geo = { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng };

  const priceOffer = (name: string, rate: number, extra?: string) => ({
    '@type': 'Offer',
    name,
    priceCurrency: 'INR',
    availability: 'https://schema.org/PreOrder',
    url: abs('/#pricing'),
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: rate,
      priceCurrency: 'INR',
      unitText: 'per sq.ft',
      ...(extra ? { description: extra } : {}),
    },
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': abs('/#developer'),
        name: SITE.developer,
        brand: 'Vertex Homes',
      },
      {
        '@type': 'WebSite',
        '@id': abs('/#website'),
        url: abs('/'),
        name: SITE.name,
        inLanguage: 'en-IN',
      },
      {
        '@type': 'WebPage',
        '@id': abs('/#webpage'),
        url: abs('/'),
        name: SITE.title,
        description: SITE.description,
        isPartOf: { '@id': abs('/#website') },
        about: { '@id': abs('/#project') },
        primaryImageOfPage: abs(SITE.ogImage),
        inLanguage: 'en-IN',
        dateModified: new Date().toISOString().slice(0, 10),
      },
      {
        '@type': ['ApartmentComplex', 'Residence'],
        '@id': abs('/#project'),
        name: SITE.name,
        description: SITE.description,
        url: abs('/'),
        image: [abs('/assets/images/hero-dusk.jpg'), abs('/assets/images/site-plan.jpeg')],
        address,
        geo,
        hasMap: SITE.mapUrl,
        containedInPlace: { '@type': 'City', name: 'Hyderabad' },
        petsAllowed: true,
        amenityFeature: AMENITY_TAGS.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Configurations', value: '3 BHK, 4 BHK' },
          { '@type': 'PropertyValue', name: 'Size range', value: '2,235 – 3,140 sq.ft' },
          { '@type': 'PropertyValue', name: 'Towers', value: 'One tower — Wing A & Wing B' },
          { '@type': 'PropertyValue', name: 'Approval', value: 'GHMC approved' },
          { '@type': 'PropertyValue', name: 'Road frontage', value: '150-ft wide main road' },
          { '@type': 'PropertyValue', name: 'Nearby', value: 'Beside 2,300-acre HCU campus; 8 min to Wipro Circle, Gachibowli' },
        ],
        containsPlace: UNITS.map((u) => ({
          '@type': 'Apartment',
          name: `Wing ${u.wing} · Unit ${unitId(u)} · ${u.bhk}`,
          numberOfRooms: u.bhk.startsWith('3') ? 3 : 4,
          numberOfBedrooms: u.bhk.startsWith('3') ? 3 : 4,
          floorSize: { '@type': 'QuantitativeValue', value: u.sft, unitText: 'sq.ft', unitCode: 'FTK' },
          additionalProperty: [{ '@type': 'PropertyValue', name: 'Facing', value: u.face }],
        })),
        makesOffer: [
          priceOffer('OTP — limited-period offer', PRICES.otp, '+ Floor charges & East-facing charges'),
          priceOffer('EOI', PRICES.eoi, 'PLC · ₹5 Lakh booking'),
          priceOffer('Launch price', PRICES.launch, 'PLC'),
        ],
        brand: { '@id': abs('/#developer') },
      },
      {
        '@type': 'FAQPage',
        '@id': abs('/#faq'),
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Hyderabad', item: abs('/') },
          { '@type': 'ListItem', position: 2, name: 'Gopanpally', item: abs('/#location') },
          { '@type': 'ListItem', position: 3, name: SITE.name, item: abs('/') },
        ],
      },
    ],
  };
}
