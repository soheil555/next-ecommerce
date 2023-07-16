'use client'

import { useCartStore } from '@/store'
import { IProduct } from './product'
import { useState } from 'react'

interface IProps extends IProduct {}

export function AddProduct({
  id,
  name,
  description,
  image,
  unitAmount,
}: IProps) {
  const addProductToCart = useCartStore(state => state.addProduct)
  const [added, setAdded] = useState(false)

  const handleAddProduct = () => {
    addProductToCart({ id, name, description, image, unitAmount })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 500)
  }

  return (
    <button
      onClick={handleAddProduct}
      className='bg-teal-700 hover:bg-teal-800 text-white w-full p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
      disabled={added}
    >
      {!added ? 'Added to Cart' : 'Adding to your cart'}
    </button>
  )
}
