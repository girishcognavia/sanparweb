import { notFound } from 'next/navigation'
import Image from 'next/image'
import { caseStudies, getCaseStudyBySlug } from '@/data/caseStudies'
import { generatePageMetadata } from '@/lib/metadata'
import { Badge } from '@/components/shared/Badge'
import { MetricCard } from '@/components/shared/MetricCard'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/shared/Button'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import Link from 'next/link'

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return {}
  return generatePageMetadata({
    title: study.title,
    description: study.teaser,
    path: `/case-studies/${slug}`,
  })
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  const currentIndex = caseStudies.findIndex((cs) => cs.slug === slug)
  const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null
  const nextStudy = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative bg-ink-950 py-16 md:py-24">
        <div className="container-main relative z-10">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Case Studies', href: '/case-studies' },
              { label: study.title },
            ]}
          />
          <div className="flex flex-wrap gap-2 mt-6">
            <Badge variant="primary">{study.industry}</Badge>
            {study.services.map((s) => (
              <Badge key={s} variant="outline">{s}</Badge>
            ))}
          </div>
          <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-display mt-4">
            {study.title}
          </h1>
          <div className="flex items-baseline gap-3 mt-6">
            <span className="font-heading text-4xl md:text-5xl font-bold text-accent-500">
              {study.result.metric}
            </span>
            <span className="text-md font-body text-text-muted">{study.result.label}</span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-white">
        <div className="container-main -mt-4">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-surface">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-xl font-bold text-text-primary">The Challenge</h2>
            <p className="text-base font-body text-text-secondary mt-4 leading-relaxed">
              {study.challenge}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-padding bg-surface">
        <div className="container-main max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-xl font-bold text-text-primary">Our Approach</h2>
            <ol className="mt-6 space-y-4">
              {study.approach.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500 text-white font-heading text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-base font-body text-text-secondary leading-relaxed pt-1">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      {/* The Solution */}
      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-xl font-bold text-text-primary">The Solution</h2>
            <p className="text-base font-body text-text-secondary mt-4 leading-relaxed">
              {study.solution}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-ink-950">
        <div className="container-main">
          <h2 className="font-heading text-xl font-bold text-white text-center mb-10">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {study.results.map((r, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <MetricCard value={r.metric} label={r.label} dark />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {study.testimonial && (
        <section className="section-padding bg-surface">
          <div className="container-main max-w-3xl text-center">
            <ScrollReveal>
              <blockquote className="font-heading text-xl md:text-2xl font-semibold text-text-primary italic leading-relaxed">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <p className="mt-6 font-body text-sm text-text-secondary">
                <strong className="text-text-primary">{study.testimonial.name}</strong>
                <br />
                {study.testimonial.title}
              </p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-8 bg-white border-t border-border">
        <div className="container-main flex justify-between items-center">
          {prevStudy ? (
            <Link
              href={`/case-studies/${prevStudy.slug}`}
              className="text-sm font-body font-semibold text-accent-600 hover:text-accent-500 transition-colors"
            >
              &larr; {prevStudy.title}
            </Link>
          ) : (
            <span />
          )}
          {nextStudy ? (
            <Link
              href={`/case-studies/${nextStudy.slug}`}
              className="text-sm font-body font-semibold text-accent-600 hover:text-accent-500 transition-colors"
            >
              {nextStudy.title} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-ink-950">
        <div className="container-main text-center">
          <h2 className="font-heading text-xl font-bold text-white">Ready for results like these?</h2>
          <p className="text-base font-body text-text-muted mt-3">
            Let&apos;s discuss how we can deliver measurable outcomes for your business.
          </p>
          <Button variant="primary" href="/contact" className="mt-6">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  )
}
