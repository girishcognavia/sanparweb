import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { breadcrumbJsonLd } from '@/lib/metadata'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = breadcrumbJsonLd(items.filter((i) => i.href).map((i) => ({ name: i.label, url: i.href! })))

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center gap-1 text-sm font-body text-text-muted">
        {items.map((item, i) => (
          <li key={item.href ?? item.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3" strokeWidth={1.5} />}
            {i === items.length - 1 || !item.href ? (
              <span className="text-text-primary font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-accent-500 transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
