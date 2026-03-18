'use client'

import { useState } from 'react'
import { Check, Loader2, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export function CTABanner() {
  const [form, setForm] = useState({ name: '', company: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'homepage-cta' }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section-padding bg-ink-950 relative overflow-hidden">
      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4">
              {'// '}Get Started
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Ready to solve your
              <br />
              <span className="text-gradient">air challenge?</span>
            </h2>
            <p className="mt-4 text-md font-body text-white/40 font-light">
              Talk to a SANPAR application engineer. Free, no obligation.
            </p>

            {/* Form */}
            <div className="mt-10">
              {status === 'success' ? (
                <div className="inline-flex items-center gap-3 bg-success-light rounded-2xl px-8 py-5">
                  <Check className="w-6 h-6 text-success" strokeWidth={1.5} />
                  <p className="font-body text-base text-text-primary">
                    We&apos;ll call you within 4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-14 px-5 rounded-full bg-white/5 border border-white/15 text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent w-full sm:flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="h-14 px-5 rounded-full bg-white/5 border border-white/15 text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent w-full sm:flex-1"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-14 px-5 rounded-full bg-white/5 border border-white/15 text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent w-full sm:flex-1"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="h-14 px-8 rounded-full bg-accent-500 text-white font-body text-sm font-semibold hover:bg-accent-600 hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    )}
                    Callback
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="mt-4 text-sm text-error font-body">
                  Something went wrong — try again, or call us on +91 73491 42424.
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
