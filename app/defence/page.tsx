import { Shield } from 'lucide-react'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Defence Systems',
  description: 'SANPAR Defence Systems Pvt. Ltd. — Mission-critical thermal management for aerospace, radar, and ground support. DGAQA & CEMILAC certified.',
  path: '/defence',
})

const certs = ['DGAQA Approved', 'CEMILAC Approved', 'AS 9100 D', 'ISO 9001:2015']

const defenceProducts = [
  { name: 'Airborne Liquid Cooling System (LCS)', app: 'Radar and avionics thermal management', spec: 'Qualified for airborne use, CEMILAC approved', note: 'Supplied to LRDE / DRDO' },
  { name: 'Air Conditioned Trolley (ACM-Based)', app: 'Ground support air conditioning for aircraft', spec: 'Diesel-cum-grid powered, ACM cycle', note: '2025 development' },
  { name: 'Air Chillers (Defence Grade)', app: 'LRU cooling, avionics bay cooling', spec: 'Chilled air down to -10°C', note: 'Supplied to CHESS / DRDO' },
  { name: 'Coolant Chillers — EGW', app: 'Ethylene Glycol Water cooling for airborne systems', spec: 'Airborne-qualified, lightweight', note: 'First supply 2017' },
  { name: 'Ground Support Equipment (GSE)', app: 'Conditioned air for civil and military aircraft', spec: 'Same technology as airborne ACM systems', note: 'Bridges defence and airport ops' },
]

const defenceTimeline = [
  { year: '1996', text: 'First Air Chiller for defence application (DRDO)' },
  { year: '2000', text: 'First Air Chiller to LRDE / DRDO' },
  { year: '2010', text: 'Liquid cooling system for ground testing' },
  { year: '2015', text: 'First airborne cooling system for radar' },
  { year: '2016', text: 'Airborne LCS — DGAQA & CEMILAC approved' },
  { year: '2017', text: 'AS 9100 D cert. First airborne liquid circulation module.' },
  { year: '2019', text: 'Airborne aluminium piping with integrated sensors' },
  { year: '2020', text: 'Air chillers for LRU cooling to CHESS / DRDO' },
  { year: '2024', text: 'SANPAR Defence Systems Pvt. Ltd. established' },
  { year: '2025', text: 'Diesel-cum-grid ACM Air Conditioning Trolley' },
]

export default function DefencePage() {
  return (
    <div className="bg-ink-950 min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="container-main relative z-10">
          <span className="text-sm font-body uppercase tracking-wider text-amber-500">
            SANPAR Defence Systems Pvt. Ltd.
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-display mt-4">
            Mission-Critical Thermal Systems.<br />Defence Grade. India Made.
          </h1>
          <p className="mt-6 text-md font-body text-text-muted max-w-2xl">
            Airborne cooling. Radar thermal management. Ground support equipment.
            Certified to the highest military and aerospace standards.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button variant="ghost" href="/contact" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
              Request Capability Statement
            </Button>
            <Button variant="ghost" href="/contact">
              Speak to Our Defence Team
            </Button>
          </div>
        </div>
      </section>

      {/* Cert Bar */}
      <section className="py-8 border-y border-ink-700">
        <div className="container-main flex flex-wrap gap-3 justify-center">
          {certs.map((cert) => (
            <Badge key={cert} variant="gold" className="text-sm py-2 px-5">
              <Shield className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
              {cert}
            </Badge>
          ))}
        </div>
      </section>

      {/* Defence Products */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="font-heading text-2xl font-bold text-white mb-10">Defence Product Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defenceProducts.map((p) => (
              <ScrollReveal key={p.name}>
                <div className="bg-ink-800 border border-ink-700 rounded-xl p-6">
                  <h3 className="font-heading text-base font-bold text-white">{p.name}</h3>
                  <p className="text-sm font-body text-text-muted mt-2"><strong className="text-amber-500">Application:</strong> {p.app}</p>
                  <p className="text-sm font-body text-text-muted mt-1"><strong className="text-amber-500">Key Spec:</strong> {p.spec}</p>
                  <p className="text-xs font-body text-text-muted/60 mt-3 italic">{p.note}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding border-t border-ink-700">
        <div className="container-main">
          <h2 className="font-heading text-2xl font-bold text-white mb-10">Defence Engineering Timeline</h2>
          <div className="space-y-6 border-l-2 border-amber-500/30 pl-8 max-w-2xl">
            {defenceTimeline.map((t) => (
              <div key={t.year} className="relative">
                <div className="absolute -left-[33px] top-1 w-3 h-3 rounded-full bg-amber-500" />
                <span className="font-heading text-sm font-bold text-amber-500">{t.year}</span>
                <p className="text-sm font-body text-text-muted mt-0.5">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-ink-700">
        <div className="container-main text-center">
          <p className="text-sm font-body text-text-muted mb-4">Defence enquiries are handled with full confidentiality.</p>
          <Button variant="ghost" href="/contact" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
            Contact Defence Team
          </Button>
        </div>
      </section>
    </div>
  )
}
