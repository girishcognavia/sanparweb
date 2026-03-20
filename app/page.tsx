import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { organizationJsonLd } from '@/lib/metadata'

// Lazy-load below-the-fold sections for faster initial page load
const ProductsOverview = dynamic(() => import('@/components/home/ProductsOverview').then(m => m.ProductsOverview))
const IndustriesGrid = dynamic(() => import('@/components/home/IndustriesGrid').then(m => m.IndustriesGrid))
const CompanyStoryTeaser = dynamic(() => import('@/components/home/CompanyStoryTeaser').then(m => m.CompanyStoryTeaser))
const TrustBar = dynamic(() => import('@/components/home/TrustBar').then(m => m.TrustBar))
const CTABanner = dynamic(() => import('@/components/home/CTABanner').then(m => m.CTABanner))

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <HeroSection />
      <StatsBar />
      <ProductsOverview />
      <IndustriesGrid />
      <CompanyStoryTeaser />
      <TrustBar />
      <CTABanner />
    </>
  )
}
