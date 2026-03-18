export const tokens = {
  // Core Palette
  slate900:      '#1B1F23',
  slate800:      '#2D3239',
  slate700:      '#3E444B',
  teal600:       '#0D9488',
  teal500:       '#14B8A6',
  emerald500:    '#10B981',
  emerald600:    '#059669',
  amber500:      '#F59E0B',

  // Surfaces
  surface:       '#F0F4F3',
  card:          '#FFFFFF',
  cardDark:      '#2D3239',

  // Borders
  border:        '#D1D9D6',
  borderDark:    '#3A4149',

  // Text
  textPrimary:   '#1A1D21',
  textSecondary: '#4B5563',
  textMuted:     '#6B7280',
  textInverse:   '#FFFFFF',

  // Semantic
  success:       '#16A34A',
  successLight:  '#DCFCE7',
  warning:       '#D97706',
  error:         '#DC2626',
  errorLight:    '#FEE2E2',
} as const

export type TokenKey = keyof typeof tokens
