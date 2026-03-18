import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { industries, getIndustryBySlug } from '@/data/industries'
import { getProductBySlug } from '@/data/products'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { ProductCard } from '@/components/shared/ProductCard'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Shield, Zap, Clock, ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react'

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }))
}

export default function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug)
  if (!industry) return notFound()

  const relatedProducts = industry.relatedProductSlugs
    .map(getProductBySlug)
    .filter(Boolean)

  // Find other industries for "Explore More"
  const otherIndustries = industries.filter((i) => i.slug !== params.slug).slice(0, 4)

  return (
    <div className="pt-[72px]">

      {/* ════════ IMMERSIVE HERO — Full-bleed image with overlay content ════════ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Full background image */}
        {industry.image && (
          <Image
            src={industry.image}
            alt={industry.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-transparent" />

        {/* Content at bottom */}
        <div className="container-main relative z-10 pb-14 pt-32">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Industries', href: '/industries' },
              { label: industry.name },
            ]}
          />

          {/* Certifications as floating pills */}
          {industry.certifications.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {industry.certifications.map((cert) => (
                <Badge
                  key={cert}
                  variant={cert.includes('DGAQA') || cert.includes('CEMILAC') || cert.includes('AS 9100') ? 'gold' : 'teal'}
                  className="backdrop-blur-sm bg-opacity-80"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mt-5 max-w-3xl leading-[1.05]">
            {industry.name}
          </h1>
          <p className="mt-5 text-lg font-body text-white/60 max-w-xl font-light leading-relaxed">
            {industry.tagline}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button variant="primary" href="/contact" className="h-13 px-8">
              Speak to an Engineer
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
            </Button>
            <Button variant="ghost" href="/products">
              View Products
            </Button>
          </div>
        </div>
      </section>


      {/* ════════ CHALLENGE & SOLUTION — Split layout ════════ */}
      <section className="section-padding bg-cream-50">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: The Challenge */}
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center">
                    <span className="font-heading text-lg font-extrabold text-accent-500">01</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-text-primary tracking-tight">
                    The Challenge
                  </h2>
                </div>
                <p className="text-base font-body text-text-secondary leading-[1.8] font-light">
                  {industry.challenge}
                </p>
                {/* Decorative line */}
                <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-500/30 via-accent-500/10 to-transparent hidden lg:block" />
              </div>
            </ScrollReveal>

            {/* Right: The Solution */}
            <ScrollReveal direction="right">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center">
                    <span className="font-heading text-lg font-extrabold text-white">02</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-text-primary tracking-tight">
                    SANPAR Solution
                  </h2>
                </div>
                <p className="text-base font-body text-text-secondary leading-[1.8] font-light">
                  {industry.solution}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Highlight callout */}
          {industry.highlight && (
            <ScrollReveal>
              <div className="mt-14 relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-ink-950" />
                <div className="relative z-10 flex items-start gap-4 p-8">
                  <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-base font-body text-white/80 leading-relaxed font-light italic">
                    &ldquo;{industry.highlight}&rdquo;
                  </p>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>


      {/* ════════ RELATED PRODUCTS — With accent header ════════ */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-main">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                <div>
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-500 mb-3 block">
                    {'// '}Recommended Products
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                    Engineered for {industry.name}
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-body font-semibold text-accent-500 hover:text-accent-600 transition-colors shrink-0"
                >
                  All Products <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p, i) => p && (
                <ScrollReveal key={p.id} delay={i * 0.08}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════ WHY SANPAR — Horizontal cards with numbers ════════ */}
      <section className="section-padding bg-ink-950 relative overflow-hidden">
        <div className="diagonal-lines text-white" />
        <div className="container-main relative z-10">
          <ScrollReveal>
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4 block">
              {'// '}Why SANPAR
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white tracking-tight mb-12">
              The SANPAR Advantage
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Clock, num: '01', title: 'Zero Downtime', desc: 'Engineered for continuous operation in the most demanding industrial environments.' },
              { icon: Zap, num: '02', title: 'Application Engineering', desc: 'Our engineers work with your team to specify exactly the right system.' },
              { icon: Shield, num: '03', title: '32 Years Experience', desc: 'Proven solutions backed by three decades of industry-specific knowledge.' },
            ].map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.1}>
                <div className="group relative p-7 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300">
                  {/* Large background number */}
                  <span className="absolute top-4 right-5 font-heading text-6xl font-extrabold text-white/[0.04] select-none">
                    {b.num}
                  </span>
                  <b.icon className="w-8 h-8 text-accent-400 mb-5" strokeWidth={1.5} />
                  <h3 className="font-heading text-lg font-bold text-white">{b.title}</h3>
                  <p className="text-sm font-body text-white/40 mt-3 leading-relaxed font-light">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════ EXPLORE MORE INDUSTRIES ════════ */}
      <section className="section-padding bg-cream-50">
        <div className="container-main">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-heading text-2xl font-bold text-text-primary tracking-tight">
                Explore More Industries
              </h2>
              <Link
                href="/industries"
                className="text-sm font-body font-semibold text-accent-500 hover:text-accent-600 transition-colors"
              >
                View All &rarr;
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherIndustries.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 0.08}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden block"
                >
                  {ind.image ? (
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-cream-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading text-sm font-bold text-white leading-tight">
                      {ind.name}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════ CTA ════════ */}
      <section className="section-padding bg-ink-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-main text-center relative z-10">
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4 block">
            {'// '}Get Started
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white tracking-tight">
            Ready to optimize your
            <br />
            <span className="text-gradient">{industry.name} operations?</span>
          </h2>
          <p className="mt-4 text-md font-body text-white/40 font-light max-w-md mx-auto">
            Talk to a SANPAR application engineer — free consultation, no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button variant="primary" href="/contact">
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
            </Button>
            <Button variant="ghost" href="tel:+917349142424">
              Call +91 73491 42424
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
