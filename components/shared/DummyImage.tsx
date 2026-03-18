interface DummyImageProps {
  width: number
  height: number
  label: string
  bgColor?: string
  textColor?: string
  className?: string
}

export function DummyImage({
  width,
  height,
  label,
  bgColor = '#2D3239',
  textColor = '#14B8A6',
  className = '',
}: DummyImageProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundColor: bgColor,
        aspectRatio: `${width} / ${height}`,
        width: '100%',
        maxWidth: width,
      }}
      role="img"
      aria-label={label}
    >
      <span
        className="text-xs font-body uppercase tracking-wide text-center px-4 select-none"
        style={{ color: textColor, fontVariant: 'small-caps' }}
      >
        {label}
      </span>
    </div>
  )
}
