export function formatPrice(unitAmount: string | number) {
  unitAmount =
    typeof unitAmount === 'number' ? unitAmount : parseFloat(unitAmount)

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(unitAmount / 100)
}
