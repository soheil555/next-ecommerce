import { authOptions } from '@/lib/auth'
import { formatPrice } from '@/lib/formatPrice'
import { prisma } from '@/lib/prisma'
import { OrderStatus, User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export const revalidate = 0

const fetchOrders = async () => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return null

  const user = session.user as User

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
      status: OrderStatus.CONFIRMED,
    },
    include: {
      products: true,
    },
  })

  return orders
}

export default async function Dashboard() {
  const orders = await fetchOrders()
  if (!orders) redirect('/api/auth/signin')

  return (
    <div>
      {orders.length === 0 ? <h3>You have no orders</h3> : <h3>Your orders</h3>}
      <div>
        {orders.map(order => (
          <div key={order.id} className='rounded-lg p-8 my-12 bg-gray-200'>
            <h3 className='text-xs font-medium py-2'>
              Order reference: {order.id}
            </h3>
            <p className='text-xs py-2'>
              Status:{' '}
              <span
                className={`${
                  order.status === OrderStatus.CONFIRMED
                    ? 'bg-teal-500'
                    : 'bg-orange-500'
                } text-white px-2 py-1 rounded-md mx-2 text-xs`}
              >
                {order.status}
              </span>
            </p>
            <p className='text-xs'>Time: {order.createdAt.toString()}</p>
            <p>Total: {formatPrice(order.amount)}</p>
            <div className='text-sm lg:flex items-center gap-4'>
              {order.products.map(product => (
                <div key={product.id} className='py-2'>
                  <h3 className='py-2'>{product.name}</h3>
                  <div className='flex items-baseline gap-4'>
                    <Image
                      src={product.image!}
                      alt={product.name}
                      width={36}
                      height={36}
                    />
                    <p>{formatPrice(product.unitAmount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
