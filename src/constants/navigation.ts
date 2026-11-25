export const NAV_LINKS = [
  { href: 'main', label: 'Home', type: 'page' },
  { href: 'catalogue', label: 'Shop all', type: 'page' },
  { href: 'trending', label: 'Trending', type: 'page' },
  { href: 'about-us', anchor: '#services', label: 'Our services', type: 'anchor' },
  { href: 'about-us', label: 'Our story', type: 'page' },
  { href: 'main', anchor: '#contact', label: 'Contact', type: 'anchor' },
];

export const FOOTER_LINKS = {
  services: [
    { label: 'Personalised gifts & frames', href: 'personalized-gifts' },
    { label: 'Commercial signage', href: 'custom-signs' },
    { label: 'LED & wall decor', href: 'signature-wall-decor' },
    { label: 'Kids learning products', href: 'educational-kids' },
    { label: 'Bulk & custom orders', href: 'personalized-gifts' },
  ],
  quickLinks: [
    { label: 'Home', href: 'main' },
    { label: 'Shop all', href: 'catalogue' },
    { label: 'Trending', href: 'trending' },
    { label: 'Our story', href: 'about-us' },
    { label: 'Gallery', href: 'about-us', anchor: '#gallery' },
    { label: 'Contact', href: 'main', anchor: '#contact' },
  ]
};
