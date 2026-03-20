import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/data/products'
import { industries } from '@/data/industries'

const pages = [
  { name: 'Home', path: '/', description: 'SANPAR Industries homepage' },
  { name: 'Products', path: '/products', description: 'Full product catalogue' },
  { name: 'Industries', path: '/industries', description: 'Industries we serve' },
  { name: 'Technology', path: '/technology', description: 'R&D and innovation' },
  { name: 'About', path: '/about', description: 'Company story and timeline' },
  { name: 'Success Stories', path: '/case-studies', description: 'Real client success stories' },
  { name: 'Insights', path: '/insights', description: 'Engineering insights and news' },
  { name: 'Contact', path: '/contact', description: 'Get in touch with SANPAR' },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase().trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const productResults = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.shortDesc.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    )
    .slice(0, 4)
    .map((p) => ({
      type: 'product' as const,
      name: p.name,
      description: p.shortDesc,
      path: `/products/${p.slug}`,
    }))

  const industryResults = industries
    .filter(
      (i) =>
        i.name.toLowerCase().includes(query) ||
        i.challenge.toLowerCase().includes(query)
    )
    .slice(0, 4)
    .map((i) => ({
      type: 'industry' as const,
      name: i.name,
      description: i.challenge.slice(0, 100) + '...',
      path: `/industries/${i.slug}`,
    }))

  const pageResults = pages
    .filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    )
    .slice(0, 3)
    .map((p) => ({
      type: 'page' as const,
      name: p.name,
      description: p.description,
      path: p.path,
    }))

  return NextResponse.json({
    results: [...productResults, ...industryResults, ...pageResults],
  })
}
