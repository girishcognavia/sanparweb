'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { products, type ProductCategory, categoryLabels } from '@/data/products'
import { ArrowRight, SlidersHorizontal } from 'lucide-react'

/* ── floating hero products ─────────────────────── */
const heroProducts = [
  { image: '/images/products/ecodrair.webp', name: 'ECODRAIR', x: 5, y: 15, w: 180, rotate: -6, delay: 0 },
  { image: '/images/products/xeros.png', name: 'XEROS', x: 28, y: 5, w: 160, rotate: 4, delay: 0.15 },
  { image: '/images/products/precision-ac.webp', name: 'Precision AC', x: 55, y: 20, w: 200, rotate: -3, delay: 0.3 },
  { image: '/images/products/water-chiller.webp', name: 'Water Chiller', x: 78, y: 8, w: 170, rotate: 5, delay: 0.45 },
  { image: '/images/products/adsorption-dryer.webp', name: 'Adsorption Dryer', x: 15, y: 55, w: 150, rotate: 3, delay: 0.6 },
  { image: '/images/products/air-chiller.webp', name: 'Air Chiller', x: 42, y: 50, w: 190, rotate: -5, delay: 0.75 },
  { image: '/images/products/cat-dth.webp', name: 'CAT DTH', x: 72, y: 55, w: 160, rotate: 2, delay: 0.9 },
  { image: '/images/products/dehumidifier.webp', name: 'Dehumidifier', x: 90, y: 40, w: 140, rotate: -4, delay: 1.05 },
]

const filters: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'All Products', value: 'all' },
  { label: 'Compressed Air Treatment', value: 'compressed-air' },
  { label: 'Industrial Cooling', value: 'industrial-cooling' },
  { label: 'Air Conditioning', value: 'air-conditioning' },
  { label: 'Medical Dryers', value: 'medical' },
]

