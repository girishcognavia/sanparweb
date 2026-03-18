import Image from 'next/image'

const clientLogos = Array.from({ length: 44 }, (_, i) => ({
  id: i + 1,
  src: `/images/logos/logo_${i + 1}.webp`,
  alt: `Client logo ${i + 1}`,
}))

const row1 = clientLogos.slice(0, 22)
const row2 = clientLogos.slice(22)

export function TrustBar() {
  return (
    <section className="py-16 bg-cream-50 overflow-hidden">
      <div className="container-main">
        <p className="text-center text-xs font-body font-semibold uppercase tracking-wider text-text-muted mb-10">
          {'// '}Trusted by 40+ Industrial Leaders
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative group">
        <div className="flex animate-marquee-left group-hover:[animation-play-state:paused]">
          {[...row1, ...row1].map((logo, i) => (
            <div key={`r1-${i}`} className="shrink-0 mx-6 flex items-center justify-center w-[160px] h-[60px]">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative group mt-4">
        <div className="flex animate-marquee-right group-hover:[animation-play-state:paused]">
          {[...row2, ...row2].map((logo, i) => (
            <div key={`r2-${i}`} className="shrink-0 mx-6 flex items-center justify-center w-[160px] h-[60px]">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
