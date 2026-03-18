import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center pt-[72px]">
      <div className="text-center px-4">
        <h1 className="font-heading text-[120px] md:text-[160px] font-bold text-accent-500/20 leading-none">
          404
        </h1>
        <h2 className="font-heading text-2xl font-bold text-white mt-4">
          Page not found.
        </h2>
        <p className="text-base font-body text-text-muted mt-3 max-w-md mx-auto">
          The page you&apos;re looking for has moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link href="/" className="text-sm font-body font-semibold text-accent-500 hover:underline">Home</Link>
          <Link href="/products" className="text-sm font-body font-semibold text-accent-500 hover:underline">Products</Link>
          <Link href="/contact" className="text-sm font-body font-semibold text-accent-500 hover:underline">Contact Us</Link>
        </div>
        <p className="text-xs font-body text-text-muted mt-6">Use cmd+K to search the site</p>
      </div>
    </div>
  )
}
