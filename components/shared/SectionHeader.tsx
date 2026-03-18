interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  subtext?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeader({
  eyebrow,
  heading,
  subtext,
  align = 'center',
  dark = false,
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-3xl mb-14 md:mb-20 ${alignment}`}>
      {eyebrow && (
        <span className={`inline-block font-body text-xs font-semibold uppercase tracking-wider ${dark ? 'text-accent-400' : 'text-accent-500'} mb-4`}>
          {'// '}{eyebrow}
        </span>
      )}
      <h2
        className={`font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight ${
          dark ? 'text-white' : 'text-text-primary'
        }`}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          className={`mt-5 text-md font-body font-light leading-relaxed ${
            dark ? 'text-white/50' : 'text-text-secondary'
          }`}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}
