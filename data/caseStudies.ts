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
    slug: 'hindustan-motors',
    title: 'Hindustan Motors',
    industry: 'Automobile',
    services: ['Compressed Air Treatment', 'Industrial Cooling'],
    result: { metric: '100%', label: 'uptime on production lines' },
    image: '/images/success-stories/story1.webp',
    teaser: 'Reliable compressed air treatment for one of India\'s oldest automotive manufacturers.',
    challenge:
      'Hindustan Motors required consistent, high-quality compressed air across their manufacturing lines. Moisture and contaminants in the pneumatic systems were causing frequent breakdowns and production delays.',
    approach: [
      'Assessed the compressed air quality requirements across all production lines.',
      'Designed a comprehensive air treatment system tailored to automotive manufacturing needs.',
      'Installed ECODRAIR series dryers and multi-stage filtration systems.',
      'Provided ongoing maintenance support for continuous operation.',
    ],
    solution:
      'A complete compressed air treatment solution including refrigeration dryers, multi-stage filters, and automatic drains — ensuring clean, dry air for all pneumatic operations across the manufacturing facility.',
    results: [
      { metric: '100%', label: 'Uptime on production lines' },
      { metric: '0', label: 'Moisture-related breakdowns' },
      { metric: '30%', label: 'Reduction in maintenance costs' },
    ],
  },
  {
    slug: 'hical-technologies',
    title: 'HiCal Technologies',
    industry: 'Manufacturing',
    services: ['Compressed Air Treatment'],
    result: { metric: '99.9%', label: 'air quality compliance' },
    image: '/images/success-stories/story2.webp',
    teaser: 'Precision air treatment for high-calibre manufacturing operations.',
    challenge:
      'HiCal Technologies needed ultra-clean compressed air for their precision manufacturing processes. Existing systems could not consistently meet the stringent air quality standards required.',
    approach: [
      'Conducted a detailed air quality audit of the existing compressed air infrastructure.',
      'Recommended and designed an upgraded air treatment system with multi-stage filtration.',
      'Implemented XEROS series dryers for precise dew point control.',
      'Established a preventive maintenance schedule for long-term performance.',
    ],
    solution:
      'Installed advanced XEROS series PLC-controlled dryers with 5-stage filtration, achieving consistent air quality that meets the demanding requirements of precision manufacturing.',
    results: [
      { metric: '99.9%', label: 'Air quality compliance rate' },
      { metric: '-40°C', label: 'Consistent pressure dew point' },
      { metric: '25%', label: 'Energy savings vs previous system' },
    ],
  },
  {
    slug: 'excel-glass',
    title: 'Excel Glass',
    industry: 'Manufacturing',
    services: ['Industrial Cooling', 'Compressed Air Treatment'],
    result: { metric: '40%', label: 'reduction in rejection rate' },
    image: '/images/success-stories/story3.webp',
    teaser: 'Integrated cooling and air treatment for glass manufacturing excellence.',
    challenge:
      'Excel Glass faced high rejection rates due to inconsistent cooling and moisture contamination in their glass manufacturing process. Temperature control was critical to product quality.',
    approach: [
      'Analysed the cooling requirements and air quality needs specific to glass manufacturing.',
      'Designed an integrated solution combining water chillers with compressed air treatment.',
      'Deployed water chillers for precise process temperature control.',
      'Installed compressed air dryers and filters to eliminate moisture contamination.',
    ],
    solution:
      'A combined solution of industrial water chillers for precise temperature control and ECODRAIR compressed air dryers for moisture-free pneumatic operations, significantly reducing product defects.',
    results: [
      { metric: '40%', label: 'Reduction in rejection rate' },
      { metric: '±0.5°C', label: 'Temperature consistency achieved' },
      { metric: '20%', label: 'Improvement in production efficiency' },
    ],
  },
  {
    slug: 'infosys-technologies',
    title: 'Infosys Technologies Ltd',
    industry: 'IT & Technology',
    services: ['Industrial Air Conditioning'],
    result: { metric: '±0.5°C', label: 'temperature accuracy maintained' },
    image: '/images/success-stories/story4.webp',
    teaser: 'Precision air conditioning for India\'s leading IT infrastructure.',
    challenge:
      'Infosys Technologies required precision climate control for their server rooms and data centres. Standard HVAC systems could not maintain the tight temperature and humidity tolerances needed for optimal equipment performance.',
    approach: [
      'Evaluated the thermal load and environmental requirements of the data centre infrastructure.',
      'Designed custom precision air conditioning systems for server room environments.',
      'Installed SANPAR precision air conditioners with advanced humidity control.',
      'Set up continuous monitoring and maintenance protocols.',
    ],
    solution:
      'Deployed SANPAR precision air conditioners maintaining ±0.5°C temperature accuracy and controlled humidity levels, ensuring optimal operating conditions for critical IT infrastructure.',
    results: [
      { metric: '±0.5°C', label: 'Temperature accuracy maintained' },
      { metric: '99.99%', label: 'Uptime for cooling systems' },
      { metric: '35%', label: 'Energy savings over conventional HVAC' },
    ],
  },
  {
    slug: 'jmt-auto',
    title: 'JMT Auto Ltd',
    industry: 'Automobile',
    services: ['Compressed Air Treatment'],
    result: { metric: '50%', label: 'reduction in paint defects' },
    image: '/images/success-stories/story5.webp',
    teaser: 'Clean, dry air for automotive paint shop operations.',
    challenge:
      'JMT Auto\'s paint shop was experiencing high defect rates due to moisture and oil contamination in the compressed air supply. Fish-eye defects and poor paint adhesion were causing costly rework.',
    approach: [
      'Conducted a compressed air quality analysis at the paint shop air supply points.',
      'Identified sources of contamination and designed a targeted treatment system.',
      'Installed oil-free compressed air filtration and high-performance dryers.',
      'Implemented quality monitoring at critical air supply points.',
    ],
    solution:
      'A dedicated paint-shop compressed air treatment line with ECODRAIR dryers, activated carbon filters, and zero-loss drains — delivering oil-free, moisture-free air for flawless paint finishes.',
    results: [
      { metric: '50%', label: 'Reduction in paint defects' },
      { metric: '0.003 ppm', label: 'Residual oil content achieved' },
      { metric: '₹15L+', label: 'Annual savings on rework costs' },
    ],
  },
  {
    slug: 'gtre-drdo',
    title: 'Gas Turbine Research Establishment',
    industry: 'Aerospace & Defence',
    services: ['Compressed Air Treatment', 'Industrial Cooling'],
    result: { metric: 'DGAQA', label: 'approved systems delivered' },
    image: '/images/success-stories/story6.webp',
    teaser: 'Defence-grade thermal solutions for India\'s premier gas turbine research facility.',
    challenge:
      'GTRE (DRDO) required defence-grade compressed air treatment and cooling systems for gas turbine testing and development. The systems needed to meet stringent military specifications and DGAQA approval standards.',
    approach: [
      'Worked closely with GTRE engineers to understand the specific requirements for gas turbine testing environments.',
      'Designed defence-grade systems meeting military specifications.',
      'Underwent rigorous DGAQA qualification testing and certification process.',
      'Supplied custom-engineered solutions for ground testing applications.',
    ],
    solution:
      'DGAQA-approved compressed air treatment and liquid cooling systems for gas turbine ground testing applications — engineered to meet the exact specifications required by India\'s defence research establishment.',
    results: [
      { metric: 'DGAQA', label: 'Full approval achieved' },
      { metric: '100%', label: 'Specification compliance' },
      { metric: '15+ yrs', label: 'Continuous service partnership' },
    ],
  },
  {
    slug: 'ashok-leyland',
    title: 'Ashok Leyland Ltd',
    industry: 'Automobile',
    services: ['Compressed Air Treatment'],
    result: { metric: '99%', label: 'compressed air availability' },
    image: '/images/success-stories/story7.webp',
    teaser: 'Reliable air treatment for one of India\'s largest commercial vehicle manufacturers.',
    challenge:
      'Ashok Leyland\'s large-scale manufacturing operations required consistent, high-volume compressed air treatment across multiple production lines. Downtime in the air system meant production losses across the entire facility.',
    approach: [
      'Surveyed the compressed air network across the manufacturing facility.',
      'Designed a redundant air treatment system to ensure zero downtime.',
      'Installed multiple ECODRAIR and XEROS series dryers in parallel configuration.',
      'Established a preventive maintenance programme with rapid response support.',
    ],
    solution:
      'A high-capacity, redundant compressed air treatment system with parallel dryers, filters, and drains — ensuring 99% availability even during maintenance cycles for uninterrupted production.',
    results: [
      { metric: '99%', label: 'Compressed air availability' },
      { metric: '5000+', label: 'CFM treatment capacity' },
      { metric: '0', label: 'Unplanned downtime events' },
    ],
  },
  {
    slug: 'jindal-steel',
    title: 'Jindal Steel & Power Limited, Raigarh',
    industry: 'Manufacturing',
    services: ['Compressed Air Treatment', 'Industrial Cooling'],
    result: { metric: '24/7', label: 'continuous operation achieved' },
    image: '/images/success-stories/story8.webp',
    teaser: 'Heavy-duty air treatment for one of India\'s largest steel and power conglomerates.',
    challenge:
      'Jindal Steel & Power\'s Raigarh plant operates round the clock in harsh industrial conditions. The compressed air systems needed to handle extreme dust loads, high ambient temperatures, and continuous operation without interruption.',
    approach: [
      'Assessed the demanding environmental conditions and air quality requirements.',
      'Engineered heavy-duty compressed air treatment systems for continuous operation.',
      'Selected components rated for high ambient temperatures and dust loads.',
      'Designed easy-maintenance systems suitable for remote industrial locations.',
    ],
    solution:
      'Heavy-duty XEROS series dryers and industrial-grade filtration designed for 24/7 continuous operation in harsh steel plant conditions — with robust construction and simplified maintenance for remote locations.',
    results: [
      { metric: '24/7', label: 'Continuous operation achieved' },
      { metric: '45°C+', label: 'Ambient temperature rated' },
      { metric: '10+ yrs', label: 'Trouble-free operation' },
    ],
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}
