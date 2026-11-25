import React from 'react';

interface JsonLdProps {
  data: any;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Kria Tech',
  image: 'https://kria-tech-ecommerce.vercel.app/images/trending/project-1.jpg',
  '@id': '',
  url: 'https://kria-tech.example.com',
  telephone: '+91 1234567890',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Maker Street',
    addressLocality: 'Mumbai',
    postalCode: '400001',
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  sameAs: [
    'https://instagram.com/kriatech',
    'https://twitter.com/kriatech',
  ],
});
