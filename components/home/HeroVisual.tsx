'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {/* Large product system image — right side with glow */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[-5%] top-[10%] w-[700px] h-[600px] lg:w-[900px] lg:h-[700px]"
        style={shouldReduce ? {} : { y: imageY, scale: imageScale }}
      >
        <Image
          src="/images/hero/hero-system.webp"
          alt="SANPAR Industrial System"
          fill
          className="object-contain"
          sizes="900px"
          priority
        />
        {/* Glow underneath */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-accent-500/10 blur-[80px] rounded-full" />
      </motion.div>
    </div>
  )
}
