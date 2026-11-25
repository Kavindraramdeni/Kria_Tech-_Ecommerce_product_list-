import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_DEFAULTS } from '../../constants/seo';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://kria-tech-ecommerce.vercel.app/images/trending/project-1.jpg',
  keywords,
}) => {
  const fullTitle = title ? `${title} | ${SEO_DEFAULTS.siteName}` : SEO_DEFAULTS.title;
  const metaDescription = description || SEO_DEFAULTS.description;
  const url = canonical ? `${SEO_DEFAULTS.url}${canonical}` : SEO_DEFAULTS.url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords || SEO_DEFAULTS.keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SEO_DEFAULTS.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content={SEO_DEFAULTS.twitterHandle} />
    </Helmet>
  );
};
