interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-border/50 rounded-lg ${className}`} />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <Skeleton className="w-full aspect-[4/3]" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-3 mt-4">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function IndustryCardSkeleton() {
  return (
    <div className="p-5 rounded-xl border border-border">
      <div className="flex items-start gap-3">
        <Skeleton className="w-11 h-11 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  )
}
