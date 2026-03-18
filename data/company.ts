export const company = {
  name: 'SANPAR Industries Pvt. Ltd.',
  defenceEntity: 'SANPAR Defence Systems Pvt. Ltd.',
  tagline: 'Precision-Engineered Thermal Solutions Since 1994',
  description: 'Precision-engineered compressed air treatment and industrial cooling solutions, trusted globally for over 32 years.',
  founded: 'February 7, 1994',
  email: 'enquiry@sanpar.com',
  phone: '+91 73491 42424',
  phoneAlt: '+91 80 4343 5959',
  address: 'Bommasandra Industrial Estate, Bengaluru, Karnataka, India',
  website: 'https://www.sanpar.com',
  social: {
    linkedin: 'https://www.linkedin.com/company/sanpar-industries',
    twitter: 'https://x.com/SANPARindia',
    youtube: 'https://www.youtube.com/channel/UCtD9fjNAP-VTtvyApCV8juw',
    facebook: 'https://www.facebook.com/sanparindustries/',
  },
  certifications: ['ISO 9001:2015', 'AS 9100 D', 'DGAQA Approved', 'CEMILAC Approved'],
  stats: {
    yearsExperience: 32,
    products: 200,
    clients: 40,
    industries: 14,
  },
} as const

export interface TimelineMilestone {
  year: string
  title: string
  events: string[]
}

export const timeline: TimelineMilestone[] = [
  {
    year: '1994',
    title: 'The Beginning',
    events: [
      'Founded 7 February 1994',
      'First office inaugurated 22 February 1994',
      'First ECODRAIR compressed air dryer sold',
      'First 2000mm filter supplied to GTRE / DRDO',
    ],
  },
  {
    year: '1995–1997',
    title: 'Building Foundations',
    events: [
      'Industrial licence for manufacturing obtained (1995)',
      'First air chiller for defence application delivered (1996)',
      'SANPAR Industries Pvt. Ltd. sister concern formed (1997)',
    ],
  },
  {
    year: '1998–2000',
    title: 'Product Innovation Era',
    events: [
      'First XEROS compressed air dryer developed (1998)',
      'ECODRAIR trademark registered (1999)',
      'First industrial dehumidifier developed (2000)',
      'Compact brazed aluminum heat exchangers introduced (2000)',
      'First precision air conditioner developed (2000)',
    ],
  },
  {
    year: '2004',
    title: 'Global Footprint Begins',
    events: [
      'First export order to Malaysia',
      'First oil chiller integrated with water chiller',
    ],
  },
  {
    year: '2006–2009',
    title: 'Infrastructure Expansion',
    events: [
      'Industrial property purchased at Bommasandra (2006)',
      'Shifted to own facility at Bommasandra Industrial Estate (2009)',
      'ISO 9001:2015 certification received (2009)',
    ],
  },
  {
    year: '2010',
    title: 'Technology Advancement',
    events: [
      'PLC-based XEROS air dryers introduced',
      'Liquid cooling system for ground testing executed',
    ],
  },
  {
    year: '2015–2016',
    title: 'International Recognition',
    events: [
      'Participated in HANNOVER MESSE Germany (2015)',
      'First airborne cooling system for radar applications (2015)',
      'Airborne LCS — DGAQA & CEMILAC approved (2016)',
    ],
  },
  {
    year: '2017–2020',
    title: 'Aerospace Advancements',
    events: [
      'AS 9100 D certification achieved (2017)',
      'First airborne liquid circulation module supplied (2017)',
      'Airborne aluminium piping system with integrated sensors (2019)',
      'Air chillers for LRU cooling to CHESS / DRDO (2020)',
    ],
  },
  {
    year: '2024',
    title: 'Strategic Bifurcation',
    events: [
      'SANPAR formally bifurcated into SANPAR Industries Pvt. Ltd. and SANPAR Defence Systems Pvt. Ltd.',
    ],
  },
  {
    year: '2025',
    title: 'Cutting-Edge Development',
    events: [
      'Diesel-cum-grid powered ACM-based Air Conditioning Trolley for defence developed',
    ],
  },
]

