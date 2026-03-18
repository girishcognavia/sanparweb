export type BadgeVariant = 'primary' | 'teal' | 'gold' | 'outline'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-accent-500/10 text-accent-600 border-accent-500/20',
  teal: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  gold: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  outline: 'bg-transparent text-text-muted border-border',
}

export function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3.5 py-1 text-[11px] font-body font-semibold uppercase tracking-wider border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
