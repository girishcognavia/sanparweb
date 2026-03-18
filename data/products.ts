export type ProductCategory = 'compressed-air' | 'industrial-cooling' | 'air-conditioning' | 'medical'

export interface Product {
  id: string
  name: string
  slug: string
  category: ProductCategory
  categoryLabel: string
  series: string
  shortDesc: string
  image: string
  keySpecs: Record<string, string>
  variants?: string[]
  applications: string[]
}

export const categoryLabels: Record<ProductCategory, string> = {
  'compressed-air': 'Compressed Air Treatment',
  'industrial-cooling': 'Industrial Cooling',
  'air-conditioning': 'Industrial Air Conditioning',
  'medical': 'Medical Desiccant Dryers',
}

export const products: Product[] = [
  {
    id: 'ecodrair',
    name: 'ECODRAIR Series',
    slug: 'ecodrair-series',
    category: 'compressed-air',
    categoryLabel: 'Compressed Air Treatment',
    series: 'Standard Refrigeration Dryers',
    shortDesc: 'Energy-efficient refrigeration air dryers for standard industrial compressed air lines',
    image: '/images/products/ecodrair.webp',
    keySpecs: {
      'Flow Range': '5 to 5000 CFM',
      'Pressure Dew Point': '+3°C',
      'Working Pressure': 'Up to 16 bar',
    },
    variants: ['D1-5A', 'D1-10A', 'D1-20A', 'D1-50A', 'D1-100A'],
    applications: ['Manufacturing', 'Pharma', 'Food & Beverage', 'Textile', 'Automobile'],
  },
  {
    id: 'xeros',
    name: 'XEROS Series',
    slug: 'xeros-series',
    category: 'compressed-air',
    categoryLabel: 'Compressed Air Treatment',
    series: 'High-Performance Tailored Systems',
    shortDesc: 'PLC-controlled precision dryers for demanding industrial applications requiring custom engineering',
    image: '/images/products/xeros.png',
    keySpecs: {
      'Control': 'PLC-based',
      'Heat Exchanger': 'Brazed Aluminum',
      'Customisation': 'Full system tailoring available',
    },
    applications: ['Defence', 'Aerospace', 'Heavy Industry', 'Chemical'],
  },
  {
    id: 'adsorption-dryers',
    name: 'Adsorption Based Compressed Air Dryers',
    slug: 'adsorption-dryers',
    category: 'compressed-air',
    categoryLabel: 'Compressed Air Treatment',
    series: 'Heatless Regeneration',
    shortDesc: 'Desiccant dryers achieving pressure dew points as low as -40°C for ultra-dry air requirements',
    image: '/images/products/adsorption-dryer.webp',
    keySpecs: {
      'Dew Point': '-20 to -70°C',
      'Regeneration': 'Heatless / Heated',
      'Working Pressure': 'Up to 16 bar',
    },
    applications: ['Pharmaceutical', 'Chemical', 'Electronics', 'Energy & Power'],
  },
  {
    id: 'compressed-air-filters',
    name: 'Compressed Air Filters',
    slug: 'compressed-air-filters',
    category: 'compressed-air',
    categoryLabel: 'Compressed Air Treatment',
    series: '5-Stage Filtration',
    shortDesc: 'Complete filtration lineup from coalescing to activated carbon — removes oil, water, and particulates',
    image: '/images/products/filters.webp',
    keySpecs: {
      'Filtration Grades': '5 grades available',
      'Residual Oil': '0.003 ppm (Grade 5)',
      'Particle Size': 'Down to 0.01 micron',
    },
    applications: ['All industries'],
  },
  {
    id: 'aftercooler',
    name: 'Aftercooler',
    slug: 'aftercooler',
    category: 'compressed-air',
    categoryLabel: 'Compressed Air Treatment',
    series: 'Air & Water Cooled',
    shortDesc: 'Reduces compressed air temperature post-compression, removing bulk moisture before the dryer',
    image: '/images/products/aftercooler.webp',
    keySpecs: {
      'Cooling Type': 'Air-cooled / Water-cooled',
      'Outlet Temp': 'Within 10°C of ambient',
    },
    applications: ['General Industry', 'Manufacturing'],
  },
  {
    id: 'centrifugal-separator',
    name: 'Centrifugal Moisture Separator',
    slug: 'centrifugal-moisture-separator',
    category: 'compressed-air',
    categoryLabel: 'Compressed Air Treatment',
    series: 'Mechanical Separation',
    shortDesc: 'Removes bulk liquid water and oil aerosols from compressed air lines by centrifugal force',
    image: '/images/products/moisture-separator.webp',
    keySpecs: {
      'Separation Efficiency': '>99%',
      'Pressure Drop': '<0.2 bar',
    },
    applications: ['Pre-dryer protection', 'General Industry'],
  },
  {
    id: 'drains',
    name: 'Drains',
    slug: 'drains',
    category: 'compressed-air',
    categoryLabel: 'Compressed Air Treatment',
    series: 'Electronic Zero-Loss',
    shortDesc: 'Automatic electronic zero-loss condensate drains for filters, separators, and air receivers',
    image: '/images/products/drains.webp',
    keySpecs: {
      'Type': 'Electronic zero-loss',
      'Power': '24V DC / 230V AC',
    },
    applications: ['All compressed air systems'],
  },
  {
    id: 'air-chillers',
    name: 'Air Chillers',
    slug: 'air-chillers',
    category: 'industrial-cooling',
    categoryLabel: 'Industrial Cooling',
    series: 'Industrial & Defence Grade',
    shortDesc: 'Precision air chilling for process cooling, defence ground support, and test applications down to -10°C',
    image: '/images/products/air-chiller.webp',
    keySpecs: {
      'Cooling Capacity': '1 kW to 100 kW',
      'Outlet Temperature': 'Down to -10°C',
      'Certification': 'DGAQA approved variants available',
    },
    applications: ['Defence', 'Aerospace', 'Manufacturing', 'Test & Measurement'],
  },
  {
    id: 'water-chillers',
    name: 'Water Chillers',
    slug: 'water-chillers',
    category: 'industrial-cooling',
    categoryLabel: 'Industrial Cooling',
    series: 'Industrial Process Cooling',
    shortDesc: 'Closed-loop water chillers for consistent process temperature control in industrial applications',
    image: '/images/products/water-chiller.webp',
    keySpecs: {
      'Capacity': '1 TR to 30 TR',
      'Coolant': 'Water / Water-Glycol',
    },
    applications: ['Manufacturing', 'Pharmaceutical', 'Plastics', 'Machine Tools'],
  },
  {
    id: 'coolant-chillers',
    name: 'Coolant Chillers',
    slug: 'coolant-chillers',
    category: 'industrial-cooling',
    categoryLabel: 'Industrial Cooling',
    series: 'CNC & Airborne EGW',
    shortDesc: 'Precision coolant temperature control for CNC spindles and EGW variants for airborne systems',
    image: '/images/products/coolant-chiller.webp',
    keySpecs: {
      'Application': 'CNC machine tool cooling / Airborne EGW',
      'Accuracy': '±0.5°C temperature control',
      'Coolant': 'Water / EGW (Ethylene Glycol Water)',
    },
    applications: ['Machine Tools', 'Aerospace & Defence', 'CNC Machining'],
  },
  {
    id: 'oil-chillers',
    name: 'Oil Chillers',
    slug: 'oil-chillers',
    category: 'industrial-cooling',
    categoryLabel: 'Industrial Cooling',
    series: 'Hydraulic Thermal Management',
    shortDesc: 'Controls hydraulic oil temperature to protect machinery and maintain consistent viscosity',
    image: '/images/products/oil-chiller.webp',
    keySpecs: {
      'Coolant': 'Hydraulic oil / Gear oil',
      'Integration': 'Standalone or skid-mounted',
    },
    applications: ['Heavy Industry', 'Hydraulic Systems', 'Defence Ground Equipment'],
  },
  {
    id: 'precision-air-conditioner',
    name: 'Precision Air Conditioner',
    slug: 'precision-air-conditioner',
    category: 'air-conditioning',
    categoryLabel: 'Industrial Air Conditioning',
    series: 'Cleanroom & Defence Grade',
    shortDesc: 'Maintains precise temperature and humidity within ±0.5°C for cleanrooms, server rooms, and defence applications',
    image: '/images/products/precision-ac.webp',
    keySpecs: {
      'Temperature Accuracy': '±0.5°C',
      'Applications': 'Cleanroom / Server room / Defence',
      'Cooling Capacity': '1 TR to 20 TR',
    },
    applications: ['Pharmaceutical', 'Aerospace & Defence', 'Electronics Manufacturing'],
  },
  {
    id: 'dehumidifier',
    name: 'Dehumidifier',
    slug: 'dehumidifier',
    category: 'air-conditioning',
    categoryLabel: 'Industrial Air Conditioning',
    series: 'Industrial & Defence',
    shortDesc: 'Removes moisture from ambient air in warehouses, storage facilities, and production areas',
    image: '/images/products/dehumidifier.webp',
    keySpecs: {
      'Humidity Control': 'Down to 5% RH',
      'Capacity': '10 to 1000 litres/day',
    },
    applications: ['Storage', 'Pharmaceutical', 'Defence', 'Textile', 'Plastics'],
  },
  {
    id: 'cat-dth',
    name: 'CAT DTH Series',
    slug: 'cat-dth-series',
    category: 'medical',
    categoryLabel: 'Medical Desiccant Dryers',
    series: 'Hospital Pipeline Drying',
    shortDesc: 'Medical-grade desiccant dryers for hospital central compressed air pipelines — validated sterile dry air for patient care',
    image: '/images/products/cat-dth.webp',
    keySpecs: {
      'Dew Point': '-40°C pressure dew point',
      'Compliance': 'Medical gas standards',
      'Application': 'Hospital pipeline / Central sterile',
    },
    applications: ['Hospitals', 'Healthcare Facilities', 'Medical Gas Systems'],
  },
  {
    id: 'cat-m1',
    name: 'CAT M1 Series',
    slug: 'cat-m1-series',
    category: 'medical',
    categoryLabel: 'Medical Desiccant Dryers',
    series: 'Compact Medical Unit',
    shortDesc: 'Compact standalone medical desiccant dryer for smaller healthcare facilities and clinic-scale systems',
    image: '/images/products/cat-m1.webp',
    keySpecs: {
      'Form Factor': 'Compact standalone',
      'Dew Point': '-40°C',
      'Application': 'Clinic / Small hospital',
    },
    applications: ['Clinics', 'Diagnostic Centres', 'Small Hospitals'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  const current = getProductBySlug(currentSlug)
  if (!current) return products.slice(0, limit)
  return products
    .filter((p) => p.category === current.category && p.slug !== currentSlug)
    .slice(0, limit)
}
