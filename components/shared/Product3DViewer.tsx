'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, Maximize2, Info } from 'lucide-react'
import type { Product } from '@/data/products'

interface Product3DViewerProps {
  product: Product
  open: boolean
  onClose: () => void
}

const categoryHotspots: Record<string, { x: number; y: number; label: string; detail: string }[]> = {
  'compressed-air': [
    { x: 30, y: 35, label: 'Heat Exchanger', detail: 'Brazed aluminum core for maximum thermal transfer efficiency' },
    { x: 65, y: 50, label: 'Separator Unit', detail: 'Centrifugal moisture separation before drying stage' },
    { x: 50, y: 78, label: 'Auto Drain', detail: 'Electronic zero-loss condensate discharge system' },
  ],
  'industrial-cooling': [
    { x: 35, y: 30, label: 'Compressor', detail: 'Hermetic scroll compressor — reliable, low vibration' },
    { x: 65, y: 45, label: 'Condenser', detail: 'Air/water cooled heat rejection system' },
    { x: 45, y: 75, label: 'Controls', detail: 'PLC-based precision temperature regulation ±0.5°C' },
  ],
  'air-conditioning': [
    { x: 30, y: 40, label: 'Evaporator', detail: 'High-efficiency cooling coil for precision environments' },
    { x: 60, y: 35, label: 'Air Handler', detail: 'Variable speed blower — uniform airflow distribution' },
    { x: 50, y: 70, label: 'Humidity Control', detail: 'Integrated dehumidification down to 5% RH' },
  ],
  'medical': [
    { x: 35, y: 35, label: 'Desiccant Bed', detail: 'Medical-grade molecular sieve for sterile drying' },
    { x: 60, y: 50, label: 'Filter Bank', detail: 'Multi-stage HEPA filtration for hospital air' },
    { x: 45, y: 75, label: 'Monitoring', detail: 'Real-time dew point display with alarm outputs' },
  ],
}

