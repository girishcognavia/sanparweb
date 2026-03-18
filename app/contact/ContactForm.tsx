'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/shared/Button'

const interests = [
  'Compressed Air Treatment',
  'Industrial Cooling',
  'Industrial Air Conditioning',
  'Medical Desiccant Dryers',
  'Defence Systems',
  'General Enquiry',
]

export function ContactForm() {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const shouldReduce = useReducedMotion()

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    interests: [] as string[],
    industry: '',
    enquiryType: '',
    budgetRange: '',
    hearAboutUs: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep1 = () => {
    const errs: Record<string, string> = {}
    if (form.name.length < 2) errs.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "That email doesn't look right — double-check the format."
    if (!form.company) errs.company = 'Company name is required.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleContinue = () => {
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.interests.length === 0) {
      setErrors({ interests: 'Please select at least one area of interest.' })
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact-page' }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const toggleInterest = (interest: string) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((i) => i !== interest)
        : [...f.interests, interest],
    }))
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-success" strokeWidth={1.5} />
        </div>
        <h3 className="font-heading text-xl font-bold text-text-primary">Enquiry sent!</h3>
        <p className="text-sm font-body text-text-secondary mt-2 text-center">
          We&apos;ll respond within 4 business hours.{' '}
          <a href="/products" className="text-accent-500 hover:underline">Explore our product catalogue.</a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-xl p-6 md:p-8">
      {/* Step 1 */}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-body font-medium text-text-primary mb-1">Name *</label>
          <input id="name" type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full h-11 px-4 rounded-lg border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent-500"
            aria-required="true" aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="text-xs text-error mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-body font-medium text-text-primary mb-1">Work Email *</label>
          <input id="email" type="email" placeholder="Work email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full h-11 px-4 rounded-lg border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent-500"
            aria-required="true" aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="text-xs text-error mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-body font-medium text-text-primary mb-1">Company *</label>
          <input id="company" type="text" placeholder="Your company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full h-11 px-4 rounded-lg border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent-500"
            aria-required="true" aria-describedby={errors.company ? 'company-error' : undefined}
          />
          {errors.company && <p id="company-error" className="text-xs text-error mt-1">{errors.company}</p>}
        </div>

        {step === 1 && (
          <>
            <Button type="button" variant="primary" className="w-full" onClick={handleContinue}>
              Continue
            </Button>
            <p className="text-xs text-text-muted font-body text-center">We&apos;ll never share your details. Ever.</p>
          </>
        )}
      </div>

      {/* Step 2 */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            initial={shouldReduce ? {} : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-border space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">Product Interest *</label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button key={interest} type="button" onClick={() => toggleInterest(interest)}
                      className={`px-3 py-2 rounded-lg text-sm font-body border transition-colors ${
                        form.interests.includes(interest)
                          ? 'bg-accent-500 text-white border-accent-500'
                          : 'bg-white text-text-secondary border-border hover:border-accent-500'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                {errors.interests && <p className="text-xs text-error mt-1">{errors.interests}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-body font-medium text-text-primary mb-1">Message</label>
                <textarea id="message" placeholder="Describe your application — even rough details help us prepare." rows={4}
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full h-[52px]" loading={status === 'loading'}>
                Send Enquiry
              </Button>

              {status === 'error' && (
                <p className="text-xs text-error font-body text-center">
                  Something went wrong — try again, or call us directly on +91 73491 42424.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
