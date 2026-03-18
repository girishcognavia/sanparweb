import { Metadata } from 'next'

interface PageMetadataConfig {
  title: string
  description: string
  path: string
  ogImage?: string
}

const BASE_URL = 'https://www.sanpar.com'
const SITE_NAME = 'SANPAR Industries — Compressed Air Treatment & Industrial Cooling, Bengaluru'

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = '/og-image.jpg',
}: PageMetadataConfig): Metadata {
  const url = `${BASE_URL}${path}`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
    robots: 'index, follow',
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SANPAR Industries Pvt. Ltd.',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: 'Precision-engineered compressed air treatment and industrial cooling solutions, trusted globally for over 32 years.',
    foundingDate: '1994-02-07',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bommasandra Industrial Estate',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560099',
      addressCountry: 'IN',
    },
    telephone: '+917349142424',
    email: 'enquiry@sanpar.com',
    sameAs: [
      'https://www.linkedin.com/company/sanpar-industries',
      'https://x.com/SANPARindia',
      'https://www.youtube.com/channel/UCtD9fjNAP-VTtvyApCV8juw',
      'https://www.facebook.com/sanparindustries/',
    ],
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }
}

export function productJsonLd(product: {
  name: string
  description: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'SANPAR',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'SANPAR Industries Pvt. Ltd.',
    },
    url: `${BASE_URL}/products/${product.slug}`,
  }
}
