import { Shield } from 'lucide-react'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const certs = ['DGAQA Approved', 'CEMILAC Approved', 'AS 9100 D', 'ISO 9001:2015']

export function DefenceSpotlight() {
  return (
    <section className="section-padding bg-ink-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 diagonal-lines text-white" />

      <div className="container-main relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
            {/* Left — Cert Badges */}
            <div className="flex flex-wrap lg:flex-col gap-3">
              {certs.map((cert) => (
                <Badge key={cert} variant="gold" className="text-sm py-2.5 px-5">
                  <Shield className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  {cert}
                </Badge>
              ))}
            </div>

            {/* Right — Content */}
            <div>
              <span className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
                {'// '}Defence Division
              </span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                SANPAR Defence
                <br />
                Systems Pvt. Ltd.
              </h2>
              <p className="mt-5 text-md font-body text-white/40 leading-relaxed max-w-2xl font-light">
                Mission-critical thermal management for aerospace, radar, and ground
                support applications. 32 years of defence engineering heritage.
              </p>
              <div className="mt-8">
                <Button
                  variant="ghost"
                  href="/defence"
                  className="border-amber-500/50 text-amber-400 hover:bg-amber-500/15"
                >
                  Explore Defence Capabilities
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
