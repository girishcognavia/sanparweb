import Image from 'next/image'
import { generatePageMetadata } from '@/lib/metadata'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Users, Heart, Lightbulb, TrendingUp, Briefcase, ArrowRight } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Careers — Work With Us',
  description: 'Life at SANPAR — build your career in thermal engineering, compressed air treatment, and defence systems with a 32-year industry leader.',
  path: '/careers',
})

const values = [
  { icon: Users, title: 'Inclusion & Collaboration', desc: 'A culture built on teamwork, mutual respect, and open communication across all levels.' },
  { icon: Heart, title: 'High Performance', desc: 'We set ambitious standards and support every team member in meeting them.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Continuous improvement in products, processes, and people — curiosity is encouraged.' },
  { icon: TrendingUp, title: 'Growth', desc: 'Structured career paths, cross-functional exposure, and investment in skill development.' },
]

const team = [
  { name: 'Manikyam. K', role: 'Senior Engineer', image: '/images/about/team.webp' },
  { name: 'Kavan M.C', role: 'Production Lead', image: '/images/about/factory-2.webp' },
]

const openings = [
  { title: 'Service Engineer — Compressed Air', location: 'Bengaluru', type: 'Full-time' },
  { title: 'Design Engineer — Thermal Systems', location: 'Bengaluru', type: 'Full-time' },
  { title: 'Sales Executive — Industrial Products', location: 'Mumbai / Delhi', type: 'Full-time' },
  { title: 'Quality Inspector — AS 9100', location: 'Bengaluru', type: 'Full-time' },
]

export default function CareersPage() {
  return (
    <div className="pt-[72px]">
      {/* ════════ IMMERSIVE HERO — Full culture photo with overlay ════════ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-ink-950">
        {/* Full background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/careers/careers-hero.webp"
            alt="Work at SANPAR"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent" />

        {/* Content at bottom */}
        <div className="container-main relative z-10 pb-14 pt-28 md:pt-36">
          <Badge variant="primary" className="backdrop-blur-sm">Careers</Badge>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mt-5 max-w-3xl leading-[1.05]">
            Look Around and
            <br />
            <span className="text-gradient">See the Difference</span>
          </h1>
          <p className="text-lg font-body text-white/50 mt-5 max-w-xl font-light leading-relaxed">
            Our culture is built on inclusion, collaboration, high performance, and opportunity —
            making SANPAR one of the most rewarding places to work in Indian thermal engineering.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button variant="primary" href="#openings" className="h-13 px-8">
              View Open Positions
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
            </Button>
            <Button variant="ghost" href="/contact">
              Send Your Resume
            </Button>
          </div>

          {/* Value pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {['Engineering Excellence', 'Defence Certified', 'Global Ambitions', 'Bengaluru HQ'].map((pill) => (
              <span
                key={pill}
                className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-xs font-body text-white/60 font-medium"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Life at SANPAR */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-500 mb-3 block">
              {'// '}Our Values
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
              Empowering Growth, Inspiring Innovation
            </h2>
            <p className="text-base font-body text-text-secondary mt-3 max-w-2xl mx-auto">
              At SANPAR, we believe that great products come from great people. We invest in our team
              with structured development, cross-functional exposure, and a culture that values initiative.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="bg-surface rounded-xl p-6 h-full hover:border-accent-500/30 border border-transparent transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-5">
                    <v.icon className="w-6 h-6 text-accent-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-base font-bold text-text-primary">{v.title}</h3>
                  <p className="text-sm font-body text-text-secondary mt-2">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Faces of SANPAR */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-500 mb-3 block">
              {'// '}Our People
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
              Faces of SANPAR
            </h2>
            <p className="text-base font-body text-text-secondary mt-2">
              We have the best people with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-card-hover transition-shadow">
                  <div className="relative aspect-[4/3]">
                    <Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-base font-bold text-text-primary">{member.name}</h3>
                    <p className="text-sm font-body text-text-muted mt-1">{member.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.2}>
              <div className="relative bg-white rounded-xl border border-border overflow-hidden h-full hover:shadow-card-hover transition-shadow">
                <div className="relative aspect-[4/3]">
                  <Image src="/images/careers/management.webp" alt="SANPAR management team" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold text-text-primary">Leadership Team</h3>
                  <p className="text-sm font-body text-text-muted mt-1">Guiding SANPAR since 1994</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="section-padding bg-white scroll-mt-20">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-500 mb-3 block">
              {'// '}Join Us
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
              Current Openings
            </h2>
            <p className="text-base font-body text-text-secondary mt-2">
              Join our growing team of engineers and professionals.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {openings.map((job) => (
              <ScrollReveal key={job.title}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-surface rounded-xl border border-border p-5 gap-4 hover:border-accent-500/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-accent-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-text-primary">{job.title}</h3>
                      <p className="text-sm font-body text-text-muted mt-0.5">
                        {job.location} &middot; {job.type}
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" href={`/contact?subject=Career: ${encodeURIComponent(job.title)}`} className="text-xs h-9 shrink-0">
                    Apply Now
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-ink-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-main text-center relative z-10">
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4 block">
            {'// '}Open Application
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
            Don&apos;t see your role listed?
          </h2>
          <p className="text-base font-body text-white/40 mt-3 max-w-xl mx-auto font-light">
            We&apos;re always looking for talented engineers and professionals.
            Send us your resume — we&apos;ll reach out when there&apos;s a fit.
          </p>
          <Button variant="primary" href="/contact" className="mt-6">
            Send Your Resume
            <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
          </Button>
        </div>
      </section>
    </div>
  )
}
