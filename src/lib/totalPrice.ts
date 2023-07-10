import { CartItem } from '@/store'

export function totalPrice(cartItems: CartItem[]) {
  return cartItems.reduce<number>((acc, item) => {
    const parsedUnitAmount = parseFloat(item.unitAmount)

    return acc + parsedUnitAmount * item.quantity
  }, 0)
}
