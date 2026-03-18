import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Twitter, Youtube, Facebook, Mail, Phone, PhoneCall, ArrowUpRight } from 'lucide-react'
import { company } from '@/data/company'
import { footerProducts } from '@/data/navigation'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Who We Are', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Industries', href: '/industries' },
  { label: 'Support & Services', href: '/support' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
]

const industryLinks = [
  { label: 'Aerospace & Defence', href: '/industries/aerospace-defence' },
  { label: 'Pharmaceutical', href: '/industries/pharmaceutical' },
  { label: 'Food & Beverage', href: '/industries/food-beverage' },
  { label: 'Machine Tools', href: '/industries/machine-tools' },
  { label: 'Manufacturing', href: '/industries/manufacturing' },
  { label: 'Energy & Power', href: '/industries/energy-power' },
  { label: 'Cement', href: '/industries/cement' },
  { label: 'Chemical', href: '/industries/chemical' },
  { label: 'Plastics', href: '/industries/plastics' },
  { label: 'Textile', href: '/industries/textile' },
]

const socials = [
  { icon: Facebook, href: company.social.facebook, label: 'Facebook' },
  { icon: Linkedin, href: company.social.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: company.social.twitter, label: 'Twitter' },
  { icon: Youtube, href: company.social.youtube, label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-ink-950 text-white">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-accent-500 via-violet-500 to-accent-500" />

      <div className="container-main py-16 md:py-20">
        {/* Top Section — Logo & CTA */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mb-14 pb-14 border-b border-white/10">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/images/logo.png" alt="SANPAR" width={36} height={36} className="rounded" />
              <span className="font-heading text-2xl font-bold text-white tracking-tight">{company.name}</span>
            </Link>
            <p className="text-sm text-white/40 font-body mt-4 leading-relaxed font-light">
              {company.description}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <a
              href={`tel:${company.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-sm font-body text-white/60 hover:text-accent-400 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-accent-500/15 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-accent-400" strokeWidth={1.5} />
              </div>
              {company.phone}
            </a>
            <a
              href={`tel:${company.phoneAlt.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-sm font-body text-white/60 hover:text-accent-400 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-accent-500/15 flex items-center justify-center">
                <PhoneCall className="w-3.5 h-3.5 text-accent-400" strokeWidth={1.5} />
              </div>
              {company.phoneAlt}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-3 text-sm font-body text-white/60 hover:text-accent-400 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-accent-500/15 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 text-accent-400" strokeWidth={1.5} />
              </div>
              {company.email}
            </a>
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xs font-bold text-white/30 uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-body text-white/50 hover:text-accent-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading text-xs font-bold text-white/30 uppercase tracking-wider mb-5">
              Products
            </h3>
            <ul className="space-y-3">
              {footerProducts.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-body text-white/50 hover:text-accent-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 text-sm font-body font-medium text-accent-400 hover:text-accent-300 transition-colors"
                >
                  All Products <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-heading text-xs font-bold text-white/30 uppercase tracking-wider mb-5">
              Industries
            </h3>
            <ul className="space-y-3">
              {industryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-body text-white/50 hover:text-accent-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading text-xs font-bold text-white/30 uppercase tracking-wider mb-5">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-accent-500 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-white/30">
          <p>&copy; {new Date().getFullYear()} {company.name}. Developed by <a href="https://cognavia.com" target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:underline">Cognavia</a></p>
          <div className="flex items-center gap-4">
            <Link href="/terms-and-conditions" className="hover:text-accent-400 transition-colors">Terms & Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-accent-400 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
