import { Product, IProduct } from '@/components/product'
import { stripe } from '@/lib/stripe'

async function getProducts() {
  const products = await stripe.products.list()
  const prices = await stripe.prices.list()

  const productsWithPrices: IProduct[] = products.data.map(product => {
    const unitAmount =
      prices.data.find(price => price.id === product.default_price)
        ?.unit_amount_decimal || '0'

    return {
      id: product.id,
      name: product.name,
      description: product.description || '',
      image: product.images[0],
      unitAmount,
    }
  })

  return productsWithPrices
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className='grid grid-cols-fluid gap-10'>
      {products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  )
}
