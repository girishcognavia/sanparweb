import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { industries } from '@/data/industries'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Industries',
  description: 'Application-specific compressed air treatment and industrial cooling solutions for 14 industries including aerospace, pharmaceutical, food & beverage, and more.',
  path: '/industries',
})

// Pick 6 industries with images for the hero mosaic
const heroIndustries = industries.filter((i) => i.image).slice(0, 6)

export default function IndustriesPage() {
  return (
    <div className="pt-[72px]">
      {/* ════════ IMMERSIVE HERO — Image Mosaic + Stats ════════ */}
      <section className="relative bg-ink-950 overflow-hidden">
        {/* Background: mosaic of industry images */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 opacity-25">
          {heroIndustries.map((industry) => (
            <div key={industry.id} className="relative overflow-hidden">
              <Image
                src={industry.image!}
                alt={industry.name}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent" />

        {/* Content */}
        <div className="container-main relative z-10 pt-20 pb-8 md:pt-28 md:pb-12 min-h-[60vh] flex flex-col justify-end">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4">
            {'// '}14 Industries Served
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-[1.05]">
            Application-Specific
            <br />
            <span className="text-gradient">Solutions for Every Vertical</span>
          </h1>
          <p className="mt-5 text-lg font-body text-white/50 max-w-2xl font-light leading-relaxed">
            From pharmaceutical cleanrooms to airborne radar systems — SANPAR delivers
            thermal engineering precision across 14 industries.
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

          {/* Floating stats bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '14', label: 'Industries Served' },
              { value: '32+', label: 'Years Experience' },
              { value: '16', label: 'Product Lines' },
              { value: '4', label: 'Defence Certifications' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4"
              >
                <span className="font-heading text-2xl md:text-3xl font-extrabold text-accent-400">
                  {stat.value}
                </span>
                <p className="text-xs font-body text-white/40 mt-1 font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Cards Grid with Images */}
      <section className="section-padding bg-cream-50">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <ScrollReveal key={industry.id} delay={i * 0.05}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group block bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 h-full"
                >
                  {/* Image */}
                  {industry.image ? (
                    <div className="relative aspect-[16/10] bg-cream-100 overflow-hidden">
                      <Image
                        src={industry.image}
                        alt={industry.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2} />
                      </div>
                      {industry.theme === 'defence' && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="gold" className="text-[10px]">Defence</Badge>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-cream-100 flex items-center justify-center">
                      <span className="text-text-muted text-sm font-body">No image</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent-500 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-text-secondary font-body mt-2 leading-relaxed line-clamp-2 font-light">
                      {industry.tagline}
                    </p>
                    {industry.certifications.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {industry.certifications.slice(0, 2).map((cert) => (
                          <span
                            key={cert}
                            className="text-[10px] font-body font-medium text-text-muted bg-surface px-2 py-0.5 rounded-full"
                          >
                            {cert}
                          </span>
                        ))}
                        {industry.certifications.length > 2 && (
                          <span className="text-[10px] font-body text-text-muted">
                            +{industry.certifications.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
