'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  end,
  suffix = '',
  duration = 2000,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduce = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (shouldReduce) {
      setCount(end)
      return
    }

    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Two-phase easing: linear 0-80%, ease-out 80-100%
      let eased: number
      if (progress <= 0.8) {
        eased = progress / 0.8 * 0.8
      } else {
        const subProgress = (progress - 0.8) / 0.2
        eased = 0.8 + 0.2 * (1 - Math.pow(1 - subProgress, 3))
      }
      const current = Math.round(eased * end)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration, shouldReduce])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
}
