export function formatPrice(unitAmount: string | number) {
  if (typeof unitAmount === 'string') unitAmount = parseFloat(unitAmount)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(unitAmount / 100)
}