/* ── animated counter ─────────────────────── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 2000
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function ProductsPage() {
  const [active, setActive] = useState<ProductCategory | 'all'>('all')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const shouldReduce = useReducedMotion()

  const filtered = active === 'all'
    ? products
    : products.filter((p) => p.category === active)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }

  return (
    <div className="pt-[72px]">
      {/* ═══ HERO — Floating Product Collage ═══ */}
      <section
        className="relative min-h-[85vh] flex items-center overflow-hidden bg-ink-950"
        onMouseMove={handleMouseMove}
      >
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />

        {/* Floating product images */}
        <div className="absolute inset-0 pointer-events-none">
          {heroProducts.map((product, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${product.x}%`,
                top: `${product.y}%`,
                width: product.w,
              }}
              initial={{ opacity: 0, y: 60, scale: 0.7, rotate: product.rotate * 2 }}
              animate={{
                opacity: 0.15,
                y: 0,
                scale: 1,
                rotate: product.rotate,
                x: mousePos.x * (15 + i * 5),
                translateY: mousePos.y * (10 + i * 4),
              }}
              transition={{
                opacity: { duration: 1, delay: product.delay },
                y: { duration: 1, delay: product.delay },
                scale: { duration: 1, delay: product.delay },
                rotate: { duration: 1, delay: product.delay },
                x: { duration: 0.4, ease: 'easeOut' },
                translateY: { duration: 0.4, ease: 'easeOut' },
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={product.w}
                height={product.w}
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          ))}
        </div>

        {/* Hero content */}
        <div className="container-main relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-6"
            >
              <SlidersHorizontal className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-body font-medium text-accent-500">200+ Products & Variants</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
            >
              Precision-Engineered
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-orange-400">
                Thermal Systems
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl font-body text-gray-400 max-w-xl leading-relaxed"
            >
              From compressed air treatment to industrial cooling — engineered for
              every industrial application across 14 sectors.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex gap-8 mt-10"
            >
              {[
                { value: 15, suffix: '+', label: 'Product Lines' },
                { value: 200, suffix: '+', label: 'Variants' },
                { value: 14, suffix: '', label: 'Industries Served' },
                { value: 32, suffix: ' yrs', label: 'Engineering Excellence' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm font-body text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />
      </section>

      {/* ═══ CATEGORY OVERVIEW CARDS ═══ */}
      <section className="py-16 bg-surface">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.entries(categoryLabels) as [ProductCategory, string][]).map(([key, label], i) => {
              const count = products.filter(p => p.category === key).length
              const images: Record<ProductCategory, string> = {
                'compressed-air': '/images/products/ecodrair.webp',
                'industrial-cooling': '/images/products/water-chiller.webp',
                'air-conditioning': '/images/products/precision-ac.webp',
                'medical': '/images/products/cat-dth.webp',
              }
              return (
                <motion.button
                  key={key}
                  onClick={() => {
                    setActive(key)
                    document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`relative group overflow-hidden rounded-2xl bg-white border-2 p-5 text-left transition-all duration-300 ${
                    active === key ? 'border-accent-500 shadow-lg' : 'border-transparent shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="relative w-full aspect-[4/3] mb-4">
                    <Image
                      src={images[key]}
                      alt={label}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="font-heading text-sm md:text-base font-bold text-text-primary leading-tight">{label}</h3>
                  <p className="text-xs font-body text-text-muted mt-1">{count} products</p>
                  {active === key && (
                    <motion.div
                      layoutId="activeCat"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-accent-500"
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ STICKY FILTER BAR ═══ */}
      <div id="products-grid" className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-border/50 py-4">
        <div className="container-main">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all duration-300 ${
                  active === f.value
                    ? 'bg-ink-950 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
                {active === f.value && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-accent-500 text-white">
                    {f.value === 'all' ? products.length : products.filter(p => p.category === f.value).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ PRODUCT GRID ═══ */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="container-main">
          {/* Results count */}
          <motion.p
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-body text-text-muted mb-8"
          >
            Showing <span className="font-semibold text-text-primary">{filtered.length}</span> products
            {active !== 'all' && (
              <> in <span className="font-semibold text-accent-500">{categoryLabels[active as ProductCategory]}</span></>
            )}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout={!shouldReduce}
                  initial={shouldReduce ? {} : { opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white aspect-square p-6">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Category badge on hover */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ink-950/80 backdrop-blur-sm text-[10px] font-body font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {product.categoryLabel}
                      </div>
                      {/* Orange line reveal */}
                      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-accent-500 to-orange-400 group-hover:w-full transition-all duration-500" />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <p className="text-[11px] font-body font-semibold text-accent-500 uppercase tracking-wider">
                        {product.series}
                      </p>
                      <h3 className="font-heading text-base font-bold text-text-primary mt-1 group-hover:text-accent-500 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm font-body text-text-muted mt-2 line-clamp-2">
                        {product.shortDesc}
                      </p>

                      {/* Key spec chips */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {Object.entries(product.keySpecs).slice(0, 2).map(([key, value]) => (
                          <span
                            key={key}
                            className="inline-flex px-2 py-0.5 rounded-md bg-surface text-[11px] font-body text-text-secondary"
                          >
                            {key}: {value}
                          </span>
                        ))}
                      </div>

                      {/* View arrow */}
                      <div className="flex items-center gap-1.5 mt-4 text-sm font-body font-semibold text-accent-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                        View Details <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg font-heading font-bold text-text-primary">No products found</p>
              <p className="text-sm font-body text-text-muted mt-2">Try selecting a different category.</p>
              <button
                onClick={() => setActive('all')}
                className="mt-4 px-6 py-2.5 rounded-full bg-accent-500 text-white text-sm font-body font-medium hover:bg-accent-600 transition-colors"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-16 bg-ink-950">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
              Not sure which product fits your application?
            </h2>
            <p className="mt-3 text-base font-body text-gray-400 max-w-xl mx-auto">
              Our application engineers will recommend the right system for your specific requirements.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-accent-500 text-white font-body text-sm font-semibold hover:bg-accent-600 transition-colors"
              >
                Talk to an Engineer <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-white/10 border border-white/20 text-white font-body text-sm font-semibold hover:bg-white/20 transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
