import { generatePageMetadata } from '@/lib/metadata'
import { Check, Phone, Mail, MapPin } from 'lucide-react'
import { company } from '@/data/company'
import { ContactForm } from './ContactForm'

export const metadata = generatePageMetadata({
  title: 'Contact Us',
  description: 'Get a quote or speak to a SANPAR application engineer. Free consultation, response within 4 business hours.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      <section className="section-padding bg-white">
        <div className="container-main grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12">
          {/* Left */}
          <div>
            <h1 className="font-heading text-3xl font-bold text-text-primary">
              Let&apos;s talk.
            </h1>
            <div className="mt-6 space-y-3">
              {[
                'Free application consultation — no obligation',
                'Response within 4 business hours',
                '32 years serving Indian industry',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-success" strokeWidth={1.5} />
                  <span className="text-sm font-body text-text-secondary">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm font-body text-text-secondary hover:text-accent-500 transition-colors">
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-sm font-body text-text-secondary hover:text-accent-500 transition-colors">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
                {company.email}
              </a>
              <div className="flex items-start gap-3 text-sm font-body text-text-secondary">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={1.5} />
                {company.address}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
