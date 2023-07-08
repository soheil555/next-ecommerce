export function formatPrice(unitAmount: string | number | null) {
  if (unitAmount === null || unitAmount === '') return 'N/A'
  if (typeof unitAmount === 'string') unitAmount = parseFloat(unitAmount)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(unitAmount / 100)
}
