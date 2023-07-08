'use client'

import { useCartStore } from '@/store'
import { IProduct } from './product'

interface IProps extends IProduct {}

export function AddProduct({
  id,
  name,
  description,
  image,
  unitAmount,
}: IProps) {
  const addProductToCart = useCartStore(state => state.addProduct)

  return (
    <button
      onClick={() =>
        addProductToCart({ id, name, description, image, unitAmount })
      }
      className='bg-teal-700 hover:bg-teal-800 text-white w-full p-2 rounded-md'
    >
      Add To Cart
    </button>
  )
}
