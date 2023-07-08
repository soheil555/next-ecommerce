import { IProduct } from '@/components/product'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface CartItem extends IProduct {
  quantity: number
}

interface CartState {
  cart: CartItem[]
  isOpen: boolean
  toggleCart: () => void
  addProduct: (product: IProduct) => void
  removeProduct: (productId: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    immer(set => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      addProduct: product =>
        set(state => {
          const productInCart = state.cart.find(item => item.id === product.id)
          if (productInCart) productInCart.quantity += 1
          else state.cart.push({ ...product, quantity: 1 })
        }),
      removeProduct: productId =>
        set(state => {
          const productIndex = state.cart.findIndex(
            item => item.id === productId
          )
          if (productIndex !== -1) {
            if (state.cart[productIndex].quantity > 1)
              state.cart[productIndex].quantity -= 1
            else state.cart.splice(productIndex, 1)
          }
        }),
    })),

    {
      name: 'cart-store',
    }
  )
)
