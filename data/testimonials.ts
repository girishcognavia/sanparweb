export interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote: 'SANPAR\'s compressed air treatment systems have been running flawlessly in our facility for over a decade. Their engineering support is unmatched.',
    name: 'Plant Engineering Head',
    title: 'Senior VP Operations',
    company: 'Leading Pharmaceutical Manufacturer',
  },
  {
    quote: 'The DGAQA-approved air chillers from SANPAR met every specification we required for our defence programme. Reliable, precise, and built to last.',
    name: 'Programme Manager',
    title: 'Defence Systems Division',
    company: 'DRDO Laboratory',
  },
]
