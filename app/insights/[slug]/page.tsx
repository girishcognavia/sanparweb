import { notFound } from 'next/navigation'
import Image from 'next/image'
import { insights, getInsightBySlug } from '@/data/insights'
import { generatePageMetadata } from '@/lib/metadata'
import { Badge } from '@/components/shared/Badge'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { Button } from '@/components/shared/Button'
import Link from 'next/link'

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getInsightBySlug(slug)
  if (!article) return {}
  return generatePageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${slug}`,
  })
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getInsightBySlug(slug)
  if (!article) notFound()

  const relatedArticles = insights.filter((i) => i.slug !== slug).slice(0, 3)

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="bg-ink-950 py-12 md:py-20">
        <div className="container-main max-w-3xl">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Insights', href: '/insights' },
              { label: article.title },
            ]}
          />
          <Badge variant="primary" className="mt-6">{article.category}</Badge>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-white tracking-display mt-3">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm font-body text-text-muted">
            <span>{article.readTime} read</span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="bg-white">
        <div className="container-main max-w-3xl -mt-4">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-surface">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl">
          <div className="prose-sanpar">
            {article.body.map((paragraph, i) => (
              <ScrollReveal key={i}>
                <p className="text-base font-body text-text-secondary leading-relaxed mb-6">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 bg-surface">
        <div className="container-main max-w-3xl text-center">
          <h3 className="font-heading text-lg font-bold text-text-primary">
            Stay ahead of industry developments.
          </h3>
          <p className="text-sm font-body text-text-secondary mt-2">
            Get engineering insights and SANPAR updates delivered to your inbox.
          </p>
          <Button variant="primary" href="/contact" className="mt-4">
            Subscribe to Updates
          </Button>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-main">
            <h2 className="font-heading text-xl font-bold text-text-primary mb-8">More Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related, i) => (
                <ScrollReveal key={related.slug} delay={i * 0.1}>
                  <Link
                    href={`/insights/${related.slug}`}
                    className="group block bg-white rounded-xl border border-border overflow-hidden hover:shadow-card-hover hover:border-l-2 hover:border-l-accent-500 transition-all"
                  >
                    <div className="relative aspect-[16/9] bg-surface">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <Badge variant="primary">{related.category}</Badge>
                      <h3 className="font-heading text-base font-bold text-text-primary mt-2 group-hover:text-accent-500 transition-colors">
                        {related.title}
                      </h3>
                      <span className="text-xs font-body text-text-muted mt-2 block">
                        {related.readTime} read
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
