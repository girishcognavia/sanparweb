export interface Industry {
  id: string
  name: string
  slug: string
  icon: string
  image?: string
  theme?: 'defence'
  tagline: string
  challenge: string
  solution: string
  highlight?: string
  relatedProductSlugs: string[]
  certifications: string[]
}

export const industries: Industry[] = [
  {
    id: 'aerospace-defence',
    name: 'Aerospace & Defence',
    slug: 'aerospace-defence',
    icon: 'Shield',
    image: '/images/industries/aerospace-defence.webp',
    theme: 'defence',
    tagline: 'Defence-grade thermal management for mission-critical systems',
    challenge: 'Airborne and ground-based defence systems demand thermal management meeting the most stringent military certifications. Commercial equipment cannot meet the reliability, temperature range, or qualification requirements of defence applications.',
    solution: 'DGAQA and CEMILAC certified products: Airborne LCS for radar cooling, ACM-based Air Conditioned Trolleys, Air Chillers to -10°C, EGW Coolant Chillers, and Ground Support Equipment for aircraft on ground.',
    relatedProductSlugs: ['air-chillers', 'coolant-chillers', 'precision-air-conditioner', 'xeros-series'],
    certifications: ['DGAQA Approved', 'CEMILAC Approved', 'AS 9100 D', 'ISO 9001:2015'],
  },
  {
    id: 'pharmaceutical',
    name: 'Pharmaceutical',
    slug: 'pharmaceutical',
    icon: 'FlaskConical',
    image: '/images/industries/pharmaceutical.png',
    tagline: 'Validated dry air for cleanrooms and sterile manufacturing',
    challenge: 'Pharmaceutical manufacturing demands validated, contaminant-free compressed air for cleanrooms, sterile fill-finish lines, and pneumatic instrumentation. Any moisture or oil risks batch contamination, regulatory non-compliance, and costly recalls.',
    solution: 'Validated dry air systems for cleanrooms, sterile manufacturing, and pneumatic instrumentation.',
    relatedProductSlugs: ['ecodrair-series', 'adsorption-dryers', 'compressed-air-filters', 'cat-m1-series'],
    certifications: ['ISO 9001:2015'],
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    slug: 'food-beverage',
    icon: 'UtensilsCrossed',
    image: '/images/industries/food-beverage.png',
    tagline: 'Oil-free dry air for packaging and processing lines',
    challenge: 'In food and beverage production, compressed air contacts product directly or indirectly. Oil contamination or moisture causes spoilage, failed audits, and brand damage.',
    solution: 'Oil-free dry air for packaging, bottling, and food processing lines.',
    relatedProductSlugs: ['ecodrair-series', 'compressed-air-filters', 'drains'],
    certifications: ['ISO 9001:2015'],
  },
  {
    id: 'machine-tools',
    name: 'Machine Tools',
    slug: 'machine-tools',
    icon: 'Wrench',
    image: '/images/industries/machine-tools.png',
    tagline: 'Spindle cooling and pneumatic air treatment for CNC machining',
    challenge: 'CNC machine tools generate intense heat in spindles, cutting zones, and hydraulic systems. Uncontrolled temperatures reduce tool life, affect dimensional accuracy, and cause unplanned downtime. Compressed air for pneumatics must also be moisture-free.',
    solution: 'Coolant chillers for spindle temperature control and compressed air treatment for pneumatic systems.',
    relatedProductSlugs: ['coolant-chillers', 'water-chillers', 'ecodrair-series'],
    certifications: ['ISO 9001:2015'],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    slug: 'manufacturing',
    icon: 'Factory',
    image: '/images/industries/manufacturing.webp',
    tagline: 'Complete compressed air treatment for production floors',
    challenge: 'Manufacturing facilities rely on compressed air as their fourth utility. Wet, contaminated air causes pneumatic valve failures, product defects, and corrosion in air lines — increasing maintenance costs and reducing OEE.',
    solution: 'Comprehensive compressed air treatment for production floors across all manufacturing types.',
    relatedProductSlugs: ['ecodrair-series', 'xeros-series', 'compressed-air-filters', 'aftercooler'],
    certifications: ['ISO 9001:2015'],
  },
  {
    id: 'energy-power',
    name: 'Energy & Power',
    slug: 'energy-power',
    icon: 'Zap',
    image: '/images/industries/energy-power.webp',
    tagline: 'Instrument air drying for substations and power plants',
    challenge: 'Power plants and substations require instrument-quality dry air for control valve actuation, relay operation, and gas insulated switchgear. Moisture ingress can cause catastrophic equipment failure.',
    solution: 'Instrument air drying for substations, power plants, and transmission infrastructure.',
    relatedProductSlugs: ['adsorption-dryers', 'ecodrair-series', 'aftercooler'],
    certifications: ['ISO 9001:2015'],
  },
  {
    id: 'cement',
    name: 'Cement',
    slug: 'cement',
    icon: 'Building2',
    image: '/images/industries/cement.png',
    tagline: 'Dust suppression air and plant air systems',
    challenge: 'Cement plants operate in highly dusty environments where compressed air is critical for bag filter cleaning, pneumatic conveying, kiln operations, and plant instrumentation.',
    solution: 'Dust suppression air, bulk material handling dryers, and full plant air systems.',
    relatedProductSlugs: ['ecodrair-series', 'compressed-air-filters', 'drains', 'aftercooler'],
    certifications: ['ISO 9001:2015'],
  },
  {
    id: 'chemical',
    name: 'Chemical',
    slug: 'chemical',
    icon: 'TestTube',
    image: '/images/industries/chemical.webp',
    tagline: 'Corrosion-resistant dry air for chemical process environments',
    challenge: 'Chemical processes demand corrosion-resistant, ultra-dry instrument air for control systems, reactor operations, and safety interlocks. Moisture can trigger dangerous reactions and process upsets.',
    solution: 'Corrosion-resistant dry air systems for chemical process environments.',
    relatedProductSlugs: ['adsorption-dryers', 'xeros-series', 'compressed-air-filters'],
    certifications: ['ISO 9001:2015'],
  },
  {
    id: 'plastics',
    name: 'Plastics',
    slug: 'plastics',
    icon: 'Box',
    image: '/images/industries/plastics.webp',
    tagline: 'Dry air for blow moulding and resin drying',
    challenge: 'Plastic moulding and extrusion requires extremely dry air for resin drying and blow moulding. Moisture causes surface defects, splay marks, and structural weaknesses in finished parts.',
    solution: 'Dry air for blow moulding operations and desiccant drying of plastic resins.',
    relatedProductSlugs: ['adsorption-dryers', 'ecodrair-series', 'dehumidifier'],
    certifications: ['ISO 9001:2015'],
  },
  {
    id: 'textile',
    name: 'Textile',
    slug: 'textile',
    icon: 'Layers',
    image: '/images/industries/textile.png',
    tagline: 'Dry compressed air for every mill process',
    challenge: 'Textile mills use compressed air extensively across every process — spinning, weaving, finishing, and packaging. Dry, clean plant air is essential to prevent corrosion and contamination.',
    solution: 'Dry compressed air for plant air systems across every process in the mill.',
    relatedProductSlugs: ['ecodrair-series', 'compressed-air-filters', 'drains', 'dehumidifier'],
    certifications: ['ISO 9001:2015'],
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}
