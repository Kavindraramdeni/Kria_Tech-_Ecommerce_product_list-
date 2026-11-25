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
  '@id': 'https://kria-tech-ecommerce.vercel.app/#organization',
  name: 'KRIA Tech',
  image: 'https://kria-tech-ecommerce.vercel.app/images/trending/project-1.jpg',
  url: 'https://kria-tech-ecommerce.vercel.app',
  telephone: '+919000376792',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    addressCountry: 'IN',
  },
});
