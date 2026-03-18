import Link from 'next/link'
import * as Icons from 'lucide-react'
import type { Industry } from '@/data/industries'
import { Badge } from './Badge'

interface IndustryCardProps {
  industry: Industry
}

export function IndustryCard({ industry }: IndustryCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = ((Icons as any)[industry.icon] || Icons.Factory) as React.ComponentType<{ className?: string; strokeWidth?: number }>

  const isDefence = industry.theme === 'defence'

  return (
    <Link
      href={`/industries/${industry.slug}`}
      className={`group block p-6 rounded-2xl border transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 h-full ${
        isDefence
          ? 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10'
          : 'border-border bg-white hover:border-accent-500/30'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isDefence
            ? 'bg-amber-500/15 group-hover:bg-amber-500/25'
            : 'bg-accent-500/10 group-hover:bg-accent-500 group-hover:text-white'
        }`}
      >
        <IconComponent
          className={`w-6 h-6 transition-colors duration-300 ${
            isDefence
              ? 'text-amber-500'
              : 'text-accent-500 group-hover:text-white'
          }`}
          strokeWidth={1.5}
        />
      </div>
      <h3 className="font-heading text-base font-bold text-text-primary group-hover:text-accent-500 transition-colors mt-4">
        {industry.name}
      </h3>
      <p className="text-sm text-text-secondary font-body mt-2 leading-relaxed">
        {industry.tagline}
      </p>
      {isDefence && (
        <Badge variant="gold" className="mt-3 text-[10px]">DGAQA & CEMILAC</Badge>
      )}
    </Link>
  )
}
