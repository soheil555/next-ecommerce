import { IProduct } from '@/components/product'
import { AddProduct } from '@/components/addProduct'
import { formatPrice } from '@/lib/formatPrice'
import Image from 'next/image'

interface IProps {
  params: { id: IProduct['id'] }
  searchParams: Omit<IProduct, 'id'>
}

export default async function Product({
  params: { id },
  searchParams: { name, description, image, unitAmount },
}: IProps) {
  return (
    <div className='flex flex-col md:flex-row gap-8 py-4'>
      <div className='flex-1'>
        <Image
          src={image}
          alt={name}
          width={1920}
          height={1080}
          className='object-cover rounded-lg '
        />
      </div>

      <div className='flex-1 flex flex-col gap-4'>
        <h3 className='text-2xl'>{name}</h3>

        <p className='text-gray-700'>{description}</p>

        <p className='text-teal-700'>{formatPrice(unitAmount)}</p>

        <AddProduct
          id={id}
          name={name}
          description={description}
          image={image}
          unitAmount={unitAmount}
        />
      </div>
    </div>
  )
}
