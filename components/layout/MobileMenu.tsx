'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ChevronDown, Shield, Phone } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { mainNav } from '@/data/navigation'
import { Button } from '@/components/shared/Button'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setExpanded(null)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Focus trap
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduce ? {} : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-ink-950"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-4 h-[72px]">
            <span className="font-heading text-[22px] font-bold text-white">SANPAR</span>
            <button onClick={onClose} className="p-2 text-white" aria-label="Close menu">
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="px-4 py-6 overflow-y-auto max-h-[calc(100vh-72px)]">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  onClick={onClose}
                  className="block py-3 px-4 text-lg font-body font-medium text-white hover:text-accent-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              {mainNav.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: shouldReduce ? 0 : i * 0.05 }}
                >
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full py-3 px-4 text-lg font-body font-medium text-white hover:text-accent-400 transition-colors min-h-[48px]"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            expanded === item.label ? 'rotate-180' : ''
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                      <AnimatePresence>
                        {expanded === item.label && (
                          <motion.div
                            initial={shouldReduce ? {} : { height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={shouldReduce ? {} : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <ul className="pl-6 pb-2 space-y-1">
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  {child.children ? (
                                    <>
                                      <span className="block py-2 px-4 text-sm font-body font-semibold text-accent-400">
                                        {child.label}
                                      </span>
                                      <ul className="pl-4 space-y-1">
                                        {child.children.map((sub) => (
                                          <li key={sub.href}>
                                            <Link
                                              href={sub.href}
                                              onClick={onClose}
                                              className="block py-2 px-4 text-sm font-body text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center"
                                            >
                                              {sub.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </>
                                  ) : (
                                    <Link
                                      href={child.href}
                                      onClick={onClose}
                                      className="block py-2 px-4 text-sm font-body text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center"
                                    >
                                      {child.label}
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block py-3 px-4 text-lg font-body font-medium text-white hover:text-accent-400 transition-colors min-h-[48px]"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}

              {/* Defence */}
              <li className="pt-4 border-t border-white/10 mt-4">
                <Link
                  href="/defence"
                  onClick={onClose}
                  className="flex items-center gap-2 py-3 px-4 text-lg font-body font-medium text-amber-400"
                >
                  <Shield className="w-5 h-5" strokeWidth={1.5} />
                  Defence Systems
                </Link>
              </li>

              {/* Contact */}
              <li className="pt-4 space-y-3">
                <a
                  href="tel:+917349142424"
                  className="flex items-center gap-2 px-4 text-sm font-body text-white/70"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  +91 73491 42424
                </a>
                <div className="px-4">
                  <Button variant="primary" href="/contact" className="w-full" onClick={onClose}>
                    Get a Quote
                  </Button>
                </div>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
