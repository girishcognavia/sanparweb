import Image from 'next/image'
import * as Icons from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { StatsBar } from '@/components/home/StatsBar'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { InteractiveTimeline } from '@/components/about/InteractiveTimeline'
import {
  mission,
  vision,
  qualityStatement,
  chairmanMessage,
  coreValues,
  sustainability,
  certificationDetails,
} from '@/data/company'
import { Button } from '@/components/shared/Button'

export const metadata = generatePageMetadata({
  title: 'Who We Are — SANPAR',
  description:
    "Excellence Since 1994. Precision-engineered thermal solutions from Bengaluru — trusted by India's most demanding industries and defence establishments.",
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      {/* ─── HERO ─── */}
      <section className="relative bg-ink-950 py-24 md:py-32 overflow-hidden">
        <Image
          src="/images/about/factory-1.webp"
          alt="SANPAR factory"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/80 to-ink-950" />
        <div className="container-main relative z-10">
          <ScrollReveal>
            <p className="text-sm font-body font-semibold uppercase tracking-wider text-accent-500 mb-4">
              Who We Are
            </p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-display max-w-3xl">
              Excellence Since 1994
            </h1>
            <p className="mt-5 text-md font-body text-text-muted max-w-2xl leading-relaxed">
              Precision-engineered thermal solutions from Bengaluru — trusted by India&apos;s
              most demanding industries and defence establishments.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <StatsBar />

      {/* ─── COMPANY INTRODUCTION — "We are Solutionizers" ─── */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <p className="text-sm font-body font-semibold uppercase tracking-wider text-accent-500 mb-3">
                  We are Solutionizers
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-tight">
                  We are SANPAR
                </h2>
                <div className="space-y-4 mt-6">
                  <p className="text-base font-body text-text-secondary leading-relaxed">
                    Established in 1994, SANPAR has over three decades of experience in application,
                    manufacturing, engineering and R&D in the field of airing solutions. We have
                    proved ourselves strong in each step in the chain of technology — Design,
                    Development, Manufacturing and Delivery.
                  </p>
                  <p className="text-base font-body text-text-secondary leading-relaxed">
                    Our manufacturing facility located in Bangalore, India is manned by our team
                    of qualified, skilled employees who work seamlessly to produce world-class products
                    in compressed air treatment systems, industrial cooling, and advanced cooling systems.
                  </p>
                  <p className="text-base font-body text-text-secondary leading-relaxed">
                    With a global service and application-based marketing network, SANPAR continues
                    to push the boundaries of thermal engineering across industries and aerospace.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/laptop-man.webp"
                  alt="SANPAR engineering professional"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─── */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <SectionHeader
            eyebrow="Driven by Purpose. Guided by Vision."
            heading="Our Mission & Vision"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <ScrollReveal>
              <div className="bg-white rounded-xl border border-border p-8 h-full">
                <div className="w-12 h-12 rounded-lg bg-accent-500/10 flex items-center justify-center mb-5">
                  <Icons.Target className="w-6 h-6 text-accent-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-3">Our Mission</h3>
                <p className="text-base font-body text-text-secondary leading-relaxed">{mission}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-xl border border-border p-8 h-full">
                <div className="w-12 h-12 rounded-lg bg-accent-500/10 flex items-center justify-center mb-5">
                  <Icons.Eye className="w-6 h-6 text-accent-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-3">Our Vision</h3>
                <p className="text-base font-body text-text-secondary leading-relaxed">{vision}</p>
              </div>
            </ScrollReveal>
          </div>
          {/* Quality Statement */}
          <ScrollReveal delay={0.2}>
            <div className="mt-8 bg-ink-950 rounded-xl p-8 text-center">
              <p className="text-sm font-body font-semibold uppercase tracking-wider text-accent-500 mb-3">
                Quality Statement
              </p>
              <p className="text-lg font-heading font-semibold text-white max-w-2xl mx-auto">
                &ldquo;{qualityStatement}&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CHAIRMAN'S MESSAGE ─── */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-start">
            <ScrollReveal>
              <div className="sticky top-24">
                <p className="text-sm font-body font-semibold uppercase tracking-wider text-accent-500 mb-3">
                  Chairman&apos;s Message
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-tight">
                  A Word From<br />Our Founder
                </h2>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent-500/10 flex items-center justify-center">
                    <Icons.Quote className="w-7 h-7 text-accent-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-heading text-base font-bold text-text-primary">{chairmanMessage.name}</p>
                    <p className="text-sm font-body text-text-muted">{chairmanMessage.title}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="space-y-5 border-l-4 border-accent-500/20 pl-8">
                {chairmanMessage.message.map((para, i) => (
                  <p key={i} className="text-base font-body text-text-secondary leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <SectionHeader
            eyebrow="The Principles That Power Our Purpose"
            heading="Our Core Values"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {coreValues.map((value, i) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const IconComponent = ((Icons as any)[value.icon] || Icons.Star) as React.ComponentType<{ className?: string; strokeWidth?: number }>
              return (
                <ScrollReveal key={value.name} delay={i * 0.08}>
                  <div className="bg-white rounded-xl border border-border p-6 h-full hover:shadow-card hover:-translate-y-[2px] transition-all duration-200">
                    <div className="w-11 h-11 rounded-lg bg-accent-500/10 flex items-center justify-center mb-4">
                      <IconComponent className="w-5 h-5 text-accent-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-text-primary">{value.name}</h3>
                    <p className="text-xs font-body text-text-muted mt-1.5 leading-relaxed">{value.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── SUSTAINABILITY ─── */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <p className="text-sm font-body font-semibold uppercase tracking-wider text-accent-500 mb-3">
                  Engineering with Purpose
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-tight">
                  Sustainability<br />at SANPAR
                </h2>
                <p className="text-base font-body text-text-secondary leading-relaxed mt-5">
                  {sustainability.intro}
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sustainability.pillars.map((pillar, i) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const IconComponent = ((Icons as any)[pillar.icon] || Icons.Leaf) as React.ComponentType<{ className?: string; strokeWidth?: number }>
                return (
                  <ScrollReveal key={pillar.title} delay={i * 0.1}>
                    <div className="bg-surface rounded-xl p-5 h-full border border-border">
                      <IconComponent className="w-6 h-6 text-accent-500 mb-3" strokeWidth={1.5} />
                      <h3 className="font-heading text-sm font-bold text-text-primary">{pillar.title}</h3>
                      <p className="text-xs font-body text-text-muted mt-1.5 leading-relaxed">{pillar.description}</p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section className="section-padding bg-ink-950">
        <div className="container-main">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-sm font-body font-semibold uppercase tracking-wider text-accent-500 mb-3">
                Certifications
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                Committed to Global Standards
              </h2>
              <p className="text-base font-body text-text-muted mt-3 max-w-2xl mx-auto">
                Dedicated to maintaining global excellence by following stringent quality practices,
                ensuring reliable performance, regulatory compliance, and continual improvement.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certificationDetails.map((cert, i) => (
              <ScrollReveal key={cert.name} delay={i * 0.1}>
                <div className="bg-ink-800 border border-ink-700 rounded-xl p-6 h-full hover:border-accent-500/40 transition-colors">
                  <Icons.BadgeCheck className="w-8 h-8 text-accent-500 mb-4" strokeWidth={1.5} />
                  <h3 className="font-heading text-sm font-bold text-white">{cert.name}</h3>
                  <p className="text-xs font-body text-text-muted mt-2 leading-relaxed">{cert.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <SectionHeader
            eyebrow="Collective Strength"
            heading="Our People, Our Advantage"
            subtext="SANPAR is a family of a collective goal. Our employees are our biggest competitive advantage."
          />
          <ScrollReveal>
            <div className="relative w-full aspect-[3.5/1] rounded-xl overflow-hidden mt-10">
              <Image
                src="/images/about/management-team.webp"
                alt="SANPAR management team"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-base font-body text-text-secondary leading-relaxed mt-8 max-w-3xl mx-auto text-center">
              Our highly experienced workforce has several qualified engineers on-hand to address
              specific enquiries. Our research started in Water Treatment solutions and our
              expertise has grown to include comprehensive knowledge and exposure to Industrial
              Utilities such as Air, Steam &amp; Water. We continue to focus on establishing SANPAR
              as a leader in providing the Indian Industry with energy efficient air treatment products.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <ScrollReveal delay={0.1}>
              <div className="text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mx-auto max-w-[280px]">
                  <Image
                    src="/images/about/team.webp"
                    alt="SANPAR management team"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading text-md font-bold text-text-primary mt-4">Management</h3>
                <p className="text-sm font-body text-accent-500">Leadership & Strategy</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mx-auto max-w-[280px]">
                  <Image
                    src="/images/about/factory-2.webp"
                    alt="SANPAR engineering team"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading text-md font-bold text-text-primary mt-4">Engineering</h3>
                <p className="text-sm font-body text-accent-500">R&D & Design</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mx-auto max-w-[280px]">
                  <Image
                    src="/images/about/factory-3.webp"
                    alt="SANPAR production floor"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading text-md font-bold text-text-primary mt-4">Production</h3>
                <p className="text-sm font-body text-accent-500">Manufacturing</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-border bg-surface min-h-[300px]">
                <Icons.UserPlus className="w-10 h-10 text-accent-500 mb-4" strokeWidth={1.5} />
                <h3 className="font-heading text-md font-bold text-text-primary">Join Our Team</h3>
                <p className="text-sm font-body text-text-muted mt-2 text-center">
                  We&apos;re growing. See open roles.
                </p>
                <Button variant="primary" href="/careers" className="mt-4">
                  View Openings
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CULTURE GALLERY ─── */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <SectionHeader
            eyebrow="Our Culture"
            heading="Precision Engineering. Purposeful Culture."
          />
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mt-10">
            <ScrollReveal>
              <div className="relative aspect-[2/1] rounded-xl overflow-hidden">
                <Image
                  src="/images/about/hannover.webp"
                  alt="SANPAR at HANNOVER MESSE"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-heading text-sm font-bold text-white">HANNOVER MESSE, Germany</p>
                  <p className="text-xs text-white/70 font-body mt-1">International Recognition — 2015</p>
                </div>
              </div>
            </ScrollReveal>
            <div className="grid grid-rows-2 gap-4">
              <ScrollReveal delay={0.1}>
                <div className="relative rounded-xl overflow-hidden h-full min-h-[140px]">
                  <Image
                    src="/images/about/culture.webp"
                    alt="SANPAR team culture"
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="relative rounded-xl overflow-hidden h-full min-h-[140px]">
                  <Image
                    src="/images/about/factory-1.webp"
                    alt="SANPAR factory floor"
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE TIMELINE ─── */}
      <InteractiveTimeline />

      {/* ─── CTA ─── */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(135deg, #003580 0%, #0D1117 100%)' }}
      >
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
              Ready to Partner with SANPAR?
            </h2>
            <p className="mt-4 text-base font-body text-text-muted max-w-xl mx-auto">
              Whether you need compressed air treatment, industrial cooling, or defence-grade
              thermal systems — let&apos;s talk.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Button variant="primary" href="/contact">
                Get in Touch
              </Button>
              <Button variant="secondary" href="/products">
                Browse Products
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
