'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, Rocket, Factory, Globe, Award, Cpu, Shield, Zap, Building2 } from 'lucide-react'
import { timeline } from '@/data/company'

/* ── era icons ─────────────────────── */
const eraIcons: Record<string, React.ReactNode> = {
  '1994': <Rocket className="w-5 h-5" />,
  '1995–1997': <Building2 className="w-5 h-5" />,
  '1998–2000': <Zap className="w-5 h-5" />,
  '2004': <Globe className="w-5 h-5" />,
  '2006–2009': <Factory className="w-5 h-5" />,
  '2010': <Cpu className="w-5 h-5" />,
  '2015–2016': <Award className="w-5 h-5" />,
  '2017–2020': <Shield className="w-5 h-5" />,
  '2024': <Building2 className="w-5 h-5" />,
  '2025': <Rocket className="w-5 h-5" />,
}

/* ── era background colors ─────────────────────── */
const eraColors = [
  'from-orange-600/10 to-amber-600/5',
  'from-blue-600/10 to-indigo-600/5',
  'from-emerald-600/10 to-teal-600/5',
  'from-purple-600/10 to-violet-600/5',
  'from-rose-600/10 to-pink-600/5',
  'from-cyan-600/10 to-sky-600/5',
  'from-amber-600/10 to-yellow-600/5',
  'from-indigo-600/10 to-blue-600/5',
  'from-teal-600/10 to-emerald-600/5',
  'from-orange-600/10 to-red-600/5',
]

