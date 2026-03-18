'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Button } from '@/components/shared/Button'
import { HeroVisual } from './HeroVisual'

const certs = ['ISO 9001:2015', 'AS 9100 D', 'DGAQA Approved']

export function HeroSection() {
  const shouldReduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeUp = {
    hidden: shouldReduce ? {} : { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] bg-ink-950 flex items-center overflow-hidden"
    >
      {/* ─── Noise texture ─── */}
      <div className="hero-noise" />

      {/* ─── Diagonal lines ─── */}
      <div className="diagonal-lines text-white" />

      {/* ─── Large product visual (right side) ─── */}
      <HeroVisual />

      {/* ─── Gradient overlays ─── */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-transparent z-[3] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40 z-[3] pointer-events-none" />

      {/* ─── Main Content ─── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={shouldReduce ? {} : { y: contentY, opacity: contentOpacity }}
        className="container-main relative z-10 pt-[100px] pb-40"
      >
        <div className="max-w-2xl">
          {/* Eyebrow with line */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-accent-500" />
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-400">
              Since 1994
            </span>
          </motion.div>

          {/* Headline — big, bold, editorial */}
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold text-white tracking-display leading-[0.95]"
          >
            Precision
            <br />
            Air & Thermal
            <br />
            <span className="text-gradient">Engineering</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg font-body font-light text-white/50 leading-relaxed max-w-lg"
          >
            32 years of compressed air treatment and industrial cooling — trusted
            by DRDO, HAL, and 40+ industry leaders across 14 sectors.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
            <Button variant="primary" href="/products" className="h-14 px-10 text-base group">
              Explore Products
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </Button>
            <Button variant="ghost" href="/about" className="h-14 px-10 text-base">
              Our Story
            </Button>
          </motion.div>

          {/* Cert badges — horizontal pills */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3 mt-12"
          >
            {certs.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-body font-medium text-white/40"
              >
                {cert}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Scroll indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] font-body text-white/30 tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 text-white/20 animate-bounce" strokeWidth={1.5} />
      </motion.div>
    </section>
  )
}
