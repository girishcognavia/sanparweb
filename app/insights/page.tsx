import Image from 'next/image'
import { generatePageMetadata } from '@/lib/metadata'
import { insights } from '@/data/insights'
import { Badge } from '@/components/shared/Badge'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/shared/Button'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Insights',
  description: 'Engineering and business intelligence from the SANPAR team. Compressed air, industrial cooling, and defence technology insights.',
  path: '/insights',
})

export default function InsightsPage() {
  const featured = insights.find((i) => i.featured)
  const others = insights.filter((i) => !i.featured)

  return (
    <div className="pt-[72px]">
      {/* ════════ IMMERSIVE HERO — Editorial magazine-style with featured article ════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden bg-ink-950">
        {/* Background from featured article */}
        {featured && (
          <div className="absolute inset-0">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/50 to-transparent" />

        {/* Content */}
        <div className="container-main relative z-10 pb-14 pt-28 md:pt-36">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4">
            {'// '}Insights & Intelligence
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-[1.05]">
            Engineering
            <br />
            <span className="text-gradient">Intelligence</span>
          </h1>
          <p className="mt-5 text-lg font-body text-white/50 max-w-xl font-light leading-relaxed">
            Deep-dive articles on compressed air, industrial cooling, and defence technology from the SANPAR engineering team.
          </p>

          {/* Featured article teaser */}
          {featured && (
            <Link
              href={`/insights/${featured.slug}`}
              className="group mt-10 flex items-start gap-4 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-xl p-5 max-w-lg hover:bg-white/[0.1] transition-colors"
            >
              <BookOpen className="w-5 h-5 text-accent-400 shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <Badge variant="primary" className="mb-2">{featured.category}</Badge>
                <h2 className="font-heading text-base font-bold text-white group-hover:text-accent-400 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-xs font-body text-white/40 mt-1">{featured.readTime} read</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main">
          {/* Featured */}
          {featured && (
            <ScrollReveal>
              <Link href={`/insights/${featured.slug}`} className="group block bg-surface rounded-xl overflow-hidden mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-[16/9] md:aspect-auto">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <Badge variant="primary">{featured.category}</Badge>
                    <h2 className="font-heading text-xl font-bold text-text-primary mt-3 group-hover:text-accent-500 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-base font-body text-text-secondary mt-3">{featured.excerpt}</p>
                    <div className="flex items-center gap-3 mt-4 text-sm font-body text-text-muted">
                      <span>{featured.readTime} read</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-body font-semibold text-accent-500 mt-4">
                      Read article <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 0.1}>
                <Link href={`/insights/${article.slug}`} className="group block bg-white rounded-xl border border-border overflow-hidden hover:shadow-card-hover hover:border-accent-500/30 transition-all">
                  <div className="relative aspect-[16/9] bg-surface overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <Badge variant="primary">{article.category}</Badge>
                    <h3 className="font-heading text-base font-bold text-text-primary mt-2 group-hover:text-accent-500 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm font-body text-text-muted mt-2 line-clamp-2">{article.excerpt}</p>
                    <span className="text-xs font-body text-text-muted mt-3 block">{article.readTime} read</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-ink-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-main text-center max-w-xl relative z-10">
          <ScrollReveal>
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4 block">
              {'// '}Stay Updated
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
              Stay ahead of industry developments.
            </h2>
            <p className="text-base font-body text-white/40 mt-3 font-light">
              Get engineering insights and SANPAR updates delivered to your inbox.
            </p>
            <Button variant="primary" href="/contact" className="mt-6">
              Subscribe to Updates
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
