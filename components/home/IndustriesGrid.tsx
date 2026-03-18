'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { industries } from '@/data/industries'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const featured = industries.filter((ind) => ind.image)

export function IndustriesGrid() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-500 mb-3 block">
                {'// '}14 Industries
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary tracking-tight leading-tight">
                Where Precision
                <br />
                <span className="text-gradient">Meets Application</span>
              </h2>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-950 text-white text-sm font-body font-semibold hover:bg-ink-800 transition-colors shrink-0"
            >
              All Industries <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll carousel */}
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-industries group-hover:[animation-play-state:paused] cursor-grab">
          {[...featured, ...featured].map((ind, i) => (
            <Link
              key={`ind-${i}`}
              href={`/industries/${ind.slug}`}
              className="relative shrink-0 w-[280px] sm:w-[340px] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden mx-2 group/card"
            >
              <Image
                src={ind.image!}
                alt={ind.name}
                fill
                className="object-cover group-hover/card:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 400px"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />

              {/* Arrow icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2} />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-lg font-bold text-white">
                  {ind.name}
                </h3>
                <p className="font-body text-xs text-white/50 mt-1 line-clamp-1">
                  {ind.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
