import Image from 'next/image'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { caseStudies } from '@/data/caseStudies'
import { CaseStudyCard } from '@/components/shared/CaseStudyCard'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { ArrowRight, TrendingUp } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Case Studies',
  description: 'Real outcomes for real businesses — measured in enquiries, pipeline, and growth. See how Cognavia delivers results.',
  path: '/case-studies',
})

export default function CaseStudiesPage() {
  const featured = caseStudies[0]

  return (
    <div className="pt-[72px]">
      {/* ════════ IMMERSIVE HERO — Featured case study spotlight ════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden bg-ink-950">
        {/* Background image from featured case study */}
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

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/50 to-transparent" />

        {/* Content */}
        <div className="container-main relative z-10 pb-14 pt-28 md:pt-36">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4">
            {'// '}Case Studies
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-[1.05]">
            Results That
            <br />
            <span className="text-gradient">Speak</span>
          </h1>
          <p className="mt-5 text-lg font-body text-white/50 max-w-xl font-light leading-relaxed">
            Real outcomes for real businesses — measured in enquiries, pipeline, and growth.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button variant="primary" href="/contact" className="h-13 px-8">
              Start Your Story
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
            </Button>
          </div>

          {/* Featured metrics bar */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {featured.results.map((result) => (
              <div
                key={result.label}
                className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent-400" strokeWidth={1.5} />
                  <span className="font-heading text-2xl font-extrabold text-accent-400">
                    {result.metric}
                  </span>
                </div>
                <p className="text-xs font-body text-white/40 mt-1 font-light">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study Highlight */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <Link href={`/case-studies/${featured.slug}`} className="group block bg-surface rounded-2xl overflow-hidden mb-12">
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
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <Badge variant="primary">{featured.industry}</Badge>
                  <h2 className="font-heading text-2xl font-bold text-text-primary mt-3 group-hover:text-accent-500 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-base font-body text-text-secondary mt-3 leading-relaxed">{featured.teaser}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {featured.services.map((s) => (
                      <Badge key={s} variant="outline">{s}</Badge>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-body font-semibold text-accent-500 mt-6">
                    Read full case study <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Other case studies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.slice(1).map((study, i) => (
              <ScrollReveal key={study.slug} delay={i * 0.1}>
                <CaseStudyCard study={study} />
              </ScrollReveal>
            ))}
          </div>

          {/* Coming Soon Card */}
          <ScrollReveal delay={0.3}>
            <div className="mt-6 relative rounded-xl border border-border overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-sm bg-white/70 z-10 flex items-center justify-center">
                <span className="font-heading text-lg font-bold text-text-primary bg-white/90 px-6 py-3 rounded-full border border-border">
                  Case study in progress — Healthcare Sector
                </span>
              </div>
              <div className="opacity-30 p-6">
                <div className="bg-surface rounded-lg h-48" />
                <div className="mt-4 h-4 bg-surface rounded w-1/3" />
                <div className="mt-2 h-3 bg-surface rounded w-2/3" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
