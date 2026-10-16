import type { Metadata } from 'next';

export interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

const DEFAULT_TITLE = 'Grand Azure Luxury Resort & Suites';
const DEFAULT_DESCRIPTION =
  'Experience timeless elegance, private infinity villas, and bespoke hospitality on Vietnam’s pristine shores.';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80';

/**
 * 🏛️ SEO METADATA FACTORY
 * Standardizes metadata, OpenGraph cards, and Twitter previews across all routes.
 */
export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [
    'luxury resort',
    'hotel booking',
    'oceanfront villa',
    'penthouse suite',
    '5 star hospitality',
    'spa sanctuary',
  ],
  image = DEFAULT_IMAGE,
  noIndex = false,
}: SeoProps = {}): Metadata {
  const pageTitle = title ? `${title} | Grand Azure Resort` : DEFAULT_TITLE;

  return {
    title: pageTitle,
    description,
    keywords,
    openGraph: {
      title: pageTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      type: 'website',
      siteName: 'Grand Azure Luxury Resort & Suites',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
      creator: '@GrandAzureResort',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    metadataBase: new URL('https://grandazure.luxury'),
  };
}

