interface MetricCardProps {
  metric?: string
  value?: string
  label: string
  dark?: boolean
  className?: string
}

export function MetricCard({ metric, value, label, dark, className = '' }: MetricCardProps) {
  const display = value ?? metric ?? ''
  return (
    <div className={`text-center p-6 rounded-xl ${dark ? 'bg-ink-800 border border-ink-700' : ''} ${className}`}>
      <span className="font-heading text-3xl md:text-4xl font-bold text-accent-500">
        {display}
      </span>
      <p className={`font-body text-sm mt-2 ${dark ? 'text-text-muted' : 'text-text-secondary'}`}>{label}</p>
    </div>
  )
}
