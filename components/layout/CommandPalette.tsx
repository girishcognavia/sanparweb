'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import Fuse from 'fuse.js'
import { products } from '@/data/products'
import { industries } from '@/data/industries'

interface SearchItem {
  type: 'product' | 'industry' | 'page'
  name: string
  description: string
  href: string
}

const searchItems: SearchItem[] = [
  ...products.map((p) => ({
    type: 'product' as const,
    name: p.name,
    description: p.shortDesc,
    href: `/products/${p.slug}`,
  })),
  ...industries.map((i) => ({
    type: 'industry' as const,
    name: i.name,
    description: i.tagline,
    href: `/industries/${i.slug}`,
  })),
  { type: 'page', name: 'Products', description: 'Browse our full product catalogue', href: '/products' },
  { type: 'page', name: 'Industries', description: 'See the 10 industries we serve', href: '/industries' },
  { type: 'page', name: 'About SANPAR', description: '31 years of engineering excellence', href: '/about' },
  { type: 'page', name: 'Technology', description: 'Innovation and R&D', href: '/technology' },
  { type: 'page', name: 'Success Stories', description: 'Real client deployments and results', href: '/case-studies' },
  { type: 'page', name: 'Contact', description: 'Get a quote or speak to an engineer', href: '/contact' },
  { type: 'page', name: 'Insights', description: 'Engineering and business intelligence', href: '/insights' },
]

const fuse = new Fuse(searchItems, {
  keys: ['name', 'description'],
  threshold: 0.3,
})

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = query.length > 0
    ? fuse.search(query).slice(0, 11).map((r) => r.item)
    : []

  const grouped = {
    product: results.filter((r) => r.type === 'product').slice(0, 4),
    industry: results.filter((r) => r.type === 'industry').slice(0, 4),
    page: results.filter((r) => r.type === 'page').slice(0, 3),
  }
  const flatResults = [...grouped.product, ...grouped.industry, ...grouped.page]

  const toggle = useCallback(() => {
    setOpen((v) => !v)
    setQuery('')
    setActiveIndex(0)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [toggle])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && flatResults[activeIndex]) {
      router.push(flatResults[activeIndex].href)
      setOpen(false)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center pt-[20vh]"
      onClick={() => setOpen(false)}
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="w-full max-w-[600px] bg-ink-800 border border-ink-700 rounded-lg overflow-hidden mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-ink-700">
          <Search className="w-5 h-5 text-text-muted" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
            onKeyDown={handleKeyDown}
            placeholder="Search products, industries, technology..."
            className="flex-1 bg-transparent text-white text-lg font-body placeholder:text-text-muted outline-none"
          />
          <kbd className="hidden sm:inline text-xs text-text-muted bg-ink-700 px-2 py-1 rounded">ESC</kbd>
        </div>

        {/* Results */}
        {query.length > 0 && (
          <div className="max-h-[400px] overflow-y-auto py-2">
            {flatResults.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-text-muted font-body">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-sm text-text-muted/60 mt-2">Try &ldquo;air dryer&rdquo;, &ldquo;pharmaceutical&rdquo;, or &ldquo;defence&rdquo;</p>
              </div>
            ) : (
              <>
                {(['product', 'industry', 'page'] as const).map((type) => {
                  const items = grouped[type]
                  if (items.length === 0) return null
                  const labels = { product: 'Products', industry: 'Industries', page: 'Pages' }
                  return (
                    <div key={type}>
                      <p className="px-5 py-2 text-xs font-body font-medium text-text-muted uppercase tracking-wide">
                        {labels[type]}
                      </p>
                      {items.map((item) => {
                        const globalIdx = flatResults.indexOf(item)
                        return (
                          <button
                            key={item.href}
                            onClick={() => { router.push(item.href); setOpen(false) }}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                              globalIdx === activeIndex ? 'bg-ink-700' : 'hover:bg-ink-700/50'
                            }`}
                          >
                            <ArrowRight className="w-5 h-5 text-accent-400 shrink-0" strokeWidth={1.5} />
                            <div className="min-w-0">
                              <p className="text-base font-body text-white truncate">{item.name}</p>
                              <p className="text-xs font-body text-text-muted truncate">{item.description}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
