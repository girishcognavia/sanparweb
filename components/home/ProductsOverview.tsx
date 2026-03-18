import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const categories = [
  {
    name: 'Compressed Air Treatment',
    desc: 'ECODRAIR, XEROS, Adsorption Dryers, Filters, Aftercoolers and more',
    href: '/products?category=compressed-air',
    image: '/images/products/ecodrair.webp',
    count: '7 products',
  },
  {
    name: 'Industrial Cooling Systems',
    desc: 'Air, Water, Coolant and Oil Chillers for process temperature control',
    href: '/products?category=industrial-cooling',
    image: '/images/products/water-chiller.webp',
    count: '4 products',
  },
  {
    name: 'Industrial Air Conditioning',
    desc: 'Precision Air Conditioners and Dehumidifiers for controlled environments',
    href: '/products?category=air-conditioning',
    image: '/images/products/precision-ac.webp',
    count: '2 products',
  },
  {
    name: 'Medical Desiccant Dryers',
    desc: 'CAT DTH and CAT M1 Series for hospital-grade sterile air',
    href: '/products?category=medical',
    image: '/images/products/medical-dryer.webp',
    count: '2 products',
  },
]

export function ProductsOverview() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-main">
        <SectionHeader
          eyebrow="Our Solutions"
          heading="Engineering Precision for Every Industry"
          subtext="15 products across 4 categories — built for reliability, efficiency, and Indian conditions."
        />

        {/* Bento-style grid: first item large, rest in row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Featured large card */}
          <ScrollReveal direction="left">
            <Link
              href={categories[0].href}
              className="group relative flex flex-col bg-white rounded-3xl border border-border overflow-hidden transition-all duration-300 hover:shadow-card-lift h-full"
            >
              <div className="relative overflow-hidden bg-cream-100 aspect-[4/3]">
                <Image
                  src={categories[0].image}
                  alt={categories[0].name}
                  fill
                  className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12">
                  <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <span className="text-[11px] font-body font-semibold text-accent-500 uppercase tracking-wider">
                  {categories[0].count}
                </span>
                <h3 className="font-heading text-xl font-bold text-text-primary mt-2">
                  {categories[0].name}
                </h3>
                <p className="font-body text-base text-text-secondary mt-2 flex-1 font-light">
                  {categories[0].desc}
                </p>
              </div>
            </Link>
          </ScrollReveal>

          {/* Right column — stacked cards */}
          <div className="grid grid-cols-1 gap-5">
            {categories.slice(1).map((cat, i) => (
              <ScrollReveal key={cat.name} delay={(i + 1) * 0.1} direction="right">
                <Link
                  href={cat.href}
                  className="group flex items-center gap-5 bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-card-hover p-4"
                >
                  <div className="relative shrink-0 w-28 h-28 rounded-xl bg-cream-100 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      sizes="112px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-body font-semibold text-accent-500 uppercase tracking-wider">
                      {cat.count}
                    </span>
                    <h3 className="font-heading text-base font-bold text-text-primary mt-1 group-hover:text-accent-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="font-body text-sm text-text-secondary mt-1 line-clamp-2 font-light">
                      {cat.desc}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-text-muted shrink-0 group-hover:text-accent-500 transition-colors" strokeWidth={1.5} />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <p className="text-center mt-12 text-sm font-body text-text-secondary">
          Not sure which product you need?{' '}
          <Link href="/contact" className="text-accent-500 font-semibold hover:underline">
            Talk to an Application Engineer
          </Link>
        </p>
      </div>
    </section>
  )
}
