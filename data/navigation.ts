export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  description?: string
  icon?: string
}

export const mainNav: NavItem[] = [
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Who We Are', href: '/about', description: 'Our story, values, and 32-year journey' },
      { label: 'Technology', href: '/technology', description: 'Innovation rooted in engineering' },
      { label: 'Case Studies', href: '/case-studies', description: 'Success stories and results' },
      { label: 'Careers', href: '/careers', description: 'Life at SANPAR — join our team' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    children: [
      {
        label: 'Compressed Air Treatment',
        href: '/products?category=compressed-air',
        children: [
          { label: 'ECODRAIR Series', href: '/products/ecodrair-series', description: 'Standard refrigeration dryers, 5–5000 CFM' },
          { label: 'XEROS Series', href: '/products/xeros-series', description: 'PLC-controlled tailored systems' },
          { label: 'Adsorption Dryers', href: '/products/adsorption-dryers', description: 'Dew points to -70°C' },
          { label: 'Compressed Air Filters', href: '/products/compressed-air-filters', description: '5-stage filtration to 0.01 micron' },
          { label: 'Aftercooler', href: '/products/aftercooler', description: 'Post-compression cooling' },
          { label: 'Moisture Separator', href: '/products/centrifugal-moisture-separator', description: '>99% separation efficiency' },
          { label: 'Drains', href: '/products/drains', description: 'Electronic zero-loss drains' },
        ],
      },
      {
        label: 'Industrial Cooling',
        href: '/products?category=industrial-cooling',
        children: [
          { label: 'Air Chillers', href: '/products/air-chillers', description: 'Down to -10°C, DGAQA variants' },
          { label: 'Water Chillers', href: '/products/water-chillers', description: '1 TR to 30 TR process cooling' },
          { label: 'Coolant Chillers', href: '/products/coolant-chillers', description: 'CNC & airborne EGW cooling' },
          { label: 'Oil Chillers', href: '/products/oil-chillers', description: 'Hydraulic thermal management' },
        ],
      },
      {
        label: 'Industrial Air Conditioning',
        href: '/products?category=air-conditioning',
        children: [
          { label: 'Precision Air Conditioner', href: '/products/precision-air-conditioner', description: '±0.5°C accuracy' },
          { label: 'Dehumidifier', href: '/products/dehumidifier', description: 'Down to 5% RH' },
        ],
      },
      {
        label: 'Medical Desiccant Dryers',
        href: '/products?category=medical',
        children: [
          { label: 'CAT DTH Series', href: '/products/cat-dth-series', description: 'Hospital pipeline drying' },
          { label: 'CAT M1 Series', href: '/products/cat-m1-series', description: 'Compact medical units' },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'Aerospace & Defence', href: '/industries/aerospace-defence' },
      { label: 'Machine Tools', href: '/industries/machine-tools' },
      { label: 'Pharmaceutical', href: '/industries/pharmaceutical' },
      { label: 'Cement', href: '/industries/cement' },
      { label: 'Textile', href: '/industries/textile' },
      { label: 'Food & Beverage', href: '/industries/food-beverage' },
      { label: 'Plastics', href: '/industries/plastics' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Energy & Power', href: '/industries/energy-power' },
      { label: 'Chemical', href: '/industries/chemical' },
    ],
  },
  {
    label: 'Technology',
    href: '/technology',
  },
  {
    label: 'Support',
    href: '/support',
  },
  {
    label: 'Insights',
    href: '/insights',
  },
]

export const footerProducts = [
  { label: 'Compressed Air Treatment', href: '/products?category=compressed-air' },
  { label: 'Industrial Cooling', href: '/products?category=industrial-cooling' },
  { label: 'Industrial Air Conditioning', href: '/products?category=air-conditioning' },
  { label: 'Medical Desiccant Dryers', href: '/products?category=medical' },
]

export const footerCompany = [
  { label: 'Who We Are', href: '/about' },
  { label: 'Company History', href: '/about#timeline' },
  { label: 'Defence Systems', href: '/defence' },
  { label: 'Technology', href: '/technology' },
  { label: 'Support & Services', href: '/support' },
  { label: 'Careers', href: '/careers' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact Us', href: '/contact' },
]
