'use client'

import { formatPrice } from '@/lib/formatPrice'
import { CartItem as ICartItem, useCartStore } from '@/store'
import Image from 'next/image'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { motion } from 'framer-motion'

interface IProps extends ICartItem {}

export function CartItem({
  id,
  name,
  description,
  image,
  unitAmount,
  quantity,
}: IProps) {
  const addProductToCart = useCartStore(state => state.addProduct)
  const removeProductFromCart = useCartStore(state => state.removeProduct)

  return (
    <motion.div layout className='bg-gray-200 rounded-lg p-4 flex gap-4'>
      <div className='relative w-32 h-32'>
        <Image
          src={image}
          alt={name}
          fill
          className='object-cover rounded-lg'
        />
      </div>
      <div>
        <h3 className='text-lg font-medium'>{name}</h3>
        <div className='flex gap-2 items-center'>
          <p className='text-gray-800'>Quantity: {quantity}</p>
          <button
            onClick={() => removeProductFromCart(id)}
            className='bg-white rounded-full text-xs w-4 h-4 flex items-center justify-center'
          >
            <AiOutlineMinus />
          </button>
          <button
            onClick={() =>
              addProductToCart({
                id,
                name,
                description,
                image,
                unitAmount,
              })
            }
            className='bg-white rounded-full text-xs w-4 h-4 flex items-center justify-center'
          >
            <AiOutlinePlus />
          </button>
        </div>
        <p className='text-teal-700 text-sm'>{formatPrice(unitAmount)}</p>
      </div>
    </motion.div>
  )
}
