import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const milestones = [
  { year: '1994', text: 'Founded in Bengaluru' },
  { year: '2016', text: 'CEMILAC Approval for Airborne Systems' },
  { year: '2024', text: 'SANPAR Defence Systems Entity Formed' },
]

export function CompanyStoryTeaser() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Image with overlapping accent */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/about/factory-1.webp"
                  alt="SANPAR factory — Bommasandra Industrial Estate, Bengaluru"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl shadow-card-lift p-5 border border-border">
                <span className="font-heading text-3xl font-extrabold text-accent-500">32+</span>
                <p className="font-body text-xs text-text-muted mt-1">Years of Excellence</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Content */}
          <ScrollReveal delay={0.15} direction="right">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-accent-500 mb-4">
              {'// '}Our Journey
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
              Three Decades of
              <br />
              <span className="text-gradient">Precision Engineering</span>
            </h2>
            <p className="mt-5 text-base font-body text-text-secondary leading-relaxed font-light">
              What began as a single compressed air dryer in 1994 has grown into India&apos;s
              trusted thermal engineering partner — serving 40+ marquee clients across
              14 industries, with defence-grade certifications that few can match.
            </p>
            <p className="mt-3 text-base font-body text-text-secondary leading-relaxed font-light">
              From pharmaceutical cleanrooms to airborne radar systems, SANPAR delivers
              precision where it matters most.
            </p>

            {/* Horizontal Timeline */}
            <div className="mt-10 flex gap-6">
              {milestones.map((m) => (
                <div key={m.year} className="flex-1 relative pl-4 border-l-2 border-accent-500/30">
                  <span className="font-heading text-lg font-bold text-accent-500">{m.year}</span>
                  <p className="font-body text-sm text-text-secondary mt-1">{m.text}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full bg-ink-950 text-white text-sm font-body font-semibold hover:bg-ink-800 transition-colors"
            >
              Our Full Journey <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