export const mission = "Delivering innovative, cost-effective, and reliable thermal engineering products to the manufacturing fraternity and aerospace by empowering people to demonstrate their skillsets at the global level."

export const vision = "Airing solutions to where heat is a menace — to make reliable and energy-efficient utility cooling products for the manufacturing fraternity, creating extraordinary leadership in thermal engineering for industries and aerospace."

export const qualityPolicy = "SANPAR is committed to design, manufacture and maintain its products to the satisfaction of the customer through continual improvement in the quality management system. Our quality management system is an epitome of inter-related activities of the processes that will direct and control the organization in order to continually improve the effectiveness and efficacy."

export const qualityStatement = "To design and manufacture zero defect products to create long lasting trust within clientele."

export const chairmanMessage = {
  name: 'K.S. Sudhakaran',
  title: 'Chairman & Managing Director',
  message: [
    "Heart and Mind recklessly fall in love and the result is what has come to be known as SANPAR. The passion to deliver some of the most revered and ground breaking solutions in Compressed Air Treatment have been our founding objective. The result is the trust and partnership garnered with some of the most successful manufacturers and service companies that are global brand and household names.",
    "SANPAR, is at the threshold of a booming manufacturing market; primarily with the industries competing globally to deliver end products that are competent and cost effective. SANPAR is making the most of this opportunity with an efficient and committed team of engineers delivering customized solutions that not only exceed expectations but set a whole new standard in compressed air treatment while conserving energy and saving precious resources.",
  ],
}

export const coreValues = [
  { name: 'Ethics', description: 'We act with integrity, fairness, and responsibility in everything we do.', icon: 'Shield' },
  { name: 'Teamwork', description: 'We believe collaboration leads to greater innovation and stronger results.', icon: 'Users' },
  { name: 'Innovation', description: 'We continuously learn, iterate, adapt, and create smarter solutions.', icon: 'Lightbulb' },
  { name: 'Best People', description: 'We attract, develop, and retain top talent committed to excellence.', icon: 'Star' },
  { name: 'Respect', description: 'We honor every individual — employees, clients, and partners alike.', icon: 'Heart' },
  { name: 'Customer Delight', description: 'We go beyond satisfaction, delivering reliable solutions that exceed expectations.', icon: 'Award' },
  { name: 'Safety', description: 'We ensure a safe work environment through proactive responsibility and care.', icon: 'HardHat' },
] as const

export const sustainability = {
  intro: "At SANPAR, sustainability is more than a commitment — it's a core responsibility. In the realm of compressed air and cooling systems, where energy usage is significant, our goal is to reduce environmental impact without compromising performance.",
  pillars: [
    { title: 'Energy-Efficient Designs', description: 'Lower operational costs and carbon footprints through intelligent engineering.', icon: 'Zap' },
    { title: 'Smart Control Technology', description: 'Optimized performance and reduced wastage through intelligent automation.', icon: 'Cpu' },
    { title: 'Eco-Friendly Refrigerants', description: 'Environmentally responsible cooling agents in our chillers and dryers.', icon: 'Leaf' },
    { title: 'Long-Lasting Products', description: 'Reduced replacement cycles and material waste through durable construction.', icon: 'Recycle' },
  ],
} as const

export const certificationDetails = [
  { name: 'ISO 9001:2015', description: 'International standard for quality management systems focused on consistent product and service quality.' },
  { name: 'AS 9100 D', description: 'Aerospace Standard EN 9100:2018 for aerospace and defence applications.' },
  { name: 'DGAQA Approved', description: 'Defence Grade Quality Approval for military-grade products and systems.' },
  { name: 'CEMILAC Approved', description: 'Centre for Military Airworthiness and Certification approval for aerospace systems.' },
] as const
