import Link from 'next/link'
import Image from 'next/image'
import { Badge } from './Badge'
import type { CaseStudy } from '@/data/caseStudies'

interface CaseStudyCardProps {
  study: CaseStudy
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group block bg-white rounded-lg border border-border overflow-hidden hover:border-l-2 hover:border-l-accent-500 hover:shadow-card-hover transition-all"
    >
      <div className="relative aspect-[16/9] bg-surface">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="primary">{study.industry}</Badge>
          {study.services.map((s) => (
            <Badge key={s} variant="outline">{s}</Badge>
          ))}
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-heading text-2xl md:text-3xl font-bold text-accent-500">
            {study.result.metric}
          </span>
          <span className="text-sm font-body text-text-secondary">{study.result.label}</span>
        </div>
        <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent-500 transition-colors">
          {study.title}
        </h3>
        <p className="text-sm font-body text-text-secondary mt-2 line-clamp-2">{study.teaser}</p>
        <span className="inline-block mt-4 text-sm font-body font-semibold text-accent-500 group-hover:underline">
          Read Case Study &rarr;
        </span>
      </div>
    </Link>
  )
}
