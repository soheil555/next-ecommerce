import { formatPrice } from '@/lib/formatPrice'
import Image from 'next/image'
import Link from 'next/link'

export interface IProduct {
  id: string
  name: string
  description: string
  image: string
  unitAmount: string | number | null
}

interface IProps extends IProduct {}

export function Product({ id, name, description, image, unitAmount }: IProps) {
  return (
    <div>
      <Link
        href={{
          pathname: `/product/${id}`,
          query: { name, description, image, unitAmount },
        }}
      >
        <div className='relative w-full h-96 rounded-lg'>
          <Image
            src={image}
            alt={name}
            fill
            className='object-cover rounded-lg'
          />
        </div>

        <div className='py-2'>
          <h3 className='text-lg font-medium'>{name}</h3>
          <p className=' text-teal-700'>{formatPrice(unitAmount)}</p>
        </div>
      </Link>
    </div>
  )
}
