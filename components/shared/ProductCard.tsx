'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from './Badge'
import { Button } from './Button'
import { ArrowUpRight, Box } from 'lucide-react'
import { Product3DViewer } from './Product3DViewer'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [show3D, setShow3D] = useState(false)
  const specs = Object.entries(product.keySpecs).slice(0, 2)

  return (
    <>
      <div className="group bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative overflow-hidden bg-cream-100 aspect-[4/3]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="w-4 h-4 text-accent-500" strokeWidth={2} />
            </div>
            {/* 3D View button on image hover */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShow3D(true)
              }}
              className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-950/80 backdrop-blur-sm text-white text-[11px] font-body font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-ink-950 z-10"
            >
              <Box className="w-3.5 h-3.5" strokeWidth={1.5} />
              3D View
            </button>
          </div>
        </Link>
        <div className="p-5">
          <Badge variant="primary">{product.categoryLabel}</Badge>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-heading text-lg font-bold text-text-primary mt-3 group-hover:text-accent-500 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-text-muted font-body mt-1">{product.series}</p>
          <div className="mt-3 space-y-1">
            {specs.map(([key, value]) => (
              <p key={key} className="text-sm font-body text-text-secondary">
                <span className="font-medium text-text-primary">{key}:</span> {value}
              </p>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="secondary" href={`/products/${product.slug}`} className="flex-1 text-xs h-10">
              Details
            </Button>
            <Button variant="primary" href={`/contact?product=${product.slug}`} className="flex-1 text-xs h-10">
              Get Quote
            </Button>
          </div>
        </div>
      </div>

      <Product3DViewer product={product} open={show3D} onClose={() => setShow3D(false)} />
    </>
  )
}
