import Image from 'next/image'
import { generatePageMetadata } from '@/lib/metadata'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Download, ArrowRight, Cpu, Cog, Gauge, FlaskConical } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Technology',
  description: 'Innovation rooted in 32 years of engineering. SANPAR R&D, whitepapers, certifications, and how compressed air treatment works.',
  path: '/technology',
})

const innovations = [
  { year: '1994', title: 'ECODRAIR Trademark', desc: 'India\'s first indigenous tube-in-tube refrigeration air dryer series.', icon: Cog },
  { year: '2000', title: 'Brazed Aluminum Heat Exchangers', desc: 'Compact, lightweight heat exchange technology for high-efficiency systems.', icon: Gauge },
  { year: '2010', title: 'PLC-XEROS Series', desc: 'Programmable logic controlled dryers for tailored industrial applications.', icon: Cpu },
  { year: '2016', title: 'Airborne LCS Qualification', desc: 'DGAQA & CEMILAC approved liquid cooling for airborne radar systems.', icon: FlaskConical },
]

const flowSteps = [
  'Intake Air', 'Aftercooler', 'Separator', 'Filter', 'Dryer', 'Filter', 'Clean Dry Air'
]

export default function TechnologyPage() {
  return (
    <div className="pt-[72px]">
      {/* ════════ IMMERSIVE HERO — Blueprint-style with product showcase ════════ */}
      <section className="relative bg-ink-950 overflow-hidden min-h-[65vh] flex items-end">
        {/* Background product image */}
        <div className="absolute inset-0">
          <Image
            src="/images/products/xeros.png"
            alt="SANPAR XEROS Series"
            fill
            className="object-contain object-right-bottom opacity-15 scale-110"
            sizes="100vw"
          />
        </div>

        {/* Blueprint grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />

        {/* Accent glow */}
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-accent-500/8 rounded-full blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="container-main relative z-10 pb-14 pt-24 md:pt-32">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4">
            {'// '}Engineering Excellence
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-[1.05]">
            Innovation Rooted in
            <br />
            <span className="text-gradient">32 Years of Engineering</span>
          </h1>
          <p className="mt-5 text-lg font-body text-white/50 max-w-xl font-light leading-relaxed">
            From India&apos;s first indigenous refrigeration air dryer to CEMILAC-certified airborne systems — our technology pipeline never stops.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button variant="primary" href="#innovations" className="h-13 px-8">
              Explore Innovations
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
            </Button>
            <Button variant="ghost" href="/products">
              View Products
            </Button>
          </div>

          {/* Tech stat pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {['4 Patent-Pending Technologies', '32+ Years R&D', '5 Defence Certifications', '16 Product Lines'].map((stat) => (
              <span
                key={stat}
                className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-xs font-body text-white/60 font-medium"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Whitepaper */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-center bg-surface rounded-xl p-6 md:p-8">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-ink-950">
                <Image
                  src="/images/products/xeros.png"
                  alt="Refrigeration Air Dryers — Technical White Paper"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div>
                <Badge variant="primary">Technical Whitepaper</Badge>
                <h2 className="font-heading text-xl font-bold text-text-primary mt-3">
                  Refrigeration Air Dryers — Technical White Paper 2025
                </h2>
                <p className="text-base font-body text-text-secondary mt-3">
                  A comprehensive technical overview of refrigeration-based compressed air drying technology,
                  applications, and selection criteria for industrial engineers.
                </p>
                <Button variant="primary" className="mt-6" href="#" icon={<Download className="w-4 h-4" strokeWidth={1.5} />}>
                  Download PDF
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Innovations */}
      <section id="innovations" className="section-padding bg-surface scroll-mt-20">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-500 mb-3 block">
              {'// '}Milestones
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">Key Innovations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovations.map((inn, i) => (
              <ScrollReveal key={inn.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-border p-6 h-full hover:border-accent-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4">
                    <inn.icon className="w-5 h-5 text-accent-500" strokeWidth={1.5} />
                  </div>
                  <span className="font-heading text-sm font-bold text-accent-500">{inn.year}</span>
                  <h3 className="font-heading text-base font-bold text-text-primary mt-2">{inn.title}</h3>
                  <p className="text-sm font-body text-text-secondary mt-2">{inn.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-500 mb-3 block">
              {'// '}Process
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">How Compressed Air Treatment Works</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {flowSteps.map((step, i) => (
              <div key={`${step}-${i}`} className="flex items-center gap-4">
                <div className="bg-ink-950 text-white font-body text-sm font-medium px-5 py-3 rounded-lg text-center min-w-[120px]">
                  {step}
                </div>
                {i < flowSteps.length - 1 && (
                  <span className="text-accent-500 font-bold text-xl">&rarr;</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-ink-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-main relative z-10 text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4 block">
            {'// '}Quality Assurance
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-10">Certifications</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {['ISO 9001:2015', 'AS 9100 D', 'DGAQA Approved', 'CEMILAC Approved', 'ECODRAIR Trademark'].map((cert) => (
              <Badge key={cert} variant={cert.includes('DGAQA') || cert.includes('CEMILAC') ? 'gold' : 'teal'} className="text-sm py-3 px-6">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
