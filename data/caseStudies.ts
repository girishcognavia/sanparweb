export interface CaseStudyResult {
  metric: string
  label: string
}

export interface CaseStudy {
  slug: string
  title: string
  industry: string
  services: string[]
  result: CaseStudyResult
  image: string
  teaser: string
  challenge: string
  approach: string[]
  solution: string
  results: CaseStudyResult[]
  testimonial?: {
    quote: string
    name: string
    title: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'sanpar-industries',
    title: 'From WordPress to World-Class',
    industry: 'Industrial Manufacturing',
    services: ['Website Design', 'LinkedIn'],
    result: { metric: '3x', label: 'enquiry volume in 90 days' },
    image: '/images/success-stories/sanpar-system.webp',
    teaser: 'A 32-year industrial manufacturer finally has a website that matches their engineering pedigree.',
    challenge:
      'SANPAR Industries had been running on a dated WordPress site that failed to communicate the company\'s 32 years of thermal engineering expertise. The site was slow, poorly structured for SEO, and did not differentiate SANPAR from generic industrial suppliers. Defence capabilities were buried, and mobile experience was poor — costing real business opportunities.',
    approach: [
      'Conducted a full content and UX audit of the existing WordPress site, mapping user journeys for four audience types: industrial engineers, defence programme managers, international buyers, and job seekers.',
      'Designed a premium Next.js 14 website with dedicated product pages, industry-specific landing pages, and a defence microsite — all CMS-ready for future content updates.',
      'Implemented technical SEO foundations: JSON-LD structured data, canonical URLs, optimised metadata, and performance tuning targeting Core Web Vitals.',
      'Built a progressive enquiry form to reduce friction and increase conversion from product pages.',
    ],
    solution:
      'A complete website rebuild from WordPress to Next.js 14 with TypeScript, featuring a defence microsite with gold-accented branding, 16 product detail pages, 14 industry landing pages, and an integrated enquiry system. The new site positions SANPAR as a premium industrial brand competing with Atlas Copco and Parker Hannifin on digital presence.',
    results: [
      { metric: '3x', label: 'Enquiry volume in 90 days' },
      { metric: '94', label: 'Lighthouse performance score' },
      { metric: '2.1s', label: 'Average page load time' },
    ],
    testimonial: {
      quote: 'For the first time, our website actually represents what SANPAR is — a serious engineering company, not a small-town manufacturer.',
      name: 'SANPAR Leadership',
      title: 'SANPAR Industries Pvt. Ltd.',
    },
  },
  {
    slug: 'b2b-saas-rebrand',
    title: 'Repositioning a SaaS Brand for Enterprise',
    industry: 'SaaS',
    services: ['Brand Strategy', 'Web Design'],
    result: { metric: '40%', label: 'reduction in sales cycle' },
    image: '/images/success-stories/saas-rebrand.webp',
    teaser: 'Repositioning from SMB to enterprise unlocked a completely different deal size.',
    challenge:
      'A mid-stage B2B SaaS company had outgrown its SMB positioning. Their website and messaging still targeted small teams, but their product had evolved to serve enterprise accounts. Sales cycles were long because prospects didn\'t see enterprise credibility on the website — forcing the sales team to do heavy lifting in every deal.',
    approach: [
      'Audited existing messaging, competitive landscape, and win/loss data to identify the enterprise positioning gap.',
      'Redesigned the website with enterprise-first messaging, social proof from large accounts, and a trust-building content strategy.',
      'Created dedicated landing pages for each enterprise use case with tailored case studies and ROI calculators.',
      'Optimised the demo request flow to qualify enterprise leads and route them to the right sales team.',
    ],
    solution:
      'A complete brand repositioning and website redesign that shifted the narrative from "tool for small teams" to "platform for enterprise operations." The new site features enterprise case studies, security and compliance badges, and a streamlined demo booking flow that pre-qualifies leads by company size and use case.',
    results: [
      { metric: '40%', label: 'Reduction in sales cycle length' },
      { metric: '2.5x', label: 'Increase in enterprise demo requests' },
      { metric: '60%', label: 'Improvement in lead quality score' },
    ],
    testimonial: {
      quote: 'The website finally tells the story our sales team has been trying to tell in every call. Deals are moving faster because prospects arrive pre-sold on our enterprise capability.',
      name: 'VP of Marketing',
      title: 'B2B SaaS Company',
    },
  },
  {
    slug: 'pharma-linkedin',
    title: 'LinkedIn as a Lead Machine for Pharma',
    industry: 'Pharmaceutical',
    services: ['LinkedIn Growth'],
    result: { metric: '₹1.8Cr', label: 'pipeline from LinkedIn in 6 months' },
    image: '/images/success-stories/pharma-linkedin.webp',
    teaser: 'Structured content and paid campaigns turned a dormant LinkedIn page into a lead engine.',
    challenge:
      'A pharmaceutical equipment supplier had a LinkedIn company page with minimal activity and zero lead generation. Their target buyers — procurement heads and plant engineers at pharmaceutical companies — were active on LinkedIn, but the company had no strategy to reach them. Traditional outbound was expensive and yielding diminishing returns.',
    approach: [
      'Built a LinkedIn content calendar mixing thought leadership, product showcases, and industry commentary — all written in the voice of the company\'s technical experts.',
      'Launched targeted LinkedIn ad campaigns focused on pharmaceutical procurement decision-makers in India\'s top pharma clusters.',
      'Implemented a lead nurturing workflow with personalised follow-ups based on content engagement signals.',
      'Created gated content assets (whitepapers, spec sheets) as lead magnets for high-intent prospects.',
    ],
    solution:
      'A comprehensive LinkedIn growth strategy combining organic content, paid campaigns, and lead nurturing automation. The approach turned a dormant company page into the company\'s highest-performing lead generation channel, directly attributable to ₹1.8 crore in sales pipeline within six months.',
    results: [
      { metric: '₹1.8Cr', label: 'Pipeline from LinkedIn in 6 months' },
      { metric: '12x', label: 'Increase in LinkedIn engagement rate' },
      { metric: '340', label: 'Marketing qualified leads generated' },
    ],
    testimonial: {
      quote: 'LinkedIn went from an afterthought to our primary lead channel. The ROI on this programme has been extraordinary.',
      name: 'Business Head',
      title: 'Pharmaceutical Equipment Supplier',
    },
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}
