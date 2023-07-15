import { IProduct } from '@/components/product'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface CartItem extends IProduct {
  quantity: number
}

export enum UserState {
  Cart,
  Checkout,
  Success,
}

interface CartState {
  cart: CartItem[]
  isOpen: boolean
  userState: UserState
  paymentIntentId: string
  toggleCart: () => void
  addProduct: (product: IProduct) => void
  removeProduct: (productId: string) => void
  setUserState: (userState: UserState) => void
  setPaymentIntentId: (paymentIntentId: string) => void
  emptyCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    immer(set => ({
      cart: [],
      isOpen: false,
      userState: UserState.Cart,
      paymentIntentId: '',
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
      setUserState: userState =>
        set(state => {
          state.userState = userState
        }),
      setPaymentIntentId: paymentIntentId =>
        set(state => {
          state.paymentIntentId = paymentIntentId
        }),
      emptyCart: () =>
        set(state => {
          state.cart = []
        }),
    })),
    {
      name: 'cart-store',
    }
  )
)