export function Product3DViewer({ product, open, onClose }: Product3DViewerProps) {
  const [zoom, setZoom] = useState(1)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const [showHotspots, setShowHotspots] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const rafId = useRef(0)

  // Framer Motion springs for ultra-smooth movement
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  // Derive tilt from mouse position — subtle and smooth
  const rotateY = useTransform(x, [-1, 1], [-12, 12])
  const rotateX = useTransform(y, [-1, 1], [8, -8])

  // Floating shadow transforms
  const shadowX = useTransform(x, [-1, 1], [15, -15])
  const shadowBlur = useTransform(y, [-1, 1], [40, 60])

  // Spotlight position
  const spotlightX = useTransform(x, [-1, 1], [35, 65])
  const spotlightY = useTransform(y, [-1, 1], [30, 60])

  const hotspots = categoryHotspots[product.category] || categoryHotspots['compressed-air']

  // Reset on open/close
  useEffect(() => {
    if (open) {
      setZoom(1)
      setActiveHotspot(null)
      setImageLoaded(false)
      setShowHotspots(true)
      x.set(0)
      y.set(0)
    }
  }, [open, x, y])

  // Escape key
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Smooth zoom with scroll
  useEffect(() => {
    if (!open) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setZoom((prev) => {
        const delta = e.deltaY > 0 ? -0.08 : 0.08
        return Math.min(3.5, Math.max(0.6, prev + delta))
      })
    }
    const el = containerRef.current
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false })
      return () => el.removeEventListener('wheel', handleWheel)
    }
  }, [open])

  // RAF-throttled mouse tracking (like old site's HeroVisual)
  const updateMouse = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const nx = ((mouseX.current - rect.left) / rect.width) * 2 - 1
    const ny = ((mouseY.current - rect.top) / rect.height) * 2 - 1
    x.set(Math.max(-1, Math.min(1, nx)))
    y.set(Math.max(-1, Math.min(1, ny)))
  }, [x, y])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(updateMouse)
    },
    [updateMouse]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  // Derived motion values (must be before early return)
  const spotlightLeft = useTransform(spotlightX, (v) => `${v}%`)
  const spotlightTop = useTransform(spotlightY, (v) => `${v}%`)
  const shadowFilter = useTransform(shadowBlur, (v) => `blur(${v}px)`)

  if (!open) return null

  const specs = Object.entries(product.keySpecs)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#08090b]" />

          {/* Top Bar */}
          <motion.div
            className="relative flex items-center justify-between px-5 py-3 border-b border-white/[0.05] shrink-0"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center">
                <span className="font-heading text-xs font-bold text-accent-500">3D</span>
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-white">{product.name}</h3>
                <p className="font-body text-[10px] text-white/25">{product.series}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowHotspots(!showHotspots)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-body font-medium transition-all ${
                  showHotspots ? 'bg-accent-500/12 text-accent-500' : 'text-white/30 hover:text-white/50'
                }`}
              >
                <Info className="w-3 h-3" strokeWidth={1.5} />
                Labels
              </button>

              <div className="w-px h-5 bg-white/[0.05] mx-1" />

              <button onClick={() => setZoom((p) => Math.max(0.6, p - 0.2))}
                className="w-7 h-7 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-colors">
                <ZoomOut className="w-3 h-3" strokeWidth={1.5} />
              </button>
              <span className="w-10 text-center text-[10px] font-body font-medium text-white/30 tabular-nums">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((p) => Math.min(3.5, p + 0.2))}
                className="w-7 h-7 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-colors">
                <ZoomIn className="w-3 h-3" strokeWidth={1.5} />
              </button>

              <div className="w-px h-5 bg-white/[0.05] mx-1" />

              <button onClick={() => { setZoom(1); x.set(0); y.set(0); setActiveHotspot(null) }}
                className="w-7 h-7 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-colors">
                <Maximize2 className="w-3 h-3" strokeWidth={1.5} />
              </button>

              <button onClick={onClose}
                className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors ml-1">
                <X className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>

          {/* Main */}
          <div className="relative flex flex-1 min-h-0">
            {/* Viewer */}
            <div
              ref={containerRef}
              className="flex-1 relative overflow-hidden cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dynamic spotlight that follows mouse */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: spotlightLeft,
                  top: spotlightTop,
                  width: 500,
                  height: 500,
                  x: '-50%',
                  y: '-50%',
                  background: 'radial-gradient(circle, rgba(255,92,40,0.04) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* Subtle floor */}
              <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.008) 0%, transparent 100%)' }}
              />
              <div className="absolute bottom-[18%] left-[15%] right-[15%] h-px bg-white/[0.03]" />

              {/* The product */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  style={{
                    width: '55%',
                    maxWidth: 580,
                    aspectRatio: '4 / 3',
                    rotateX,
                    rotateY,
                    scale: zoom,
                    transformPerspective: 1200,
                  }}
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: zoom, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Floating shadow */}
                  <motion.div
                    className="absolute -bottom-6 left-[12%] right-[12%] h-10 pointer-events-none"
                    style={{
                      x: shadowX,
                      filter: shadowFilter,
                      background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)',
                      opacity: Math.max(0.2, 0.6 / zoom),
                    }}
                  />

                  {/* Product image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-contain transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{ filter: 'drop-shadow(0 8px 30px rgba(0,0,0,0.3))' }}
                    sizes="580px"
                    priority
                    onLoad={() => setImageLoaded(true)}
                  />

                  {/* Loading */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-white/[0.06] border-t-accent-500/60 animate-spin" />
                    </div>
                  )}

                  {/* Hotspots */}
                  {showHotspots && imageLoaded && hotspots.map((spot, i) => (
                    <motion.div
                      key={i}
                      className="absolute z-20"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {/* Ping */}
                      <span className="absolute -inset-2 rounded-full bg-accent-500/15 animate-ping" style={{ animationDuration: '2.5s' }} />

                      {/* Dot */}
                      <button
                        onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                        className={`relative w-5 h-5 -ml-2.5 -mt-2.5 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-200 ${
                          activeHotspot === i
                            ? 'bg-accent-500 border-accent-500 shadow-[0_0_12px_rgba(255,92,40,0.4)] scale-125'
                            : 'bg-[#08090b]/70 border-white/25 hover:border-accent-500 hover:scale-125 backdrop-blur-sm'
                        }`}
                      >
                        <span className={`text-[8px] font-heading font-bold leading-none ${activeHotspot === i ? 'text-white' : 'text-white/60'}`}>
                          {i + 1}
                        </span>
                      </button>

                      {/* Label tooltip */}
                      <AnimatePresence>
                        {activeHotspot === i && (
                          <motion.div
                            className="absolute z-30 w-52"
                            style={{
                              left: spot.x > 50 ? 'auto' : '20px',
                              right: spot.x > 50 ? '20px' : 'auto',
                              top: '-8px',
                            }}
                            initial={{ opacity: 0, x: spot.x > 50 ? 10 : -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: spot.x > 50 ? 10 : -10 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          >
                            <div className="p-3 rounded-xl bg-[#14161a] border border-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                              <p className="font-heading text-xs font-bold text-white">{spot.label}</p>
                              <p className="font-body text-[10px] text-white/35 mt-1 leading-relaxed">{spot.detail}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Bottom hint */}
              <motion.div
                className="absolute bottom-3 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <span className="text-[9px] font-body text-white/15 tracking-wider uppercase">
                  Move mouse to inspect · Scroll to zoom
                </span>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              className="hidden lg:flex flex-col w-[280px] border-l border-white/[0.04] bg-[#0c0d10]"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-5 border-b border-white/[0.04]">
                <span className="text-[9px] font-body font-bold text-accent-500/60 uppercase tracking-widest">
                  {product.categoryLabel}
                </span>
                <h4 className="font-heading text-base font-bold text-white mt-2 leading-snug">{product.name}</h4>
                <p className="font-body text-[11px] text-white/25 mt-2 leading-relaxed">{product.shortDesc}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <p className="text-[8px] font-body font-bold text-white/15 uppercase tracking-[0.15em] mb-3">Specifications</p>
                <div className="space-y-2.5">
                  {specs.map(([key, value]) => (
                    <div key={key} className="pb-2.5 border-b border-white/[0.03]">
                      <p className="text-[10px] font-body text-white/20">{key}</p>
                      <p className="text-[11px] font-body font-medium text-white/55 mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                {showHotspots && (
                  <>
                    <p className="text-[8px] font-body font-bold text-white/15 uppercase tracking-[0.15em] mt-5 mb-2">Components</p>
                    {hotspots.map((spot, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all mb-0.5 ${
                          activeHotspot === i ? 'bg-accent-500/8' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 ${
                          activeHotspot === i ? 'bg-accent-500 text-white' : 'bg-white/[0.04] text-white/25'
                        }`}>{i + 1}</span>
                        <span className={`text-[10px] font-body ${activeHotspot === i ? 'text-accent-500 font-medium' : 'text-white/35'}`}>
                          {spot.label}
                        </span>
                      </button>
                    ))}
                  </>
                )}

                {product.applications.length > 0 && (
                  <>
                    <p className="text-[8px] font-body font-bold text-white/15 uppercase tracking-[0.15em] mt-5 mb-2">Applications</p>
                    <div className="flex flex-wrap gap-1">
                      {product.applications.map((app) => (
                        <span key={app} className="px-1.5 py-0.5 rounded bg-white/[0.02] text-[9px] font-body text-white/25">{app}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 border-t border-white/[0.04] space-y-1.5">
                <a href={`/contact?product=${product.slug}`}
                  className="flex items-center justify-center w-full h-8 rounded-full bg-accent-500 hover:bg-accent-600 text-white text-[11px] font-body font-semibold transition-colors">
                  Request Quote
                </a>
                <a href={`/products/${product.slug}`}
                  className="flex items-center justify-center w-full h-8 rounded-full bg-white/[0.03] hover:bg-white/[0.06] text-white/40 text-[11px] font-body font-medium transition-colors">
                  Full Details
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