export function InteractiveTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isManualScrolling = useRef(false)

  const yearDisplay = timeline[activeIndex]?.year || '1994'

  /* ── Scroll-driven activation ── */
  /* Finds the card whose TOP edge is closest to 35% of viewport height.       */
  /* No height animations on cards = no layout shifts = no feedback loop.       */
  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (isManualScrolling.current) return

        const targetY = window.innerHeight * 0.35
        let closestIndex = 0
        let closestDistance = Infinity

        cardRefs.current.forEach((card, index) => {
          if (!card) return
          const rect = card.getBoundingClientRect()
          const cardTop = rect.top
          const distance = Math.abs(cardTop - targetY)
          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        })

        setActiveIndex((prev) => {
          if (prev !== closestIndex) return closestIndex
          return prev
        })
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── auto-play mode ─────────────────────── */
  const startAutoPlay = useCallback(() => {
    setIsAutoPlaying(true)
    setActiveIndex(0)
    isManualScrolling.current = true

    let current = 0
    cardRefs.current[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    autoPlayTimerRef.current = setInterval(() => {
      current++
      if (current >= timeline.length) {
        if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
        setIsAutoPlaying(false)
        isManualScrolling.current = false
        return
      }
      setActiveIndex(current)
      cardRefs.current[current]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 3000)
  }, [])

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
    setIsAutoPlaying(false)
    isManualScrolling.current = false
  }, [])

  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
    }
  }, [])

  /* ── click to jump ─────────────────────── */
  const jumpToEra = (index: number) => {
    stopAutoPlay()
    setActiveIndex(index)
    isManualScrolling.current = true
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => {
      isManualScrolling.current = false
    }, 800)
  }

  return (
    <section ref={sectionRef} id="timeline" className="relative bg-ink-950 overflow-x-clip">
      {/* ── Background animated gradient ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className={`absolute inset-0 bg-gradient-to-br ${eraColors[activeIndex % eraColors.length]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* ── Dot grid pattern ── */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      {/* ── STICKY HEADER with year counter + mini nav ── */}
      <div className="sticky top-[72px] z-30 backdrop-blur-xl bg-ink-950/80 border-b border-white/5">
        <div className="container-main py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left — year counter */}
            <div className="flex items-center gap-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={yearDisplay}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-3xl md:text-4xl font-black text-white tabular-nums"
                >
                  {yearDisplay}
                </motion.span>
              </AnimatePresence>
              <div className="hidden sm:block">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeIndex}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-body font-semibold text-accent-500"
                  >
                    {timeline[activeIndex]?.title}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Right — controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => activeIndex > 0 && jumpToEra(activeIndex - 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  activeIndex > 0
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
                disabled={activeIndex === 0}
                aria-label="Previous era"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => activeIndex < timeline.length - 1 && jumpToEra(activeIndex + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  activeIndex < timeline.length - 1
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
                disabled={activeIndex === timeline.length - 1}
                aria-label="Next era"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={isAutoPlaying ? stopAutoPlay : startAutoPlay}
                className={`px-4 py-2 rounded-full text-xs font-body font-semibold transition-all ml-1 ${
                  isAutoPlaying
                    ? 'bg-accent-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {isAutoPlaying ? '⏸ Pause' : '▶ Play Journey'}
              </button>
            </div>
          </div>

          {/* ── Progress bar ── */}
          <div className="relative h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-orange-400 rounded-full"
              animate={{ width: `${((activeIndex + 1) / timeline.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* ── Mini dot nav ── */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto scrollbar-hide pb-1">
            {timeline.map((era, i) => (
              <button
                key={era.year}
                onClick={() => jumpToEra(i)}
                className="group flex items-center gap-1.5 flex-shrink-0"
                title={`${era.year} — ${era.title}`}
              >
                <div className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  i === activeIndex
                    ? 'bg-accent-500 text-white scale-110'
                    : i < activeIndex
                      ? 'bg-accent-500/30 text-accent-500'
                      : 'bg-white/10 text-white/30 hover:bg-white/20 hover:text-white/60'
                }`}>
                  {eraIcons[era.year] || <div className="w-2 h-2 rounded-full bg-current" />}
                  {i === activeIndex && (
                    <motion.div
                      layoutId="activeEra"
                      className="absolute inset-0 rounded-full ring-2 ring-accent-500 ring-offset-2 ring-offset-ink-950"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
                <span className={`hidden lg:block text-[10px] font-body whitespace-nowrap transition-colors ${
                  i === activeIndex ? 'text-white font-semibold' : 'text-white/30'
                }`}>
                  {era.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIMELINE CARDS ── */}
      {/* ALL events always rendered (no accordion). Only visual styling changes. */}
      {/* This prevents layout shifts that cause scroll glitches.                  */}
      <div className="container-main py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {timeline.map((era, i) => {
            const isActive = i === activeIndex
            const isPast = i < activeIndex

            return (
              <div
                key={era.year}
                ref={(el) => { cardRefs.current[i] = el }}
                className="relative"
              >
                {/* Connection line to next card */}
                {i < timeline.length - 1 && (
                  <div className={`absolute left-1/2 -translate-x-px bottom-0 translate-y-full w-0.5 h-6 transition-colors duration-500 ${
                    isPast ? 'bg-accent-500/40' : 'bg-white/10'
                  }`} />
                )}

                <div
                  onClick={() => jumpToEra(i)}
                  className={`relative rounded-2xl cursor-pointer transition-all duration-500 ${
                    isActive
                      ? 'bg-white/[0.08] border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(234,88,12,0.15)]'
                      : isPast
                        ? 'bg-white/[0.04] border border-white/10 hover:bg-white/[0.06]'
                        : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Active glow top bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 rounded-t-2xl transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} />

                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      {/* Era icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                          : isPast
                            ? 'bg-accent-500/20 text-accent-500'
                            : 'bg-white/10 text-white/30'
                      }`}>
                        {eraIcons[era.year] || <div className="w-3 h-3 rounded-full bg-current" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Year + Title */}
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className={`font-heading text-2xl md:text-3xl font-black transition-colors duration-500 ${
                            isActive ? 'text-accent-500' : isPast ? 'text-accent-500/60' : 'text-white/20'
                          }`}>
                            {era.year}
                          </span>
                          <h3 className={`font-heading text-lg font-bold transition-colors duration-500 ${
                            isActive ? 'text-white' : isPast ? 'text-white/70' : 'text-white/30'
                          }`}>
                            {era.title}
                          </h3>
                        </div>

                        {/* Events — ALWAYS rendered, only opacity/color changes */}
                        <ul className="mt-4 space-y-2.5">
                          {era.events.map((event, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-3"
                            >
                              <span className={`flex-shrink-0 mt-1.5 w-2 h-2 rounded-full transition-colors duration-500 ${
                                isActive ? 'bg-accent-500' : isPast ? 'bg-accent-500/30' : 'bg-white/10'
                              }`} />
                              <span className={`text-sm md:text-base font-body leading-relaxed transition-colors duration-500 ${
                                isActive ? 'text-white/80' : isPast ? 'text-white/35' : 'text-white/15'
                              }`}>
                                {event}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Bottom summary ── */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 px-8 py-5 rounded-2xl bg-white/[0.05] border border-white/10">
            {[
              { value: '30+', label: 'Years' },
              { value: '200+', label: 'Products' },
              { value: '14', label: 'Industries' },
              { value: '40+', label: 'Clients' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-xl md:text-2xl font-black text-accent-500">{stat.value}</div>
                <div className="text-[10px] font-body text-white/40 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-body text-white/40 max-w-md mx-auto">
            From a single compressed air dryer in 1994 to defence-grade aerospace systems —
            the SANPAR journey continues.
          </p>
        </div>
      </div>
    </section>
  )
}
