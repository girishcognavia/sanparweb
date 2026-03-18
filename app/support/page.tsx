import Image from 'next/image'
import { generatePageMetadata } from '@/lib/metadata'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Phone, Mail, Wrench, ShieldCheck, Clock, HeadphonesIcon, ArrowRight } from 'lucide-react'
import { company } from '@/data/company'

export const metadata = generatePageMetadata({
  title: 'Support & Services',
  description: 'Aftercare excellence — installation, commissioning, preventive maintenance, and 24/7 support for all SANPAR products.',
  path: '/support',
})

const services = [
  {
    icon: Wrench,
    title: 'Installation & Commissioning',
    desc: 'Expert on-site installation and commissioning by factory-trained engineers. Every system is tested and validated before handover.',
  },
  {
    icon: ShieldCheck,
    title: 'Preventive Maintenance',
    desc: 'Scheduled maintenance plans tailored to your operating conditions — extending equipment life and preventing unplanned downtime.',
  },
  {
    icon: Clock,
    title: 'Annual Maintenance Contracts',
    desc: 'Comprehensive AMC packages covering periodic inspection, filter replacements, refrigerant checks, and performance validation.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Technical Support',
    desc: 'Phone and email support from our engineering team. Most issues are diagnosed and resolved within 4 working hours.',
  },
]

const steps = [
  { num: '01', title: 'Contact Us', desc: 'Call or email our support team with your equipment details and issue description.' },
  { num: '02', title: 'Diagnosis', desc: 'Our engineers diagnose the issue — remotely where possible, on-site when needed.' },
  { num: '03', title: 'Resolution', desc: 'We resolve the issue with genuine SANPAR parts and factory-certified procedures.' },
  { num: '04', title: 'Follow-Up', desc: 'Post-service validation and documentation, with recommendations to prevent recurrence.' },
]

export default function SupportPage() {
  return (
    <div className="pt-[72px]">
      {/* ════════ IMMERSIVE HERO — Full-bleed with split content ════════ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden bg-ink-950">
        {/* Full background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/support/support-1.webp"
            alt="SANPAR support engineers"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent" />

        {/* Content at bottom */}
        <div className="container-main relative z-10 pb-14 pt-28 md:pt-36">
          <Badge variant="primary" className="backdrop-blur-sm">Support & Services</Badge>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mt-5 max-w-3xl leading-[1.05]">
            Aftercare
            <br />
            <span className="text-gradient">Excellence</span>
          </h1>
          <p className="text-lg font-body text-white/50 mt-5 max-w-xl font-light leading-relaxed">
            Providing cutting-edge solutions covers only half of our implementation cycle.
            We take pride in the maintenance and regular monitoring of our installed products.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button variant="primary" href="/contact" className="h-13 px-8">
              Request Service
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
            </Button>
            <a
              href={`tel:${company.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white text-sm font-body font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" strokeWidth={1.5} />
              {company.phone}
            </a>
          </div>

          {/* Quick stat pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {['4-Hour Response Time', 'Factory-Trained Engineers', 'Genuine Parts Only', '32+ Years Experience'].map((stat) => (
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

      {/* Service Offerings */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-500 mb-3 block">
              {'// '}What We Offer
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Sustained Performance Support Services
            </h2>
            <p className="text-base font-body text-text-secondary max-w-2xl mx-auto">
              From day one installation to decade-long maintenance, our service team ensures your SANPAR equipment
              operates at peak efficiency throughout its lifecycle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1}>
                <div className="bg-surface rounded-xl p-6 h-full hover:border-accent-500/30 border border-transparent transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-5">
                    <service.icon className="w-6 h-6 text-accent-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-base font-bold text-text-primary">{service.title}</h3>
                  <p className="text-sm font-body text-text-secondary mt-2">{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-500 mb-3 block">
              {'// '}Process
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
              How Our Support Process Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="relative bg-white rounded-xl border border-border p-6 hover:border-accent-500/30 transition-colors">
                  <span className="absolute top-4 right-5 font-heading text-5xl font-extrabold text-accent-500/[0.08] select-none">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4">
                    <span className="font-heading text-sm font-extrabold text-accent-500">{step.num}</span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-text-primary">{step.title}</h3>
                  <p className="text-sm font-body text-text-secondary mt-2">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Image Strip */}
      <section className="bg-white">
        <div className="container-main py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['/images/support/support-1.webp', '/images/support/support-2.webp', '/images/support/support-3.webp'].map((src, i) => (
              <ScrollReveal key={src} delay={i * 0.1}>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                  <Image src={src} alt={`SANPAR facility ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-ink-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-main text-center relative z-10">
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4 block">
            {'// '}Get Help
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">Need Assistance?</h2>
          <p className="text-base font-body text-white/40 mt-3 max-w-xl mx-auto font-light">
            Our support team responds within 4 working hours. Reach out for service requests,
            spare parts, or technical consultations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button variant="primary" href="/contact">
              Contact Support
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
            </Button>
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-white text-sm font-body font-medium hover:bg-white/10 transition-colors"
            >
              <Mail className="w-4 h-4" strokeWidth={1.5} />
              {company.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
