import { forwardRef, ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  loading?: boolean
  href?: string
  icon?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-500 text-white border-transparent hover:bg-accent-600 hover:shadow-glow active:scale-[0.97]',
  secondary:
    'bg-transparent text-text-primary border-ink-700 hover:border-accent-500 hover:text-accent-500 active:scale-[0.97]',
  ghost:
    'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40 active:scale-[0.97]',
  destructive:
    'bg-error-light text-error border-transparent hover:bg-error hover:text-white active:scale-[0.97]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', loading, disabled, href, icon, children, className = '', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold px-7 h-12 border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500'
    const disabledStyles = 'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none'

    const classes = `${base} ${variantStyles[variant]} ${disabledStyles} ${className}`

    if (href && !disabled) {
      return (
        <Link href={href} className={classes}>
          {icon}
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {icon}
        {children}
        {loading && '...'}
      </button>
    )
  }
)

Button.displayName = 'Button'
