'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Phone, Shield, Menu, ChevronDown } from 'lucide-react'
import { mainNav } from '@/data/navigation'
import { Button } from '@/components/shared/Button'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openMega, setOpenMega] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const megaTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMega(null)
  }, [pathname])

  const handleMegaEnter = (label: string) => {
    clearTimeout(megaTimeout.current)
    setOpenMega(label)
  }

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setOpenMega(null), 150)
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white border-b border-border/50 shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/images/logo.png"
              alt="SANPAR Industries"
              width={36}
              height={36}
              className="rounded"
              priority
            />
            <div className="flex flex-col">
              <span
                className={`font-heading text-xl font-bold tracking-tight transition-colors ${
                  scrolled ? 'text-ink-900' : 'text-white'
                }`}
              >
                SANPAR
              </span>
              <span className={`text-[9px] font-body font-medium uppercase tracking-wider ${
                scrolled ? 'text-text-muted' : 'text-white/50'
              }`}>
                Industries
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" role="navigation" aria-label="Main navigation">
            {mainNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleMegaEnter(item.label)}
                onMouseLeave={handleMegaLeave}
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1 px-4 py-2 text-sm font-body font-medium rounded-full transition-all duration-200 ${
                    scrolled
                      ? isActive(item.href)
                        ? 'text-accent-500 bg-accent-500/8'
                        : 'text-text-primary hover:text-accent-500 hover:bg-accent-500/5'
                      : isActive(item.href)
                        ? 'text-white bg-white/15'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />}
                </Link>

                {/* Mega Menu for Products (4-col nested) */}
                {item.label === 'Products' && item.children && openMega === 'Products' && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-2xl shadow-card-lift border border-border/50 p-6 mt-3"
                    onMouseEnter={() => handleMegaEnter('Products')}
                    onMouseLeave={handleMegaLeave}
                  >
                    <div className="grid grid-cols-4 gap-6">
                      {item.children.map((category) => (
                        <div key={category.label}>
                          <h4 className="font-heading text-sm font-bold text-accent-500 mb-3">
                            {category.label}
                          </h4>
                          <ul className="space-y-2">
                            {category.children?.map((product) => (
                              <li key={product.href}>
                                <Link
                                  href={product.href}
                                  className="block text-sm text-text-secondary hover:text-accent-500 transition-colors"
                                >
                                  {product.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dropdown for About Us */}
                {item.label === 'About Us' && item.children && openMega === 'About Us' && (
                  <div
                    className="absolute top-full left-0 w-[240px] bg-white rounded-2xl shadow-card-lift border border-border/50 py-2 mt-3"
                    onMouseEnter={() => handleMegaEnter('About Us')}
                    onMouseLeave={handleMegaLeave}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2.5 text-sm font-body text-text-secondary hover:text-accent-500 hover:bg-surface transition-colors"
                      >
                        <span className="font-medium text-text-primary">{child.label}</span>
                        {child.description && (
                          <span className="block text-xs text-text-muted mt-0.5">{child.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Dropdown for Industries */}
                {item.label === 'Industries' && item.children && openMega === 'Industries' && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] bg-white rounded-2xl shadow-card-lift border border-border/50 p-5 mt-3"
                    onMouseEnter={() => handleMegaEnter('Industries')}
                    onMouseLeave={handleMegaLeave}
                  >
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm font-body text-text-secondary hover:text-accent-500 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-border">
                      <Link
                        href="/industries"
                        className="text-sm font-body font-semibold text-accent-500 hover:text-accent-600 transition-colors"
                      >
                        View All Industries &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Defence Badge */}
            <Link
              href="/defence"
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-body font-semibold rounded-full transition-all duration-200 ${
                scrolled
                  ? 'text-amber-600 bg-amber-500/10 hover:bg-amber-500/20'
                  : 'text-amber-400 bg-amber-500/15 hover:bg-amber-500/25'
              }`}
            >
              <Shield className="w-4 h-4" strokeWidth={1.5} />
              <span className="hidden xl:inline">Defence</span>
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+917349142424"
              className={`hidden md:flex items-center gap-1.5 text-sm font-body font-medium transition-colors ${
                scrolled ? 'text-text-secondary hover:text-accent-500' : 'text-white/70 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
              +91 73491 42424
            </a>
            <Button variant="primary" href="/contact" className="hidden sm:inline-flex text-xs h-10 px-5">
              Get a Quote
            </Button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                scrolled ? 'text-text-primary hover:bg-surface' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
