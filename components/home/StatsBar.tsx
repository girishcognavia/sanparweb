'use client'

import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { company } from '@/data/company'

const stats = [
  { end: company.stats.yearsExperience, suffix: '+', label: 'Years' },
  { end: company.stats.products, suffix: '+', label: 'Products' },
  { end: company.stats.clients, suffix: '+', label: 'Clients' },
  { end: company.stats.industries, suffix: '', label: 'Industries' },
]

export function StatsBar() {
  return (
    <section className="relative py-16 md:py-20 bg-ink-950 overflow-hidden">
      {/* Accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />

      <div className="container-main">
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} direction="up">
              <div className="text-center">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  className="font-heading text-5xl md:text-6xl font-extrabold text-white tracking-tight"
                />
                <p className="font-body text-sm text-white/30 mt-2 uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
    </section>
  )
}
