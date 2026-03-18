'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

import Image from 'next/image'
import { Phone, Download, Check, Box } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '@/data/products'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { ProductCard } from '@/components/shared/ProductCard'
import { Product3DViewer } from '@/components/shared/Product3DViewer'

const tabs = ['Overview', 'Technical Specifications', 'Applications', 'Downloads'] as const
type Tab = typeof tabs[number]

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)
  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '' })
  const [quoteStatus, setQuoteStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [show3D, setShow3D] = useState(false)

  if (!product) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <p className="text-text-muted font-body">Product not found.</p>
      </div>
    )
  }

  const related = getRelatedProducts(slug)

  const handleQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setQuoteStatus('loading')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...quoteForm, product: slug, source: 'product-detail' }),
      })
      setQuoteStatus('success')
    } catch {
      setQuoteStatus('idle')
    }
  }

  return (
    <div className="pt-[72px]">
      <div className="container-main py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.categoryLabel, href: `/products?category=${product.category}` },
            { label: product.name, href: `/products/${product.slug}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12">
          {/* Left — Scrollable */}
          <div>
            {/* Hero Image */}
            <div className="relative rounded-xl overflow-hidden bg-surface aspect-[16/9]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <Badge variant="primary" className="absolute top-4 left-4">
                {product.categoryLabel}
              </Badge>
              <button
                onClick={() => setShow3D(true)}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-ink-950/80 backdrop-blur-sm text-white text-sm font-body font-medium hover:bg-ink-950 transition-colors z-10"
              >
                <Box className="w-4 h-4" strokeWidth={1.5} />
                3D View
              </button>
            </div>

            {/* Tab Bar */}
            <div className="flex border-b border-border mt-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-body font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'text-accent-500 border-accent-500'
                      : 'text-text-muted border-transparent hover:text-text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-8">
              {activeTab === 'Overview' && (
                <div>
                  <p className="text-base font-body text-text-secondary leading-relaxed">
                    {product.shortDesc}
                  </p>
                  <h3 className="font-heading text-lg font-bold text-text-primary mt-8 mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {Object.entries(product.keySpecs).map(([key, value]) => (
                      <li key={key} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="font-body text-base text-text-secondary">
                          <span className="font-medium text-text-primary">{key}:</span> {value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {product.variants && product.variants.length > 0 && (
                    <>
                      <h3 className="font-heading text-lg font-bold text-text-primary mt-8 mb-4">
                        Available Variants
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((v) => (
                          <Badge key={v} variant="outline">{v}</Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'Technical Specifications' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Parameter</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(product.keySpecs).map(([key, value]) => (
                        <tr key={key} className="border-b border-border/50">
                          <td className="py-3 px-4 text-text-secondary">{key}</td>
                          <td className="py-3 px-4 text-text-primary font-medium">{value}</td>
                        </tr>
                      ))}
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary">Series</td>
                        <td className="py-3 px-4 text-text-primary font-medium">{product.series}</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary">Category</td>
                        <td className="py-3 px-4 text-text-primary font-medium">{product.categoryLabel}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'Applications' && (
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <Badge key={app} variant="teal" className="text-sm py-2 px-4">
                      {app}
                    </Badge>
                  ))}
                </div>
              )}

              {activeTab === 'Downloads' && (
                <div className="text-center py-8">
                  <Button
                    variant="primary"
                    onClick={() => console.log(`[DOWNLOAD] Datasheet for ${product.slug}`)}
                    icon={<Download className="w-4 h-4" strokeWidth={1.5} />}
                  >
                    Download Datasheet
                  </Button>
                  <p className="text-sm text-text-muted font-body mt-3">
                    PDF datasheet will be available soon.
                  </p>
                </div>
              )}
            </div>

            {/* Related Products */}
            {related.length > 0 && (
              <div className="border-t border-border pt-10">
                <h3 className="font-heading text-lg font-bold text-text-primary mb-6">
                  You may also need
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Sticky Sidebar */}
          <div className="lg:sticky lg:top-[200px] lg:self-start space-y-6">
            <div className="bg-white rounded-xl border border-border p-6">
              <h1 className="font-heading text-lg font-bold text-text-primary">
                {product.name}
              </h1>
              <p className="text-base font-body text-text-secondary mt-2">
                {product.shortDesc}
              </p>

              {/* Quote Form */}
              <div className="mt-6">
                <h4 className="font-heading text-sm font-semibold text-text-primary mb-4">
                  Request a Quote
                </h4>
                {quoteStatus === 'success' ? (
                  <div className="flex items-center gap-2 text-success">
                    <Check className="w-5 h-5" strokeWidth={1.5} />
                    <span className="text-sm font-body">Enquiry sent! We&apos;ll respond within 4 hours.</span>
                  </div>
                ) : (
                  <form onSubmit={handleQuote} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    <input
                      type="email"
                      placeholder="Work email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      loading={quoteStatus === 'loading'}
                      className="w-full"
                    >
                      Send Enquiry
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => console.log(`[DOWNLOAD] Datasheet for ${product.slug}`)}
                icon={<Download className="w-4 h-4" strokeWidth={1.5} />}
              >
                Download Datasheet
              </Button>
              <a
                href="tel:+917349142424"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-body font-medium text-accent-500 hover:text-accent-500 transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                Speak to an Engineer
              </a>
            </div>
          </div>
        </div>
      </div>

      {product && <Product3DViewer product={product} open={show3D} onClose={() => setShow3D(false)} />}
    </div>
  )
}
